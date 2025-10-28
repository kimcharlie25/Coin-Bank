import React from 'react';
import { MapPin, Phone, User } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-charcoal text-background-white mt-20">
      <div className="container-minimal py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Address Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-6 w-6 text-accent-teal" />
              <h3 className="text-lg font-display font-semibold">Address</h3>
            </div>
            <p className="text-sm text-secondary-silver text-center md:text-left leading-relaxed">
              Poblacion 1 Porok 3 Sumil Street<br />
              Basud Camarines Norte<br />
              <span className="font-medium text-accent-teal">Main Branch</span>
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="h-6 w-6 text-accent-teal" />
              <h3 className="text-lg font-display font-semibold">Contact</h3>
            </div>
            <p className="text-sm text-secondary-silver">
              <a 
                href="tel:+639569254324" 
                className="hover:text-accent-teal transition-colors duration-200"
              >
                09569254324
              </a>
            </p>
          </div>

          {/* Owner Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 text-accent-teal" />
              <h3 className="text-lg font-display font-semibold">Owner</h3>
            </div>
            <p className="text-sm text-secondary-silver text-center md:text-left">
              Alan Nacor Cabalquinto
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-minimal border-secondary-silver-dark my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-secondary-silver-dark">
            © {new Date().getFullYear()} Coin Bank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
