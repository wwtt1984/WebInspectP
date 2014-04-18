/**
 * Created by USER on 14-4-10.
 */

Ext.define('WebInspect.view.assign.AssignSecond', {
    extend: 'Ext.form.Panel',
    xtype: 'assignsecond',

    requires: [
        'Ext.field.Radio'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'secondfield',
                defaults: {
                    xtype: 'checkboxfield',
                    cls: 'my-checkbox'
                }
            },
            {
                xtype: 'fieldset',
                itemId: 'td_field',
                style: 'border-radius: .4em;',
                items: [
                    {

                        label: '更多位置',
                        labelAlign: 'top',
                        xtype: 'textareafield',
                        itemId:'td_ms',
                        style: 'border-radius: .4em;'
                    }
                ]
            }
        ]

    },

    onAssignLocationInitialize: function(location){

        var me = this;

        var store = Ext.getStore('SegmentDetailStore');

        store.getProxy().setExtraParams({
            t: 'GetXcjhTD',
            results: location + '$jsonp'
        });

        store.load(function(records, operation, success) {
            var item = [];

            for(var i=0; i<store.getAllCount(); i++){
                item.push({label: store.getAt(i).data.htmc_name, value: store.getAt(i).data.tdid, name: store.getAt(i).data.tdid});
            }

            Ext.ComponentQuery.query('#secondfield')[0].setItems(item);
        });
    },

    onAssignGroupInitialize: function(guid){

        var me = this;

        var store = Ext.getStore('GroupDetailStore');
        var item = [];

        store.getProxy().setExtraParams({
            t: 'GetContactsList',
            results: guid + '$jsonp'
        });

        store.load(function(records, operation, success){

            for(var i=0; i<store.getCount(); i++){
                item.push({label: store.getAt(i).data.displayname, value: store.getAt(i).data.samaccountname, name: store.getAt(i).data.samaccountname});
            }

            Ext.ComponentQuery.query('#secondfield')[0].setItems(item);
        });
    }
})