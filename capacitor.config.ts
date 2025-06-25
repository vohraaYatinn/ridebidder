import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.cabmatedriver.com',
  appName: 'cabmate_driver',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Ionic,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true
    },
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
