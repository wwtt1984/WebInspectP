Ext.define('WebInspect.view.project.ProjectMain', {
    extend: 'Ext.Panel',
    xtype: 'projectmain',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

//        emptyText: '<p class="no-searches" style="margin-top:50%;">没有离线消息</p>',

        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tpl for=".">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">{data.type}</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.value)]}</td>',
            '</tr>',
            '</tpl>',
            '</table>',
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
        )
    },

    onDataSet: function(code){
        var me = this;

        var store = Ext.getStore('ProjectMainStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqInfoCommon',
            results: code + '$jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);

            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                if(store.getAllCount()){

                    me.setData(store.getData().all);
                }
                else{
                    me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有主要字段</p>');
                }
            }
        });
    }
});
