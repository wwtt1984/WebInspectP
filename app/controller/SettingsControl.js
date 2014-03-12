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
            newscheck: 'checkboxfield[itemId=newscheck]',
            infocheck: 'checkboxfield[itemId=infocheck]',
            noticecheck: 'checkboxfield[itemId=noticecheck]',
            sysquit: '[itemId=sysquit]'
        },

        control: {
            settinglist: {
                itemtap: 'onSettingListTap'
            },
            newscheck: {
                change: 'onNewsCheckChange'
            },
            infocheck: {
                change: 'onInfoCheckChange'
            },
            noticecheck: {
                change: 'onNoticeCheckChange'
            },
            sysquit: {
                tap: 'onQuitSystemTap'
            }
        }
    },

    onSettingInitialize: function(){
        this.setting = this.getSetting();
        if(!this.setting){
            this.setting = Ext.create('WebInspect.view.settings.Setting');
        }
        this.getInfo().push(this.setting);
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

    onNewsCheckChange: function(toggle, newValue, oldValue, eOpts){

        var me = this;

        me.getPushsetting().onCheckChange('news', me.getNewscheck(), newValue);

    },

    onInfoCheckChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getPushsetting().onCheckChange('info', me.getInfocheck(), newValue);
    },

    onNoticeCheckChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getPushsetting().onCheckChange('notice', me.getNoticecheck(), newValue);
    },

    onQuitSystemTap: function(){
        var me = this;
        me.getApplication().getController('MainControl').onQuitSystemTap();
    }

})