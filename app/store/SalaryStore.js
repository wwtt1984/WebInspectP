/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.store.SalaryStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'WebInspect.model.SalaryModel',
//        autoLoad: true,
        proxy: {
            type: 'sk',
            extraParams: {
                t: 'GetSalary',
                tfyear: WebInspect.app.user.name + '$' + Ext.Date.format(new Date(), 'Y-m').toString() + '-01$jsonp'
            }
        }
    }
});