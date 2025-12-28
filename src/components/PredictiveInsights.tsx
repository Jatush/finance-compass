import { motion } from "framer-motion";
import { TrendingUp, Calendar, AlertTriangle, Target } from "lucide-react";

interface Prediction {
  id: string;
  category: string;
  exhaustionDate: string;
  daysRemaining: number;
  risk: "low" | "medium" | "high";
  currentSpend: number;
  budget: number;
}

const predictions: Prediction[] = [
  {
    id: "1",
    category: "Dining",
    exhaustionDate: "Jan 18",
    daysRemaining: 3,
    risk: "high",
    currentSpend: 20500,
    budget: 25000
  },
  {
    id: "2",
    category: "Shopping",
    exhaustionDate: "Jan 25",
    daysRemaining: 10,
    risk: "medium",
    currentSpend: 33800,
    budget: 33000
  },
  {
    id: "3",
    category: "Transportation",
    exhaustionDate: "Feb 2",
    daysRemaining: 18,
    risk: "low",
    currentSpend: 8500,
    budget: 16500
  }
];

const riskConfig = {
  low: { color: "text-primary", bg: "bg-primary/10", label: "Low Risk" },
  medium: { color: "text-warning", bg: "bg-warning/10", label: "Medium Risk" },
  high: { color: "text-destructive", bg: "bg-destructive/10", label: "High Risk" }
};

export const PredictiveInsights = () => {
  const projectedEndBalance = 70000;
  const usualEndBalance = 99000;
  const variance = projectedEndBalance - usualEndBalance;

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Predictive Intelligence
          </h3>
          <p className="text-xs text-muted-foreground">AI-powered forecasting</p>
        </div>
      </div>

      {/* Month-End Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg bg-secondary/50 border border-border/50 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Month-End Forecast</span>
        </div>
        
        <div className="flex items-end gap-4">
          <div>
            <p className="text-3xl font-display font-bold">₹{projectedEndBalance.toLocaleString('en-IN')}</p>
            <p className="text-sm text-muted-foreground">Projected Balance</p>
          </div>
          <div className={`flex items-center gap-1 mb-1 ${variance < 0 ? "text-destructive" : "text-primary"}`}>
            <span className="text-sm font-medium">{variance > 0 ? "+" : ""}₹{Math.abs(variance).toLocaleString('en-IN')}</span>
            <span className="text-xs text-muted-foreground">vs usual</span>
          </div>
        </div>
      </motion.div>

      {/* Budget Exhaustion Predictions */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Budget Exhaustion Timeline
        </p>
        
        {predictions.map((prediction, index) => {
          const config = riskConfig[prediction.risk];
          
          return (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                <Calendar className={`w-4 h-4 ${config.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{prediction.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Exhausted by <span className="font-medium text-foreground">{prediction.exhaustionDate}</span>
                  <span className="mx-1">•</span>
                  {prediction.daysRemaining} days left
                </p>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${prediction.currentSpend > prediction.budget ? "text-destructive" : ""}`}>
                  ₹{prediction.currentSpend.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-muted-foreground">of ₹{prediction.budget.toLocaleString('en-IN')}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Risk Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">Overall Risk: Medium-High</p>
            <p className="text-sm text-muted-foreground mt-1">
              2 budget categories at risk of exhaustion. Consider reducing discretionary spending by ₹12,000 this week.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};