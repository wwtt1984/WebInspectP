/**
 * Created by USER on 14-7-2.
 */

Ext.define('WebInspect.controller.InspectControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'info',
            infofunction: '[itemId=infofunction]',

            inspectmain: 'info inspectmain',
            news: 'inspectmain news',

            newsdetail: 'info newsdetail',

            inspecttreelist: 'info inspecttreelist',
            inspecttreeselect: '[itemId=inspecttreeselect]',
            inspect: 'inspect',
            inspectlocation: '[itemId=inspectlocation]',

            inspectselectconfirm: '[itemId=inspectselectconfirm]',
            inspectselection: '[itemId=inspectselection]',
            inspecttreeselect: '[itemId=inspecttreeselect]',

            inspectphoto: '[itemId=inspectphoto]',

            inspect_ms: '[itemId=inspect_ms]',
            inspectconfirm: '[itemId=inspectconfirm]'

        },

        control: {
            inspecttreeselect: {
                selectionchange: 'onInspectSelectionChange'
            },
            inspectselectconfirm: {
                tap: 'onInspectSelectConfirmTap'
            },
            inspectconfirm: {
                tap: 'onInspectConfirmTap'
            },
            inspectmain: {
                activeitemchange: 'onInspectActiveItemChange'
            }
        }
    },

    onInspectInitialize: function(){
        var me = this;
        me.inspectmain = me.getInspectmain();
        if(!me.inspectmain){
            me.inspectmain = Ext.create('WebInspect.view.inspect.InspectMain');
        }

        me.onInspectStoreLoad();

        if(WebInspect.app.user.oulevel.match('管理处')){
            me.onInspectTreeLoad();
        }
        else{
            me.getInspectconfirm().disable();
        }

        me.getInfo().push(me.inspectmain);
        me.getInspectlocation().setData({text: '请选择塘段', sid: ''});

    },

    //根据推送信息，加载页面
    onInspectPushData: function(data){

        var me = this;

        me.onInspectInitialize();

        var detailstore = Ext.getStore('NewsDetailStore');

        detailstore.removeAll();

        detailstore.getProxy().setExtraParams({
            t: 'GetInfo',
            results: data.type + '$jsonp',
            sid: data.id
        });

        me.newsdetail = me.getNewsdetail();
        if(!me.newsdetail){
            me.newsdetail = Ext.create('WebInspect.view.news.NewsDetail');
        }

        detailstore.load(function(records, operation, success){

            Ext.Viewport.setMasked(false);
            if(detailstore.getAllCount()){
                me.newsdetail.onDataSet(detailstore.getAt(0));
                me.getInfofunction().hide();
                me.getInfo().push(me.newsdetail);
            }
            me.getMain().setActiveItem(me.getInfo());
        }, this);

    },

    onInspectStoreLoad: function(){
        var store = Ext.getStore('InspectStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetInfoList',
            results: 'inspect$jsonp'
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
//        var news = Ext.create('WebInspect.view.news.News'); ////////////都要新建出来的
//        news.setTitle(title);
//        this.getInfo().push(news);
    },


    onInspectTreeLoad: function(){
        var segmentstore = Ext.getStore('InspectTreeStore');
        if(!segmentstore.getAllCount()){
            segmentstore.getProxy().setExtraParams({
                t: 'GetXcjhTD',
                results:  WebInspect.app.user.oulevel +'$jsonp'
            });
            segmentstore.setRoot({expanded: true});
//            segmentstore.load();
        }
    },

    onInspectListPush: function(){
        var me = this;

        if(Ext.getStore('InspectTreeStore').getAllCount()){
            me.inspecttreelist = me.getInspecttreelist();

            if(!me.inspecttreelist){
                me.inspecttreelist = Ext.create('WebInspect.view.inspect.InspectTreeList');
            }

            me.getInfofunction().hide();
            me.getInspectselectconfirm().show();
            me.getInfo().push(me.inspecttreelist);

        }
        else{
            plugins.Toast.ShowToast("没有上传权限!",3000);
        }
        me.sid = '';
        me.text = '';
    },

    onInspectSelectionChange: function(container, list, record, e){

        var me = this;
        var arr = list.getSelection();

        var text = '';
        var sid = '';

        if(arr.length){
//            for(var i=0; i<arr.length; i++){
                text += arr[0].data.text;
                sid += arr[0].data.text + '@' + arr[0].data.sid;
//            }

            me.getInspectselection().setData({select: text});
            me.getInspectselection().show();

            me.text = text;
            me.sid = sid;
        }
    },

    onInspectSelectConfirmTap: function(){
        var me =  this;

        if(!me.text){
            me.text = '请选择塘段';
            me.sid = '';
        }
        me.getInspectlocation().setData({text: me.text, sid: me.sid});

        me.getInfofunction().show();
        me.getInspectselectconfirm().hide();
        me.getInfo().pop();
    },

    onInspectConfirmTap: function(){
        var me = this;
        me.upimgindex = 0;
        var store = Ext.getStore("InspectPhotoStore");////上传图片
        me.upimgcount = store.getCount() - 1;////上传图片数量
        me.lat = null;/////纬度
        me.lng = null ////经度

        if(me.upimgcount == 0)
        {
            plugins.Toast.ShowToast("图片上传一张吧!",3000);
        }
        else
        {
            me.getInspectconfirm().disable();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
            navigator.geolocation.getCurrentPosition(
                function(position){me.onGeolocationSuccess(position,me);},
                function(error){me.onGeolocationFail(error,me);},
                { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
            );
        }
    },

    onMenuPhotoSucMsg:function(r,me)
    {
        me.upimgindex++;
        if(me.upimgindex < me.upimgcount)
        {
            me.onUploadImg(me.lat,me.lng,me);
        }
        else
        {
            plugins.Toast.ShowToast("上传成功!",3000);
            me.getInspectphoto().onPhotoAllDelete();
            me.getInspect_ms().setValue(null);
            me.getApplication().getController('MainControl').getLoad().hide();
            me.upimgindex = 0;
            me.upimgcount = 0; //// 清0
            me.getInspectconfirm().enable();
        }
    },

    onMenuPhotoFailMsg:function(error,me)
    {
        plugins.Toast.ShowToast("上传失败!"+ error,3000);
        me.getApplication().getController('MainControl').getLoad().hide();
        me.getInspectconfirm().enable();
    },

    onGeolocationSuccess:function(position,me)
    {
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;
        me.onUploadImg(me.lat,me.lng,me);
    },

    onGeolocationFail:function(error,me)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getInspectconfirm().enable();
    },

    onUploadImg:function(lat,lng,me){

//        var location = me.getLocation().getValue();
        var location = me.text;

        //增加“状态描述”
        //var location = me.getStatus().getValue();

        var miaos = me.getInspect_ms().getValue();
        var sdt = '2014-04-09';
        var store = Ext.getStore("InspectPhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = WebInspect.app.user.sid +"$"
            + WebInspect.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + location;

        var ft = new FileTransfer();
        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = me.upimgindex + 1;
//                me.getInspectprogress().setHtml("正在上传第 "+ nowindex +"/"
//                    + me.upimgcount
//                    + " 图片,已完成" + percent + "%,请稍后...");
                me.getApplication().getController('MainControl').getLoad().onDataSet('正在上传中', '正在上传第'+ nowindex + '/' + me.upimgcount + '张,已完成',percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        ft.upload(imageURI, encodeURI("http://122.226.205.102/sbskSer/data_ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(r,me);},
            function(r){me.onMenuPhotoFailMsg(r,me);},
            options);

    },

    onInspectActiveItemChange: function(carousel, value, oldValue, eOpts){
        var me = this;
        if(value.xtype == 'news'){
            var store = Ext.getStore('InspectStore');
            store.getProxy().setExtraParams({
                t: 'GetInfoList',
                results: 'inspect$jsonp'
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
        }
    }
})