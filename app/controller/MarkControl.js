/**
 * Created by USER on 14-3-25.
 */

Ext.define('WebInspect.controller.MarkControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'info',
            markmain: 'info markmain',
            mark: 'mark',
            photo: 'photo',
            photodelete: '[itemId=photodelete]'
        },

        control: {
            photodelete: {
                tap: 'onPhotoDeleteTap'
            }
        }
    },

    onMarkInitialize: function(){
        var me = this;
        me.markmain = me.getMarkmain();
        if(!me.markmain){
            me.markmain = Ext.create('WebInspect.view.mark.MarkMain');
        }
        me.getMark().onMarkTitleSet();
        me.getInfo().push(me.markmain);
    },

    onPhotoDeleteTap: function(){
        this.getInfo().onPhotoDelete();
    }
})