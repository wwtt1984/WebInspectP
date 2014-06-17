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
            projectthird:'info projectthird',
            projectcard: 'info projectcard',
            projectmain: 'projectmain',
            projectelement: 'projectelement',
            projectSegmentedButton: '[itemId=projectSegmentedButton]'
        },

        control: {
            projectfirst: {
                itemtap: 'onProjectFirstTap'
            },
            projectsecond: {
                itemtap: 'onProjectSecondTap'
            },
            projectthird: {
                itemtap: 'onProjectThirdTap'
            },
            projectSegmentedButton: {
                toggle: 'onProjectSegmentedTap'
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

        var store = Ext.getStore('ProjectFirstStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqList',
            results: 'jsonp'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        });
    },

    onProjectFirstTap: function(list, index, target, record, e, eOpts){

        var me = this;

        var store = Ext.getStore('ProjectSecondStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetGqInfo',
            results: record.data.type + '$' + record.data.location + '$jsonp'
        });

        store.loadPage(1,function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        });

        me.projectsecond = me.getProjectsecond();

        if(!me.projectsecond){
            me.projectsecond = Ext.create('WebInspect.view.project.ProjectSecond');
        }

        me.projectsecond.getPlugins()[0].setTotalCount(parseFloat(record.data.num));
        me.projectsecond.setTitle(record.data.type + '-' + record.data.location);
        me.getInfofunction().hide();
        me.getInfo().push(me.projectsecond);
    },

    onProjectSecondTap: function(list, index, target, record, e, eOpts){

        var me = this;

        if(record.data.leaf == 'true'){
            me.onThirdViewShow(record);
        }
        else{
            me.onElementViewShow(record);
        }
    },

    onThirdViewShow: function(record){
        var me = this;

        var store = Ext.getStore('ProjectThirdStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetGqInfoLeaf',
            results: record.data.code + '$jsonp'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        });

        me.projectthird = me.getProjectthird();

        if(!me.projectthird){
            me.projectthird = Ext.create('WebInspect.view.project.ProjectThird');
        }
        me.projectthird.setTitle(record.data.name);
        me.getInfo().push(me.projectthird);
    },

    onProjectThirdTap: function(list, index, target, record, e, eOpts){
        var me = this;
        me.onElementViewShow(record);
    },

    onElementViewShow: function(record){
        var me = this;

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        me.projectcard = me.getProjectcard();

        if(!me.projectcard){
            me.projectcard = Ext.create('WebInspect.view.project.ProjectCard');
        }

        me.projectcard.onProjectElementInit(record.data.code);

        me.getInfofunction().hide();
        me.projectcard.setTitle(record.data.name);
        me.getInfo().push(me.projectcard);
    },

    onProjectSegmentedTap: function(me, button, isPressed, eOpts){
        var me = this;
        if(isPressed){
            var text = button._text;
            switch(text){
                case '主要':

                    me.projectcard.onProjectMainDataSet();
                    break;

                case '全部':
                    me.projectcard.onProjectAllDataSet();
                    break;
            }
        }
    }
})