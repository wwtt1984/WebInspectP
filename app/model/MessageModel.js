/**
 * Created by xianna on 14-1-7.
 */

Ext.define('WebInspect.model.MessageModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'StepID',
            'TaskID',
            'ProcessName',
            'NodeName',
            'OwnerAccount',

            'ReceiveAt',
            'Comments',
            'TimeoutDeadline',
            'CreateAt',
            'Description',

            'State',
            'SerialNum',
            'AgentAccount'
        ]
    }

});
