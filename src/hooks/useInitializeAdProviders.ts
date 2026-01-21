import { useEffect } from 'react';

/**
 * Hook to initialize all ad providers globally
 * Should be called once in the main App component
 */
export const useInitializeAdProviders = () => {
  useEffect(() => {
    // Initialize multiple times to ensure all providers are loaded
    const initProviders = () => {
      try {
        // Initialize MagServ AdProvider
        // @ts-ignore
        if (window.AdProvider) {
          // @ts-ignore
          window.AdProvider.push({ "serve": {} });
        }

        // Initialize Google AdSense
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          window.adsbygoogle.push({});
        }
      } catch (err) {
        // Silently fail - providers may not be loaded yet
        console.debug('Ad provider initialization:', err);
      }
    };

    // Try to initialize immediately
    initProviders();

    // Try again after a delay to catch late-loading providers
    const timer1 = setTimeout(initProviders, 500);
    const timer2 = setTimeout(initProviders, 1000);
    const timer3 = setTimeout(initProviders, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
};

export default useInitializeAdProviders;
