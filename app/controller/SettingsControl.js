/**
 * Created by xiaona on 14-2-15.
 */

Ext.define('WebInspect.controller.SettingsControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'info',
            infofunction: '[itemId=infofunction]',
            setting: 'info setting',
            settinglist: '[itemId=settinglist]',
            pushsetting: 'info pushsetting',
            version: 'info version',
            newsToggle: 'togglefield[itemId=newstoggle]',
            infoToggle: 'togglefield[itemId=infotoggle]',
            noticeToggle: 'togglefield[itemId=noticetoggle]'
        },

        control: {
            settinglist: {
                itemtap: 'onSettingListTap'
            },
            newsToggle: {
                change: 'onNewsToggleChange'
            },
            infoToggle: {
                change: 'onInfoToggleChange'
            },
            noticeToggle: {
                change: 'onNoticeToggleChange'
            }
        }
    },

    onSettingListTap: function(list, index, target, record, e, eOpts ){

        var me = this;
        switch(record.data.name){
            case '推送设置':
                me.onPushSettingSet();
                break;
            case '系统设置':

                break;
            case '软件版本':
                me.onVersionSet();
                break;
        }
    },

    onPushSettingSet: function(){
        var me = this;

        me.pushsetting = me.getPushsetting();
        if(!me.pushsetting){
            me.pushsetting = Ext.create('WebInspect.view.settings.PushSetting');
        }
        me.getInfofunction().hide();
        me.pushsetting.onToggleValueSet();
        me.getInfo().push(me.pushsetting);
    },

    onVersionSet: function(){
        var me = this;

        me.version = me.getVersion();
        if(!me.version){
            me.version = Ext.create('WebInspect.view.settings.Version');
        }
        me.getInfofunction().hide();
        me.version.onDataSet();
        me.getInfo().push(me.version);
    },

    onNewsToggleChange: function(toggle, newValue, oldValue, eOpts){

        var me = this;

        me.getPushsetting().onToggleChange('news', newValue);

    },

    onInfoToggleChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getPushsetting().onToggleChange('info', newValue);
    },

    onNoticeToggleChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getPushsetting().onToggleChange('notice', newValue);
    }

})