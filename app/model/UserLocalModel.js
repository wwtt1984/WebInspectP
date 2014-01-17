Ext.define('WebInspect.model.UserLocalModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [

            'uid',
            'name',
            'password',
            'mobile'
//            'tel',
//
//            'sms',
//            'mail',
//            'sexy',
//            'ITEM_Id',
//            'DeptId',
//
//            'rtxsession'
        ],

        identifier: 'uuid'

//        proxy: {
//            type: 'localstorage',
//            id: 'user'
//        }
    }

});