/**
 * Created by USER on 14-4-11.
 */

Ext.define('WebInspect.store.GroupStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.LevelModel',
//        data:[
//            {group_name: '队伍1', group_id: 'id1', value: '队伍1'},
//            {group_name: '队伍2', group_id: 'id2', value: '队伍2'},
//            {group_name: '队伍3', group_id: 'id3', value: '队伍3'},
//            {group_name: '队伍4', group_id: 'id4', value: '队伍4'},
//            {group_name: '队伍5', group_id: 'id5', value: '队伍5'},
//            {group_name: '队伍6', group_id: 'id6', value: '队伍6'}
//        ]

        proxy: {
            type: 'sk'
        }
    }
})