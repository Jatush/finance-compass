# FinCopilot 🚀

**AI Financial Copilot for Smart Money Management**

FinCopilot is an intelligent financial management platform that leverages AI to help users understand their spending behavior, predict future finances, and make better financial decisions with proactive guidance.

## 🎯 Problem Statement

Millions of people struggle with:
- Understanding where their money goes each month
- Predicting if they can afford purchases
- Getting timely alerts before overspending
- Making informed financial decisions without expensive advisors

## 💡 Our Solution

FinCopilot acts as your personal AI financial advisor, providing:
- **Real-time AI insights** on spending patterns and anomalies
- **Predictive intelligence** for month-end balance forecasting
- **Smart decision simulator** to evaluate purchases before buying
- **Automated transaction categorization** using AI
- **Receipt scanning** with AI-powered data extraction
- **Proactive budget alerts** to prevent overspending

## 🛠️ Google Technologies Used

### 1. **Google Gemini API** (Primary Integration)
- **AI Transaction Categorization**: Automatically categorizes transactions based on merchant names and descriptions
- **AI Insights Generation**: Analyzes spending patterns and generates personalized financial insights
- **Smart Reasoning**: Provides explanations for categorization decisions with confidence scores
- **Predictive Analytics**: Forecasts budget exhaustion dates and month-end balances

### 2. **Google Gemini Vision** (Planned/Prototype)
- **Receipt Scanning**: Extracts merchant name, amount, date, and line items from receipt images
- **OCR Processing**: Converts physical receipts to structured transaction data
- **Multi-format Support**: Handles various receipt formats and layouts

### 3. **Firebase** (Backend Infrastructure)
- **Firebase Authentication**: Secure user authentication and session management
- **Cloud Firestore**: Real-time transaction data storage and synchronization
- **Firebase Hosting**: Fast, secure web app hosting
- **Cloud Functions**: Serverless backend for AI processing

## ✨ Key Features

### 1. Financial Health Score
- Real-time calculation based on spending patterns
- Trend analysis with actionable insights
- Visual ring progress indicator

### 2. AI-Powered Insights
- **Warning Alerts**: Budget overrun predictions
- **Smart Observations**: Unusual spending pattern detection
- **Actionable Recommendations**: Personalized saving opportunities
- **Predictive Forecasting**: Month-end balance predictions

### 3. Decision Simulator
- "Can I afford this?" calculator
- Real-time budget impact analysis
- Risk assessment (Safe/Risky/Not Recommended)
- Projected balance after purchase

### 4. Smart Transaction Management
- Manual transaction entry with AI categorization
- Receipt upload with Gemini Vision extraction
- Automatic category assignment with confidence scores
- Transaction history with reasoning tooltips

### 5. Budget Tracking
- Category-wise spending breakdown
- Real-time budget utilization
- Visual progress indicators
- Exhaustion timeline predictions

## 🏗️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Lucide React for icons

**Backend:**
- Firebase (Auth, Firestore, Hosting)
- Google Gemini API for AI processing
- Cloud Functions for serverless computing

**AI/ML:**
- Google Gemini Pro for text analysis
- Google Gemini Vision for image processing
- Natural language processing for transaction categorization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Google Cloud account with Gemini API access

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fincopilot.git
cd fincopilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

6. **Deploy to Firebase**
```bash
firebase deploy
```

## 🎬 Demo Video

[Link to 3-minute demo video]

## 📊 Architecture

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Firebase      │
│   (Auth + DB)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Gemini  │
│   API (AI)      │
└─────────────────┘
```

## 🧠 AI Intelligence Features

### Transaction Categorization
```javascript
// Example: AI categorizes "Starbucks Coffee" → Dining (92% confidence)
// Reasoning: "Identified as food/beverage establishment based on merchant name"
```

### Spending Pattern Analysis
- Detects unusual spending spikes
- Identifies subscription creep
- Recognizes under-spending opportunities
- Predicts budget exhaustion dates

### Decision Intelligence
- Analyzes purchase impact on overall budget
- Considers historical spending patterns
- Evaluates emergency fund adequacy
- Provides risk-based recommendations

## 🌟 Future Enhancements

- [ ] Multi-currency support
- [ ] Bank account integration via Plaid
- [ ] Expense splitting for shared costs
- [ ] Investment portfolio tracking
- [ ] Bill payment reminders
- [ ] Custom budget goals
- [ ] Family account management
- [ ] Savings goal tracking
- [ ] Tax estimation tools
- [ ] Export to Excel/PDF

## 👥 Team

- [Team Member 1] - Full Stack Development
- [Team Member 2] - AI/ML Integration
- [Team Member 3] - UI/UX Design
- [Team Member 4] - Backend & DevOps

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Firebase for infrastructure
- The open-source community

## 📞 Contact

For questions or feedback, reach out to: [your-email@example.com]

---

**Built with ❤️ for [Hackathon Name]**

*Making financial literacy accessible to everyone through AI*