Ext.define('WebInspect.store.ProjectSecondStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectSecondModel',
        storeId: 'ProjectSecondStore',

        pageSize: 20,
        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});