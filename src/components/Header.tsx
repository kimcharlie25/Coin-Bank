import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-background-white/95 backdrop-blur-sm border-b border-secondary-silver-light">
      <div className="container-minimal">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-4 text-primary-charcoal hover:text-primary-charcoal-light transition-colors duration-200 group"
          >
            {loading ? (
              <div className="w-12 h-12 bg-secondary-silver-light rounded-full animate-pulse" />
            ) : (
              <div className="relative">
                <img 
                  src={siteSettings?.site_logo || "/logo.jpg"} 
                  alt={siteSettings?.site_name || "Beracah Cafe"}
                  className="w-12 h-12 rounded-full object-cover border border-secondary-silver-light group-hover:border-secondary-silver transition-colors duration-200"
                  onError={(e) => {
                    e.currentTarget.src = "/logo.jpg";
                  }}
                />
                <div className="absolute inset-0 rounded-full border-2 border-accent-teal opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            )}
            <div className="text-left">
              <h1 className="text-2xl font-display font-semibold tracking-tight">
                {loading ? (
                  <div className="w-32 h-7 bg-secondary-silver-light rounded animate-pulse" />
                ) : (
                  siteSettings?.site_name || "Beracah Cafe"
                )}
              </h1>
              <p className="text-sm text-secondary-silver-dark font-light">
                {loading ? (
                  <div className="w-24 h-4 bg-secondary-silver-light rounded animate-pulse mt-1 ml-2" />
                ) : (
                  "SAVINGS"
                )}
              </p>
            </div>
          </button>

          {/* Cart Button */}
          <div className="flex items-center">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-primary-charcoal hover:text-accent-teal hover:bg-secondary-silver-light rounded-full transition-all duration-200 group focus-minimal"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-teal text-white text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center animate-scale-in shadow-minimal">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;