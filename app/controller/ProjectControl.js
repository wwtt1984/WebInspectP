/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.ProjectControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            projectfirst: 'info projectfirst',
            projectsecond: 'info projectsecond',
            projectelement: 'info projectelement'
        },

        control: {
            projectfirst: {
                itemtap: 'onProjectFirstTap'
            },
            projectsecond: {
                itemtap: 'onProjectSecondTap'
            }
        }
    },

    onProjectInitialize: function(){
        this.onProjectFirstStoreLoad();
        this.projectfirst = this.getProjectfirst();
        if(!this.projectfirst){
            this.projectfirst = Ext.create('WebInspect.view.project.ProjectFirst');
        }
        this.getInfo().push(this.projectfirst);
    },

    onProjectFirstStoreLoad: function(){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('ProjectFirstStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqList',
            results: 'jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);
        });
    },

    onProjectFirstTap: function(list, index, target, record, e, eOpts){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('ProjectSecondStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqInfo',
            results: record.data.type + '$' + record.data.location + '$jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);
        });

        this.projectsecond = this.getProjectsecond();

        if(!this.projectsecond){
            this.projectsecond = Ext.create('WebInspect.view.project.ProjectSecond');
        }

        this.getInfofunction().hide();
        this.getInfo().push(this.projectsecond);
    },

    onProjectSecondTap: function(list, index, target, record, e, eOpts){

        var me = this;

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        me.projectelement = me.getProjectelement();

        if(!me.projectelement){
            me.projectelement = Ext.create('WebInspect.view.project.ProjectElement');
        }

        var store = Ext.getStore('ProjectElementStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqInfoSingle',
            results: record.data.code + '$jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);

            me.projectelement.onDataSet(store.getData().all, record.data.name);
        });



        me.getInfofunction().hide();
        me.projectelement.setTitle(record.data.name);
        me.getInfo().push(me.projectelement);

    }
})