package com.install.install;
import java.io.File;
import java.util.List;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;
import android.net.Uri;


public class InstallPlugin extends CordovaPlugin {

      public boolean execute(String action, JSONArray data,
                  CallbackContext callbackContext) throws JSONException {
              if (action.equals("Install")) {
                 openFile(new File(data.getString(0).replaceAll("file://", "")));
              }
              return false;
      }

      private void openApp(String packageName) throws NameNotFoundException {
          PackageManager pm=this.cordova.getActivity().getPackageManager();
          PackageInfo pi = pm.getPackageInfo(packageName, 0);

          Intent resolveIntent = new Intent(Intent.ACTION_MAIN, null);
          resolveIntent.addCategory(Intent.CATEGORY_LAUNCHER);
          resolveIntent.setPackage(pi.packageName);

          List<ResolveInfo> apps = pm.queryIntentActivities(resolveIntent, 0);

          ResolveInfo ri = apps.iterator().next();
          if (ri != null ) {
          String packageName1 = ri.activityInfo.packageName;
          String className = ri.activityInfo.name;

          Intent intent = new Intent(Intent.ACTION_MAIN);
          intent.addCategory(Intent.CATEGORY_LAUNCHER);

          ComponentName cn = new ComponentName(packageName1, className);

          intent.setComponent(cn);
          this.cordova.getActivity().startActivity(intent);
              }
          }

      private boolean checkApp(String packageName) {
          if (packageName == null || "".equals(packageName))
              return false;
          try {
              ApplicationInfo info = this.cordova.getActivity().getPackageManager().getApplicationInfo(
                      packageName, PackageManager.GET_UNINSTALLED_PACKAGES);
              return true;
          } catch (NameNotFoundException e) {
              return false;
          }
      }

      private void openFile(File f) {
          Intent intent = new Intent(Intent.ACTION_VIEW);
          intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

          /* 调用getMIMEType()来取得MimeType */
          String type = getMIMEType(f);
          /* 设置intent的file与MimeType */
          intent.setDataAndType(Uri.fromFile(f), type);
          this.cordova.getActivity().startActivity(intent);
      }

      /* 判断文件MimeType的method */
      private String getMIMEType(File f) {
          String type = "";
          String fName = f.getName();
          /* 取得扩展名 */
          String end = fName
                  .substring(fName.lastIndexOf(".") + 1, fName.length())
                  .toLowerCase();

          /* 依扩展名的类型决定MimeType */
          if (end.equals("m4a") || end.equals("mp3") || end.equals("mid")
                  || end.equals("xmf") || end.equals("ogg") || end.equals("wav")) {
              type = "audio";
          } else if (end.equals("3gp") || end.equals("mp4")) {
              type = "video";
          } else if (end.equals("jpg") || end.equals("gif") || end.equals("png")
                  || end.equals("jpeg") || end.equals("bmp")) {
              type = "image";
          } else if (end.equals("apk")) {
              /* android.permission.INSTALL_PACKAGES */
              type = "application/vnd.android.package-archive";
          } else {
              type = "*";
          }
          /* 如果无法直接打开，就跳出软件列表给用户选择 */
          if (end.equals("apk")) {
          } else {
              type += "/*";
          }
          return type;
      }
}
