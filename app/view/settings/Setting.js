/**
 * Created by xiaona on 14-1-13.
 */

Ext.define('WebInspect.view.settings.Setting', {
    extend: 'Ext.form.Panel',
    xtype: 'setting',

    requires: [
        'Ext.field.Toggle'
    ],

    config: {
        title: '系统设置',

       items:[
           {
               xtype: 'fieldset',
               title: '消息推送(暂时不能定制)',
//               instructions: 'Please enter the information above.',
               defaults: {
//                   required: true,
                   labelWidth: '40%'
               },

               items:[
                   {
                       xtype: 'togglefield',
                       cls: 'setting',
                       name: 'enable',
                       label: '内网新闻',
                       value: 1,
                       readOnly: true
                   },
                   {
                       xtype: 'togglefield',
                       name: 'enable',
                       cls: 'setting',
                       label: '综合信息',
                       value: 1,
                       readOnly: true
                   },
                   {
                       xtype: 'togglefield',
                       name: 'enable',
                       cls: 'setting',
                       label: '通知公告',
                       value: 1,
                       readOnly: true
                   }
               ]
           },
           {
               xtype: 'panel',
//               docked: 'bottom',
               defaults: {
                   xtype : 'button',
                   style: 'background:white;width:100%;min-height: 2.2em;',
                   cls   : 'demobtn',
                   flex  : 1,
                   margin: '0 13 10 13'
               },
               layout: {
                   type: 'hbox',
                   align: 'middle'
               },
               items: [
                   {
                       text: '退出系统',
                       style: 'background:#d90303;color:white;min-height: 2.2em;',
                       itemId: 'sysquit'
                   }]

//            {
//                text: '退出系统',
//                style: 'background:red;color:white;min-height: 2.2em;margin:10px 13px 0 13px;width:auto !important;',
//                id: 'historycancel'
//            }]
           }]
    }
});