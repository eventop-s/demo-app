'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { PLANS } from '../../lib/plans';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);
    setSelectedPlan(planId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          email
        })
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to Eventop checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            All plans include unlimited streaming. Upgrade or cancel anytime.
          </p>

          {/* Email Input */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-sm text-gray-400 mt-2">
              We'll use this to identify your subscription
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-8 border-2 ${
                key === 'standard' 
                  ? 'border-purple-500 transform scale-105' 
                  : 'border-white/20'
              }`}
            >
              {key === 'standard' && (
                <div className="bg-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-300 ml-2">/{plan.interval}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading || !email}
                className={`w-full py-4 rounded-lg font-semibold transition ${
                  key === 'standard'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {loading && selectedPlan === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            What Happens Next?
          </h3>
          <ol className="text-gray-300 space-y-2 list-decimal list-inside">
            <li>You'll be redirected to our secure checkout page</li>
            <li>Download the Eventop app (if you don't have it)</li>
            <li>Create your subscription wallet in 2 minutes</li>
            <li>Approve the subscription in the app</li>
            <li>Start streaming immediately!</li>
          </ol>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-gray-300">
              <span className="font-semibold">Eventop</span> - On-chain subscriptions
            </div>
            <div className="text-gray-300">•</div>
            <div className="text-gray-300">
              <span className="font-semibold">Solana</span> - Fast & low-cost blockchain
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}