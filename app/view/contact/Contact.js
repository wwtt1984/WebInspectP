Ext.define('WebInspect.view.contact.Contact', {
    extend: 'Ext.List',
    xtype: 'contact',
    
    requires: [
        'Ext.field.Search'
    ],
     
    config: {
    	
    	title: '钱塘江管理局',

    	store: 'ContactStore',   
    	cls: 'contact-list',
	    
	    loadingText: '努力加载中...',
	    scrollToTopOnRefresh: false,
        
        emptyText: '<p class="no-searches">没有符合要求的记录</p>',
	      
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="contact-list-item">',
            '    <img class="photo" src="{[this.getImg(values)]}" />',
            '    <h1>{displayname}</h1>',
            '    <span>{[this.getNum(values.mobile)]}&nbsp;({[this.getNum(values.pager)]})&nbsp;</span>',
            '    <p>{[this.getNum(values.telephonenumber)]}</p>',
            '</div>',
            {
	        	getImg: function(values){

	        		var string = '';

	        		if(values.description == '女'){
	        		    string += 'resources/images/woman.png';
	        		}
	        		else{
	        			string += 'resources/images/man.png';
	        		}
	        		return string;
	        	},
                getNum: function(values){

                    var string = '--';

                    if(values != 'null'){
                        string = values;
                    }

                    return string;
                }
            }            
        )
    }
});
