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
            setting: 'info setting',
            newsToggle: 'togglefield[itemId=newstoggle]',
            infoToggle: 'togglefield[itemId=infotoggle]',
            noticeToggle: 'togglefield[itemId=noticetoggle]'
        },

        control: {
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

    onNewsToggleChange: function(toggle, newValue, oldValue, eOpts){

        var me = this;

        me.getSetting().onToggleChange('news', newValue);

    },

    onInfoToggleChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getSetting().onToggleChange('info', newValue);
    },

    onNoticeToggleChange: function(toggle, newValue, oldValue, eOpts){
        var me = this;

        me.getSetting().onToggleChange('notice', newValue);
    }



})