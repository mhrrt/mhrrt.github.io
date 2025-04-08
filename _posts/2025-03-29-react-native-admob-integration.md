---
layout: post
title: React Native Admob Integration
date: 2025-03-29
categories: [React-Native, Ads, react-native admob]
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

I am considering you already have Node.js, React NAtive CLI installed in your system, so lets start with creating Admob AdUnitID

✅ 1: Go to the AdMob Console
Visit: https://apps.admob.com/
Sign in with your Google account.

✅ 2: Add Your App
Click "Apps" in the left sidebar.
Click the "Add App" button.

✅ 3: Choose App Platform
Select iOS or Android, depending on your app.
Choose "Yes" if your app is published on the Play Store/App Store, or "No" if it isn't.
Click Continue.

![Select Platform and published status of apps]({{ site.baseurl }}/assets/images/AdMobStep2.jpg)

✅ 4: Enter App Details
Enter your App name.
Click Add App.
![Add App Name]({{ site.baseurl }}/assets/images/AdMobStep3.jpg)

✅ 5: Click Done
Once the app is created, AdMob will give you Success meaage.
![Successfully added message]({{ site.baseurl }}/assets/images/AdMobStep4.jpg)

✅ 6: Create Ad Unit
Click "Add Ad Unit".
Choose the ad format: Banner, Interstitial, Rewarded, etc.
![Add Ad Unit]({{ site.baseurl }}/assets/images/AdMobStep5.jpg)
![Select format, for now Banner]({{ site.baseurl }}/assets/images/AdMobStep6.jpg)

✅ 7: Configure the Ad Unit
Name your Ad Unit.
Click Create Ad Unit.
![Name your Banner Ad Unit]({{ site.baseurl }}/assets/images/AdMobStep7.jpg)

✅ 8: Copy Ad Unit ID
You’ll now see your Ad Unit ID.
Copy this — you’ll use it in your app where ads are displayed.
![Copy Ad Unit thats been shown]({{ site.baseurl }}/assets/images/AdMobStep8.jpg)

Now back to React Native Part

## Step 1: Install Dependencies
Run the following command:

<div class="code-container">
<pre><code> npm install react-native-google-mobile-ads@13.3.1 </code></pre>
<button class="edit-btn">Edit</button>
  <button class="copy-btn">Copy</button>
</div>

Note: I struggle a lot with other version of SDK for Android so keep version for SDK as @13.3.1 for now. You can cross check installed version of sdk like;

<pre><code> npm list react-native-google-mobile-ads </code></pre>

Next, link the package:

<div class="code-container">
<pre><code>cd iOS && npx pod-install && cd..</code></pre>
  <button class="edit-btn">Edit</button>
  <button class="copy-btn">Copy</button>
</div>

## Step 2: Update App.json like;

After installing the package properly by saying pod install, you should do the following step for both android and ios.

Add the app ids you created in app.json. It is important to add them completely.
{% highlight jsx %}
 
{
  ...
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
  }
}
{% endhighlight %}

If you have done these operations properly, we can now proceed to use it. 

## Step 3: Configure Banner Ad From AdMob in App.js or in file of your choice.

js

<div class="code-container">

<pre><code>
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { MobileAds } from "react-native-google-mobile-ads";

const App = () => {
  useEffect(() => {
    MobileAds().initialize();
  }, []);
  // Replace UnitId with whats shown on AdMob dashboard for ur Ad
  // This will allow us to load TestAd while in Debug mode and will switch to Production 
  // mode when we create Release build
 const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-585495759xxxxxx/5424xxxxxx';
  return (
    <View>
      <GAMBannerAd
        unitId={adUnitId}
        sizes={[BannerAdSize.FULL_BANNER]}
        onAdFailedToLoad={(error) => {
          // if anything goes wrong with Ad load this will show you exact reason
          console.log('Ad Failed to Load',error.message,error.name);

        }}
        requestOptions = {{
              requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default App;
</code></pre>

<button class="edit-btn">Edit</button>
<button class="copy-btn">Copy</button>
</div>


💡 Tip: Use test ads during development to avoid policy violations.

## Step4 Configure Banner Run app for Android and iOS
For Android:
<pre><code> npx react-native run-android </code></pre>
For iOS:
<pre><code> npx react-native run-ios </code></pre>

Finally you will either get Ad on your simulator or it will show reason in console why its not showing up, but for that you have to enable log by using below commands.

# For Android:
<pre><code> npx react-native log-android </code></pre>

# For iOS:
<pre><code> npx react-native log-ios </code></pre>

# Conclusion:
If all steps are followed above you will be able to see TestAd on simulator/device as below.

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/RamShalakaAdMob.jpg" alt="Andorid Admob Test-Ad" />
</p>


# Note: 
Other versions of Admob SDK were giving compilation error on Android so i explicitly stick to 13.3.1. 



