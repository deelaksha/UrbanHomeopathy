'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Loader, Leaf, Heart, Clock, User } from 'lucide-react';
import Header from '../Header/page';
import Link from 'next/link';  // Import Next.js Link for navigation

interface Blog {
  id: number;
  created_at: string;
  title: string;
  description: string;
  author: string;
  image_url: string | null;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('blogs').select('*');
      if (error) {
        console.error('Error fetching blogs:', error.message);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="relative">
          <div className="animate-spin">
            <Loader className="w-12 h-12 text-green-600" />
          </div>
          <div className="absolute -top-1 -left-1 w-14 h-14 border-2 border-green-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Leaf className="w-12 h-12 text-green-500 animate-bounce" />
              <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse opacity-25" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
              Health & Wellness Blog
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative">
            Discover insights for a healthier, more balanced life
          </p>
          
          <div className="absolute w-64 h-64 -top-12 left-1/2 -translate-x-1/2 bg-green-100 rounded-full filter blur-3xl opacity-25 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2"
              onMouseEnter={() => setActiveCard(blog.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {blog.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              )}
              
              <div className="p-8 relative">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-700">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <time>{new Date(blog.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</time>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-green-700">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {blog.description}
                </p>
                
                <Link href={`/Blog/${blog.id}`} passHref>
  <button className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
    Read Article
    <Heart className={`w-4 h-4 ml-2 transition-all duration-300 ${activeCard === blog.id ? 'animate-ping' : ''}`} />
  </button>
</Link>

              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default Blogs;
