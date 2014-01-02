/**
 * Created by Stiffen on 13-12-30.
 */
Ext.define('WebInspect.controller.MainControl',{
    extend: 'Ext.app.Controller',
    config:{
        refs: {
            main: 'main'
        },
        control: {
            main: {
                initialize:'onMainInit'
            }
        }
    },
    onMainInit: function(){
        var me = this;
        this.bpush = false;///默认是直接点击软件进去的
        this.bpindex = 0;///默认请求
        this.beindex = 2;///默认请求总数
        window.setTimeout(function(){me.checkJpush(me);},100);
        document.addEventListener('deviceready',function(){me.onJpushReady(me);}, false);
    },
    onJpushReady:function(me){

        plugins.jPush.setNoticeCallBack(function(data){me.noticeCallBack(data,me)}).init(true);
    },
    noticeCallBack:function(data,me)
    {
        if(data.isFromAlert == "true"){
            me.bpush = true;
            me.onDoChickTitle(data.extras);
        }
    },
    checkJpush:function(me){

        if(me.bpindex <= me.beindex)
        {
            if(!me.bpush && me.bpindex == me.beindex)
            {
                me.onDoChickAppIco();
                return;
            }
            me.bpindex++;
            window.setTimeout(function(){me.checkJpush(me);},100);
        }
    },

    onDoChickTitle:function(data){       ////////执行点击标题栏事件
        alert(data.id);
        alert(data.type);
    },

    onDoChickAppIco:function(){   /////////执行点击应用程序图标事件

        //this.checkVersion();///检查版本情况
        //小娜的代码

        ///


    },

    checkVersion:function()
    {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'下载中,请稍后...'});
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://webservices.qgj.cn/htxcService/htxc.apk");
        fileTransfer.download(
            uri,
            "file:///mnt/sdcard/dx_download/htxc.apk",
            function(entry) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("下载完成",3000);
                plugins.Install.InstallApk("mnt/sdcard/dx_download/htxc.apk");
            },
            function(error) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast('下载失败！请检查网络！',3000);
            }
        );
    }

});