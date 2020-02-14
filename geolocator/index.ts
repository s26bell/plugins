import { PRINT_PANEL_BODY} from './templates';
import { COLOR_PANEL} from './templates';
export class Geolocator {
    init(api: any){
        this.api = api;
        this.button = this.api.mapI.addPluginButton(
            "Geolocator",
            this.onMenuItemClick()
        );
        this.make_panel();
    }

    make_panel(){
        this.panel = this.api.panels.create('geolocatorPanel');

        this.panel.element.css({
            top: '0px',
            left: '0px',
            bottom: '50px',
            width: '800px',
          });
        let closeBtn = this.panel.header.closeButton;
        this.panel.header.title = `Geolocator`;
        this.panel.body = PRINT_PANEL_BODY;
        //this.panel.body = COLOR_PANEL;

        this.panel.open();
    }  

    close_Panel(){
        this.panel.close();
    }
    open_Panel(){
        this.panel.open();
    }

    onMenuItemClick(){
        let identifySetting;
        return () => {
            this._RV.toggleSideNav('close');

            // only set event if not already created
            if (typeof this.handler === 'undefined') {
                this.open_Panel()

            } else {
                this.close_Panel();
            }
        };
    }

}

export interface Geolocator {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
}

(<any>window).geolocator = Geolocator;
