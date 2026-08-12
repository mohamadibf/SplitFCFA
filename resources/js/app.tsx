import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Pages that render their own full SplitFCFA chrome (sidebar/card) and must not
// be wrapped by AppLayout/AuthLayout/SettingsLayout. Note: a page's static
// `Component.layout` property is NOT a reliable way to opt out of the layout
// returned here — Inertia calls it with the page's *props*, not the rendered
// element, so an identity function like `(page) => page` can still resolve to
// the default layout depending on the props' shape. Opting out here, the same
// way `welcome` already did, is the only mechanism that's actually safe.
const NO_LAYOUT_PAGES = new Set([
    'welcome',
    'dashboard',
    'expenses/index',
    'settle-up',
    'analytics',
    'auth/login',
    'auth/register',
    'auth/forgot-password',
    'auth/two-factor-challenge',
    'settings/profile',
    'settings/security',
    'settings/appearance',
]);

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case NO_LAYOUT_PAGES.has(name):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
