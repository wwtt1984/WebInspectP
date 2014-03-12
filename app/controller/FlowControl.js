/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.FlowControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            flow: 'info flow',
            flowSegmentedButton: '[itemId=flowSegmentedButton]'
        },

        control: {
            flowSegmentedButton: {
                toggle: 'onFlowSegmentedTap'
            }
        }
    },

    onFlowInitialize: function(){
        this.onFlowStoreLoad(Ext.Date.format(new Date(), 'Y-m-d').toString(), 0);
        this.flow = this.getFlow();
        if(!this.flow){
            this.flow = Ext.create('WebInspect.view.flow.Flow');
        }
        this.getInfo().push(this.flow);
    },

    onFlowSegmentedTap: function(me, button, isPressed, eOpts){
        if(isPressed){

            var text = button._text;
            this.onFlowStoreLoad(text, 1);
        }
    },

    onFlowStoreLoad: function(result, num){

        if(num == 0){
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });
        }

        var store = Ext.getStore('FlowStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetFlowMainInfo',
            results: result + '$jsonp'
        });

        store.load(function(records, operation, success) {
            if(num == 0){
                Ext.Viewport.setMasked(false);
            }
        });
    }
})