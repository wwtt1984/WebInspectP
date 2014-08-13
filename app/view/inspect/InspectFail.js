/**
 * Created by USER on 14-8-12.
 */

Ext.define('WebInspect.view.inspect.InspectFail', {
//    extend: 'Ext.Panel',
        extend: 'Ext.dataview.DataView',
        xtype: 'inspectfail',

        requires: [
        ],

        config: {

            itemId: 'inspectfail',

            scrollable: {
                direction: 'vertical',
                directionLock: true
            },

            mode: 'MULTI',
            baseCls: 'x-list',
            cls: 'x-list-normal',
            emptyText: '<p class="no-searches" style="margin-top:50%;">没有本地记录</p>',
            disableSelection: true,
            defaultType: 'inspectfailitem',
            store: 'InspectUploadStore',
            useComponents: true,
            loadingText: '努力加载中...'
        }
    });