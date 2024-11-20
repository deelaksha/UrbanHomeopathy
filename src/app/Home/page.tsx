'use client'; // Ensure this page is only rendered on the client side

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct for Next.js navigation

import Header from '../Header/page';
import Footer from '../Footer/page';
import TestimonialShowcase from '../Rating/page';
import {
  Leaf, Star, Calendar, Shield,
  Heart, Users, CheckCircle
} from 'lucide-react';

const Home = () => {
  const router = useRouter(); // Next.js routing system
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Enable rendering after client-side hydration
  }, []);

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
    'Depression', 'Digestive Issues', 'Headaches', 'Insomnia'
  ];

  if (!isClient) {
    return null; // Prevent SSR rendering issues
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
      <Header />
      {/* Hero Section */}
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
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
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
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
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
              onClick={() => router.push('/Appointment')}
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

      {/* Services Section */}
      <section className="py-20 bg-green-900 text-green-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose Urban Homeopathy
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-green-800 p-6 rounded-2xl hover:bg-green-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-green-200">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            We Treat Various Symptoms
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="inline-block mb-2 text-green-600" />
                <p className="font-medium">{symptom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-24 bg-gradient-to-r from-green-50 via-white to-green-50 text-green-900">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-green-800">
              Meet Dr. Tejaswini K B
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-700">
              I’m Dr. Tejaswini K B, here at Urban Care Homeopathy to support and guide you towards better health. With over a decade of clinical experience, I’m committed to offering personalized treatment plans tailored to your needs.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="space-y-8 bg-white shadow-xl rounded-lg p-6 md:p-8"
            >
              <p className="text-lg md:text-xl text-green-700">
                With top honors from Father Muller Homeopathic Medical College, Mangalore, and a Postgraduate degree from The Other Song Academy, Mumbai, I have a decade of experience helping thousands of people on their health journeys.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative h-96 w-96"
            >
              <Image
                src="/home_images/dr.png"
                alt="Dr. Tejaswini K B"
                layout="fill"
                className="rounded-full shadow-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialShowcase />
      <Footer />
    </div>
  );
};

export default Home;
