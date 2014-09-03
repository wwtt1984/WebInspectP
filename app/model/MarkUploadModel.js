/**
 * Created by USER on 14-9-2.
 */

Ext.define('WebInspect.model.MarkUploadModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'sid',
            'simgid',
            'latitude',
            'longitude',

            'miaos',
            'imgjson',
            'imgindex',
            'type',

            'code'
        ]
    }
});