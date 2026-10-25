'use client';

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import AppConfig from './AppConfig';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const configPanelRef = useRef<OverlayPanel>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <span>Escola-Web</span>
            </Link>

            <Button
                ref={menubuttonRef as any}
                type="button"
                icon="pi pi-bars"
                rounded
                aria-label="Menu"
                size="large"
                className="layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            />

            <Button
                ref={topbarmenubuttonRef as any}
                type="button"
                icon="pi pi-ellipsis-v"
                rounded
                aria-label="Mais opções"
                className="layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            />

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Button type="button" icon="pi pi-user" rounded aria-label="Perfil" size="large" tooltip="Perfil" tooltipOptions={{ position: 'bottom' }} className="layout-topbar-button" />
                <Button
                    type="button"
                    icon="pi pi-cog"
                    rounded
                    tooltip="Configurações"
                    size="large"
                    tooltipOptions={{ position: 'bottom' }}
                    aria-label="Configurações"
                    className="layout-topbar-button"
                    onClick={(e) => configPanelRef.current?.toggle(e)}
                />
                <OverlayPanel ref={configPanelRef} className="w-20rem">
                    <AppConfig />
                </OverlayPanel>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
