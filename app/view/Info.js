Ext.define('WebInspect.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    
    requires: [
    ],
    config: {

        itemId: 'info',

    	navigationBar: {
            layout: {
                pack: 'center',
                type: 'hbox'
            },
    		ui: 'light',
            items: [
                {
                	xtype: 'button',
                	itemId: 'infofunction',
                	ui: 'back',
                	text: '主页面'
                },
                {
                    xtype: 'button',
                    itemId: 'contactsearch',
                    ui: 'plain',
                    iconCls: 'search',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'selectconfirm',
                    text: '确定',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'inspectselectconfirm',
                    text: '确定',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'inspectuploadall',
                    text: '全部上传',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'markuploadall',
                    text: '全部上传',
                    align: 'right',
                    hidden: true
                }
            ]
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

    onPhotoShow: function(storeid, index){
        this.view = this.down('newsimg');
        if(!this.view){
            this.view = Ext.create('WebInspect.view.news.NewsImg');
        }

        this.view.onPhotoDataSet(storeid, index);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onPhotoDelete: function(){
        this.view.onPhotoDelete();
    },

    onFailImageShow: function(values){
        this.view = this.down('newsimg');
        if(!this.view){
            this.view = Ext.create('WebInspect.view.news.NewsImg');
        }

        this.view.onFailImgDataSet(values);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    }
});
