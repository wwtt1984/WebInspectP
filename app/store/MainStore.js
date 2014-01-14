Ext.define('WebInspect.store.MainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MainModel',

//        data: [
//            {"liul1":"348","liul2":"372","liul3":"163","cjjs":"1-14 10时,分水江水库+2.97$1-14 10时,富春江电站+0.15","tfxx":""}
//        ]

        proxy: {
            type: 'sk'
        }
    }
});