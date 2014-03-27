/**
 * Created by USER on 14-3-24.
 */
Ext.define('WebInspect.store.UpdateStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.UpdateModel',

        proxy: {
            type: 'sk'
        }
    }
});