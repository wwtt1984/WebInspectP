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

        loadingText: false,
        scrollToTopOnRefresh: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        ui: 'round',

        grouped: true,

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div>{location}<img src="resources/images/code3.png" style="height:18px;width:18px;margin:2px 0 0 0;float:right;"><div style="float:right;">{num}&nbsp;</div></div>'
        ]
    }
});
