/**
 * Created by USER on 14-4-11.
 */

Ext.define('WebInspect.store.SegmentDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.SegmentModel',

        proxy: {
            type: 'sk'
        }
    }
})