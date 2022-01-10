interface PluginProps {
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
    private current_component_index;
    private components_data?;
    private interval_id;
    private content_id;
    constructor(data: PluginProps);
    init: () => void;
    private updateComponent;
    private initializeComponent;
    private prefetchImage;
    private canComponentDisplay;
    private canCloseComponent;
    private removeCurrentComponent;
    private displayComponent;
    private onComponentClick;
}
export {};
