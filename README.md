# Philo Coffee Shop — POS Dashboard (Frontend)

A **product-grade Point-of-Sale dashboard** built with React + Vite + TypeScript, featuring real-time analytics, order management, inventory alerts, and a full POS register workflow.

---

## Tech Stack

| | |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Routing** | React Router 6 |
| **Data Fetching** | TanStack React Query 5 |
| **Charts** | Recharts |
| **Styling** | Vanilla CSS (CSS variables design system) |
| **Icons** | Lucide React |
| **Testing** | Vitest + @testing-library/react |

---

## Prerequisites

- **Node.js** v18+

By default, the frontend is configured to connect to the deployed backend on Railway:
`https://philo-coffee-shop-production-dd93.up.railway.app/api/v1`

If you want to run the backend locally, you can start it separately and change the environment variable.

---

## Setup & Run Locally

```bash
# 1. Navigate to the frontend folder
cd philo-pos-frontend-task

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**
It will automatically use the Railway deployed backend, so all APIs will work out of the box.

---

## Environment Variables

No `.env` file is required by default. The backend API base URL is configured in `src/lib/api.ts`:

```ts
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://philo-coffee-shop-production-dd93.up.railway.app/api/v1";
```

To use a local backend, create a `.env` file in the root folder and add:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## How to Run Tests

```bash
npm test
```

This runs all 3 test suites using Vitest:

| Test File | What it covers |
|---|---|
| `tests/orderStatus.test.ts` | **Operational workflow** — validates order lifecycle transitions (pending→preparing→ready→completed, terminal states) |
| `tests/dateFilter.test.ts` | **Dashboard logic** — verifies preset date ranges produce correct `startDate`/`endDate` strings sent to API |
| `tests/cartCalculations.test.ts` | **UI state / business logic** — subtotal, percentage discount, flat discount, tax (8%), and total calculations |

---

## Pages & Features

### 📊 Dashboard (`/`)
- KPI cards: Revenue, Orders, Avg Order Value, Customers
- **6 real-time charts** (all connected to live API endpoints):
  - Revenue Over Time (`/dashboard/revenue`)
  - Daily Order Trends (`/dashboard/order-trends`)
  - Top Selling Items (`/dashboard/top-items`)
  - Payment Methods breakdown (`/dashboard/payment-breakdown`)
  - Hourly Order Heatmap (`/dashboard/hourly-heatmap`)
  - Revenue by Category Radar Chart (`/dashboard/top-categories`)
- Date range filter (7D / 30D / 90D presets + custom date picker)
- Inventory Alerts panel (`/dashboard/inventory-alerts`)

### 📋 Orders (`/orders`)
- List all orders with status, date, and payment method filters
- Pagination with 15 orders per page
- Click any row to open a full Order Details modal
- Update order status via lifecycle buttons (pending → preparing → ready → completed)

### 🖥️ Register — POS (`/register`)
- Browse menu items by category
- Click an item to open an Add-On modal (select add-ons + set quantity)
- Cart sidebar with live totals (subtotal, discount, 8% tax, total)
- Optional customer and discount selection
- Payment method selector (Cash / Card / Mobile)
- Submit order to backend and see confirmation with backend-returned totals

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # DashboardCharts
│   ├── layout/        # AppLayout, Sidebar, PageHeader
│   ├── orders/        # OrderDetailsModal
│   ├── pos/           # MenuGrid, CartSidebar, AddOnModal
│   └── ui/            # Button, Card, Badge, Spinner, ErrorState, OrderStatusBadge
├── context/           # DateFilterContext, CartContext
├── hooks/             # useDashboard, useOrders, usePOS
├── lib/               # api.ts (Axios client), utils.ts
├── pages/             # Dashboard, Orders, Register
└── styles/            # CSS per component + global index.css
tests/
├── setup.ts
├── orderStatus.test.ts
├── dateFilter.test.ts
└── cartCalculations.test.ts
```

---

## Deploy to Vercel & Railway

### 1. Backend (Railway)
1. Deploy your backend repo to [Railway](https://railway.app).
2. Once deployed, Railway will provide you with a Public URL (e.g., `https://philo-coffee-shop-production-dd93.up.railway.app`).

### 2. Frontend (Vercel)
1. Deploy this frontend repo to [Vercel](https://vercel.com).
2. During the setup (or in **Project Settings > Environment Variables**), add the following variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://philo-coffee-shop-production-dd93.up.railway.app/api/v1` (replace with your actual Railway URL).
3. Redeploy the frontend for the changes to take effect.
