Ext.define('WebInspect.model.ContactModel',{
	extend: 'Ext.data.Model',
    config: {
       fields: [
            'id',
            'samaccountname', 
            'userprincipalname',
            'displayname',
            'mobile',
            'telephonenumber',
            
            'pager',
            'mail',
            'description',
            'memberof'
        ]
    }
        
});