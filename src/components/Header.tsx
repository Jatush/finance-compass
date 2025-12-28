import { motion } from "framer-motion";
import { Bell, Settings, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddTransaction: () => void;
  onUploadReceipt: () => void;
}

export const Header = ({ onAddTransaction, onUploadReceipt }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/30 backdrop-blur-lg sticky top-0 z-50"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center glow-primary">
            <span className="text-xl font-display font-bold text-primary-foreground">F</span>
          </div>
          <div>
            <h1 className="text-xl font-display font-bold">FinCopilot</h1>
            <p className="text-xs text-muted-foreground">AI Financial Copilot</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="glass" size="sm" onClick={onUploadReceipt}>
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Receipt</span>
        </Button>
        
        <Button variant="default" size="sm" onClick={onAddTransaction}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>

        <div className="w-px h-6 bg-border/50 mx-2 hidden sm:block" />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  );
};
