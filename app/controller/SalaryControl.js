/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.controller.SalaryControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            salary: 'info salary',
            salarycarousel: 'salarycarousel',
            salarylist: 'salarylist'
        },

        control: {
            salarylist: {
                itemtap: 'onSalaryListItemTap'
            }
        }
    },

    //工资列表页面初始化
    onSalaryInitialize: function(){
        var me = this;

//        me.onAllStoreLoad();
        me.salary = me.getSalary();
        if(!me.salary){
            me.salary= Ext.create('WebInspect.view.salary.Salary');
        }
        me.salary.onDataSet();
        me.getInfo().push(me.salary);


    },



    onAllStoreLoad: function(){

        var now = new Date();

        var store = Ext.getStore('SalaryStore');
        store.getProxy().setExtraParams({
            t: 'GetSalary',
            results: WebInspect.app.user.sid + '$' + Ext.Date.format(now, 'Y-m').toString() + '-01$jsonp'
        });
        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        });

        var store1 = Ext.getStore('SalaryPreStore');
        store1.getProxy().setExtraParams({
            t: 'GetSalary',
            results: WebInspect.app.user.sid + '$' + Ext.Date.format(Ext.Date.add(now, Ext.Date.MONTH, -1), 'Y-m').toString() + '-01$jsonp'
        });
        store1.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        });

        var store2 = Ext.getStore('SalaryNextStore');
        store2.getProxy().setExtraParams({
            t: 'GetSalary',
            results: WebInspect.app.user.sid + '$' + Ext.Date.format(Ext.Date.add(now, Ext.Date.MONTH, +1), 'Y-m').toString() + '-01$jsonp'
        });
        store2.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        });
    }
})