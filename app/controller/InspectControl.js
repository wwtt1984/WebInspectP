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
//            inspectselection: '[itemId=inspectselection]',
            inspecttreeselect: '[itemId=inspecttreeselect]',

            inspectphoto: '[itemId=inspectphoto]',

            inspect_ms: '[itemId=inspect_ms]',
            inspectconfirm: '[itemId=inspectconfirm]',

            inspecttype: '[itemId=inspecttype]',

            inspectfaildetail: 'info inspectfaildetail',
            inspectuploadall: '[itemId=inspectuploadall]',

            inspectSegmentedButton: '[itemId=inspectSegmentedButton]'

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
            },
            inspectfail: {
                itemswipe: 'onInspectFailItemSwipe',
                itemtap: 'onInspectFailItemTap'
            },
            inspectSegmentedButton: {
                toggle: 'onInspectSegmentedTap'
            }
//            inspectuploadall: {
//                tap: 'onInspectUploadAllTap'
//            }
        }
    },

    //海塘巡查 模块 加载 初始化
    onInspectInitialize: function(){
        var me = this;
        me.inspectmain = me.getInspectmain();
        if(!me.inspectmain){
            me.inspectmain = Ext.create('WebInspect.view.inspect.InspectMain');
        }

        me.onInspectStoreLoad();

//        if(WebInspect.app.user.oulevel.match('管理处')){
            me.onInspectTreeLoad('me', 0);
//        }
//        else{
//            me.getInspectconfirm().disable();
//        }

        me.getInfo().push(me.inspectmain);
        me.getInspectlocation().setData({text: '请选择塘段', tdid: ''});

        me.load = 0;

        WebInspect.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';

        me.closeApp = false;///////关闭APP为false ， 用来防止 定位没定到 就关闭程序了。
        me.gpsreset = 2; ///////////////////////如果2次都没定位成功,则不重新定位了
        me.nowgpscount = 0; /////////////////////当前重启GPS次数
//        me.onOpenGPS(me);
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

    //巡查记录加载
    onInspectStoreLoad: function(){
        var store = Ext.getStore('InspectStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetInfoList',
            results: 'inspect$jsonp$' + WebInspect.app.user.sid
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

    //塘段树状结构store加载
    onInspectTreeLoad: function(type, init){
        var segmentstore = Ext.getStore('InspectTreeStore');

        segmentstore.removeAll();

        segmentstore.getProxy().setExtraParams({
            t: 'GetXcjhTD',
            results:  WebInspect.app.user.oulevel + '$' + WebInspect.app.user.sid + '$jsonp' + '$' + type
        });

        if(init == 0){
            segmentstore.setRoot({expanded: true});
        }
        else{
            segmentstore.removeAll();
            segmentstore.load();
        }
    },

    //显示塘段列表 供 选择
    onInspectListPush: function(){
        var me = this;

        me.onInspectTreeLoad('me', 1);

        me.inspecttreelist = me.getInspecttreelist();

        if(!me.inspecttreelist){
            me.inspecttreelist = Ext.create('WebInspect.view.inspect.InspectTreeList');
        }

        me.getInfofunction().hide();
        me.getInspectselectconfirm().show();
        me.getInfo().push(me.inspecttreelist);


//        if(Ext.getStore('InspectTreeStore').getAllCount()){
//
//            me.inspecttreelist = me.getInspecttreelist();
//
//            if(!me.inspecttreelist){
//                me.inspecttreelist = Ext.create('WebInspect.view.inspect.InspectTreeList');
//            }
//
//            me.getInfofunction().hide();
//            me.getInspectselectconfirm().show();
//            me.getInfo().push(me.inspecttreelist);
//
//        }
//        else{
//            plugins.Toast.ShowToast("没有上传权限!",3000);
//        }
        me.tdid = '';
        me.text = '';
    },

    onInspectSegmentedTap: function(me, button, isPressed, eOpts){
        var me = this;
        if(isPressed){

            var text = button._text;
            switch(text){
                case '常用':
                    me.onInspectTreeLoad('me', 1);
                    break;
                case '全部':
                    me.onInspectTreeLoad('all', 1);
                    break;
            }
        }
    },

    //塘段列表 选择 更改
    onInspectSelectionChange: function(container, list, record, e){

        var me = this;
        var arr = list.getSelection();

        var text = '';
        var tdid = '';

        if(arr.length){
//            for(var i=0; i<arr.length; i++){
                text += arr[0].data.text;
                tdid += arr[0].data.tdid;
//            }

//            me.getInspectselection().setData({select: text});
//            me.getInspectselection().show();

            me.text = text;
            me.tdid = tdid;
        }
    },

    //塘段选择确定
    onInspectSelectConfirmTap: function(){
        var me =  this;

        if(!me.text){
            me.text = '请选择塘段';
            me.tdid = '';
        }
        me.getInspectlocation().setData({text: me.text, tdid: me.tdid});

        me.getInfofunction().show();
        me.getInspectselectconfirm().hide();
        me.getInfo().pop();
    },

    //点击上传按钮，开始定位、上传等操作
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
            if(me.tdid){

                plugins.Vpn.VpnGPSON(function(success){

                    if(success == "false")
                    {
                        Ext.Msg.confirm("开启定位功能","请开启GPS功能来获取位置，将跳转到设置界面？",function(result){

                            if(result == "yes")
                            {
                                plugins.Vpn.VpnGPSSet();//跳转到GPS设置界面
                            }
                        })

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

                });

            }
            else{
                plugins.Toast.ShowToast("请选择塘段!",3000);
            }

        }
    },

    //上传完成 或 加入本地失败文件 之后，清空 巡查页面
    onPhotoInit: function(){

        var me = this;

        me.getInspectphoto().onPhotoAllDelete();
        me.getInspect_ms().setValue(null);

        WebInspect.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';

        me.getInspectconfirm().enable();
    },

    //图片上传成功，继续上传本组图片
    onMenuPhotoSucMsg:function(position,r,me)
    {
        me.upimgindex++;
        if(me.upimgindex < me.upimgcount)
        {
            me.onUploadImg(position,me.lat,me.lng,me);
        }
        else
        {
            plugins.Toast.ShowToast("上传成功!",3000);
            me.onPhotoInit();
            me.getApplication().getController('MainControl').getLoad().hide();

        }
    },

    //图片上传失败
    onMenuPhotoFailMsg:function(position,error,me)
    {
        plugins.Toast.ShowToast("上传失败!"+ error,3000);
        me.onFailDataAdd(position);
        me.getApplication().getController('MainControl').getLoad().hide();
        me.getInspectconfirm().enable();
    },

    //gps定位成功
    onGeolocationSuccess:function(position,me)
    {
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;
        me.onUploadImg(position,me.lat,me.lng,me);
    },

    //gps定位失败
    onGeolocationFail:function(error,me)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getInspectconfirm().enable();
    },

    //定位成功后，上传图片
    onUploadImg:function(position,lat,lng,me){

        var tdid = me.tdid;

        var miaos = me.getInspect_ms().getValue();
        var type = me.getInspecttype().getValue();

        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
        var store = Ext.getStore("InspectPhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        if(me.upimgindex == 0)
        {
            me.simgid = this.unix_to_datetimestr();
            me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        }

        var results = WebInspect.app.user.sid +"$"
            + WebInspect.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + tdid + "$" + WebInspect.app.user.oulevel
            + "$" + type + "$" + me.simgid + "$" + me.upimgindex + '$' + WebInspect.app.user.zub;

        var ft = new FileTransfer();
//        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
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

        ft.upload(imageURI, encodeURI(WebInspect.app.user.serurl+"?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(position,r,me);},
            function(r){me.onMenuPhotoFailMsg(position,r,me);},
            options);

    },

    //生成simgid
    unix_to_datetimestr:function(){
        var sdate = Ext.Date.format(new Date(), 'YmdHmsz').toString();
        return sdate;
    },

    //点击“上传”按钮，上传失败后，将事件加入UploadStore中，同时存入本地文件fail.json中
    onFailDataAdd: function(position){

        var me = this;

        var imgjson = WebInspect.app.imginfo.imgjson.join(',');

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
        var miaos = me.getInspect_ms().getValue();

//        var simgid = this.unix_to_datetimestr();
        var simgid;
        if(!me.simgid){
            me.simgid = this.unix_to_datetimestr();
            me.upimgindex = 0;
        }
        simgid = me.simgid;

        var sid = WebInspect.app.user.sid;
        var name = WebInspect.app.user.name;

        var type = me.getInspecttype().getValue();

        var tdid = me.tdid;
        var oulevel = WebInspect.app.user.oulevel;
        var event = 'sz';
        var zub = WebInspect.app.user.zub;

        var store = Ext.getStore('InspectUploadStore');

        store.add({sid: sid, name: name, simgid: simgid, latitude: latitude, longitude: longitude,
            sdt: sdt, miaos: miaos, imgjson: imgjson, imgindex: me.upimgindex, tdid: tdid, event: event,
            type: type, oulevel: oulevel, text: me.text, zub: zub});


        store.sync();
        me.onFailRecordToJson(store, 0);
    },

    //向UploadStore中增加失败记录的同时，修改本地文件fail.json文件
    onFailRecordToJson: function(store, id){

        var hq = [];

        for(var i = 0; i < store.getAllCount(); i++){
            hq.push(store.getAt(i).data);
        }

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.failfile, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.failfile,
                        options: {create: true},
                        success: function(entry) {
                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function() {
                                        plugins.Toast.ShowToast("已更新失败记录文件！",3000);
                                        if(id == 0){
                                            me.onPhotoInit();
                                        }
                                    },
                                    failure: function(error) {
                                        plugins.Toast.ShowToast("更新记录文件失败！请重试！",3000);
                                    }
                                });
                        },

                        failure: function(error){
                            plugins.Toast.ShowToast("失败记录文件获取失败！",3000);
                        }
                    });



            },

            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    //海塘巡查模块，3个功能页面的切换
    onInspectActiveItemChange: function(carousel, value, oldValue, eOpts){
        var me = this;

        switch(value.xtype){
            case 'inspect':
                me.getInspectuploadall().hide();
                break;

            case 'news':
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
                me.getInspectuploadall().hide();
                break;

            case 'inspectfail':
                me.onFailDataFile();
                me.getInspectuploadall().show();
                break;
        }
    },

    //判断本地文件fail.json中是否有失败记录，若有，则取出放入UploadStore中
    onFailDataFile: function(){

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.failfile, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.failfile,
                        options: {create: true},
                        success: function(entry) {

                            fe.read({
                                type: 'text',
                                success: function(data){

                                    if(data){
                                        var hq = Ext.JSON.decode(data);

                                        var store = Ext.getStore('InspectUploadStore');
                                        store.setData(hq);
                                        store.sync();
                                    }

                                },

                                failure: function(error){
                                    plugins.Toast.ShowToast("不存在记录文件！",3000);
                                }
                            });
                        },
                        failure: function(error) {plugins.Toast.ShowToast("读取记录文件失败！",3000);}
                    });
            },
            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    //左右滑动失败记录列表，显示删除按钮
    onInspectFailItemSwipe: function(dataview, index, target, record, e, eOpts) {

        //show item delete button
        if(target.query('button')[0]){
            target.query('button')[0].show();
        }

        Ext.Viewport.element.addListener({tap:function(){
            if(target.query('button')[0] && (target.query('button')[0].getHidden() == false)){
                target.query('button')[0].hide();
            }
        }, single:true});

    },

    //查看失败记录的详细信息
    onInspectFailItemTap: function(list, index, target, record, e, eOpts ){
        var me = this;
        me.inspectfaildetail = me.getInspectfaildetail();
        if(!me.inspectfaildetail){
            me.inspectfaildetail = Ext.create('WebInspect.view.inspect.InspectFailDetail');
        }
        me.inspectfaildetail.onDataSet(record);
        me.getInfofunction().hide();
        me.getInspectuploadall().hide();
        me.getInfo().push(me.inspectfaildetail);
    },

    //点击“全部上传”按钮，准备上传所有的失败记录
    onInspectUploadAllTap: function(){
        var me = this;
        me.getInfofunction().disable();
        me.getInspectuploadall().disable();

        me.onAllRecordUploadBegin();
    },

    //开始上传本地记录
    onAllRecordUploadBegin: function(){

        plugins.Toast.ShowToast("准备上传失败记录!",3000);
        var me = this;
        var store = Ext.getStore('InspectUploadStore');


        if(me.load == 0){
            me.load = 1;
            if(store.getAllCount()){
                var record = store.getAt(0);
                me.onRecordUpload(record, 1);
            }
            else{
                me.getInfofunction().enable();
                me.getInspectuploadall().enable();
                plugins.Toast.ShowToast("没有失败记录!",3000);
            }
        }
    },

    //开始上传图片，record为store中的记录，status=0时，说明记录中的图片上传失败，status=1时，说明单张图片上传成功，可以继续上传剩余的图片，或者所有图片上传成功，将record从store中删除
    onRecordUpload: function(record, status){
        var me = this;
        if(status == 1){

            if(record.data.imgindex < record.data.imgjson.split(',').length){
                me.onRecordUpLoadImg(record);
            }
            else{
                var store = Ext.getStore('InspectUploadStore');
                store.removeAt(0);
                store.sync();

                me.onFailChangeToJson(store, 1);
            }
        }
        else{
            me.load = 0;
            me.getInfofunction().enable();
            me.getInspectuploadall().enable();
            me.getApplication().getController('MainControl').getLoad().hide();
            me.onFailChangeToJson(store, 0);
        }
    },


    //本地记录单张图片上传
    onRecordUpLoadImg: function(record){

        var me = this;
        var imgjson = record.data.imgjson.split(',');
        var imgcount = imgjson.length;

        var lat = record.data.latitude;
        var lng = record.data.longitude;
        var sdt = record.data.sdt;
        var miaos = record.data.miaos;

        var imgindex = record.data.imgindex;

        var simgid = record.data.simgid;
        var sid = record.data.sid;
        var name = record.data.name;
        var oulevel = record.data.oulevel;
        var type = record.data.type;

        var tdid = record.data.tdid;

        var zub = record.data.zub;

        var imageURI = imgjson[imgindex];

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = sid +"$" + name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" +  tdid + "$" + oulevel + "$" + type + "$" + simgid + "$" + imgindex + '$' + zub;

        var ft = new FileTransfer();
        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = imgindex + 1;
                me.getApplication().getController('MainControl').getLoad().onDataSet('正在上传中', '正在上传第'+ nowindex + '/' + imgcount + '张,已完成',percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        ft.upload(imageURI, encodeURI(WebInspect.app.user.serurl + "?t=IntPhotoImg&results=" + results),
            function(r){
                record.data.imgindex++;
                me.onRecordUpload(record, 1);
            },

            function(r){
                plugins.Toast.ShowToast("上传失败!稍后将继续重试!",3000);
                me.onRecordUpload(record, 0);
            },
            options);
    },

    //UploadStore中记录上传的同时，修改本地文件fail.json文件
    onFailChangeToJson: function(store, id){

        var hq = [];

        for(var i = 0; i < store.getAllCount(); i++){
            hq.push(store.getAt(i).data);
        }

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.failfile, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.failfile,
                        options: {create: true},
                        success: function(entry) {

                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function() {

                                        plugins.Toast.ShowToast("已更新记录文件！",3000);

                                        if(id == 1){
                                            if(store.getAllCount() != 0){
                                                plugins.Toast.ShowToast("一组上传成功!还剩" + store.getAllCount() + "组",3000);
                                                var red = store.getAt(0);
                                                me.onRecordUpload(red, 1);
                                            }
                                            else{
                                                plugins.Toast.ShowToast("全部上传成功!",3000);
                                                me.load = 0;
                                                me.getInfofunction().enable();
                                                me.getInspectuploadall().enable();
                                                me.getApplication().getController('MainControl').getLoad().hide();
                                            }
                                        }

                                    },
                                    failure: function(error) {
                                        plugins.Toast.ShowToast("更新记录文件失败！请重试！",3000);
                                    }
                                });
                        },

                        failure: function(error){
                            plugins.Toast.ShowToast("记录文件获取失败！",3000);
                        }
                    });
            },

            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    onOpenGPS:function(me){      ///////////////////////////////////////打开GPS//////////////////////////////////////
//        navigator.geolocation.getCurrentPosition(
//            function(position){me.onGpsSuccess(position,me);},
//            function(error){me.onGpsError(error,me);},
//            { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        plugins.Wakelock.acquireWakeLock();///开启防止休眠功能

        plugins.Vpn.VpnGPSON(function(success){

            if(success == "false")
            {
                Ext.Msg.confirm("提高定位精度","请开启GPS功能来获取位置，将跳转到设置界面？",function(result){

                    if(result == "yes")
                    {
                        plugins.Vpn.VpnGPSSet();//跳转到GPS设置界面
                    }
                })

            }

        });

        me.lng = 0;
        me.lat = 0;
        me.EARTH_RADIUS = 6378137.0;    //单位M
        me.PI = Math.PI;
        me.nowdistance = 0;
        me.distance = 50;

        me.watchID = navigator.geolocation.watchPosition(
            function(position){me.watchonSuccess(position,me);},
            function(error){me.watchonError(error,me);}, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });

    },


    watchonSuccess:function(position,me)
    {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        if(me.lng !=0 && me.lat !=0)
        {
            var distance = me.getGreatCircleDistance(me,me.lat,me.lng,lat,lng);
            me.nowdistance += distance;

            if(me.nowdistance>= me.distance)
            {
                var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
                var results = WebInspect.app.user.sid + "$" + WebInspect.app.user.name
                    + "$" + lng + '$' + lat + '$' + sdt + '$$$$$$$';
                Ext.data.proxy.SkJsonp.validate('IntXcsj',results,{
                    success: function(response) {
                        /////////////程序不关闭的时候才可以继续循环。
                        me.nowdistance = 0;
                    },
                    failure: function() {

                    }
                });
            }

        }

        me.lng = lng;
        me.lat = lat;
    },

    watchonError:function(error)
    {
        plugins.Toast.ShowToast("GPS连接不上,请检查GPS是否开启或者到室外定位!",3000);
    },

    getGreatCircleDistance:function(me,lat1, lng1, lat2, lng2){

        var radLat1 = me.getRad(me,lat1);
        var radLat2 = me.getRad(me,lat2);

        var a = radLat1 - radLat2;
        var b = me.getRad(me,lng1) - me.getRad(me,lng2);

        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*me.EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;

        return s;
    },
    getRad:function(me,d){
        return d*me.PI/180.0;
    },

    onGpsSuccess:function(position,me){

        me.nowgpscount = 0;/////////////////////gps定位次数清0
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
        var results = WebInspect.app.user.sid + "$" + WebInspect.app.user.name
            + "$" + lng + '$' + lat + '$' + sdt + '$$$$$$$';
        Ext.data.proxy.SkJsonp.validate('IntXcsj',results,{
            success: function(response) {
                /////////////程序不关闭的时候才可以继续循环。
                if(!me.closeApp) me.TimeGPS = window.setTimeout(function(){me.onOpenGPS(me);},WebInspect.app.gpstime);
            },
            failure: function() {

            }
        });
    },

    onGpsError:function(error,me){

        if(!me.closeApp)//////////////////////////程序不关闭的受才可以。
        {
            plugins.Toast.ShowToast("GPS连接不上,请检查GPS是否开启或者到室外定位!",3000);
            ///////////////////////如果30次都没定位成功,则不重新定位了
            if(me.nowgpscount < me.gpsreset)
            {
                me.TimeGPS = window.setTimeout(function(){
                    plugins.Toast.ShowToast("正在尝试重新定位("+me.nowgpscount+"/"+me.gpsreset+")...",3000);
                    me.onOpenGPS(me);
                },WebInspect.app.gpstime);

                me.nowgpscount++;
            }
            else
            {
                plugins.Toast.ShowToast("GPS连接失败,如需再次定位请点击GPS图标手动开启!",3000);
            }

        }

    },

    onGpsOFF:function()
    {
        navigator.geolocation.clearWatch(this.watchID);
    }
})