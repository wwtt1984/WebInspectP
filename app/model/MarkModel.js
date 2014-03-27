/**
 * Created by USER on 14-3-27.
 */
Ext.define('WebInspect.model.MarkModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'sid',
        fields: [
            'sid',
            'stitle',
            'slink',
            'sdescription',
            'spubdate',

            'stype',
            'sauthor',
            'simg',
            'simgtype'
        ]
    }

});