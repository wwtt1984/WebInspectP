Ext.define('WebInspect.store.UserStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.UserModel',
        proxy: {
            type: 'sk'
        }
    }
});