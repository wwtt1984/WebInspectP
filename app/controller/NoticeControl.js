/**
 * Created by xiaona on 14-2-15.
 */

Ext.define('WebInspect.controller.NoticeControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            message: 'info message',
            task: 'main info task',
            taskdetail: 'main info taskdetail',
            messageDataView: 'dataview[itemId=messageDataView]',
            maininfo: 'info maininfo',

            opinionpanel: '[itemId=opinion_panel]',
            opinion: '[itemId=opinion]',

            opinionmspanel: '[itemId=opinionms_panel]',
            opinionms: '[itemId=opinion_ms]',

            taskconfirm: '[itemId=taskconfirm]',
            taskmain: '[itemId=taskmain]',

            forward: '[itemId=forward]',
            disposepanel: '[itemId=dispose_panel]',
            dispose: '[itemId=dispose]'
        },

        control: {
            '#noticelist': {
                itemtap: 'onNoticeListTap'
            },
            'task':{
                itemtap: 'onTaskItemTap'
            },
            messageDataView: {
                itemswipe: 'onMessageItemSwipe'
            },
//            opinion: {
//                change: 'onOpinionChange'
//            },
            taskconfirm:{
                tap: 'onTaskConfirmTap'
            }
        }
    },

    //“待办事项”等通知信息列表“单击”事件
    onNoticeListTap: function(list, index, target, record, e, eOpts ){

        this.info = this.getInfo();
        if(!this.info){
            this.info = Ext.create('WebInspect.view.Info');
        }

        this.getMain().add(this.info);

        switch(index){
            case 0:
                 //点击的信息是“待办事项”，加载用户“待办事项列表”页面
                this.onTaskStoreLoad();
                break;
            case 1:
                this.onMessageLoad();
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
    },

    //加载用户“待办事项”信息
    onTaskStoreLoad: function(){

        var me = this;
        me.task = me.getTask();
        if(!me.task){
            me.task = Ext.create('WebInspect.view.list.Task');
        }

        me.getInfo().push(me.task);

        var store = Ext.getStore('TaskStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetTaskListUser',
            results: WebInspect.app.user.sid
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        }, this);

        me.getMain().setActiveItem(me.getInfo());
    },

    onTaskItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.taskdetail = me.getTaskdetail();
        if(!me.taskdetail){
            me.taskdetail = Ext.create('WebInspect.view.list.TaskDetail');
        }
        me.onTaskDataSet(record);

        me.getInfo().push(me.taskdetail);
        me.getInfofunction().hide();

    },

    onTaskDataSet: function(record){

        var me = this;

        var store = Ext.getStore('TaskDetailStore');

        var img = store.getAt(0).data.imgjson;
        var detail = store.getAt(0).data.taskdetails;
        var dispose = store.getAt(0).data.disposes;
        var reply = store.getAt(0).data.replys;
        var forward  = store.getAt(0).data.forwards;

        Ext.ComponentQuery.query('#taskImage')[0].setData({simg: img, NodeName: record.data.NodeName, detail: detail});
        me.getForward().setOptions(forward);

        if(dispose.length){
            me.getOpinionpanel().hide();
            me.getDisposepanel().show();
            me.getDispose().setOptions(dispose);
            me.type = dispose;
        }
        else{
            me.getOpinionpanel().show();
            me.getDisposepanel().hide();
            me.type = reply;
            me.getOpinion().setOptions(reply);
        }

    },

    onMessageLoad: function(){
        var me = this;

        me.message = me.getMessage();
        if(!me.message){
            me.message = Ext.create('WebInspect.view.list.Message');
        }

        me.getInfo().push(me.message);

        me.getMain().setActiveItem(me.getInfo());

        var sdt = Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY,-7), 'Y-m-d').toString();
        var edt = Ext.Date.format(new Date(), 'Y-m-d').toString();

        var store = Ext.getStore('MessageStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetRtxList',
            results: WebInspect.app.user.sid + '$'+ sdt + '$' + edt + '$jsonp'
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        }, this);


    },

    onMessageItemSwipe: function(dataview, index, target, record, e, eOpts) {

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

    onOpinionChange: function(field, newValue, oldValue, eOpts){
        var me = this;

        switch(newValue){
            case 'agree':
                me.getOpinionmspanel().hide();
                break;
            case 'ignore':
                me.getOpinionmspanel().show();
                me.getOpinionms().setValue('');
                break;
            case 'report':
                me.getOpinionmspanel().show();
                me.getOpinionms().setValue('');
                break;
        }
    },

    onTaskConfirmTap:function()
    {
        var me = this;
        var record =  me.getTaskdetail().getRecord();
        var yij= me.getOpinion().getValue();
        var shij = record.data.ReceiveAt;
        var reny = record.data.OwnerAccount;
        var renw = record.data.NodeName;
        var htmc = record.data.Htmc;
        var xctd = record.data.Xctd;
        var yid = record.data.Yid;
        var tdid = record.data.Tdid;

        var stepId =me.getTaskdetail().getRecord().data.StepID;
        var sid = WebInspect.app.user.sid;
        var password = WebInspect.app.user.password;
        var name = WebInspect.app.user.name;

        var zhuanfa = me.getForward().getValue();
        var forward = me.getForward()._value.data.text;

        var xcfx = '巡查发现';
        var miaos = me.getOpinionms().getValue();

        var date = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();

        var results = stepId + '$' + sid + '$' + password + '$' + yij
                      + '$' + shij + '$' + htmc + '$' + name + '$' + name + '$' + xctd + '$' + xcfx + '$' + miaos  + '$' + yid + '$' + zhuanfa
                      + '$' + tdid + '$' + forward + '$' + date

        Ext.data.proxy.SkJsonp.validate('SetTasks',results,{
            success: function(response) {
                me.onTaskStoreRefresh();
                plugins.Toast.ShowToast("操作成功！",3000);
            },
            failure: function() {
                plugins.Toast.ShowToast("操作失败！",3000);
            }
        });

    },

    onTaskStoreRefresh: function(){
        var me = this;

        var store = Ext.getStore('TaskStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetTaskListUser',
            results: WebInspect.app.user.sid
        });

        store.load(function(records, operation, success){
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
        }, this);

        me.getInfofunction().show();
        me.getInfo().pop();
    }
})
