import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, HelpCircle } from "lucide-react";
import { Transaction, categoryColors } from "@/data/sampleTransactions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Recent Transactions
        </h3>
        <button className="text-xs text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 8).map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              transaction.amount > 0 ? "bg-positive/20" : "bg-secondary"
            }`}>
              {transaction.amount > 0 ? (
                <ArrowDownLeft className="w-5 h-5 text-positive" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{transaction.merchant}</p>
                {transaction.reasoning && (
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-xs">{transaction.reasoning}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                {transaction.category && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${categoryColors[transaction.category]}20`,
                        color: categoryColors[transaction.category]
                      }}
                    >
                      {transaction.category}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`font-semibold font-display ${
                transaction.amount > 0 ? "text-positive" : "text-foreground"
              }`}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              {transaction.confidence && (
                <p className="text-xs text-muted-foreground">
                  {Math.round(transaction.confidence * 100)}% conf.
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
