import { DataAttribute, GoogleAnalyticsCode, MaxTapComponentElementId } from './config';
import { fetchAdData, getCurrentComponentIndex, getVideoElement } from './Utils/utils';

/* 
*   A Brief about how MAXTAP Ad  🔌plugin🔌 works
?🛑 ** Note **: Here in variables,function names..etc component refers to ad, we need to make it because of ad-blockers.
*  
*                       ------- * Steps * ---------
*     => Find video element by data attribute set to the video element 📹.
*
*     => Once we make sure that video element is available,
*       Create a main container 📦 <div class="maxtap_container"></div> element and add the video element into the created container.
*
*     => Set the css properties of main container as same as video parent element.
*
*     => Now 💉inject maxtap ad📄 component into the main container and next to video element.
*     
*     => Then set position,width,font ..etc of ad component to make it look good.
*
*     => Then finally add this main element which we created before to video parent element.

*            📦 Our Main container 📦
*                    |
*          __________|_____________
*         |                       |
*   [client video element📹]       [Our Ad element 📄]
*
*
 */

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
    interface Window { Maxtap: any; gtag: any; dataLayer: any[] }
}


export class Component {

    private video?: HTMLVideoElement;
    private parentElement: HTMLElement | null;
    private current_component_index = 0;
    private components_data?: ComponentData[];
    private content_id: string;

    constructor(data: PluginProps) {
        this.content_id = data.content_id;
        this.parentElement = null;
    }


    public init = () => {

        const ga_script_element = document.createElement('script');
        ga_script_element.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsCode}`;
        ga_script_element.async = true;
        ga_script_element.id = GoogleAnalyticsCode;
        ga_script_element.addEventListener('load', () => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); }
            window.gtag('js', new Date());
            window.gtag('config', GoogleAnalyticsCode)
        })
        const head_tag = document.querySelector('head');
        head_tag?.appendChild(ga_script_element);

        this.video = getVideoElement();

        if (!this.video) {
            console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + `
            Example: <video src="https://some_source" ${DataAttribute} > </video> 
            [OR]
            Try to initialize the maxtap_ad component after window load.
            `);
            return;
        }
        try {
            fetchAdData(this.content_id).then(data => {
                this.components_data = data
                if (!this.components_data) { return; }
                this.initializeComponent();
                const maxtap_component = document.getElementById(MaxTapComponentElementId);
                maxtap_component!.addEventListener('click', () => {
                    this.onComponentClick();
                })
                //* Checking for every second if video time is equal to ad start time.
                setInterval(() => {
                    this.updateComponent();
                }, 500);
            })
                .catch(err => {
                    console.error(err)
                })

        } catch (err) {
            console.error(err);

        }
    }

    private updateComponent = () => {

        if (!this.video || !this.components_data) {
            console.error("Cannot find video element with id ");
            return;
        }

        const current_index = getCurrentComponentIndex(this.components_data, this.video.currentTime);

        if (current_index >= 0) {
            this.current_component_index = current_index;
        } else {
            this.removeCurrentComponent();
        }
        if (!this.components_data[this.current_component_index]['is_image_loaded'] && ((this.components_data[this.current_component_index].start_time - this.video!.currentTime) <= 15)) {
            this.prefetchImage();
        }
        if (this.canComponentDisplay(this.video!.currentTime)) {
            this.displayComponent()
        }
        if (this.canCloseComponent(this.video!.currentTime)) {
            this.current_component_index++;
            this.removeCurrentComponent();
        }
    }

    private initializeComponent = () => {

        //*  Getting data from firestore using http request. And changing state of component.
        if (!this.video) { return; }
        this.video.style.width = "100%";
        this.video.style.height = "100%";
        this.parentElement = this.video.parentElement;
        if (!this.parentElement) { return }
        this.parentElement.style.position = 'relative';
        const main_component = document.createElement('div');
        main_component.style.display = 'none';
        main_component.id = MaxTapComponentElementId;
        main_component.className = 'maxtap_component_wrapper';
        this.parentElement?.appendChild(main_component);
        //!<------------------>  Re-initializing the video to get latest reference after manipulating dom elements.<----------------------->
        this.video = getVideoElement();

    }

    private prefetchImage = () => {
        if (!this.components_data) { return; }
        this.components_data[this.current_component_index].is_image_loaded = true;
        let img = new Image();
        img.src = this.components_data[this.current_component_index]['image_link'];
    }

    private canComponentDisplay = (currentTime: number): boolean => {
        if (!this.components_data) { return false; }
        if (this.components_data[this.current_component_index].start_time < 0) { return false; }
        //* Checking video time and also if video is already shown.
        if ((currentTime >= this.components_data[this.current_component_index].start_time)) {
            return true;
        };
        return false;
    }

    private canCloseComponent = (currentTime: number): boolean => {
        if (!this.components_data) return true;
        if (this.components_data[this.current_component_index].start_time < 0) { return false; }
        if ((currentTime >= this.components_data[this.current_component_index].end_time)) {
            return true;
        }
        return false;
    }

    private removeCurrentComponent() {
        const main_container = document.getElementById(MaxTapComponentElementId);
        if (!main_container) { return; }
        if (main_container.style.display !== 'none') {
            main_container.style.display = "none";
            main_container.innerHTML = '';
        }
    }

    private displayComponent = () => {
        const main_component = document.getElementById(MaxTapComponentElementId);
        if (!main_component) { return; }
        const component_html =
            `
        <div class="maxtap_main" >
        <p>${this.components_data![this.current_component_index].caption_regional_language}</p>
        <div class="maxtap_img_wrapper">
        <img src="${this.components_data![this.current_component_index].image_link}"/>
        </div>
        </div>
        `
        if (main_component.style.display === 'none') {
            main_component.style.display = 'flex';
            main_component.innerHTML = component_html;
        };
        // resizeComponentImgAccordingToVideo(this.video!);

        window.gtag('event', 'watch', {
            'event_category': 'impression',
            'event_action': 'watch',
            "content_id": this.content_id,
        })

    }

    private onComponentClick = () => {
        window.gtag('event', 'click', {
            'event_category': 'action',
            'event_action': 'click',
            "content_id": this.content_id,
            "click_time": Math.floor(this.video!.currentTime)
        })
        if (!this.components_data) { return; }
        window.open(this.components_data![this.current_component_index].redirect_link, "_blank");
    }

}
