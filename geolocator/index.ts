
class Geolocator {
    init(api: any){
        this.api = api;
        this.make_panel();
    }

    make_panel(){
        this.panel = this.api.panels.create('geolocatorPanel');

        this.panel.element.css({
            top: '60px',
            left: '0px',
            bottom: '50px',
            width: '800px',
          });
        let closeBtn = this.panel.header.closeButton;
        this.panel.header.title = `Geolocator`;
        this.panel.body = '<div><h3>Enter Address Below</h3><md-button id="mypanel-btn1" class="md-raised md-primary">Submit</md-button></div>';

        this.panel.open();
    }  
}

interface Geolocator {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
}

(<any>window).geolocator = Geolocator;
