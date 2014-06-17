/**
 * Created by USER on 14-6-17.
 */

Ext.define('WebInspect.store.ProjectThirdStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProjectThirdModel',

        proxy: {
            type: 'sk'
        }
    }
});