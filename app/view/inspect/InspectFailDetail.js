/**
 * Created by USER on 14-8-12.
 */

Ext.define('WebInspect.view.inspect.InspectFailDetail',{

    extend: 'Ext.Panel',
    xtype: 'inspectfaildetail',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '详细信息',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px;',

        tpl: Ext.create('Ext.XTemplate',
            '<div style="min-height:2.2em;width:100%;font-size:18px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;">{miaos}</div>',
            '{[this.getImg(values)]}',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">地区：{oulevel}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">巡查塘段：{text}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">巡查时间：{sdt}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">事件类型：{type}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">描述：{miaos}</p>',
            {
                getImg: function(values){
                    var img = [];
                    var string = '';
                    img = values.imgjson.split(',');

                    if(img.length > 0){
//                        if(img[0].toLowerCase().indexOf(".jpg") > 0 || img[0].toLowerCase().indexOf(".png") > 0){
                        string += '<img src="' + img[0] + '" style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';
                        // string += '<img style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';

                        string += '<div style="min-height: 1.8em; width: 100%; font-size:12px; font-weight: normal; text-align: right; color: #666;padding:0 8px 5px 8px;"><div style="float: right;padding: 0.2em 0 0 0.3em;">张图片</div><div style="font-size: 16px;color: #000; font-weight: bold;float: right;">' + img.length + '</div><div style="float: right;padding: 0.2em 0.3em 0 0;">共计</div></div>';
//                        }

                    }
                    return string;
                },
                getLinkId: function(values) {
                    var result = Ext.id();
                    Ext.Function.defer(this.addListener, 1, this, [result,values]);
                    return result;
                },
                addListener: function(id,values) {
                    var me = this;
                    Ext.get(id).on('tap', function(e){
                        me.addImg(values);
                    })//////增加add图片的事件
                },
                addImg:function(values){

                    Ext.ComponentQuery.query('#info')[0].onFailImageShow(values);

                }
            }
        )
    },

    onDataSet: function(record){
        this.setData({text:record.data.text, sdt:record.data.sdt, oulevel:record.data.oulevel,
            miaos: record.data.miaos, type: record.data.type, imgjson: record.data.imgjson});
    }
});