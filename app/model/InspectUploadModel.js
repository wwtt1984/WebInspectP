/**
 * Created by USER on 14-8-12.
 */

Ext.define('WebInspect.model.InspectUploadModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'sid',
            'name',
            'simgid',
            'latitude',
            'longitude',

            'sdt',
            'miaos',
            'imgjson',
            'imgindex',
            'tdid',

            'type',
            'event',
            'oulevel',
            'text',
            'zub'
        ]
    }
});