import {
  GoogleAnalyticsCode,
  MaxTapComponentElementId,
} from './config';
import {
  fetchAdData,
  getCurrentComponentIndex,
  getVideoElement,
} from './Utils/utils';
import * as platform from 'platform';
// import { LIB_VERSION } from './version';

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
  ad_viewed_count: number;
  times_clicked: number;
}

declare global {
  interface Window {
    Maxtap: any;
    gtag: any;
    dataLayer: any[];
  }
}

export class Component {
  private video?: HTMLVideoElement;
  private parentElement: HTMLElement | null;
  private current_component_index = 0;
  private components_data?: ComponentData[];
  private content_id: string;
  private main_component: HTMLDivElement;

  constructor(data: PluginProps) {

    this.content_id = data.content_id;
    this.parentElement = null;
    try {
      const ga_script_element = document.createElement('script');
      ga_script_element.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsCode}`;
      ga_script_element.async = true;
      ga_script_element.id = GoogleAnalyticsCode;
      ga_script_element.addEventListener('load', () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GoogleAnalyticsCode);
      });
      const head_tag = document.querySelector('head');
      head_tag?.appendChild(ga_script_element);
    } catch (err) {
      console.error(err);
    }
  }

  public init = () => {

    try {
      this.video = getVideoElement();

      fetchAdData(this.content_id)
        .then(data => {
          this.components_data = data;
          if (!this.components_data) {
            return;
          }
          this.addAdComponent();
          //* Checking for every second if video time is equal to ad start time.

          setInterval(this.updateComponent, 100);
          // Initial values
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
      // Finding for video element util we get;
      this.video = getVideoElement();
      return;
    }
    if (this.video.parentElement !== this.main_component.parentElement) {
      this.main_component.remove();
      if (!this.addAdComponent()) { return; }
    }
    if (!this.components_data) {
      return;
    }

    const new_component_index = getCurrentComponentIndex(
      this.components_data,
      this.video.currentTime
    );
    if (new_component_index < 0) {
      this.removeCurrentComponent(this.main_component);
      return;
    }
    if (
      !this.components_data[this.current_component_index]['is_image_loaded'] &&
      this.components_data[this.current_component_index].start_time -
      this.video!.currentTime <=
      15
    ) {
      this.prefetchImage();
    }
    if (this.canCloseComponent(this.video!.currentTime)) {
      if (this.main_component.style.display !== 'none') {
        this.removeCurrentComponent(this.main_component);
      }
    }
    if (this.canComponentDisplay(this.video!.currentTime)) {
      if (
        this.main_component &&
        (this.main_component.style.display === 'none' ||
          this.current_component_index !== new_component_index)
      ) {
        this.displayComponent(this.main_component);
      }
    }
    this.current_component_index = new_component_index;
  };

  private addAdComponent = (): boolean => {
    //*  Getting data from firestore using http request. And changing state of component.
    if (!this.video) {
      return false;
    }
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.parentElement = this.video.parentElement;
    if (!this.parentElement) {
      return false;
    }
    this.parentElement.style.position = 'relative';
    this.main_component = document.createElement('div');
    this.main_component.style.display = 'none';
    this.main_component.id = MaxTapComponentElementId;
    this.main_component.className = 'maxtap_component_wrapper';
    this.parentElement?.appendChild(this.main_component);
    this.main_component.addEventListener('click', this.redirectToAd);

    return true;
  };

  private prefetchImage = () => {
    if (!this.components_data) {
      return;
    }
    this.components_data[this.current_component_index].is_image_loaded = true;
    let img = new Image();
    img.src = this.components_data[this.current_component_index]['image_link'];
  };

  private canComponentDisplay = (currentTime: number): boolean => {
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

  private canCloseComponent = (currentTime: number): boolean => {
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

  private removeCurrentComponent = (main_component: HTMLDivElement) => {
    if (!main_component) {
      return;
    }
    {
      main_component.style.display = 'none';
      main_component.innerHTML = '';
    }
  };

  createGADict = current_component_data => {
    const ga_generic_properties = {
      //content
      client_id: current_component_data['client_id'] || 'null',
      client_name: current_component_data['client_name'] || 'null',
      content_id: current_component_data['content_id'] || 'null',
      content_name: current_component_data['content_name'] || 'null',
      content_type: current_component_data['content_type'] || 'null',
      show_name: current_component_data['show_name'] || 'null',
      season: current_component_data['season'] || 'null',
      episode_no: current_component_data['episode_no'] || 'null',
      content_duration: current_component_data['duration'] || 'null',
      content_language: current_component_data['content_language'] || 'null',

      //advertiser
      advertiser: current_component_data['advertiser'] || 'null',

      //ad
      ad_id: current_component_data['ad_id'] || 'null',
      caption_regional_language:
        current_component_data['caption_regional_language'] || 'null',
      caption_english: current_component_data['caption'] || 'null',
      start_time: current_component_data['start_time'] || 'null',
      end_time: current_component_data['end_time'] || 'null',
      ad_duration:
        current_component_data['end_time'] -
        current_component_data['start_time'] || 'null',

      //product
      gender: current_component_data['gender'] || 'null',
      product_details: current_component_data['product_details'] || 'null',
      product_article_type: current_component_data['article_type'] || 'null',
      product_category: current_component_data['category'] || 'null',
      product_subcategory: current_component_data['subcategory'] || 'null',
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
      // plugin_version: LIB_VERSION,
      dev_version: true
    };
    return ga_generic_properties;
  };

  private displayComponent = (main_component: HTMLDivElement) => {
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
    var ga_impression_data = this.createGADict(current_component_data);
    window.gtag('event', 'impression', ga_impression_data);
    // resizeComponentImgAccordingToVideo(this.video!);
  };

  private redirectToAd = () => {
    try {
      if (!this.components_data) {
        return;
      }
      this.components_data[this.current_component_index]['times_clicked']++;
      const current_component_data = this.components_data[
        this.current_component_index
      ];
      var ga_click_data = this.createGADict(current_component_data);
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
}
