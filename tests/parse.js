"use strict";
const { decoders: { "image/png": decode } } = require("../index.js")();
const { readFileSync } = require("fs");
const image = decode(readFileSync("./png-image.png"));
const animatedImage = decode(readFileSync("./apng-image.png"));
const ImageFrame = require("../ImageFrame");
describe("static image", function() {
    it("has 0 frames", function() {
        expect(image.frames.length).toBe(0);
    });
    it("has colorType defined", function() {
        expect(image.colorType).toBeDefined();
    });
    it("has colorDepth defined", function() {
        expect(image.colorDepth).toBeDefined();
    });
    it("has delay undefined", function() {
        expect(image.delay).not.toBeDefined();
    });
    it("has blend undefined", function() {
        expect(image.blend).not.toBeDefined();
    });
    it("has dispose undefined", function() {
        expect(image.dispose).not.toBeDefined();
    });
});

describe("animated image", function() {
    it("has 19 frames excluding the first frame", function() {
        expect(animatedImage.frames.length).toBe(19);
    });
    it("has colorType defined", function() {
        expect(animatedImage.colorType).toBeDefined();
    });
    it("has colorDepth defined", function() {
        expect(animatedImage.colorDepth).toBeDefined();
    });
    it("has delay defined", function() {
        expect(animatedImage.delay).toBeDefined();
    });
    it("has blend defined", function() {
        expect(animatedImage.blend).toBeDefined();
    });
    it("has dispose defined", function() {
        expect(animatedImage.dispose).toBeDefined();
    });
});

describe("ImageFrame", function() {
    const frame = ImageFrame.createFromJIMP(animatedImage);
    it("can convert JIMP frames to ImageFrames", function() {
        expect(frame).not.toThrow();
    });
    it("can convert ImageFrames to a JIMP compatible bitmap", function() {
        expect(frame.bitmap).not.toThrow();
    })
})