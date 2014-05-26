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
        var year = now.getFullYear();
        var store = Ext.getStore('TfList');
        store.getProxy().setExtraParams({
            t: 'GetTflist',
            tfyear: year
        });
        store.load();

        var store1 = Ext.getStore('TfListPre');
        store1.getProxy().setExtraParams({
            t: 'GetTflist',
            tfyear: year-1
        });
        store1.load();

        var store2 = Ext.getStore('TfListNext');
        store2.getProxy().setExtraParams({
            t: 'GetTflist',
            tfyear: year+1
        });
        store2.load();
    }
})