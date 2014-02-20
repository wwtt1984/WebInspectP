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
                    '<div style="min-height:2.2em;width:100%;font-size:18px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;">{NodeName}</div>',
                    '{[this.getImg(values)]}',
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
                title: '事件详细信息',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'StepID',
                        label: 'StepID',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'TaskID',
                        label: 'TaskID',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'ProcessName',
                        label: 'ProcessName',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'NodeName',
                        label: 'NodeName',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'OwnerAccount',
                        label: 'OwnerAccount',
                        readOnly: true
                    },

                    {
                        xtype: 'textfield',
                        name: 'ReceiveAt',
                        label: 'ReceiveAt',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'Comments',
                        label: 'Comments',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'TimeoutDeadline',
                        label: 'TimeoutDeadline',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'CreateAt',
                        label: 'CreateAt',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'Description',
                        label: 'Description',
                        readOnly: true
                    },

                    {
                        xtype: 'textfield',
                        name: 'State',
                        label: 'State',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'SerialNum',
                        label: 'SerialNum',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'AgentAccount',
                        label: 'AgentAccount',
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
                        defaultPhonePickerConfig: {
                            doneButton: '确定',
                            cancelButton: '取消'
                        },
                        options: [
                            {
                                text: '同意',  value: 'tongyi'
                            },
                            {
                                text: '忽略',  value: 'hulue'
                            },
                            {
                                text: '上报',  value: 'report'
                            }
                        ]
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
                        text: '确定'
                    }]
//                {
//                    text: '取消',
//                    id: 'cancel'
//                }]
            }
        ]
    },

    onDataSet: function(record){

        var me = this;

        var img = "http://bpm.qgj.cn/test/upload/news/big/2014021117004181278.jpg$http://bpm.qgj.cn/test/upload/news/big/2014021117004189090.jpg";

        Ext.ComponentQuery.query('#taskImage')[0].setData({simg: img, NodeName: record.data.NodeName});

        me.setRecord(record);
    }
})