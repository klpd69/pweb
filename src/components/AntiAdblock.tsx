import { useEffect } from 'react';

const AntiAdblock = () => {
  useEffect(() => {
    // Load anti-adblock script
    const loadAntiAdblockScript = () => {
      const script = document.createElement('script');
      script.src = 'https://vetofellowshipfly.com/13/2f/50/132f509eee59068a797dd4ab2020089c.js';
      script.async = true;
      document.head.appendChild(script);
    };

    loadAntiAdblockScript();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default AntiAdblock;
