/**
 * Created by USER on 14-12-10.
 */

Ext.define('WebInspect.model.DoneModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'TaskID',
        fields: [
            'StepID',
            'TaskID',
            'Column1',
            'NodeName',
            'SerialNum'
        ]
    }

});