/**
 * Created by USER on 14-4-9.
 */

Ext.define('WebInspect.view.assign.AssignSelect', {
    extend: 'Ext.Panel',
    xtype: 'assignselect',

    config:{
        modal: true,
        centered: false,
        hideOnMaskTap: true,

        layout: 'card',

        width: '100%',
        height: '70%',


        bottom: 0,

        items:[
            {
                docked: 'top',
                xtype: 'toolbar',
                cls: 'pop-header',
                style: 'border: none;',
                title: '请选择'

            },
            {
                xclass: 'WebInspect.view.assign.AssignFirst'
            },
            {
                xclass: 'WebInspect.view.assign.AssignSecond'
            },
            {


                docked: 'bottom',
                xtype: 'toolbar',
                cls: 'pop-header',
                style: 'border: none;',
                items: [
                    {
                        xtype: 'button',
                        left: 0,
                        text: '上一步',
                        hidden: true,
                        itemId: 'tofirst'
                    },
                    {
                        xtype: 'button',
                        right: 0,
                        text: '下一步',
                        itemId: 'firstconfirm'
                    },
                    {
                        xtype: 'button',
                        itemId: 'secondconfirm',
                        right: 0,
                        text: '确定',
                        hidden: true
                    }
                ]

            }
        ]
    }
})