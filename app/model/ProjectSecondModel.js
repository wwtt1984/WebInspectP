Ext.define('WebInspect.model.ProjectSecondModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'code',
        fields: [
            'code',
            'name',
            'Location',
            'leaf'
        ]
    }

});