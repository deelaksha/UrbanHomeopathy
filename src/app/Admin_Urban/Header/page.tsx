'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, Home, Calendar, Youtube, Blend  } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', icon: <Home size={20} />, href: '/Admin_Urban/Youtube_Video_Form' },
    { title: 'YouTube', icon: <Youtube size={20} />, href: '/Admin_Urban/Youtube_Video_Form' },
    { title: 'Appointments', icon: <Calendar size={20} />, href: '/Appointment' },
    { title: 'Blog', icon: <Blend size={20} />, href: '/Blog' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              HolisticHealth
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 
                         transition-colors duration-200 group"
              >
                <span className="transform group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="font-medium">{item.title}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600
                       hover:text-green-600 hover:bg-gray-100 focus:outline-none 
                       transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
<div
  className={`md:hidden transition-transform duration-300 ease-in-out ${
    isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
  }`}
>
  <div className={`px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
    {navItems.map((item) => (
      <a
        key={item.title}
        href={item.href}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600
                 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
      >
        {item.icon}
        <span>{item.title}</span>
      </a>
    ))}
  </div>
</div>

    </nav>
  );
};

export default Header;