/**
 * Created by USER on 14-4-11.
 */
Ext.define('WebInspect.store.GroupDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ContactModel',


        proxy: {
            type: 'sk'
        }
//        data:[
//            {group_name: '队伍1XXXXX', group_id: 'id1XXXXX', value: '队伍1XXXXX'},
//            {group_name: '队伍2XXXXX', group_id: 'id2XXXXX', value: '队伍2XXXXX'},
//            {group_name: '队伍3XXXXX', group_id: 'id3XXXXX', value: '队伍3XXXXX'},
//            {group_name: '队伍4XXXXX', group_id: 'id4XXXXX', value: '队伍4XXXXX'},
//            {group_name: '队伍5XXXXX', group_id: 'id5XXXXX', value: '队伍5XXXXX'},
//            {group_name: '队伍6XXXXX', group_id: 'id6XXXXX', value: '队伍6XXXXX'}
//        ]
    }
})