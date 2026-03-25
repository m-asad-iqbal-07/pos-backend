import { useState } from 'react';
import { useOrders, OrderFilters } from '../hooks/useOrders';
import { formatCurrency, formatDate } from '../lib/utils';
import { Search, Calendar, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import '../styles/Table.css';

const STATUS_TABS = ['All', 'Completed', 'Pending', 'Cancelled :33'];

export default function Orders() {
    const [filters, setFilters] = useState<OrderFilters>({
        page: 1,
        per_page: 15,
        status: 'all',
    });
    const [activeTab, setActiveTab] = useState('All');

    const { data, isLoading, isError, refetch } = useOrders(filters);

    if (isLoading) return <Spinner fullScreen />;
    if (isError) return <ErrorState onRetry={refetch} />;

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="dashboard-content">
                <header className="dashboard-header-v2" style={{ marginBottom: '2rem' }}>
                    <div className="header-text">
                        <h1 style={{ fontSize: '2.5rem' }}>Orders</h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Dashboard / Orders</p>
                    </div>
                    <div className="icon-btn-v2" style={{ width: 'auto', padding: '0 1rem', borderRadius: '12px', height: '40px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>3</span>
                    </div>
                </header>

                <div className="orders-card-v2" style={{ padding: '2rem' }}>
                    <div className="filter-bar-v2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                        <div className="search-container" style={{ maxWidth: '300px', height: '44px', padding: '0 1rem' }}>
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search orders..." className="search-input" style={{ fontSize: '0.9rem' }} />
                        </div>
                        <div className="tabs-v2" style={{ display: 'flex', gap: '0.75rem' }}>
                            {STATUS_TABS.map(tab => (
                                <button
                                    key={tab}
                                    className={`filter-btn-v2 ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        background: activeTab === tab ? 'var(--bg-accent)' : 'transparent',
                                        borderColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                                        color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="date-filter-v2" style={{ marginBottom: '2rem' }}>
                        <div className="filter-btn-v2" style={{ width: 'fit-content', gap: '1rem', height: '44px' }}>
                            <Calendar size={18} />
                            <span>02/07/2026 - 03/09/2026</span>
                            <ChevronDown size={18} />
                        </div>
                    </div>

                    <table className="table-v2">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data?.items || []).map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id-v2">{order.order_number}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-accent)' }}>
                                                <img src={`https://ui-avatars.com/api/?name=${order.customer_name || 'Walk-in'}&background=fef1e8&color=d1733e`} style={{ width: '100%', height: '100%' }} />
                                            </div>
                                            <div>
                                                <div className="customer-name-v2">{order.customer_name || 'Walk-in'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span>☕ Espresso</span>
                                                    <span>•</span>
                                                    <span>☕ Americano</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="vs-text">{formatDate(order.created_at)}</td>
                                    <td className="order-id-v2">{formatCurrency(order.total)}</td>
                                    <td>
                                        <div className="status-badge-v2" style={{
                                            color: order.status === 'completed' ? '#4caf50' : order.status === 'pending' ? '#d1733e' : '#f44336',
                                            background: order.status === 'completed' ? 'rgba(76, 175, 80, 0.08)' : order.status === 'pending' ? 'rgba(209, 115, 62, 0.08)' : 'rgba(244, 67, 54, 0.08)'
                                        }}>
                                            <div className="status-dot-v2" />
                                            <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="filter-btn-v2" style={{ height: '36px', padding: '0 1rem' }}>
                                                View
                                            </button>
                                            <button className="filter-btn-v2" style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}>
                                                <ChevronDown size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="vs-text" style={{ fontSize: '0.9rem' }}>Showing 1 to 8 of 150 entries</span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button className="icon-btn-v2" style={{ width: 32, height: 32 }}><ChevronLeft size={16} /></button>
                            <button className="filter-btn-v2" style={{ width: 32, height: 32, background: 'var(--brand-primary)', color: 'white', padding: 0, justifyContent: 'center' }}>1</button>
                            <button className="filter-btn-v2" style={{ width: 32, height: 32, padding: 0, justifyContent: 'center' }}>2</button>
                            <button className="filter-btn-v2" style={{ width: 32, height: 32, padding: 0, justifyContent: 'center' }}>3</button>
                            <button className="icon-btn-v2" style={{ width: 32, height: 32 }}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
