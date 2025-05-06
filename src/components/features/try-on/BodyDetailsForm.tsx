'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const bodyDetailsSchema = z.object({
  height: z.string().min(1, "Height is required").regex(/^\d+$/, "Height must be a number"),
  weight: z.string().min(1, "Weight is required").regex(/^\d+$/, "Weight must be a number"),
});

type BodyDetailsFormData = z.infer<typeof bodyDetailsSchema>;

interface BodyDetailsFormProps {
  onSubmit: (data: BodyDetailsFormData) => void;
}

export function BodyDetailsForm({ onSubmit }: BodyDetailsFormProps) {
  const form = useForm<BodyDetailsFormData>({
    resolver: zodResolver(bodyDetailsSchema),
    defaultValues: {
      height: '',
      weight: '',
    },
  });
  const { toast } = useToast();

  const handleFormSubmit: SubmitHandler<BodyDetailsFormData> = (data) => {
    onSubmit(data);
    toast({
      title: "Body Details Saved",
      description: "Your height and weight have been recorded.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="height">Height (cm)</FormLabel>
              <FormControl>
                <Input id="height" type="number" placeholder="e.g., 175" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="weight">Weight (kg)</FormLabel>
              <FormControl>
                <Input id="weight" type="number" placeholder="e.g., 70" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Details
        </Button>
      </form>
    </Form>
  );
}
