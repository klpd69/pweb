import { useEffect } from 'react';

interface PopunderProps {
  url?: string;
}

const Popunder = ({ url = 'https://vetofellowshipfly.com/wmg8fwe9m?key=18397a01cd6a8d1a5fac7e9423dfa095' }: PopunderProps) => {
  useEffect(() => {
    // Load popunder script
    const loadPopunderScript = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        (function() {
          // Track if popunder has been shown in this session
          const popunderShown = sessionStorage.getItem('popunderShown');
          
          if (!popunderShown) {
            // Open popunder on user interaction (first click)
            const showPopunder = () => {
              window.open('${url}', 'popunder', 'width=800,height=600,left=100,top=100');
              sessionStorage.setItem('popunderShown', 'true');
              document.removeEventListener('click', showPopunder);
            };
            
            document.addEventListener('click', showPopunder, { once: true });
          }
        })();
      `;
      document.head.appendChild(script);
    };

    loadPopunderScript();
  }, [url]);

  // This component doesn't render anything visible
  return null;
};

export default Popunder;
