'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <p className="text-xl font-medium text-foreground">Processing your virtual try-on...</p>
      <p className="text-muted-foreground">This might take a moment. Hang tight!</p>
    </div>
  );
}
