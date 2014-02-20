Ext.define('WebInspect.store.FirstLevelStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.LevelModel',
        
        proxy: {
            type: 'sk'
        }
    }
});