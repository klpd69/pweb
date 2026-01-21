import { ExternalLink } from 'lucide-react';

interface SmartlinkProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  displayType?: 'banner' | 'button' | 'card';
}

const Smartlink = ({
  title = 'Smartlink_1',
  description = 'Visit our exclusive offers',
  url = '#',
  className = '',
  displayType = 'banner'
}: SmartlinkProps) => {

  if (displayType === 'button') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg ${className}`}
      >
        <span>{title}</span>
        <ExternalLink size={16} />
      </a>
    );
  }

  if (displayType === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-border rounded-lg hover:shadow-md transition-all hover:border-primary/50 ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <ExternalLink className="flex-shrink-0 text-primary" size={20} />
        </div>
      </a>
    );
  }

  // Default banner display
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-lg hover:shadow-md hover:border-primary/50 transition-all group ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <ExternalLink className="flex-shrink-0 text-primary group-hover:scale-110 transition-transform" size={24} />
      </div>
    </a>
  );
};

export default Smartlink;
