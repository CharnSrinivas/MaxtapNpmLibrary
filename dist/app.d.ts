interface PluginData {
    content_id: string;
}
declare global {
    interface Window {
        Maxtap: any;
        gtag: any;
        dataLayer: any[];
    }
}
export declare class Component {
    private video?;
    private parentElement;
    private component_start_time;
    private component_end_time;
    private product_details?;
    private image_url?;
    private redirect_url?;
    private current_component_index;
    private component_data?;
    private interval_id;
    private is_component_showing;
    private content_id;
    private is_image_loaded;
    constructor(data: PluginData);
    init: () => void;
    private initializeComponent;
    private prefetchImage;
    private canComponentDisplay;
    private canCloseComponent;
    private removeCurrentComponent;
    private displayComponent;
    private onComponentClick;
    private setRequiredComponentData;
}
export {};
