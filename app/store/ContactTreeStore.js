Ext.define('WebInspect.store.ContactTreeStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'WebInspect.model.TreeModel'
    ],

    config: {
        autoLoad: true,
        model: 'WebInspect.model.TreeModel',
        storeId: 'ContactTreeStore',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk',
//            extraParams: {
//                t: 'GetZpPerson',
//                results: 'jsonp'
//            },
            reader: {
                type: 'json'
            }
        },
        root: {
            id:'ry',
            expanded:true
        }
    }
});