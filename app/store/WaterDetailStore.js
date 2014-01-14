Ext.define('WebInspect.store.WaterDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.WaterDetailModel',

        proxy: {
            type: 'sk'
        }
    }
});