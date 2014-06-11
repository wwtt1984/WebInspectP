/**
 * Created by USER on 14-4-4.
 */
Ext.define('WebInspect.controller.AssignControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            assignmain: 'info assignmain',
            assignment: 'assignment',

            assignlist: 'info assignlist',

            assignconfirm: '[itemId=assignconfirm]',
            assigncancel: '[itemId=assigncancel]',

            selectconfirm: '[itemId=selectconfirm]',

            location: '[itemId=location]',
            assignms: '[itemId=assign_ms]',

            selectionpanel: '[itemId=selectionpanel]',
            treeselect: '[itemId=treeselect]'
        },

        control: {
            assignconfirm: {
                tap: 'onAssignConfirmTap'
            },
            assigncancel: {
                tap: 'onAssignCancelTap'
            },
            selectconfirm: {
                tap: 'onSelectConfirmTap'
            },
            treeselect: {
                selectionchange: 'onSelectionChange'
            }
        }
    },

    onAssignInitialize: function(){

        var me = this;

        me.assignmain = me.getAssignmain();

        if(!me.assignmain){
            me.assignmain = Ext.create('WebInspect.view.assign.AssignMain');
        }

        me.getAssignment().onLocationSet();
        me.getInfo().push(me.assignmain);

        var contactstore = Ext.getStore('ContactTreeStore');
        if(!contactstore.getAllCount()){
            contactstore.getProxy().setExtraParams({
                t: 'GetZpPerson',
                results: 'jsonp'
            });

            contactstore.setRoot({expanded: true});
            contactstore.load();
        }

        var segmentstore = Ext.getStore('SegmentTreeStore');
        if(!segmentstore.getAllCount()){
            segmentstore.getProxy().setExtraParams({
                t: 'GetXcjhTD',
                results: 'jsonp'
            });

            segmentstore.setRoot({expanded: true});
            segmentstore.load();
        }

        me.onAssignStoreLoad();
    },

    onAssignStoreLoad: function(){
        var assignstore = Ext.getStore('AssignStore');
        assignstore.getProxy().setExtraParams({
            t: 'GetZprw',
            results: WebInspect.app.user.sid + '$jsonp'
        });

        assignstore.load();
    },

    onAssignListPush: function(index){
        var me = this;

        me.assignlist = me.getAssignlist();

        if(!me.assignlist){
            me.assignlist = Ext.create('WebInspect.view.assign.AssignList');
        }

        me.index = '';

        var store;

        if(index == 0){
            store = Ext.getStore('SegmentTreeStore');
            me.index = 'segment';
        }
        else{
            store = Ext.getStore('ContactTreeStore');
            me.index = 'contact';
        }

        me.getTreeselect().setStore(store);

        me.getInfofunction().hide();
        me.getSelectconfirm().show();
        me.getInfo().push(me.assignlist);

        me.sid = '';
        me.text = '';

    },

    onSelectionChange: function(container, list, record, e){

        var me = this;
        var arr = list.getSelection().filter(function isLeafSelected(element, index, array) {
            return (element.data.leaf);
        });

        var text = '';
        var sid = '';

        if(arr.length){
            for(var i=0; i<arr.length; i++){
                text += arr[i].data.text + '，';
                sid += arr[i].data.text + '@' + arr[i].data.sid + ',';
            }

            me.getSelectionpanel().setData({select: text});
            me.getSelectionpanel().show();

            if(me.index == 'segment'){

                me.tdtext = text.substr(0, text.length - 1);
                me.tdid = sid.substr(0, sid.length - 1);
            }
            else{
                me.rytext = text.substr(0, text.length - 1);
                me.ryid = sid.substr(0, sid.length - 1);
            }
        }
        else{
            me.getSelectionpanel().hide();
        }
    },

    onSelectConfirmTap: function(){

        var me = this;

        if(me.index == 'segment'){
            if(!me.tdtext){

                me.tdtext = '请选择地点&nbsp;&nbsp;&nbsp;>';
            }

            me.getLocation().setData({td: me.tdtext, ry:  me.getLocation().getData().ry, tdid: me.tdid, ryid:  me.getLocation().getData().ryid});
        }
        else{
            if(!me.rytext){

                me.rytext = '请选择人员&nbsp;&nbsp;&nbsp;>';
            }
            me.getLocation().setData({td: me.getLocation().getData().td, ry:  me.rytext, tdid: me.getLocation().getData().tdid, ryid:  me.ryid});
        }

        me.getInfofunction().show();
        me.getSelectconfirm().hide();
        me.getInfo().pop();
    },

    onAssignConfirmTap: function(){
        var me = this;

        Ext.Viewport.setMasked({xtype: 'loadmask',message: '正在请求中...'});

        var ms = me.getAssignms().getValue();
        var td = me.tdid;
        var ry = me.ryid;
        var date = Ext.Date.format(new Date(), 'Y-m-d H:m:s');

        if(me.getAssignms().getValue() && me.getLocation().getData().tdid && me.getLocation().getData().ryid){

            var results = WebInspect.app.user.sid + '$' + ms + '$' + td + '$'+ ry + '$' + date + '$jsonp';

            Ext.data.proxy.SkJsonp.validate('InsertZprw',results,{
                success: function(response) {
                    Ext.Viewport.setMasked(false);
                    if(response.success == "true"){
//                        alert('任务指派成功！');
                        me.onAssignStoreLoad();
                        plugins.Toast.ShowToast("任务指派成功！",1000);
                    }
                    else{
//                        alert('任务指派失败！');
                        plugins.Toast.ShowToast("任务指派失败，请重试！",1000);
                    }
                },
                failure: function() {
                    Ext.Viewport.setMasked(false);
//                    alert('请求失败！');
                    plugins.Toast.ShowToast("请求失败，请重试！",1000);
                }
            });
        }
        else{
//            alert('请填写所有信息！');
            plugins.Toast.ShowToast("请填写所有信息！",1000);
        }

    },

    onAssignCancelTap: function(){
        var me = this;
        me.getApplication().getController('MainControl').onInfoFunctionBackTap();
    }
})