Ext.define('WebInspect.store.ProjectMainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectElementModel',

        proxy: {
            type: 'sk'
        }
    }
});