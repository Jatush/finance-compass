import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtractedData {
  merchant: string;
  amount: number;
  date: string;
  items: string[];
  confidence: number;
}

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtract: (data: ExtractedData) => void;
}

export const UploadReceiptModal = ({ isOpen, onClose, onExtract }: UploadReceiptModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    // Simulate Gemini Vision processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockExtracted: ExtractedData = {
      merchant: "Trader Joe's",
      amount: 67.42,
      date: new Date().toISOString().split("T")[0],
      items: ["Organic Milk", "Sourdough Bread", "Avocados (3)", "Greek Yogurt"],
      confidence: 0.94
    };

    setExtractedData(mockExtracted);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    if (extractedData) {
      onExtract(extractedData);
      resetState();
      onClose();
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setPreview(null);
    setExtractedData(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold">Upload Receipt</h2>
                  <p className="text-sm text-muted-foreground">AI will extract transaction details</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {!extractedData ? (
                <div className="space-y-4">
                  {/* Upload Zone */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      isDragging 
                        ? "border-primary bg-primary/5" 
                        : preview 
                        ? "border-border/50"
                        : "border-border/50 hover:border-muted-foreground"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                      }}
                    />

                    {preview ? (
                      <div className="relative">
                        <img 
                          src={preview} 
                          alt="Receipt preview" 
                          className="max-h-48 mx-auto rounded-lg object-contain"
                        />
                        <div className="mt-3 text-sm text-muted-foreground">
                          {selectedFile?.name}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium mb-2">Drop your receipt here</p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse • PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </div>

                  <Button 
                    onClick={handleProcess} 
                    disabled={!selectedFile || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Extracting with Gemini Vision...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Process Receipt
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Extraction Complete</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {Math.round(extractedData.confidence * 100)}% confidence
                    </span>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Merchant</span>
                      <span className="font-medium">{extractedData.merchant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold text-lg">${extractedData.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{extractedData.date}</span>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                      <span className="text-muted-foreground text-sm">Items detected:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {extractedData.items.map((item, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 bg-card rounded-full border border-border/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={resetState} className="flex-1">
                      Try Again
                    </Button>
                    <Button onClick={handleConfirm} className="flex-1">
                      Add Transaction
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
