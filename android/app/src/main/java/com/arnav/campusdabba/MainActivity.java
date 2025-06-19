package com.arnav.campusdabba;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Configure status bar
        Window window = getWindow();
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setStatusBarColor(ContextCompat.getColor(this, R.color.colorPrimary));
        
        // Ensure the app doesn't go fullscreen
        window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        // Configure WebView for mobile responsiveness
        configureWebView();
    }
    
    private void configureWebView() {
        Bridge bridge = getBridge();
        if (bridge != null && bridge.getWebView() != null) {
            WebSettings webSettings = bridge.getWebView().getSettings();
            
            // Enable responsive design
            webSettings.setUseWideViewPort(true);
            webSettings.setLoadWithOverviewMode(true);
            webSettings.setSupportZoom(false);
            webSettings.setBuiltInZoomControls(false);
            webSettings.setDisplayZoomControls(false);
            
            // Mobile-friendly settings
            webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.TEXT_AUTOSIZING);
            webSettings.setTextZoom(100);
            
            // Inject mobile CSS
            bridge.getWebView().setWebViewClient(new android.webkit.WebViewClient() {
                @Override
                public void onPageFinished(android.webkit.WebView view, String url) {
                    super.onPageFinished(view, url);
                    
                    // Inject mobile-specific CSS
                    String css = "javascript:(function() {" +
                        "var link = document.createElement('link');" +
                        "link.rel = 'stylesheet';" +
                        "link.type = 'text/css';" +
                        "link.href = 'file:///android_asset/public/mobile-fixes.css';" +
                        "document.head.appendChild(link);" +
                        
                        // Also inject inline styles for immediate effect
                        "var style = document.createElement('style');" +
                        "style.innerHTML = 'html,body{overflow-x:hidden!important;max-width:100vw!important;}';" +
                        "document.head.appendChild(style);" +
                        "})()";
                    
                    view.evaluateJavascript(css, null);
                }
            });
        }
    }
}
