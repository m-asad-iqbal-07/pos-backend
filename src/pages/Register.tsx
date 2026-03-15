import { MenuGrid } from '../components/pos/MenuGrid';
import { CartSidebar } from '../components/pos/CartSidebar';
import { CartProvider } from '../context/CartContext';
import { PageHeader } from '../components/layout/PageHeader';

export default function Register() {
    return (
        <CartProvider>
            <div className="register-page animate-fade-in flex flex-col h-full">
                <PageHeader
                    title="Point of Sale"
                    description="Create and take new orders."
                />

                <div className="pos-layout">
                    <div className="menu-area">
                        <MenuGrid />
                    </div>

                    <div className="cart-area">
                        <CartSidebar />
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}
