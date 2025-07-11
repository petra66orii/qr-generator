"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getQrCodeAdvice } from '@/app/actions';
import { type QrCodeDesignAdvisorOutput } from '@/ai/flows/qr-code-design-advisor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const advisorSchema = z.object({
  useCase: z.string().min(10, 'Please describe your use case in at least 10 characters.'),
});

interface AiAdvisorProps {
  qrData: string;
}

export function AiAdvisor({ qrData }: AiAdvisorProps) {
  const [advice, setAdvice] = useState<QrCodeDesignAdvisorOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof advisorSchema>>({
    resolver: zodResolver(advisorSchema),
    defaultValues: {
      useCase: '',
    },
  });

  const onSubmit = (values: z.infer<typeof advisorSchema>) => {
    if (!qrData) {
      toast({
        variant: 'destructive',
        title: 'No QR Data',
        description: 'Please enter some data to generate a QR code first.',
      });
      return;
    }

    startTransition(async () => {
      setAdvice(null);
      try {
        const result = await getQrCodeAdvice({
          data: qrData,
          useCase: values.useCase,
        });
        setAdvice(result);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'AI Advisor Error',
          description: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI-Powered Design Tool
        </CardTitle>
        <CardDescription>Get AI suggestions for optimal QR code design based on your use case.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your use case?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., On a business card, for a marketing poster, a restaurant menu..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Getting Advice...' : 'Get AI Advice'}
            </Button>
          </form>
        </Form>

        {isPending && (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        {advice && (
          <div className="mt-6 space-y-4 text-sm animate-in fade-in">
            <div>
              <h4 className="font-semibold text-foreground">Size Recommendation</h4>
              <p className="text-muted-foreground">{advice.sizeRecommendation}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Color Recommendation</h4>
              <p className="text-muted-foreground">{advice.colorRecommendation}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Style Recommendation</h4>
              <p className="text-muted-foreground">{advice.styleRecommendation}</p>
            </div>
            {advice.additionalTips && (
              <div>
                <h4 className="font-semibold text-foreground">Additional Tips</h4>
                <p className="text-muted-foreground">{advice.additionalTips}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
