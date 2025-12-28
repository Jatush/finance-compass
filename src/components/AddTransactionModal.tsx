import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/data/sampleTransactions";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, "id" | "category" | "confidence" | "reasoning">) => void;
}

export const AddTransactionModal = ({ isOpen, onClose, onAdd }: AddTransactionModalProps) => {
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!merchant || !amount) return;

    setIsLoading(true);
    
    // Simulate AI categorization
    await new Promise(resolve => setTimeout(resolve, 1000));

    const numAmount = parseFloat(amount);
    onAdd({
      date,
      merchant,
      description: description || merchant,
      amount: isExpense ? -numAmount : numAmount
    });

    setIsLoading(false);
    setMerchant("");
    setDescription("");
    setAmount("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md z-10"
          >
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Add Transaction</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Type Toggle */}
                <div className="flex bg-secondary rounded-lg p-1">
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      isExpense ? "bg-card text-foreground shadow" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsExpense(true)}
                  >
                    Expense
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      !isExpense ? "bg-card text-foreground shadow" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsExpense(false)}
                  >
                    Income
                  </button>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Merchant / Source</label>
                  <Input
                    placeholder="e.g., Whole Foods"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="bg-secondary border-border/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description (optional)</label>
                  <Input
                    placeholder="e.g., Weekly groceries"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-secondary border-border/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8 bg-secondary border-border/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-secondary border-border/50"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={!merchant || !amount || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI Categorizing...
                    </>
                  ) : (
                    "Add Transaction"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  AI will automatically categorize this transaction
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};