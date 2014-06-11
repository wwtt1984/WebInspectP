/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.store.SalaryNextStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'WebInspect.model.SalaryModel',
//        autoLoad: true,
        proxy: {
            type: 'sk'
        }
    }
});