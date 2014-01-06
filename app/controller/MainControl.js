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

        this.onVpnLogin();///////////////登录VPN/////////////

       ////////////////////////////////写入文件////////////////////////////////
        var me = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtgotFS(fileSystem,me);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtreadFS(fileSystem,me);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件

    },

    onVpnLogin:function()
    {

        Ext.Viewport.setMasked({xtype:'loadmask',message:'VPN连接中,请稍后...'});
        var me = this;
        plugins.Vpn.VpnLogin(function(success) {
            Ext.Viewport.setMasked(false);
            if(success == "true")
            {
                plugins.Toast.ShowToast("VPN连接成功!",3000);
                ////////////////////////////////////////////////
                me.onCheckVesion(me); //////////////检查版本号////////////////////
            }
            else if(success == "false")
            {
                plugins.Toast.ShowToast("VPN连接失败!",3000);
            }
            else if(success == "initfalse")
            {
                plugins.Toast.ShowToast("VPN初始化失败,请重新启动程序!",3000);
            }
        });

    },

    onCheckVesion:function(me)
    {
        var store = Ext.getStore('VersionStore');
        store.getProxy().setExtraParams({
            t: 'CheckVersion'
        });
        store.load(function(records, operation, success){
            if(records.length > 0)
            {
                if(records[0].data.strThisVersion != WebInspect.app.user.version)
                {
                    Ext.Msg.confirm("当前版本 " + WebInspect.app.user.version,
                        "新版本("+records[0].data.strThisVersion+")，是否下载更新？",function(btn){
                        if(btn == 'yes'){
                            me.downLoad();
                        }
                    });
                }
            }

        }, this);

    },

    /////////////////////////////////写文件/////////////////////////////////////////////////

    onwtgotFS:function(fileSystem,me) {
        fileSystem.root.getFile("login.json", {create: true, exclusive: false},
            function(fileEntry){me.onwtgotFileEntry(fileEntry,me);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileEntry:function(fileEntry,me) {
        fileEntry.createWriter(
            function(writer){me.onwtgotFileWriter(writer,me);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileWriter:function(writer,me) {
        writer.onwriteend = function(evt) {

        }
        writer.write("{\"sid\":\"zg\",\"pwd\":\"1234567\"}");
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////读取文件///////////////////////////////////////////////////
    onwtreadFS:function(fileSystem,me) {
        fileSystem.root.getFile("login.json", null,
            function(fileEntry){me.onwtreadFileEntry(fileEntry,me);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileEntry:function(fileEntry,me) {
        fileEntry.file(
            function(file){me.onwtreadFileWriter(file,me);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileWriter:function(file,me) {

        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var json = Ext.decode(evt.target.result);
            var version = json.version;
            //webInspect.app.user.version = version;
            //me.onCheckVesion(version);
        };
        reader.readAsText(file);
    },

    onwtfail:function(error,me)
    {
        plugins.Toast.ShowToast(error,3000);
    },

    ////////////////////////////////////////////////////////////////////////////////////////

    downLoad:function()
    {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'下载中,请稍后...'});
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://bpm.qgj.cn/test/qgjapp.apk");
        fileTransfer.download(
            uri,
            "file:///mnt/sdcard/dx_download/qgjapp.apk",
            function(entry) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("下载完成",3000);
                plugins.Install.InstallApk("mnt/sdcard/dx_download/qgjapp.apk");
            },
            function(error) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast('下载失败！请检查网络！',3000);
            }
        );
    }

});