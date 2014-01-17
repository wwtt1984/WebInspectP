Ext.define('WebInspect.store.UserStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.UserLocalModel',
//        proxy: {
//            type: 'sk'
//        }
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'user'
        }
    }
});