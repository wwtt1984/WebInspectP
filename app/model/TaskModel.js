Ext.define('WebInspect.model.TaskModel',{
	extend: 'Ext.data.Model',
    config: {
        idProperty: 'TaskID',
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