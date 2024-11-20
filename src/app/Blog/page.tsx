import React from 'react';
import { Calendar, Clock, User, BookOpen, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Natural Healing: Understanding Homeopathy",
      excerpt: "Discover how homeopathic treatments can help restore your body's natural balance and promote holistic wellness through gentle, personalized care.",
      author: "Dr. Sarah Mitchell",
      readTime: "5 min read",
      date: "October 24, 2024",
      category: "Wellness",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "Common Myths About Homeopathic Medicine Debunked",
      excerpt: "Let's explore and clarify some of the most common misconceptions about homeopathy and understand its true principles and benefits.",
      author: "Dr. Michael Chen",
      readTime: "4 min read",
      date: "October 22, 2024",
      category: "Education",
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "Seasonal Allergies: A Homeopathic Approach",
      excerpt: "Learn how homeopathic remedies can provide natural relief from seasonal allergies without the side effects of conventional medications.",
      author: "Dr. Emma Thompson",
      readTime: "6 min read",
      date: "October 20, 2024",
      category: "Treatment",
      image: "/api/placeholder/800/400"
    }
  ];

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-900 mb-4">
              Holistic Healing Insights
            </h1>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Explore the latest in homeopathic medicine, wellness tips, and natural healing approaches.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-emerald-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-emerald-600 mb-3">
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-emerald-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-emerald-700 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-600">{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-emerald-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-emerald-50 text-emerald-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-emerald-100 transition-colors duration-200">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <div className="text-center max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">
                Stay Updated with Our Newsletter
              </h2>
              <p className="text-emerald-700 mb-6">
                Get the latest insights on natural healing and homeopathic treatments delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex-grow max-w-md"
                />
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;