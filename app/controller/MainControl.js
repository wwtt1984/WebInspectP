/**
 * Created by Stiffen on 13-12-30.
 */
Ext.define('WebInspect.controller.MainControl',{
    extend: 'Ext.app.Controller',
    config:{
        refs: {
            main: 'main',
            functionmain: 'main functionmain',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            task: 'main info task',
            message: 'main info message',
            news: 'main info news',
            newspdf: 'info newspdf',
            newsdetail: 'info newsdetail',
            maincarousel: '[itemId=maincarousel]',
            load: '[itemId=load]'
        },
        control: {
            main: {
                initialize:'onMainInit'
            },
            'info':{
                back: 'onInfoBackTap'
            },
            '#confirm': {
                tap: 'onLoginTap'
            },

            '#functionlist': {
                itemtap: 'onFunctionListTap'
            },
            'infofunction': {
                tap: 'onInfoFunctionBackTap'
            }

        }
    },
    onMainInit: function(){
        var me = this;
        WebInspect.app.mainthis = this;
        this.bpush = false;///默认是直接点击软件进去的
        this.bpindex = 0;///默认请求
        this.beindex = 2;///默认请求总数

        this.timeoutecount = 3; //默认VPN超时连接请求3次
        this.timeoutscount = 0;// 当前VPN超时连接数

        window.setTimeout(function(){me.checkJpush(me);},100);
        document.addEventListener('deviceready',function(){me.onJpushReady(me);}, false);
        document.addEventListener("backbutton", me.onBackKeyDown, false);
        document.addEventListener("offline", me.onOfflineListen, false);///////联机状态判断
        document.addEventListener("online", me.onOnlineListen, false);///////在线判断
        me.onBtnConfirm();
        //android返回键事件监听
   },

    onOfflineListen:function(){ ////////////网络离线的时候监听

        //alert("3333");
    },
    onOnlineListen:function() ///////////////////有网络在线的时候监听
    {
        var me = WebInspect.app.mainthis;
        if(me.onNetWorkIsON("val") != "WiFi" && me.qgjwifi == "true")
        {
            plugins.Toast.ShowToast("VPN连接中,请稍后...",3000);
            ////重连VPN
            plugins.Vpn.VpnLogin(WebInspect.app.user.sid,WebInspect.app.user.password,function(success) {

                if(success == "true")
                {
                    plugins.Toast.ShowToast("VPN连接成功!",3000);
                    me.qgjwifi = "false";
                }
                else if(success == "false")
                {
                    if(me.timeoutscount < me.timeoutecount)
                    {
                        plugins.Toast.ShowToast("VPN连接超时,请重试!",3000);
                        me.timeoutscount++;
                        me.onOnlineListen();
                    }
                    else
                    {
                        plugins.Toast.ShowToast("VPN连接失败,请重新打开应用程序!",3000);
                        me.timeoutscount = 0;
                        me.onQuitSystemTap();
                    }
                }
                else if(success == "initfalse")
                {
                    plugins.Toast.ShowToast("VPN初始化失败,请重试!",3000);
                }
                else if(success == "error")
                {
                    plugins.Toast.ShowToast("用户名或者密码输入有误!",3000);
                }
            });

        }
        else if(me.onNetWorkIsON("val") == "WiFi")
        {
            var gate = ['10.33.21.254','10.33.22.254','10.33.23.254','10.33.24.254','10.33.25.254','10.33.26.254','10.33.27.254','10.33.28.254'
                ,'10.33.12.254','10.33.13.254','10.33.14.254'
                ,'10.33.90.254'
                ,'10.33.31.254','10.33.32.254','10.33.33.254','10.33.34.254','10.33.35.254'];
            var vpn = "true";
            ////////////获取网关值///////////////////////////
            plugins.Vpn.VpnOnWifi("",function(success) {   ///////////////得到网关值

                for(var i = 0;i < gate.length;i++)
                {
                    if(success == gate[i])
                    {
                        vpn = "false";
                        me.qgjwifi = "true";
                        break;
                    }
                }

                if(vpn == "false")
                {
                    plugins.Toast.ShowToast("VPN连接关闭!",3000);
                    plugins.Vpn.VpnOFF();//关闭VPN
                }

            });

        }

    },


    onJpushReady:function(me){

        plugins.jPush.setNoticeCallBack(function(data){me.noticeCallBack(data,me)}).init(true);
    },
    noticeCallBack:function(data,me)
    {
        if(data.isFromAlert == "true"){
            me.bpush = true;
            me.onVpnCheckOnline(data.extras);
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

    onMessagePush: function(data){
        var me = this;

        if(me.getInfo()){
            me.getInfo().destroy();
        }

        me.getMain().setActiveItem(me.getFunctionmain());

        me.info = me.getInfo();

        if(!me.info){
            me.info = Ext.create('WebInspect.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['news', 'info', 'notice', 'inspect', 'assignment'];

        switch(data.type){
            case titlestr[0]:
                me.onNoticeNewsStypeSet('NewsStore', 'GetInfoList', 'news$jsonp', data, '内网新闻');
                break;

            case titlestr[1]:
                me.onNoticeNewsStypeSet('InfoStore', 'GetInfoList', 'info$jsonp', data, '综合信息');
                break;

            case titlestr[2]:
                me.onNoticeNewsStypeSet('NoticeStore', 'GetInfoList', 'notice$jsonp',data,  '通知公告');
                break;

            case titlestr[3]:
                me.getMaincarousel().setActiveItem(Ext.getCmp('functionlist'));
                me.getApplication().getController('InspectControl').onInspectPushData(data);
                break;

            case titlestr[4]:
                me.getMaincarousel().setActiveItem(Ext.getCmp('noticelist'));
                me.getApplication().getController('NoticeControl').onTaskStoreLoad();
                break;

        }
    },

    //根据推送信息，加载页面
    onNoticeNewsStypeSet: function(storename, t, results, data, title){

        var me = this;

        me.getMaincarousel().setActiveItem(Ext.getCmp('functionlist'));

        me.news = me.getNews();
        if(!me.news){
            me.news = Ext.create('WebInspect.view.news.News');
        }
        me.news.setTitle(title);
        me.getInfo().push(me.news);
        var store = Ext.getStore(storename);

        store.removeAll();

        store.getProxy().setExtraParams({
            t: t,
            results: results
        });

        me.news.setStore(store);

        store.loadPage(1,function(records, operation, success) {

//            if(me.bpush == true){

                var detailstore = Ext.getStore('NewsDetailStore');

                detailstore.removeAll();

                detailstore.getProxy().setExtraParams({
                    t: 'GetInfo',
                    results: data.type + '$jsonp',
                    sid: data.id
                });

                if(data.simgtype == 'pdf'){
                    me.newspdf = me.getNewspdf();
                    if(!me.newspdf){
                        me.newspdf = Ext.create('WebInspect.view.news.NewsPdf');
                    }
                    detailstore.load(function(records, operation, success){
                        Ext.Viewport.setMasked(false);

                        if(detailstore.getAllCount()){

                            me.newspdf.setPdfUrl(detailstore.getAt(0).data.simg);
                            me.getInfofunction().hide();
                            me.getInfo().push(me.newspdf);
                        }
                        me.getMain().setActiveItem(me.getInfo());
                    }, this);

                }
                else{
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
                }
//            }
//            else{
//                Ext.Viewport.setMasked(false);
//            }
        });

    },

    onDoChickAppIco:function(){   /////////执行点击应用程序图标事件

        var me = this;
        var data = '';
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtreadFS(fileSystem,me,1,data);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件

    },

    onNetWorkIsON:function()  /////////////判断是否有网络
    {
        var res = false;
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI]     = 'WiFi';
        states[Connection.CELL_2G]  = '2G';
        states[Connection.CELL_3G]  = '3G';
        states[Connection.CELL_4G]  = '4G';
        states[Connection.CELL]     = 'Cell';
        states[Connection.NONE]     = 'No';

        if( states[networkState] != "No" && states[networkState] != "Unknown")
        {
            res = true;
        }
        return res;
    },

    onVpnLogin:function(num, data)
    {
        if(this.onNetWorkIsON())
        {
            var gate = ['10.33.21.254','10.33.22.254','10.33.23.254','10.33.24.254','10.33.25.254','10.33.26.254','10.33.27.254','10.33.28.254'
                ,'10.33.12.254','10.33.13.254','10.33.14.254'
                ,'10.33.90.254'
                ,'10.33.31.254','10.33.32.254','10.33.33.254','10.33.34.254','10.33.35.254'];

            var me = this;
            ////////////获取网关值///////////////////////////
            plugins.Vpn.VpnOnWifi("",function(success) {   ///////////////得到网关值

                var vpn = "true";
                for(var i = 0;i < gate.length;i++)
                {
                    if(success == gate[i])
                    {
                        vpn = "false";
                        break;
                    }
                }

                if(vpn == "true")
                {
                    Ext.Viewport.setMasked({xtype:'loadmask',message:'VPN连接中,请稍后...'});
                    plugins.Vpn.VpnLogin(WebInspect.app.user.sid,WebInspect.app.user.password,function(success) {
                        Ext.Viewport.setMasked(false);
                        if(success == "true")
                        {
                            plugins.Toast.ShowToast("VPN连接成功!",3000);
                            me.onUserCheck(num,data);
                        }
                        else if(success == "false")
                        {
                            plugins.Toast.ShowToast("VPN连接超时,请重试!",3000);
                        }
                        else if(success == "initfalse")
                        {
                            plugins.Toast.ShowToast("VPN初始化失败,请重试!",3000);
                        }
                        else if(success == "error")
                        {
                            plugins.Toast.ShowToast("用户名或者密码输入有误!",3000);
                        }
                    });

                }
                else
                {
                    me.onUserCheck(num,data);
                }

            });
        }
        else
        {
            plugins.Toast.ShowToast("先检查你的网络是否正常,再重新登录!",3000);
        }
    },

    onVpnCheckOnline:function(data){

        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });
        plugins.Vpn.VpnCheckOnLine(WebInspect.app.user.sid,WebInspect.app.user.password,function(success) {

            if(success == 'true'){
                me.onMessagePush(data);
            }
            else{
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                    function(fileSystem){me.onwtreadFS(fileSystem,me,0,data);},
                    function(error){me.onwtfail(error,me);}
                ); ////读文件
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

//                            me.onLoadOrUploadViewShow();
                            me.onLoadOrUploadViewShow('更新下载中', '正在下载中');

                            me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);
                        }
                    });
                }
            }

        }, this);

    },

    onLoadOrUploadViewShow: function(header, text){

        var me = this;

        me.load = me.getLoad();

        if(!me.load){
            me.load = Ext.create('WebInspect.view.Load');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            me.load.setMinHeight('30%');
        }

        me.load.onDataSet(header, text, 0);
        if (!me.load.getParent()) {
            Ext.Viewport.add(me.load);
        }
        me.load.show();

    },

    /////////////////////////////////写文件/////////////////////////////////////////////////

    onwtgotFS:function(fileSystem,me,json) {
        fileSystem.root.getFile(WebInspect.app.local.loginfile, {create: true, exclusive: false},
            function(fileEntry){me.onwtgotFileEntry(fileEntry,me,json);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileEntry:function(fileEntry,me,json) {
        fileEntry.createWriter(
            function(writer){me.onwtgotFileWriter(writer,me,json);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileWriter:function(writer,me,json) {
        writer.onwriteend = function(evt) {

        }
        writer.write("{\"sid\":\""+json.sid+"\",\"pwd\":\""+json.pwd+"\",\"name\":\""+json.name+"\",\"oulevel\":\""+json.oulevel+"\",\"mobile\":\""+json.mobile+"\"}");
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////读取文件///////////////////////////////////////////////////
    onwtreadFS:function(fileSystem,me,num,data) {
        fileSystem.root.getFile(WebInspect.app.local.loginfile, null,
            function(fileEntry){me.onwtreadFileEntry(fileEntry,me,num,data);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileEntry:function(fileEntry,me,num,data) {
        fileEntry.file(
            function(file){me.onwtreadFileWriter(file,me,num,data);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileWriter:function(file,me,num,data) {

        var reader = new FileReader();
        reader.onloadend = function(evt) {

            var json = Ext.decode(evt.target.result);
            WebInspect.app.user.sid = json.sid;
            WebInspect.app.user.password = json.pwd;
            WebInspect.app.user.name = json.name;
            WebInspect.app.user.mobile = json.mobile;
            WebInspect.app.user.oulevel = json.oulevel;

            Ext.getCmp('name').setValue(WebInspect.app.user.sid);
            Ext.getCmp('password').setValue(WebInspect.app.user.password);

            me.onVpnLogin(num, data);

        };
        reader.readAsText(file);
    },

    onwtfail:function(error,me)
    {
        //plugins.Toast.ShowToast(error,3000);
        if(error.code == 1) //////////表示文件不存在

        {
            //////////////////不管它///////////////////////////
        }

    },

    ////////////////////////////////////////////////////////////////////////////////////////

    downLoad:function(name,url,me)
    {
        var uri = encodeURI(url);
        var fileTransfer = new FileTransfer();

        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                me.getLoad().onDataSet(percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
                me.getLoad().hide();
            }
        };

        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/Download/" + name,
            function(entry) {
                plugins.Toast.ShowToast("下载完成"+entry.fullPath,3000);
                me.getLoad().hide();
                plugins.Install.InstallApk("mnt/sdcard"+entry.fullPath);
            },
            function(error) {
                plugins.Toast.ShowToast(' '+error.source,3000);
                me.getLoad().hide();
            }
        );
    },

    onBtnConfirm: function(){ ////////////////////重写Confirm////////////////////

        if(Ext.MessageBox) {
            var MB = Ext.MessageBox;
            Ext.apply(MB, {
                YES: { text: '确认', itemId: 'yes', ui: 'action' },
                NO:  { text: '取消', itemId: 'no' },
                OK:  { text: '确定', itemId: 'ok' }
            });
            Ext.apply(MB, {
                YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
            });
        }
    },

    onBackKeyDown: function(){
        var me  = WebInspect.app.mainthis;
        var mainactive = Ext.Viewport.getActiveItem().getActiveItem().xtype;

        if((mainactive == "login") || (mainactive == "functionmain") )
        {
            //当当前页面是“登录”或“主功能页面”时，双击“返回键”退出应用程序
            plugins.Toast.ShowToast("请再点一次退出",1000);

            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", me.onQuitSystemTap, false);//绑定退出事件

            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onQuitSystemTap, false); // 注销返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键

            }, 2000);
        }
        else if(mainactive == "info")
        {
            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            me.onBackKeyTap();
        }
        else
        {
            navigator.app.backHistory();
        }
    },

    onBackDo: function(){

    },

    //当前页面是其他的页面时，返回上一级页面
    onBackKeyTap: function(){
        var me  = WebInspect.app.mainthis;
        var screen = me.getMain();
        var info = screen.getActiveItem();
        var active = info.getActiveItem();

        switch(active.xtype){

            ////////////////消息列表//////////////
            case 'maininfo':
                me.onInfoFunctionBackTap();
                break;

            case 'task':
                me.onInfoFunctionBackTap();
                break;

            case 'taskdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'message':
                me.onInfoFunctionBackTap();
                break;

            ////////////////新闻、通知、公告等//////////////
            case 'news':
                if((me.getInfo().view) && (me.getInfo().view.getHidden() == false)){
                    me.getInfo().onViewHide();
                }
                else{
                    me.onInfoFunctionBackTap();
                }
                break;

            case 'newsdetail':
                if((me.getInfo().view) && (me.getInfo().view.getHidden() == false)){
                    me.getInfo().onViewHide();
                }
                else{
                    me.getInfo().pop();
                    me.getInfofunction().show();
                }
                break;

            case 'newspdf':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////水情信息//////////////
            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'waterdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////雨情信息//////////////
            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            ////////////////流量信息//////////////
            case 'flow':
                me.onInfoFunctionBackTap();
                break;

            ////////////////指派任务//////////////
            case 'assignmain':
                me.onInfoFunctionBackTap();
                break;

            case 'assginlist':
                me.getInfofunction().show();
                me.getApplication().getController('AssignControl').getSelectconfirm().hide();
                me.getInfo().pop();
                break;

            ////////////////巡查上报//////////////
            case 'inspectmain':
                me.onInfoFunctionBackTap();
                break;

            case 'inspecttreelist':
                me.getInfofunction().show();
                me.getApplication().getController('InspectControl').getInspectselectconfirm().hide();
                me.getInfo().pop();
                break;

            case 'inspectfaildetail':

                if((me.getInfo().view) && (me.getInfo().view.getHidden() == false)){
                    me.getInfo().onViewHide();
                }
                else{
                    me.getInfofunction().show();
                    me.getApplication().getController('InspectControl').getInspectuploadall().show();
                    me.getInfo().pop();
                }
                break;

            ////////////////海塘标识//////////////
            case 'markmain':
//                me.onInfoFunctionBackTap();
                if((me.getInfo().view) && (me.getInfo().view.getHidden() == false)){
                    me.getInfo().onViewHide();
                }
                else{
                    me.onInfoFunctionBackTap();
                }
                break;

            ////////////////工情信息//////////////
            case 'projectfirst':
                me.onInfoFunctionBackTap();
                break;

            case 'projectsecond':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'projectthird':
                me.getInfo().pop();
                break;

            case 'projectcard':
                me.getInfo().pop();
                break;

            ////////////////潮位信息//////////////
            case 'tide':
                if((me.getApplication().getController('TideControl').tidepop) && (me.getApplication().getController('TideControl').tidepop.getHidden() == false)){
                    me.getApplication().getController('TideControl').tidepop.hide();
                }
                else{
                    me.onInfoFunctionBackTap();
                }
                break;

            //////////////通讯录///////////////////
            case 'contactlist':
                if((me.getApplication().getController('ContactControl').popup) && (me.getApplication().getController('ContactControl').popup.getHidden() == false)){
                    me.getApplication().getController('ContactControl').popup.hide();
                }
                else{
                    me.onInfoFunctionBackTap();
                }
                break;

            case 'ctsearch':
                if((me.getApplication().getController('ContactControl').popup) && (me.getApplication().getController('ContactControl').popup.getHidden() == false)){
                    me.getApplication().getController('ContactControl').popup.hide();
                }
                else{
                    me.getInfofunction().show();
                    me.getApplication().getController('ContactControl').getContactsearch().show();
                    me.getInfo().pop();
                }
                break;

            ////////////////工资信息///////////////
            case 'salary':
                me.onInfoFunctionBackTap();
                break;

            ////////////////已办事项////////////////
            case 'done':
                me.onInfoFunctionBackTap();
                break;

            case 'procedure':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;


            ////////////////设置//////////////
            case 'setting':
                me.onInfoFunctionBackTap();
                break;

            case 'pushsetting':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'module':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'version':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

        }

        document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
    },

    onQuitSystemTap: function(){
        navigator.app.exitApp(); //////////////////退出系统
    },

    //info的“返回键”事件，当只有一张页面时，返回至“主功能”页面
    onInfoBackTap: function(view, eOpts){
        var me = this;
        if(view.getActiveItem() == view.getAt(1)){
            me.getInfofunction().show();
            switch(view.getActiveItem().xtype){
                case 'contactlist':
                    me.getApplication().getController('ContactControl').getContactsearch().show();
                    break;
                case 'assignmain':
                    me.getApplication().getController('AssignControl').getSelectconfirm().hide();
                    break;
                case 'inspectmain':
                    me.getApplication().getController('InspectControl').getInspectselectconfirm().hide();
                    if(view.getActiveItem().getActiveItem().xtype == 'inspectfail'){
                        me.getApplication().getController('InspectControl').getInspectuploadall().show();
                    }
                    else{
                        me.getApplication().getController('InspectControl').getInspectuploadall().hide();
                    }
                    break;
            }
        }
    },

    //登录
    onLoginTap: function(){
        var me = this;
        WebInspect.app.user.sid = Ext.getCmp('name').getValue();
        WebInspect.app.user.password = Ext.getCmp('password').getValue();
        me.onVpnLogin(1, ''); /////成功写入开始执行VPN认证
        plugins.jPush.setAlias(WebInspect.app.user.sid,function(success){});//////推送标识，以用户名区分
//        me.onUserCheck(1,''); /////////测试的时候有
    },

    onUserWriteJson: function(){
        var me = this;
        var json = [];
        json.push({
            sid: WebInspect.app.user.sid,
            pwd: WebInspect.app.user.password,
            name: WebInspect.app.user.name,
            mobile: WebInspect.app.user.mobile,
            oulevel: WebInspect.app.user.oulevel
        });

        //将验证成功的用户信息，存在本地
        ////////////////////////////////写入文件////////////////////////////////
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtgotFS(fileSystem,me,json[0]);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件
    },

    //用户验证 //////////////////1正常登陆,0为推送//////////////////////////////////////
    onUserCheck: function(num,data){

        var me = this;
        Ext.Viewport.setMasked({xtype: 'loadmask',message: '用户验证中...'});
        if(WebInspect.app.user.sid && WebInspect.app.user.password){
            //用户名、密码输入完整
            var store = Ext.getStore('UserStore');

            var results = WebInspect.app.user.sid + '$' + WebInspect.app.user.password
                         + '$' + WebInspect.app.user.name + "$" + WebInspect.app.user.version;
            store.getProxy().setExtraParams({
                t: 'CheckUser',
                results: results
            });

            store.load(function(records, operation, success) {
                if(records.length == 0){
                    Ext.Viewport.setMasked(false);
                    plugins.Toast.ShowToast("验证失败！请重新输入！",3000);
                }
                else{
                    WebInspect.app.user.name = records[0].data.name;
                    WebInspect.app.user.mobile = records[0].data.mobile;
                    WebInspect.app.user.oulevel = records[0].data.oulevel;
                    WebInspect.app.user.taskcount = records[0].data.taskcount;
                    WebInspect.app.user.rtxcount = records[0].data.rtxcount;

                    Ext.getCmp('maintitle').onDataSet(records[0].data, WebInspect.app.user.name, WebInspect.app.user.mobile, WebInspect.app.user.oulevel);

                    me.onFunctionLoad(); //加载模块页面
//                    me.onWeatherStoreLoad();  //加载“天气预报”信息
                    me.onPushStoreSet(); //加载“待办事项”和“离线消息”数量

                    me.getApplication().getController('SalaryControl').onAllStoreLoad();
                    if(num == 1)
                    {
                        Ext.Viewport.setMasked(false);
                        me.getMain().setActiveItem(me.getFunctionmain());
                        me.onUserWriteJson(); //将验证成功的用户信息，存在本地
                        me.onCheckVesion(me);  /////////////////判断是否有新版本/////////////////////
                    }
                    else
                    {
                        Ext.Viewport.setMasked({
                            xtype: 'loadmask',
                            message: '努力加载中...'
                        });
                        me.onMessagePush(data);/////////////////////推送的消息
                    }
                }

            });
        }
        else{
            //用户名、密码输入不完整
            Ext.Viewport.setMasked(false);
            plugins.Toast.ShowToast("用户名和密码不能为空！",3000);
        }
    },

    onPushStoreSet: function(){
        var pushstore = Ext.getStore('PushStore');
        pushstore.getAt(0).data.num = WebInspect.app.user.taskcount;
        pushstore.getAt(1).data.num = WebInspect.app.user.rtxcount;
        Ext.getCmp('noticelist').refresh();
    },

    onFunctionLoad: function(){
        var me = this;
        var store = Ext.getStore('FunctionStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetFunctionZt',
            results: WebInspect.app.user.sid + '$jsonp'
        });
//        store.load();
        store.load(function(records, operation, success) {
            store.add({id: 15, sid: WebInspect.app.user.sid, title: '已办事项', name: 'done', url: 'resources/images/function/done.png'});
        });
    },

//    //加载“天气预报”信息，当num=0时，表示是“推送信息”， 当num=1时，表示是：应用程序正常启动
//    onWeatherStoreLoad: function(){
//        var me = this;
//        var store = Ext.getStore('WeatherStore');
//        store.removeAll();
//        store.getProxy().setExtraParams({
//            t: 'GetWeather',
//            results: 'jsonp'
//        });
//        store.load(function(records, operation, success) {
//
//            Ext.getCmp('maintitle').onDataSet(store.getAt(0), WebInspect.app.user.name, WebInspect.app.user.mobile);
//        });
//    },

    //“主功能”页面的事件，判断进入选择的模块
    onFunctionListTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.info = me.getInfo();
        if(!me.info){
            me.info = Ext.create('WebInspect.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['news', 'info', 'notice', 'contacts', 'tide', 'water', 'rain', 'flow', 'project', 'inspect', 'setting', 'mark', 'assignment', 'salary', 'done'];

        switch(record.data.name){
            case titlestr[0]:
                me.getApplication().getController('NewsControl').onNewsStypeSet('NewsStore', 'GetInfoList', 'news$jsonp', record.data.title);
                break;
            case titlestr[1]:
                me.getApplication().getController('NewsControl').onNewsStypeSet('InfoStore', 'GetInfoList', 'info$jsonp', record.data.title);
                break;
            case titlestr[2]:
                me.getApplication().getController('NewsControl').onNewsStypeSet('NoticeStore', 'GetInfoList', 'notice$jsonp', record.data.title);
                break;
            case titlestr[3]:
                me.getApplication().getController('ContactControl').onContactInitialize();
                break;
            case titlestr[4]:
                me.getApplication().getController('TideControl').onTideInitialize();
                break;

            case titlestr[5]:
                me.getApplication().getController('WaterControl').onWaterInitialize();
                break;
            case titlestr[6]:
                me.getApplication().getController('RainControl').onRainInitialize();
                break;
            case titlestr[7]:
                me.getApplication().getController('FlowControl').onFlowInitialize();
                break;
            case titlestr[8]:
                me.getApplication().getController('ProjectControl').onProjectInitialize();
                break;
            case titlestr[9]:
                me.getApplication().getController('InspectControl').onInspectInitialize();
                break;

            case titlestr[10]:
                me.getApplication().getController('SettingsControl').onSettingInitialize();
                break;

            case titlestr[11]:
                me.getApplication().getController('MarkControl').onMarkInitialize();
                break;

            case titlestr[12]:
                me.getApplication().getController('AssignControl').onAssignInitialize();
                break;

            case titlestr[13]:
                me.getApplication().getController('SalaryControl').onSalaryInitialize();
                break;

            case titlestr[14]:
                me.getApplication().getController('DoneControl').onDoneInitialize();
                break;
        }
        me.getMain().setActiveItem(me.getInfo());
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        var me = this;
        me.getMain().setActiveItem(me.getFunctionmain());
        if(me.getInfo().getActiveItem().xtype == 'markmain'){
            Ext.ComponentQuery.query('#photo')[0].clearImgListeners();
        }
        else if(me.getInfo().getActiveItem().xtype == 'salary'){
            me.getApplication().getController('SalaryControl').getSalarycarousel().removeAll();
        }
        me.getInfo().destroy();
    }
});