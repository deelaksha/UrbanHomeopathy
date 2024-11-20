import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Leaf, 
  ChevronRight,
  Calendar
} from 'lucide-react';

const Footer = () => {
  const resourceLinks = [
    'Articles & Blog',
    'Research Studies',
    'FAQ',
    'Patient Stories',
    'Treatment Guide',
    'Remedies Database'
  ];

  const quickLinks = [
    'Book Appointment',
    'Emergency Care',
    'Online Consultation',
    'Find a Doctor',
    'Download Forms',
    'Insurance Partners'
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100">
      {/* Newsletter Section */}
      <div className="w-full bg-green-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(40)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3
              }}
              size={24}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Join Our Wellness Journey
              </h3>
              <p className="text-green-100">
                Subscribe to receive natural healing tips and exclusive offers
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-green-400 transition-all duration-300 min-w-[300px]"
                />
                <button
                  type="submit"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold
                           hover:bg-green-50 transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">
                HolisticHealth
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Dedicated to providing natural healing through traditional homeopathic 
              treatments, backed by modern research and decades of experience.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center
                           hover:bg-green-600 group transition-all duration-300 transform hover:scale-110"
                >
                  <Icon 
                    size={20} 
                    className="text-green-600 group-hover:text-white transition-colors duration-300" 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 flex items-center
                             group transition-colors duration-300"
                  >
                    <ChevronRight 
                      size={16} 
                      className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <p className="text-gray-600">
                  123 Healing Street
                  <br />
                  Wellness District
                  <br />
                  Natural City, NC 12345
                </p>
              </div>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-gray-600 hover:text-green-600
                         transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>(123) 456-7890</span>
              </a>
              <a
                href="mailto:info@holistichealth.com"
                className="flex items-center space-x-3 text-gray-600 hover:text-green-600
                         transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>info@holistichealth.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Sat: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              <button
                className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg
                         flex items-center justify-center space-x-2 hover:bg-green-700
                         transform hover:scale-105 transition-all duration-300"
              >
                <Calendar size={20} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-green-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600">
              © {currentYear} HolisticHealth. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
