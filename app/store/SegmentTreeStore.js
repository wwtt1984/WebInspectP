/**
 * Created by USER on 14-4-10.
 */

Ext.define('WebInspect.store.SegmentTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.SegmentTreeStore',

    requires: [
        'WebInspect.model.TreeModel'
    ],

    config: {
        autoLoad: false,
        model: 'WebInspect.model.TreeModel',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk'
//            extraParams: {
//                t: 'GetXcjhTD',
//                results: 'jsonp'
//            },
//            reader: {
//                type: 'json'
//            }
        },
        root: {
            id:'td',
            expanded:false
        }
    }
})