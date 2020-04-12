# jimp-upng
Replaces [jimp](https://github.com/oliver-moran/jimp)'s default parser with [UPNG.js](https://github.com/photopea/UPNG.js)

## Usage
Simply load jimp-upng **after** @jimp/types or anything that modifies the encoders and/or decoders of the `image/png` or the `image/apng` type:
```js
const upngPlugin = require("jimp-upng");
const Jimp = require("@jimp/custom")({
    plugins: [ require("@jimp/plugins") ],
    types: [ require("@jimp/types"), upngPlugin ]
});
```

## API
### Image#bitmap
There are some additional properties to the image bitmap:
#### `frames: ImageFrame[]`
An array of ImageFrames representing the image frames of a PNG
#### `colorDepth: number`
The color depth of an image
#### `colorType: number`
The color type of an image
#### `delay: number`
First frame's delay in milliseconds
#### `dispose: number`
First frame's disposal method
#### `blend: number`
First frame's blending method

### ImageFrame
Represents a frame within an image.

#### `delay: number`
Frame's delay in milliseconds
#### `dispose: number`, `disposalMethod: number`
Frame's disposal method
#### `blend: number`, `blendMethod: number`
Frame's blending method
#### `x: number`, `y: number`
Represents the position of the frame on X axis and Y axis respectively
#### `width: number`
The width of the frame
#### `height: number`
The width of the frame
#### `data: Uint8Array`
The raw image data
#### `raw: object`
The input from UPNG.js
#### `get bitmap(): object`
Returns a jimp-compatible bitmap with frame metadata
#### `static createFromJIMP(img, opts): ImageFrame`
Creates an ImageFrame from a JIMP image
