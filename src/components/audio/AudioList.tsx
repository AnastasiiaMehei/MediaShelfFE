import React from "react";
import { Music } from "lucide-react";
import { AudioCard } from "./AudioCard";
import type { AudioFile } from "../../types/Audio";

interface Props {
  audioFiles: AudioFile[];
  playingId: string | null;
  onPlayPause: (id: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
  formatDuration: (seconds: number) => string;
}

export const AudioList: React.FC<Props> = ({ audioFiles, playingId, onPlayPause, onDelete, formatDate, formatDuration }) => (
  <div className="space-y-6">
    {audioFiles.length === 0 ? (
      <div className="text-center py-12">
        <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No audio files yet</h3>
        <p className="text-gray-500">Upload your first audio file to get started</p>
      </div>
    ) : (
      audioFiles.map((audio) => (
        <AudioCard
          key={audio._id}
          audio={audio}
          playingId={playingId}
          onPlayPause={onPlayPause}
          onDelete={onDelete}
          formatDate={formatDate}
          formatDuration={formatDuration}
        />
      ))
    )}
  </div>
);
