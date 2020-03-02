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
/******/ 	return __webpack_require__(__webpack_require__.s = "./geolocator/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./geolocator/index.ts":
/*!*****************************!*\
  !*** ./geolocator/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log(\"hello1\");\r\nvar Geolocator = /** @class */ (function () {\r\n    function Geolocator() {\r\n    }\r\n    Geolocator.prototype.init = function (api) {\r\n        var _this = this;\r\n        console.log(\"hello2\");\r\n        this.api = api;\r\n        console.log(\"hello3\");\r\n        var myInter = setInterval(function () {\r\n            if (typeof window.RAMP.mapById(_this.api.id) !== 'undefined') {\r\n                window.RAMP.mapById(\"geolocator\");\r\n                clearInterval(myInter);\r\n            }\r\n        }, 1000);\r\n        this.make_panel();\r\n    };\r\n    Geolocator.prototype.make_panel = function () {\r\n        this.panel = this.api.panels.create('geolocator');\r\n        this.panel.element.css({\r\n            top: '60px',\r\n            left: '0px',\r\n            bottom: '50px',\r\n            width: '800px',\r\n        });\r\n        var closeBtn = this.panel.header.closeButton;\r\n        this.panel.header.title = \"Geolocator\";\r\n        this.panel.body = '<div><h3>Enter Address Below</h3><md-button id=\"mypanel-btn1\" class=\"md-raised md-primary\">Submit</md-button></div>';\r\n        this.panel.open();\r\n    };\r\n    return Geolocator;\r\n}());\r\n//(<any>window).RAMP.mapById(`geolocator`)\r\nwindow.geolocator = Geolocator;\r\n\n\n//# sourceURL=webpack:///./geolocator/index.ts?");

/***/ })

/******/ });