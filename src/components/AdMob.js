import React from 'react';
import { View } from 'react-native';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

export default function AdMob() {
    return(
        <View>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          setTestDeviceIDAsync
          servePersonalizedAds
          onDidFailToReceiveAdWithError={err => console.log(err)} />

      </View>
    )
}
