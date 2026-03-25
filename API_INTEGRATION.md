# API Integration Documentation

## Overview

This document outlines the complete API integration for the Philo POS Frontend. All API endpoints are fully integrated with React hooks using React Query for data fetching and state management.

---

## Architecture

### API Client Setup
- **File**: `src/lib/api.ts`
- **Client**: Axios with automatic base URL configuration
- **Base URL**: Configured via `VITE_API_URL` environment variable
  - Local: `http://localhost:8000/api/v1`
  - Production: `https://pos-b-production-2ff9.up.railway.app/api/v1`

### Data Fetching Pattern
- **Library**: @tanstack/react-query (TanStack Query v5)
- **Benefits**:
  - Automatic caching
  - Background synchronization
  - Request deduplication
  - Automatic retries on failure
  - Optimistic updates

---

## API Endpoints by Module

### 1. Categories API
**File**: `src/hooks/usePOS.ts`

```typescript
useCategories() - GET /categories
// Fetches active categories with pagination
// Returns: Category[] (max 50 items)
```

**Type Definition**:
```typescript
interface Category {
  id: number;
  name: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
}
```

---

### 2. Menu Items API
**File**: `src/hooks/usePOS.ts`

```typescript
useMenuItems(categoryId?: number) - GET /items
// Fetches available menu items, optionally filtered by category
// Automatically filters for is_available: true
// Returns: MenuItem[]

useMenuItems() // All available items (max 100)
useMenuItems(5) // Items in category 5
```

**Type Definition**:
```typescript
interface MenuItem {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  stock_qty: number;
}
```

---

### 3. Add-ons API
**File**: `src/hooks/usePOS.ts`

```typescript
useAddons() - GET /addons
// Fetches all available add-ons (extra shots, milk types, etc.)
// Returns: Addon[] (max 50 items)
```

**Type Definition**:
```typescript
interface Addon {
  id: number;
  name: string;
  price: number;
  is_available: boolean;
}
```

---

### 4. Customers API
**File**: `src/hooks/usePOS.ts`

```typescript
useCustomers() - GET /customers
// Fetches all customers
// Returns: Customer[]
```

**Type Definition**:
```typescript
interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  total_orders: number;
  total_spent: number;
}
```

---

### 5. Discounts API
**File**: `src/hooks/usePOS.ts`

```typescript
useDiscounts() - GET /discounts
// Fetches active discount codes
// Returns: Discount[] (filtered by is_active: true)
```

**Type Definition**:
```typescript
interface Discount {
  id: number;
  name: string;
  type: 'percentage' | 'flat';
  value: number;
  is_active: boolean;
}
```

---

### 6. Orders API
**File**: `src/hooks/useOrders.ts`

```typescript
// List Orders
useOrders(filters: OrderFilters) - GET /orders
// Supports pagination, status filtering, and date range filtering
// Returns: PaginatedResponse<Order>

// Get Single Order
useOrder(id: number | null) - GET /orders/{id}
// Returns: Order | null

// Create Order (Mutation)
useCreateOrder() - POST /orders
// Payload: CreateOrderPayload
// Returns: Order

// Update Order Status (Mutation)
useUpdateOrderStatus() - PATCH /orders/{id}/status
// Payload: { id, status }
// Returns: Order
```

**Type Definitions**:
```typescript
interface Order {
  id: number;
  order_number: string;
  customer_id: number | null;
  customer_name: string | null;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment_method: 'cash' | 'card' | 'mobile';
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  discount_id: number | null;
  total: number;
  shift_id: number | null;
  notes: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

interface CreateOrderPayload {
  customer_id?: number | null;
  payment_method: 'cash' | 'card' | 'mobile';
  discount_id?: number | null;
  notes?: string;
  items: {
    item_id: number;
    quantity: number;
    addon_ids: number[];
  }[];
}
```

---

### 7. Shifts API
**File**: `src/hooks/useShifts.ts`

```typescript
// List Shifts
useShifts(page?: number, per_page?: number) - GET /shifts
// Returns: PaginatedResponse<Shift>

// Get Single Shift
useShift(id: number | null) - GET /shifts/{id}
// Returns: Shift | null

// Open Shift (Mutation)
useOpenShift() - POST /shifts/open
// Payload: { opening_balance }
// Returns: Shift

// Close Shift (Mutation)
useCloseShift() - PATCH /shifts/{id}/close
// Payload: { closing_balance, total_cash_out }
// Returns: Shift
```

**Type Definitions**:
```typescript
interface Shift {
  id: number;
  opening_balance: number;
  closing_balance: number | null;
  total_cash_out: number | null;
  status: 'open' | 'closed';
  opened_at: string;
  closed_at: string | null;
}

interface ShiftCreate {
  opening_balance: number;
}

interface ShiftClose {
  closing_balance: number;
  total_cash_out: number;
}
```

---

### 8. Expenses API
**File**: `src/hooks/useExpenses.ts`

```typescript
// List Expenses
useExpenses(page?: number, per_page?: number) - GET /expenses
// Returns: PaginatedResponse<Expense>

// Get Single Expense
useExpense(id: number | null) - GET /expenses/{id}
// Returns: Expense | null

// Create Expense (Mutation)
useCreateExpense() - POST /expenses
// Payload: ExpenseCreate
// Returns: Expense

// Update Expense (Mutation)
useUpdateExpense() - PATCH /expenses/{id}
// Payload: ExpenseUpdate
// Returns: Expense

// Delete Expense (Mutation)
useDeleteExpense() - DELETE /expenses/{id}
// Returns: void
```

**Type Definitions**:
```typescript
interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  shift_id: number | null;
  created_at: string;
  updated_at: string;
}

interface ExpenseCreate {
  description: string;
  category: string;
  amount: number;
  date: string;
  shift_id?: number | null;
}

interface ExpenseUpdate {
  description?: string;
  category?: string;
  amount?: number;
  date?: string;
  shift_id?: number | null;
}
```

---

### 9. Dashboard Analytics API
**File**: `src/hooks/useDashboard.ts`

```typescript
// KPI Summary
useDashboardSummary({ startDate, endDate }) - GET /dashboard/summary
// Returns: KPISummary

// Order Trends
useOrderTrends({ startDate, endDate }) - GET /dashboard/order-trends
// Returns: OrderTrend[]

// Top Items
useTopItems({ startDate, endDate }) - GET /dashboard/top-items
// Returns: TopItem[] (top 5)

// Top Categories
useTopCategories({ startDate, endDate }) - GET /dashboard/top-categories
// Returns: TopCategory[] (top 6)

// Hourly Heatmap
useHourlyHeatmap({ startDate, endDate }) - GET /dashboard/hourly-heatmap
// Returns: HourlySales[]

// Payment Breakdown
usePaymentBreakdown({ startDate, endDate }) - GET /dashboard/payment-breakdown
// Returns: PaymentBreakdown[]

// Inventory Alerts
useInventoryAlerts() - GET /dashboard/inventory-alerts
// Returns: InventoryAlert[]

// Revenue
useRevenue({ startDate, endDate }) - GET /dashboard/revenue
// Returns: RevenueBreakdown[]

// Customer Insights
useCustomerInsights({ startDate, endDate }) - GET /dashboard/customer-insights
// Returns: CustomerInsight[]

// Profit & Loss
useProfitLoss({ startDate, endDate }) - GET /dashboard/profit-loss
// Returns: ProfitLoss

// Shift Summary
useShiftSummary({ startDate, endDate }) - GET /dashboard/shift-summary
// Returns: ShiftSummaryItem[]
```

**Type Definitions**:
```typescript
interface KPISummary {
  total_revenue: number;
  total_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  avg_order_value: number;
  total_customers: number;
  new_customers: number;
  total_items_sold: number;
  revenue_change_pct: number;
  order_change_pct: number;
  top_payment_method: string;
  busiest_hour: number;
}

interface OrderTrend {
  date: string;
  order_count: number;
  revenue: number;
}

interface TopItem {
  item_id: number;
  item_name: string;
  quantity_sold: number;
  revenue: number;
}

// ... and more types in src/lib/api.ts
```

---

## Usage Examples

### Example 1: Loading Menu Items
```typescript
import { useMenuItems, useAddons } from './hooks/usePOS';

function MenuComponent() {
  const { data: items, isLoading } = useMenuItems();
  const { data: addons } = useAddons();

  if (isLoading) return <Spinner />;

  return (
    <div>
      {items?.map(item => (
        <MenuItem key={item.id} item={item} addons={addons} />
      ))}
    </div>
  );
}
```

### Example 2: Creating an Order
```typescript
import { useCreateOrder } from './hooks/usePOS';

function Checkout() {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleCheckout = (cartItems) => {
    createOrder({
      payment_method: 'card',
      discount_id: null,
      items: cartItems.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
        addon_ids: item.addon_ids
      }))
    });
  };

  return <button onClick={handleCheckout} disabled={isPending}>Checkout</button>;
}
```

### Example 3: Dashboard with Date Filters
```typescript
import { useDashboardSummary, useOrderTrends } from './hooks/useDashboard';
import { useState } from 'react';

function Dashboard() {
  const [dates, setDates] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  const { data: summary } = useDashboardSummary(dates);
  const { data: trends } = useOrderTrends(dates);

  return (
    <div>
      <KPICard data={summary} />
      <TrendChart data={trends} />
    </div>
  );
}
```

### Example 4: Managing Shifts
```typescript
import { useOpenShift, useCloseShift, useShifts } from './hooks/useShifts';

function ShiftManager() {
  const { data: shifts } = useShifts();
  const { mutate: openShift, isPending: isOpening } = useOpenShift();
  const { mutate: closeShift, isPending: isClosing } = useCloseShift();

  return (
    <div>
      <button 
        onClick={() => openShift({ opening_balance: 500 })} 
        disabled={isOpening}
      >
        Open Shift
      </button>
    </div>
  );
}
```

---

## Error Handling

All hooks automatically handle errors. To access error information:

```typescript
const { data, error, isError, isPending } = useOrders(filters);

if (isError) {
  return <ErrorState error={error.message} />;
}

if (isPending) {
  return <Spinner />;
}

return <OrdersList orders={data?.items} />;
```

---

## Caching & Invalidation

React Query automatically caches responses. Mutations invalidate relevant caches:

- **Creating/Updating/Deleting Orders** → Invalidates: `['orders']`, `['dashboard']`
- **Creating/Updating/Deleting Expenses** → Invalidates: `['expenses']`, `['dashboard']`
- **Opening/Closing Shifts** → Invalidates: `['shifts']`, `['dashboard']`

Manual cache invalidation:
```typescript
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['orders'] });
```

---

## Environment Configuration

### Development
```bash
# .env.local
VITE_API_URL=http://localhost:8000/api/v1
```

### Production (Railway)
```bash
# .env.production.local
VITE_API_URL=https://pos-b-production-2ff9.up.railway.app/api/v1
```

---

## Testing

All API integrations are tested in `tests/` directory using Vitest and React Testing Library.

```bash
npm run test
```

---

## Troubleshooting

### 404 Errors
- Verify backend is running
- Check API URL in environment variables
- Ensure endpoint paths match backend routes

### 500 Errors
- Check backend logs
- Verify request payload format
- Ensure required fields are provided

### CORS Errors
- Verify backend CORS configuration
- Check that frontend URL is whitelisted on backend

### Stale Data
- Data is cached by React Query. To force refresh:
  ```typescript
  queryClient.refetchQueries({ queryKey: ['orders'] });
  ```

---

## Performance Optimization

- **Code Splitting**: Hooks are in separate files for better tree-shaking
- **Query Deduplication**: React Query automatically deduplicates identical requests
- **Automatic Retries**: Failed requests retry with exponential backoff
- **Stale-While-Revalidate**: UI shows cached data while fetching latest

---

## Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] GraphQL integration option
- [ ] Advanced caching strategies
- [ ] Offline support with service workers
- [ ] Request throttling/debouncing

---

## Support

For API issues, check:
1. Backend logs at `http://localhost:8000` (local) or Railway dashboard
2. Browser DevTools → Network tab for request/response details
3. React Query DevTools for cache inspection

