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
            newsdetail: 'info newsdetail'
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
                itemtap: 'onFunctionLsitTap'
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

        window.setTimeout(function(){me.checkJpush(me);},100);
        document.addEventListener('deviceready',function(){me.onJpushReady(me);}, false);

        me.onBtnConfirm();
        //android返回键事件监听
        document.addEventListener("backbutton", me.onBackKeyDown, false);
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

        if(this.getInfo()){
            this.getInfo().destroy();
        }

        me.getMain().setActiveItem(me.getFunctionmain());

        this.info = this.getInfo();

        if(!this.info){
            this.info = Ext.create('WebInspect.view.Info');
        }

        this.getMain().add(this.info);

        var titlestr = ['news', 'info', 'notice', 'inspect'];

        switch(data.type){
            case titlestr[0]:
                this.onNoticeNewsStypeSet('NewsStore', 'GetInfoList', 'news$jsonp', data, '内网新闻');
                break;

            case titlestr[1]:
                this.onNoticeNewsStypeSet('InfoStore', 'GetInfoList', 'info$jsonp', data, '综合信息');
                break;

            case titlestr[2]:
                this.onNoticeNewsStypeSet('NoticeStore', 'GetInfoList', 'notice$jsonp',data,  '通知公告');
                break;

            case titlestr[3]:
                this.onNoticeNewsStypeSet('InspectStore', 'GetInfoList', 'inspect$jsonp', data, '海塘巡查');
                break;

        }
    },

    //根据推送信息，加载页面
    onNoticeNewsStypeSet: function(storename, t, results, data, title){

        var me = this;
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
                            me.downLoad();
                        }
                    });
                }
            }

        }, this);

    },

    /////////////////////////////////写文件/////////////////////////////////////////////////

    onwtgotFS:function(fileSystem,me,json) {
        fileSystem.root.getFile("login.json", {create: true, exclusive: false},
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
        writer.write("{\"sid\":\""+json.sid+"\",\"pwd\":\""+json.pwd+"\",\"name\":\""+json.name+"\",\"mobile\":\""+json.mobile+"\"}");
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////读取文件///////////////////////////////////////////////////
    onwtreadFS:function(fileSystem,me,num,data) {
        fileSystem.root.getFile("login.json", null,
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
            document.addEventListener("backbutton", me.onBackDo, false); // 返回键
            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onBackDo, false); // 返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
            }, 2000);
            //当前页面是其他的页面时，返回上一级页面
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
            case 'news':
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

            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            case 'flow':
                me.onInfoFunctionBackTap();
                break;

            case 'maininfo':
                me.onInfoFunctionBackTap();
                break;

            case 'firstlevel':
                me.onInfoFunctionBackTap();
                break;

            case 'setting':
                me.onInfoFunctionBackTap();
                break;

            case 'markmain':
                me.onInfoFunctionBackTap();
                break;

            case 'markmain':
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

            case 'projectfirst':
                me.onInfoFunctionBackTap();
                break;

            case 'tide':
                if((me.tidepop) && (me.tidepop.getHidden() == false)){
                    me.tidepop.hide();
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

            case 'secondlevel':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'waterdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'projectsecond':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'projectcard':
                me.getInfo().pop();
                break;

            case 'contact':
                if((me.popup) && (me.popup.getHidden() == false)){
                    me.popup.hide();
                }
                else{
                    me.getInfo().pop();
                }
                break;
        }
    },

    onQuitSystemTap: function(){
        navigator.app.exitApp(); //////////////////退出系统
    },

    //info的“返回键”事件，当只有一张页面时，返回至“主功能”页面
    onInfoBackTap: function(view, eOpts){

        if(view.getActiveItem() == view.getAt(1)){
            this.getInfofunction().show();
        }
    },

    //登录
    onLoginTap: function(){
        var me = this;
        WebInspect.app.user.sid = Ext.getCmp('name').getValue();
        WebInspect.app.user.password = Ext.getCmp('password').getValue();
        me.onVpnLogin(1, ''); /////成功写入开始执行VPN认证
        plugins.jPush.setAlias(WebInspect.app.user.sid,function(success){});//////推送标识，以用户名区分
       // me.onUserCheck(1,''); ////////测试的时候有
    },

    onUserWriteJson: function(){
        var me = this;
        var json = [];
        json.push({
            sid: WebInspect.app.user.sid,
            pwd: WebInspect.app.user.password,
            name: WebInspect.app.user.name,
            mobile: WebInspect.app.user.mobile
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
        Ext.Viewport.setMasked({xtype: 'loadmask',message: '连接成功,页面加载中...'});
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
                    WebInspect.app.user.taskcount = records[0].data.taskcount;
                    WebInspect.app.user.rtxcount = records[0].data.rtxcount;

                    me.onFuncitonLoad(); //加载模块页面
                    me.onWeatherStoreLoad();  //加载“天气预报”信息
                    me.onPushStoreSet(); //加载“待办事项”和“离线消息”数量

                    if(num == 1)
                    {
                        Ext.Viewport.setMasked(false);
                        me.getMain().setActiveItem(me.getFunctionmain());
                        me.onUserWriteJson(); //将验证成功的用户信息，存在本地
                        me.onCheckVesion(me);  /////////////////判断是否有新版本/////////////////////
                    }
                    else
                    {
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

    onFuncitonLoad: function(){
        var me = this;
        var store = Ext.getStore('FunctionStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetFunctionZt',
            results: WebInspect.app.user.sid + '$jsonp'
        });
        store.load(function(records, operation, success) {
            store.add({id: 11, sid: WebInspect.app.user.sid, title: '海塘标识', name: 'mark', url: 'resources/images/function/setting.png'});
        });
    },

    //加载“天气预报”信息，当num=0时，表示是“推送信息”， 当num=1时，表示是：应用程序正常启动
    onWeatherStoreLoad: function(){
        var me = this;
        var store = Ext.getStore('WeatherStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetWeather',
            results: 'jsonp'
        });
        store.load(function(records, operation, success) {

            Ext.getCmp('maintitle').onDataSet(store.getAt(0), WebInspect.app.user.name, WebInspect.app.user.mobile);
        });
    },

    //“主功能”页面的事件，判断进入选择的模块
    onFunctionLsitTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.info = me.getInfo();
        if(!me.info){
            me.info = Ext.create('WebInspect.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['news', 'info', 'notice', 'contacts', 'tide', 'water', 'rain', 'flow', 'project', 'inspect', 'setting', 'mark'];

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
                me.getApplication().getController('NewsControl').onNewsStypeSet('InspectStore', 'GetInfoList', 'inspect$jsonp', record.data.title);
                break;

            case titlestr[10]:
                me.getApplication().getController('SettingsControl').onSettingInitialize();
                break;

            case titlestr[11]:
                me.getApplication().getController('MarkControl').onMarkInitialize();
        }
        me.getMain().setActiveItem(me.getInfo());
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        this.getMain().setActiveItem(this.getFunctionmain());
        if(this.getInfo().getActiveItem().xtype == 'markmain'){
            Ext.ComponentQuery.query('#photo')[0].clearImgListeners();
        }
        this.getInfo().destroy();
    }
});