/**
 * Created by USER on 14-5-15.
 */

Ext.define('WebInspect.view.assign.AssignMain', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'assignmain',

    requires: [
        'Ext.XTemplate',
        'WebInspect.view.assign.Assignment'
    ],

    config: {
        title: '指派任务',

        cls: 'mycarousel',

        items:[
            {
                xtype: 'assignment',
                mytitle: '指派任务'
            },
            {
                xtype: 'assignhistory',
                mytitle: '任务列表'
            }
        ]
    }
});