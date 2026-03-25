import { MenuGrid } from '../components/pos/MenuGrid';
import { CartSidebar } from '../components/pos/CartSidebar';

export default function Register() {
    return (
        <div className="register-page animate-fade-in flex flex-col w-full">
            <div className="dashboard-content">
                <header className="dashboard-header-v2" style={{ marginBottom: '2rem' }}>
                    <div className="header-text">
                        <h1 style={{ fontSize: '2.5rem' }}>Point of Sale</h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Dashboard / POS</p>
                    </div>
                </header>

                <div className="pos-layout grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
                    <div className="menu-area">
                        <MenuGrid />
                    </div>

                    <div className="cart-area">
                        <CartSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
