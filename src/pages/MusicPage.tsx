import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Upload, Play, Pause, Music } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { musicService } from '../services/music.service';
import type { AudioFile } from '../services/music.service';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function MusicPage() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const waveformRefs = useRef<{ [key: string]: WaveSurfer }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  async function loadAudioFiles() {
    try {
      const response = await musicService.getAudioFiles();
      setAudioFiles(response);
    } catch (error) {
      setAudioFiles([]);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        await loadAudioFiles();
      };
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      const clearData = () => setAudioFiles([]);
      clearData();
    }
  }, [isAuthenticated]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
      alert('Please log in to upload files');
      return;
    }

    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('audio/')) {
          alert(`${file.name} is not an audio file`);
          continue;
        }

        const formData = new FormData();
        formData.append('audio', file);
        const uploadedAudio = await musicService.uploadAudio(formData);
        setAudioFiles(prev => [...prev, uploadedAudio]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const initializeWaveform = (audioId: string, containerId: string, audioUrl: string) => {
    if (waveformRefs.current[audioId]) {
      waveformRefs.current[audioId].destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: `#${containerId}`,
      waveColor: '#dc2626',
      progressColor: '#991b1b',
      height: 60,
      normalize: true,
      backend: 'WebAudio',
    });

    wavesurfer.load(audioUrl);

    wavesurfer.on('play', () => setPlayingId(audioId));
    wavesurfer.on('pause', () => setPlayingId(null));
    wavesurfer.on('finish', () => setPlayingId(null));

    waveformRefs.current[audioId] = wavesurfer;
  };

  const togglePlayback = (audioId: string) => {
    const wavesurfer = waveformRefs.current[audioId];
    if (!wavesurfer) return;

    if (playingId === audioId) {
      wavesurfer.pause();
    } else {
      if (playingId && waveformRefs.current[playingId]) {
        waveformRefs.current[playingId].pause();
      }
      wavesurfer.play();
    }
  };

  const handleDelete = async (audioId: string) => {
    if (!isAuthenticated) {
      alert('Please log in to delete files');
      return;
    }


    try {
      await musicService.deleteAudioFile(audioId);
      setAudioFiles(prev => prev.filter(audio => audio._id !== audioId));
    } catch (error) {
      console.error('Error deleting audio file:', error);
      alert('Error deleting audio file');
    }
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Unknown date';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Unknown date';
    }
  };


  useEffect(() => {
    audioFiles.forEach((audio) => {
      if (audio.audioUrl) {
        initializeWaveform(audio._id, `waveform-${audio._id}`, audio.audioUrl);
      }
    });
  }, [audioFiles]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <section className="pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Music Library</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Upload and listen to your favorite music tracks
        </p>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="audio-upload"
            />
            <label htmlFor="audio-upload">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isUploading}
              >
                <Upload className="w-5 h-5 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Audio Files'}
              </Button>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Supported audio formats: MP3, WAV, OGG, M4A
            </p>
          </div>

          {/* Audio Files List */}
          <div className="space-y-6">
            {audioFiles.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No audio files yet
                </h3>
                <p className="text-gray-500">
                  Upload your first audio file to get started
                </p>
              </div>
            ) : (
              audioFiles.map((audio) => (
                <div
                key={audio._id}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => togglePlayback(audio._id)}
                    className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-colors mr-10"
                  >
                    {playingId === audio._id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {audio.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Added {formatDate(audio.addedAt)} • {formatDuration(audio.duration)} • {(audio.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                 
                </div>
                <div id={`waveform-${audio._id}`} className="w-full"></div>
              
              
                <div className="flex space-x-2 mt-4">
                  <Button
                    onClick={() => handleDelete(audio._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
