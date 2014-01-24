/**
 * Created by xianna on 14-1-7.
 */

Ext.define('WebInspect.model.MessageModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'MsgCount',
            'MsgID',
            'DialogID',
            'Reciver',
            'Dialog',

            'Sender',
            'Client',
            'CreateTime',
            'MsgTitle',
            'sqldata_Id',
            'Sname',
            'Stime'
        ]
    }

});
