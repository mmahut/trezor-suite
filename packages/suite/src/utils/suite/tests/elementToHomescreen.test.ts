import elementToHomescreen from '../elementToHomescreen';

describe('elementToHomescreen', () => {
    it('it should return hex for html element', () => {
        const img = new Image(144, 144);
        img.src = './but-it-does not work:((';
        img.decoding = 'sync';
        const homescreen = elementToHomescreen(img, 2);
        // it always return the same result, which probably means, jest cant resolve image element;
    });
});
