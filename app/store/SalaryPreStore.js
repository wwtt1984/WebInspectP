/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.store.SalaryPreStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'WebInspect.model.SalaryModel',
        autoLoad: true,
        proxy: {
            type: 'salary',
            extraParams: {
                t: 'GetTflist',
                tfyear: new Date().getFullYear() - 1
            }
        },
        sorters: {
            property: 'tfbh',
            direction: 'DESC'
        }
    }
});