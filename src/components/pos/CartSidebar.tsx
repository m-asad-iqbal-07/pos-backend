import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCustomers, useDiscounts, useCreateOrder } from '../../hooks/usePOS';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';
import { Trash2, Plus, Minus, User, Tag, ShoppingBag, CreditCard, Banknote, Smartphone, CheckCircle, RotateCcw } from 'lucide-react';
import '../../styles/CartSidebar.css';

export function CartSidebar() {
    const {
        items, customerId, discount, paymentMethod, notes,
        updateItemQuantity, clearCart,
        setCustomerId, setDiscount, setPaymentMethod, setNotes,
        subtotal, discountAmount, taxAmount, total
    } = useCart();

    const { data: customers } = useCustomers();
    const { data: discounts } = useDiscounts();
    const createOrderMutation = useCreateOrder();

    // Store the submitted order's confirmation data from the backend
    const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

    const handleSubmit = () => {
        if (items.length === 0) return;

        createOrderMutation.mutate({
            customer_id: customerId,
            payment_method: paymentMethod,
            discount_id: discount?.id || null,
            notes: notes,
            items: items.map(item => ({
                item_id: item.menuItem.id,
                quantity: item.quantity,
                addon_ids: item.addons.map(a => a.id)
            }))
        }, {
            onSuccess: (data) => {
                setConfirmedOrder(data);
                clearCart();
            },
            onError: (err: any) => {
                alert('Failed to place order: ' + (err.response?.data?.detail || err.message));
            }
        });
    };

    // Success screen — shows backend-returned totals
    if (confirmedOrder) {
        return (
            <div className="cart-sidebar flex flex-col h-full bg-secondary border-l border-color">
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--success)', marginBottom: '16px' }}>
                        <CheckCircle size={64} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>Order Placed!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        {confirmedOrder.order_number || `Order #${confirmedOrder.id}`}
                    </p>

                    {/* Backend-returned totals breakdown */}
                    <div style={{ width: '100%', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                        {confirmedOrder.subtotal !== undefined && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span>{formatCurrency(confirmedOrder.subtotal)}</span>
                            </div>
                        )}
                        {confirmedOrder.discount_amount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--success)', fontWeight: 500 }}>
                                <span>Discount</span>
                                <span>-{formatCurrency(confirmedOrder.discount_amount)}</span>
                            </div>
                        )}
                        {confirmedOrder.tax_amount !== undefined && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <span>Tax (8%)</span>
                                <span>{formatCurrency(confirmedOrder.tax_amount)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--brand-primary)' }}>
                            <span>Total Charged</span>
                            <span>{formatCurrency(confirmedOrder.total)}</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setConfirmedOrder(null)}
                    >
                        <RotateCcw size={16} style={{ marginRight: '8px' }} />
                        New Order
                    </Button>
                </div>
            </div>
        );
    }

    const [serviceType, setServiceType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');

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
        <div className="cart-sidebar flex flex-col bg-secondary border-l border-color">
            {/* Service Type Tabs */}
            <div className="service-tabs">
                <button
                    className={`service-tab ${serviceType === 'delivery' ? 'active' : ''}`}
                    onClick={() => setServiceType('delivery')}
                >
                    Delivery
                </button>
                <button
                    className={`service-tab ${serviceType === 'dine-in' ? 'active' : ''}`}
                    onClick={() => setServiceType('dine-in')}
                >
                    Dine in
                </button>
                <button
                    className={`service-tab ${serviceType === 'takeaway' ? 'active' : ''}`}
                    onClick={() => setServiceType('takeaway')}
                >
                    Take away
                </button>
            </div>

            <div className="cart-header-compact">
                <h3 className="order-title">Current Order</h3>
                {items.length > 0 && (
                    <button onClick={clearCart} className="clear-cart-btn">Clear all</button>
                )}
            </div>

            <div className="cart-items-receipt flex-1">
                {items.length === 0 ? (
                    <div className="empty-cart-minimal">
                        <ShoppingBag size={48} className="mb-4 opacity-20" />
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <div className="receipt-list">
                        {items.map((item) => (
                            <div key={item.id} className="receipt-item">
                                <div className="item-main-row">
                                    <div className="item-thumbnail">
                                        <img src={getImageUrl(item)} alt={item.menuItem.name} />
                                    </div>
                                    <div className="item-info-col">
                                        <h4 className="receipt-item-name">{item.menuItem.name}</h4>
                                        <p className="receipt-item-price">{formatCurrency(item.menuItem.price)}</p>
                                    </div>
                                    <div className="receipt-qty-controls">
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="qty-action">
                                            {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="qty-action">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                                {item.addons.length > 0 && (
                                    <div className="receipt-addons">
                                        {item.addons.map(addon => (
                                            <div key={addon.id} className="addon-line">
                                                <span>+ {addon.name}</span>
                                                <span>{formatCurrency(addon.price)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="receipt-footer">
                <div className="receipt-metadata">
                    <div className="meta-field">
                        <User size={14} className="meta-icon" />
                        <select
                            value={customerId || ''}
                            onChange={e => setCustomerId(e.target.value ? Number(e.target.value) : null)}
                            className="meta-select"
                        >
                            <option value="">Walk-in Customer</option>
                            {customers?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="receipt-summary">
                    <div className="summary-row">
                        <span>Items</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                        <div className="summary-row discount">
                            <span>Discount</span>
                            <span>-{formatCurrency(discountAmount)}</span>
                        </div>
                    )}
                    <div className="summary-row">
                        <span>Tax</span>
                        <span>{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>

                <Button
                    className="place-order-btn"
                    disabled={items.length === 0}
                    isLoading={createOrderMutation.isPending}
                    onClick={handleSubmit}
                >
                    Place an order
                </Button>
            </div>
        </div>
    );
}
