"use strict";
class ImageFrame {
    constructor(rawFrameData) {
        /**
         * The delay of a frame
         * @type {number}
         */
        this.delay = rawFrameData.delay;
        const { x, y, width, height } = rawFrameData.rect;
        /**
         * The position to animate on the X axis
         * @type {number}
         */
        this.x = x;
        /**
         * The position to animate on the Y axis
         * @type {number}
         */
        this.y = y;
        /**
         * The width of the frame
         * @type {number}
         */
        this.width = width;
        /**
         * The height of the frame
         * @type {number}
         */
        this.height = height;
        /**
         * The disposal method of the frame
         * @type {number}
         */
        this.dispose = this.disposeMethod = rawFrameData.dispose;
        /**
         * The blending method of the frame
         * @type {number}
         */
        this.blend = this.blendMethod = rawFrameData.blend;

        /**
         * The color data
         * @type {Buffer}
         */
        this.data = Buffer.from(rawFrameData.data.buffer);

        /**
         * The delay of the frame in milliseconds
         * @type {number}
         */
        this.delay = rawFrameData.delay;
        /**
         * Whatever came out of upng.js
         */
        this.raw = rawFrameData;
    }

    /**
     * Returns a JIMP compatible bitmap with the frame metadata
     * @returns {import("@jimp/core").Bitmap}
     */
    get bitmap() {
        return {
            width: this.width,
            height: this.height,
            data: this.data,

            delay: this.delay,
            dispose: this.dispose,
            blend: this.blend
        };
    }

    /**
     * Create an ImageFrame from a JIMP image
     * @param {import("@jimp/core").Image} img The JIMP image
     * @param {object} opts The options for the frame
     */
    static createFromJIMP(img, opts) {
        const o = {...opts}
        delete o.rect;
        const opt = {
            dispose: 1,
            blend: 0,
            rect: {
                x: opts && opts.rect &&
                    opts.rect.x != null ? opts.rect.x : opts && (opts.x || 0),
                y: opts && opts.rect &&
                    opts.rect.y != null ? opts.rect.y : opts && (opts.y || 0),
                width: opts && opts.rect &&
                    opts.rect.width != null ? opts.rect.height : img.bitmap.width,
                height: opts && opts.rect &&
                    opts.rect.height != null ? opts.rect.height : img.bitmap.height
            },
            data: img.bitmap.data,
            ...o
        };
        return new ImageFrame(opt);
    }
}

module.exports = ImageFrame;