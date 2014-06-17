Ext.define('WebInspect.view.water.WaterDetail', {
    extend: 'Ext.List',
    xtype: 'waterdetail',

    requires: [

    ],

    config: {

        title: '水位站信息',

        loadingText: false,
        scrollToTopOnRefresh: false,
        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        store: 'WaterDetailStore',

        cls: 'tidelist',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:40%;font-size:18px;line-height:2.2em;text-align:center;float:left;">{name}</div>',
            '<div style="width:60%;font-size:18px;line-height:2.2em;text-align:center;float:right;">{value}</div>'
        ]
    }
});