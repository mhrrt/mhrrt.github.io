---
layout: post
title: "React Native AdMob Integration For iOS and Android"
date: 2025-03-29
categories: [React-Native, Ads]
tags: [react-native, admob, monetization]
author: "Manish Trivedi"
description: "Step-by-step guide to integrating AdMob in React Native for app monetization."
image: "/assets/images/react-native-admob.jpg"  # Optional thumbnail
---

## Why Use AdMob in React Native?
Google AdMob allows you to monetize your mobile apps by displaying ads. In this guide, we will integrate AdMob into a React Native project for iOS and Android both. Integrating AdMob into a React Native app can be challenging, especially with Android build issues. In this tutorial, I share a step-by-step guide to successfully setting up AdMob for both iOS and Android, along with my workaround to a common Android build problem.

### Prerequisites
- Node.js installed
- React Native CLI installed
- Firebase account (for AdMob setup)

## Step 1: Install Dependencies
Run the following command:
```bash
npm install react-native-google-mobile-ads@13.3.1

Next, link the package:
cd iOS && npx pod-install && cd..

## Step 2: Update App.json like;

After installing the package properly by saying pod install, you should do the following step for both android and ios.

📌 Add the app ids you created in app.json. It is important to add them completely.

{
  ...
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
  }
}
If you have done these operations properly, we can now proceed to use it. 

Step 3: Configure Banner Ad From AdMob in App.js or in file of your choice.

```liquid

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { MobileAds } from "react-native-google-mobile-ads";

const App = () => {
  useEffect(() => {
    MobileAds().initialize();
  }, []);

  return (
    <View>
      <GAMBannerAd
        unitId={TestIds.BANNER}
        sizes={[BannerAdSize.FULL_BANNER]}
        onAdFailedToLoad={(error) => {
          // if anything goes wrong with Ad load this will show you exact reason
          console.log('Ad Failed to Load',error.message,error.name);

        }}
        requestOptions={{
        requestNonPersonalizedAdsOnly: true
        }}
      />
    </View>
  );
};

export default App;

```
💡 Tip: Use test ads during development to avoid policy violations.

Step 4: Run app for Android and iOS
For Android:
npx react-native run-android 
For iOS:
npx react-native run-ios

Finally you will either get Ad on your simulator or it will show reason in console why its not showingup.
In case you are not getting console logs use;
# For Android:
npx react-native log-android
# Or, for iOS:
npx react-native log-ios

