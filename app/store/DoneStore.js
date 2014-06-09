/**
 * Created by USER on 14-6-9.
 */

Ext.define('WebInspect.store.DoneStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.TaskModel',

        proxy: {
            type: 'sk'
        }
    }
});