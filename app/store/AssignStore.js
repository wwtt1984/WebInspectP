/**
 * Created by USER on 14-5-15.
 */

Ext.define('WebInspect.store.AssignStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.AssignModel',

        proxy: {
            type: 'sk'
        }
    }
});