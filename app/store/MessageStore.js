/**
 * Created by xiaona on 14-1-7.
 */

Ext.define('WebInspect.store.MessageStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MessageModel',

//        data: [
//            {MsgTitle: '11111', CreateTime: '20131038', DialogID: 'dia'},
//            {MsgTitle: '222222', CreateTime: '20131038', DialogID: 'diagr'},
//            {MsgTitle: '2223356', CreateTime: '20131038', DialogID: 'dihhyja'}
//        ],

        proxy: {
            type: 'sk'
        }
    }
});


