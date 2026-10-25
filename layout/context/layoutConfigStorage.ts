import { LayoutConfig } from '@/types';

/**
 * Persistência das preferências de layout (tema, esquema de cores e escala) em cookie.
 * O cookie é lido no servidor (app/layout.tsx) para renderizar o tema correto já no
 * primeiro HTML, evitando o "flash" do tema padrão ao recarregar a página.
 */

export const LAYOUT_CONFIG_COOKIE = 'layout-config';

export type PersistedLayoutConfig = Pick<LayoutConfig, 'theme' | 'colorScheme' | 'scale'>;

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-teal',
    scale: 14
};

const MIN_SCALE = 12;
const MAX_SCALE = 16;

/** Lê e valida o valor do cookie, retornando apenas campos válidos. */
export const parseLayoutConfigCookie = (value?: string): Partial<PersistedLayoutConfig> => {
    if (!value) return {};

    try {
        const parsed = JSON.parse(decodeURIComponent(value));
        const result: Partial<PersistedLayoutConfig> = {};

        // O nome do tema vai para o href do <link>, então só aceita caracteres seguros
        if (typeof parsed.theme === 'string' && /^[a-z0-9-]+$/.test(parsed.theme)) {
            result.theme = parsed.theme;
        }
        if (parsed.colorScheme === 'light' || parsed.colorScheme === 'dark') {
            result.colorScheme = parsed.colorScheme;
        }
        if (typeof parsed.scale === 'number' && parsed.scale >= MIN_SCALE && parsed.scale <= MAX_SCALE) {
            result.scale = parsed.scale;
        }

        return result;
    } catch {
        return {};
    }
};

/** Grava as preferências no cookie (válido por 1 ano). */
export const saveLayoutConfigCookie = ({ theme, colorScheme, scale }: PersistedLayoutConfig) => {
    const value = encodeURIComponent(JSON.stringify({ theme, colorScheme, scale }));
    document.cookie = `${LAYOUT_CONFIG_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
};

