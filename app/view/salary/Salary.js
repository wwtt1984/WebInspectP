/**
 * Created by USER on 14-5-21.
 */

Ext.define('WebInspect.view.salary.Salary', {
    extend: 'Ext.Panel',
    xtype: 'salary',

    requires: [
        'WebInspect.view.salary.SalaryList'
    ],

    config: {
        title: '工资信息',
        itemId: 'salary',
//        fullscreen: true,
        layout: 'fit',
        items: [
            {
                docked: 'top',
                xtype: 'panel',
                itemId: 'salary_header',
                cls: 'tide-header',
                style: 'height:2.8em;',
                tpl: Ext.create('Ext.XTemplate',
                    '<div style="width:100%;height:2.2em;">',
                    '<div style="width:10%;height:100%;float:left;" id="{[this.getLinkId(values,0)]}"><img src="resources/images/larr.png"/></div>',
                    '<div style="width:80%;height:100%;float:left;">{header}</div>',
                    '<div style="width:10%;height:100%;float:right;" id="{[this.getLinkId(values,1)]}"><img src="resources/images/rarr.png"/></div>',
                    '</div>',
                    '<div style="width:100%;font-size:16px;line-height: 1em;margin-top: -12px;position: absolute;">',
                    '<div style="width:30%;height:100%;float:left;">类型</div>',
                    '<div style="width:70%;height:100%;float:right;">金额</div>',
                    '</div>',
                    {

                        getLinkId: function(values,index){
                            var result = Ext.id();
                            Ext.Function.defer(this.addListener, 1, this, [result,values,index]);
                            return result;
                        },
                        addListener: function(id,values,index) {
                            var me = this;

                            Ext.get(id).addListener('tap', function(e){

                                e.stopEvent();

                                Ext.ComponentQuery.query('#salary')[0].onActiveItemChange(index);
                            })//////增加点击的事件
                        }
                    }
                )
            }
        ]
    },

    onDataSet: function(){
        Ext.ComponentQuery.query('#salary_header')[0].setData({header:2014});
        var sche = Ext.create('WebInspect.view.salary.SalaryCarousel',{
            xtype: 'salarycarousel',
            salaryHeader: '#salary_header',
//            itemId: 'schedulecarousel',
            currentDate: 2014,
            direction: 'horizontal',
            preStore: 'SalaryPreStore',
            currentStore: 'SalaryStore',
            nextStore: 'SalaryNextStore'
        });
        this.add(sche);
    },

    onActiveItemChange: function(index){

        var me = this;
        var car = me.down('carousel');
        var carindex = car.getActiveIndex();
        var count = car.getItems().getCount();

        if(index == 0){
            if(carindex == 0){
                plugins.Toast.ShowToast("没有更早的了！",3000);
//                Ext.Msg.alert('没有更早的了');

            }
            else{
                car.setActiveItem(carindex - 1);
            }
        }
        else{
            if(carindex == count - 1){
                plugins.Toast.ShowToast("没有更晚的了！",3000);
//                Ext.Msg.alert('没有更晚的了');
            }
            else{
                car.setActiveItem(carindex + 1);
            }
        }
    }
})