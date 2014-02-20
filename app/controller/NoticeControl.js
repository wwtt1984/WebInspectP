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
