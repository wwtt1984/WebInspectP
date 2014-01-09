Ext.define('WebInspect.view.news.NewsPdf',{
    extend: 'Ext.Container',
	xtype: 'pdfpanel',
	config: {
		title: '详细新闻',
        layout    : 'fit',
        src       : 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf', // URL to the PDF - Same Domain or Server with CORS Support
        style     : {
            backgroundColor: '#333'
        }
	},
	
	setPdfUrl:function(url)
	{
        alert(url);
		this.setSrc(url);
	}
});