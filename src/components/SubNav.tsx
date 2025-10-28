import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-background-white/95 backdrop-blur-sm border-b border-secondary-silver-light">
      <div className="container-minimal">
        <div className="flex items-center space-x-1 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-secondary-silver-light rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap focus-minimal ${
                  selectedCategory === 'all'
                    ? 'bg-accent-teal text-white shadow-minimal'
                    : 'bg-transparent text-secondary-silver-dark hover:text-primary-charcoal hover:bg-secondary-silver-light'
                }`}
              >
                All Items
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center space-x-2 focus-minimal ${
                    selectedCategory === c.id
                      ? 'bg-accent-teal text-white shadow-minimal'
                      : 'bg-transparent text-secondary-silver-dark hover:text-primary-charcoal hover:bg-secondary-silver-light'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


