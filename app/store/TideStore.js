Ext.define('WebInspect.store.TideStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.TideModel',
        
        proxy: {
            type: 'sk'
        }
    }
});