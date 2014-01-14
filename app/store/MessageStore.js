/**
 * Created by xiaona on 14-1-7.
 */

Ext.define('WebInspect.store.MessageStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MessageModel',

        proxy: {
            type: 'sk'
        }
    }
});


