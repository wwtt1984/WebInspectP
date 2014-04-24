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
            popup: 'main info popup',

            contactlist: 'info contactlist',

            contactsearch: '[itemId=contactsearch]',
            ctsearch: 'ctsearch',

            contacttree: '[itemId=contacttree]',

            fullnum: '[itemId=fullnum]',
            shortnum: '[itemId=shortnum]',
            officenum: '[itemId=officenum]',
            numcancel: '[itemId=numcancel]'
        },

        control: {
            contacttree: {
                leafItemTap: 'onContactLeafItemTap'
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
            },
            contactsearch: {
                tap: 'onContactSearchTap'
            },
            ctsearch: {
                itemtap: 'onContactItemTap'
            }
        }
    },

    onContactInitialize: function(){
        var me = this;

        var contactstore = Ext.getStore('ContactTreeStore');
        if(!contactstore.getAllCount()){
            contactstore.getProxy().setExtraParams({
                t: 'GetZpPerson',
                results: 'jsonp'
            });

            contactstore.load();
        }

        me.contactlist = me.getContactlist();

        if(!me.contactlist){
            me.contactlist = Ext.create('WebInspect.view.contact.ContactList');
        }

        me.getInfo().push(me.contactlist);

        var csstore = Ext.getStore('ContactSearchStore');

        csstore.getProxy().setExtraParams({
            t: 'GetContactsListAll',
            results: 'jsonp'
        });

        if(!csstore.getAllCount()){
            csstore.load(function(records, operation, success){me.getContactsearch().show();});
        }
        else{
            me.getContactsearch().show();
        }
    },

    //点击通讯录中“人员”
    onContactLeafItemTap: function(container, list, index, target, record, e){
        if (!this.popup) {
            this.popup = Ext.create('WebInspect.view.contact.PopUp');
        }

        var csstore = Ext.getStore('ContactSearchStore');
        csstore.clearFilter();
        csstore.filter('samaccountname', record.data.sid);

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.popup.setWidth(null);
            this.popup.setMinHeight('45%');
            this.popup.setTop(null);
            this.popup.setLeft(0);
        }

        this.popup.onDataSet(csstore.getData().items[0]);
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
    },

    onContactSearchTap: function(){
        this.ctsearch = this.getCtsearch();
        if(!this.ctsearch){
            this.ctsearch = Ext.create('WebInspect.view.contact.Search');
        }
        this.getInfofunction().hide();
        this.getContactsearch().hide();
        this.getInfo().push(this.ctsearch);
    }
})