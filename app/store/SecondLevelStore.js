Ext.define('WebInspect.store.SecondLevelStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.LevelModel',
        
        proxy: {
            type: 'sk'
        }
    }
});