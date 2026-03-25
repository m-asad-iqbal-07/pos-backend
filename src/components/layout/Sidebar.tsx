import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Coffee, ShoppingCart } from 'lucide-react';
import '../../styles/Sidebar.css';

const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/orders', label: 'Orders', icon: ShoppingBag, exact: false },
    { path: '/register', label: 'POS', icon: Coffee, exact: false },
    { path: '/cart', label: 'My Cart', icon: ShoppingCart, exact: false },
];

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">☕</div>
                <h2>Philo POS</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="system-status">
                    <span className="status-dot" />
                    <span>System Online</span>
                </div>
            </div>
        </aside>
    );
}
