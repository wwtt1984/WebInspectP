/**
 * Created by USER on 14-6-17.
 */

Ext.define('WebInspect.view.project.ProjectThird', {
    extend: 'Ext.List',
    xtype: 'projectthird',

    config: {

        title: '钱塘江管理局',

        store: 'ProjectThirdStore',

        loadingText: false,
        scrollToTopOnRefresh: false,

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