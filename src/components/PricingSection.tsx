
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Basic",
    price: "49",
    description: "Perfect for beginners and casual traders",
    features: [
      "Market data with 15-minute delay",
      "Basic AI insights",
      "5 watchlists",
      "Daily trading recommendations",
      "Email support"
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    title: "Pro",
    price: "99",
    description: "For serious traders who demand more",
    features: [
      "Real-time market data",
      "Advanced AI insights & predictions",
      "Unlimited watchlists",
      "Hourly trading signals",
      "Custom risk profiles",
      "24/7 priority support"
    ],
    popular: true,
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const
  },
  {
    title: "Enterprise",
    price: "299",
    description: "Ultimate solution for professionals",
    features: [
      "Everything in Pro plan",
      "Institutional-grade data feeds",
      "Custom AI models",
      "API access",
      "Algorithmic trading bots",
      "Dedicated account manager",
      "Custom integrations"
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(128,237,153,0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-neon">Plan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the package that best fits your trading needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                bg-dark-200 rounded-xl p-8 border transition-all
                ${plan.popular ? 'border-neon ring-1 ring-neon' : 'border-white/10 hover:border-white/20'}
                relative overflow-hidden
              `}
            >
              {plan.popular && (
                <div className="absolute top-5 right-5">
                  <span className="bg-neon text-dark-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-neon mr-2 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={plan.buttonVariant} 
                className={`w-full ${
                  plan.buttonVariant === 'default' 
                    ? 'bg-neon text-dark-300 hover:bg-neon/80' 
                    : 'border-neon text-neon hover:bg-neon/10'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400">
          All plans include a 14-day money-back guarantee. No questions asked.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
