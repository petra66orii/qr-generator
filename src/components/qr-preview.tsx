"use client";

import { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface QrPreviewProps {
  data: string;
  size: number;
  margin: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  logoUrl: string | null;
}

export function QrPreview({
  data,
  size,
  margin,
  errorCorrection,
  logoUrl,
}: QrPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(!data);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, [data, size, margin, errorCorrection, logoUrl]);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrflow-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const imageSettings = logoUrl
    ? {
        src: logoUrl,
        height: size * 0.2,
        width: size * 0.2,
        excavate: true,
      }
    : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your QR Code</CardTitle>
        <CardDescription>Preview your generated QR code below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div
          ref={canvasRef}
          className="relative w-full max-w-[300px] aspect-square rounded-lg bg-gray-50 p-4 border shadow-inner flex items-center justify-center"
        >
          {isLoading && <Skeleton className="w-full h-full" />}
          {hasError && !isLoading && (
            <div className="flex items-center justify-center w-full h-full text-center text-muted-foreground">
              <p>Please enter data to generate a QR code.</p>
            </div>
          )}
          {!hasError && !isLoading && (
            <QRCodeCanvas
              value={data}
              size={Math.min(size, 300)} // Cap size for preview
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={errorCorrection}
              includeMargin={true}
              imageSettings={imageSettings}
            />
          )}
        </div>
        <Button
          onClick={handleDownload}
          className="w-full"
          disabled={hasError || isLoading}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PNG
        </Button>
      </CardContent>
    </Card>
  );
}
