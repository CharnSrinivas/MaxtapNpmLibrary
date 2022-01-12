import { ComponentData } from "../app";
export declare const fetchAdData: (file_name: string) => Promise<[]>;
export declare const getVideoElement: () => HTMLVideoElement | undefined;
export declare const resizeComponentImgAccordingToVideo: (video: HTMLVideoElement) => void;
export declare const getCurrentComponentIndex: (components_data: ComponentData[], video_current_time: number) => number;
