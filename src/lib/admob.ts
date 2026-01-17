import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// IDs de teste OFICIAIS do Google para desenvolvimento
// Estes funcionam em qualquer app durante o desenvolvimento
const GOOGLE_TEST_BANNER_ID = 'ca-app-pub-6111888174936788/1063536663';
const GOOGLE_TEST_INTERSTITIAL_ID = 'ca-app-pub-6111888174936788/9038584824';

let isInitialized = false;

export async function initializeAdMob() {
  // Só inicializa em plataforma nativa (não no browser)
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Skipping initialization on web platform');
    return;
  }
  
  if (isInitialized) return;
  
  try {
    await AdMob.initialize({
      initializeForTesting: true, // Mude para false em produção
    });
    isInitialized = true;
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('Failed to initialize AdMob:', error);
  }
}

export async function showBannerAd(adId: string = GOOGLE_TEST_BANNER_ID) {
  // Só exibe em plataforma nativa
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Banner ads only work on native platforms');
    return;
  }
  
  try {
    await initializeAdMob();
    
    await AdMob.showBanner({
      adId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true, // Mude para false em produção
    });
    console.log('Banner ad displayed');
  } catch (error) {
    console.error('Failed to show banner ad:', error);
  }
}

export async function hideBannerAd() {
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.error('Failed to hide banner ad:', error);
  }
}

export async function showInterstitialAd(adId: string = GOOGLE_TEST_INTERSTITIAL_ID) {
  // Só exibe em plataforma nativa
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Interstitial ads only work on native platforms');
    return;
  }
  
  try {
    await initializeAdMob();
    
    await AdMob.prepareInterstitial({
      adId,
      isTesting: true, // Mude para false em produção
    });
    
    await AdMob.showInterstitial();
    console.log('Interstitial ad displayed');
  } catch (error) {
    console.error('Failed to show interstitial ad:', error);
  }
}
