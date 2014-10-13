/**
 * Created by USER on 14-9-17.
 */

Ext.define('WebInspect.store.TaskDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.TaskDetailModel',
        data:[
            {
                'TaskID': '001',
                'StepID': '013',
                'imgjson': '123.jpg',

                'taskdetails': [
                    {
                        text: '复核',  value: '复核'
                    },
                    {
                        text: '上报领导',  value: '上报领导'
                    },
                    {
                        text: '即时',  value: '即时'
                    },
                    {
                        text: '海塘工况',  value: '海塘工况'
                    },
                    {
                        text: '养护',  value: '养护'
                    },
                    {
                        text: '项目监管',  value: '项目监管'
                    },
                    {
                        text: '关闭流程',  value: '关闭流程'
                    }
                ],

                'disposes': [

                ],

                'replys': [
                    {
                        text: '复核',  value: '复核'
                    },
                    {
                        text: '上报领导',  value: '上报领导'
                    },
                    {
                        text: '即时',  value: '即时'
                    },
                    {
                        text: '海塘工况',  value: '海塘工况'
                    },
                    {
                        text: '养护',  value: '养护'
                    },
                    {
                        text: '项目监管',  value: '项目监管'
                    },
                    {
                        text: '关闭流程',  value: '关闭流程'
                    }
                ],

                'forwards': [
                    {
                        text: '陶金平',  value: 'tjp'
                    },
                    {
                        text: '徐建龙',  value: 'xujl'
                    }
                ]
            }
        ],

        autoLoad: true
    }
});