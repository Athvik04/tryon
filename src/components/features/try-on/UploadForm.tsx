'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadFormProps {
  onImageUpload: (file: File) => void;
  acceptedFileTypes?: string;
}

export function UploadForm({ onImageUpload, acceptedFileTypes = "image/*" }: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        setFileName(null);
        if (event.target) event.target.value = ''; // Clear the input
        return;
      }
      onImageUpload(file);
      setFileName(file.name);
      toast({
        title: "Image Selected",
        description: `${file.name} is ready for preview.`,
      });
    }
  }, [onImageUpload, toast]);

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraDialog = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-border hover:border-primary transition-colors duration-200 ease-in-out"
        onClick={triggerFileDialog}
        onKeyDown={(e) => e.key === 'Enter' && triggerFileDialog()}
        role="button"
        tabIndex={0}
        aria-label="Upload image from gallery"
      >
        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
        <p className="mb-2 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        <Input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
      </div>
      <Button
        variant="outline"
        onClick={triggerCameraDialog}
        className="w-full"
        aria-label="Upload image from camera"
      >
        <Camera className="w-4 h-4 mr-2" />
        Use Camera
      </Button>
      <Input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment" // 'user' for front camera, 'environment' for back
        onChange={handleFileChange}
        className="hidden"
        id="camera-upload"
      />
      {fileName && (
        <p className="text-sm text-center text-muted-foreground">
          Selected: <span className="font-medium text-primary">{fileName}</span>
        </p>
      )}
    </div>
  );
}
