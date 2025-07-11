"use client";

import { useState, useMemo, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QrPreview } from '@/components/qr-preview';
import { AiAdvisor } from '@/components/ai-advisor';
import { Link, FileText, Wifi, Contact, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

type QrType = 'url' | 'text' | 'wifi' | 'contact' | 'phone';

const formSchema = z.object({
  // URL
  url: z.string().url({ message: 'Please enter a valid URL.' }).optional(),
  // Text
  text: z.string().optional(),
  // Phone
  phone: z.string().optional(),
  // Wi-Fi
  ssid: z.string().optional(),
  password: z.string().optional(),
  encryption: z.enum(['WPA', 'WEP', 'nopass']).default('WPA'),
  // Contact
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  contactPhone: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional().or(z.literal('')),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

export function QrCodeGenerator() {
  const [activeTab, setActiveTab] = useState<QrType>('url');
  const [qrData, setQrData] = useState('https://firebase.google.com');
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(1);
  const [errorCorrection, setErrorCorrection] = useState('Q');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'https://firebase.google.com',
      text: '',
      phone: '',
      ssid: '',
      password: '',
      encryption: 'WPA',
      firstName: '',
      lastName: '',
      contactPhone: '',
      email: '',
      website: '',
    },
  });

  const watchedValues = form.watch();
  
  useEffect(() => {
    const generateQrData = () => {
      const { url, text, phone, ssid, password, encryption, firstName, lastName, contactPhone, email, website } = watchedValues;
      switch (activeTab) {
        case 'url':
          return url && form.getFieldState('url').invalid === false ? url : '';
        case 'text':
          return text || '';
        case 'phone':
          return phone ? `tel:${phone}` : '';
        case 'wifi':
          return ssid ? `WIFI:T:${encryption};S:${ssid};P:${password};;` : '';
        case 'contact':
          if (!firstName || !lastName) return '';
          let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\n`;
          if (contactPhone) vcard += `TEL;TYPE=CELL:${contactPhone}\n`;
          if (email && form.getFieldState('email').invalid === false) vcard += `EMAIL:${email}\n`;
          if (website && form.getFieldState('website').invalid === false) vcard += `URL:${website}\n`;
          vcard += `END:VCARD`;
          return vcard;
        default:
          return '';
      }
    };
    const data = generateQrData();
    setQrData(data);
  }, [watchedValues, activeTab, form]);

  const TABS: { id: QrType; icon: React.ElementType; label: string }[] = [
    { id: 'url', icon: Link, label: 'URL' },
    { id: 'text', icon: FileText, label: 'Text' },
    { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
    { id: 'contact', icon: Contact, label: 'Contact' },
    { id: 'phone', icon: Phone, label: 'Phone' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3 flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Adjust the appearance of your QR code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Size: {size}px</Label>
              <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={50} max={1000} step={10} />
            </div>
            <div className="space-y-2">
              <Label>Margin: {margin} modules</Label>
              <Slider value={[margin]} onValueChange={(v) => setMargin(v[0])} min={0} max={20} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Error Correction</Label>
              <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (L)</SelectItem>
                  <SelectItem value="M">Medium (M)</SelectItem>
                  <SelectItem value="Q">Quartile (Q)</SelectItem>
                  <SelectItem value="H">High (H)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Higher levels can withstand more damage.</p>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as QrType)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto">
                {TABS.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex-col sm:flex-row gap-2 py-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Card className="mt-4">
                <CardContent className="p-6">
                  <TabsContent value="url" className="mt-0">
                    <FormField name="url" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="text" className="mt-0">
                    <FormField name="text" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text</FormLabel>
                        <FormControl><Input placeholder="Enter any text" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="phone" className="mt-0">
                     <FormField name="phone" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="wifi" className="mt-0 space-y-4">
                    <FormField name="ssid" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Network Name (SSID)</FormLabel>
                        <FormControl><Input placeholder="My Wi-Fi Network" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField name="password" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="Your network password" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField name="encryption" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Encryption</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="WPA">WPA/WPA2</SelectItem>
                            <SelectItem value="WEP">WEP</SelectItem>
                            <SelectItem value="nopass">No Password</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="contact" className="mt-0 space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField name="firstName" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField name="lastName" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl></FormItem>
                        )} />
                    </div>
                     <FormField name="contactPhone" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl></FormItem>
                    )} />
                     <FormField name="email" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField name="website" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-8">
        <QrPreview
          data={qrData}
          size={size}
          margin={margin}
          errorCorrection={errorCorrection}
        />
        <AiAdvisor qrData={qrData} />
      </div>
    </div>
  );
}

// Custom Label component to be used within this file
const Label = ({ children, ...props }: React.ComponentPropsWithoutRef<'label'>) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
    {children}
  </label>
);
