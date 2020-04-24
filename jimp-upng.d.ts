import { JimpType, Image, Bitmap } from "@jimp/core";
declare function jimpUPNG(): JimpType<jimpUPNG.UPNGImage>;

declare namespace jimpUPNG {
    /**
     * Represents a bitmap converted to a jimp image using the built-in decoder
     */
    interface UPNGConvertBitmap extends UPNGBitmap {
        frames: ImageFrame[];
        colorDepth: number;
        colorType: number;
    }

    /**
     * Represents a bitmap converted to a jimp image using 
     * [[ImageFrame#bitmap]] or the built-in decoder
     */
    interface UPNGBitmap extends Bitmap {
        delay: number;
        dispose: APNGFrameDisposal;
        blend: APNGFrameBlend;
    }

    /**
     * Represents a converted image
     */
    interface UPNGImage extends Image {
        bitmap: UPNGConvertBitmap;
    }

    /**
     * Represents raw frame data from UPNG.js
     */
    interface UPNGImageData {
        delay: number;
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        }

        dispose: APNGFrameDisposal;
        blend: APNGFrameBlend;
        data: Uint8Array;
    }

    /**
     * Represents an image frame
     */
    export class ImageFrame {
        public constructor(upngData: UPNGImageData);
        public delay: number;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public dispose: APNGFrameDisposal;
        public disposeMethod: APNGFrameDisposal;
        public blend: APNGFrameBlend;
        public blendMethod: APNGFrameBlend;
        public raw: UPNGImageData;

        get bitmap(): UPNGBitmap;
        public static createFromJIMP(img: Image, opts?: UPNGImageData & {
            x?: number;
            y?: number;
        });
    }

    /**
     * Frame disposal options
     */
    export enum APNGFrameDisposal {
        /**
         * Don't do anything
         */
        NONE = 0,
        /**
         * Restore the frame to the background
         */
        BACKGROUND = 1,
        /**
         * Restore the frame to the previous frame
         */
        PREVIOUS = 2
    }

    /**
     * Frame blending options
     */
    export enum APNGFrameBlend {
        /**
         * Overwrite the old source
         */
        SOURCE = 0,
        /**
         * Composite the image over the old source
         */
        OVER = 1
    }
}

export = jimpUPNG;