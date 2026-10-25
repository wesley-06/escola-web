'use client';
import React, { useState, createContext, useEffect, useRef } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import { DEFAULT_LAYOUT_CONFIG, saveLayoutConfigCookie } from './layoutConfigStorage';
export const LayoutContext = createContext({} as LayoutContextProps);

interface LayoutProviderProps extends ChildContainerProps {
    /** Configuração inicial lida do cookie no servidor */
    initialConfig?: LayoutConfig;
}

export const LayoutProvider = ({ children, initialConfig }: LayoutProviderProps) => {
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(initialConfig ?? DEFAULT_LAYOUT_CONFIG);
    const isFirstRender = useRef(true);

    // Salva tema, esquema de cores e escala no cookie sempre que mudarem
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        saveLayoutConfigCookie(layoutConfig);
    }, [layoutConfig]);

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
