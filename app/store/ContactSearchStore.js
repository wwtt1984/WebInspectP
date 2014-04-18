/**
 * Created by USER on 14-4-3.
 */
Ext.define('WebInspect.store.ContactSearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WebInspect.model.ContactModel',

//        data: [
//            {"samaccountname":"gcw","userprincipalname":"gcw@qgj.cn","displayname":"郭陈为(gcw)","mobile":"13758140802","telephonenumber":"86526016","pager":"640802","mail":"null","description":"女","memberof":"CN=ldrsc,OU=劳动人事处,OU=钱塘江管理局,DC=qgj,DC=cn"},
//            {"samaccountname":"wyj","userprincipalname":"wyj@qgj.cn","displayname":"汪雅娟(wyj)","mobile":"13516812921","telephonenumber":"86526011","pager":"612921","mail":"null","description":"女","memberof":"CN=ldrsc,OU=劳动人事处,OU=钱塘江管理局,DC=qgj,DC=cn"},
//            {"samaccountname":"xyz","userprincipalname":"xyz@qgj.cn","displayname":"项亚珍(xyz)","mobile":"13867478996","telephonenumber":"057186526058","pager":"678996","mail":"sqgjxyz@tom.com","description":"女","memberof":"CN=ldrsc,OU=劳动人事处,OU=钱塘江管理局,DC=qgj,DC=cn"},
//            {"samaccountname":"zhangzs","userprincipalname":"zhangzs@qgj.cn","displayname":"张正松(zzs)","mobile":"18758221699","telephonenumber":"057186526011","pager":"661699","mail":"862754945@qq.com","description":"男","memberof":"null"},
//            {"samaccountname":"zyy","userprincipalname":"zyy@qgj.cn","displayname":"周业烨(zyy)","mobile":"13819152559","telephonenumber":"057186526011","pager":"null","mail":"null","description":"女","memberof":"null"}
//        ]

        proxy: {
            type: 'sk'
        }
    }
});