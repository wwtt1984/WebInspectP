Ext.define('WebInspect.view.news.NewsImg',{

	extend: 'Ext.Panel',
	xtype: 'newsimg',
	
	requires:[
	    'Ext.carousel.Carousel',
        'Ext.Img'
	],
	
	config: {
		itemId: 'newimg',
        cls: 'fun-carousel',
		items:[
		{
			xtype: 'carousel',
            itemId: 'newscarousel',
			style: 'position: absolute;margin:0; padding:0;width:100%;height:100%;background: #000;',
		    direction: 'horizontal',

            directionLock: true
		},
		{
			xtype: 'panel',
			width: '100%',
			height: '2.2em',
			layout: 'hbox',
			items:[
			    {
			        xtype: 'button',
			        iconCls: 'arrow_left',
                    itemId: 'newsback',
			        height: '100%',
			        left: 0,
			        ui: 'plain',
		    	    style: 'width:50px;margin:5px 0 0 5px;color:#fff;filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;'
		    	},
                {
                    xtype: 'button',
                    iconCls: 'delete',
                    itemId: 'photodelete',
                    hidden: true,
                    height: '100%',
                    right: 0,
                    ui: 'plain',
                    style: 'width:50px;margin:5px 0 0 5px;color:#fff;filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;'
                }
            ]
		}]		
	},
	
	
	onImgDataSet: function(values){

		var img = [];
        img = values.simg.split('$');

        var item =[];

        this.down('carousel').removeAll();

        if(values.simgtitle){
            var title = [];
            title = values.simgtitle.split('$');

            for(var i=0; i<img.length; i++){
        	    if(title[i]){
			        item.push({xtype: 'panel', fullscreen: true,items:[{xtype: 'image',cls: 'my-carousel-item-img',src: img[i]},{xtype: 'panel', cls: 'carousel-item-panel', html: title[i]}]});
                }
                else{
                    item.push({xtype: 'panel', fullscreen: true,items:[{xtype: 'image',cls: 'my-carousel-item-img',src: img[i]}]});
                }
		    }
        }
        else{
            for(var i=0; i<img.length; i++){

                item.push({xtype: 'image',cls: 'my-carousel-item-img',src: img[i]});
            }
        }
        this.down('carousel').setItems(item);
	},

    onPhotoDataSet: function(storeid, index){

        Ext.ComponentQuery.query('#photodelete')[0].show();
        var me = this;
        me.store = Ext.getStore(storeid);
        me.index = index;

        var item =[];

        Ext.ComponentQuery.query('#newscarousel')[0].removeAll();

        for(var i=0; i<me.store.getAllCount() - 1; i++){
            item.push({xtype: 'image',cls: 'my-carousel-item-img',src: me.store.getAt(i).data.src});
        }

        Ext.ComponentQuery.query('#newscarousel')[0].setItems(item);
    },

    onPhotoDelete: function(){
        var me = this;
        var cars = Ext.ComponentQuery.query('#newscarousel')[0];
        var index = cars.getActiveIndex();

        cars.removeAt(index + 1);

        var record = me.store.getAt(index);


        me.store.removeAt(index);

        me.index.onPhotoDelete(record);
//        Ext.ComponentQuery.query('#photo')[0].onPhotoDelete(record);

        if(cars.getItems().getCount() == 1){
            Ext.ComponentQuery.query('#info')[0].onViewHide();
        }
    }
})