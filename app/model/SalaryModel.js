/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.model.SalaryModel', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'tfbh',
        fields: [
            { name: 'tfbh', type: 'float' },
            { name: 'tfname', type: 'string' },
            { name: 'tfyear', type: 'float' },
            { name: 'tfactive', type: 'string' }]
    }
});
