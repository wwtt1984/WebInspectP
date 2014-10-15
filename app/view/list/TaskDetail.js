/**
 * Created by xiaona on 14-2-19.
 */

Ext.define('WebInspect.view.list.TaskDetail',{

    extend: 'Ext.form.Panel',
    xtype: 'taskdetail',

    requires: [
        'Ext.XTemplate',
        'Ext.field.Select'
    ],

    config: {
        title: '待办事项',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        itemId: 'taskdetail',

        items: [
            {
                xtype: 'panel',
                style: 'padding: 10px 10px 0 10px;',
                itemId: 'taskImage',
                cls: 'local-form',
                tpl: Ext.create('Ext.XTemplate',
                    '<div style="min-height:1em;width:100%;font-size:18px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;">{NodeName}</div>',
                    '{[this.getImg(values)]}',
                    '<div class="x-form-fieldset-title">事件详情</div>',
//                    '<div class="detail">',
//                    '<tpl for="detail">',
//                        '<div class="local-form-text">',
//                        '<div class="label">',
////                            '<span>{text}</span>',
//                    '{text}',
//                        '</div>',
//                        '<div class="value">',
////                            '<span>{value}</sapn>',
//                    '{value}',
//                        '</div>',
//                        '</div>',
//                    '</tpl>',
                    '<div style="width:100%;min-height:2.5em;border-radius:0.4em;border:1px #ddd solid;">',
                      '<table class="tableform">',
                      '<tpl for="detail">',
                        '<tr width="100%" class="table-form">',
                          '<td class="label">{text}</td>',
                          '<td class="value">{value}</td>',
                        '</tr>',
                      '</tpl>',
                      '</table>',
                    '</div>',
                    {
                        getImg: function(values){

                            var img = [];
                            var string = '';
                            img = values.simg.split('$');

                            if(img.length > 0){
                                if(img[0].toLowerCase().indexOf(".jpg") > 0){
                                    string += '<img src="' + img[0] + '" style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';

                                    string += '<div style="min-height: 1.8em; width: 100%; font-size:12px; font-weight: normal; text-align: right; color: #666;padding:0 8px 5px 8px;"><div style="float: right;padding: 0.2em 0 0 0.3em;">张图片</div><div style="font-size: 16px;color: #000; font-weight: bold;float: right;">' + img.length + '</div><div style="float: right;padding: 0.2em 0.3em 0 0;">共计</div></div>';
                                }
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

                            Ext.ComponentQuery.query('#info')[0].onImageShow(values);

                        }
                    }
                )
            },
            {
                xtype: 'fieldset',
                title: '处理方式（请选择）',
                itemId: 'dispose_panel',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'selectfield',
                        label: '处理方式',
                        name: 'dispose',
                        itemId: 'dispose',
                        defaultPhonePickerConfig: {
                            doneButton: '确定',
                            cancelButton: '取消'
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '批复意见（请选择）',
                itemId: 'opinion_panel',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'selectfield',
                        label: '批复意见',
                        name: 'opinion',
                        itemId: 'opinion',
                        defaultPhonePickerConfig: {
                            doneButton: '确定',
                            cancelButton: '取消'
                        },
                        options: [
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff;',
//                itemId: 'zhuanfa',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'selectfield',
                        label: '转发给',
                        name: 'forward',
                        itemId: 'forward',
                        defaultPhonePickerConfig: {
                            doneButton: '确定',
                            cancelButton: '取消'
                        },
                        options: [

                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff;',
                itemId: 'opinionms_panel',
                hidden: true,
                items: [
                    {
                        label: '请输入原因',
                        labelAlign: 'top',
                        xtype: 'textareafield',
                        cls: 'miaos',
                        itemId:'opinion_ms',
                        value: '同意'
                    }
                ]
            },
            {
                xtype: 'panel',
                defaults: {
                    xtype : 'button',
                    style: 'min-height: 2.2em;',
                    cls   : 'demobtn',
                    flex  : 1,
                    margin: 10
                },
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items: [
                    {
                        text: '确定',
                        itemId: 'taskconfirm'
                    }
                ]
            }
        ]
    },

    onDataSet: function(record){

        var me = this;

        var store = Ext.getStore('TaskDetailStore');
        var dispose = store.getAt(0).data.disposes;
        var reply = store.getAt(0).data.replys;
        var img = record.data.Simgurl;

        Ext.ComponentQuery.query('#taskImage')[0].setData({simg: img, NodeName: record.data.NodeName});
        Ext.ComponentQuery.query('#opinion')[0].setOptions(reply);
    }
})