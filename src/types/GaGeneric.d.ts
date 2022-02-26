//* Default Google Analytics event_data structure for every type of event
export default interface GaGeneric {
    client_id: string;
    client_name: string;
    content_id: string;
    content_name: string;
    content_type: string;
    show_name: string;
    season: string;
    episode_no: string;
    duration: number | "null";
    content_language: string;
    advertiser: string;
    caption_regional_language: current_component_datastring;
    caption: string;
    start_time: number | "null";
    end_time: number | "null";
    gender: string;
    product_details: string;
    product_article_type: string;
    category: string;
    subcategory: string;
    product_link: string;
    product_image_link: string;
    redirect_link: string;
    ad_viewed_count: number | "null";
    browser_name: string;
    os_family: string;
    device_manufacturer: string;
    os_architecture: string;
    os_version: string;
    screen_resolution: string;
    screen_orientation: string;
    full_screen: boolean | 'null';
    plugin_version: string;
}