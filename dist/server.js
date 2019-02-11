/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(3);

var _App = __webpack_require__(4);

var _App2 = _interopRequireDefault(_App);

var _Html = __webpack_require__(5);

var _Html2 = _interopRequireDefault(_Html);

var _stream = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 
var createCacheStream = function createCacheStream(key) {
	var bufferedChunks = [];
	return new _stream.Transform({
		// transform() is called with each chunk of data
		transform: function transform(data, enc, cb) {
			// We store the chunk of data (which is a Buffer) in memory
			bufferedChunks.push(data);
			// Then pass the data unchanged onwards to the next stream
			cb(null, data);
		},


		// flush() is called when everything is done
		flush: function flush(cb) {
			// We concatenate all the buffered chunks of HTML to get the full HTML
			// then cache it at "key"
			cache.set(key, Buffer.concat(bufferedChunks));
			cb();
		}
	});
};

var port = 3000;
var server = (0, _express2.default)();

server.get('/', function (req, res) {
	/**
  * renderToString() will take our React app and turn it into a string
  * to be inserted into our Html template function.
  */
	// const body = renderToNodeStream(<App />);
	// const title = 'Server side Rendering with Styled Components';

	// res.send(
	// 	Html({
	// 		body,
	// 		title
	// 	})
	// );
	// Create the cache stream and pipe it into the response
	// Send the start of your HTML to the browser
	res.write('<html><head><title>Page</title></head><body><div id="root">');

	// Render your frontend to a stream and pipe it to the response
	var stream = (0, _server.renderToNodeStream)(_react2.default.createElement(_App2.default, null));
	stream.pipe(res, { end: 'false' });

	// When React finishes rendering send the rest of your HTML to the browser
	stream.on('end', function () {
		res.end('</div></body></html>');
	});
});

server.listen(port);
console.log('Serving at http://localhost:' + port);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    'HOLAAAAA!'
  );
};

exports.default = App;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
var Html = function Html(_ref) {
  var body = _ref.body,
      title = _ref.title;
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>" + title + "</title>\n    </head>\n    <body style=\"margin:0\">\n      <div id=\"app\">" + body + "</div>\n    </body>\n  </html>\n";
};

exports.default = Html;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ })
/******/ ]);