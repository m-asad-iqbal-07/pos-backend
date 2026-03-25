import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="app-layout animate-fade-in">
            <Sidebar />
            <div className="main-wrapper flex-1 flex flex-col min-w-0" style={{ height: '100vh', overflow: 'hidden' }}>
                <Header />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
