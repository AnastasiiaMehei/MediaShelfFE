import { api } from '../api/axiosInstance';
import type { AudioFile } from '../types/Audio';

class AudioService {
  async uploadAudio(formData: FormData): Promise<AudioFile> {
    const response = await api.post('/audio', formData);
    return response.data?.data;
  }

  async getAudioFiles(): Promise<AudioFile[]> {
    const response = await api.get('/audio');
    return response.data?.data || [];
  }

  async getAudioFile(audioId: string): Promise<AudioFile> {
    const response = await api.get(`/audio/${audioId}`);
    return response.data?.data;
  }

  async deleteAudioFile(audioId: string): Promise<void> {
    await api.delete(`/audio/${audioId}`);
  }

  async duplicateAudioFile(audioId: string): Promise<AudioFile> {
    const response = await api.post(`/audio/${audioId}/duplicate`);
    return response.data?.data;
  }
}

export const audioService = new AudioService();
