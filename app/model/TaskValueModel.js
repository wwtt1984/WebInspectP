/**
 * Created by USER on 14-9-17.
 */

Ext.define('WebInspect.model.TaskValueModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'text',
            'value'
        ],
        belongsTo: 'TaskDetailModel'
    }

});