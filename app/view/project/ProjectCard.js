Ext.define('WebInspect.view.project.ProjectCard', {
    extend: 'Ext.Panel',
    xtype: 'projectcard',

    requires: [
        'WebInspect.view.project.ProjectMain',
        'WebInspect.view.project.ProjectElement',
        'Ext.SegmentedButton'
    ],

    config: {

        title: '详细信息',

        layout: 'card',

        items: [
            {
                docked: 'bottom',
                ui: 'gray',
                xtype: 'toolbar',
                style: 'border-top: 1px #ccc solid;',
                items:[
                    {
                        width: '100%',
                        padding: '0 5 0 0',
                        defaults: {
                            flex: 1
                        },
                        xtype: 'segmentedbutton',
                        itemId: 'projectSegmentedButton',
                        allowDepress: false,
                        allowMultiple: false,
                        items: [
                            {
                                text: '主要',
                                pressed: true
                            },
                            {
                                text: '全部'
                            }]
                    }]
            },
            {
                xclass: 'WebInspect.view.project.ProjectMain'
            },
            {
                xclass: 'WebInspect.view.project.ProjectElement'
            }
        ]
    },

    onProjectElementInit: function(code){
        var me = this;
        me.code = code;

        me.onProjectMainDataSet();
    },

    onProjectMainDataSet: function(){

        var me = this;

        me.down('projectmain').onDataSet(me.code);


        me.setActiveItem(me.down('projectmain'));

    },

    onProjectAllDataSet: function(){
        var me = this;

        var store = Ext.getStore('ProjectElementStore');

        me.down('projectelement').onDataSet(me.code);

        me.setActiveItem(me.down('projectelement'));
    }
})
