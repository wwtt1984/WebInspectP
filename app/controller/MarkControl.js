/**
 * Created by USER on 14-3-25.
 */

Ext.define('WebInspect.controller.MarkControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'info',
            markmain: 'info markmain',
            mark: 'mark',
            photo: 'photo',
            photodelete: '[itemId=photodelete]',

            marktype: '[itemId=marktype]',
            markcode: '[itemId=markcode]',
//            marktitle: '[itemId=marktitle]',
            tarea_ms: '[itemId=tarea_ms]',

            infofunction: '[itemId=infofunction]',
            markconfirm: '[itemId=markconfirm]',
            inspectuploadall: '[itemId=inspectuploadall]'

//            markuploadall: '[itemId=markuploadall]'
        },

        control: {
            markmain: {
                activeitemchange: 'onMarkActiveItemChange'
            },
            photodelete: {
                tap: 'onPhotoDeleteTap'
            },
            markconfirm: {
                tap: 'onMarkConfirmTap'
            }
//            markuploadall: {
//                tap: 'onMarkUploadAllTap'
//            }
        }
    },

    onMarkInitialize: function(){
        var me = this;
        me.markmain = me.getMarkmain();
        if(!me.markmain){
            me.markmain = Ext.create('WebInspect.view.mark.MarkMain');
        }
        me.getMark().onMarkTitleSet();
        me.getTarea_ms().blur();
        me.getInfo().push(me.markmain);

        me.load = 0;

        WebInspect.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';
    },

    onPhotoDeleteTap: function(){
        this.getInfo().onPhotoDelete();
    },

    onMarkConfirmTap: function(){
        var me = this;
        me.upimgindex = 0;
        var store = Ext.getStore("PhotoStore");////上传图片
        me.upimgcount = store.getCount() - 1;////上传图片数量
        me.lat = null;/////纬度
        me.lng = null; ////经度

        me.getMarkconfirm().disable();
        Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
        navigator.geolocation.getCurrentPosition(
            function(position){me.onGeolocationSuccess(position,me);},
            function(error){me.onGeolocationFail(error,me);},
            { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
        );
    },

    //上传完成 或 加入本地失败文件 之后，清空 巡查页面
    onPhotoInit: function(){

        var me = this;

        me.getPhoto().onPhotoAllDelete();
        me.getMarkcode().setValue(null);
        me.getTarea_ms().setValue(null);

        WebInspect.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';

        me.getMarkconfirm().enable();
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
        me.getMarkconfirm().enable();
    },

    //gps定位成功
    onGeolocationSuccess:function(position,me)
    {
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;

        if(me.upimgcount == 0){
            me.onMarkInfoUpload(me.lat, me.lng);
        }
        else{
            me.onUploadImg(position,me.lat,me.lng,me);
        }

    },

    onMarkInfoUpload: function(lat, lng){

        var me = this;

        var type = me.getMarktype().getValue();
        var code = me.getMarkcode().getValue();
        var miaos = me.getTarea_ms().getValue();

        var results = WebInspect.app.user.sid + '$' + type + '$' + code + '$' + miaos
            + '$' + lng + '$' + lat + '$$';

        Ext.data.proxy.SkJsonp.validate('IntScutcheon',results,{
            success: function(response) {
                me.onPhotoInit();
                plugins.Toast.ShowToast("上传成功！",3000);
            },
            failure: function() {
                plugins.Toast.ShowToast("上传失败！",3000);
            }
        });
    },
    //gps定位失败
    onGeolocationFail:function(error,me)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getMarkconfirm().enable();
    },

    //定位成功后，上传图片
    onUploadImg:function(position,lat,lng,me){

        var type = me.getMarktype().getValue();
        var code = me.getMarkcode().getValue();
        var miaos = me.getTarea_ms().getValue();

        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();

        var store = Ext.getStore("PhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        if(me.upimgindex == 0)
        {
            me.simgid = this.unix_to_datetimestr();
        }

        var results = WebInspect.app.user.sid +"$"
            + type + "$" + code  + "$" + miaos + "$" + lng + "$" + lat + "$" + me.simgid + "$" + me.upimgindex;

        var ft = new FileTransfer();
        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = me.upimgindex + 1;
                me.getApplication().getController('MainControl').getLoad().onDataSet('正在上传中', '正在上传第'+ nowindex + '/' + me.upimgcount + '张,已完成',percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        ft.upload(imageURI, encodeURI("http://bpm.qgj.cn/test/Data.ashx?t=IntScutcheon&results=" + results),
            function(r){me.onMenuPhotoSucMsg(position,r,me);},
            function(r){me.onMenuPhotoFailMsg(position,r,me);},
            options);

    },

    //生成simgid
    unix_to_datetimestr:function(){

        var date = new Date();
        var sdate = '';

        var month = date.getMonth()+1;
        if(month < 10) month='0'+ parseInt(date.getMonth()+1).toString();

        var day = date.getDate();
        if(day < 10) day='0'+ parseInt(date.getDate()).toString();

        sdate += date.getFullYear().toString()
            +  month.toString() //月份
            +  day.toString() //日
            +  date.getHours().toString() //小时
            +  date.getMinutes().toString() //分
            +  date.getSeconds().toString() //秒
            +  date.getMilliseconds().toString(); //毫秒

        return sdate;

    },

    //点击“上传”按钮，上传失败后，将事件加入UploadStore中，同时存入本地文件fail.json中
    onFailDataAdd: function(position){

        var me = this;

        var imgjson = WebInspect.app.imginfo.imgjson.join(',');

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
//        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();

        var type = me.getMarktype().getValue();
        var code = me.getMarkcode().getValue();
        var miaos = me.getTarea_ms().getValue();

        var simgid;
        if(!me.simgid){
            me.simgid = this.unix_to_datetimestr();
            me.upimgindex = 0;
        }
        simgid = me.simgid;

        var sid = WebInspect.app.user.sid;

        var store = Ext.getStore('MarkUploadStore');

        store.add({sid: sid, simgid: simgid, latitude: latitude, longitude: longitude,
            type: type, code: code, miaos: miaos, imgjson: imgjson, imgindex: me.upimgindex});


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

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.markfail, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.markfail,
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
    onMarkActiveItemChange: function(carousel, value, oldValue, eOpts){
        var me = this;

        switch(value.xtype){
            case 'mark':
                me.getInspectuploadall().hide();
                break;

            case 'marklist':

                me.getInspectuploadall().hide();
                break;

            case 'markfail':
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

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.markfail, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.markfail,
                        options: {create: true},
                        success: function(entry) {

                            fe.read({
                                type: 'text',
                                success: function(data){

                                    if(data){
                                        var hq = Ext.JSON.decode(data);

                                        var store = Ext.getStore('MarkUploadStore');
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
    onMarkFailItemTap: function(list, index, target, record, e, eOpts ){
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
    onMarkUploadAllTap: function(){

        var me = this;
        me.getInfofunction().disable();
        me.getInspectuploadall().disable();

        me.onAllRecordUploadBegin();
    },

    //开始上传本地记录
    onAllRecordUploadBegin: function(){

        plugins.Toast.ShowToast("准备上传失败记录!",3000);
        var me = this;
        var store = Ext.getStore('MarkUploadStore');

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
                var store = Ext.getStore('MarkUploadStore');
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

        var type = record.data.type;
        var code = record.data.code;
        var miaos = record.data.miaos;

        var imgindex = record.data.imgindex;

        var simgid = record.data.simgid;
        var sid = record.data.sid;

        var imageURI = imgjson[imgindex];

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = sid +"$" + type + "$" + code  + "$" + miaos + "$" + lng + "$" + lat + "$" + simgid + "$" + imgindex;

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

        ft.upload(imageURI, encodeURI("http://bpm.qgj.cn/test/Data.ashx?t=IntScutcheon&results=" + results),
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

                var fe = Ext.create("Ext.device.filesystem.FileEntry", WebInspect.app.local.markfail, fileSystem);

                fe.getEntry(
                    {
                        file: WebInspect.app.local.markfail,
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
    }
})