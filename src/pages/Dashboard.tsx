import { useDateFilter } from '../context/DateFilterContext';
import { useDashboardSummary, useOrderTrends } from '../hooks/useDashboard';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { formatCurrency } from '../lib/utils';
import { DollarSign, ShoppingCart, TrendingUp, Users, Calendar, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const { startDate, endDate } = useDateFilter();

    const {
        data: summary,
        isLoading: isSummaryLoading,
        isError: isSummaryError,
        refetch: refetchSummary
    } = useDashboardSummary({ startDate, endDate });

    const { data: trends } = useOrderTrends({ startDate, endDate });

    if (isSummaryLoading) return <Spinner fullScreen />;
    if (isSummaryError) return <ErrorState onRetry={refetchSummary} />;

    const kpiData = [
        {
            label: 'Total Revenue',
            value: formatCurrency(summary?.total_revenue || 6066.06),
            trend: summary?.revenue_change_pct || 585.53,
            icon: DollarSign,
            dataKey: 'revenue',
            color: '#d1733e'
        },
        {
            label: 'Total Orders',
            value: summary?.total_orders || 377,
            trend: summary?.order_change_pct || 488.41,
            icon: ShoppingCart,
            dataKey: 'order_count',
            color: '#4169e1'
        },
        {
            label: 'Avg Order Value',
            value: formatCurrency(summary?.avg_order_value || 18.66),
            trend: 0,
            icon: TrendingUp,
            dataKey: 'revenue',
            color: '#10b981'
        },
        {
            label: 'Total Customers',
            value: summary?.total_customers || 8,
            trend: 5.2,
            icon: Users,
            dataKey: 'order_count',
            color: '#6366f1'
        }
    ];

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="dashboard-content">
                {/* Header Section */}
                <header className="dashboard-header-v2">
                    <div className="header-title-group">
                        <div className="header-text">
                            <h1>Dashboard Overview</h1>
                            <p>Monitor your business performance at a glance.</p>
                        </div>
                    </div>

                    <div className="date-picker-pill">
                        <div className="range-options">
                            <span>7D</span>
                            <span>30D</span>
                            <span>90D</span>
                        </div>
                        <div className="pill-divider" />
                        <div className="date-display">
                            <Calendar size={18} className="date-icon" />
                            <span>02/07/2026</span>
                            <span className="vs-text">to</span>
                            <span>03/09/2026</span>
                            <Calendar size={18} className="date-icon" />
                        </div>
                    </div>
                </header>

                {/* KPI Grid */}
                <div className="kpi-grid">
                    {kpiData.map((kpi, i) => (
                        <div key={i} className="kpi-card-v2">
                            <div className="kpi-header">
                                <kpi.icon size={18} strokeWidth={2.5} />
                                <span>{kpi.label}</span>
                            </div>
                            <h2 className="kpi-value-v2">{kpi.value}</h2>
                            <div className="kpi-trend-v2">
                                <TrendingUp size={16} className="trend-up" />
                                <span className="trend-up">{kpi.trend}%</span>
                                <span className="vs-text">vs last period</span>
                            </div>
                            <div className="sparkline-box">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={(trends || []).slice(-10)}>
                                        <Area
                                            type="monotone"
                                            dataKey={kpi.dataKey}
                                            stroke={kpi.color}
                                            fill={kpi.color}
                                            fillOpacity={0.1}
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-main-v2">
                    {/* Left Column */}
                    <div className="dashboard-left-v2">
                        <div className="chart-card-v2">
                            <div className="chart-header-v2">
                                <h3>Revenue & Orders Performance</h3>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <div className="legend-dot" style={{ background: 'var(--brand-primary)' }} />
                                        <span>Daily Revenue</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot" style={{ background: 'var(--sidebar-bg)' }} />
                                        <span>Order Volume</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trends || []}>
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="var(--brand-primary)"
                                            fill="rgba(209, 115, 62, 0.1)"
                                            strokeWidth={3}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="order_count"
                                            stroke="var(--sidebar-bg)"
                                            fill="rgba(74, 44, 33, 0.05)"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="orders-card-v2">
                            <div className="orders-header-v2">
                                <h3>Recent Orders</h3>
                                <div className="filter-group">
                                    <button className="filter-btn-v2">
                                        <Calendar size={18} />
                                        <span>Status</span>
                                    </button>
                                    <button className="filter-btn-v2">
                                        <ShoppingCart size={18} />
                                        <span>Status</span>
                                    </button>
                                </div>
                            </div>
                            <table className="table-v2">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Item</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: '#1044', customer: 'Emily Wilson', item: 'Mocha', amount: '$4.80' },
                                        { id: '#1043', customer: 'James Anderson', item: 'Cappuccino', amount: '$5.20' },
                                        { id: '#1042', customer: 'Sarah Lee', item: 'Latte', amount: '$3.80' },
                                        { id: '#1040', customer: 'John Doe', item: 'Espresso', amount: '$3.10' },
                                        { id: '#1039', customer: 'Alice Brown', item: 'Latte', amount: '$4.20' },
                                    ].map((order, idx) => (
                                        <tr key={idx}>
                                            <td className="order-id-v2">{order.id}</td>
                                            <td className="customer-name-v2">{order.customer}</td>
                                            <td className="vs-text">{order.item}</td>
                                            <td className="order-id-v2">{order.amount}</td>
                                            <td>
                                                <div className="status-badge-v2">
                                                    <div className="status-dot-v2" />
                                                    <span>Completed</span>
                                                    <ChevronDown size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column (Widgets) */}
                    <aside className="widget-stack">
                        <div className="widget-card-v2">
                            <h3 className="widget-title-v2">☕ Top Selling Drinks</h3>
                            <div className="drink-list">
                                {[
                                    { name: 'Latte', count: 120, icon: '☕' },
                                    { name: 'Cappuccino', count: 95, icon: '☕' },
                                    { name: 'Espresso', count: 80, icon: '☕' },
                                ].map((drink, i) => (
                                    <div key={i} className="drink-item-v2">
                                        <div className="drink-icon-v2">{drink.icon}</div>
                                        <div className="drink-info-v2">
                                            <span className="drink-name-v2">{drink.name}</span>
                                        </div>
                                        <span className="drink-count-v2">{drink.count}</span>
                                        <div className="count-trend" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="widget-card-v2">
                            <h3 className="widget-title-v2">👥 New Customers</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>4</span>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginTop: '-0.5rem' }}>New Customers Today</p>
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
                                    </div>
                                </div>
                                <div>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>18</span>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginTop: '-0.5rem' }}>Returning Customers</p>
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary)', opacity: 0.5 }} />
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary)', opacity: 0.5 }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="widget-card-v2">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: '#4caf50' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4caf50', boxShadow: '0 0 8px #4caf50' }} />
                                <span style={{ fontWeight: 800, fontSize: '1rem' }}>POS Active</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Last Sale: $5.20</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Orders Processing: 72</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

