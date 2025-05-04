
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-200/80 backdrop-blur-md border-b border-dark-100">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-neon rounded-full animate-pulse-glow"></div>
            <span className="text-xl font-bold text-white">TradeScribe<span className="text-neon">AI</span></span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-neon transition-colors">Features</a>
            <a href="#insights" className="text-white hover:text-neon transition-colors">AI Insights</a>
            <a href="#performance" className="text-white hover:text-neon transition-colors">Performance</a>
            <a href="#pricing" className="text-white hover:text-neon transition-colors">Pricing</a>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-neon hover:text-white hover:bg-neon/20">
                Login
              </Button>
              <Button className="bg-neon text-dark-200 hover:bg-neon/80">
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-white hover:text-neon py-2 transition-colors">Features</a>
              <a href="#insights" className="text-white hover:text-neon py-2 transition-colors">AI Insights</a>
              <a href="#performance" className="text-white hover:text-neon py-2 transition-colors">Performance</a>
              <a href="#pricing" className="text-white hover:text-neon py-2 transition-colors">Pricing</a>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="border-neon text-neon w-full">Login</Button>
                <Button className="bg-neon text-dark-200 hover:bg-neon/80 w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
