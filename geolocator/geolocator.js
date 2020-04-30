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
/******/ 	return __webpack_require__(__webpack_require__.s = "./geolocator/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./geolocator/here.ts":
/*!****************************!*\
  !*** ./geolocator/here.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar index_1 = __webpack_require__(/*! ./index */ \"./geolocator/index.ts\");\r\nvar Here = /** @class */ (function () {\r\n    /**\r\n     *\r\n     * @param {any} geolocator\r\n     * @constructor Activates the setAuto function and gets access to the Geolocator class object\r\n     */\r\n    function Here(geolocator) {\r\n        this._applicationID = ''; // HERE api verification credentials must be provided separately as they are account specific\r\n        this._applicationCODE = '';\r\n        this.geolocator = geolocator;\r\n        this.setAuto();\r\n    }\r\n    /**\r\n     * Contains the angular controller and all the functions associated with it\r\n     * @function setList\r\n     */\r\n    Here.prototype.setAuto = function () {\r\n        var that = this.geolocator;\r\n        var here = this;\r\n        var myMap = window.RAMP.mapById('geolocator');\r\n        myMap.layersObj.addLayer('pointLayer');\r\n        this.geolocator.api.agControllerRegister('autoCtrl', function ($scope) {\r\n            var _this = this;\r\n            this.list = [];\r\n            /**\r\n             * Queries using the HERE api to receive 5 suggested results and then calls the setList function\r\n             * and passes the json as a param\r\n             * @function autoComplete\r\n             */\r\n            this.autoComplete = function () {\r\n                var place = _this.address;\r\n                // Parameters for api call using Here api\r\n                var params = \"?query= \" + place + \" &country=CAN \\n                        &maxresults=5\\n                        &app_id= \" + here._applicationID + \"\\n                        &app_code= \" + here._applicationCODE;\r\n                // The search text (place) which is the basis of the query\r\n                new Promise(function (resolve) {\r\n                    $.ajax({\r\n                        method: 'GET',\r\n                        url: \"\" + that._RV.getConfig('plugins').geolocator.api.url[0].value + params,\r\n                        cache: false,\r\n                        dataType: 'json',\r\n                        success: function (json) {\r\n                            resolve(_this.setList(json, _this.address));\r\n                        },\r\n                    });\r\n                });\r\n            };\r\n            /**\r\n             * Recieves the json from the api and creates a list to be displayed in the panel\r\n             * @function\r\n             * @param {any} locat Contains the json of results from the api\r\n             * @param {string} address Contains the original query from the user\r\n             */\r\n            this.setList = function (locat, address) {\r\n                var myList = [];\r\n                for (var _i = 0, _a = locat.suggestions; _i < _a.length; _i++) {\r\n                    var item = _a[_i];\r\n                    myList.push({ name: item.label, location: item.locationId });\r\n                }\r\n                _this.list = (myList.length > 0 || address.length === 0) ? myList : _this.list;\r\n                $scope.$apply(); // Makes sure the list is properly refreshed\r\n            };\r\n            /**\r\n             * Receives the item selected by the user from the list and queries the api again\r\n             * to get the coordinates using its locationId\r\n             * Calls the poinZoom function to initiate the zoom to location and places a point\r\n             * @function\r\n             * @param {any} place The name of the item that was selected\r\n             */\r\n            this.getLoc = function (place) {\r\n                // Parameters for Here api call \r\n                var params = \"?locationid=  \" + encodeURIComponent(place.item.location) + \"\\n                        &app_id=  \" + here._applicationID + \"\\n                        &app_code= \" + here._applicationCODE;\r\n                new Promise(function (resolve) {\r\n                    $.ajax({\r\n                        method: 'GET',\r\n                        url: \"\" + that._RV.getConfig('plugins').geolocator.api.url[1].value + params,\r\n                        cache: false,\r\n                        type: 'get',\r\n                        dataType: 'json',\r\n                        success: function (json) { resolve(json); },\r\n                    });\r\n                }).then(function (json) {\r\n                    //Getting coordinates from the returned json \r\n                    var _finalCoords = [];\r\n                    _finalCoords[0] = json.Response.View[0].Result[0].Location.DisplayPosition.Longitude; //Final coords to be used to zoom to location\r\n                    _finalCoords[1] = json.Response.View[0].Result[0].Location.DisplayPosition.Latitude;\r\n                    var coordsLoc = _finalCoords;\r\n                    var myMap = window.RAMP.mapById('geolocator');\r\n                    var ramp = window.RAMP;\r\n                    var pointLayer = myMap.layers.getLayersById('pointLayer')[0]; // Creates the layer on the map the point will be added to \r\n                    pointLayer.removeGeometry(); // Removed the point added from a previous selection\r\n                    var iconShape = that._RV.getConfig('plugins').geolocator.iconShape;\r\n                    // 'Geolocator' is the identifier for the map found in geo-index.html 27\r\n                    index_1.Geolocator.pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);\r\n                    //Zooms to the coordinates on the map and adds an icon\r\n                });\r\n            };\r\n        }); //End of angular controller\r\n    }; // End of setList() function \r\n    return Here;\r\n}()); // End of class HERE\r\nexports.Here = Here;\r\n\n\n//# sourceURL=webpack:///./geolocator/here.ts?");

/***/ }),

/***/ "./geolocator/index.ts":
/*!*****************************!*\
  !*** ./geolocator/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar templates_1 = __webpack_require__(/*! ./templates */ \"./geolocator/templates.ts\");\r\nvar nrcan_1 = __webpack_require__(/*! ./nrcan */ \"./geolocator/nrcan.ts\");\r\nvar here_1 = __webpack_require__(/*! ./here */ \"./geolocator/here.ts\");\r\nvar Geolocator = /** @class */ (function () {\r\n    function Geolocator() {\r\n        this._cssPanel = { top: '60px',\r\n            left: '0px',\r\n            bottom: '400px',\r\n            width: '800px' };\r\n    }\r\n    /**\r\n    * Plugin init\r\n    * @function init\r\n    * @param {Any} api the viewer api\r\n    */\r\n    Geolocator.prototype.init = function (api) {\r\n        var _this = this;\r\n        this.api = api;\r\n        this.button = this.api.mapI.addPluginButton(Geolocator.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());\r\n        RAMP.mapAdded.subscribe(function () {\r\n            _this.makePanel();\r\n        });\r\n    };\r\n    /**\r\n    * Creates original instance of the panel when plugin is loaded\r\n    * @function makePanel\r\n    * @class Decides which class to activate based on the config file chosen\r\n    */\r\n    Geolocator.prototype.makePanel = function () {\r\n        // Chose which api to use\r\n        if (this._RV.getConfig('plugins').geolocator.api.type === \"Here\") {\r\n            new here_1.Here(this);\r\n        }\r\n        else if (this._RV.getConfig('plugins').geolocator.api.type === \"NRCan\") {\r\n            new nrcan_1.NRCan(this);\r\n        }\r\n        this.panel = this.api.panels.create('geolocatorPanel');\r\n        ;\r\n        // Size and location of original panel\r\n        this.panel.element.css(this._cssPanel);\r\n        // Adds a close panel button and collapse panel button\r\n        var closeBtn = this.panel.header.closeButton;\r\n        var toggleBtn = this.panel.header.toggleButton;\r\n        // Adds title for panel which will change languages if that option is changed in the menu\r\n        this.panel.header.title = Geolocator.prototype.translations[this._RV.getCurrentLang()].title;\r\n        // Adds the input and select boxes to the panel \r\n        this.panel.body = templates_1.INPUT_BOX;\r\n        this.panel.open();\r\n        this.button.isActive = !this.button.isActive;\r\n    };\r\n    /**\r\n   * Event to fire on side menu item click. Open/Close the panel\r\n   * @function onMenuItemClick\r\n   * @return {function} The function to run, open/close\r\n   */\r\n    Geolocator.prototype.onMenuItemClick = function () {\r\n        var _this = this;\r\n        return function () {\r\n            _this.button.isActive = !_this.button.isActive;\r\n            if (_this.button.isActive) {\r\n                _this.panel.open();\r\n                _this._RV.toggleSideNav('close');\r\n            }\r\n            else {\r\n                _this.panel.close();\r\n            }\r\n        };\r\n    };\r\n    /**\r\n     * Receives a set of xy coordinates and uses them to move the map to that location and zoom in\r\n     * Places a point on the map at the coordinate location\r\n     * @param {string} mapId Map identifier found in geo-index.html\r\n     * @param {Array<Number>} addressCoords Coords to zoom to & place the icon\r\n     * @param {any} myMap Api variable\r\n     * @param {any} ramp Api\r\n     * @param {any} pointLayer Layer the icon is added to\r\n     * @param {string} iconShape Info about the shape being placed\r\n     * @static\r\n     */\r\n    Geolocator.pointZoom = function (mapId, addressCoords, myMap, ramp, pointLayer, iconShape) {\r\n        var pt = new ramp.GEO.XY(addressCoords[0], addressCoords[1]);\r\n        myMap.zoom = 13;\r\n        myMap.setCenter(pt);\r\n        var marker = new ramp.GEO.Point('locGeo', [addressCoords[0], addressCoords[1]], {\r\n            style: 'ICON',\r\n            icon: iconShape,\r\n            colour: [45, 45, 200, 100],\r\n            width: 25\r\n        });\r\n        pointLayer.addGeometry(marker);\r\n    };\r\n    return Geolocator;\r\n}()); // End of Class Geolocator\r\nexports.Geolocator = Geolocator;\r\nGeolocator.prototype.translations = {\r\n    'en-CA': {\r\n        title: 'Geolocation',\r\n        input: 'Your Address',\r\n        auto: 'Click here to choose the correct address'\r\n    },\r\n    'fr-CA': {\r\n        title: 'Géolocalisation',\r\n        input: 'Votre Addresse',\r\n        auto: 'Cliquez ici pour choisir la bonne adresse'\r\n    }\r\n};\r\nwindow.geolocator = Geolocator;\r\n\n\n//# sourceURL=webpack:///./geolocator/index.ts?");

/***/ }),

/***/ "./geolocator/loader.js":
/*!******************************!*\
  !*** ./geolocator/loader.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./geolocator/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./geolocator/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\n\n//# sourceURL=webpack:///./geolocator/loader.js?");

/***/ }),

/***/ "./geolocator/main.scss":
/*!******************************!*\
  !*** ./geolocator/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./geolocator/main.scss?");

/***/ }),

/***/ "./geolocator/nrcan.ts":
/*!*****************************!*\
  !*** ./geolocator/nrcan.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar index_1 = __webpack_require__(/*! ./index */ \"./geolocator/index.ts\");\r\nvar NRCan = /** @class */ (function () {\r\n    /**\r\n     *\r\n     * @param geolocator\r\n     * @constructor Activates the setAuto function and gets access to the Geolocator class object\r\n     */\r\n    function NRCan(geolocator) {\r\n        this.geolocator = geolocator;\r\n        this.setAuto();\r\n    }\r\n    /**\r\n     * Contains the angular controller and all the functions associated with it\r\n     * @function\r\n     */\r\n    NRCan.prototype.setAuto = function () {\r\n        var that = this.geolocator;\r\n        var myMap = window.RAMP.mapById('geolocator');\r\n        myMap.layersObj.addLayer('pointLayer');\r\n        this.geolocator.api.agControllerRegister('autoCtrl', function ($scope) {\r\n            var _this = this;\r\n            this.list = [];\r\n            /**\r\n             * Queries using the NRCan api to receive suggested results and then calls the setList function\r\n             * and passes the json containing the results as a param\r\n             * @function autoComplete\r\n             */\r\n            this.autoComplete = function () {\r\n                var place = _this.address;\r\n                new Promise(function (resolve) {\r\n                    $.ajax({\r\n                        method: 'GET',\r\n                        url: that._RV.getConfig('plugins').geolocator.api.url[0].value,\r\n                        cache: false,\r\n                        dataType: 'json',\r\n                        data: \"q=\" + place,\r\n                        success: function (json) { resolve(_this.setList(json, _this.address)); }\r\n                    });\r\n                });\r\n            };\r\n            /**\r\n             * Recieves the json from the api and creates a list to be displayed in the panel\r\n             * @function\r\n             * @param {any} locat Contains the json of results from the api\r\n             * @param {string} address Contains the original query from the user\r\n             */\r\n            this.setList = function (locat, address) {\r\n                var myList = [];\r\n                for (var i in locat) {\r\n                    myList.push({ name: locat[i].title, location: locat[i].geometry.coordinates });\r\n                }\r\n                _this.list = (myList.length > 0 || address.length === 0) ? myList : _this.list;\r\n                $scope.$apply(); // Makes sure the list is properly refreshed\r\n            };\r\n            /**\r\n             * Called when an autoselect option is chosen and then initiates the zoom to location using pointZoom() function\r\n             * @function\r\n             * @param {any} place The name of the item that was selected by the user\r\n             */\r\n            this.getLoc = function (place) {\r\n                var coordsLoc = place.item.location;\r\n                var myMap = window.RAMP.mapById('geolocator');\r\n                var ramp = window.RAMP;\r\n                var pointLayer = myMap.layers.getLayersById('pointLayer')[0];\r\n                pointLayer.removeGeometry();\r\n                var iconShape = that._RV.getConfig('plugins').geolocator.iconShape;\r\n                // 'Geolocator' is the identifier for the map found in geo-index.html 27\r\n                index_1.Geolocator.pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);\r\n                //Zooms to the coordinates on the map and adds an icon\r\n            };\r\n        });\r\n    }; // End of set Auto\r\n    return NRCan;\r\n}()); // End of NRCan class\r\nexports.NRCan = NRCan;\r\n\n\n//# sourceURL=webpack:///./geolocator/nrcan.ts?");

/***/ }),

/***/ "./geolocator/templates.ts":
/*!*********************************!*\
  !*** ./geolocator/templates.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n// panels template: geolocator\r\nexports.INPUT_BOX = \"\\n<div>\\n    <div class ng-controller=\\\"autoCtrl as ctrl\\\" id= \\\"box\\\">\\n        <md-input-container style=\\\"display: block\\\">  \\n            <label for=\\\"location\\\">{{ 'plugins.geolocator.input' | translate }}</label>\\n                <input class=\\\"w3-input w3-border-green w3-pale-blue w3-round-large\\\"\\n                    type = \\\"text\\\"\\n                    id = \\\"loc\\\"\\n                    ng-model= \\\"ctrl.address\\\"\\n                    ng-change= \\\"ctrl.autoComplete()\\\">\\n                </input>\\n        </md-input-container>\\n        <md-list style = \\\"display: inline-block\\\" ng-model =\\\"ctrl.list\\\">\\n            <md-list-item class=\\\"\\\" ng-repeat=\\\"item in ctrl.list\\\" ng-click=\\\"ctrl.getLoc(this)\\\">\\n                {{item.name}}\\n            </md-list-item>\\n        </md-list>\\n    </div>        \\n</div>\";\r\n\n\n//# sourceURL=webpack:///./geolocator/templates.ts?");

/***/ })

/******/ });