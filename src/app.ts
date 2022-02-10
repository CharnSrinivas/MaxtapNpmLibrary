import Config from './Config';
import { ComponentData, PluginProps } from './types';

import {
  fetchAdData,
  getCurrentComponentIndex,
  getVideoElement, createGADict, resizeComponentImgAccordingToVideo
} from './Utils/utils';

class MaxtapComponent {

  private video?: HTMLVideoElement;
  private parentElement: HTMLElement | null;//*  Parent element of video element
  private current_component_index = -1;
  private components_data?: Array<ComponentData>;
  private content_id: string;
  private main_component?: HTMLDivElement;//* Actual ad component (container📦) where ad_text and ad_image goes
  private interval_id?: NodeJS.Timer;
  private is_initialized = false;
  constructor() {
    this.parentElement = undefined;
    this.interval_id = undefined;
    console.log("update");

  }

  public init = (data: PluginProps) => {
    //* Check if the component is already initialized or ad is already present
    if (
      this.is_initialized ||
      document.getElementById(Config.MaxTapComponentElementId)) {
      console.log("Re-Initializing"); return;
    }
    try {

      this.is_initialized = true;
      this.content_id = data.content_id;

      if (typeof window === 'undefined')
        throw new ReferenceError(
          "'window.document' is undefined while initializing Maxtap Ads. Initialize in lifecyle events"
        );

      //* Adding google 📈 analytics script tag
      if (!document.getElementById('ga4-script')) {
        const ga_script_element = document.createElement('script');
        ga_script_element.src = `https://www.googletagmanager.com/gtag/js?id=${Config.GoogleAnalyticsCode}`;
        ga_script_element.async = true;
        ga_script_element.id = 'ga4-script';

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        ga_script_element.addEventListener('load', () => {
          window.gtag('js', new Date());
          window.gtag('config', Config.GoogleAnalyticsCode);
        });

        const head_tag = document.querySelector('head');
        head_tag?.appendChild(ga_script_element);
      }

      this.video = getVideoElement();

      //*Fetching ad data

      fetchAdData(this.content_id)
        .then(data => {
          this.components_data = data;
          if (!this.components_data) {
            console.error('Maxtap Ad data is empty!');
            return;
          }

          //* Adding ad component sibling to video element
          this.addAdElement();

          resizeComponentImgAccordingToVideo();
          //* Resizing the ad_image when window resizes
          window.addEventListener('resize', () => {
            resizeComponentImgAccordingToVideo();
          })

          //* Setting initial values
          for (let i = 0; i < this.components_data.length; i++) {
            this.components_data[i]['ad_viewed_count'] = 0;
            this.components_data[i]['times_clicked'] = 0;
            this.components_data[i]['is_image_loaded'] = false;
            this.components_data[i]['image_error'] = false;
          }
          //* Updating ad component for every 500ms
          this.interval_id = setInterval(this.updateComponent, 500);
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  private updateComponent = () => {
    //* Checking if video element is present
    if (!this.video) {
      //* Finding for video element until we get;
      this.video = getVideoElement();
      return;
    }

    if (!this.main_component) {
      this.addAdElement();
      return;
    }
    if (!this.components_data) {
      return;
    }

    //* Checking if ad element is 👬 sibling to video element every time
    if (this.video.parentElement !== this.main_component.parentElement) {
      this.main_component.remove();
      if (!this.addAdElement()) { return; }
    }

    //* Finding which ad to play at current video time.
    const new_component_index = getCurrentComponentIndex(
      this.components_data,
      this.video.currentTime
    );

    //* Displaying no ad.
    if (new_component_index < 0) {
      this.removeCurrentAdElement(this.main_component);
      return;
    }
    this.current_component_index = new_component_index;
    //* Checking if image is already cached else Pre-fetching ⬇️ image before 15 sec of ad.    
    if (
      !this.components_data[this.current_component_index]['is_image_loaded']
      &&
      !this.components_data[this.current_component_index]['image_error']
    ) {
      this.prefetchAdImage();
    }

    if (this.canCloseAd(this.video!.currentTime) && this.main_component.style.display !== 'none') {
      this.removeCurrentAdElement(this.main_component);
    }
    if (
      this.canAdDisplay(this.video!.currentTime)
      && this.main_component && this.main_component.style.display === 'none'
      && !this.components_data[this.current_component_index]['image_error']
      && this.components_data[this.current_component_index]['is_image_loaded']
    ) {
      console.log('cmg');

      this.displayAd(this.main_component);
    }
  };

  //* 💉 Inserting Maxtap ad component inside DOM
  private addAdElement = (): boolean => {
    if (!this.video) {
      return false;
    }
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.parentElement = this.video.parentElement;
    if (!this.parentElement) {
      return false;
    }
    //* Adding ad-element 👬 sibling to video element

    this.parentElement.style.position = 'relative';
    this.main_component = document.createElement('div');
    this.main_component.style.display = 'none';
    this.main_component.id = Config.MaxTapComponentElementId;
    this.main_component.className = 'maxtap_component_wrapper';
    this.parentElement?.appendChild(this.main_component);
    this.main_component.addEventListener('click', this.redirectToAd);
    return true;
  };
  //* Loading and caching image 🖼️
  private prefetchAdImage = () => {
    if (!this.components_data) {
      return;
    }
    let img = new Image();
    this.components_data[this.current_component_index]['is_image_loaded'] = true;
    img.onerror = () => {
      this.components_data[this.current_component_index]['image_error'] = true;
    }
    img.src = this.components_data[this.current_component_index]['image_link'];
  };

  //* Checks if ad can show up at given video time
  private canAdDisplay = (currentTime: number): boolean => {

    const current_component = this.components_data[this.current_component_index];

    if (current_component.start_time < 0 || !this.components_data || !current_component || !current_component.is_image_loaded) {
      return false;
    }

    //* Checking if video current time is in range ⬅️➡️ of ad start time and ad end time
    if (
      currentTime <
      this.components_data[this.current_component_index]['end_time'] &&
      currentTime >
      this.components_data[this.current_component_index]['start_time']
    ) {
      return true;
    }
    return false;
  };

  //* Checking if video current time is not in range ⬅️➡️ of ad start time and ad end time

  private canCloseAd = (currentTime: number): boolean => {
    if (!this.components_data) return true;
    if (this.components_data[this.current_component_index].start_time < 0) {
      return false;
    }
    if (
      currentTime >
      this.components_data[this.current_component_index]['end_time'] ||
      currentTime <
      this.components_data[this.current_component_index]['start_time']
    ) {
      return true;
    }
    return false;
  };
  //*❎ Removing innerHtml from maxtap main container 
  private removeCurrentAdElement = (main_component: HTMLDivElement) => {
    if (!main_component) return;
    main_component.style.display = 'none';
    main_component.innerHTML = '';
  };

  //* Adding innerHtml into maxtap main container and making it's display flex
  private displayAd = (main_component: HTMLDivElement): void => {
    if (!main_component) {
      return;
    }
    const component_html = `<div class="maxtap_main" > <p>${this.components_data![this.current_component_index]
      .caption_regional_language
      }</p> <div class="maxtap_img_wrapper"> <img src="${this.components_data![this.current_component_index].image_link
      }"/> </div> </div>`;
    main_component.style.display = 'flex';
    main_component.innerHTML = component_html;

    // * Incrementing ⬆️️ no of times ad is viewed 👁️.
    this.components_data[this.current_component_index]['ad_viewed_count']++;
    const current_component_data = this.components_data[this.current_component_index];

    //* Triggering 👀 Impression  📈📈 Google Analytics events
    const ga_impression_data = createGADict(current_component_data);
    window.gtag('event', 'impression', ga_impression_data);
  };

  //* Redirecting to ad🔗link in new tab 
  private redirectToAd = (): void => {
    try {
      if (!this.components_data) {
        return;
      }
      this.video.pause();
      //* Increasing ⬆️ no of times clicked 🖱️
      this.components_data[this.current_component_index]['times_clicked']++;
      const current_component_data = this.components_data[
        this.current_component_index
      ];
      var ga_click_data = createGADict(current_component_data);
      ga_click_data['event_category'] = 'click';
      ga_click_data['time_to_click'] = Math.floor(
        this.video.currentTime -
        this.components_data[this.current_component_index]['start_time']
      );
      ga_click_data['times_clicked'] = current_component_data['times_clicked'];
      //* Triggering 🖱️ Click  📈📈 Google Analytics events
      window.gtag('event', 'click', ga_click_data);
      window.open(this.components_data![this.current_component_index].redirect_link, '_blank');
    } catch (err) {
      console.error(err);
    }
  };

  //*❎ Remove ad from DOM, stop updating ad and re-set all class variables
  public removeAd(): void {

    //* Stopping loop
    clearInterval(this.interval_id);

    this.is_initialized = false;
    //* Resetting class variables
    this.video,
      this.parentElement,
      this.components_data,
      this.interval_id,
      this.main_component = undefined
    this.current_component_index = 0;
    this.removeCurrentAdElement(
      document.getElementById(Config.MaxTapComponentElementId) as HTMLDivElement
    );
    //* Removing element form dom
    document.getElementById(Config.MaxTapComponentElementId)?.remove();

  }

}
/* 
* Instantiate a MaxtapComponent object and exporting it
* So that we can import component anywhere we want and the component will be same throughout the whole project

? Saves us from unnecessary initalization of component
*/
export default new MaxtapComponent();