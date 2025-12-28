import { motion } from "framer-motion";
import { Wallet, TrendingDown, ArrowUpRight, PiggyBank } from "lucide-react";

interface QuickStatsProps {
  balance: number;
  monthlySpending: number;
  monthlyIncome: number;
  savingsRate: number;
}

export const QuickStats = ({ balance, monthlySpending, monthlyIncome, savingsRate }: QuickStatsProps) => {
  const stats = [
    {
      label: "Current Balance",
      value: `₹${balance.toLocaleString('en-IN')}`,
      change: "+2.4%",
      positive: true,
      icon: Wallet,
      color: "text-primary"
    },
    {
      label: "Monthly Spending",
      value: `₹${monthlySpending.toLocaleString('en-IN')}`,
      change: "+12%",
      positive: false,
      icon: TrendingDown,
      color: "text-destructive"
    },
    {
      label: "Monthly Income",
      value: `₹${monthlyIncome.toLocaleString('en-IN')}`,
      change: "Stable",
      positive: true,
      icon: ArrowUpRight,
      color: "text-positive"
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      change: "-3%",
      positive: false,
      icon: PiggyBank,
      color: "text-accent"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card-elevated p-4 stat-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className={`text-xs font-medium ${stat.positive ? "text-positive" : "text-destructive"}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-display font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};