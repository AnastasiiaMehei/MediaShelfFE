import React from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "../ui/Button";
import { IconButton } from "@mui/material";
import type { AudioFile } from "../../types/Audio";

interface Props {
  audio: AudioFile;
  playingId: string | null;
  onPlayPause: (id: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
  formatDuration: (seconds: number) => string;
}

export const AudioCard: React.FC<Props> = ({ audio, playingId, onPlayPause, onDelete, formatDate, formatDuration }) => (
  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      {audio.coverUrl && (
        <img
          src={audio.coverUrl}
          alt={`${audio.title} cover`}
          className="w-20 h-20 object-cover rounded-lg shadow mr-4"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{audio.title}</h3>
        <p className="text-sm text-gray-500">
          Added {formatDate(audio.addedAt)} • {formatDuration(audio.duration)} • {(audio.size / 1024).toFixed(1)} KB
        </p>
      </div>
      <IconButton
        onClick={() => onPlayPause(audio._id)}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          ml: 4,
          '&:hover': {
            backgroundColor: '#dc2626',
          },
        }}
      >
        {playingId === audio._id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </IconButton>
    </div>
    <div id={`waveform-${audio._id}`} className="w-full"></div>
    <div className="flex space-x-2 mt-4">
      <Button
        onClick={() => onDelete(audio._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </Button>
    </div>
  </div>
);
