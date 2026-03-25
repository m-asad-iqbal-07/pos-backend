import { useState } from 'react';
import { useCategories, useMenuItems } from '../../hooks/usePOS';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { formatCurrency } from '../../lib/utils';
import { AddOnModal } from './AddOnModal';
import { MenuItem } from '../../lib/api';
import '../../styles/MenuGrid.css';

export function MenuGrid() {
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const { data: categories, isLoading: isCatsLoading } = useCategories();
    const { data: menuItems, isLoading: isItemsLoading } = useMenuItems(activeCategoryId || undefined);

    const handleItemClick = (item: MenuItem) => {
        if (item.stock_qty === 0) return;
        setSelectedItem(item);
    };

    const getImageUrl = (item: MenuItem) => {
        const name = item.name.toLowerCase();
        if (name.includes('espresso')) return '/images/espresso.png';
        if (name.includes('cappuccino') || name.includes('latte')) return '/images/cappuccino.png';
        if (name.includes('cold') || name.includes('ice')) return '/images/cold-brew.png';
        if (name.includes('croissant') || name.includes('cake') || name.includes('pastry')) return '/images/pastry.png';
        if (name.includes('tea') || name.includes('matcha')) return '/images/tea.png';
        return '/images/espresso.png'; // Default
    };

    return (
        <div className="menu-container">
            {/* Category Tabs */}
            <div className="category-tabs-container">
                <div className="category-tabs">
                    <button
                        className={`category-pill ${activeCategoryId === null ? 'active' : ''}`}
                        onClick={() => setActiveCategoryId(null)}
                    >
                        All
                    </button>
                    {isCatsLoading ? <Spinner size={16} /> : categories?.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-pill ${activeCategoryId === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategoryId(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Item Grid */}
            <div className="item-grid-wrapper">
                {isItemsLoading ? (
                    <Spinner fullScreen />
                ) : menuItems?.length === 0 ? (
                    <div className="empty-state text-secondary p-8 text-center bg-primary rounded">No items found.</div>
                ) : (
                    <div className="items-grid">
                        {menuItems?.map(item => (
                            <div
                                key={item.id}
                                className={`cafe-item-card ${item.stock_qty === 0 ? 'out-of-stock' : 'in-stock'}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={getImageUrl(item)} alt={item.name} className="item-card-image" />
                                    <div className="item-price-badge">{formatCurrency(item.price)}</div>
                                </div>
                                <div className="item-details">
                                    <h4 className="item-name">{item.name}</h4>
                                    <p className="item-category">{item.category_name}</p>
                                </div>
                                {item.stock_qty === 0 && (
                                    <div className="sold-out-badge">Sold Out</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add-On Modal */}
            {selectedItem && (
                <AddOnModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}
