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
                tpl: Ext.create('Ext.XTemplate',
                    '<div style="min-height:1em;width:100%;font-size:18px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;">{NodeName}</div>',
                    '{[this.getImg(values)]}',
                    {
                        getImg: function(values){

                            var img = [];
                            var string = '';
                            img = values.simg.split('$');

                            if(img.length > 0){
                                if(img[0].toLowerCase().indexOf(".jpg") > 0){
                                    string += '<img src="http://bpm.qgj.cn/test/' + img[0] + '" style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';

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
                title: '事件详细信息',
                itemId:'taskmain',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'NodeName',
                        label: '任务',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'OwnerAccount',
                        label: '人员',
                        readOnly: true
                    },

                    {
                        xtype: 'textfield',
                        name: 'ReceiveAt',
                        label: '接收时间',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '批复意见（请选择）',
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
                            {
                                text: '复核',  value: '复核'
                            },
                            {
                                text: '上报领导',  value: '上报领导'
                            },
                            {
                                text: '即时',  value: '即时'
                            },
                            {
                                text: '海塘工况',  value: '海塘工况'
                            },
                            {
                                text: '养护',  value: '养护'
                            },
                            {
                                text: '项目监管',  value: '项目监管'
                            },
                            {
                                text: '关闭流程',  value: '关闭流程'
                            }
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
                        name: 'zhuanfaren',
                        itemId: 'zhuanfaren',
                        defaultPhonePickerConfig: {
                            doneButton: '确定',
                            cancelButton: '取消'
                        },
                        options: [
                            {
                                text: '陶金平',  value: 'tjp'
                            },
                            {
                                text: '徐建龙',  value: 'xujl'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff;',
                itemId: 'opinion_panel',
//                hidden: true,
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

        var img = record.data.Simgurl;

        Ext.ComponentQuery.query('#taskImage')[0].setData({simg: img, NodeName: record.data.NodeName});

        me.setRecord(record);
    }
})