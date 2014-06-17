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

            opinion: '[itemId=opinion]',
            opinionpanel: '[itemId=opinion_panel]',
            opinionms: '[itemId=opinion_ms]'
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
            opinion: {
                change: 'onOpinionChange'
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

        this.taskdetail = this.getTaskdetail();
        if(!this.taskdetail){
            this.taskdetail = Ext.create('WebInspect.view.list.TaskDetail');
        }
        this.taskdetail.onDataSet(record);

        this.getInfo().push(this.taskdetail);
        this.getInfofunction().hide();

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
                me.getOpinionpanel().hide();
                break;
            case 'ignore':
                me.getOpinionpanel().show();
                me.getOpinionms().setValue('');
                break;
            case 'report':
                me.getOpinionpanel().show();
                me.getOpinionms().setValue('');
                break;
        }
    }

})
