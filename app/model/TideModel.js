Ext.define('WebInspect.model.TideModel',{
	extend: 'Ext.data.Model',
    config: {
        idProperty: 'sname',
        fields: [
            'sname', 
            'stime',
            'stide',
            'sheight',
            'sgrade',
            
            'stime3',
            'stide3',
            'sheight3',
            'sgrade3',
            'sdate'
        ]
    }
        
});