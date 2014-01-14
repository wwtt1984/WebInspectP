Ext.define('WebInspect.store.WaterStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.WaterModel',

        pageSize: 10,
        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});