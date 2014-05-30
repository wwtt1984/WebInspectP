/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.view.salary.SalaryCarousel',{
    extend: 'Ext.carousel.Carousel',

    xtype: 'salarycarousel',

    config: {
        indicator: false,
        enableSwipeNavigate: true,
        currentDate: '',
        preStore: '',
        currentStore: '',
        nextStore: '',
        salaryHeader: ''
    },

    initialize: function(){

        this.initViews();

        this.setActiveItem(1); // for some reason, activeItem: 1 is not being applied unless explicitly set.

        this.on('activeitemchange', this.onActiveItemChange);

    },

    initViews: function(){

        var me = this;
        var items = [];
        var config = this.config;

        if(Ext.getStore(config.preStore).getCount()){
            var prestore = Ext.create('Ext.data.Store',{
                model: 'WebInspect.model.SalaryModel',
                data: Ext.getStore(config.preStore).getData().all
            });
            var pre = Ext.create('WebInspect.view.salary.SalaryList', Ext.applyIf({
                store: prestore,
                currentDate: Ext.Date.add(config.currentDate, Ext.Date.MONTH, -1)
            }));
            items.push(pre);
        }


        if(Ext.getStore(config.currentStore).getCount()){
            var nowstore = Ext.create('Ext.data.Store',{
                model: 'WebInspect.model.SalaryModel',
                data: Ext.getStore(config.currentStore).getData().all
            });
            var now = Ext.create('WebInspect.view.salary.SalaryList', Ext.applyIf({
                store: nowstore,
                currentDate: config.currentDate
            }));
            items.push(now);
        }

        if(Ext.getStore(config.nextStore).getCount()){
            var nextstore = Ext.create('Ext.data.Store',{
                model: 'WebInspect.model.SalaryModel',
                data: Ext.getStore(config.nextStore).getData().all
            });
            var next = Ext.create('WebInspect.view.salary.SalaryList', Ext.applyIf({
                store: nextstore,
                currentDate: Ext.Date.add(config.currentDate, Ext.Date.MONTH, +1)
            }));
            items.push(next);
        }


        this.setItems(items);
    },

    getViewDate: function(date, i){

        return Ext.Date.add(date, Ext.Date.MONTH, i)
    },

    /**
     * Override of the onCardSwitch method which adds a new card to the end/beginning of the carousel depending on the direction configured with the next period's
     * dates.
     * @method
     * @private
     */
    onActiveItemChange: function(container, newCard, oldCard){

        var me = this;
        if (this.getEnableSwipeNavigate()) {
            var items = this.getItems();
            var length = items.length;
            var newIndex = items.indexOf(newCard), oldIndex = items.indexOf(oldCard), direction = (newIndex > oldIndex) ? 'forward' : 'backward';

            this.counter = (this.counter || 0) + 1;

            if (direction === 'forward') {
                if(length > 2){
                    this.remove(items.get(0));
                }

                var store = Ext.create('Ext.data.Store',{
                    model: 'WebInspect.model.SalaryModel',
                    proxy: {
                        type: 'sk'
                    }
                });
                store.getProxy().setExtraParams({
                    t: 'GetSalary',
                    results: WebInspect.app.user.sid + '$' + Ext.Date.format(Ext.Date.add(newCard.config.currentDate, Ext.Date.MONTH, +1), 'Y-m').toString() + '-01$jsonp'
                });
                store.load(function(records, operation, success) {

                    if(records.length)
                    {
                        var nextstore = Ext.create('Ext.data.Store',{
                            model: 'WebInspect.model.SalaryModel',
                            data: store.getData().all
                        });
                        var next = Ext.create('WebInspect.view.salary.SalaryList', Ext.applyIf({
                            store: nextstore,
                            currentDate: Ext.Date.add(newCard.config.currentDate, Ext.Date.MONTH, +1)
                        }));
                        me.add(next);
                    }
                });

            }
            else {
                if(length > 2){
                    this.remove(items.get(items.getCount() - 1));
                }

                var store = Ext.create('Ext.data.Store',{
                    model: 'WebInspect.model.SalaryModel',
                    proxy: {
                        type: 'sk'
                    }
                });
                store.getProxy().setExtraParams({
                    t: 'GetSalary',
                    results: WebInspect.app.user.sid + '$' + Ext.Date.format(Ext.Date.add(newCard.config.currentDate, Ext.Date.MONTH, -1), 'Y-m').toString() + '-01$jsonp'
                });
                store.load(function(records, operation, success) {

                    if(records.length)
                    {
                        var prestore = Ext.create('Ext.data.Store',{
                            model: 'WebInspect.model.SalaryModel',
                            data: store.getData().all
                        });
                        var pre = Ext.create('WebInspect.view.salary.SalaryList', Ext.applyIf({
                            store: prestore,
                            currentDate: Ext.Date.add(newCard.config.currentDate, Ext.Date.MONTH, -1)
                        }));
                        me.insert(0, pre);
                    }
                });
            }
            Ext.ComponentQuery.query(me.config.salaryHeader)[0].setData({header: Ext.Date.format(newCard.config.currentDate, 'Y-m').toString()});
        }
    }
})