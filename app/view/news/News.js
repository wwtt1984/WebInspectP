Ext.define('WebInspect.view.news.News', {
    extend: 'Ext.List',
    xtype: 'news',
    
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh'
    ],
    
    config: {
    	
    	title: '新闻通知',
            	    
        cls: 'news-list',
	    
	    loadingText: '努力加载中...',
	    scrollToTopOnRefresh: false,
	    
	    plugins: [
        { 
            xclass: 'Ext.plugin.ListPaging',
            loadMoreText: '加载更多...',
            noMoreRecordsText: '没有更多记录了...',
            autoPaging:true
        },
        {
            xclass: 'Ext.plugin.PullRefresh',
            pullText: '下拉刷新...',

            releaseText: '松开进行刷新...',

            loadingText: '正在刷新...',

            loadedText: '刷新完成.',

            lastUpdatedText: '刷新时间:&nbsp;'
        }],
        
        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="list-item">',
            '    {[this.getImg(values)]}',
            '    <h1>{stitle}</h1>',
            '    <div class="time">{spubdate}<div style="float: right;">{sauthor}</div></div>',
            '</div>',
            {
	        	getImg: function(values){
	        		var string = '';

	        		if(values.simgtype == 'jpg'){
	        		    string += '<img class="photo" src="' + values.simg + '" />';
	        		}
	        		else if(values.simgtype == 'pdf'){
	        			string += '<div style="float: left;width: 80px;height: 60px;position:absolute;top: 50%;margin: -30px 5px 0 0;"><img src="resources/images/pdf.jpg" style="width:100%;height:100%"/></div>';
	        		}
	        		else{
	        			string += '<img class="photo" src="resources/images/nopic.jpg" />';
	        		}
	        		return string;
	        	}
            }
        )
    }
});