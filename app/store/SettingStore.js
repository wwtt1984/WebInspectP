Ext.define('WebInspect.store.SettingStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.SettingModel',
        data:[
            {id: '01', name: '推送设置'},
            {id: '02', name: '功能设置'},
//            {id: '02', name: '系统设置'},
            {id: '03', name: '软件版本'}
        ],

        autoLoad: true
    }
});