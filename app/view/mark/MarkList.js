/**
 * Created by USER on 14-3-27.
 */
Ext.define('WebInspect.view.mark.MarkList', {
    extend: 'Ext.List',
    xtype: 'marklist',

    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh'
    ],

    config: {

        cls: 'news-list',

        store: 'MarkStore',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                loadMoreText: '加载更多...',
                noMoreRecordsText: '没有更多记录了...',
                autoPaging:true
            },
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }],

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="list-item">',
            '    {[this.getImg(values)]}',
            '    <h1>{[this.getTitle(values)]}</h1>',
            '    <div class="time">{spubdate}<div style="float: right;">{sauthor}</div></div>',
            '</div>',
            {
                getTitle: function(values){
                    var str = values.stitle;

                    if(!values.stitle){
                        str = '无标题';
                    }
                    return str;
                },

                getImg: function(values){
                    var string = '';

                    if(values.simgtype == 'jpg'){
                        string += '<img class="photo" src="' + values.simg + '" />';
                    }
                    else{
                        string += '<img class="photo" src="resources/images/nopic.jpg" />';
                    }
                    return string;
                }
            }
        )
    }
});