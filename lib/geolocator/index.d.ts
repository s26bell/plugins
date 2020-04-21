import { Observable } from 'rxjs';
export declare class Geolocator {
    private _applicationID;
    private _applicationCODE;
    private _cssPanel;
    private _complete;
    getDescription(): Observable<object>;
    private setDescription;
    init(api: any, config: any): void;
    make_panel(): void;
    onMenuItemClick(): () => void;
    setAuto(): void;
    setAngular(): void;
}
export interface Geolocator {
    api: any;
    translations: any;
    _RV: any;
    panel: any;
    button: any;
    isActive: boolean;
    name: string;
    geometry: any;
    loc: string;
    config: any;
}
