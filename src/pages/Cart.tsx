import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Minus, Plus, ShoppingCart, ChevronRight } from 'lucide-react';
import '../styles/Cart.css';

const KEYPAD = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '+'],
    ['7', '8', '9', '⌫'],
    ['0', '..', 'Clear']
];

export default function Cart() {
    const { items, subtotal, taxAmount, total, updateItemQuantity } = useCart();

    const getImageUrl = (item: any) => {
        const name = item.menuItem.name.toLowerCase();
        if (name.includes('espresso')) return '/images/espresso.png';
        if (name.includes('cappuccino') || name.includes('latte')) return '/images/cappuccino.png';
        if (name.includes('cold') || name.includes('ice')) return '/images/cold-brew.png';
        if (name.includes('croissant') || name.includes('cake') || name.includes('pastry')) return '/images/pastry.png';
        if (name.includes('tea') || name.includes('matcha')) return '/images/tea.png';
        return '/images/espresso.png';
    };

    return (
        <div className="cart-page animate-fade-in" style={{ padding: 0 }}>
            <div className="dashboard-content">
                <header className="dashboard-header-v2" style={{ marginBottom: '2rem' }}>
                    <div className="header-text">
                        <h1 style={{ fontSize: '2.5rem' }}>My Cart</h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Dashboard / Cart</p>
                    </div>
                </header>

                <div className="cart-page-content">
                    {/* Items Section */}
                    <div className="items-section-v2">
                        <div className="items-header-v2" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 180px 120px', gap: '2rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '2px solid var(--border-color)', marginBottom: '1rem' }}>
                            <div style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Item</div>
                            <div />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'right', fontWeight: 700, color: 'var(--text-secondary)' }}>
                                <span>Price</span>
                                <span style={{ textAlign: 'center' }}>Quantity</span>
                            </div>
                            <div style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-secondary)' }}>Total</div>
                        </div>

                        <div className="items-list-v2">
                            {items.length === 0 ? (
                                <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Your cart is empty.
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="cart-item-row-v2">
                                        <div className="item-thumb-v2">
                                            <img src={getImageUrl(item)} alt={item.menuItem.name} />
                                        </div>
                                        <div className="item-info-v2">
                                            <div className="item-name-v2">{item.menuItem.name}</div>
                                            <div className="item-meta-v2">Product ID: {item.menuItem.id.slice(0, 8)}</div>
                                        </div>
                                        <div className="item-price-qty-v2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ textAlign: 'right', fontWeight: 700 }}>{formatCurrency(item.menuItem.price)}</div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="qty-pill">
                                                    <button className="qty-btn" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                                                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button className="qty-btn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-total-v2">
                                            {formatCurrency((item.menuItem.price + item.addons.reduce((s, a) => s + a.price, 0)) * item.quantity)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="vs-text" style={{ fontSize: '0.9rem' }}>Showing 1 to 8 of 150 entries</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <div className="qty-pill" style={{ padding: '0.25rem 0.75rem', gap: '0.5rem' }}>
                                    <ChevronRight size={16} />
                                    <span style={{ fontSize: '0.8rem' }}>1</span>
                                    <span style={{ fontSize: '0.8rem' }}>2</span>
                                    <span style={{ fontSize: '0.8rem' }}>3</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Keypad & Summary */}
                    <div className="cart-sidebar-v2">
                        <div className="keypad-card">
                            <div className="keypad-grid">
                                {KEYPAD.flat().map((key, i) => (
                                    <button
                                        key={i}
                                        className={`keypad-btn ${['+', '⌫', 'Clear'].includes(key) ? 'action' : ''}`}
                                        style={key === 'Clear' ? { gridColumn: 'span 2' } : {}}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="summary-card-v2">
                            <div className="summary-row-v2">
                                <span>Subtotal</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="summary-row-v2">
                                <span>Tax</span>
                                <span>{formatCurrency(taxAmount)}</span>
                            </div>
                            <div className="total-row-v2">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>

                            <div className="cart-actions-v2">
                                <button className="btn-cancel-v2">Cancel</button>
                                <button className="btn-checkout-v2">
                                    <ShoppingCart size={20} />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
