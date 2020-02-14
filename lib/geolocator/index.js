console.log("hello1");
var Geolocator = /** @class */ (function () {
    function Geolocator() {
    }
    Geolocator.prototype.init = function (api) {
        var _this = this;
        console.log("hello2");
        this.api = api;
        console.log("hello3");
        var myInter = setInterval(function () {
            if (typeof window.RAMP.mapById(_this.api.id) !== 'undefined') {
                window.RAMP.mapById("geolocator");
                clearInterval(myInter);
            }
        }, 1000);
        this.make_panel();
    };
    Geolocator.prototype.make_panel = function () {
        this.panel = this.api.panels.create('geolocator');
        this.panel.element.css({
            top: '60px',
            left: '0px',
            bottom: '50px',
            width: '800px',
        });
        var closeBtn = this.panel.header.closeButton;
        this.panel.header.title = "Geolocator";
        this.panel.body = '<div><h3>Enter Address Below</h3><md-button id="mypanel-btn1" class="md-raised md-primary">Submit</md-button></div>';
        this.panel.open();
    };
    return Geolocator;
}());
//(<any>window).RAMP.mapById(`geolocator`)
window.geolocator = Geolocator;
