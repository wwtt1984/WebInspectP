/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.mycompany.webInspect;
import android.os.Bundle;
import org.apache.cordova.*;
import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;
import android.content.Context;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;

import com.sangfor.ssl.IVpnDelegate;
import com.sangfor.ssl.SFException;
import com.sangfor.ssl.SangforAuth;
import com.sangfor.ssl.common.VpnCommon;
import com.sangfor.ssl.easyapp.SangforNbAuth;

import cn.jpush.android.api.JPushInterface;
import com.vpn.vpn.VpnPlugin;

public class webInspect extends CordovaActivity  implements IVpnDelegate
{
    public static IVpnDelegate ivg;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        ivg = this;
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    public void vpnCallback(int vpnResult, int authType) {

        VpnPlugin vpnpl = new VpnPlugin();
        SangforNbAuth sfAuth = SangforNbAuth.getInstance();
        switch (vpnResult) {
        case IVpnDelegate.RESULT_VPN_INIT_FAIL:
            break;
        case IVpnDelegate.RESULT_VPN_INIT_SUCCESS:
            break;
        case IVpnDelegate.RESULT_VPN_AUTH_FAIL:
            break;
        case IVpnDelegate.RESULT_VPN_AUTH_SUCCESS:
            if (authType == IVpnDelegate.AUTH_TYPE_NONE) {
                vpnpl.VpnLogin("true");
            }
            else
            {
                vpnpl.doVpnLogin(authType);
            }
            break;
        case IVpnDelegate.RESULT_VPN_AUTH_LOGOUT:
            break;
        default:
            break;
        }
    }

    @Override
    public void vpnRndCodeCallback(byte[] data) {}

    @Override
	public void reloginCallback(int status, int result) {}

}

