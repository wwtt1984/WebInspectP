/**
 * Created by USER on 14-6-9.
 */

Ext.define('WebInspect.controller.DoneControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            done: 'info done',
            procedure: 'info procedure'
        },

        control: {
            done: {
                itemtap: 'onDoneItemTap'
            }
        }
    },

    //工资列表页面初始化
    onDoneInitialize: function(){
        var me = this;

//        me.onAllStoreLoad();
        me.done = me.getDone();
        if(!me.done){
            me.done= Ext.create('WebInspect.view.done.Done');
        }
        me.onDoneStoreLoad();
        me.getInfo().push(me.done);
    },

    //加载用户“已办事项”信息
    onDoneStoreLoad: function(){

        var me = this;

        var store = Ext.getStore('DoneStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetTaskHisListMy',
            results: WebInspect.app.user.oulevel + '$' + WebInspect.app.user.sid + '$jsonp'
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        }, this);
    },

    //流程页面
    onDoneItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.procedure = me.getProcedure();
        if(!me.procedure){
            me.procedure = Ext.create('WebInspect.view.done.Procedure');
        }

        var store = Ext.getStore('ProcedureStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetTaskHisListUser',
            results: record.data.TaskID + '$jsonp'
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                me.procedure.onDataSet(records);
            }
        }, this);

        me.procedure.setTitle(record.data.NodeName);

        me.getInfofunction().hide();
        me.getInfo().push(me.procedure);
    }
})