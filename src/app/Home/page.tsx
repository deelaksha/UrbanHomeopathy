'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../Header/page';
import Footer from '../Footer/page';
import TestimonialShowcase from '../Rating/page';
import { Leaf, Star, Calendar, Shield, Heart, Users, CheckCircle } from 'lucide-react';

const Home = () => {
  const services = [
    { icon: <Users size={24} />, title: 'Guaranteed Patient-Friendly Clinic', desc: 'Providing a comfortable and supportive environment.' },
    { icon: <Heart size={24} />, title: 'Happy Customers', desc: 'Our patients trust our care and expertise.' },
    { icon: <CheckCircle size={24} />, title: 'Permanent Solution', desc: 'Effective treatments for lasting health solutions.' },
    { icon: <Star size={24} />, title: 'Types Of Clinical Experience', desc: 'Diverse and comprehensive healthcare expertise.' },
    { icon: <Leaf size={24} />, title: 'Expertise In Women Health Care', desc: 'Specialized in women’s wellness and health needs.' },
    { icon: <Shield size={24} />, title: 'Hassle-Free Bonding', desc: 'Building relationships based on trust and care.' },
  ];

  const symptoms = [
    'Allergies', 'Anxiety', 'Arthritis', 'Asthma',
    'Depression', 'Digestive Issues', 'Headaches', 'Insomnia',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
      <Header />
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-green-500 opacity-20"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="flex items-center justify-center mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Leaf size={48} className="text-green-600" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
              Urban Homeopathy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-700">
              Where Nature Meets Modern Healing
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
                hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center space-x-2">
                <Calendar size={24} />
                <span>Book Your Consultation</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of the Sections */}
      {/* Services, Symptoms, Doctor Section, Testimonials, and Footer */}
      <section className="py-20 bg-green-900 text-green-50">
        {/* Services */}
        {/* Content */}
      </section>
      <section className="py-20">
        {/* Symptoms */}
        {/* Content */}
      </section>
      <section className="py-24 bg-gradient-to-r from-green-50 via-white to-green-50 text-green-900 relative overflow-hidden">
        {/* Doctor Section */}
        {/* Content */}
      </section>

      <TestimonialShowcase />
      <Footer />
    </div>
  );
};

export default Home;
