import Config from './config';
import { ComponentData, PluginProps } from './types';

import {
  fetchAdData,
  getCurrentComponentIndex,
  getVideoElement, createGADict
} from './Utils/utils';


export class Component {

  private video?: HTMLVideoElement;
  private parentElement: HTMLElement | null;
  private current_component_index = -1;
  private components_data?: Array<ComponentData>;
  private content_id: string;
  private main_component?: HTMLDivElement;
  private interval_id?: NodeJS.Timer;

  constructor(data: PluginProps) {
    this.content_id = data.content_id;
    this.parentElement = undefined;
    this.interval_id = undefined;
    console.log("yeah2");

  }

  public init = () => {
    try {
      if (typeof window === 'undefined')
        throw new ReferenceError(
          "'window.document' is undefined while initializing Maxtap Ads."
        );

      //* Adding google analytics script tag

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
          this.interval_id = setInterval(this.updateComponent, 100);
          //* Setting initial values
          for (let i = 0; i < this.components_data.length; i++) {
            this.components_data[i]['ad_viewed_count'] = 0;
            this.components_data[i]['times_clicked'] = 0;
            this.components_data[i]['is_image_loaded'] = false;
          }
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  private updateComponent = () => {
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

    //* Checking if ad element is sibling to video element every time

    if (this.video.parentElement !== this.main_component.parentElement) {
      this.main_component.remove();
      if (!this.addAdElement()) {
        return;
      }
    }

    // //* Checking if image is already cached else Pre-fetching image before 15 sec of ad.    

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
    if (!this.components_data[this.current_component_index]['is_image_loaded']) {
      this.prefetchAdImage();
    }

    if (this.canCloseAd(this.video!.currentTime)) {
      if (this.main_component.style.display !== 'none') {
        this.removeCurrentAdElement(this.main_component);
      }
    }
    if (this.canAdDisplay(this.video!.currentTime)) {
      if (
        this.main_component &&
        (this.main_component.style.display === 'none' ||
          this.current_component_index !== new_component_index)
      ) {
        this.displayAd(this.main_component);
      }
    }
  };

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
    //* Adding ad-element sibling to video element

    this.parentElement.style.position = 'relative';
    this.main_component = document.createElement('div');
    this.main_component.style.display = 'none';
    this.main_component.id = Config.MaxTapComponentElementId;
    this.main_component.className = 'maxtap_component_wrapper';
    this.parentElement?.appendChild(this.main_component);
    this.main_component.addEventListener('click', this.redirectToAd);
    return true;
  };

  private prefetchAdImage = () => {
    if (!this.components_data) {
      return;
    }
    this.components_data[this.current_component_index].is_image_loaded = true;
    let img = new Image();
    img.src = this.components_data[this.current_component_index]['image_link'];
    console.log("loading ad " + this.current_component_index + "        Image link" + this.components_data[this.current_component_index]['image_link']);

  };

  private canAdDisplay = (currentTime: number): boolean => {
    if (!this.components_data) {
      return false;
    }
    if (this.components_data[this.current_component_index].start_time < 0) {
      return false;
    }
    //* Checking video time and also if video is already shown.
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

  private removeCurrentAdElement = (main_component: HTMLDivElement) => {
    if (!main_component) return;
    main_component.style.display = 'none';
    main_component.innerHTML = '';
  };



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
    this.components_data[this.current_component_index]['ad_viewed_count']++; // * Incrementing no of times ad is viewed.
    const current_component_data = this.components_data[
      this.current_component_index
    ];
    const ga_impression_data = createGADict(current_component_data);
    window.gtag('event', 'impression', ga_impression_data);
    // resizeComponentImgAccordingToVideo(this.video!);
  };

  private redirectToAd = (): void => {
    try {
      if (!this.components_data) {
        return;
      }
      this.video.pause();
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
      window.gtag('event', 'click', ga_click_data);
      window.open(
        this.components_data![this.current_component_index].redirect_link,
        '_blank'
      );
    } catch (err) {
      console.error(err);
    }
  };

  public removeAd(): void {
    //* Stopping loop
    clearInterval(this.interval_id);

    //* Resetting class variables
    this.video,
      this.parentElement,
      this.components_data,
      this.interval_id,
      (this.main_component = undefined);
    this.current_component_index = 0;

    this.removeCurrentAdElement(
      document.getElementById(Config.MaxTapComponentElementId) as HTMLDivElement
    );
    //* Removing element form dom
    document.getElementById(Config.MaxTapComponentElementId)?.remove();
  }
}
