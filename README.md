# untar-sync

This is a library for extracting tar files in the browser or other JS environments, in a synchronous manner. It is based on [js-untar](https://github.com/InvokIT/js-untar).

## Why not js-untar?

The original library, [js-untar](https://github.com/InvokIT/js-untar), always uses [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) when extracting files. This is useful if you are using the library on the main thread, but if you're already calling the library from within a worker, then this is redundant. In some cases, you also might want a synchronous API over an async one.

Additionally, js-untar has requirements for newer JS features such as [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob). These might not be available in more primitive JS engines. 

This library is also smaller than the original due to the removal of the promise and web worker code. The original js-untar is 2.54kb when compressed, while untar-sync is 1.53kb when compressed. 

## Installation

Using NPM:
```
npm i untar-sync
```

## API Documentation
You may load this library using CommonJS, ES6 modules, or just a plain JS file that creates a global variable. 

For example: 
```js
import untar from "untar-sync";

//load the tar file as an array buffer using any method such the fetch api
var tarFile = [...];
var files = untar(tarFile);
```

The `untar()` function always takes an ArrayBuffer as the only argument. It returns a list of File objects synchronously. No promises are used here.

Here's another example. This extracts a `tar.gz` by using [pako](https://github.com/nodeca/pako) to decompress it first. It loads the libraries from a CDN. 
```html
<script src="https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/untar-sync@1.0.2/dist/untar.js"></script>
<script>
  var compressedTar = [...];
  var tarFile = pako.deflate(compressedTar);
  var files = untar(tarFile.buffer);
  console.log(files);
</script>
```

### File object
This section is modified from the original js-untar documentation. The File objects in untar-sync are the same, although some utility functions have been removed.

The returned file object(s) has the following properties. Most of these are explained in the [Tar wikipedia entry](https://en.wikipedia.org/wiki/Tar_(computing)#File_format).

* `name` = The full filename (including path and ustar filename prefix).
* `mode`
* `uid`
* `gid`
* `size`
* ``mtime``
* `checksum`
* `type`
* `linkname`
* `ustarFormat`
* `buffer` An ArrayBuffer with the contents of the file.

If the .tar file was in the ustar format (which most are), the following properties are also defined:

* `version`
* `uname`
* `gname`
* `devmajor`
* `devminor`
* `namePrefix`

Additional vendor-specific PAX header fields might also be defined.

## License
This library is licensed under the MIT license. 