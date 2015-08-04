# MixedArgs

This is a simple tool for creating function that accepts multiple combination of arguments. This can be used in **NodeJS** or **browser**.

### Installation

NodeJS:

```sh
$ npm install mixedargs --save
```

Browser:
```js
bower install mixedargs --save
```
### Usage
```js
//In node only
var mixedargs = require('mixedargs');

var showError = function() {

    var args = mixedargs(arguments);

    if( args.when(['String', 'Number']) ) {
        //Message, ErrorCode
    }
    else if( args.when(['String', 'Number', 'Number']) ) {
        //Message, ErrorCode, HttpCode
    }
    else if( args.when(['String', 'String']) ) {
        //Message, ErrorType
    }
}
```
