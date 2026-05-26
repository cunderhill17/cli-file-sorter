const { extensionCleanup } = require('../../src/utils/paths');

describe('extensionCleanup', () => {

    test('handles a single extension string', () => {
        expect(extensionCleanup('.jpg')).toEqual(['jpg']);
    });

    test('handles an array of extensions', () => {
        expect(extensionCleanup(['.jpg', '.png'])).toEqual(['jpg', 'png']);
    });

    test('removes leading dots', () => {
        expect(extensionCleanup(['.jpg', 'png'])).toEqual(['jpg', 'png']);
    });

    test('removes multiple dots', () => {
        expect(extensionCleanup(['...jpg'])).toEqual(['jpg']);
    });

    test('lowercases all extensions', () => {
        expect(extensionCleanup(['JPG', 'Png'])).toEqual(['jpg', 'png']);
    });

    test('deduplicates extensions', () => {
        expect(extensionCleanup(['.jpg', 'jpg', 'JPG'])).toEqual(['jpg']);
    });

    test('handles mixed formatting', () => {
        expect(extensionCleanup([' .JpG ', 'PNG', '.png'])).toEqual(['jpg', 'png']);
    });

});
