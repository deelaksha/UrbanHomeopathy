'use client';
import React, { useState, useEffect } from 'react';
import { Play, X, Trash2 } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';
import Header from '@/app/Admin_Urban/Header/page';

interface Video {
  id: number;
  url: string;
  title: string;
  youtubeId?: string;
}

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('Youtube')
          .select('id, url, title');

        if (error) throw error;

        setVideos(
          data.map((video: { id: number; url: string; title: string }) => ({
            ...video,
            youtubeId: extractYouTubeId(video.url),
          }))
        );
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

  const insertVideoUrl = async (url: string, title: string) => {
    setUploadLoading(true);
    try {
      const { data, error } = await supabase
        .from('Youtube')
        .insert([{ url, title }])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        const newVideo = {
          ...data[0],
          youtubeId: extractYouTubeId(url)
        };
        setVideos((prevVideos) => [...prevVideos, newVideo]);
        setVideoUrl('');
        setVideoTitle('');
      }
    } catch (error) {
      console.error('Error inserting video:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  const deleteVideo = async (videoId: number) => {
    try {
      const { error } = await supabase
        .from('Youtube')
        .delete()
        .eq('id', videoId);

      if (error) throw error;

      setVideos((prevVideos) => 
        prevVideos.filter((video) => video.id !== videoId)
      );
    } catch (error) {
      console.error('Error deleting video:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl && videoTitle) {
      insertVideoUrl(videoUrl, videoTitle);
    }
  };

  const VideoSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="w-full aspect-video bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mt-6 items-center">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="p-3 w-full md:w-80 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Enter Video Title"
              className="p-3 w-full md:w-80 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <button
              type="submit"
              disabled={uploadLoading}
              className="bg-emerald-500 text-white p-3 rounded-lg w-full md:w-auto disabled:bg-emerald-200"
            >
              {uploadLoading ? 'Uploading...' : 'Add Video'}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading 
            ? Array(6).fill(null).map((_, index) => <VideoSkeleton key={index} />)
            : videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative group"
                >
                  <div className="relative">
                    {video.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                        No Thumbnail
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="bg-emerald-500 text-white p-4 rounded-full transform transition-transform duration-300 hover:scale-110 mr-4"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="bg-red-500 text-white p-4 rounded-full transform transition-transform duration-300 hover:scale-110"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-900">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
        </div>
      </div>

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