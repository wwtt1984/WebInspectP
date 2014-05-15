/**
 * Created by USER on 14-5-15.
 */

Ext.define('WebInspect.view.assign.AssignHistory', {
    extend: 'Ext.List',
    xtype: 'assignhistory',

    requires: [
//        'Ext.plugin.ListPaging',
//        'Ext.plugin.PullRefresh'
    ],

    config: {

        cls: 'assign',

        store: 'AssignStore',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

//        plugins: [
//            {
//                xclass: 'Ext.plugin.ListPaging',
//                loadMoreText: '加载更多...',
//                noMoreRecordsText: '没有更多记录了...',
//                autoPaging:true
//            },
//            {
//                xclass: 'Ext.plugin.PullRefresh',
//                pullText: '下拉刷新...',
//
//                releaseText: '松开进行刷新...',
//
//                loadingText: '正在刷新...',
//
//                loadedText: '刷新完成.',
//
//                lastUpdatedText: '刷新时间:&nbsp;'
//            }],

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="list-item">',
                '<h1>{rwms}</h1>',
                '<h2>>&nbsp;塘段：{didian}</h2>',
                '<h2>>&nbsp;人员：{zpry}</h2>',
                '<div class="time">{sdatetime}</div>',
            '</div>'
        )
    }
});