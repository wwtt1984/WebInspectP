Ext.define('WebInspect.view.flow.Flow', {
    extend: 'Ext.List',
    xtype: 'flow',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {

        title: '流量信息',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        cls: 'tidelist',
        store: 'FlowStore',

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

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:40%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{stnm}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{Q}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{zrtend}</div>'
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
//                cls: 'tidelist-header',
                cls: 'tide-header',
                html: '<div style="width:40%;height:100%;float:left;">站点</div><div style="width:30%;height:100%;float:left;">流量(m³/s)</div><div style="width:30%;height:100%;float:left;">水势</div>'
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
                        itemId: 'flowSegmentedButton',
                        allowDepress: false,
                        allowMultiple: false,
                        items: [
                            {
                                text: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -2), 'Y-m-d')
                            },
                            {
                                text: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -1), 'Y-m-d')
                            },
                            {
                                text: Ext.Date.format(new Date(), 'Y-m-d'),
                                pressed: true
                            }]
                    }]
            }]
    }
});