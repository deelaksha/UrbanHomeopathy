'use client';
import { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';

type BlogPost = {
  title: string;
  description: string;
  author: string;
  image_url?: string | null;
};

type Message = {
  type: 'success' | 'error';
  content: string;
} | null;

const CreateBlog = () => {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    description: '',
    author: '',
    image_url: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<Message>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateImage = (file: File): boolean => {
    const MAX_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      setMessage({ type: 'error', content: 'Please upload a JPEG, PNG, or WebP image.' });
      return false;
    }

    if (file.size > MAX_SIZE) {
      setMessage({ type: 'error', content: 'Image size must be less than 5MB.' });
      return false;
    }

    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const bucketName = 'blog-images';
      const folderName = 'images';
      const fileExt = file.name.split('.').pop();
      const fileName = `${folderName}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      author: '',
      image_url: null,
    });
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let imageUrl: string | null = null;

      if (image) {
        if (!validateImage(image)) {
          setIsSubmitting(false);
          return;
        }

        imageUrl = await uploadImage(image);
      }

      const { error } = await supabase
        .from('blogs')
        .insert([{ ...formData, image_url: imageUrl }])
        .select();

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        content: 'Blog post created successfully!' 
      });
      resetForm();
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        content: `Error creating blog post: ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-emerald-600 py-6 px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Create a New Blog Post
            </h1>
            <p className="mt-2 text-emerald-100">
              Share your thoughts with the world
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                maxLength={100}
                placeholder="Enter an engaging title"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition duration-200 ease-in-out"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition duration-200 ease-in-out min-h-[200px]"
              />
            </div>

            {/* Author Input */}
            <div className="space-y-2">
              <label 
                htmlFor="author" 
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                required
                maxLength={50}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition duration-200 ease-in-out"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label 
                htmlFor="image" 
                className="block text-sm font-medium text-gray-700"
              >
                Cover Image (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-emerald-400 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WebP up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div 
                className={`p-4 rounded-xl ${
                  message.type === 'error' 
                    ? 'bg-red-50 text-red-700 border border-red-100' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                }`}
              >
                {message.content}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl text-white font-medium text-lg
                shadow-sm transition duration-200 ease-in-out
                ${isSubmitting 
                  ? 'bg-emerald-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md active:transform active:scale-[0.99]'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Blog Post'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;