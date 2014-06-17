Ext.define('WebInspect.view.rain.Rain', {
    extend: 'Ext.List',
    xtype: 'rain',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {

        title: '雨情信息',

        loadingText: false,
        scrollToTopOnRefresh: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        cls: 'tidelist',
        store: 'RainStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:31%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;overflow:hidden;text-overflow: clip;white-space: nowrap;">{stnm}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.formatNull(values.r1)]}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.formatNull(values.r3)]}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{[this.formatNull(values.r24)]}</div>',
            {
                formatNull: function(data) {
                    if(data != ''){
                        return data;
                    }
                    else{
                        return '--';
                    }
                }
            }
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
//                cls: 'tidelist-header',
                cls: 'tide-header',
                html: '<div style="width:31%;height:100%;float:left;">测站</div><div style="width:23%;height:100%;float:left;">1小时</div><div style="width:23%;height:100%;float:left;">3小时</div><div style="width:23%;height:100%;float:left;">24小时</div>'
            }
//            {
//                docked: 'bottom',
//                ui: 'gray',
//                xtype: 'toolbar',
//                style: 'border-top: 1px #ccc solid;',
//                items:[
//                    {
//                        width: '100%',
//                        padding: '0 5 0 0',
//                        defaults: {
//                            flex: 1
//                        },
//                        xtype: 'segmentedbutton',
//                        itemId: 'rainSegmentedButton',
//                        allowDepress: false,
//                        allowMultiple: false,
//                        items: [
//                            {
//                                text: '主要',
//                                pressed: true
//                            },
//                            {
//                                text: '河'
//                            },
//                            {
//                                text: '库'
//                            },
//                            {
//                                text: '闸'
//                            },
//                            {
//                                text: '潮'
//                            }]
//                    }]
//            }
        ]
    }
});