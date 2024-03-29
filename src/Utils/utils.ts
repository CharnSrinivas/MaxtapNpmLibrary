import Config from "../Config";
import { ComponentData, GaGeneric } from "../types";
import { LIB_VERSION } from '../version';
import * as platform from 'platform';
export const fetchAdData = (file_name: string): Promise<[]> => {

    return new Promise((res, rej) => {
        try {
            //* Removing trailing '/' from DataUrl
            const data_url: string = Config.DataUrl[Config.DataUrl.length - 1] !== '/' ?
                Config.DataUrl : Config.DataUrl.slice(0, Config.DataUrl.length - 2);

            if (!file_name.includes('.json')) {
                file_name += '.json';
            }
            //* Fetching ad data
            fetch(`${data_url}/${file_name}`
                , {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then(fetch_res => {
                    fetch_res.json().then((json_data: []) => {
                        //* Sorting according ad data according to start_time 
                        json_data.sort((a, b) => {
                            if (parseInt(a['start_time']) < parseInt(b['start_time'])) {
                                return -1;
                            }
                            if (parseInt(a['start_time']) > parseInt(b['start_time'])) {
                                return 1;
                            }
                            return 0;
                        })
                        res(json_data);
                    })
                }).catch(err => {
                    rej(err);
                })
        } catch (err) {
            rej(err)
        }
    })

}
//* Finds video element according to the given data attribute ex: data-displaymaxtap
export const getVideoElement = (): HTMLVideoElement | undefined => {

    const elements = document.querySelectorAll(`[${Config.DataAttribute}]`);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === 'VIDEO') {
            return elements[i] as HTMLVideoElement;
        }

    }
    return undefined;
}

//* Returns index of ad according to video current and ad start & end times which need to display
export const getCurrentComponentIndex = (components_data: ComponentData[], video_current_time: number): number => {
    for (let i = 0; i < components_data.length; i++) {
        const component = components_data[i];
        if (video_current_time + Config.PrefetchImageTime >= component.start_time && video_current_time <= component.end_time) {
            return i;
        }
    }
    //* If no are ads there to play returns -1
    return -1;
}
//* Resize te ad_image according to video width
export const resizeComponentImgAccordingToVideo = () => {
    let video = document.querySelector(`[${Config.DataAttribute}]`);
    let ad_image_wrapper = document.querySelector(`.${Config.classNames.image_wrapper}`) as HTMLDivElement;

    if (document.querySelector("." + Config.classNames.image_wrapper) && window.innerWidth > 740 && video && ad_image_wrapper) {
        let video_width = video.getBoundingClientRect().width;
        let ad_width = (5 / 100) * video_width;
        //* Min width of ad_image is 50px. 
        if (ad_width > 50) {
            ad_image_wrapper.style.width = ad_width + 'px';
        } else {
            ad_image_wrapper.style.width = 50 + "px"
        }
    }
}
//* Returns object which will send to Google Analytics
export const createGADict = (current_component_data: ComponentData): GaGeneric => {
    return {
        //content
        client_id: current_component_data['client_id'],
        client_name: current_component_data['client_name'] || 'null',
        content_id: current_component_data['content_id'] || 'null',
        content_name: current_component_data['content_name'] || 'null',
        content_type: current_component_data['content_type'] || 'null',
        show_name: current_component_data['show_name'] || 'null',
        season: current_component_data['season'] || 'null',
        episode_no: current_component_data['episode_no'] || 'null',
        duration: current_component_data['duration'] || 'null',
        content_language: current_component_data['content_language'] || 'null',

        //advertiser
        advertiser: current_component_data['advertiser'] || 'null',

        caption_regional_language:
            current_component_data['caption_regional_language'] || 'null',
        caption: current_component_data['caption'] || 'null',
        start_time: current_component_data['start_time'] || 'null',
        end_time: current_component_data['end_time'] || 'null',

        //product
        gender: current_component_data['gender'] || 'null',
        product_details: current_component_data['product_details'] || 'null',
        product_article_type: current_component_data['article_type'] || 'null',
        category: current_component_data['category'] || 'null',
        subcategory: current_component_data['subcategory'] || 'null',
        product_link: current_component_data['product_link'] || 'null',
        product_image_link: current_component_data['image_link'] || 'null',
        redirect_link: current_component_data['redirect_link'] || 'null',
        //user
        ad_viewed_count: current_component_data['ad_viewed_count'] || -1,

        // device
        browser_name: platform.name || 'null',
        os_family: platform.os.family || 'null',
        device_manufacturer: platform.manufacturer,
        os_architecture: platform.os.architecture,
        os_version: platform.os.version || 'null',
        screen_resolution: `${screen.width}x${screen.height}`,
        screen_orientation: screen.orientation.type,
        full_screen: document.fullscreenEnabled,

        //Version
        plugin_version: LIB_VERSION,
    };

};