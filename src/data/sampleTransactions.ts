export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  description: string;
  amount: number;
  category?: string;
  confidence?: number;
  reasoning?: string;
}

export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-28",
    merchant: "Whole Foods Market",
    description: "Grocery shopping",
    amount: -127.54,
    category: "Groceries",
    confidence: 0.95,
    reasoning: "Large grocery chain, typical weekly shopping amount"
  },
  {
    id: "2",
    date: "2024-01-27",
    merchant: "Netflix",
    description: "Monthly subscription",
    amount: -15.99,
    category: "Subscriptions",
    confidence: 0.99,
    reasoning: "Recurring streaming service payment"
  },
  {
    id: "3",
    date: "2024-01-26",
    merchant: "Shell Gas Station",
    description: "Fuel purchase",
    amount: -58.32,
    category: "Transportation",
    confidence: 0.97,
    reasoning: "Gas station transaction, fuel expense"
  },
  {
    id: "4",
    date: "2024-01-25",
    merchant: "Uber Eats",
    description: "Food delivery",
    amount: -34.50,
    category: "Dining",
    confidence: 0.98,
    reasoning: "Food delivery service, restaurant expense"
  },
  {
    id: "5",
    date: "2024-01-24",
    merchant: "Amazon",
    description: "Online purchase",
    amount: -89.99,
    category: "Shopping",
    confidence: 0.85,
    reasoning: "E-commerce purchase, general shopping"
  },
  {
    id: "6",
    date: "2024-01-23",
    merchant: "Starbucks",
    description: "Coffee",
    amount: -7.45,
    category: "Dining",
    confidence: 0.99,
    reasoning: "Coffee shop, dining/beverage expense"
  },
  {
    id: "7",
    date: "2024-01-22",
    merchant: "Spotify",
    description: "Premium subscription",
    amount: -10.99,
    category: "Subscriptions",
    confidence: 0.99,
    reasoning: "Music streaming subscription"
  },
  {
    id: "8",
    date: "2024-01-21",
    merchant: "Con Edison",
    description: "Electric bill",
    amount: -145.00,
    category: "Utilities",
    confidence: 0.98,
    reasoning: "Utility company, electricity payment"
  },
  {
    id: "9",
    date: "2024-01-20",
    merchant: "Chipotle",
    description: "Lunch",
    amount: -14.25,
    category: "Dining",
    confidence: 0.99,
    reasoning: "Fast casual restaurant"
  },
  {
    id: "10",
    date: "2024-01-19",
    merchant: "Apple Store",
    description: "AirPods Pro",
    amount: -249.00,
    category: "Shopping",
    confidence: 0.92,
    reasoning: "Electronics purchase, discretionary spending"
  },
  {
    id: "11",
    date: "2024-01-18",
    merchant: "Gym Membership",
    description: "Monthly fee",
    amount: -49.99,
    category: "Health",
    confidence: 0.97,
    reasoning: "Fitness subscription, health expense"
  },
  {
    id: "12",
    date: "2024-01-17",
    merchant: "Target",
    description: "Household items",
    amount: -67.32,
    category: "Shopping",
    confidence: 0.88,
    reasoning: "Retail store, household supplies"
  },
  {
    id: "13",
    date: "2024-01-16",
    merchant: "DoorDash",
    description: "Dinner delivery",
    amount: -42.80,
    category: "Dining",
    confidence: 0.98,
    reasoning: "Food delivery service"
  },
  {
    id: "14",
    date: "2024-01-15",
    merchant: "Salary Deposit",
    description: "Monthly salary",
    amount: 5200.00,
    category: "Income",
    confidence: 0.99,
    reasoning: "Regular salary deposit"
  },
  {
    id: "15",
    date: "2024-01-14",
    merchant: "AT&T",
    description: "Phone bill",
    amount: -85.00,
    category: "Utilities",
    confidence: 0.97,
    reasoning: "Telecom provider, phone service"
  },
  {
    id: "16",
    date: "2024-01-13",
    merchant: "Landlord Payment",
    description: "Rent",
    amount: -1800.00,
    category: "Rent",
    confidence: 0.99,
    reasoning: "Housing payment, fixed expense"
  },
  {
    id: "17",
    date: "2024-01-12",
    merchant: "Delta Airlines",
    description: "Flight booking",
    amount: -385.00,
    category: "Travel",
    confidence: 0.98,
    reasoning: "Airline ticket purchase"
  },
  {
    id: "18",
    date: "2024-01-11",
    merchant: "CVS Pharmacy",
    description: "Medications",
    amount: -23.50,
    category: "Health",
    confidence: 0.94,
    reasoning: "Pharmacy purchase, health expense"
  },
  {
    id: "19",
    date: "2024-01-10",
    merchant: "Uber",
    description: "Ride to airport",
    amount: -45.00,
    category: "Transportation",
    confidence: 0.98,
    reasoning: "Rideshare service, transportation"
  },
  {
    id: "20",
    date: "2024-01-09",
    merchant: "HBO Max",
    description: "Streaming subscription",
    amount: -15.99,
    category: "Subscriptions",
    confidence: 0.99,
    reasoning: "Streaming service subscription"
  }
];

export const categoryColors: Record<string, string> = {
  Groceries: "hsl(160, 84%, 39%)",
  Subscriptions: "hsl(217, 91%, 60%)",
  Transportation: "hsl(38, 92%, 50%)",
  Dining: "hsl(340, 82%, 52%)",
  Shopping: "hsl(280, 87%, 60%)",
  Utilities: "hsl(190, 90%, 50%)",
  Health: "hsl(150, 80%, 45%)",
  Rent: "hsl(0, 72%, 51%)",
  Travel: "hsl(200, 90%, 55%)",
  Income: "hsl(160, 84%, 39%)",
};

export const budgets: Record<string, number> = {
  Groceries: 500,
  Dining: 300,
  Shopping: 400,
  Transportation: 200,
  Subscriptions: 100,
  Utilities: 300,
  Health: 150,
  Travel: 500,
  Entertainment: 200,
};
