'use client';
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Define the video data using the specific link's YouTube ID
  const videos = [
    {
      id: 1,
      title: "Healing with Homeopathy - Introduction",
      youtubeId: "-zXEbgzdWDk",
    },
    // Add more videos here if needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-purple-50">
      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative group">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="bg-emerald-500 text-white p-4 rounded-full transform transition-transform duration-300 hover:scale-110"
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Video Title */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-900">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-emerald-900">
                {selectedVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
