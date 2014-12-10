/**
 * Created by USER on 14-6-9.
 */


Ext.define('WebInspect.model.ProcedureModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'StepID',
            'TaskID',
            'ProcessName',
            'NodeName',
            'sid',
            'ReceiveAt',
            'FinishAt',
            'displayname',
            'oulevel'
        ]
    }

});