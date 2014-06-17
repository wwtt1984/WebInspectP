/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.WaterControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            water: 'info water',
            waterSegmentedButton: '[itemId=waterSegmentedButton]',
            waterdetail: 'info waterdetail'
        },

        control: {
            water: {
                itemtap: 'onWaterItemTap'
            },
            waterSegmentedButton: {
                toggle: 'onWaterSegmentedTap'
            }
        }
    },

    onWaterInitialize: function(){
        this.onWaterStoreLoad('main', 0);

        this.water = this.getWater();
        if(!this.water){
            this.water= Ext.create('WebInspect.view.water.Water');
        }
        this.getInfo().push(this.water);
    },

    //水情信息中的“主要、河、库、闸、潮”信息选择
    onWaterSegmentedTap: function(me, button, isPressed, eOpts){
//        var text = me.getPressedButtons()[0].getText();
        if(isPressed){

            var text = button._text;
            switch(text){
                case '主要':
                    this.onWaterStoreLoad('main', 1);
                    break;
                case '河':
                    this.onWaterStoreLoad('river', 1);
                    break;
                case '库':

                    this.onWaterStoreLoad('reservoir', 1);
                    break;
                case '闸':

                    this.onWaterStoreLoad('strobe', 1);
                    break;
                case '潮':

                    this.onWaterStoreLoad('tidal', 1);
                    break;
            }
        }
    },

    onWaterStoreLoad: function(result, num){

        var store = Ext.getStore('WaterStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetWaterMainInfo',
            results: result + '$jsonp'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onWaterItemTap: function(list, index, target, record, e, eOpts){

        var store = Ext.getStore('WaterDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetWaterSingleInfo',
            results: record.data.stcdt + '$jsonp'
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        }, this);

        this.waterdetail = this.getWaterdetail();

        if(!this.waterdetail){
            this.waterdetail = Ext.create('WebInspect.view.water.WaterDetail');
        }

        this.getInfofunction().hide();
        this.getInfo().push(this.waterdetail);
    }

})