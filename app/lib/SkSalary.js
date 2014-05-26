/**
 * Created by USER on 14-5-21.
 */

Ext.define('Ext.data.proxy.SkSalary', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.salary',

    config: {
//        url: 'http://localhost/WebSerAn/Data.ashx',
        url: 'http://61.153.36.134/MobileWebService/Data.ashx',
        callbackKey: 'callback'
    },

    buildRequest: function(operation) {

        var request = this.callParent(arguments);
        return request;
    }
});