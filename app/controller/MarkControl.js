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
            marktitle: '[itemId=marktitle]',
            tarea_ms: '[itemId=tarea_ms]',

            markconfirm: '[itemId=markconfirm]'
        },

        control: {
            photodelete: {
                tap: 'onPhotoDeleteTap'
            },
            markconfirm: {
                tap: 'onMarkConfirmTap'
            }
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
        me.lng = null ////经度

        if(me.upimgcount == 0)
        {
            plugins.Toast.ShowToast("图片上传一张吧!",3000);
        }
        else
        {
            me.getMarkconfirm().disable();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
            navigator.geolocation.getCurrentPosition(
                function(position){me.onGeolocationSuccess(position,me);},
                function(error){me.onGeolocationFail(error,me);},
                { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
            );
        }
    },

    onGeolocationSuccess: function(position,me)
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
        me.getMarkconfirm().enable();
    },

    onUploadImg:function(lat,lng,me){

        var type = me.getMarktype().getValue(),
            markcode = me.getMarkcode().getValue(),
            miaos = me.getTarea_ms().getValue();
//            location = me.getMarkTitle().getData()[0].;

        var sdt = '2014-04-09';

        var store = Ext.getStore("PhotoStore");
        var record = store.getAt(me.upimgindex);

        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = WebInspect.app.user.sid +"$"
            + WebInspect.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos;

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

        ft.upload(imageURI, encodeURI("http://122.226.205.102/sbskSer/data_ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(r,me);},
            function(r){me.onMenuPhotoFailMsg(r,me);},
            options);

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
            me.getPhoto().onPhotoAllDelete();
            me.getTarea_ms().setValue(null);
            me.getApplication().getController('MainControl').getLoad().hide();
            me.upimgindex = 0;
            me.upimgcount = 0; //// 清0
            me.getMarkconfirm().enable();
        }
    },

    onMenuPhotoFailMsg:function(error,me)
    {
        plugins.Toast.ShowToast("上传失败!"+ error,3000);
        me.getApplication().getController('MainControl').getLoad().hide();
        me.getMarkconfirm().enable();
    }
})