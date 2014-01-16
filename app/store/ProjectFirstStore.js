Ext.define('WebInspect.store.ProjectFirstStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectFirstModel',

//        pageSize: 10,
//        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        },

        grouper: {
            groupFn: function(record) {
                return record.get('type') + '(' + record.get('typenum') + ')';
            }
//            sortProperty: 'last_name'
        }
    }
});