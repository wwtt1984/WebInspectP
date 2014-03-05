Ext.define('WebInspect.store.ProjectElementStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectElementModel',

        proxy: {
            type: 'sk'
        }
    }
});