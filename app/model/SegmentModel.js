/**
 * Created by USER on 14-4-10.
 */

Ext.define('WebInspect.model.SegmentModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'tdid',
            'anduan',
            'adid',
            'htmc_duan',

            'htmc_duan_cd',
            'htmc_name',
            'htxz'
        ]
    }

});