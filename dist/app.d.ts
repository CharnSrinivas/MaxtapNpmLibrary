interface PluginProps {
    content_id: string;
}
export interface ComponentData {
    is_image_loaded: boolean;
    start_time: number;
    end_time: number;
    image_link: string;
    redirect_link: string;
    caption_regional_language: string;
    client_name: string;
    content_name: string;
    duration: number;
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
