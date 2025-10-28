import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('hot-coffee');

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      // Preload images for visible category first
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      
      // Then preload other images after a short delay
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);


  React.useEffect(() => {
    if (categories.length > 0) {
      // Set default to dim-sum if it exists, otherwise first category
      const defaultCategory = categories.find(cat => cat.id === 'dim-sum') || categories[0];
      if (!categories.find(cat => cat.id === activeCategory)) {
        setActiveCategory(defaultCategory.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="bg-background-white">
        {/* Hero Section */}
        <section className="section-spacing">
          <div className="container-minimal">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl font-display font-semibold text-primary-charcoal mb-8 tracking-tight">
                Secure your Coins, Secure your Future
              </h2>
              
              {/* Hero Image with 3:1 Aspect Ratio */}
              <div className="w-full aspect-[3/1] mb-8 rounded-lg overflow-hidden shadow-minimal-lg">
                <img 
                  src="/hero-image.jpg" 
                  alt="Saving coins for a secure future"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
              
              <p className="text-xl text-secondary-silver-dark font-light leading-relaxed">
                
              </p>
            </div>
          </div>
        </section>

        {/* Menu Categories */}
        <div className="pb-20">
          <div className="container-minimal">
            {categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.category === category.id);
              
              if (categoryItems.length === 0) return null;
              
              return (
                <section key={category.id} id={category.id} className="mb-24">
                  {/* Category Header */}
                  <div className="flex items-center mb-12">
                    <div className="w-16 h-px bg-secondary-silver-light mr-6"></div>
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{category.icon}</span>
                      <h3 className="text-4xl font-display font-semibold text-primary-charcoal tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex-1 h-px bg-secondary-silver-light ml-6"></div>
                  </div>
                  
                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryItems.map((item) => {
                      const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                      return (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          onAddToCart={addToCart}
                          quantity={cartItem?.quantity || 0}
                          onUpdateQuantity={updateQuantity}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Menu;