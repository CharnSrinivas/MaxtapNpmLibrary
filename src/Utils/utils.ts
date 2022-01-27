import { DataUrl, DataAttribute } from "../config";
import { ComponentData } from "../app";
export const fetchAdData = (file_name: string): Promise<[]> => {

    return new Promise((res, rej) => {
        try {
            if (!file_name.includes('.json')) {
                file_name += '.json';
            }
            fetch(`${DataUrl}/${file_name}`
                , {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
                .then(fetch_res => {
                    fetch_res.json().then((json_data: []) => {
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

export const getVideoElement = (): HTMLVideoElement | undefined => {

    const elements = document.querySelectorAll(`[${DataAttribute}]`);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === 'VIDEO') {
            return elements[i] as HTMLVideoElement;
        }

    }
    return undefined;
}

export const resizeComponentImgAccordingToVideo = (video: HTMLVideoElement) => {
    const img_wrapper = document.querySelector('.maxtap_img_wrapper') as HTMLDivElement;
    const per = (video.getBoundingClientRect().width * (8 / 100));
    if (per <= 125 && per >= 80 && img_wrapper) {
        img_wrapper.style.width = per + "px";
    }
}
export const getCurrentComponentIndex = (components_data:ComponentData[],video_current_time:number) :number=> {
    for (let i = 0; i < components_data.length; i++) {
        const component = components_data[i];   
        if (video_current_time >= component.start_time && video_current_time <= component.end_time) {
            return i;
        }
    }
    return -1;
}