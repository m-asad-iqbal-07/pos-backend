import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DateFilterProvider } from './context/DateFilterContext';
import { AppLayout } from './components/layout/AppLayout';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Cart from './pages/Cart';

import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DateFilterProvider>
                <CartProvider>
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <AppLayout>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </AppLayout>
                    </BrowserRouter>
                </CartProvider>
            </DateFilterProvider>
        </QueryClientProvider>
    );
}

export default App;
