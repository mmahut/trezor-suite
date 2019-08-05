describe('Buttons', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit('/iframe.html?selectedKind=Buttons&selectedStory=All&full=0');
    });

    [
        'button_loading_success',
        'button_loading_info',
        'button_loading_warning',
        'button_loading_error',
        'button_loading_white',
        'button_loading_transparent',
        'button_loading_disabled',
        'button_inverse_success',
        'button_inverse_info',
        'button_inverse_warning',
        'button_inverse_error',
        'button_inverse_white',
        'button_inverse_transparent',
        'button_inverse_disabled',
    ].forEach(testName => {
        it(`${testName}`, () => {
            cy.getTestElement(testName)
                .should('be.visible')
                .find('.loading-svg')
                .should('not.be.visible');

            cy.getTestElement(testName)
                .matchImageSnapshot();
        });
    });

});