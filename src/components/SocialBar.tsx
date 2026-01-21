import { Facebook, Twitter, Instagram, Youtube, Linkedin, Share2 } from 'lucide-react';

interface SocialBarProps {
  position?: 'top' | 'bottom' | 'side';
  className?: string;
  title?: string;
}

const SocialBar = ({ 
  position = 'side', 
  className = '',
  title = 'Follow Us'
}: SocialBarProps) => {
  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Youtube, url: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  if (position === 'side') {
    return (
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white rounded-l-lg shadow-lg p-4 z-40 ${className}`}>
        <div className="flex flex-col gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className={`text-gray-600 ${social.color} transition-colors`}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (position === 'bottom') {
    return (
      <div className={`bg-gray-100 border-t py-6 ${className}`}>
        <div className="container flex flex-col items-center gap-4">
          <h3 className="font-semibold text-gray-700">{title}</h3>
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className={`text-gray-600 ${social.color} transition-colors`}
                >
                  <Icon size={28} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Top position
  return (
    <div className={`bg-gradient-to-r from-gray-900 to-gray-800 py-3 ${className}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 text-white text-sm font-semibold">
          <Share2 size={18} />
          {title}
        </div>
        <div className="flex gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className={`text-gray-300 hover:text-white transition-colors`}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialBar;
