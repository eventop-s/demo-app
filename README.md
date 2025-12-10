# StreamFlix Demo - Eventop Integration Example

A demo merchant website showcasing on-chain subscriptions powered by Eventop Protocol.

## Features

- 🎬 Complete subscription flow (Pricing → Checkout → Success)
- 💳 Real Eventop SDK integration
- 🔔 Webhook event handling
- 📊 Admin dashboard for webhook logs
- 👤 User account page with subscription details
- 🎨 Beautiful, production-ready UI

## Quick Start

### 1. Prerequisites

- Node.js 18+ and npm
- Eventop merchant account ([dashboard.eventop.xyz](https://dashboard.eventop.xyz))
- Solana wallet (Devnet for testing)

### 2. Installation
```bash
git clone https://github.com/eventop-s/demo-app.git
cd demo-app
yarn install
```

### 3. Environment Setup

Create `.env.local`:
```bash
# Eventop Configuration (Devnet)
EVENTOP_API_KEY=sk_test_your_key_here
EVENTOP_WEBHOOK_SECRET=whsec_test_your_secret_here
MERCHANT_WALLET=YourDevnetWalletAddress

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_EVENTOP_ENV=devnet
```

### 4. Create Subscription Plans

Before running the app, create plans in the Eventop dashboard:

1. Go to [dashboard-devnet.eventop.xyz](https://dashboard-devnet.eventop.xyz)
2. Create three plans with these IDs:
   - `basic-monthly` - $9.99/month
   - `standard-monthly` - $15.99/month
   - `premium-monthly` - $19.99/month

### 5. Setup Webhook Endpoint

For local development, use [ngrok](https://ngrok.com):
```bash
# In a separate terminal
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Add to Eventop dashboard: https://abc123.ngrok.io/api/webhooks/eventop
```

### 6. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the Flow

1. **Visit Homepage** - See the landing page
2. **Go to Pricing** - Enter your email and select a plan
3. **Checkout** - You'll be redirected to Eventop checkout
4. **Download App** - Get the Eventop mobile app (devnet mode)
5. **Complete Subscription** - Approve in the app
6. **Success** - Return to StreamFlix success page
7. **Check Account** - View your subscription details

## Project Structure
```
streamflix-demo/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── pricing/page.tsx         # Plans & checkout
│   ├── success/page.tsx         # Post-checkout
│   ├── account/page.tsx         # User dashboard
│   ├── admin/page.tsx           # Webhook logs
│   ├── how-it-works/page.tsx    # Explainer
│   └── api/
│       ├── checkout/route.ts    # Create session
│       └── webhooks/eventop/route.ts  # Handle webhooks
├── lib/
│   ├── eventop.ts              # SDK configuration
│   └── db.ts                   # Demo database
└── components/                  # Reusable UI components
```

## Key Files

### API Routes

- **`/api/checkout`** - Creates Eventop checkout sessions
- **`/api/webhooks/eventop`** - Receives subscription events

### Pages

- **`/`** - Landing page with features
- **`/pricing`** - Subscription plans
- **`/success`** - Post-subscription confirmation
- **`/account`** - User subscription management
- **`/admin`** - Webhook logs and stats
- **`/how-it-works`** - Educational content

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```
## Going to Production

1. **Switch to Mainnet**
   - Get mainnet API key (`sk_live_...`)
   - Update environment variables
   - Use mainnet wallet address

2. **Update URLs**
   - Set `NEXT_PUBLIC_APP_URL` to your domain
   - Update success/cancel URLs

3. **Configure Webhook**
   - Use your production domain
   - Ensure HTTPS is enabled

4. **Test Thoroughly**
   - Do test transactions on mainnet with small amounts
   - Monitor webhook logs
   - Verify all flows work


### Add Features

- User authentication (NextAuth.js)
- Database (Prisma + PostgreSQL)
- Email notifications (Resend, SendGrid)
- Analytics (PostHog, Mixpanel)

## Troubleshooting

### Webhooks Not Received

- Verify webhook URL is publicly accessible
- Check Eventop dashboard for delivery errors
- Use ngrok for local development
- Ensure endpoint returns 200 status

### Checkout Session Expired

- Sessions expire after 30 minutes
- User must complete checkout before expiry
- Create new session if expired

### API Key Errors

- Ensure key starts with `sk_test_` for devnet
- Check key is set in environment variables
- Verify key hasn't been revoked

## Support

- **Documentation**: [docs.eventop.xyz](https://docs.eventop.xyz)
- **Email**: contact@eventop.xyz
- **Discord**: [Join our community](#)

## License

MIT - feel free to use as a template for your own integration