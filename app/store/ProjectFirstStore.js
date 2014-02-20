Ext.define('WebInspect.store.ProjectFirstStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectFirstModel',

        proxy: {
            type: 'sk'
        },

        grouper: {
            groupFn: function(record) {
                return record.get('type') + '(' + record.get('typenum') + ')';
            }
        }
    }
});