/**
 * Created by USER on 14-3-27.
 */

Ext.define('WebInspect.store.MarkStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MarkModel',

        data: [
            {"sid":001,"stitle":"标牌1","slink":"","sdescription":"","spubdate":"2014-03-27","sauthor":"XX上报","stype":"","simg":"","simgtype":""},
            {"sid":002,"stitle":"标牌2","slink":"","sdescription":"","spubdate":"2014-03-26","sauthor":"XX上报","stype":"","simg":"","simgtype":""},
            {"sid":003,"stitle":"标牌3","slink":"","sdescription":"","spubdate":"2014-03-25","sauthor":"XX上报","stype":"","simg":"","simgtype":""},
            {"sid":004,"stitle":"标牌4","slink":"","sdescription":"","spubdate":"2014-03-24","sauthor":"XX上报","stype":"","simg":"","simgtype":""},
            {"sid":005,"stitle":"标牌5","slink":"","sdescription":"","spubdate":"2014-03-23","sauthor":"XX上报","stype":"","simg":"","simgtype":""}
        ]

//        pageSize: 10,
//        clearOnPageLoad: false,
//
//        proxy: {
//            type: 'sk'
//        }
    }
});