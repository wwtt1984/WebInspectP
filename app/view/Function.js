Ext.define('WebInspect.view.Function', {
    extend: 'Ext.Panel',
    xtype: 'functionmain',
    
    requires: [
        'WebInspect.view.Title',
        'Ext.carousel.Carousel',
        'Ext.dataview.List'
    ],
    config: {

    	layout: 'fit',
        items: [
            {
                xtype: 'maintitle',
                width: '100%',
                height: '100px',
                docked: 'top'
            },
            {
            	xtype: 'carousel',

            	style: 'background: #ddd;',
            	items:[
            	{
            		
            	    xtype: 'list',
            	    id: 'noticelist',
            	    store: 'PushStore',
            	    cls: 'noticelist',
                    scrollable: {
                        direction: 'vertical',
                        directionLock: true
                    },
            	    
            	    itemTpl: Ext.create('Ext.XTemplate',
    	                '<div class="rylistcss">',
    	                    '<div class="avatar" style="background-image: url({img}); background-size: 45px;background-repeat: no-repeat;">{[this.getNum(values)]}</div>',
			                '<div class="message"><h3>{text}</h3><h4>{content}</h4></div>',
			            '</div>',
			            {
	        	            getNum: function(values){

	        	            	var div = '';
	        	            	
                                if(values.num > 0){
                                	div += '<div class="num">' + values.num +'</div>';
                                }

                                return div;
    	  	                }
			            }		            
                    )   
            	},
            	{
            	    xtype: 'list',
            	    id: 'functionlist',
            	    store: 'FunctionStore',
            	    cls: 'grid',
                    scrollable: {
                        direction: 'vertical',
                        directionLock: true
                    },
            	    itemTpl: Ext.create('Ext.XTemplate',
    	                '<div class="movie">',
	                        '<div class="img" style="background-image: url({image})"></div>',
	                        '<div class="title">{name}</div>',
			            '</div>'	            
                    )   
            	}]
            }
        ]
    }
});
