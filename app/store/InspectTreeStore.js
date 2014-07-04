/**
 * Created by USER on 14-7-2.
 */

Ext.define('WebInspect.store.InspectTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.InspectTreeStore',

    requires: [
        'WebInspect.model.TreeModel'
    ],

    config: {
        autoLoad: false,
        model: 'WebInspect.model.TreeModel',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk'
        },
        root: {
            id:'td',
            expanded:false
        }
    }
})