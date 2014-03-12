/**
 * Created by xiaona on 14-3-4.
 */

Ext.define('WebInspect.view.settings.PushSetting', {
    extend: 'Ext.form.Panel',
    xtype: 'pushsetting',

    requires: [
        'Ext.field.Toggle'
    ],

    config: {
        title: '推送设置',

        items:[
            {
                xtype: 'fieldset',
                title: '消息推送设置',
                defaults: {
                    labelWidth: '40%'
                },

                items:[
//                    {
//                        xtype: 'checkboxfield',
//                        name: 'info',
//                        itemId: 'infotoggle',
//                        cls: 'pushsetting',
//                        label: '综合信息'
//                    },
//                    {
//                        xtype: 'checkboxfield',
//                        name: 'notice',
//                        itemId: 'noticetoggle',
//                        cls: 'pushsetting',
//                        label: '通知公告'
//                    }
                ]
            }
        ]
    },


    initialize: function(){

        this.tag = 0;
        this.onCheckValueSet();
    },

    onCheckValueSet: function(){

        var me = this;

        var store = Ext.create('Ext.data.Store', {

            model: 'WebInspect.model.SettingsModel',
            proxy: {
                type: 'sk'
            }
        });

        store.getProxy().setExtraParams({
            t:'GetPushPersonZt',
            results: WebInspect.app.user.sid + '$jsonp'
        });

        store.load(function(records, operation, success){

            var item = [];
            item.push({xtype: 'checkboxfield',name: 'news',itemId: 'newscheck',label: '内网新闻',checked: store.getAt(0).data.news});
            item.push({xtype: 'checkboxfield',name: 'info',itemId: 'infocheck',label: '综合信息',checked: store.getAt(0).data.info});
            item.push({xtype: 'checkboxfield',name: 'notice',itemId: 'noticecheck',label: '通知公告',checked: store.getAt(0).data.notice});

            me.getItems().items[0].setItems(item);
            me.tag = 1;
        }, this);
    },

    onCheckChange: function(type, checkfield, value){

        var me = this;

        var value1 = 0;
        if(value){
            value1 = 1;
        }

        if(me.tag){

            var results = WebInspect.app.user.sid + '$' + type + ',' + value1 + '$jsonp';

            Ext.data.proxy.SkJsonp.validate('UpdatePushPerson',results,{
                success: function(response) {
                    if(response.success == "true"){

                        plugins.Toast.ShowToast("设置成功！",1000);
                        me.tag = 1;
//                        Ext.Msg.alert('设置成功！');
                    }
                    else{

                        plugins.Toast.ShowToast("设置失败，请重试！",1000);
//                        Ext.Msg.alert('设置失败，请重试！');
                        me.tag = 0;
                        var val = 0;
                        if(value){
                            checkfield.uncheck();
                        }
                        else{
                            checkfield.check()
                        }
                        me.tag = 1;
                    }
                },
                failure: function() {

                    plugins.Toast.ShowToast("请求失败，请重试！",1000);
//                    Ext.Msg.alert('请求失败，请重试！');

                    me.tag = 0;

                    if(value){
                        checkfield.uncheck();
                    }
                    else{
                        checkfield.check()
                    }
                    me.tag = 1;

                }
            });
        }
    }
});