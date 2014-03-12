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
            maininfo: 'info maininfo'
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
            }
        }
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

    onTaskItemTap: function(list, index, target, record, e, eOpts ){

        this.taskdetail = this.getTaskdetail();
        if(!this.taskdetail){
            this.taskdetail = Ext.create('WebInspect.view.list.TaskDetail');
        }
        this.taskdetail.onDataSet(record);

        this.getInfo().push(this.taskdetail);
        this.getInfofunction().hide();

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

    }

})
