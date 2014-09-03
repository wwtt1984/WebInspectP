/**
 * Created by USER on 14-9-2.
 */

/**
 * Created by USER on 14-8-12.
 */

Ext.define('WebInspect.store.MarkUploadStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.MarkUploadModel',
        clearOnPageLoad: false,
        autoLoad: true,

        proxy: {

            type: 'localstorage',
            id  : 'markupload'
        }
    }
});