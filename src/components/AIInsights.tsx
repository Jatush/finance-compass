import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, TrendingDown, Lightbulb, Brain, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Insight {
  id: string;
  type: "warning" | "insight" | "action" | "prediction";
  title: string;
  description: string;
  observation?: string;
  reasoning?: string;
  action?: string;
  timestamp: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    type: "warning",
    title: "Dining Budget Alert",
    description: "You've spent 82% of your dining budget in just 10 days.",
    observation: "Detected 6 food delivery transactions totaling ₹11,850 this week",
    reasoning: "At current pace, you'll exceed budget by ~₹15,000 before month end",
    action: "Consider meal prepping or setting a daily spending limit of ₹1,200",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: "prediction",
    title: "Month-End Forecast",
    description: "Projected balance: ₹70,000 (down from usual ₹99,000)",
    observation: "Unusual spending spike detected on Jan 10 (Electronics: ₹20,700)",
    reasoning: "Large discretionary purchase combined with elevated dining expenses",
    action: "Reduce non-essential spending by ₹8,300 to maintain target balance",
    timestamp: "4 hours ago"
  },
  {
    id: "3",
    type: "insight",
    title: "Subscription Creep Detected",
    description: "Your subscriptions have increased 25% over 3 months.",
    observation: "Netflix, Spotify, Prime = ₹3,550/month recurring",
    reasoning: "Multiple streaming services may have overlapping content",
    action: "Consider rotating subscriptions instead of maintaining all",
    timestamp: "1 day ago"
  },
  {
    id: "4",
    type: "action",
    title: "Smart Savings Opportunity",
    description: "Your grocery spending is 15% below budget this month.",
    observation: "Only ₹10,600 spent vs ₹41,500 budget (74% remaining)",
    reasoning: "Consistent pattern of under-spending in this category",
    action: "Transfer ₹4,100 to savings while maintaining buffer",
    timestamp: "1 day ago"
  }
];

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30"
  },
  insight: {
    icon: Lightbulb,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30"
  },
  action: {
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30"
  },
  prediction: {
    icon: TrendingDown,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30"
  }
};

export const AIInsights = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="card-elevated p-6 ai-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <Brain className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            AI Insights
          </h3>
          <p className="text-xs text-muted-foreground">Powered by Gemini</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockInsights.map((insight, index) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;
          const isExpanded = expandedId === insight.id;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${config.bg} ${config.border} cursor-pointer transition-all hover:scale-[1.01]`}
              onClick={() => setExpandedId(isExpanded ? null : insight.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                          {insight.observation && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                🔍 Observation
                              </p>
                              <p className="text-sm">{insight.observation}</p>
                            </div>
                          )}
                          {insight.reasoning && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                🧠 Reasoning
                              </p>
                              <p className="text-sm">{insight.reasoning}</p>
                            </div>
                          )}
                          {insight.action && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                ⚡ Recommended Action
                              </p>
                              <p className="text-sm text-primary">{insight.action}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <p className="text-xs text-muted-foreground mt-2">{insight.timestamp}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};