'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  imageUrl: string | null;
  filename?: string;
}

export function DownloadButton({ imageUrl, filename = 'virtual-try-on.jpg' }: DownloadButtonProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!imageUrl) {
      toast({
        title: "No Image to Download",
        description: "Please generate an image first.",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Image Downloaded",
      description: `${filename} has been saved to your device.`,
    });
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={!imageUrl}
      className="w-full transition-transform duration-150 ease-in-out hover:scale-105"
      variant="outline"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Image
    </Button>
  );
}
