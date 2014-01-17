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
            newsback: '[itemId=newsback]',
            firstlevel: 'main info firstlevel',
            secondlevel: 'main info secondlevel',
            contact: 'main info contact',
            popup: 'main info popup',
            fullnum: '[itemId=fullnum]',
            shortnum: '[itemId=shortnum]',
            officenum: '[itemId=officenum]',
            numcancel: '[itemId=numcancel]',
            tide: 'info tide',
            tidepop: 'info tidepop',
            water: 'info water',
            waterSegmentedButton: '[itemId=waterSegmentedButton]',
            waterdetail: 'info waterdetail',
            setting: 'info setting',
            flow: 'info flow',
            flowSegmentedButton: '[itemId=flowSegmentedButton]',
            sysquit: '[itemId=sysquit]',
            maininfo: 'info maininfo',
            projectfirst: 'info projectfirst',
            projectsecond: 'info projectsecond'
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
            '#noticelist': {
//    			itemtaphold: 'onNoticeListTapHold',
                itemtap: 'onNoticeListTap'
            },
            '#functionlist': {
                itemtap: 'onFunctionLsitTap'
            },

            'infofunction': {
                tap: 'onInfoFunctionBackTap'
            },

            news: {
                itemtap: 'onNewsListTap'
            },
            newsback: {
                tap: 'onNewsBackTap'
            },

            firstlevel: {
                itemtap: 'onFirstLevelTap'
            },
            secondlevel: {
                itemtap: 'onSecondLevelTap'
            },
            contact: {
                itemtap: 'onContactItemTap'
            },
            fullnum: {
                tap: 'onFullNumTap'
            },
            shortnum: {
                tap: 'onShortNumTap'
            },
            officenum: {
                tap: 'onOfficeNumTap'
            },
            numcancel: {
                tap: 'onNumCancelTap'
            },
            tide: {
                itemtap: 'onTideItemTap'
            },
            '#tideSegmentedButton': {
                toggle: 'onTideSegmentedTap'
            },
            water: {
                itemtap: 'onWaterItemTap'
            },
            waterSegmentedButton: {
                toggle: 'onWaterSegmentedTap'
            },
            flowSegmentedButton: {
                toggle: 'onFlowSegmentedTap'
            },
            message: {
                itemtap: 'onMessageItemTap'
            },
            sysquit: {
                tap: 'onQuitSystemTap'
            },
            projectfirst: {
                itemtap: 'onProjectFirstTap'
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


//        /*
//        * ios中用户名、密码记住功能
//        * */
//
//        var store = Ext.getStore('UserStore');
//        if(store.getAllCount() > 0){
//            Ext.getCmp('name').setValue(store.getAt(0).data.uid);
//            Ext.getCmp('password').setValue(store.getAt(0).data.password);
//        }

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

    onDoChickTitle:function(data){       ////////执行点击标题栏事件

        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        if(WebInspect.app.user.name && WebInspect.app.user.mobile){
            this.onMessagePush(data);
        }
        else{
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                function(fileSystem){me.onwtreadFS(fileSystem,me,0,data);},
                function(error){me.onwtfail(error,me);}
            ); ////读文件
        }
    },

    onMessagePush: function(data){
        var me = this;
        me.onTaskStoreLoad(0);

        if(this.getInfo()){
            this.getInfo().destroy();
        }

        me.getMain().setActiveItem(me.getFunctionmain());

        this.info = this.getInfo();

        if(!this.info){
            this.info = Ext.create('WebInspect.view.Info');
        }

        this.getMain().add(this.info);

        if(data.type == 'news'){
            this.onNoticeNewsStypeSet('NewsStore', 'GetInfoList', 'news$jsonp', data, '内网新闻');
        }
        else if(data.type == 'info'){

            this.onNoticeNewsStypeSet('InfoStore', 'GetInfoList', 'info$jsonp', data, '综合信息');

        }
        else if(data.type == 'notice'){

            this.onNoticeNewsStypeSet('NoticeStore', 'GetInfoList', 'notice$jsonp',data,  '通知公告');

        }
        else{

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

                        me.newspdf.setPdfUrl(detailstore.getAt(0).data.simg);
                        me.getInfofunction().hide();
                        me.getInfo().push(me.newspdf);
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
                        me.newsdetail.onDataSet(detailstore.getAt(0));
                        me.getInfofunction().hide();
                        me.getInfo().push(me.newsdetail);
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

    onVpnLogin:function()
    {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'VPN连接中,请稍后...'});
        var me = this;
        plugins.Vpn.VpnLogin(WebInspect.app.user.sid,WebInspect.app.user.password,function(success) {
            Ext.Viewport.setMasked(false);
            if(success == "true")
            {
                plugins.Toast.ShowToast("VPN连接成功!",3000);
                ////////////////////////////////////////////////
                me.onCheckVesion(me); //////////////检查版本号////////////////////
                me.onUserCheck();
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

    },

    onVpnCheckOnline:function(data){

        var me = this;
        plugins.Vpn.VpnCheckOnLine(WebInspect.app.user.sid,WebInspect.app.user.password,function(success) {

            alert(success);
            me.onDoChickTitle(data);

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

            if(num == 1){
                Ext.getCmp('name').setValue(WebInspect.app.user.sid);
                Ext.getCmp('password').setValue(WebInspect.app.user.password);
                me.onVpnLogin();//////////////////先执行vpn认证///////////////////
            }
            else{
//                me.onVpnLogin();//////////////////先执行vpn认证///////////////////
                me.onMessagePush(data);
            }
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

            case 'message':
                me.onInfoFunctionBackTap();
                break;

            case 'water':
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
                if((me.getNewsdetail().view) && (me.getNewsdetail().view.getHidden() == false)){
                    me.getNewsdetail().view.hide();
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
        me.onVpnLogin(); /////成功写入开始执行VPN认证

//        me.onUserCheck();
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

    //用户验证
    onUserCheck: function(){

        var me = this;

//        var local = Ext.getStore('UserStore');

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '登录中,请稍后...'
        });

        if(WebInspect.app.user.sid && WebInspect.app.user.password){
            //用户名、密码输入完整
            var store = Ext.getStore('UserStore');

            var store = Ext.create('Ext.data.Store',{
                model: 'WebInspect.model.UserModel',
                proxy: {
                    type: 'sk'
                }
            });
            var results = WebInspect.app.user.sid + '$' + WebInspect.app.user.password + '$1234567$123';

            store.getProxy().setExtraParams({
                t: 'CheckUser',
                results: results
            });



            store.load(function(records, operation, success) {

                if((store.getAllCount() != 0) && (store.getAt(0).data.uid != null)){
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: '验证成功,页面加载中...'
                    });

                    /*
                        ios用户名、密码放在local store中
                     */
//                    local.removeAll();
//                    local.add({uid:store.getAt(0).data.uid, password: WebInspect.app.user.password, name:store.getAt(0).data.name, mobile:store.getAt(0).data.mobile});
//                    local.sync();

                    me.onInsertUserInfo(me);

                    WebInspect.app.user.name = store.getAt(0).data.name;
                    WebInspect.app.user.mobile = store.getAt(0).data.mobile;

                    //将验证成功的用户信息，存在本地
                    me.onUserWriteJson();

                    //加载用户“待办事项”信息
                    me.onTaskStoreLoad(1);
                    me.onMessageLoad();
                }
                else{
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('验证失败！请重新输入！');
                }
            });
        }
        else{
            //用户名、密码输入不完整
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('用户名和密码不能为空！');
        }
    },

    //记录用户版本信息
    onInsertUserInfo:function(me)
    {
        var results = WebInspect.app.user.sid  + "$" + WebInspect.app.user.name + "$" + WebInspect.app.user.version;
        Ext.data.proxy.SkJsonp.validate('InsertTodayUser',results,{
            success: function(response) {

            },
            failure: function() {

            }
        });
    },

    onMessageLoad: function(){

        var store = Ext.getStore('MessageStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetRtxList',
            results: WebInspect.app.user.sid + '$jsonp'
        });

        store.load(function(records, operation, success){}, this);
    },

    //加载用户“待办事项”信息
    onTaskStoreLoad: function(num){
        var me = this;
        var store = Ext.getStore('TaskStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetTaskListUser',
            results: WebInspect.app.user.sid
        });

        store.load(function(records, operation, success){
            var pushstore = Ext.getStore('PushStore');
            pushstore.getAt(0).data.num = store.getAllCount();
            Ext.getCmp('noticelist').setStore(pushstore);

            //加载“天气预报”信息
            me.onWeatherStoreLoad(num);
        }, this);
    },

    //加载“天气预报”信息，当num=0时，表示是“推送信息”， 当num=1时，表示是：应用程序正常启动
    onWeatherStoreLoad: function(num){
        var me = this;
        var store = Ext.getStore('WeatherStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetWeather',
            results: 'jsonp'
        });

        store.load(function(records, operation, success) {

            Ext.getCmp('maintitle').onDataSet(store.getAt(0), WebInspect.app.user.name, WebInspect.app.user.mobile);
            Ext.getCmp('noticelist').addCls('hidden-disclosure-list');

            if(num == 1){
                Ext.Viewport.setMasked(false);
                //当num=1时，表示是：应用程序正常启动, 加载“主功能”页面
                me.getMain().setActiveItem(me.getFunctionmain());
            }
        });
    },

    //“待办事项”等通知信息的长按事件，显示“删除”按钮。
    onNoticeListTapHold: function(list, index, target, record, e, eOpts){

        list.lastTapHold = new Date();
        Ext.getCmp('noticelist').removeCls('hidden-disclosure-list');
    },

    //“待办事项”等通知信息列表“单击”事件
    onNoticeListTap: function(list, index, target, record, e, eOpts ){

        //判断是否为itemtap
        if (!list.lastTapHold || (list.lastTapHold - new Date() > 1000)) {

            //判断是否为disclosure事件，若不是，则执行下列代码
            if(!e.getTarget('.x-list-disclosure')){
                //判断“删除”按钮是否已经显示，若已显示，则隐藏
                if(Ext.getCmp('noticelist').getCls().length == 2){
                    Ext.getCmp('noticelist').addCls('hidden-disclosure-list');
                }
                else{
                    this.info = this.getInfo();
                    if(!this.info){
                        this.info = Ext.create('WebInspect.view.Info');
                    }

                    this.getMain().add(this.info);

                    switch(index){
                        case 0:
                            //点击的信息是“待办事项”，加载用户“待办事项列表”页面

                            this.task = this.getTask();
                            if(!this.task){
                                this.task = Ext.create('WebInspect.view.Task');
                            }

                            this.getInfo().push(this.task);

                            this.getMain().setActiveItem(this.getInfo());

                            break;
                        case 1:

                            this.message = this.getMessage();
                            if(!this.message){
                                this.message = Ext.create('WebInspect.view.list.Message');
                            }

                            this.getInfo().push(this.message);

                            this.getMain().setActiveItem(this.getInfo());
                            break;
                        case 2:

                            this.maininfo = this.getMaininfo();
                            if(!this.maininfo){
                                this.maininfo = Ext.create('WebInspect.view.list.MainInfo');
                            }

                            this.getInfo().push(this.maininfo);

                            this.maininfo.onDataSet();

                            this.getMain().setActiveItem(this.getInfo());
                            break;
                    }
                }
            }
        }
        list.lastTapHold = null;
    },

    onMessageItemTap: function(list, index, target, record, e, eOpts ){
        Ext.Msg.alert('功能正在完善中！');
    },

    //“主功能”页面的事件，判断进入选择的模块
    onFunctionLsitTap: function(list, index, target, record, e, eOpts ){

        this.info = this.getInfo();
        if(!this.info){
            this.info = Ext.create('WebInspect.view.Info');
        }

        this.getMain().add(this.info);

        if(record.data.name == '内网新闻'){

            this.onNewsStypeSet('NewsStore', 'GetInfoList', 'news$jsonp', record.data.name);
        }
        else if(record.data.name == '综合信息'){

            this.onNewsStypeSet('InfoStore', 'GetInfoList', 'info$jsonp', record.data.name);

        }
        else if(record.data.name == '通知公告'){

            this.onNewsStypeSet('NoticeStore', 'GetInfoList', 'notice$jsonp', record.data.name);

        }
        else if(record.data.name == '通讯录'){

            var store = Ext.getStore('FirstLevelStore');

            store.removeAll();

            store.getProxy().setExtraParams({
                t: 'GetContactsList',
                results: '00$jsonp'
            });

            this.firstlevel = this.getFirstlevel();

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });

            store.load(function(records, operation, success){
                store.filter('ORG_Id_0', '0');
                Ext.Viewport.setMasked(false);
            }, this);

            if(!this.firstlevel){
                this.firstlevel = Ext.create('WebInspect.view.contact.FirstLevel');
            }
            this.firstlevel.setTitle('钱塘江管理局');
            this.getInfo().push(this.firstlevel);
            this.getMain().setActiveItem(this.getInfo());
        }
        else if(record.data.name == '潮位信息'){

            var store = Ext.getStore('TideStore');

            store.removeAll();

            store.getProxy().setExtraParams({
                t: 'GetTidal',
                results: 'jsonp'
            });

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });

            this.tide = this.getTide();
            if(!this.tide){
                this.tide= Ext.create('WebInspect.view.tide.Tide');
            }

            store.load(function(records, operation, success){
                store.clearFilter();
                store.filter("sdate", Ext.Date.format(new Date(), 'Y-m-d').toString());
                if(store.getAllCount() == store.getCount()){
                    Ext.getCmp('tidetoolbar').hide();
                    Ext.getCmp('tidepanel').show();
                }
                else{
                    Ext.getCmp('tidetoolbar').show();
                    Ext.getCmp('tidepanel').hide();
                }
                Ext.Viewport.setMasked(false);
            }, this);

            this.getInfo().push(this.tide);
            this.getMain().setActiveItem(this.getInfo());
        }
        else if(record.data.name == '水情信息'){

            this.onWaterStoreLoad('main', 0);

            this.water = this.getWater();
            if(!this.water){
                this.water= Ext.create('WebInspect.view.water.Water');
            }
            this.getInfo().push(this.water);
            this.getMain().setActiveItem(this.getInfo());
        }
        else if(record.data.name == '流量信息'){

            this.onFlowStoreLoad(Ext.Date.format(new Date(), 'Y-m-d').toString(), 0);
            this.flow = this.getFlow();
            if(!this.flow){
                this.flow = Ext.create('WebInspect.view.flow.Flow');
            }
            this.getInfo().push(this.flow);
            this.getMain().setActiveItem(this.getInfo());
        }
        else if(record.data.name == '工情信息'){

            this.onProjectFirstStoreLoad();
            this.projectfirst = this.getProjectfirst();
            if(!this.projectfirst){
                this.projectfirst = Ext.create('WebInspect.view.project.ProjectFirst');
            }
            this.getInfo().push(this.projectfirst);
            this.getMain().setActiveItem(this.getInfo());
        }
        else if(record.data.name == '设置'){


            this.setting = this.getSetting();
            if(!this.setting){
                this.setting = Ext.create('WebInspect.view.settings.Setting');
            }
            this.getInfo().push(this.setting);
            this.getMain().setActiveItem(this.getInfo());
        }
        else{

//    		var store = Ext.create('Ext.data.Store', {
//            	model: 'WebInspect.model.TestModel',
//
//            	data: [
//                	{ name: 'Tommy',   id: '01', date: '2013-10-27'  }
//            	]
//        	});
//
//        	this.test = Ext.create('WebInspect.view.Test');
//
//        	Ext.getCmp('test').setStore(store);
//
//        	this.getInfo().push(this.test);
            Ext.Msg.alert('此模块正在完善中！');
        }
    },

    //加载“内网新闻”，“通知公告”，“综合信息”模块页面
    onNewsStypeSet: function(storename, t, results, title){

        var store = Ext.getStore(storename);

        store.removeAll();

        store.getProxy().setExtraParams({
            t: t,
            results: results
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.loadPage(1,function(records, operation, success) {Ext.Viewport.setMasked(false)});

        this.news = this.getNews();
        if(!this.news){
            this.news = Ext.create('WebInspect.view.news.News');
        }
        this.news.setStore(store);
        this.news.setTitle(title);
        this.getInfo().push(this.news);
        this.getMain().setActiveItem(this.getInfo());
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        this.getMain().setActiveItem(this.getFunctionmain());
        this.getInfo().destroy();
    },

    //“内网新闻”，“通知公告”，“综合信息”列表，进行单击选择后，加载“详细信息”页面
    onNewsListTap: function(list, index, target, record, e, eOpts ){

        var store = Ext.getStore('NewsDetailStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetInfo',
            results: record.data.stype + '$jsonp',
            sid: record.data.sid
        });

        if(record.data.simgtype == 'pdf'){
            this.newspdf = this.getNewspdf();
            if(!this.newspdf){
                this.newspdf = Ext.create('WebInspect.view.news.NewsPdf');
            }

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });

            store.load(function(records, operation, success){
                Ext.Viewport.setMasked(false);
                this.newspdf.setPdfUrl(store.getAt(0).data.simg);
            }, this);
            this.getInfofunction().hide();
            this.getInfo().push(this.newspdf);
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

                this.newsdetail.onDataSet(store.getAt(0));
            }, this);
            this.getInfofunction().hide();
            this.getInfo().push(this.newsdetail);

        }
    },

    //查看“详细信息”中的图片后，返回至“详细信息”页面
    onNewsBackTap: function(){
        this.getNewsdetail().onViewHide();
    },

    //加载通讯录二级信息
    onContactLevelSet: function(storename, guid, view, viewname, title){
        var store = Ext.getStore(storename);

        store.removeAll();


        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: guid + '$jsonp'
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            store.filter('ORG_Id_0', '0');
            Ext.Viewport.setMasked(false);
        }, this);

        if(!view){
            view = Ext.create('WebInspect.view.' + viewname);
        }
        view.setTitle(title);

        this.getInfofunction().hide();
        this.getInfo().push(view);
    },

    //在通讯录一级列表中选择，加载二级信息列表
    onFirstLevelTap: function(list, index, target, record, e, eOpts){
        this.onContactLevelSet('SecondLevelStore', record.data.guid, this.getSecondlevel(), 'contact.SecondLevel', record.data.OUName);

    },

    //在通讯录二级列表中选择，加载三级信息列表
    onSecondLevelTap: function(list, index, target, record, e, eOpts){

        var store = Ext.getStore('ContactStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: record.data.guid + '$jsonp'
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            Ext.Viewport.setMasked(false);
        }, this);

        this.contact = this.getContact();
        if(!this.contact){
            this.contact = Ext.create('WebInspect.view.contact.Contact');
        }
        this.contact.setTitle(record.data.OUName);
        this.getInfo().push(this.contact);
    },

    //点击通讯录中“人员”
    onContactItemTap: function(list, index, target, record, e, eOpts){
    	if (!this.popup) {
//            this.popup.destroy();
            this.popup = Ext.create('WebInspect.view.contact.PopUp');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.popup.setWidth(null);
            this.popup.setHeight('40%');
            this.popup.setTop(null);
            this.popup.setLeft(0);
        }

        this.popup.onDataSet(record);
        if (!this.popup.getParent()) {
            Ext.Viewport.add(this.popup);
        }
        this.popup.show();
    },

    onFullNumTap: function(){
        var num = Ext.ComponentQuery.query('#fullnum')[0].getText();

        plugins.Phone.Call(num, function(obj) {
//            alert(obj.number);
        },function(error){
//            alert(error);
        });
    },

    onShortNumTap: function(){
        var num = Ext.ComponentQuery.query('#shortnum')[0].getText();

        plugins.Phone.Call(num, function(obj) {},function(error){});
    },

    onOfficeNumTap: function(){

        var num = Ext.ComponentQuery.query('#officenum')[0].getText();

        plugins.Phone.Call(num, function(obj) {},function(error){});
    },

    onNumCancelTap: function(){
        this.popup.hide();
    },

    //点击选择“潮位信息”中的一条信息后，显示具体信息
    onTideItemTap: function(list, index, target, record, e, eOpts){

        if (!this.tidepop) {
//            this.tidepop.destroy();
            this.tidepop = Ext.create('WebInspect.view.tide.TidePop');
        }
//        this.tidepop = Ext.create('WebInspect.view.tide.TidePop');
        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.tidepop.setWidth(null);
            this.tidepop.setMinHeight('45%');
            this.tidepop.setTop(null);
            this.tidepop.setLeft(0);
        }

        this.tidepop.onDataSet(record);
        if (!this.tidepop.getParent()) {
            Ext.Viewport.add(this.tidepop);
        }
        this.tidepop.show();
    },

    //潮位信息中的“segmentedbutton”事件，选择后，显示该日期的“潮位信息”
    onTideSegmentedTap: function(me, button, isPressed, eOpts){
        if(isPressed){
            var store = Ext.getStore('TideStore');
            store.clearFilter();

            store.filter("sdate",button._text);
        }
    },

    //水情信息中的“主要、河、库、闸、潮”信息选择
    onWaterSegmentedTap: function(me, button, isPressed, eOpts){
//        var text = me.getPressedButtons()[0].getText();
        if(isPressed){

            var text = button._text;
            switch(text){
                case '主要':
                    this.onWaterStoreLoad('main', 1);
                    break;
                case '河':
                    this.onWaterStoreLoad('river', 1);
                    break;
                case '库':

                    this.onWaterStoreLoad('reservoir', 1);
                    break;
                case '闸':

                    this.onWaterStoreLoad('strobe', 1);
                    break;
                case '潮':

                    this.onWaterStoreLoad('tidal', 1);
                    break;
            }
        }
    },

    onWaterStoreLoad: function(result, num){
        if(num == 0){
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });
        }

        var store = Ext.getStore('WaterStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetWaterMainInfo',
            results: result + '$jsonp'
        });

//        store.loadPage(1,function(records, operation, success) {});
        store.load(function(records, operation, success) {
            if(num == 0){
                Ext.Viewport.setMasked(false);
            }
        }, this);
    },

    onWaterItemTap: function(list, index, target, record, e, eOpts){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('WaterDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetWaterSingleInfo',
            results: record.data.stcdt + '$jsonp'
        });

        store.load(function(records, operation, success){
            Ext.Viewport.setMasked(false);
        }, this);

        this.waterdetail = this.getWaterdetail();

        if(!this.waterdetail){
            this.waterdetail = Ext.create('WebInspect.view.water.WaterDetail');
        }

        this.getInfofunction().hide();
        this.getInfo().push(this.waterdetail);
    },

    onFlowStoreLoad: function(result, num){

        if(num == 0){
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '努力加载中...'
            });
        }

        var store = Ext.getStore('FlowStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetFlowMainInfo',
            results: result + '$jsonp'
        });

        store.load(function(records, operation, success) {
            if(num == 0){
                Ext.Viewport.setMasked(false);
            }
        });
    },

    onFlowSegmentedTap: function(me, button, isPressed, eOpts){
//        var text = me.getPressedButtons()[0].getText();
        if(isPressed){

            var text = button._text;
            this.onFlowStoreLoad(text, 1);
        }
    },

    onProjectFirstStoreLoad: function(){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('ProjectFirstStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqList',
            results: 'jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);
        });
    },

    onProjectFirstTap: function(list, index, target, record, e, eOpts){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var store = Ext.getStore('ProjectSecondStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGqInfo',
            results: record.data.type + '$' + record.data.location + '$jsonp'
        });

        store.load(function(records, operation, success) {
            Ext.Viewport.setMasked(false);
        });

        this.projectsecond = this.getProjectsecond();

        if(!this.projectsecond){
            this.projectsecond = Ext.create('WebInspect.view.project.ProjectSecond');
        }

        this.getInfofunction().hide();
        this.getInfo().push(this.projectsecond);
    }
});