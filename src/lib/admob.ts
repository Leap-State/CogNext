import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// IDs de produção do AdMob
const ADMOB_BANNER_ID = 'ca-app-pub-6111888174936788/1063536663';
const ADMOB_INTERSTITIAL_ID = 'ca-app-pub-6111888174936788/9038584824';

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

export async function initializeAdMob(): Promise<boolean> {
  // Só inicializa em plataforma nativa (não no browser)
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Skipping initialization on web platform');
    return false;
  }
  
  if (isInitialized) return true;
  
  // Evita múltiplas inicializações simultâneas
  if (initializationPromise) {
    await initializationPromise;
    return isInitialized;
  }
  
  initializationPromise = (async () => {
    try {
      await AdMob.initialize({
        initializeForTesting: false,
      });
      isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
      isInitialized = false;
    }
  })();
  
  await initializationPromise;
  return isInitialized;
}

export async function showBannerAd(adId: string = ADMOB_BANNER_ID): Promise<boolean> {
  // Só exibe em plataforma nativa
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Banner ads only work on native platforms');
    return false;
  }
  
  try {
    const initialized = await initializeAdMob();
    if (!initialized) return false;
    
    await AdMob.showBanner({
      adId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
    });
    console.log('Banner ad displayed');
    return true;
  } catch (error) {
    console.error('Failed to show banner ad:', error);
    return false;
  }
}

export async function hideBannerAd() {
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.error('Failed to hide banner ad:', error);
  }
}

export async function showInterstitialAd(adId: string = ADMOB_INTERSTITIAL_ID): Promise<boolean> {
  // Só exibe em plataforma nativa
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Interstitial ads only work on native platforms');
    return false;
  }
  
  try {
    const initialized = await initializeAdMob();
    if (!initialized) return false;
    
    await AdMob.prepareInterstitial({
      adId,
      isTesting: false,
    });
    
    await AdMob.showInterstitial();
    console.log('Interstitial ad displayed');
    return true;
  } catch (error) {
    console.error('Failed to show interstitial ad:', error);
    return false;
  }
}

// Verifica se está em plataforma nativa
export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}
