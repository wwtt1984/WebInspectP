Ext.define('WebInspect.view.project.ProjectSecond', {
    extend: 'Ext.List',
    xtype: 'projectsecond',

    requires: [
        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '钱塘江管理局',

        store: 'ProjectSecondStore',

        loadingText: false,
        scrollToTopOnRefresh: false,

        plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                loadMoreText: '加载更多...',
                noMoreRecordsText: '没有更多记录了...',
                autoPaging:true
            }],

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },
        ui: 'round',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div>{name}</div>'
        ]
    }
});
