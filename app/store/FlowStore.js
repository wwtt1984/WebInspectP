Ext.define('WebInspect.store.FlowStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.FlowModel',

        proxy: {
            type: 'sk'
        }
    }
});