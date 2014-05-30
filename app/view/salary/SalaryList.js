/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.view.salary.SalaryList', {
    extend: 'Ext.List',
    xtype: 'salarylist',

    requires: [
    ],

    config: {

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        currentDate: '',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,
        cls: 'tidelist',
        infinite: true,
        variableHeights: false,
//        store: 'ScheduleStore',


        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<div style="width:100%;height:100%;font-size:18px;line-height:2.2em;min-height:42px; text-align:center;padding:0;margin:0;">',
            '<div style="width:30%;float:left;overflow:hidden;text-overflow:clip;white-space:nowrap;">{type}</div>',
            '<div style="width:70%;float:right;">{value}</div>',
            '</div>'
        )
    }
});