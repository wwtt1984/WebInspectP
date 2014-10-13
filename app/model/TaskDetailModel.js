/**
 * Created by USER on 14-9-17.
 */

Ext.define('WebInspect.model.TaskDetailModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'TaskID',
            'StepID',
            'imgjson',
            'taskdetails',
            'disposes',

            'replys',
            'forwards'
        ],

        hasOne: [
            {
                model: 'WebInspect.model.TaskValueModel',
                name:'taskdetails'
            },
            {
                model: 'WebInspect.model.TaskValueModel',
                name:'disposes'
            },
            {
                model: 'WebInspect.model.TaskValueModel',
                name:'replys'
            },
            {
                model: 'WebInspect.model.TaskValueModel',
                name:'forwards'
            }
        ]
    }

});