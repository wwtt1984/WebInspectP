/**
 * Created by USER on 14-6-9.
 */


Ext.define('WebInspect.store.ProcedureStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ProcedureModel',

        proxy: {
            type: 'sk'
        }

//        data:[
//            {sid: '01', scontent: '徐国华 已处理，流程结束', sdate: '2014-05-29 11:10'},
//            {sid: '02', scontent: '陈茂良 已处理，转发 给 徐国华', sdate: '2014-05-29 00:07'},
//            {sid: '03', scontent: '沈如松 已处理，转发 给 陈茂良', sdate: '2014-05-29 00:06'},
//            {sid: '04', scontent: '胡伟原 已处理，转发 给 沈如松', sdate: '2014-05-28 20:19'},
//            {sid: '05', scontent: '陈瑞刚 已处理，转发 给 胡伟原', sdate: '2014-05-28 17:37'}
//        ],

//        autoLoad: true
    }
})