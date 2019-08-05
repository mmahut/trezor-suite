import {
    icons,
    variables
} from '@trezor/components';

describe('Other', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit('/iframe.html?selectedKind=Other&selectedStory=All&full=0');
    });

    const tests = [
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

    Object.keys(icons).forEach(icon => {
        tests.push(`icon_${icon.toLowerCase()}`);
    });

    variables.COINS.forEach(coin => {
        tests.push(`coin_${coin}`);
    });

    tests.forEach(testName => {
        it(`${testName}`, () => {
            cy.getTestElement(testName)
                .should('be.visible')
                .find('.loading-svg')
                .should('not.be.visible')
                .matchImageSnapshot();
        });
    });
});