import axios from 'axios';

// Use environment variable or default to Railway deployed backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://pos-b-production-2ff9.up.railway.app/api/v1";

console.log('🔗 API Base URL:', API_BASE_URL);

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Category {
    id: number;
    name: string;
    description: string | null;
    display_order: number;
    is_active: boolean;
}

export interface MenuItem {
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

export interface Addon {
    id: number;
    name: string;
    price: number;
    is_available: boolean;
}

export interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    total_orders: number;
    total_spent: number;
}

export interface Discount {
    id: number;
    name: string;
    type: 'percentage' | 'flat';
    value: number;
    is_active: boolean;
}

export interface OrderItemAddon {
    id: number;
    addon_id: number;
    addon_name: string;
    price: number;
}

export interface OrderItem {
    id: number;
    item_id: number;
    item_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    addons: OrderItemAddon[];
}

export interface Order {
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

export interface KPISummary {
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

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

// ============ Shifts ============
export interface Shift {
    id: number;
    opening_balance: number;
    closing_balance: number | null;
    total_cash_out: number | null;
    status: 'open' | 'closed';
    opened_at: string;
    closed_at: string | null;
}

export interface ShiftCreate {
    opening_balance: number;
}

export interface ShiftClose {
    closing_balance: number;
    total_cash_out: number;
}

// ============ Expenses ============
export interface Expense {
    id: number;
    description: string;
    category: string;
    amount: number;
    date: string;
    shift_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface ExpenseCreate {
    description: string;
    category: string;
    amount: number;
    date: string;
    shift_id?: number | null;
}

export interface ExpenseUpdate {
    description?: string;
    category?: string;
    amount?: number;
    date?: string;
    shift_id?: number | null;
}

// ============ Dashboard Data Structures ============
export interface OrderTrend {
    date: string;
    order_count: number;
    revenue: number;
}

export interface TopItem {
    item_id: number;
    item_name: string;
    quantity_sold: number;
    revenue: number;
}

export interface TopCategory {
    category_id: number;
    category_name: string;
    revenue: number;
}

export interface TopCustomer {
    customer_id: number;
    customer_name: string;
    orders_count: number;
    total_spent: number;
}

export interface HourlySales {
    hour: number;
    sales_count: number;
    revenue: number;
}

export interface PaymentBreakdown {
    payment_method: string;
    count: number;
    amount: number;
}

export interface RevenueBreakdown {
    category: string;
    revenue: number;
}

export interface InventoryAlert {
    item_id: number;
    item_name: string;
    current_stock: number;
    min_threshold: number;
}

export interface ProfitLoss {
    revenue: number;
    expenses: number;
    profit: number;
    profit_margin: number;
}

export interface ShiftSummaryItem {
    shift_id: number;
    date: string;
    opening_balance: number;
    closing_balance: number | null;
    orders_count: number;
    revenue: number;
}

export interface CustomerInsight {
    customer_id: number;
    customer_name: string;
    total_orders: number;
    total_spent: number;
    last_order_date: string;
}
