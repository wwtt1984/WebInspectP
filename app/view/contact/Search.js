/**
 * Created by USER on 14-4-3.
 */

Ext.define('WebInspect.view.contact.Search', {
    extend: 'Ext.List',
    xtype: 'ctsearch',

    requires: [
    ],
    config: {
        title: '通讯录搜索',
        itemId: 'ctsearch',

        cls: 'contact-list',

        pinHeaders: false,

        //itemTpl defines the template for each item in the list
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="contact-list-item">',
            '    <img class="photo" src="{[this.getImg(values)]}" />',
            '    <h1>{displayname}({samaccountname})</h1>',
            '    <span>{[this.getNum(values.mobile)]}&nbsp;({[this.getNum(values.pager)]})&nbsp;</span>',
            '    <p>{[this.getNum(values.telephonenumber)]}</p>',
            '</div>',
            {
                getImg: function(values){

                    var string = '';

                    if(values.description == '女'){
                        string += 'resources/images/woman.png';
                    }
                    else{
                        string += 'resources/images/man.png';
                    }
                    return string;
                },
                getNum: function(values){

                    var string = '--';

                    if(values != 'null'){
                        string = values;
                    }

                    return string;
                }
            }
        ),

        //give it a link to the store instance
        store: {
            model: 'WebInspect.model.ContactModel'
        },

        useSimpleItems: true,

        emptyText: '<div style="margin-top: 20px; text-align: center">无匹配的人员</div>',
        disableSelection: true,

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',

                cls: 'contact-search',
                style: 'border:none;',

                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: '请输入汉字或首字母组合...',
                        style: 'width:96%; border: none;margin: 0 2% 0 2%;',
                        listeners: {
                            clearicontap: function(){Ext.ComponentQuery.query('#ctsearch')[0].onSearchClearIconTap();},
                            keyup:function(field){Ext.ComponentQuery.query('#ctsearch')[0].onSearchKeyUp(field);}
                        }
                    }
                ]
            }
        ]
    },

    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('ContactSearchStore');

        var me = this;

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('displayname') + record.get('samaccountname'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);

                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });

            me.getStore().setData(store.getData().items);
        }
    },

    onSearchClearIconTap: function() {
        var me = this;
        //call the clearFilter method on the store instance
        Ext.getStore('ContactSearchStore').clearFilter();
        me.getStore().removeAll();
    }
})