'use client';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { LayoutConfig } from '@/types';

interface ProvidersProps {
    children: React.ReactNode;
    initialLayoutConfig: LayoutConfig;
}

export default function Providers({ children, initialLayoutConfig }: ProvidersProps) {
    return (
        <PrimeReactProvider>
            <LayoutProvider initialConfig={initialLayoutConfig}>{children}</LayoutProvider>
        </PrimeReactProvider>
    );
}

