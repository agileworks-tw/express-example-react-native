package com.sampletodo;

import android.app.Application;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;


import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new ReactNativeConfigPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }

}
