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
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            message: 'info message',
            task: 'main info task',
            taskdetail: 'main info taskdetail',
            messageDataView: 'dataview[itemId=messageDataView]'
        },

        control: {
            'task':{
                itemtap: 'onTaskItemTap'
            },
            messageDataView: {
                itemswipe: 'onMessageItemSwipe'
//                updatedata: 'onMessageUpdateData',
//                refresh: 'onMessageRefresh'
            }
        }
    },

    onTaskItemTap: function(list, index, target, record, e, eOpts ){

        this.taskdetail = this.getTaskdetail();
        if(!this.taskdetail){
            this.taskdetail = Ext.create('WebInspect.view.list.TaskDetail');
        }
        this.taskdetail.onDataSet(record);

        this.getInfo().push(this.taskdetail);
        this.getInfofunction().hide();



//        this.getMain().setActiveItem(this.getInfo());
    },

    onMessageItemSwipe: function(dataview, index, target, record, e, eOpts) {

//        var deleteButtons = dataview.query('button');
//
//        //hide other delete buttons
//        for (var i=0; i < deleteButtons.length; i++) {
//            deleteButtons[i].hide();
//        }

//        var labels = Ext.select(target.getObservableId() +' .money-label');
//        labels.hide();

        //show item delete button
        if(target.query('button')[0]){
            target.query('button')[0].show();
        }

        //hides delete button if anywhere else is tapped
//        Ext.Viewport.element.on({tap:function(){
//            if(target.query('button')[0] && (target.query('button')[0].getHidden() == false)){
//                target.query('button')[0].hide();
//            }
////            labels.show();
//        }, single:true});
        Ext.Viewport.element.addListener({tap:function(){
            if(target.query('button')[0] && (target.query('button')[0].getHidden() == false)){
                target.query('button')[0].hide();
            }
//            labels.show();
        }, single:true});

    },

    onMessageRefresh: function(dataview, newData, eOpts){
        this.getMessage().onMessageStoreLoad();
    },

    onMessageUpdateData: function(dataview, eOpts){
        this.getMessage().onMessageStoreLoad();
    }

})
