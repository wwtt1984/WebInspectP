Ext.define('WebInspect.store.TaskStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.TaskModel',

        proxy: {
            type: 'sk'
        }
    }
});