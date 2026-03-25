import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Globe, Bell, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import '../../styles/Header.css';

export function Header() {
    const navigate = useNavigate();
    const { items } = useCart();
    const cartCount = items.length;

    return (
        <header className="main-header">
            <div className="search-container">
                <Search size={22} className="search-icon" strokeWidth={1.5} />
                <input type="text" placeholder="Search" className="search-input" />
            </div>

            <div className="header-actions">
                <button className="icon-btn-v2">
                    <Globe size={24} strokeWidth={1.5} />
                </button>
                <button className="icon-btn-v2">
                    <Bell size={24} strokeWidth={1.5} />
                    <span className="dot-badge" />
                </button>
                <button
                    className="icon-btn-v2"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart size={24} strokeWidth={1.5} />
                    {cartCount > 0 && (
                        <span className="navbar-cart-badge">{cartCount}</span>
                    )}
                </button>

                <div className="user-profile-v2">
                    <div className="user-avatar-v2">
                        <img src="https://ui-avatars.com/api/?name=Philo+Admin&background=fef1e8&color=d1733e" alt="User" />
                    </div>
                    <ChevronDown size={20} className="profile-chevron" />
                </div>
            </div>
        </header>
    );
}
