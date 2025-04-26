
# ⚡ Lightning Web App with WebLN

A React/Next.js application demonstrating Bitcoin Lightning Network integration using WebLN and Alby. Implements core LN functionalities like payments, keysend, auto-pay on scroll, and wallet info display.

![Demo Screenshot](/screenshot.png) 
## 🌟 Features

### Core WebLN Functionalities
- **Send Payments** - Pay Lightning invoices via WebLN
- **Keysend** - Send direct payments without invoices
- **Auto-Pay on Scroll** - Pays 1 sat per scroll event (demo mode)
- **Wallet Info** - Display connected wallet details
- **Invoice Generator** - Create LN invoices
- **Payment Form** - Input amount + LN address for payments

### Bonus Features
- 🕶️ Dark/Light mode toggle
- 📷 QR code scanner for LN invoices
- 💱 Fiat ↔ Sats converter
- 🔒 Secure WebLN provider handling

## 🛠️ Tech Stack

- **Frontend**: Next.js (or React) + TypeScript
- **Styling**: Tailwind CSS
- **Lightning**: WebLN, Alby SDK
- **QR**: `react-qr-reader`, `qrcode.react`
- **State**: React Hooks (useState, useEffect, useContext)

## 🚀 Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/Dunsin-cyber/alby-competency-test.git
   cd alby-competency-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in a WebLN-enabled browser (with Alby/NWC wallet).

## 📂 Project Structure

```
/src
├── components/       # Reusable components
│   ├── WebLNProvider # WebLN context
│   ├── Payment/      # Payment-related components
│   └── UI/           # Generic UI elements
├── app/            # Next.js page routes
│   ├── api/          # API endpoints (if using Next.js)
│   └── ...           
├── styles/           # Global styles
└── utils/            # Helper functions
```

## 🔧 WebLN Implementation Details

The app uses a custom `WebLNProvider` context to manage wallet connections:

```typescript
// Example from src/components/WebLNProvider.tsx
const { webln, enableWebln } = useWebLN();

async function handlePayment(invoice: string) {
  if (!webln) await enableWebln();
  await webln?.sendPayment(invoice);
}
```

## 🎥 Demo Video

[Watch the application walkthrough](https://www.youtube.com/watch?v=z12k1CkEZ00) 

## 🌈 Contributing

Contributions welcome! Please open an issue or PR for improvements.

## 📜 License

MIT © Dunsin 2025

