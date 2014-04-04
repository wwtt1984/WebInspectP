/**
 * Created by USER on 14-4-3.
 */
Ext.define('WebInspect.view.assign.Assignment', {
    extend: 'Ext.Panel',
    xtype: 'assignment',

    requires: [
        'Ext.XTemplate'
    ],

    config: {

        title: '任务指派',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px 10px 0 10px;',

        items: [
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 15px 0;',
                items: [
                    {

                        label: '任务描述',
                        labelAlign: 'top',
                        xtype: 'textareafield'
//                        itemId:'tarea_ms',
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 15px 0;',
                items: [
                    {
                        xtype: 'selectfield',
                        label: '任务地点',
                        labelAlign: 'top',
                        options: [
                            {text: 'First Option',  value: 'first'},
                            {text: 'Second Option', value: 'second'},
                            {text: 'Third Option',  value: 'third'}
                        ]
                    }
                 ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 15px 0;',
                items: [
                    {
                        xtype: 'selectfield',
                        label: '指派人',
                        labelAlign: 'top',
                        options: [
                            {text: 'First Option',  value: 'first'},
                            {text: 'Second Option', value: 'second'},
                            {text: 'Third Option',  value: 'third'}
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: '确认',
                        cls: 'demobtn',
                        flex: 1,
                        style: 'height: 2.2em;margin: 15px 10px 0 0;'
                    },
                    {
                        xtype: 'button',
                        text: '取消',
                        cls: 'demobtn',
                        flex: 1,
                        style: 'height: 2.2em;margin: 15px 0 0 10px;'
                    }
                ]

            }
        ]
    }
})