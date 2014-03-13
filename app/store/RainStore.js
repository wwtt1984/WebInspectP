Ext.define('WebInspect.store.RainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.RainModel',

//        pageSize: 10,
//        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});