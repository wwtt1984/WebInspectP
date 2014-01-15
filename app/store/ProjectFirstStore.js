Ext.define('WebInspect.store.ProjectFirstStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectModel',

//        pageSize: 10,
//        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});