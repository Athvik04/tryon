'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ZoomIn } from 'lucide-react'; // Optional: for an image zoom feature later

interface ResultViewerProps {
  imageUrl: string | null;
}

export function ResultViewer({ imageUrl }: ResultViewerProps) {
  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">Your result will appear here.</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105">
      <CardContent className="p-0 aspect-[3/4] relative"> {/* Common aspect ratio for portraits */}
        <Image
          src={imageUrl}
          alt="AI-generated try-on result"
          layout="fill"
          objectFit="contain" // 'cover' might crop, 'contain' ensures full image is visible
          className="rounded-lg"
          data-ai-hint="fashion model result"
          priority // Load this image with high priority as it's a key result
        />
      </CardContent>
    </Card>
  );
}
