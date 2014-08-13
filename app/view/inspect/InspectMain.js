/**
 * Created by USER on 14-7-2.
 */

Ext.define('WebInspect.view.inspect.InspectMain', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'inspectmain',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '海塘巡查',

        cls: 'mycarousel',


        items:[
            {
                xtype: 'inspect',
                mytitle: '巡查上报'
            },
            {
                xtype: 'news',
                store: 'InspectStore',
                mytitle: '巡查列表'
            },
            {
                xtype: 'inspectfail',
                store: 'InspectUploadStore',
                mytitle: '失败列表'
            }
        ]
    }
});