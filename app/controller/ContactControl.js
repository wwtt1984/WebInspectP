/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.ContactControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            firstlevel: 'main info firstlevel',
            secondlevel: 'main info secondlevel',
            contact: 'main info contact',
            popup: 'main info popup',
            fullnum: '[itemId=fullnum]',
            shortnum: '[itemId=shortnum]',
            officenum: '[itemId=officenum]',
            numcancel: '[itemId=numcancel]'
        },

        control: {
            firstlevel: {
                itemtap: 'onFirstLevelTap'
            },
            secondlevel: {
                itemtap: 'onSecondLevelTap'
            },
            contact: {
                itemtap: 'onContactItemTap'
            },
            fullnum: {
                tap: 'onFullNumTap'
            },
            shortnum: {
                tap: 'onShortNumTap'
            },
            officenum: {
                tap: 'onOfficeNumTap'
            },
            numcancel: {
                tap: 'onNumCancelTap'
            }
        }
    },

    onContactInitialize: function(){
        var store = Ext.getStore('FirstLevelStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: '00$jsonp'
        });

        this.firstlevel = this.getFirstlevel();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            store.filter('ORG_Id_0', '0');
            Ext.Viewport.setMasked(false);
        }, this);

        if(!this.firstlevel){
            this.firstlevel = Ext.create('WebInspect.view.contact.FirstLevel');
        }
        this.firstlevel.setTitle('钱塘江管理局');
        this.getInfo().push(this.firstlevel);
    },

    //加载通讯录二级信息
    onContactLevelSet: function(storename, guid, view, viewname, title){
        var store = Ext.getStore(storename);

        store.removeAll();


        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: guid + '$jsonp'
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            store.filter('ORG_Id_0', '0');
            Ext.Viewport.setMasked(false);
        }, this);

        if(!view){
            view = Ext.create('WebInspect.view.' + viewname);
        }
        view.setTitle(title);

        this.getInfofunction().hide();
        this.getInfo().push(view);
    },

    //在通讯录一级列表中选择，加载二级信息列表
    onFirstLevelTap: function(list, index, target, record, e, eOpts){
        this.onContactLevelSet('SecondLevelStore', record.data.guid, this.getSecondlevel(), 'contact.SecondLevel', record.data.OUName);

    },

    //在通讯录二级列表中选择，加载三级信息列表
    onSecondLevelTap: function(list, index, target, record, e, eOpts){

        var store = Ext.getStore('ContactStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: record.data.guid + '$jsonp'
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            Ext.Viewport.setMasked(false);
        }, this);

        this.contact = this.getContact();
        if(!this.contact){
            this.contact = Ext.create('WebInspect.view.contact.Contact');
        }
        this.contact.setTitle(record.data.OUName);
        this.getInfo().push(this.contact);
    },

    //点击通讯录中“人员”
    onContactItemTap: function(list, index, target, record, e, eOpts){
        if (!this.popup) {
//            this.popup.destroy();
            this.popup = Ext.create('WebInspect.view.contact.PopUp');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.popup.setWidth(null);
            this.popup.setHeight('40%');
            this.popup.setTop(null);
            this.popup.setLeft(0);
        }

        this.popup.onDataSet(record);
        if (!this.popup.getParent()) {
            Ext.Viewport.add(this.popup);
        }
        this.popup.show();
    },

    onFullNumTap: function(){
        var num = Ext.ComponentQuery.query('#fullnum')[0].getText();

        plugins.Phone.Call(num, function(obj) {
//            alert(obj.number);
        },function(error){
//            alert(error);
        });
    },

    onShortNumTap: function(){
        var num = Ext.ComponentQuery.query('#shortnum')[0].getText();

        plugins.Phone.Call(num, function(obj) {},function(error){});
    },

    onOfficeNumTap: function(){

        var num = Ext.ComponentQuery.query('#officenum')[0].getText();

        plugins.Phone.Call(num, function(obj) {},function(error){});
    },

    onNumCancelTap: function(){
        this.popup.hide();
    }
})