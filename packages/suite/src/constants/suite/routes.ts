import { ArrayElement } from '@suite/types/utils';

const walletParams = ['symbol', 'accountIndex', 'accountType'] as const;

const routes = [
    {
        name: 'suite-index',
        pattern: '/',
        app: 'wallet',
    },
    {
        name: 'suite-version',
        pattern: '/version',
        app: 'notSpecified',
        isStatic: true,
    },
    {
        name: 'suite-bridge',
        pattern: '/bridge',
        app: 'notSpecified',
        isStatic: true,
    },
    {
        name: 'onboarding-index',
        pattern: '/onboarding',
        app: 'onboarding',
        isStatic: true,
    },
    {
        name: 'suite-device-settings',
        pattern: '/settings',
        app: 'deviceManagement',
    },
    {
        name: 'suite-device-firmware',
        pattern: '/firmware',
        app: 'firmware',
        isStatic: true,
    },
    {
        name: 'suite-device-backup',
        pattern: '/backup',
        app: 'deviceManagement',
    },
    {
        name: 'wallet-index',
        pattern: '/wallet',
        app: 'wallet',
    },
    {
        name: 'wallet-settings',
        pattern: '/wallet/settings',
        app: 'wallet',
    },
    {
        name: 'wallet-import',
        pattern: '/wallet/import',
        app: 'wallet',
    },
    {
        name: 'wallet-account-summary',
        pattern: '/wallet/account',
        app: 'wallet',
        params: walletParams,
    },
    {
        name: 'wallet-account-transactions',
        pattern: '/wallet/account/transactions',
        app: 'wallet',
        params: walletParams,
    },
    {
        name: 'wallet-account-send',
        pattern: '/wallet/account/send',
        app: 'wallet',
        params: walletParams,
    },
    {
        name: 'wallet-account-receive',
        pattern: '/wallet/account/receive',
        app: 'wallet',
        params: walletParams,
    },
    {
        name: 'wallet-account-sign-verify',
        pattern: '/wallet/account/sign-verify',
        app: 'wallet',
        params: walletParams,
    },
] as const;

export type Route = {
    isStatic?: boolean;
    params?: typeof walletParams;
} & ArrayElement<typeof routes>;

export default [...routes] as Route[];
