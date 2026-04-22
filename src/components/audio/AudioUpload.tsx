import React from "react";
import { Upload } from "lucide-react";
import { Button } from "../ui/Button";

interface Props {
  isUploading: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const AudioUpload: React.FC<Props> = ({ isUploading, onUpload, fileInputRef }) => (
  <div className="mb-12 text-center">
    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="audio/*"
      onChange={onUpload}
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
        {isUploading ? "Uploading..." : "Upload Audio Files"}
      </Button>
    </label>
    {isUploading && (
      <div className="flex justify-center items-center mt-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Uploading...</span>
      </div>
    )}
  </div>
);
