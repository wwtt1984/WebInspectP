Ext.define('WebInspect.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    
    requires: [
    ],
    config: {

        itemId: 'info',

    	navigationBar: {
    		ui: 'light',
            items: [
            {
            	xtype: 'button',
            	itemId: 'infofunction',
            	ui: 'back',
            	text: '主页面'
            }]
        },

        itemId: 'info',

        defaultBackButtonText: '返回'
    },

    onImageShow: function(values){
        this.view = this.down('newsimg');
        if(!this.view){
            this.view = Ext.create('WebInspect.view.news.NewsImg');
        }

        this.view.onImgDataSet(values);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onViewHide: function(){
        this.view.hide();
        this.view.destroy();
    },

    onPhotoShow: function(id, index){
        this.view = this.down('newsimg');
        if(!this.view){
            this.view = Ext.create('WebInspect.view.news.NewsImg');
        }

        this.view.onPhotoDataSet(id, index);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onPhotoDelete: function(){
        this.view.onPhotoDelete();
    }
});
