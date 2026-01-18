# Configuração Android para CogNext

Esta pasta contém os templates de configuração necessários para o app Android funcionar corretamente.

## 📁 Arquivos Incluídos

1. **AndroidManifest.xml** - Manifest completo com permissões e configuração do AdMob
2. **network_security_config.xml** - Configuração de segurança de rede (HTTPS)
3. **MainActivity.java** - Activity principal limpa

## 🚀 Instruções de Instalação

### Passo 1: Gerar pasta Android
```bash
npm install
npx cap add android
```

### Passo 2: Substituir arquivos

1. **AndroidManifest.xml**
   - Copie o conteúdo de `android-config/AndroidManifest.xml`
   - Cole em `android/app/src/main/AndroidManifest.xml`
   - **IMPORTANTE:** Substitua `ca-app-pub-6111888174936788~XXXXXXXXXX` pelo seu APP ID real do AdMob

2. **network_security_config.xml**
   - Crie a pasta `android/app/src/main/res/xml/` se não existir
   - Copie `android-config/network_security_config.xml` para essa pasta

3. **MainActivity.java**
   - Substitua o conteúdo de `android/app/src/main/java/app/lovable/ed2909e2c06b4cee8f59885dead9ee95/MainActivity.java`

### Passo 3: Build do APK
```bash
npm run build
npx cap sync android
npx cap run android
```

> Dica (Android 15): este projeto força `http://localhost` (tráfego local do Capacitor) e libera **apenas** `localhost` no `network_security_config.xml` para evitar travar na abertura.


## ⚠️ Solução de Problemas

### App fechando ao abrir
- Verifique se o `webDir` no `capacitor.config.json` é `dist`
- Execute `npm run build` antes de `npx cap sync`
- Verifique se o AdMob App ID está correto no AndroidManifest.xml

### Sem internet no app
- Confirme que as permissões INTERNET estão no Manifest
- Verifique o network_security_config.xml

### AdMob não funciona
- O APP ID no AndroidManifest.xml deve corresponder ao do console AdMob
- A propriedade `DELAY_APP_MEASUREMENT_INIT` evita crashes na inicialização
