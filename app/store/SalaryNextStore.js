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
            type: 'sk',
            extraParams: {
                t: 'GetSalary',
                results: WebInspect.app.user.name + '$' + Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, +1), 'Y-m').toString() + '-01$jsonp'
            }
        }
    }
});