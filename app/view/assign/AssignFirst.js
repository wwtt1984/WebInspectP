/**
 * Created by USER on 14-4-9.
 */
Ext.define('WebInspect.view.assign.AssignFirst', {
    extend: 'Ext.form.Panel',
    xtype: 'assignfirst',

    requires: [
        'Ext.field.Radio'
    ],

    config: {
        itemId: 'assignfirst',
        title: '请选择地点',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'firstfield',
                defaults: {
                    labelAlign: 'right',
                    xtype: 'radiofield',
                    cls: 'my-radio'
                }
            }
        ]

    },

    onAssignLocationInitialize: function(){

        var me = this;

        var store = Ext.getStore('SegmentStore');

        var item = [];

        for(var i=0; i<store.getAllCount(); i++){
            item.push({label: store.getAt(i).data.htmc_name, value: store.getAt(i).data.tdid, name: 'first'});
        }
        Ext.ComponentQuery.query('#firstfield')[0].setItems(item);
    },

    onAssignGroupInitialize: function(){

        var me = this;

        var store = Ext.getStore('GroupStore');
        var item = [];

        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: '0003$jsonp'
        });

        store.load(function(records, operation, success){
            store.filter('ORG_Id_0', '0');
            for(var i=0; i<store.getCount(); i++){
                item.push({label: store.getAt(i).data.OUName, value: store.getAt(i).data.guid, name: 'first'});
            }
            Ext.ComponentQuery.query('#firstfield')[0].setItems(item);
        }, this);
    }
})