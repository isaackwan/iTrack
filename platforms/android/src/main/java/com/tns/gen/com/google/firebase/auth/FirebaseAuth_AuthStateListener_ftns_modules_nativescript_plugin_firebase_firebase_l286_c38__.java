package com.tns.gen.com.google.firebase.auth;

public class FirebaseAuth_AuthStateListener_ftns_modules_nativescript_plugin_firebase_firebase_l286_c38__ implements com.google.firebase.auth.FirebaseAuth.AuthStateListener {
	public FirebaseAuth_AuthStateListener_ftns_modules_nativescript_plugin_firebase_firebase_l286_c38__() {
		com.tns.Runtime.initInstance(this);
	}

	public void onAuthStateChanged(com.google.firebase.auth.FirebaseAuth param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onAuthStateChanged", void.class, args);
	}

}
