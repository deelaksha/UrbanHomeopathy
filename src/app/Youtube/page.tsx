'use client';
import Header from '../Header/page';
import React, { useState, useEffect } from 'react';
import { Play, X, Search } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface Video {
  id: number;
  url: string;
  title: string;
  youtubeId?: string;
}

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('Youtube')
          .select('id, url, title');

        if (error) throw error;

        const formattedVideos = data.map((video: { id: number; url: string; title: string }) => ({
          ...video,
          youtubeId: extractYouTubeId(video.url),
        }));

        setVideos(formattedVideos);
        setFilteredVideos(formattedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(term)
    );
    setFilteredVideos(filtered);
  };

  const VideoSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse border-2 border-emerald-100">
      <div className="w-full aspect-video bg-emerald-50"></div>
      <div className="p-6">
        <div className="h-6 bg-emerald-100 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <>
    <Header/>
    
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 mt-7 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search videos..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-emerald-200 rounded-full shadow-md focus:ring-2 focus:ring-emerald-400 focus:outline-none transition duration-300 ease-in-out transform hover:scale-[1.01]"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array(6).fill(null).map((_, index) => <VideoSkeleton key={index} />)
            : filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-emerald-200 group"
                >
                  <div className="relative overflow-hidden">
                    {video.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-emerald-50 flex items-center justify-center text-emerald-500">
                        No Thumbnail
                      </div>
                    )}
                    <div className="absolute inset-0 bg-emerald-900 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="bg-white text-emerald-600 p-4 rounded-full opacity-0 group-hover:opacity-100 transform transition-all duration-300 hover:scale-110 hover:bg-emerald-50"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-emerald-900 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border-4 border-emerald-200">
            <div className="flex justify-end p-4 bg-emerald-50">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default VideoGallery;