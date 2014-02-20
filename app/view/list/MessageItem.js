/**
 * Created by xiaona on 14-2-14.
 */

Ext.define('WebInspect.view.list.MessageItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'messageListItem',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
//        baseCls: 'x-list-item',

        cls: 'list-demo',

        items: [
            {
                xtype: 'container',
                baseCls: 'x-list-item-label',
                itemId: 'messageItemDetail',
                tpl: [
                    '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{MsgTitle}</div>',
                    '<div style="font-size:15px; line-height: 1.6em;">发送人：{Sname}</div>',
                    '<div style="font-size:15px; line-height: 1.6em;">发送时间：{Stime}</div>'
                ],
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deleteMessage',
                        margin: '0 0 0 10px',
                        iconCls: 'trash',
                        iconMask: true
//                        text: '删除'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onContactDeleteButtonTap',
                event: 'tap',
                delegate: '#deleteMessage'
            }
        ]
    },

    onContactDeleteButtonTap: function(button, e, eOpts) {

        //stops propagation of event, without this sometimes both the itemtap
        //and deletebuttontap would get fired after a previous record is deleted from dataview.
        e.stopEvent();

        var me = this;

        var results = WebInspect.app.user.sid + '$' + this.getRecord().data.DialogID + '$jsonp';

        Ext.data.proxy.SkJsonp.validate('DelRtxView',results,{
            success: function(response) {
                if(response.success == "true"){
                    var store = Ext.getStore('MessageStore');
                    store.remove(me.getRecord());
                    Ext.ComponentQuery.query('#message')[0].onMessageStoreLoad();
                }
                else{
                    Ext.Msg.alert('删除失败，请重试！');
                }
            },
            failure: function() {
                Ext.Msg.alert('请求失败，请重试！');
            }
        });


    }

});