Ext.define('WebInspect.store.NewsDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.NewsDetailModel',

        proxy: {
            type: 'sk'
        }
    }
});