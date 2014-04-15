/**
 * Created by USER on 14-4-4.
 */
Ext.define('WebInspect.controller.AssignControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            assignment: 'info assignment',
            assignselect: 'assignselect',
            assignfirst: 'assignselect assignfirst',
            assignsecond: 'assignselect assignsecond',

            assignconfirm: '[itemId=assignconfirm]',
            assigncancel: '[itemId=assigncancel]',

            firstconfirm: '[itemId=firstconfirm]',
            tofirst: '[itemId=tofirst]',
            secondconfirm: '[itemId=secondconfirm]',

            location: '[itemId=location]',
            secondfield: '[itemId=secondfield]',
            tdfield: '[itemId=td_field]',
            tdms: '[itemId=td_ms]'
        },

        control: {
            assignconfirm: {
                tap: 'onAssignConfirmTap'
            },
            assigncancel: {
                tap: 'onAssignCancelTap'
            },
            firstconfirm: {
                tap: 'onFirstConfirmTap'
            },
            tofirst: {
                tap: 'onToFirstTap'
            },
            secondconfirm: {
                tap: 'onSecondConfirmTap'
            }
        }
    },

    onAssignInitialize: function(){

        var me = this;

        me.assignment = me.getAssignment();

        if(!me.assignment){
            me.assignment = Ext.create('WebInspect.view.assign.Assignment');
        }

        me.assignment.onLocationSet();
        me.getInfo().push(me.assignment);
        me.group = '';
        me.location = '';
    },

    onAssignSelectPush: function(index){

        var me = this;
        me.index = index;
        me.assignselect = me.getAssignselect();

//        if (!me.assignselect) {
//            me.assignselect = Ext.create('WebInspect.view.assign.AssignSelect');
//        }
        if (me.assignselect) {
            me.assignselect.removeAll();
            me.assignselect.destroy();
        }

        me.assignselect = Ext.create('WebInspect.view.assign.AssignSelect');

        if(me.index == 0){
            me.getAssignfirst().onAssignLocationInitialize();
        }
        else{
            me.getAssignfirst().onAssignGroupInitialize();
        }


        if (!me.assignselect.getParent()) {
            Ext.Viewport.add(me.assignselect);
        }
        me.assignselect.show();

    },

    onFirstConfirmTap: function(){
        var me = this;

        if(me.index == 0){

            me.onLocationFirstConfirm();

        }
        else{
            me.onGroupFirstConfirm();

        }


        me.getAssignselect().setActiveItem(me.getAssignsecond());

        me.getFirstconfirm().hide();
        me.getTofirst().show();
        me.getSecondconfirm().show();


    },

    onLocationFirstConfirm: function(){

        var me = this;
        ///////////////塘段id/////////////////////////////
        me.tdid = me.getAssignfirst().getValues().first;

        var store = Ext.getStore('SegmentStore');
        var index = store.find('tdid', me.tdid);
        me.locationtitle = store.getAt(index).data.htmc_name;
        me.getAssignselect().getItems().items[0].setTitle(me.locationtitle + '(可输入更多)');
        me.getTdfield().show();
        me.getAssignsecond().onAssignLocationInitialize(me.tdid);
    },

    onGroupFirstConfirm: function(){

        var me = this;
        ///////////////队伍id/////////////////////////////
        me.guid = me.getAssignfirst().getValues().first;

        var store = Ext.getStore('GroupStore');
        var index = store.find('guid', me.guid);
        me.grouptitle = store.getAt(index).data.OUName;
        me.getAssignselect().getItems().items[0].setTitle(me.grouptitle);
        me.getTdfield().hide();
        me.getAssignsecond().onAssignGroupInitialize(me.guid);
    },

    onToFirstTap: function(){
        var me = this;

        me.getAssignselect().getItems().items[0].setTitle('请选择');
        me.getAssignselect().setActiveItem(me.getAssignfirst());

        me.getFirstconfirm().show();
        me.getTofirst().hide();
        me.getSecondconfirm().hide();
    },

    onSecondConfirmTap: function(){
        var me = this;

        if(me.index == 0){
            me.onLocationSecondConfirm();
        }
        else{
            me.onGroupSecondConfirm();
        }

        me.assignselect.hide();
        me.assignselect.destroy();
    },

    onLocationSecondConfirm: function(){

        var me = this;
        var item = me.getSecondfield().getItems();
        me.location += me.locationtitle  + '：\r\n';

        for(var i=0; i<item.getCount(); i++){

            if(item.items[i].getChecked()){
                me.location += item.items[i].getLabel() + '，';
            }
        }

        if(me.getTdms().getValue()){
            me.location += me.getTdms().getValue();
        }
        else{
            me.location = me.location.substr(0, me.location.length - 1);
        }
        me.location += '\r\n';

        me.getLocation().setData({location: me.location, man: me.getLocation().getData().man});
    },

    onGroupSecondConfirm: function(){

        var me = this;
        var item = me.getSecondfield().getItems();

        for(var i=0; i<item.getCount(); i++){

            if(item.items[i].getChecked()){
                me.group += item.items[i].getLabel() + '，';
            }
        }

//        me.group = me.group.substr(0, me.group.length - 1);

        me.getLocation().setData({location: me.getLocation().getData().location, man: me.group});
    },

    onAssignConfirmTap: function(){
        alert('任务指派成功！');
    },

    onAssignCancelTap: function(){
        var me = this;
        me.getApplication().getController('MainControl').onInfoFunctionBackTap();
    }
})