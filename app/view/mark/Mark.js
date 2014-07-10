/**
 * Created by USER on 14-3-21.
 */
Ext.define('WebInspect.view.mark.Mark', {
    extend: 'Ext.Panel',
    xtype: 'mark',

    requires: [
        'Ext.XTemplate'
    ],

    config: {

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px 10px 0 10px;',

        items: [
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;',
//                itemId: 'textpanel',
                items: [
                    {

                        xtype: 'selectfield',
                        itemId: 'marktype',
                        label: '标识类别',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '限高架',  value: '1'},
                            {text: '广告牌', value:'2'},
                            {text: '显示屏',  value: '3'},
                            {text: '路障', value:'4'}
                        ]
                    }]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;',
//                itemId: 'textpanel',
                items: [
                    {

                        xtype: 'selectfield',
                        itemId: 'marktype',
                        label: '标识类别',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '限高架',  value: '1'},
                            {text: '广告牌', value:'2'},
                            {text: '显示屏',  value: '3'},
                            {text: '路障', value:'4'}
                        ]
                    }]
            },
            {
                xtype: 'panel',
                itemId: 'marktitle',
                tpl:  Ext.create('Ext.XTemplate',
                    '<div style="font-size:18px; font-weight;bold; height: 2em;line-height: 2em;">坐标位置:</div>',
                    '<div style="font-size:16px; font-weight;normal; width: 100%; height: 2em;line-height: 2em;background: #fff;border-radius: .4em;padding-left: 5px;border: 1px #ddd solid;">E120°09′ N30°14′ </div>',
                    '<div style="font-size: 18px;font-weight; margin-top:10px;bold;height: 2em;line-height: 2em;">请输入位置描述:</div>'
                )
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;',
                itemId: 'textpanel',
                items: [
                    {

                        xtype: 'textareafield',
                        itemId:'tarea_ms'
                        //maxRows: 2,
                        //ui: 'round'
                        //style: 'border-radius: .4em;'
                    }]
            },
            {
                xtype: 'panel',
                html: '<div style="font-size: 18px;font-weight; margin-top:10px;bold;height: 2em;line-height: 2em;">拍照请按下面+按钮:</div>'
            },
            {
                xtype: 'photo',
                style: 'background:#fff;border-radius: .4em;border:1px #eee solid;min-height:80px;'
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                items: [
                    {
                        xtype: 'button',
                        text: '标记',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 0 0 0;',
                        itemId: 'markconfirm'
                    }
                ]

            }
        ]
    },

    onMarkTitleSet: function(){
        Ext.ComponentQuery.query('#marktitle')[0].setData({});
    }
})