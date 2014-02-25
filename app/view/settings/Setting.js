/**
 * Created by xiaona on 14-1-13.
 */

Ext.define('WebInspect.view.settings.Setting', {
    extend: 'Ext.form.Panel',
    xtype: 'setting',

    requires: [
        'Ext.field.Toggle'
    ],

    config: {
        title: '系统设置',

       items:[
           {
               xtype: 'fieldset',
               title: '消息推送设置',
               defaults: {
                   labelWidth: '40%'
               },

               items:[
                   {
                       xtype: 'togglefield',
                       cls: 'setting',
                       name: 'news',
                       itemId: 'newstoggle',
                       label: '内网新闻'
                   },
                   {
                       xtype: 'togglefield',
                       name: 'info',
                       itemId: 'infotoggle',
                       cls: 'setting',
                       label: '综合信息'
                   },
                   {
                       xtype: 'togglefield',
                       name: 'notice',
                       itemId: 'noticetoggle',
                       cls: 'setting',
                       label: '通知公告'
                   }
               ]
           },
           {
               xtype: 'panel',
               defaults: {
                   xtype : 'button',
                   style: 'background:white;width:100%;min-height: 2.2em;',
                   cls   : 'demobtn',
                   flex  : 1,
                   margin: '0 13 10 13'
               },
               layout: {
                   type: 'hbox',
                   align: 'middle'
               },
               items: [
                   {
                       text: '退出系统',
                       style: 'background:#d90303;color:white;min-height: 2.2em;',
                       itemId: 'sysquit'
                   }]
           }]
    },


    initialize: function(){

        this.tag = 0;
        this.onToggleValueSet();
    },

    onToggleValueSet: function(){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

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

            var user = Ext.create('WebInspect.model.SettingsModel', {
                news:         store.getAt(0).data.news,
                info:          store.getAt(0).data.info,
                notice:       store.getAt(0).data.notice
            });

            me.setRecord(user);

            Ext.Viewport.setMasked(false);

            me.tag = 1;
        }, this);
    },

    onToggleChange: function(type, value){


        var me = this;

        if(me.tag == 1){

            var results = WebInspect.app.user.sid + '$' + type + ',' + value + '$jsonp';

            Ext.data.proxy.SkJsonp.validate('UpdatePushPerson',results,{
                success: function(response) {

                    if(response.success == "true"){
                        plugins.Toast.ShowToast("设置成功！",1000);
//                        Ext.Msg.alert('设置成功！');
                    }
                    else{
                        plugins.Toast.ShowToast("设置失败，请重试！",1000);
//                        Ext.Msg.alert('设置失败，请重试！');

                        var val = 0;
                        if(value){
                            val = 0;
                        }
                        else{
                            val = 1;
                        }
                        me.setRecord({name: type, value: val});
                    }
                },
                failure: function() {
                    plugins.Toast.ShowToast("请求失败，请重试！",1000);
//                    Ext.Msg.alert('请求失败，请重试！');

                    var val = 0;
                    if(value){
                        val = 0;
                    }
                    else{
                        val = 1;
                    }
                    me.setRecord({name: type, value: val});
                }
            });
        }
    }
});