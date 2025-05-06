'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Shirt } from 'lucide-react'; // Icons for placeholders

interface PreviewImagesProps {
  userImagePreview: string | null;
  selectedClothingImage: string | null;
}

export function PreviewImages({ userImagePreview, selectedClothingImage }: PreviewImagesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0 aspect-square flex items-center justify-center bg-secondary/20">
          {userImagePreview ? (
            <Image
              src={userImagePreview}
              alt="User preview"
              width={300}
              height={400}
              className="object-contain w-full h-full"
              data-ai-hint="person portrait"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
              <User className="w-16 h-16 mb-2" />
              <p>Your Image</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0 aspect-square flex items-center justify-center bg-secondary/20">
          {selectedClothingImage ? (
            <Image
              src={selectedClothingImage}
              alt="Selected clothing preview"
              width={300}
              height={400}
              className="object-contain w-full h-full"
              data-ai-hint="clothing item"
            />
          ) : (
             <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
              <Shirt className="w-16 h-16 mb-2" />
              <p>Clothing Item</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
