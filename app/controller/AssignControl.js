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

            assignment: 'assignment'
        },

        control: {

        }
    },

    onAssignInitialize: function(){

        var me = this;

        me.assignment = me.getAssignment();

        if(!me.assignment){
            me.assignment = Ext.create('WebInspect.view.assign.Assignment');
        }

        me.getInfo().push(me.assignment);
    }
})