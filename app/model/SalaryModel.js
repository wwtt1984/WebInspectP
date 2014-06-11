/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.model.SalaryModel', {
    extend: 'Ext.data.Model',
    config: {

        fields: [
            { name: 'type', type: 'string' },
            { name: 'value', type: 'string' }]
    }
});
