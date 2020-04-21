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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./swiper/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./swiper/index.ts":
/*!*************************!*\
  !*** ./swiper/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Swiper = /** @class */ (function () {\r\n    function Swiper() {\r\n        this.closureFunc = function (fn) {\r\n            var params = [];\r\n            for (var _i = 1; _i < arguments.length; _i++) {\r\n                params[_i - 1] = arguments[_i];\r\n            }\r\n            var args = Array.prototype.slice.call(arguments, 1);\r\n            return function () {\r\n                // Clone the array (with slice()) and append additional arguments\r\n                // to the existing arguments.\r\n                var newArgs = args.slice();\r\n                newArgs.push.apply(newArgs, arguments);\r\n                return fn.apply(this, newArgs);\r\n            };\r\n        };\r\n    }\r\n    Swiper.prototype.init = function (mapApi) {\r\n        var _this = this;\r\n        this.mapApi = mapApi;\r\n        // get swiper config\r\n        this.config = this._RV.getConfig('plugins').swiper;\r\n        this.config.language = this._RV.getCurrentLang();\r\n        var myBundlePromise = RAMP.GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);\r\n        myBundlePromise.then(function (myBundle) {\r\n            _this.setSwiper(myBundle, _this.config);\r\n        });\r\n    };\r\n    Swiper.prototype.setSwiper = function (myBundle, swiper) {\r\n        // add layers\r\n        var layers = [];\r\n        var len = swiper.layers.length;\r\n        while (len--) {\r\n            layers.push(this.mapApi.esriMap.getLayer(swiper.layers[len].id));\r\n        }\r\n        // add swiper div\r\n        this.mapApi.mapDiv.find('rv-shell').find('.rv-esri-map').prepend('<div id=\"rv-swiper-div\"></div>');\r\n        // create swiper\r\n        var swipeWidget = new myBundle.layerSwipe({\r\n            type: swiper.type,\r\n            map: this.mapApi.esriMap,\r\n            layers: layers\r\n        }, 'rv-swiper-div');\r\n        var that = this;\r\n        swipeWidget.on('load', function () {\r\n            var item = that.mapApi.mapDiv.find('#rv-swiper-div .vertical')[0];\r\n            // set tabindex and WCAG keyboard offset\r\n            item.tabIndex = -3;\r\n            item.addEventListener('keydown', that.closureFunc(function (swipeWidget, item, off, evt) {\r\n                var value = parseInt(item.style.left);\r\n                var width = parseInt(that.mapApi.mapDiv.find('#rv-swiper-div').width()) - 10;\r\n                if (evt.keyCode === 37 && value >= 0) {\r\n                    // left 37\r\n                    value = (value > off) ? value -= off : 0;\r\n                }\r\n                else if (evt.keyCode === 39 && value <= width) {\r\n                    // right 39\r\n                    value = (value <= width - off) ? value += off : width;\r\n                }\r\n                item.style.left = String(value + 'px');\r\n                swipeWidget.swipe();\r\n            }, swipeWidget, item, swiper.keyboardOffset));\r\n            // change text if french\r\n            if (that._RV.getCurrentLang() === 'fr-CA') {\r\n                item.title = 'Faites glisser pour voir les couches sous-jacentes';\r\n            }\r\n        });\r\n        swipeWidget.startup();\r\n    };\r\n    return Swiper;\r\n}());\r\nexports.default = Swiper;\r\nwindow.swiper = Swiper;\r\n\n\n//# sourceURL=webpack:///./swiper/index.ts?");

/***/ }),

/***/ "./swiper/loader.js":
/*!**************************!*\
  !*** ./swiper/loader.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./swiper/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./swiper/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\n\n//# sourceURL=webpack:///./swiper/loader.js?");

/***/ }),

/***/ "./swiper/main.scss":
/*!**************************!*\
  !*** ./swiper/main.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./swiper/main.scss?");

/***/ })

/******/ });