/**
 * Created by USER on 14-7-2.
 */

Ext.define('WebInspect.view.inspect.Inspect', {
    extend: 'Ext.Panel',
    xtype: 'inspect',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        itemId: 'inspect',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px 10px 0 10px;',

        items: [
            {
                xtype: 'panel',
                cls: 'local-form',
                itemId: 'inspectlocation',

                tpl: Ext.create('Ext.XTemplate',
                    '<div class="local-form-div" style="margin: 0 0 0 0">',
                    '<div class="label">',
                    '<span>巡查塘段</span>',
                    '</div>',
                    '<div class="choose" id="{[this.getLinkId(values)]}">',
//                            '<span>{[this.getContent(values.td)]}</span>',
                    '<span>{text}</span>',
                    '<img src="resources/images/code3.png" style="color:#ccc;float:right;width:20px;height:20px;margin-top:3px;"/>',
                    '</div>',
                    '</div>',
                    {

                        getLinkId: function(values){

                            var result = Ext.id();
                            Ext.Function.defer(this.addListener, 1, this, [result,values]);
                            return result;
                        },
                        addListener: function(id,values) {

                            var me = this;

                            Ext.get(id).addListener('tap', function(e){

                                e.stopEvent();
                                Ext.ComponentQuery.query('#inspect_ms')[0].blur();/////////////////把焦点失掉//////////////////////////

                                WebInspect.app.getController('InspectControl').onInspectListPush();

                            })//////增加点击的事件
                        }
                    }
                )
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;',
                items: [
                    {
                        label: '事件类型',
                        labelAlign: 'left',
                        xtype: 'selectfield',
                        itemId: 'inspecttype',
                        options: [
                            {text: '水政类',  value: '水政类'},
                            {text: '工况类', value: '工况类'},
                            {text: '防潮设施类',  value: '防潮设施类'}
                        ]
                    }]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 15px 0 0 0;',
                itemId: 'textpanel',
                items: [
                    {
                        label: '请输入描述',
                        labelAlign: 'top',
                        xtype: 'textareafield',
                        cls: 'miaos',
                        itemId:'inspect_ms'
                    }]
            },
            {
                xtype: 'panel',
                html: '<div style="font-size: 18px;font-weight; margin-top:10px;bold;height: 2em;line-height: 2em;">拍照请按下面+按钮:</div>'
            },
            {
                xtype: 'inspectphoto',
                style: 'background:#fff;border-radius: .4em;border:1px #eee solid; min-height:80px;'
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                items: [
                    {
                        xtype: 'button',
                        text: '上传',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 0 0 0;',
                        itemId: 'inspectconfirm'
                    }
                ]

            }
        ]
    }


})