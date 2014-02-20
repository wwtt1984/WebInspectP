Ext.define('WebInspect.model.FlowModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'STCDT',
        fields: [
            'STCDT',
            'stnm',
            'YMDHM',
            'Q',
            'zrtend',
            'x',

            'y'
        ]
    }

});