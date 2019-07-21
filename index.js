"use strict";
const upng = require("upng-js"),
    ImageFrame = require("./ImageFrame"),
    mime = "image/png",
    trueMime = "image/apng";

function decode(data) {
    const d = upng.decode(data.buffer);
    return {
        data: Buffer.from(d.data.buffer),
        width: d.width,
        height: d.height,

        // HACK: JIMP does not pass the image along :(
        frames: d.frames.length ? d.frames.slice(1).map(f => new ImageFrame(f)) : [],
        colorDepth: d.depth,
        colorType: d.ctype,
        delay: d.frames[0] && d.frames[0].delay,
        dispose: d.frames[0] && d.frames[0].dispose,
        blend: d.frames[0] && d.frames[0].blend
    };
}

function encode(img) {
    return Buffer.from(upng.encode([img.bitmap.data.buffer, ...img.bitmap.frames.map(f => f.data.buffer)],
        img.bitmap.width,
        img.bitmap.height,
        0,
        [img.bitmap.delay, ...img.bitmap.frames.map(f => f.delay)]));
}
const ex = () => ({
    mime: {
        [mime]: "png",
        [trueMime]: ["apng", "png"]
    },
    constants: {
        MIME_PNG: mime,
        MIME_APNG: trueMime
    },
    hasAlpha: {
        [mime]: true,
        [trueMime]: true
    },
    decoders: {
        [mime]() {
            return decode.apply(this, arguments);
        },
        [trueMime]() {
            return decode.apply(this, arguments);
        }
    },
    encoders: {
        [mime]() {
            return encode.apply(this, arguments);
        },
        [trueMime]() {
            return encode.apply(this, arguments);
        }
    }
});

ex.ImageFrame = ImageFrame;
/**
 * The methods of frame disposal
 * @enum {number}
 */
ex.APNGFrameDisposal = {
    /**
     * Don't do anything
     */
    NONE: 0,
    /**
     * Restore the frame to background
     */
    BACKGROUND: 1,
    /**
     * Restore the frame to the previous frame
     */
    PREVIOUS: 2
};

/**
 * The methods of frame blending
 * @enum {number}
 */
ex.APNGFrameBlend = {
    /**
     * Overwrite the old source
     */
    SOURCE: 0,
    /**
     * Composite the image over the old source
     */
    OVER: 1
};

module.exports = ex;
