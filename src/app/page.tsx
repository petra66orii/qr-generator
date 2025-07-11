import { QrCodeGenerator } from '@/components/qr-code-generator';
import { QrCodeIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-4 mb-4">
          <QrCodeIcon className="w-12 h-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            QRickit
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Instantly generate beautiful and functional QR codes for your URLs, Wi-Fi, contacts, and more.
        </p>
      </header>
      <main>
        <QrCodeGenerator />
      </main>
    </div>
  );
}
