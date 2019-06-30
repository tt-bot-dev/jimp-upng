"use strict";
const upng = require("upng-js"),
    ImageFrame = require("./ImageFrame"),
    mime = "image/png",
    trueMime = "image/apng";

function decode(data) {
    const d = upng.decode(data);
    this._colorType = d.ctype;
    this.colorDepth = d.depth;
    this.frames = d.frames.map(f => new ImageFrame(f));
    return {
        data: d.data,
        width: d.width,
        height: d.height
    }
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
            return decode.call(this, arguments);
        },
        [trueMime]() {
            return decode.call(this, arguments);
        }
    },
    encoders: {
        [mime](img) {
            return upng.encode([img.bitmap.data, ...img.frames.map(f => f.bitmap.data)],
            img.bitmap.width,
            img.bitmap.height,
            0,
            [img.delay, ...img.frames.map(f => f.delay)]);
        },
        [trueMime](img) {
            return Buffer.from(upng.encode([img.bitmap.data.buffer, ...img.frames.map(f => f.bitmap.data.buffer)],
            img.bitmap.width,
            img.bitmap.height,
            0,
            [img.delay, ...img.frames.map(f => f.delay)]));
        }
    },
    class: {
        _colorType: 0,
        frames: [],
        colorDepth: 0,
        delay: 0
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
}

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
}

module.exports = ex;