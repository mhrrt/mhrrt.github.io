---
title: "React Native Admob Integration — iOS And Android"
datePublished: Tue Apr 08 2025 11:49:15 GMT+0000 (Coordinated Universal Time)
cuid: cm9jnv3xd000709ju7awngmuq
slug: react-native-admob-integration-ios-and-android-8dd6a63adba7
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744791589795/e791b9ce-2c17-4745-9b86-050c5a65eb29.jpeg

---

### Why Use AdMob in React Native?

Google AdMob allows you to monetize your mobile apps by displaying ads. In this guide, we will integrate AdMob into a React Native project for iOS and Android both. Integrating AdMob into a React Native app can be challenging, especially with Android build issues. In this tutorial, I share a step-by-step guide to successfully setting up AdMob Banner for both iOS and Android, along with my workaround to a common Android build problem.

### Prerequisites

*   Node.js installed
*   React Native CLI installed
*   Firebase account (for AdMob setup)

I am considering you already have Node.js, React Native CLI installed in your system, so lets start with creating Admob AdUnitID

✅ 1: Go to the AdMob Console Visit: [https://apps.admob.com/](https://apps.admob.com/) Sign in with your Google account.

✅ 2: Add Your App Click “Apps” in the left sidebar. Click the “Add App” button.

✅ 3: Choose App Platform Select iOS or Android, depending on your app. Choose “Yes” if your app is published on the Play Store/App Store, or “No” if it isn’t. Click Continue.

✅ 4: Enter App Details Enter your App name. Click Add App.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791579290/1fbd5a8b-45fd-4a53-92d9-4ca7315a7844.jpeg)

✅ 5: Click Done Once the app is created, AdMob will give you Success meaage.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791581202/9658ab80-a6bf-4c42-8b63-31e5ca9b9102.jpeg)

✅ 6: Create Ad Unit Click “Add Ad Unit”. Choose the ad format: Banner, Interstitial, Rewarded, etc.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791582518/251fa71b-0830-4ff6-a441-59362abf0559.jpeg)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791584120/a2078376-6436-4191-bd31-f8f895549271.jpeg)

✅ 7: Configure the Ad Unit Name your Ad Unit. Click Create Ad Unit.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791585972/6ed56ad0-def4-4532-9ef3-b91178304d50.jpeg)

✅ 8: Copy Ad Unit ID You’ll now see your Ad Unit ID. Copy this — you’ll use it in your app where ads are displayed.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791587342/a22bd173-0ad1-40de-8cdf-f3d7ae5b3b84.jpeg)

Now back to React Native Part

### Step 1: Install Dependencies

Run the following command:

npm install react-native-google-mobile-ads@13.3.1

Note: I struggle a lot with other version of SDK for Android so keep version for SDK as @13.3.1 for now. You can cross check installed version of sdk like;

npm list react-native\-google-mobile-ads

Next, link the package:

cd iOS && npx pod-install && cd..

After installing the package properly by saying pod install, you should do the following step for both android and ios.

Add the app ids you created in app.json. It is important to add them completely.

If you have done these operations properly, we can now proceed to use it.

### Step 3: Configure Banner Ad From AdMob in App.js or in file of your choice.

import React, { useEffect } from "react"; import { View, Text } from "react-native"; import { MobileAds } from "react-native-google-mobile-ads"; const App = () => { useEffect(() => { MobileAds().initialize(); }, \[\]); // Replace UnitId with whats shown on AdMob dashboard for ur Ad // This will allow us to load TestAd while in Debug mode and will switch to Production // mode when we create Release build const adUnitId = \_\_DEV\_\_ ? TestIds.BANNER : 'ca-app-pub-585495759xxxxxx/5424xxxxxx'; return (  <GAMBannerAd unitId={adUnitId} sizes={\[BannerAdSize.FULL\_BANNER\]} onAdFailedToLoad={(error) => { // if anything goes wrong with Ad load this will show you exact reason console.log('Ad Failed to Load',error.message,error.name); }} requestOptions = {{ requestNonPersonalizedAdsOnly: true }}/>  ); }; export default App;

💡 Tip: Use test ads during development to avoid policy violations.

### Step4 Configure Banner Run app for Android and iOS

For Android:

npx react-native run-android

For iOS:

npx react-native run-ios

Finally you will either get Ad on your simulator or it will show reason in console why its not showing up, but for that you have to enable log by using below commands.

Enable logs for Android/iOS :

npx react-native log-android

npx react-native log-ios

If all steps are followed above you will be able to see TestAd on simulator/device as below.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744791588554/a9358300-b22f-43c2-86b6-91bd231f838d.jpeg)

Other versions of Admob SDK were giving compilation error on Android so i explicitly stick to 13.3.1.

*Originally published at* [*https://mhrrt.github.io*](https://mhrrt.github.io/)*.*