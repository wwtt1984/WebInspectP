/**
 * Created by USER on 14-5-15.
 */

Ext.define('WebInspect.model.AssignModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
        fields: [
            'id',
            'rwms',
            'sdatetime',
            'didian',
            'didianid',
            'zpid',

            'zpry'
        ]
    }

});