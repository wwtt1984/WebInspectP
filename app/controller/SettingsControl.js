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
            main: 'main',
            info: 'info',
            infofunction: '[itemId=infofunction]',
            setting: 'info setting',
            settinglist: '[itemId=settinglist]',
            pushsetting: 'info pushsetting',
            module: 'info module',
            version: 'info version',
            update: 'info update',
            newscheck: 'checkboxfield[itemId=newscheck]',
            infocheck: 'checkboxfield[itemId=infocheck]',
            noticecheck: 'checkboxfield[itemId=noticecheck]',
            sysquit: '[itemId=sysquit]',
            moduleconfirm: '[itemId=moduleconfirm]',
            pushconfirm: '[itemId=pushconfirm]',
            changeuser: '[itemId=changeuser]'
        },

        control: {
            settinglist: {
                itemtap: 'onSettingListTap'
            },
//            newscheck: {
//                change: 'onNewsCheckChange'
//            },
//            infocheck: {
//                change: 'onInfoCheckChange'
//            },
//            noticecheck: {
//                change: 'onNoticeCheckChange'
//            },
            pushconfirm: {
                tap: 'onPushConfirmTap'
            },
            sysquit: {
                tap: 'onQuitSystemTap'
            },
            moduleconfirm: {
                tap: 'onModuleConfirmTap'
            },
            changeuser: {
                tap: 'onChangeUserTap'
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
        var titlestr = ['pushsetting', 'module', 'version', 'update'];

        switch(record.data.name){
            case titlestr[0]:
                me.onPushSettingSet();
                break;
            case titlestr[1]:
                me.onModuleSet();
                break;
            case titlestr[2]:
                me.onVersionSet();
                break;
            case titlestr[3]:
                me.onUpdateSet();
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

    onPushConfirmTap: function(){
        var me = this;
        me.getPushsetting().onPushRequest();
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

//    onNewsCheckChange: function(toggle, newValue, oldValue, eOpts){
//
//        var me = this;
//
//        me.getPushsetting().onCheckChange('news', me.getNewscheck(), newValue);
//
//    },
//
//    onInfoCheckChange: function(toggle, newValue, oldValue, eOpts){
//        var me = this;
//
//        me.getPushsetting().onCheckChange('info', me.getInfocheck(), newValue);
//    },
//
//    onNoticeCheckChange: function(toggle, newValue, oldValue, eOpts){
//        var me = this;
//
//        me.getPushsetting().onCheckChange('notice', me.getNoticecheck(), newValue);
//    },

    onUpdateSet: function(){
        var me = this;

        me.update = me.getUpdate();
        if(!me.update){
            me.update = Ext.create('WebInspect.view.settings.Update');
        }
        me.getInfofunction().hide();
        me.update.onDataSet();
        me.getInfo().push(me.update);
    },

    onQuitSystemTap: function(){
        var me = this;
        me.getApplication().getController('MainControl').onQuitSystemTap();
    },

    onChangeUserTap: function(){
        var me = this;
        var src = me.getMain();
        me.getInfo().destroy();
        src.setActiveItem(me.getApplication().getController('MainControl').getLogin());
        plugins.Vpn.VpnOFF();//关闭VPN
    }

})