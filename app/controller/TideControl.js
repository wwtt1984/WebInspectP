/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.TideControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            tide: 'info tide',
            tidepop: 'info tidepop'
        },

        control: {
            tide: {
                itemtap: 'onTideItemTap'
            },
            '#tideSegmentedButton': {
                toggle: 'onTideSegmentedTap'
            }
        }
    },

    onTideInitialize: function(){
        var store = Ext.getStore('TideStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetTidal',
            results: 'jsonp'
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        this.tide = this.getTide();
        if(!this.tide){
            this.tide= Ext.create('WebInspect.view.tide.Tide');
        }

        store.load(function(records, operation, success){

            store.clearFilter();
            store.filter("sdate", Ext.Date.format(new Date(), 'Y-m-d').toString());
            if(store.getAllCount() == store.getCount()){
                Ext.getCmp('tidetoolbar').hide();
                Ext.getCmp('tidepanel').show();
            }
            else{
                Ext.getCmp('tidetoolbar').show();
                Ext.getCmp('tidepanel').hide();
            }
            Ext.Viewport.setMasked(false);
        }, this);

        this.getInfo().push(this.tide);
    },

    //点击选择“潮位信息”中的一条信息后，显示具体信息
    onTideItemTap: function(list, index, target, record, e, eOpts){

        if (!this.tidepop) {
//            this.tidepop.destroy();
            this.tidepop = Ext.create('WebInspect.view.tide.TidePop');
        }
        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.tidepop.setWidth(null);
            this.tidepop.setMinHeight('45%');
            this.tidepop.setTop(null);
            this.tidepop.setLeft(0);
        }

        this.tidepop.onDataSet(record);
        if (!this.tidepop.getParent()) {
            Ext.Viewport.add(this.tidepop);
        }
        this.tidepop.show();
    },

    //潮位信息中的“segmentedbutton”事件，选择后，显示该日期的“潮位信息”
    onTideSegmentedTap: function(me, button, isPressed, eOpts){
        if(isPressed){
            var store = Ext.getStore('TideStore');
            store.clearFilter();

            store.filter("sdate",button._text);
        }
    }

})