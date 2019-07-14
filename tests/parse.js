const { encoders: {"image/png": encode},
    decoders: {"image/png": decode} } = require("../index.js")();
const { readFileSync } = require("fs");
describe("static image", function() {
    const image = decode(readFileSync("./png-image.png"));
    it("has 0 frames", function() {
        expect(image.frames.length).toBe(0);
    });
    it("has colorType defined", function() {
        expect(image.colorType).toBeDefined()
    })
    it("has colorDepth defined", function() {
        expect(image.colorDepth).toBeDefined()
    });
    it("has delay undefined", function() {
        expect(image.delay).not.toBeDefined()
    })
    it("has blend undefined", function() {
        expect(image.blend).not.toBeDefined()
    })
    it("has dispose undefined", function() {
        expect(image.dispose).not.toBeDefined()
    })
});

describe("animated image", function() {
    const image = decode(readFileSync("./apng-image.png"));
    it("has 19 frames excluding the first frame", function() {
        expect(image.frames.length).toBe(19);
    });
    it("has colorType defined", function() {
        expect(image.colorType).toBeDefined()
    })
    it("has colorDepth defined", function() {
        expect(image.colorDepth).toBeDefined()
    });
    it("has delay defined", function() {
        expect(image.delay).toBeDefined()
    })
    it("has blend undefined", function() {
        expect(image.blend).toBeDefined()
    })
    it("has dispose undefined", function() {
        expect(image.dispose).toBeDefined()
    })
});
