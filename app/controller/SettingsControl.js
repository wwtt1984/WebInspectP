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
            module: 'info module',
            version: 'info version',
            newscheck: 'checkboxfield[itemId=newscheck]',
            infocheck: 'checkboxfield[itemId=infocheck]',
            noticecheck: 'checkboxfield[itemId=noticecheck]',
            sysquit: '[itemId=sysquit]',
            moduleconfirm: '[itemId=moduleconfirm]'
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
            },
            moduleconfirm: {
                tap: 'onModuleConfirmTap'
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
            case '功能设置':
                me.onModuleSet();
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

    onModuleSet: function(){
        var me = this;

        me.module = me.getModule();
        if(!me.module){
            me.module = Ext.create('WebInspect.view.settings.Module');
        }
        me.getInfofunction().hide();
        me.module.onDataSet();
        me.getInfo().push(me.module);
    },

    onModuleConfirmTap: function(){
        var me = this;
        me.getModule().onModuleRequest();
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