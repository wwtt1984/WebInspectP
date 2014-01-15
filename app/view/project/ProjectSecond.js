Ext.define('WebInspect.view.project.ProjectSecond', {
    extend: 'Ext.List',
    xtype: 'projectsecond',

    config: {

        title: '钱塘江管理局',

        store: 'ProjectSecondStore',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        ui: 'round',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div>{OUName}</div>'
        ]
    }
});
