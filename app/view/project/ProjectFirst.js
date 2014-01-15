/**
 * Created by xiaona on 14-1-15.
 */

Ext.define('WebInspect.view.project.ProjectFirst', {
    extend: 'Ext.List',
    xtype: 'projectfirst',

    requires: [
    ],

    config: {

        title: '钱塘江管理局',

        store: 'ProjectFirstStore',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        ui: 'round',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div>{OUName}</div>'
        ]
    }
});
