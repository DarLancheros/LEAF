package com.colcall.minominacc

import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {

    private lateinit var myWebView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        // Vinculamos con el XML
        myWebView = findViewById(R.id.webViewLeaf)

        // Configuración para que funcione LEAF
        myWebView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
        }

        myWebView.webChromeClient = WebChromeClient()
        myWebView.webViewClient = WebViewClient()

        // Cargar el archivo inicial
        myWebView.loadUrl("file:///android_asset/index.html")

        // Ajuste de márgenes
        ViewCompat.setOnApplyWindowInsetsListener(myWebView) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    } // <-- Cierra el onCreate

    override fun onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack()
        } else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    } // <-- Cierra el onBackPressed
} // <-- ESTA ES LA LLAVE QUE TE FALTABA (Cierra la Clase)