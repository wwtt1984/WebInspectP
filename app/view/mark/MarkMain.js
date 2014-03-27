/**
 * Created by USER on 14-3-21.
 */
Ext.define('WebInspect.view.mark.MarkMain', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'markmain',

    requires: [
        'Ext.XTemplate',
        'WebInspect.view.mark.Mark'
    ],

    config: {
        title: '海塘标识',

        cls: 'mycarousel',

        items:[
            {
                xtype: 'mark',
                mytitle: '位置标记'
            },
            {
                xtype: 'marklist',
                mytitle: '标牌列表'
            }
        ]
    }
});