'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  image: string;
  dataAiHint?: string;
  colors?: string[];
}

interface CatalogSelectorProps {
  items: ClothingItem[];
  onSelect: (item: ClothingItem) => void;
  selectedItem: ClothingItem | null;
}

export function CatalogSelector({ items, onSelect, selectedItem }: CatalogSelectorProps) {
  const categories = Array.from(new Set(items.map(item => item.category)));
  const [activeTab, setActiveTab] = useState(categories[0] || 'All');

  const itemsByCategory = (category: string) => {
    if (category === 'All') return items;
    return items.filter(item => item.category === category);
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        {categories.map(category => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map(category => (
        <TabsContent key={category} value={category}>
          <ScrollArea className="h-[400px] w-full">
            <div className="grid grid-cols-2 gap-4 p-1">
              {itemsByCategory(category).map(item => (
                <Card
                  key={item.id}
                  className={cn(
                    "cursor-pointer hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:scale-105",
                    selectedItem?.id === item.id && "ring-2 ring-primary shadow-xl scale-105"
                  )}
                  onClick={() => onSelect(item)}
                  onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
                  tabIndex={0}
                  aria-pressed={selectedItem?.id === item.id}
                  aria-label={`Select ${item.name}`}
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={200}
                      className="object-cover w-full h-40 rounded-t-md"
                      data-ai-hint={item.dataAiHint || item.category.toLowerCase()}
                    />
                    {selectedItem?.id === item.id && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm font-medium truncate">{item.name}</CardTitle>
                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                  </CardContent>
                  {item.colors && (
                    <CardFooter className="p-3 pt-0">
                      <div className="flex space-x-1">
                        {item.colors.slice(0,3).map(color => (
                           <span key={color} className="block w-3 h-3 rounded-full border" style={{ backgroundColor: color.toLowerCase() === 'white' ? '#f0f0f0' : color.toLowerCase() }} title={color}></span>
                        ))}
                        {item.colors.length > 3 && <span className="text-xs text-muted-foreground">+{item.colors.length -3}</span>}
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
