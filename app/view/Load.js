/**
 * Created by USER on 14-5-20.
 */

Ext.define('WebInspect.view.Load', {
    extend: 'Ext.Panel',
    xtype: 'load',
//    id: 'load',

    requires: [
        'Ext.XTemplate'
    ],

    config:{
//        style: 'background:url(resources/images/function/header.png);',
        itemId: 'load',
        modal: true,
        centered: true,
        hideOnMaskTap: false,

        width: '80%',

        cls: 'download',
        tpl:  Ext.create('Ext.XTemplate',
            '<div style="min-height:5em;width:100%;">',
            '<div class="header">更新下载中</div>',
            '<div class="content">正在下载中...{width}%</div>',
            '<div class="loading-status">',
            '<div class="percent" style="width:{[this.getWidth(values)]};color:#fff;font-size:12px;line-height:12px;">&nbsp;&nbsp;{width}%</div>',
            '</div>',
            '</div>',
            {
                getWidth: function(values){
                    return values.width + '%';
                }
            }
        )

//        items:[
//            {
//                xtype: 'toolbar',
//                ui: 'gray',
//                style: 'border-top: 1px #ccc solid;',
//                docked: 'bottom',
//                items:[
//                    {
//                        xtype: 'button',
//                        left: 0,
//                        width: '45%',
//                        text: '确定'
//                    },
//                    {
//                        xtype: 'button',
//                        right: 0,
//                        width: '45%',
//                        text: '取消'
//                    }]
//            }]
    },

    initialize: function(){
        this.setData({width: 0});
    },

    onDataSet: function(width){
        this.setData({width: width});
    }
});