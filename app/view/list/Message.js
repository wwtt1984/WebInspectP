/**
 * Created by xiaona on 14-1-7.
 */

Ext.define('WebInspect.view.list.Message', {
    extend: 'Ext.List',
    xtype: 'message',

    requires: [
    ],

    config: {

        title: '离线消息',

        style: 'background: #fff;',
        store: 'MessageStore',

        emptyText: '<p class="no-searches">没有离线消息</p>',


        itemTpl: Ext.create('Ext.XTemplate',
            '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{MsgTitle}</div>',
            '<div style="font-size:15px; line-height: 1.6em;">发送时间：{CreateTime}</div>'
        )
    }
});