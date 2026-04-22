import { api } from '../api/axiosInstance';

export interface AudioFile {
  _id: string;   
  title: string;
  size: number;
  duration: number;
  format: string;
  audioType: string;
  mimeType: string;
  coverMimeType?: string;
  audioUrl: string;
  coverUrl?: string;
  addedAt: string;
  updatedAt: string;
  description?: string;
}

class MusicService {
  async uploadAudio(formData: FormData): Promise<AudioFile> {
    const response = await api.post('/api/audio', formData);
    return response.data?.data;
  }

  async getAudioFiles(): Promise<AudioFile[]> {
    const response = await api.get('/api/audio');
    return response.data?.data || [];
  }

  async getAudioFile(audioId: string): Promise<AudioFile> {
    const response = await api.get(`/api/audio/${audioId}`);
    return response.data?.data;
  }

  async deleteAudioFile(audioId: string): Promise<void> {
    await api.delete(`/api/audio/${audioId}`);
  }

  async duplicateAudioFile(audioId: string): Promise<{ data: AudioFile }> {
    const response = await api.post(`/api/audio/${audioId}/duplicate`);
    return response;
  }
}

export const musicService = new MusicService();