import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HealthScoreProps {
  score: number;
  trend: "up" | "down" | "stable";
  change: number;
}

export const HealthScore = ({ score, trend, change }: HealthScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-positive";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-positive" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="card-elevated p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary to-transparent" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Financial Health
          </h3>
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span>{change > 0 ? "+" : ""}{change}%</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Score Ring */}
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {/* Progress ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 264" }}
                animate={{ strokeDasharray: `${(score / 100) * 264} 264` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(160, 84%, 39%)" />
                  <stop offset="100%" stopColor="hsl(180, 70%, 35%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className={`text-3xl font-display font-bold ${getScoreColor()}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {score}
              </motion.span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1">
            <motion.p 
              className={`text-xl font-display font-semibold mb-2 ${getScoreColor()}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getScoreLabel()}
            </motion.p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your spending is well-balanced. Dining expenses are slightly elevated this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
