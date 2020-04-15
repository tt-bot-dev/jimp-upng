# jimp-upng
Replaces [jimp](https://github.com/oliver-moran/jimp)'s default parser with [UPNG.js](https://github.com/photopea/UPNG.js)

## Usage
Simply load jimp-upng as the last type:
```js
const upngPlugin = require("jimp-upng");
const Jimp = require("@jimp/custom")({
    plugins: [ require("@jimp/plugins") ],
    types: [ require("@jimp/types"), upngPlugin ]
});
```