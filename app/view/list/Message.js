/**
 * Created by xiaona on 14-1-7.
 */

Ext.define('WebInspect.view.list.Message', {
    extend: 'Ext.Panel',
    xtype: 'message',

    requires: [
    ],

    config: {

        title: '离线消息',

        itemId: 'message',

        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'dataview',
                baseCls: 'x-list',
                cls: 'x-list-normal',
                emptyText: '<p class="no-searches" style="margin-top:50%;">没有离线消息</p>',
                itemId: 'messageDataView',
                disableSelection: true,
                defaultType: 'messageListItem',
                store: 'MessageStore',
                useComponents: true,

                plugins: [
                    {
                        xclass: 'Ext.plugin.PullRefresh',
                        pullText: '下拉刷新...',

                        releaseText: '松开进行刷新...',

                        loadingText: '正在刷新...',

                        loadedText: '刷新完成.',

                        lastUpdatedText: '刷新时间:&nbsp;'
                    }]
            }
        ]
    },

    onMessageStoreLoad: function(){

        var store = Ext.getStore('MessageStore');

        var pushstore = Ext.getStore('PushStore');
        pushstore.getAt(1).data.num = store.getAllCount();
        Ext.getCmp('noticelist').refresh();
    }
});