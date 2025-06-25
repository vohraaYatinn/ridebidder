import { useEffect, useState } from 'react';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

export const useKeyboard = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listeners: any[] = [];

    const setupListeners = async () => {
      const keyboardWillShow = await Keyboard.addListener('keyboardWillShow', info => {
        setKeyboardHeight(info.keyboardHeight);
        setIsKeyboardOpen(true);
        
        // Add padding to body to prevent overlap
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          setTimeout(() => {
            activeElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center'
            });
          }, 100);
        }
      });

      const keyboardDidShow = await Keyboard.addListener('keyboardDidShow', info => {
        setKeyboardHeight(info.keyboardHeight);
        setIsKeyboardOpen(true);
        
        // Ensure the active input is visible
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          activeElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      });

      const keyboardWillHide = await Keyboard.addListener('keyboardWillHide', () => {
        setIsKeyboardOpen(false);
        setKeyboardHeight(0);
      });

      const keyboardDidHide = await Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false);
        setKeyboardHeight(0);
      });

      listeners = [keyboardWillShow, keyboardDidShow, keyboardWillHide, keyboardDidHide];
    };

    setupListeners();

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, []);

  return {
    isKeyboardOpen,
    keyboardHeight
  };
}; 