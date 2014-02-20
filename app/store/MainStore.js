Ext.define('WebInspect.store.MainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MainModel',

        proxy: {
            type: 'sk'
        }
    }
});