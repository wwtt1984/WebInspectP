/**
 * Created by USER on 14-8-12.
 */

Ext.define('WebInspect.view.inspect.InspectFailItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'inspectfailitem',

    requires: [
        'Ext.XTemplate'
    ],

    config: {

        cls: 'list-demo',

        items: [
            {
                xtype: 'container',
                cls: 'news-list',
                baseCls: 'x-list-item-label',
                itemId: 'inspectFailDetail',
                tpl: Ext.create('Ext.XTemplate',
                    '<div class="list-item">',
                    '    {[this.getImg(values)]}',
                    '    <h1>{miaos}</h1>',
                    '    <div class="time">{text}</div>',
                    '    <div class="time" style="float: right;">{sdt}</div>',
                    '</div>',
                    {
                        getImg: function(values){

                            var string = '';

                            if(values.imgjson){
                                string += '<img class="photo" src="' + values.imgjson.split(',')[0] + '" />';
                            }
                            else{
                                string += '<img class="photo" src="resources/images/nopic.jpg" />';
                            }
                            return string;
                        }
                    }
                ),

//                    '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{location}</div>',
//                    '<div style="font-size:15px; line-height: 1.6em;">描述：{miaos}</div>',
//                    '<div style="font-size:15px; line-height: 1.6em;">巡查时间：{sdt}</div>'
//                ],
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deleteInspectFail',
                        margin: '0 0 0 10px',
                        iconCls: 'trash',
                        iconMask: true
//                        text: '删除'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onFailDeleteButtonTap',
                event: 'tap',
                delegate: '#deleteInspectFail'
            }
        ]
    },

    onFailDeleteButtonTap: function(button, e, eOpts) {

        e.stopEvent();

        var me = this;

        var store = Ext.getStore('InspectUploadStore');
        store.remove(me.getRecord());
        store.sync();
        WebInspect.app.getController('InspectControl').onFailRecordToJson(store, 1);


    }

});