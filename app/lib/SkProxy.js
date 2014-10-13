Ext.define('Ext.data.proxy.SkProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.sk',
		
    config: {
//        url: 'http://webservices.qgj.cn/wt_test/Data.ashx',
//		url: 'http://bpm.qgj.cn/test/Data.ashx',
        url: 'http://10.33.13.118/WebSerAn/Data.ashx',
        callbackKey: 'callback'
    },
	
    buildRequest: function(operation) {
    	
        var request = this.callParent(arguments);
        return request;
    }
});