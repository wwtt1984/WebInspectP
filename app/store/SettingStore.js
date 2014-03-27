Ext.define('WebInspect.store.SettingStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.SettingModel',
        data:[
            {id: '01', name: 'pushsetting', title: '推送设置'},
            {id: '02', name: 'module', title: '功能模块'},
//            {id: '02', name: '系统设置'},
            {id: '03', name: 'version', title: '软件版本'},
            {id: '04', name: 'update', title: '更新日志'}
        ],

        autoLoad: true
    }
});