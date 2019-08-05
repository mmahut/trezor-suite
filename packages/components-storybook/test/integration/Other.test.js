describe('Other', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit('/iframe.html?selectedKind=Other&selectedStory=All&full=0');
    });

    const tests = [
        // icons
        'ARROW_DOWN',
        'ARROW_LEFT',
        'ARROW_UP',
        'BACK',
        'CHAT',
        'CLOSE',
        'COG',
        'DOWNLOAD',
        'EJECT',
        'ERROR',
        'EYE_CROSSED',
        'EYE',
        'HELP',
        'INFO',
        'MENU',
        'PLUS',
        'QRCODE',
        'REFRESH',
        'SKIP',
        'SUCCESS',
        'T1',
        'T2',
        'TOP',
        'WALLET_HIDDEN',
        'WALLET_STANDARD',
        'WARNING',
        'CLOUD_CROSSED',
        'DOWNLOAD_CROSSED',
        'PHOTO_CROSSED',
        // coins
        'ada',
        'bch',
        'btc',
        'btg',
        'dash',
        'dgb',
        'doge',
        'etc',
        'eth',
        'ltc',
        'nem',
        'nmc',
        'rinkeby',
        'trop',
        'txrp',
        'vtc',
        'xem',
        'xlm',
        'xrp',
        'zec',
        'xtz',
        // other
        'prompt_1',
        'prompt_2',
        'trezor_image_1',
        'trezor_image_2',
        'trezor_logo_horizontal',
        'trezor_logo_vertical',
        'header',
        'loader_default',
        'loader_small_text',
        'loader_transparent_route',
        'loader_white_text',
        'loader_white_text_transparent',
    ];

    tests.forEach(testName => {
        it(`${testName}`, () => {
            cy.getTestElement(testName)
                .should('be.visible')
                .matchImageSnapshot();
        });
    });
});