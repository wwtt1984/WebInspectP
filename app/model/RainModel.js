Ext.define('WebInspect.model.RainModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'stcdt',
        fields: [
            'stcdt',
            'stnm',
            'r1',
            'r3',
            'r24',

            'r48'
        ]
    }

});