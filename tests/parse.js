const { encoders: {"image/png": encode},
    decoders: {"image/png": decode} } = require("../index.js")();
const { readFileSync } = require("fs");
describe("parsing a static image", function() {
    const image = decode(readFileSync("./png-image.png"));
    it("it has 0 frames", function() {
        expect(image.frames).toBe(0);
    });
    it("colorType is defined", function() {
        expect(image.colorType).toBeDefined()
    })
    it("colorDepth is defined", function() {
        expect(image.colorDepth).toBeDefined()
    });
    it("delay is undefined", function() {
        expect(image.delay).not.toBeDefined()
    })
});
