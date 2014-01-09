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

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import com.sangfor.vpn.IVpnDelegate;
import com.sangfor.vpn.SFException;
import com.sangfor.vpn.auth.SangforNbAuth;
import com.sangfor.vpn.common.VpnCommon;
import android.app.Activity;
import android.util.Log;
import android.view.View;

public class webInspect extends CordovaActivity implements IVpnDelegate
{
    public static IVpnDelegate ivg;
    public static String vpnresult;//vpn结果

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
	public void onDestroy() {
		SangforNbAuth.getInstance().vpnQuit();
		super.onDestroy();
	}

	public void vpnCallback(int vpnResult, int authType) {

		SangforNbAuth sfAuth = SangforNbAuth.getInstance();
		switch (vpnResult) {
		case IVpnDelegate.RESULT_VPN_INIT_FAIL:
            vpnresult="initfalse";
			break;
		case IVpnDelegate.RESULT_VPN_INIT_SUCCESS:
			break;
		case IVpnDelegate.RESULT_VPN_AUTH_FAIL:
            vpnresult="paramerror";
			break;
		case IVpnDelegate.RESULT_VPN_AUTH_SUCCESS:
			if (authType == IVpnDelegate.AUTH_TYPE_NONE) {
			    vpnresult="true"; /////////成功了
			}
			break;
		case IVpnDelegate.RESULT_VPN_AUTH_LOGOUT:
			vpnresult="logout";
			break;
		default:
			vpnresult="error";
			break;
		}
	}

}

