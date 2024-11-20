import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Anderson",
    condition: "Chronic Migraine",
    duration: "6 months treatment",
    text: "Homeopathy has been life-changing. Relief without any side effects.",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    condition: "Anxiety & Stress",
    duration: "3 months treatment",
    text: "I feel more balanced and centered than ever before.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Thompson",
    condition: "Skin Allergies",
    duration: "4 months treatment",
    text: "Homeopathic remedies were effective for my skin conditions.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial, isActive }) => (
  <div
    className={`absolute w-full transition-opacity duration-500 ${
      isActive ? 'opacity-100' : 'opacity-0'
    }`}
  >
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold">{testimonial.name}</h3>
      <p className="text-sm text-gray-600">{testimonial.condition}</p>
      <p className="mt-4">{testimonial.text}</p>
      <div className="mt-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">{testimonial.duration}</p>
    </div>
  </div>
);

const HomeopathyTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 text-center">
      <h2 className="text-2xl font-bold mb-6">Healing Journeys</h2>

      <div className="relative h-64 mb-6">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={idx === activeIndex}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={handlePrev} className="p-2 bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className="p-2 bg-gray-100 rounded-full">
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomeopathyTestimonials;
