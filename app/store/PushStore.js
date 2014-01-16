Ext.define('WebInspect.store.PushStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.PushModel',
        data:[
            {id: '01', text: '待办事项', content:'待办事项轻松管理', img: 'resources/images/notice/task.png', num: '0'},
    		{id: '02', text: '离线消息', content:'腾讯通离线消息管理', img: 'resources/images/notice/rtx.png', num: '0'},
            {id: '03', text: '今日消息', content:'今日消息管理', img: 'resources/images/notice/today.png', num: '0'}
        ]

//        grouper: {
//            groupFn: function(record) {
//                return record.get('content') + record.get('text');
//            }
////            sortProperty: 'last_name'
//        }
                
//        autoLoad: true
    }
});