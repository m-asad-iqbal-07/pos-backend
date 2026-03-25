# ☕ Philo Coffee Shop — POS Dashboard

Welcome to the **Philo Coffee Shop POS**! This is a modern, high-performance Point-of-Sale dashboard designed for a premium coffee shop experience. It's built with love using **React**, **Vite**, and **TypeScript**.

Whether you're tracking sales, managing orders, or taking new ones at the register, Philo provides a smooth, beautiful, and intuitive interface to keep your business running like a perfectly pulled shot of espresso.

---

## 🚀 What is this?

Philo is more than just a dashboard. It's a complete frontend solution for a busy coffee shop:

- **📊 Beautiful Analytics**: Real-time charts for revenue, order trends, and top-selling items.
- **📋 Order Management**: A clean, organized view of all your orders with live status updates.
- **🖥️ Smart POS Register**: A dedicated interface for staff to take orders, complete with custom add-ons and a live cart.
- **✨ Premium Design**: A warm, cream-toned aesthetic with smooth animations and high-contrast typography.

---

## � Backend API Integration

This frontend is fully integrated with the **Philo Coffee Shop Backend** REST API. The backend provides comprehensive endpoints for:

- **Categories & Menu Items**: Browse and manage all menu items and categories
- **Add-ons**: Customize orders with add-ons (extra shots, milk, etc.)
- **Orders**: Create, list, and manage customer orders with real-time status updates
- **Customers**: Track customer information and order history
- **Discounts**: Apply promotional discounts to orders
- **Shifts**: Open and close daily shifts for cash reconciliation
- **Expenses**: Track business expenses
- **Dashboard Analytics**: Real-time KPIs, revenue trends, top items, payment breakdowns, and more

### Backend Documentation
Access the full API documentation at the backend's Swagger UI endpoint (available when backend is running).

---

## 🛠️ Setup Guide

### Prerequisites
- **Node.js** v18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- One of the following:
  - **Option 1**: Philo Backend running locally at `http://localhost:8000`
  - **Option 2**: Access to deployed Philo Backend on Railway

### ✅ Quick Start (2 Steps)

#### Step 1: Install Dependencies
```bash
# Navigate to the project directory
cd philo-pos-frontend-task

# Install all dependencies
npm install
```

#### Step 2: Configure Backend URL
Choose one of the options below:

**Option A: Use Local Backend** (Recommended for Development)
```bash
# Create or update .env.local file
cp .env.example .env.local

# Edit .env.local and set:
VITE_API_URL=http://localhost:8000/api/v1

# Start the development server
npm run dev
```

**Option B: Use Deployed Backend** (Railway)
```bash
# Create or update .env.local file
cp .env.example .env.local

# Edit .env.local and set:
VITE_API_URL=https://pos-b-production-2ff9.up.railway.app/api/v1

# Start the development server
npm run dev
```

The app will start at **http://localhost:5173**

---

## 📚 Available Scripts

```bash
# Start development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run tests
npm run test
```

---

## 🔧 Backend Setup (Optional)

If you haven't set up the backend yet, follow these steps:

### Option 1: Run Backend Locally

```bash
# Clone the backend repository (if you haven't already)
git clone <backend-repo-url>
cd philo-pos-backend

# Install dependencies
pip install -r requirements.txt  # or npm install, depending on the backend stack

# Start the backend server
# It will run on http://localhost:8000

# Backend Swagger UI will be available at:
# http://localhost:8000/docs
```

### Option 2: Use Deployed Backend

The backend is already deployed and accessible at:
- **API Base URL**: `https://pos-b-production-2ff9.up.railway.app/api/v1`
- **Swagger UI**: `https://pos-b-production-2ff9.up.railway.app/docs`

No additional setup needed! Just set the `VITE_API_URL` in your `.env.local` file to the Railway URL.

---

## 📋 API Integration Details

### Integrated Endpoints

#### Categories & Items
- `GET /categories` - List all categories
- `GET /items` - List all menu items
- `GET /items/{item_id}` - Get specific item details
- `POST /categories` - Create category
- `PATCH /categories/{category_id}` - Update category
- `DELETE /categories/{category_id}` - Delete category

#### Customers
- `GET /customers` - List all customers
- `GET /customers/{customer_id}` - Get customer details
- `GET /customers/{customer_id}/orders` - Get customer's order history
- `POST /customers` - Create new customer
- `PATCH /customers/{customer_id}` - Update customer

#### Orders & POS
- `GET /orders` - List all orders with filters
- `GET /orders/{order_id}` - Get order details
- `POST /orders` - Create new order
- `PATCH /orders/{order_id}/status` - Update order status
- `DELETE /orders/{order_id}` - Delete order

#### Add-ons
- `GET /addons` - List all add-ons
- `POST /addons` - Create add-on
- `PATCH /addons/{addon_id}` - Update add-on

#### Discounts
- `GET /discounts` - List all discounts
- `POST /discounts` - Create discount
- `PATCH /discounts/{discount_id}` - Update discount

#### Shifts
- `POST /shifts/open` - Open a new shift
- `PATCH /shifts/{shift_id}/close` - Close a shift
- `GET /shifts` - List all shifts

#### Expenses
- `GET /expenses` - List all expenses
- `POST /expenses` - Create expense
- `PATCH /expenses/{expense_id}` - Update expense
- `DELETE /expenses/{expense_id}` - Delete expense

#### Dashboard Analytics
- `GET /dashboard/summary` - KPI summary
- `GET /dashboard/revenue` - Revenue breakdown
- `GET /dashboard/top-items` - Top selling items
- `GET /dashboard/top-categories` - Top categories
- `GET /dashboard/order-trends` - Order volume trends
- `GET /dashboard/hourly-heatmap` - Hourly sales heatmap
- `GET /dashboard/customer-insights` - Customer analytics
- `GET /dashboard/payment-breakdown` - Payment method breakdown
- `GET /dashboard/inventory-alerts` - Low stock alerts
- `GET /dashboard/profit-loss` - Profit & loss overview
- `GET /dashboard/shift-summary` - Shift performance summary

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard analytics components
│   ├── layout/             # Layout components (Header, Sidebar, etc.)
│   ├── orders/             # Order management components
│   ├── pos/                # Point-of-sale interface components
│   └── ui/                 # Reusable UI components
├── context/
│   ├── CartContext.tsx     # Shopping cart state management
│   └── DateFilterContext.tsx # Date filtering state
├── hooks/
│   ├── useDashboard.ts     # Dashboard API hooks
│   ├── useOrders.ts        # Orders API hooks
│   ├── usePOS.ts           # POS/Menu API hooks
│   ├── useShifts.ts        # Shifts API hooks
│   └── useExpenses.ts      # Expenses API hooks
├── lib/
│   ├── api.ts              # Axios client & API types
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Dashboard.tsx       # Main dashboard page
│   ├── Orders.tsx          # Orders management page
│   ├── Cart.tsx            # Cart/checkout page
│   └── Register.tsx        # POS register page
├── styles/                 # CSS modules for components
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API URL (required)
VITE_API_URL=http://localhost:8000/api/v1

# For local development:
# VITE_API_URL=http://localhost:8000/api/v1

# For Railway deployed backend:
# VITE_API_URL=https://pos-b-production-2ff9.up.railway.app/api/v1
```

See `.env.example` for more options.

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Test files are located in the `tests/` directory and use **Vitest** with React Testing Library.

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- GitHub Pages
- Netlify
- AWS S3 + CloudFront
- Railway
- Any static hosting service

---

## 🐛 Troubleshooting

### API Connection Issues
1. **Check backend is running**: Visit `http://localhost:8000/health` (for local) or the Railway URL
2. **Verify API URL**: Open DevTools → Network tab and check the API requests
3. **Check CORS**: If you see CORS errors, ensure backend has CORS enabled for frontend origin
4. **Verify environment variables**: Check that `.env.local` is created and has correct URL

### Build Errors
1. **Clear cache**: Delete `node_modules` and `dist` folders, then run `npm install` again
2. **Check Node version**: Ensure you're using Node v18+
3. **Check dependencies**: Run `npm audit fix` to resolve any vulnerabilities

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

---

## 📝 Git Workflow

### Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Philo POS Frontend with full API integration"
```

### Push to GitHub
```bash
# Add remote repository
git remote add origin <your-github-repo-url>

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🎯 Key Features

- ✅ **Real-time Order Management**: Create, track, and update orders instantly
- ✅ **Comprehensive Analytics**: 11+ dashboard analytics endpoints
- ✅ **Customer Management**: Full customer lifecycle management
- ✅ **Inventory Tracking**: Monitor stock and get low-stock alerts
- ✅ **Financial Reports**: Revenue, expenses, and profit-loss tracking
- ✅ **Shift Management**: Open/close shifts with cash reconciliation
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Type-Safe**: Full TypeScript support for safer development

---

## 📞 Support & Documentation

- **Backend API Docs**: Visit the Swagger UI at your backend URL `/docs`
- **Frontend Source**: Check the `src/` directory for detailed component documentation
- **Issues**: Report bugs via GitHub Issues

---

## 📄 License

This project is part of Philo Coffee Shop POS system.

---

## 🎉 Ready to Go!

You're all set! Start the development server with `npm run dev` and begin building amazing features for your coffee shop.

Happy coding! ☕✨
```

---

## 🧪 Running Tests
We've included a suite of tests to make sure everything stays robust. To run them:
```bash
npm test
```

---

## 📂 Project Highlights
- **Framework**: React 18
- **Styling**: Modern Vanilla CSS (No bulky frameworks!)
- **Icons**: Lucide React
- **Charts**: Recharts

Enjoy building with Philo! If you have any questions, feel free to reach out. ☕✨
