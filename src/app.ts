import { DataAttribute, GoogleAnalyticsCode, MaxTapComponentElementId, MaxTapMainContainerId } from './config.js';
import { queryData } from './Utils/utils.js';
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

declare global {
    interface Window { Maxtap: any; gtag: any; dataLayer: any[] }
}

export class Component {

    private video?: HTMLVideoElement;
    private parentElement: HTMLElement | null;
    private component_start_time = -1;
    private component_end_time = -1;
    private product_details?: string;
    private image_url?: string;
    private redirect_url?: string;
    private current_component_index = 0;
    private component_data?: [];
    private interval_id: any;
    private is_component_showing = false;
    private content_id: string;
    private image_loaded: boolean;

    constructor(content_id: string) {
        this.content_id = content_id;
        this.parentElement = null;
        this.image_loaded = false;
        const css_file = document.createElement('link');
        css_file.href = "https://unpkg.com/maxtap_ads_js@latest/dist/maxtap_styles.css";
        css_file.rel = 'stylesheet';

        const ga_script = document.createElement('script');
        ga_script.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsCode}`;
        ga_script.async = true;
        ga_script.id = GoogleAnalyticsCode;
        ga_script.addEventListener('load', () => {

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); }
            window.gtag('js', new Date());
            window.gtag('config', GoogleAnalyticsCode)

        })
        const head_tag = document.querySelector('head');
        head_tag?.appendChild(css_file);
        head_tag?.appendChild(ga_script);
    }

    init = () => {

        this.video = document.querySelector(`[${DataAttribute}]`) as HTMLVideoElement;
        if (!this.video) {
            console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + `
            Example:
            <video src="some_source" ${DataAttribute} > </video>
            `);
            return;
        }
        queryData(this.content_id).then(data => {
            this.component_data = data

            if (!this.component_data) { return; }
            this.setRequiredComponentData();

            this.initializeComponent();
            const maxtap_component = document.getElementById(MaxTapComponentElementId);

            maxtap_component?.addEventListener('click', () => {
            })

            //* Checking for every second if video time is equal to ad start time.

            this.interval_id = setInterval(() => {

                if (!this.video) {
                    console.error("Cannot find video element with id ");
                    return;
                }

                if (!this.image_loaded && ((this.component_start_time - this.video!.currentTime) <= 15)) {
                    console.log("Loding");
                    this.prefetchImage();
                }

                if (this.canComponentDisplay(this.video!.currentTime)) {
                    this.displayComponent();
                    return;
                }
                if (this.canCloseComponent(this.video!.currentTime)) {
                    this.current_component_index++;
                    this.removeCurrentComponent();

                }


                //* Updating the current ad data to next ad data.;

            }, 500);
        })
    }



    private initializeComponent = () => {
        //*  Getting data from firestore using http request. And changing state of component.

        if (!this.video) { return; }
        this.video.style.width = "100%";
        this.video.style.height = "100%";


        this.parentElement = this.video.parentElement;

        const ad_ele = document.createElement('div');
        const main_container = document.createElement('div') as HTMLDivElement;

        main_container.className = 'maxtap_container';
        main_container.id = MaxTapMainContainerId;

        ad_ele.style.display = 'none';
        ad_ele.addEventListener('click', this.onComponentClick);
        ad_ele.id = MaxTapComponentElementId;
        ad_ele.className = 'maxtap_component_wrapper';

        main_container.appendChild(this.video);
        main_container.appendChild(ad_ele);

        this.parentElement?.appendChild(main_container);

        //!<------------------>  Re-initializing the video to get latest reference after manipulating dom elements.<----------------------->

        this.video = document.querySelector(`[${DataAttribute}]`) as HTMLVideoElement;
    }

    private prefetchImage = () => {
        if (!this.component_data) { return; }
        this.image_loaded = true;
        let img = new Image();
        img.src = this.component_data[this.current_component_index]['img_url'];
    }


    private canComponentDisplay = (currentTime: number): boolean => {
        if (this.component_start_time < 0) { return false; }
        //* Checking video time and also if video is already shown.
        if ((currentTime >= this.component_start_time) && !this.is_component_showing) {
            return true;
        };
        return false;
    }

    private canCloseComponent = (currentTime: number): boolean => {

        if (this.component_start_time < 0) { return false; }
        if ((currentTime >= this.component_end_time) && this.is_component_showing) {
            return true;
        }
        return false;
    }

    private removeCurrentComponent() {
        const ad_ele = document.getElementById(MaxTapComponentElementId);
        if (this.current_component_index >= this.component_data!.length) {
            console.log("clear interval");
            clearInterval(this.interval_id);
        }
        else {
            this.setRequiredComponentData(); // * Updating next ad data to class variables.
        }
        if (!ad_ele) { return; }
        ad_ele.style.display = "none";
        ad_ele.innerHTML = '';
        this.image_loaded = false;
        this.is_component_showing = false;
    }

    private displayComponent = () => {

        //* Displaying ad by just changing css display:none -> display:flex

        const ad_ele = document.getElementById(MaxTapComponentElementId);
        if (!ad_ele) { return; }
        ad_ele.style.display = 'flex';
        // ReactGa.set({ 'contend_id': this.props.content_id });
        // ReactGa.event({ action: "AD_VIEW", category: "AD" });
        ad_ele.innerHTML = `
        <div class="maxtap_main" >
            <p>${this.product_details}</p>
            <div class="maxtap_img_wrapper">
                <img src="${this.image_url}"/>
            </div>
        </div>
        `
        window.gtag('event', 'ad_watch', {
            'event_category': 'impression',
            'event_action': 'watch',
            "content_id": this.content_id,
        })
        this.is_component_showing = true;

    }

    private onComponentClick = () => {

        window.gtag('event', 'ad_click', {
            'event_category': 'action',
            'event_action': 'click',
            "content_id": this.content_id,
            "click_time": Math.floor(this.video!.currentTime)
        })

        if (!this.redirect_url) { return; }
        window.open(this.redirect_url, "_blank");
    }


    private setRequiredComponentData() {

        //* Setting ad to class variable and as well to react state.
        if (!this.component_data) return;
        const data = this.component_data;
        this.component_start_time = parseInt(data[this.current_component_index]['start']);
        this.image_url = data[this.current_component_index]['img_url'];
        this.redirect_url = data[this.current_component_index]['ad_url'];
        this.product_details = data[this.current_component_index]['product_details'];
        this.component_end_time = parseInt(data[this.current_component_index]['end']);

    }


}
