/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.RainControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            rain: 'info rain'
        },

        control: {

        }
    },

    onRainInitialize: function(){
        this.onRainStoreLoad();

        this.rain = this.getRain();
        if(!this.rain){
            this.rain= Ext.create('WebInspect.view.rain.Rain');
        }
        this.getInfo().push(this.rain);
    },

    onRainStoreLoad: function(){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('RainStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetRainInfo',
            results: 'jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);
        }, this);
    }

})