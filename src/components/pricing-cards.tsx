// components/pricing-cards.tsx
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { useAuth } from "@/contexts/auth-context";
import { getStripe } from "@/lib/stripe-client";

interface PricingCardsProps {
  onSelectPlan?: (planId: string) => void;
}

export function PricingCards({ onSelectPlan }: PricingCardsProps) {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const currentPlan = userProfile?.subscription?.plan || "free";

  const handleSelectPlan = async (planId: string) => {
    if (!user) {
      // Redirect to login or show auth modal
      onSelectPlan?.(planId);
      return;
    }

    if (planId === "FREE") {
      // Handle free plan selection if needed
      return;
    }

    setLoading(planId);

    try {
      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          userId: user.uid,
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirect error:", error);
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    setLoading("manage");

    try {
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error accessing customer portal:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Free Plan */}
      <Card className="relative">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {PLANS.FREE.name}
            {currentPlan === "free" && (
              <Badge variant="secondary">Current Plan</Badge>
            )}
          </CardTitle>
          <CardDescription>Perfect for getting started</CardDescription>
          <div className="text-3xl font-bold">
            ${PLANS.FREE.price}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {PLANS.FREE.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={currentPlan === "free" ? "secondary" : "outline"}
            disabled={currentPlan === "free"}
          >
            {currentPlan === "free" ? "Current Plan" : "Get Started"}
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Monthly */}
      <Card className="relative border-primary">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {PLANS.PREMIUM_MONTHLY.name}
            {currentPlan === "premium" && (
              <Badge variant="secondary">Current Plan</Badge>
            )}
          </CardTitle>
          <CardDescription>For serious QR code creators</CardDescription>
          <div className="text-3xl font-bold">
            ${PLANS.PREMIUM_MONTHLY.price}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {PLANS.PREMIUM_MONTHLY.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {currentPlan === "premium" ? (
            <Button
              className="w-full"
              variant="outline"
              onClick={handleManageSubscription}
              disabled={loading === "manage"}
            >
              {loading === "manage" ? "Loading..." : "Manage Subscription"}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => handleSelectPlan("PREMIUM_MONTHLY")}
              disabled={loading === "PREMIUM_MONTHLY"}
            >
              {loading === "PREMIUM_MONTHLY"
                ? "Loading..."
                : "Upgrade to Premium"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Premium Yearly */}
      <Card className="relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary">
            <Zap className="h-3 w-3 mr-1" />
            Best Value
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {PLANS.PREMIUM_YEARLY.name}
            {currentPlan === "premium" && (
              <Badge variant="secondary">Current Plan</Badge>
            )}
          </CardTitle>
          <CardDescription>Save 33% with annual billing</CardDescription>
          <div className="text-3xl font-bold">
            ${PLANS.PREMIUM_YEARLY.price}
            <span className="text-sm font-normal text-muted-foreground">
              /year
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Only $3.33/month • Save $19.89
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {PLANS.PREMIUM_YEARLY.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {currentPlan === "premium" ? (
            <Button
              className="w-full"
              variant="outline"
              onClick={handleManageSubscription}
              disabled={loading === "manage"}
            >
              {loading === "manage" ? "Loading..." : "Manage Subscription"}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => handleSelectPlan("PREMIUM_YEARLY")}
              disabled={loading === "PREMIUM_YEARLY"}
            >
              {loading === "PREMIUM_YEARLY"
                ? "Loading..."
                : "Upgrade to Premium"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
