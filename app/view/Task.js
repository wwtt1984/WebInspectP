Ext.define('WebInspect.view.Task', {
    extend: 'Ext.List',
    xtype: 'task',
//    id: 'task',
    
    requires: [
    ],
    
    config: {
    	
    	title: '待办事项',

        style: 'background: #fff;',
    	store: 'TaskStore',

        emptyText: '<p class="no-searches">没有待办事项</p>',

            	    
        itemTpl: Ext.create('Ext.XTemplate',
    	    '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{NodeName}</div>',
	        '<div style="font-size:15px; line-height: 1.6em;">拥有人:{OwnerAccount}</div>',
			'<div style="font-size:15px; line-height: 1.6em;">接收时间：{ReceiveAt}</div>'          
        )     	
    }
});