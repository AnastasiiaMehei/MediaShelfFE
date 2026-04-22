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
  