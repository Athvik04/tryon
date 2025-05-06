'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UploadForm } from '@/components/features/try-on/UploadForm';
import { PreviewImages } from '@/components/features/try-on/PreviewImages';
import { CatalogSelector, type ClothingItem } from '@/components/features/try-on/CatalogSelector';
import { BodyDetailsForm } from '@/components/features/try-on/BodyDetailsForm';
import { LoadingScreen } from '@/components/features/try-on/LoadingScreen';
import { ResultViewer } from '@/components/features/try-on/ResultViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Shirt, Users, PersonStanding, Sparkles, Download, ZoomIn } from 'lucide-react';
import { processTryOn } from '@/services/backend';
import { recommendClothing, type RecommendClothingInput } from '@/ai/flows/recommend-clothing';
import { useToast } from '@/hooks/use-toast';

export default function TryOnPage() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [bodyDetails, setBodyDetails] = useState<{ height: number; weight: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (userImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImagePreview(reader.result as string);
      };
      reader.readAsDataURL(userImage);
    } else {
      setUserImagePreview(null);
    }
  }, [userImage]);

  const handleUserImageUpload = (file: File) => {
    setUserImage(file);
    setResultImage(null); // Clear previous result
    setError(null);
  };

  const handleClothingSelect = (item: ClothingItem) => {
    setSelectedClothing(item);
    setResultImage(null); // Clear previous result
    setError(null);
  };

  const handleBodyDetailsSubmit = (details: { height: string; weight: string }) => {
    setBodyDetails({ height: parseInt(details.height), weight: parseInt(details.weight) });
    setError(null);
  };

  const handleSubmit = async () => {
    if (!userImage || !selectedClothing) {
      setError('Please upload your image and select a clothing item.');
      toast({
        title: 'Missing Information',
        description: 'Please upload your image and select a clothing item.',
        variant: 'destructive',
      });
      return;
    }
    if (!bodyDetails) {
      setError('Please provide your body details for AI recommendation.');
       toast({
        title: 'Missing Body Details',
        description: 'Please provide your body details for AI recommendation.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiRecommendation(null);
    setAiReasoning(null);

    try {
      // Simulate API call for try-on
      const tryOnResult = await processTryOn(userImage, new File([], selectedClothing.image), 'user_id_123'); // Assuming clothing image from catalog is a URL
      setResultImage(tryOnResult.imageUrl);

      // Call AI for recommendation
      const recommendationInput: RecommendClothingInput = {
        height: bodyDetails.height,
        weight: bodyDetails.weight,
        desiredClothing: selectedClothing.name,
        stylePreferences: selectedClothing.category, // Simplified, can be more detailed
      };
      const recommendationResult = await recommendClothing(recommendationInput);
      setAiRecommendation(recommendationResult.recommendation);
      setAiReasoning(recommendationResult.reasoning);
      toast({
        title: 'Success!',
        description: 'Your virtual try-on is ready and we have a recommendation for you.',
      });

    } catch (err) {
      console.error('Error during processing:', err);
      setError('An error occurred during processing. Please try again.');
      toast({
        title: 'Processing Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clothingItems: ClothingItem[] = [
    { id: '1', name: 'Classic T-Shirt', category: 'Tops', image: 'https://picsum.photos/seed/tshirt/300/400', dataAiHint: 'tshirt fashion', colors: ['Red', 'Blue', 'Black'] },
    { id: '2', name: 'Denim Jeans', category: 'Pants', image: 'https://picsum.photos/seed/jeans/300/400', dataAiHint: 'jeans model', colors: ['Blue', 'Black'] },
    { id: '3', name: 'Summer Dress', category: 'Dresses', image: 'https://picsum.photos/seed/dress/300/400', dataAiHint: 'dress summer', colors: ['Yellow', 'Pink', 'White'] },
    { id: '4', name: 'Formal Shirt', category: 'Tops', image: 'https://picsum.photos/seed/formalshirt/300/400', dataAiHint: 'shirt business', colors: ['White', 'Light Blue'] },
    { id: '5', name: 'Chino Pants', category: 'Pants', image: 'https://picsum.photos/seed/chinopants/300/400', dataAiHint: 'pants casual', colors: ['Khaki', 'Navy'] },
    { id: '6', name: 'Evening Gown', category: 'Dresses', image: 'https://picsum.photos/seed/gown/300/400', dataAiHint: 'gown elegant', colors: ['Black', 'Red', 'Gold'] },
  ];


  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Virtual Tailor</h1>
        <p className="text-lg text-muted-foreground">Try on clothes virtually and get AI-powered style advice!</p>
      </header>

      {isLoading && <LoadingScreen />}

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="mr-2 h-6 w-6 text-primary" />
                Your Image
              </CardTitle>
              <CardDescription>Upload a clear, front-facing photo of yourself.</CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm onImageUpload={handleUserImageUpload} acceptedFileTypes="image/jpeg, image/png, image/webp" />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shirt className="mr-2 h-6 w-6 text-primary" />
                Select Clothing
              </CardTitle>
              <CardDescription>Choose an item from our catalog.</CardDescription>
            </CardHeader>
            <CardContent>
              <CatalogSelector items={clothingItems} onSelect={handleClothingSelect} selectedItem={selectedClothing} />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <PersonStanding className="mr-2 h-6 w-6 text-primary" />
                Body Details
              </CardTitle>
              <CardDescription>Help our AI give you the best fit recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <BodyDetailsForm onSubmit={handleBodyDetailsSubmit} />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column: Previews and Action */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <Card className="shadow-lg flex-grow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ZoomIn className="mr-2 h-6 w-6 text-primary" />
                Preview
              </CardTitle>
              <CardDescription>Here's what you've selected.</CardDescription>
            </CardHeader>
            <CardContent>
              <PreviewImages userImagePreview={userImagePreview} selectedClothingImage={selectedClothing?.image || null} />
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="shadow-md">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !userImage || !selectedClothing || !bodyDetails} 
            className="w-full py-3 text-lg shadow-md hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-105"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isLoading ? 'Processing...' : 'Virtually Try On & Get Recommendation'}
          </Button>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Image src="/clothing-hanger.svg" alt="Try-on Result" width={24} height={24} className="mr-2 text-primary" />
                Try-On Result
              </CardTitle>
              <CardDescription>See yourself in the selected outfit!</CardDescription>
            </CardHeader>
            <CardContent>
              {resultImage ? (
                <ResultViewer imageUrl={resultImage} />
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  <p>Your virtual try-on result will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {resultImage && (
            <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = resultImage;
                  // Extract filename or generate one
                  const filename = resultImage.substring(resultImage.lastIndexOf('/') + 1) || 'virtual-try-on.jpg';
                  link.download = filename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast({
                    title: 'Image Downloaded',
                    description: `${filename} has been saved.`,
                  });
                }}
                className="w-full shadow-md hover:bg-primary/90 transition-all duration-300 ease-in-out"
                variant="outline"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Result
            </Button>
          )}

          {(aiRecommendation || aiReasoning) && (
            <Card className="shadow-lg bg-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" /> {/* Changed icon and color for AI */}
                  AI Stylist Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiRecommendation && (
                  <div>
                    <h4 className="font-semibold text-primary">Recommendation:</h4>
                    <p className="text-foreground">{aiRecommendation}</p>
                  </div>
                )}
                {aiReasoning && (
                  <div>
                    <h4 className="font-semibold text-primary">Reasoning:</h4>
                    <p className="text-foreground">{aiReasoning}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <footer className="w-full max-w-6xl mt-12 pt-6 border-t border-border text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Virtual Tailor. All rights reserved.</p>
      </footer>
    </div>
  );
}
