import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// IDs de teste do Google - substitua pelos seus IDs reais em produção
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';

let isInitialized = false;

export async function initializeAdMob() {
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

export async function showBannerAd(adId: string = TEST_BANNER_ID) {
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

export async function showInterstitialAd(adId: string = TEST_INTERSTITIAL_ID) {
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
