/**
 * Created by xiaona on 14-3-11.
 */

Ext.define('WebInspect.controller.NewsControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            news: 'main info news',
            newsdetail: 'info newsdetail',
            newsback: '[itemId=newsback]'
        },

        control: {
            news: {
                itemtap: 'onNewsListTap'
            },
            newsback: {
                tap: 'onNewsBackTap'
            }
        }
    },

    //加载“内网新闻”，“通知公告”，“综合信息”模块页面
    onNewsStypeSet: function(storename, t, results, title){

        var store = Ext.getStore('NewsStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: t,
            results: results
        });
        store.loadPage(1,{
            callback: function(records, operation, success) {
                if(!success)
                {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
                }
            },
            scope: this
        });
        var news = Ext.create('WebInspect.view.news.News'); ////////////都要新建出来的
        news.setTitle(title);
        this.getInfo().push(news);
    },

    //“内网新闻”，“通知公告”，“综合信息”列表，进行单击选择后，加载“详细信息”页面
    onNewsListTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        var store = Ext.getStore('NewsDetailStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetInfo',
            results: record.data.stype + '$jsonp',
            sid: record.data.sid
        });

        if(record.data.simgtype == 'pdf'){
//            this.newspdf = this.getNewspdf();
//            if(!this.newspdf){
//                this.newspdf = Ext.create('WebInspect.view.news.NewsPdf');
//            }
//
//            Ext.Viewport.setMasked({
//                xtype: 'loadmask',
//                message: '努力加载中...'
//            });
//
//            store.load(function(records, operation, success){
//                Ext.Viewport.setMasked(false);
//                this.newspdf.setPdfUrl(store.getAt(0).data.simg);
//            }, this);
//            this.getInfofunction().hide();
//            this.getInfo().push(this.newspdf);
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });

            store.load(function(records, operation, success){
                Ext.Viewport.setMasked(false);

                if(!success)
                {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
                }
                else{
                    if(store.getAllCount()){
                        this.getInfo().onImageShow(store.getAt(0).data);
                        this.getNewsback().setStyle('color: #ccc;');
                    }
                }

            }, this);

        }
        else{
            this.newsdetail = this.getNewsdetail();
            if(!this.newsdetail){
                this.newsdetail = Ext.create('WebInspect.view.news.NewsDetail');
            }

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });

            store.load(function(records, operation, success){
                Ext.Viewport.setMasked(false);
                if(!success)
                {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
                }
                else
                {
                    this.newsdetail.onDataSet(store.getAt(0));
                }
            }, this);
            this.getInfofunction().hide();
            this.getInfo().push(this.newsdetail);
        }
    },

    //查看“详细信息”中的图片后，返回至“详细信息”页面
    onNewsBackTap: function(){
        var me = this;
        me.getInfo().onViewHide();
    }

})