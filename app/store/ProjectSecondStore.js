Ext.define('WebInspect.store.ProjectSecondStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectSecondModel',

        proxy: {
            type: 'sk'
        }
    }
});