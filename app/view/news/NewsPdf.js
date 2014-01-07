Ext.define('WebInspect.view.news.NewsPdf',{

//	extend: 'Ext.ux.panel.PDF',
    extend: 'Ext.Container',
	xtype: 'newspdf',
	
	requires: [
//	    'Ext.XTemplate'
        'Ext.ux.panel.PDF'
	],
	
	config: {
        title: '详细新闻',
//                fullscreen: true,
        layout    : 'fit',
        items:[
            {
                xtype: 'pdfpanel',
                itemId: 'newspdfpanel',
//                title: '详细新闻',
//                fullscreen: true,
//                layout    : 'fit',
                src       : 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf', // URL to the PDF - Same Domain or Server with CORS Support
                style     : {
                    backgroundColor: '#333'
                }
            }
        ]
	},
	
	setPdfUrl:function(url)
	{
//		this.setSrc(url);
        alert(url);
        Ext.ComponentQuery.query('#newspdfpanel')[0].setSrc(url);
	}

});