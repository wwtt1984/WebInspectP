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

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.widget.Toast;
import org.apache.cordova.CordovaWebView;
import android.content.Context;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.util.EncodingUtils;

public class webInspect extends CordovaActivity implements IVpnDelegate
{
    private static Context cnn;
    private static IVpnDelegate ivg;
    public static String User = "";
    public static String Pwd = "";
    public static String VpnOk = "false";
    public static String VpnSuccess = "false";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
		cnn = this;
		ivg = this;
        vpnInit();

        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }

    private String readFileSdcard(String fileName){
        String res = "";
        try{
            FileInputStream fin = new FileInputStream(fileName);
            int length = fin.available();
            byte [] buffer = new byte[length];
            fin.read(buffer);
            res = EncodingUtils.getString(buffer, "UTF-8");
            fin.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return res;
    }

    private void vpnInit()
    {
        try
        {
            String txt = readFileSdcard("/mnt/sdcard/login.json");
            if(txt != "")
            {
                JSONArray array = new JSONArray("["+txt+"]");
                if(array.length() > 0)
                {
                    User = array.getJSONObject(0).getString("sid");
                    Pwd = array.getJSONObject(0).getString("pwd");
                }
                try {
                    SangforNbAuth.getInstance().init(cnn, ivg);
                }
                catch (SFException e) {
                    e.printStackTrace();
                }
                // 开始初始化VPN
                if (initSslVpn() == false) {
                     Toast.makeText(cnn, "VPN初始化失败",3000).show();
                }
                doVpnLogin(IVpnDelegate.AUTH_TYPE_PASSWORD);
            }
            else
            {
                VpnOk = "true";
            }
        }
        catch(Exception e)
        {
            Toast.makeText(cnn, " "+ e,3000).show();
        }

    }

	@Override
	public void onDestroy() {
		SangforNbAuth.getInstance().vpnQuit();
		super.onDestroy();
	}

	/**
	 * 开始初始化VPN，该初始化为异步接口，后续动作通过回调函数通知结果
	 *
	 * @return 成功返回true，失败返回false，一般情况下返回true
	 */
	public static boolean initSslVpn() {
		SangforNbAuth sfAuth = SangforNbAuth.getInstance();
		InetAddress iAddr = null;
		try {
			iAddr = InetAddress.getByName("115.236.68.195");
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		if (iAddr == null || iAddr.getHostAddress() == null) {
			Log.d(TAG, "vpn host error");
			return false;
		}
		long host = VpnCommon.ipToLong(iAddr.getHostAddress());
		int port = 443;
		if (sfAuth.vpnInit(host, port) == false) {
			Log.d(TAG, "vpn init fail, errno is " + sfAuth.vpnGeterr());
			return false;
		}
		Log.d(TAG, "current vpn status is " + sfAuth.vpnQueryStatus());
		return true;
	}

	/**
	 * 处理认证，通过传入认证类型（需要的话可以改变该接口传入一个hashmap的参数用户传入认证参数）.
	 * 也可以一次性把认证参数设入，这样就如果认证参数全满足的话就可以一次性认证通过，可见下面屏蔽代码
	 *
	 * @param authType
	 *            认证类型
	 */
	public static void doVpnLogin(int authType) {

		boolean ret = false;
		SangforNbAuth sForward = SangforNbAuth.getInstance();

		switch (authType) {
		case IVpnDelegate.AUTH_TYPE_CERTIFICATE:
			sForward.setLoginParam(IVpnDelegate.CERT_PASSWORD, "123456");
			sForward.setLoginParam(IVpnDelegate.CERT_P12_FILE_NAME, "/sdcard/csh/csh.p12");
			ret = sForward.vpnLogin(IVpnDelegate.AUTH_TYPE_CERTIFICATE);
			break;
		case IVpnDelegate.AUTH_TYPE_PASSWORD:
			sForward.setLoginParam(IVpnDelegate.PASSWORD_AUTH_USERNAME, User);
			sForward.setLoginParam(IVpnDelegate.PASSWORD_AUTH_PASSWORD, Pwd);
			ret = sForward.vpnLogin(IVpnDelegate.AUTH_TYPE_PASSWORD);
			break;
		default:
			Log.w(TAG, "default authType " + authType);
			break;
		}

		if (ret == true) {
		  Log.i(TAG, "success to call login method");
		} else {
			Log.i(TAG, "fail to call login method");
		}
	}

	public void vpnCallback(int vpnResult, int authType) {

		SangforNbAuth sfAuth = SangforNbAuth.getInstance();
		switch (vpnResult) {
		case IVpnDelegate.RESULT_VPN_INIT_FAIL:
			/**
			 * 初始化vpn失败
			 */
			Log.i(TAG, "RESULT_VPN_INIT_FAIL, error is " + sfAuth.vpnGeterr());
			break;

		case IVpnDelegate.RESULT_VPN_INIT_SUCCESS:
			/**
			 * 初始化vpn成功，接下来就需要开始认证工作了
			 */
			Log.i(TAG, "RESULT_VPN_INIT_SUCCESS, current vpn status is " + sfAuth.vpnQueryStatus());
			break;

		case IVpnDelegate.RESULT_VPN_AUTH_FAIL:
			/**
			 * 认证失败，有可能是传入参数有误，具体信息可通过sfAuth.vpnGeterr()获取
			 */
			Log.i(TAG, "RESULT_VPN_AUTH_FAIL, error is " + sfAuth.vpnGeterr());
			break;

		case IVpnDelegate.RESULT_VPN_AUTH_SUCCESS:
			/**
			 * 认证成功，认证成功有两种情况，一种是认证通过，可以使用sslvpn功能了，另一种是前一个认证（如：用户名密码认证）通过，
			 * 但需要继续认证（如：需要继续证书认证）
			 */
			if (authType == IVpnDelegate.AUTH_TYPE_NONE) {
			    VpnOk = "true";
			    VpnSuccess = "true";
				Log.i(TAG, "welcom to sangfor sslvpn!");
			} else {
				Log.i(TAG, "auth success, and need next auth, next auth type is " + authType);
				doVpnLogin(authType);
			}
			break;
		case IVpnDelegate.RESULT_VPN_AUTH_LOGOUT:
			/**
			 * 主动注销（自己主动调用logout接口）或者被动注销（通过控制台把用户踢掉）均会调用该接口
			 */
			Log.i(TAG, "RESULT_VPN_AUTH_LOGOUT");
			break;
		default:
			/**
			 * 其它情况，不会发生，如果到该分支说明代码逻辑有误
			 */
			Log.i(TAG, "default result, vpn result is " + vpnResult);
			break;
		}
	}

}

