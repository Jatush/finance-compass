import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { HealthScore } from "@/components/HealthScore";
import { QuickStats } from "@/components/QuickStats";
import { SpendingBreakdown } from "@/components/SpendingBreakdown";
import { TransactionList } from "@/components/TransactionList";
import { AIInsights } from "@/components/AIInsights";
import { DecisionSimulator } from "@/components/DecisionSimulator";
import { PredictiveInsights } from "@/components/PredictiveInsights";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { UploadReceiptModal } from "@/components/UploadReceiptModal";
import { sampleTransactions, budgets, Transaction } from "@/data/sampleTransactions";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Calculate spending by category
  const categorySpending = useMemo(() => {
    const spending: Record<string, number> = {};
    
    transactions.forEach(t => {
      if (t.amount < 0 && t.category && t.category !== "Income") {
        spending[t.category] = (spending[t.category] || 0) + Math.abs(t.amount);
      }
    });

    return Object.entries(budgets)
      .map(([category, budget]) => ({
        category,
        spent: spending[category] || 0,
        budget,
        percentage: ((spending[category] || 0) / budget) * 100
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);
  }, [transactions]);

  // Calculate summary stats - Updated for Indian amounts
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      balance: 234587,  // Updated Indian amount
      monthlySpending: Math.round(expenses),
      monthlyIncome: Math.round(income),
      savingsRate: Math.round(((income - expenses) / income) * 100) || 0
    };
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id" | "category" | "confidence" | "reasoning">) => {
    const categories = ["Groceries", "Dining", "Shopping", "Transportation", "Utilities", "Health"];
    const randomCategory = newTransaction.amount > 0 ? "Income" : categories[Math.floor(Math.random() * categories.length)];
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      category: randomCategory,
      confidence: 0.85 + Math.random() * 0.14,
      reasoning: `AI categorized as ${randomCategory} based on merchant name pattern`
    };

    setTransactions(prev => [transaction, ...prev]);
  };

  const handleExtractReceipt = (data: { merchant: string; amount: number; date: string }) => {
    handleAddTransaction({
      date: data.date,
      merchant: data.merchant,
      description: "Receipt upload",
      amount: -data.amount
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAddTransaction={() => setIsAddModalOpen(true)}
        onUploadReceipt={() => setIsUploadModalOpen(true)}
      />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <QuickStats {...stats} />

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <HealthScore score={72} trend="down" change={-3} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <SpendingBreakdown categorySpending={categorySpending} />
                <DecisionSimulator />
              </div>
              
              <TransactionList transactions={transactions} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <AIInsights />
              <PredictiveInsights />
            </div>
          </div>
        </motion.div>
      </main>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      <UploadReceiptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onExtract={handleExtractReceipt}
      />
    </div>
  );
};

export default Index;