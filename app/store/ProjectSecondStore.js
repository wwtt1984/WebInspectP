Ext.define('WebInspect.store.ProjectSecondStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectSecondModel',

//        pageSize: 10,
//        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});