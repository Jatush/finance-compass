import { motion } from "framer-motion";
import { categoryColors, budgets } from "@/data/sampleTransactions";

interface CategorySpending {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

interface SpendingBreakdownProps {
  categorySpending: CategorySpending[];
}

export const SpendingBreakdown = ({ categorySpending }: SpendingBreakdownProps) => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-warning";
    return "bg-primary";
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 100) return "Over Budget";
    if (percentage >= 80) return "At Risk";
    return "On Track";
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Budget Overview
        </h3>
        <span className="text-xs text-muted-foreground">This Month</span>
      </div>

      <div className="space-y-4">
        {categorySpending.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[item.category] || "hsl(var(--muted))" }}
                />
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  ₹{Math.abs(item.spent).toFixed(0)} / ₹{item.budget}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.percentage >= 100 
                    ? "bg-destructive/20 text-destructive" 
                    : item.percentage >= 80 
                    ? "bg-warning/20 text-warning"
                    : "bg-primary/20 text-primary"
                }`}>
                  {getStatusText(item.percentage)}
                </span>
              </div>
            </div>
            
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getStatusColor(item.percentage)}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(item.percentage, 100)}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};