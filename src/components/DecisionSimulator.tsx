import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SimulationResult {
  recommendation: "safe" | "risky" | "not_recommended";
  currentBalance: number;
  projectedBalance: number;
  budgetImpact: string;
  reasoning: string;
}

export const DecisionSimulator = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    if (!amount) return;

    setIsSimulating(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const purchaseAmount = parseFloat(amount);
    const currentBalance = 234587.50; // Indian amount
    const projectedBalance = currentBalance - purchaseAmount;
    
    let recommendation: SimulationResult["recommendation"];
    let reasoning: string;
    let budgetImpact: string;

    if (purchaseAmount > currentBalance) {
      recommendation = "not_recommended";
      reasoning = "This purchase would put your account into overdraft. Consider waiting until your next income deposit.";
      budgetImpact = "Would exceed available balance";
    } else if (projectedBalance < 50000) {
      recommendation = "risky";
      reasoning = "This purchase would leave you with a low safety buffer. Unexpected expenses could cause issues.";
      budgetImpact = "Shopping budget would be 120% exhausted";
    } else if (purchaseAmount > 20000) {
      recommendation = "risky";
      reasoning = "Large discretionary purchase. Your month-end forecast already shows a shortfall vs usual.";
      budgetImpact = "Would reduce projected month-end balance by 35%";
    } else {
      recommendation = "safe";
      reasoning = "This purchase fits within your budget and maintains a healthy safety buffer.";
      budgetImpact = "Within shopping budget allocation";
    }

    setResult({
      recommendation,
      currentBalance,
      projectedBalance,
      budgetImpact,
      reasoning
    });

    setIsSimulating(false);
  };

  const resultConfig = {
    safe: {
      icon: CheckCircle,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      label: "Safe to Purchase"
    },
    risky: {
      icon: AlertCircle,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/30",
      label: "Risky Purchase"
    },
    not_recommended: {
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      label: "Not Recommended"
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Decision Simulator
          </h3>
          <p className="text-xs text-muted-foreground">"Can I afford this?"</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Purchase Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 bg-secondary border-border/50 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">What's it for? (optional)</label>
          <Input
            type="text"
            placeholder="e.g., New headphones"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-secondary border-border/50 focus:border-primary"
          />
        </div>

        <Button 
          onClick={handleSimulate} 
          disabled={!amount || isSimulating}
          className="w-full"
        >
          {isSimulating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Simulate Purchase"
          )}
        </Button>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg border ${resultConfig[result.recommendation].bg} ${resultConfig[result.recommendation].border}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {(() => {
                  const Icon = resultConfig[result.recommendation].icon;
                  return <Icon className={`w-5 h-5 ${resultConfig[result.recommendation].color}`} />;
                })()}
                <span className={`font-semibold ${resultConfig[result.recommendation].color}`}>
                  {resultConfig[result.recommendation].label}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-medium">₹{result.currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">After Purchase</span>
                  <span className={`font-medium ${result.projectedBalance < 50000 ? "text-destructive" : ""}`}>
                    ₹{result.projectedBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Impact</span>
                  <span className="font-medium text-right max-w-[60%]">{result.budgetImpact}</span>
                </div>
                
                <div className="pt-3 border-t border-border/50">
                  <p className="text-muted-foreground leading-relaxed">{result.reasoning}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};