Ext.define('WebInspect.view.Main', {
	extend: 'Ext.Container',
    xtype: 'main',
    
    requires: [
        'WebInspect.view.Login',
        'WebInspect.view.Function'
    ],
    config: {

    	layout: 'card',


        items: [
            {
                xclass: 'WebInspect.view.Login'
            },
            {
            	xclass: 'WebInspect.view.Function'
            }
        ]
    }
});
