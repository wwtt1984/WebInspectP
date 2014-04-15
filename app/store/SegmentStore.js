/**
 * Created by USER on 14-4-10.
 */

Ext.define('WebInspect.store.SegmentStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.SegmentModel',
        data:[
            {htmc_name: '南岸', tdid: 'S'},
            {htmc_name: '北岸', tdid: 'N'}
        ]
    }
})