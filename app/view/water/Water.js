Ext.define('WebInspect.view.water.Water', {
    extend: 'Ext.List',
    xtype: 'water',

    requires: [
//        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '水情信息',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

//        plugins: [
//            {
//                xclass: 'Ext.plugin.ListPaging',
//                loadMoreText: '加载更多...',
//                noMoreRecordsText: '没有更多记录了...',
//                autoPaging:true
//            }
//        ],

        cls: 'tidelist',
        store: 'WaterStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:40%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{stnm}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{zu}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{jjz}</div>'
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tidelist-header',
                html: '<div style="width:40%;height:100%;float:left;">测站</div><div style="width:30%;height:100%;float:left;">水位</div><div style="width:30%;height:100%;float:left;">超警</div>'
            },
            {
                docked: 'bottom',
                ui: 'gray',
                xtype: 'toolbar',
                style: 'border-top: 1px #ccc solid;',
                items:[
                    {
                        width: '100%',
                        padding: '0 5 0 0',
                        defaults: {
                            flex: 1
                        },
                        xtype: 'segmentedbutton',
                        itemId: 'waterSegmentedButton',
                        allowDepress: false,
                        allowMultiple: false,
                        items: [
                            {
                                text: '主要',
                                pressed: true
                            },
                            {
                                text: '河'
                            },
                            {
                                text: '库'
                            },
                            {
                                text: '闸'
                            },
                            {
                                text: '潮'
                            }]
                    }]
            }
        ]
    }
});