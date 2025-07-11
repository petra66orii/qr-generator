
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    name: 'Monthly',
    price: '$10',
    pricePeriod: '/month',
    features: [
      'Unlimited QR Code Generations',
      'AI Design Advisor',
      'AI Logo Generation',
      'Premium Support',
    ],
    isPopular: false,
  },
  {
    name: 'Yearly',
    price: '$100',
    pricePeriod: '/year',
    features: [
      'Unlimited QR Code Generations',
      'AI Design Advisor',
      'AI Logo Generation',
      'Premium Support',
      'Save 20% vs Monthly',
    ],
    isPopular: true,
  },
];

export default function SubscribePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setIsLoading(planName);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would handle payment and update user status in your backend.
      // Here, we'll simulate it by setting a value in localStorage.
      localStorage.setItem('isSubscribed', 'true');
      setIsLoading(null);
      toast({
        title: 'Subscription Successful!',
        description: `Welcome to QRickit Premium! You now have access to all features.`,
      });
      router.push('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          Choose Your Plan
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
          Unlock premium features and create stunning, professional QR codes.
        </p>
      </header>
      <main className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn('flex flex-col', plan.isPopular && 'border-primary ring-2 ring-primary shadow-lg')}>
                {plan.isPopular && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-t-lg rounded-b-none text-center flex items-center justify-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                    </div>
                )}
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-extrabold text-foreground">{plan.price}<span className="text-lg font-normal text-muted-foreground">{plan.pricePeriod}</span></CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                    className="w-full"
                    size="lg"
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={!!isLoading}
                >
                  {isLoading === plan.name ? 'Processing...' : `Subscribe to ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
        <footer className="text-center mt-12">
            <Button variant="link" onClick={() => router.push('/')}>
                Back to QR Generator
            </Button>
        </footer>
    </div>
  );
}
