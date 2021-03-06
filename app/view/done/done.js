/**
 * Created by USER on 14-6-9.
 */

Ext.define('WebInspect.view.done.Done', {
    extend: 'Ext.List',
    xtype: 'done',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {

        title: '已办事项',

        style: 'background: #fff;',
        store: 'DoneStore',
        loadingText: false,
        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        emptyText: '<p class="no-searches">没有待办事项</p>',


        itemTpl: Ext.create('Ext.XTemplate',
            '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{NodeName}</div>',
            '<div style="font-size:15px; line-height: 1.6em;">流程编号:{SerialNum}</div>',
            '<div style="font-size:15px; line-height: 1.6em;">接收时间：{Column1}</div>'
        )
    }
});