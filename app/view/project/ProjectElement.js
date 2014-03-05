Ext.define('WebInspect.view.project.ProjectElement', {
    extend: 'Ext.Panel',
    xtype: 'projectelement',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tpl for=".">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">{data.type}</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.value)]}</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                formatNull: function(data) {
                    if(data != ''){
                        return data;
                    }
                    else{
                        return '--';
                    }
                }
            }
        )
    },

    onDataSet: function(data, title){

        this.setData(data);
    }
});
