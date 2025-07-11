"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface QrPreviewProps {
  data: string;
  size: number;
  margin: number;
  errorCorrection: string;
}

export function QrPreview({ data, size, margin, errorCorrection }: QrPreviewProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      setHasError(false);
      const encodedData = encodeURIComponent(data);
      const base = 'https://api.qrserver.com/v1/create-qr-code/';
      const params = `?data=${encodedData}&size=${size}x${size}&ecc=${errorCorrection}&margin=${margin}`;
      
      // We use SVG for preview for better quality and PNG for download.
      setImageUrl(`${base}${params}&format=svg`);
      setDownloadUrl(`${base}${params}&format=png`);
    } else {
      setIsLoading(false);
      setHasError(true);
      setImageUrl('');
      setDownloadUrl('');
    }
  }, [data, size, margin, errorCorrection]);

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Your QR Code</CardTitle>
        <CardDescription>Preview your generated QR code below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-[300px] aspect-square rounded-lg bg-gray-50 p-4 border shadow-inner">
          {isLoading && <Skeleton className="w-full h-full" />}
          {hasError && !isLoading && (
             <div className="flex items-center justify-center w-full h-full text-center text-muted-foreground">
                <p>Please enter data to generate a QR code.</p>
             </div>
          )}
          {!hasError && (
             <Image
                src={imageUrl}
                alt="Generated QR Code"
                width={300}
                height={300}
                className={cn('w-full h-auto transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                unoptimized // Necessary for SVGs in next/image
              />
          )}
        </div>
        <Button 
          asChild 
          className="w-full"
          disabled={!downloadUrl || hasError || isLoading}
        >
          <a href={downloadUrl} download="qrickit-code.png">
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
