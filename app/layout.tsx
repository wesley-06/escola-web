import { cookies } from 'next/headers';
import Providers from './providers';
import { DEFAULT_LAYOUT_CONFIG, LAYOUT_CONFIG_COOKIE, parseLayoutConfigCookie } from '../layout/context/layoutConfigStorage';
import { LayoutConfig } from '@/types';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    // Lê as preferências salvas no cookie para já renderizar o tema correto no servidor
    const savedConfig = parseLayoutConfigCookie(cookies().get(LAYOUT_CONFIG_COOKIE)?.value);
    const layoutConfig: LayoutConfig = { ...DEFAULT_LAYOUT_CONFIG, ...savedConfig };

    return (
        <html lang="en" style={{ fontSize: `${layoutConfig.scale}px` }} suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/${layoutConfig.theme}/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <Providers initialLayoutConfig={layoutConfig}>{children}</Providers>
            </body>
        </html>
    );
}
