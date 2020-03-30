const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
    it('should geerate an unique id', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8)
    })
})