/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.store.SalaryStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'WebInspect.model.SalaryModel',
        autoLoad: true,
        proxy: {
            type: 'salary',
            extraParams: {
                t: 'GetTflist',
                tfyear: new Date().getFullYear()
            }
        },
        sorters: {
            property: 'tfbh',
            direction: 'DESC'
        }
    }
});