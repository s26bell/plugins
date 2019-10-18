"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OSDP = /** @class */ (function () {
    function OSDP() {
    }
    OSDP.prototype.init = function (api) {
        var _this = this;
        this.api = api;
        this.initUpdateExtentBox();
        // add the OSDP grapic layer
        var myInter = setInterval(function () {
            if (typeof window.RAMP.mapById(_this.api.id) !== 'undefined') {
                window.RAMP.mapById(_this.api.id).layersObj.addLayer('graphicsOSDP');
                // subscribe to add layer even to reorder the layers so graphicOSDP is always on top
                _this.api.layersObj.layerAdded.subscribe(function (layer) {
                    var map = window.RAMP.mapById(_this.api.id);
                    var pos = map.esriMap.graphicsLayerIds.length - 2;
                    // use a timeout because viewer always try to reoder graphic layers...
                    // if timeout is not an option, reoder layer when we add a new geometry
                    // pos is kind of optional, we can put 1000 and we know it will be always on top
                    setTimeout(function () {
                        map.esriMap.reorderLayer('graphicsOSDP', pos);
                    }, 5000);
                });
                // if config is empty-config, prevent zoom to append
                if (document.getElementById('mapOSDP').getAttribute('rv-config') === 'empty-config.json') {
                    _this.preventZoom(window.RAMP.mapById(_this.api.id));
                }
                // need to call later because if called before map initilize, rest of function is skipped
                _this.setZoomEndEvent(window.RAMP.mapById(_this.api.id));
                clearInterval(myInter);
            }
        }, 100);
        OSDP.instances[this.api.id] = this;
        // test url before trying to load
        this.testService({ 'url': 'https://geoportal.gc.ca/arcgis/rest/services/FGP/CSAS_CoralsSponges2010_EN/MapServer/18' });
        this.testService({ 'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0' });
    };
    OSDP.prototype.setZoomEndEvent = function (mapi) {
        mapi.esriMap.on('zoom-end', function (evt) {
            console.log("zoom level:  " + evt.level + ", new extent: " + JSON.stringify(evt.extent));
        });
        // I think you have already the code the extent change but I added it in case
        mapi.extentChanged.subscribe(function (evt) {
            console.log("new extent: " + JSON.stringify(evt));
        });
    };
    OSDP.prototype.preventZoom = function (mapi) {
        // disable mouse and touch navigation
        mapi.esriMap.disableMapNavigation();
        mapi.esriMap.disablePinchZoom();
        // set display none to +/- button to zoom in and out
        var elem = document.getElementsByClassName('rv-mapnav-content')[0];
        elem.style.display = 'none';
    };
    OSDP.prototype.addLayerByUUID = function (uuid) {
        // only works on legacy API for the moment
        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object
        this._RV.loadRcsLayers([uuid]);
    };
    OSDP.prototype.addLayerByConfig = function (mapId, config) {
        var myMap = window.RAMP.mapById(mapId);
        // If you want to add a layer by configuration you can use this
        var layerJSON = {
            'id': 'examplelayer',
            'name': 'An exemplary Layer',
            'layerType': 'esriFeature',
            'controls': [
                'remove',
                'visibility'
            ],
            'state': {
                'visibility': true,
                'boundingBox': false
            },
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'
        };
        var myConfigLayer = myMap.layers.addLayer(layerJSON);
    };
    OSDP.prototype.removeLayers = function (mapId) {
        var myMap = window.RAMP.mapById(mapId);
        // remove all layers from the using the legend block
        // will also remove bad layers
        var legentItem = myMap.ui.configLegend.children.slice();
        for (var _i = 0, legentItem_1 = legentItem; _i < legentItem_1.length; _i++) {
            var item = legentItem_1[_i];
            myMap.layersObj.removeLayer(item._legendBlock._blockConfig._layerId);
        }
        // close legend
        myMap.panels.legend.close();
    };
    // function to fire on add layer and remove layer
    OSDP.prototype.layersEvents = function (myFunction) {
        var _this = this;
        var myInter = setInterval(function () {
            if (typeof _this.api !== 'undefined') {
                _this.api.layersObj.layerAdded.subscribe(function (layer) { return myFunction(layer); });
                _this.api.layersObj.layerRemoved.subscribe(function (layer) { return myFunction(layer); });
                clearInterval(myInter);
            }
        }, 100);
    };
    OSDP.prototype.testService = function (layer) {
        var request = new XMLHttpRequest();
        request.open('GET', layer.url + "?f=json", true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.response.contains('"code":500')) {
                    console.log("Error handling service request :Could not find a service with the name '" + layer.url + "'\n                        in the configured clusters. Service may be stopped or ArcGIS Server may not be running.");
                }
                else {
                    console.log("Layer '" + layer.url + "' should load properly.");
                }
            }
        };
        request.send();
    };
    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        var myMap = window.RAMP.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', query);
    };
    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        var myMap = window.RAMP.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', '');
    };
    OSDP.prototype.initUpdateExtentBox = function () {
        // set extent box change handler by extChangeHandler
        // also initialyse the value of extentbox variable holder
        var parent = this;
        parent.api.esriMap.on('extent-change', extChangeHandler);
        parent.extentbox = parent.api.boundsObj;
        function extChangeHandler() {
            parent.extentbox = parent.api.boundsObj;
        }
    };
    OSDP.prototype.getExtentBox = function () {
        //returns the extentbox variable holder
        return this.extentbox;
    };
    OSDP.prototype.inputParse = function (values, parseType) {
        var arrayPoly = values.split(';');
        arrayPoly.forEach(function (element, index, arr) {
            var elt = element;
            elt = elt.replace(parseType, '').replace(/\( */g, '[').replace(/ *\)/g, ']');
            elt = elt.trim();
            elt = elt.replace(/, */g, '],['); // specific for polygons
            elt = elt.replace(/ +/g, ', ');
            arr[index] = elt;
        });
        return "[" + arrayPoly + "]";
    };
    OSDP.prototype.addPointsGeometry = function (mapId, values) {
        var myMap = window.RAMP.mapById(mapId);
        var input = this.inputParse(values, 'POINT');
        var icon = 'M 50 0 100 100 50 200 0 100 Z';
        var ptcords = JSON.parse(input);
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        for (var _i = 0, ptcords_1 = ptcords; _i < ptcords_1.length; _i++) {
            var value = ptcords_1[_i];
            // create a point with unique id, we'll use an svg path for the icon
            var pt = new window.RAMP.GEO.Point("location" + Math.round(Math.random() * 100000), [value[0], value[1]], { style: 'ICON', icon: icon, colour: [255, 0, 0, 0.75], width: 25 });
            // add the point to the graphic layer
            graphicsOSDP.addGeometry(pt);
        }
        // zoom to extent of point(s)
        if (ptcords.length === 1) {
            this.zoomPt(mapId, values);
        }
        else {
            this.zoomExtent(mapId, ptcords);
        }
    };
    OSDP.prototype.addPolygonsGeometry = function (mapId, values) {
        var myMap = window.RAMP.mapById(mapId);
        var input = this.inputParse(values, 'POLYGON');
        var poly1 = new window.RAMP.GEO.Polygon(0, JSON.parse(input));
        // create a multipolygon with unique id
        var polyAll = new window.RAMP.GEO.MultiPolygon("location" + Math.round(Math.random() * 100000), [poly1], { outlineColor: [255, 0, 0], outlineWidth: 3 });
        // add the multipolygon to the graphic layer
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.addGeometry([polyAll]);
        // zoom to extent of polygon(s)
        this.zoomExtent(mapId, JSON.parse(input)[0], 1.25);
    };
    OSDP.prototype.removeGeometries = function (mapId) {
        var myMap = window.RAMP.mapById(mapId);
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.removeGeometry();
        // remove hightlight marker and haze
        myMap.esriMap._layerDivs.rv_hilight.clear();
        if (typeof document.querySelectorAll('#mapOSDP .rv-map-highlight')[0] !== 'undefined') {
            document.querySelectorAll('#mapOSDP .rv-map-highlight')[0].classList.toggle('rv-map-highlight');
        }
    };
    OSDP.prototype.zoomPt = function (mapId, value) {
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var input = this.inputParse(value, 'POINT');
        var ptcoords = JSON.parse(input);
        var pt = new ramp.GEO.XY(parseFloat(ptcoords[0][0]), parseFloat(ptcoords[0][1]));
        myMap.zoom = 13;
        myMap.setCenter(pt);
    };
    OSDP.prototype.zoomExtent = function (mapId, coords, expand) {
        if (expand === void 0) { expand = 1; }
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var x = [];
        var y = [];
        coords.forEach(function (item) {
            x.push(item[0]);
            y.push(item[1]);
        });
        var ext = ramp.GAPI.proj.projectEsriExtent({
            'xmin': Math.min.apply(Math, x), 'ymin': Math.min.apply(Math, y), 'xmax': Math.max.apply(Math, x), 'ymax': Math.max.apply(Math, y),
            'spatialReference': { 'wkid': 4326 }
        }, myMap.esriMap.spatialReference);
        myMap.setExtent(ext.expand(expand));
    };
    OSDP.prototype.zoomWkt = function (mapId, values, type) {
        var input = this.inputParse(values, type);
        // zoom to extent of wkt points or polygon(s)
        this.zoomExtent(mapId, JSON.parse(input)[0]);
    };
    OSDP.prototype.saveState = function (mapid) {
        // save bookmark in session storage so it is restored when user loads it
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    };
    OSDP.prototype.loadState = function (mapid) {
        // load bookmark from session storage and apply it
        var storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));
        // use a timeout to wait until code finish to run. If no timeout, RV is not define
        setTimeout(function () { return window.RV.getMap(mapid).initialBookmark(storage); });
    };
    // a store of the instances of OSDP, 1 per map
    OSDP.instances = {};
    return OSDP;
}());
exports.default = OSDP;
window.osdp = new OSDP();
