declare global {
    interface Window {
        Maxtap: any;
        gtag: any;
        dataLayer: any[];
    }
}

declare module '*.css';
declare module '*.less';

export { default as ComponentData } from "./ComponentData";
export { default as PluginProps } from "./PluginProps"
export { default as Config } from "./Config"
export { default as GaGeneric } from "./GaGeneric"