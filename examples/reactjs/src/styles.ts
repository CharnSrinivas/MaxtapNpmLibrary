import { CSSProperties } from "react";

 const styles: { [key: string]: CSSProperties } =
{
    "maxtap_container": {
        "position": "relative",
        "margin": "inherit",
        "width": "inherit",
        "padding": "inherit",
        "boxSizing": "border-box",
        "display": "flex",
        "flexDirection": "column",
        
    },
    
    "maxtap_ad_wrapper": {
        "alignSelf": "flex-end",
        "position": "absolute",
        "right": "0",
        "bottom": "calc(6vw + 6vh)"
    },
    "maxtap_main": {
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-between",
        "height": "auto",
        "backgroundColor": "rgba(255, 255, 255, 0.897)",
        "cursor": "pointer",
        "zIndex": "2"
    },
    "maxtap_img_wrapper": {
        "backgroundColor": "hsla(204, 100%, 62%, 0.3)",
        "marginLeft": "0.6rem"
    },
    "maxtap_main_p": {
        "fontSize": "calc(1vw + 0.1rem)",
        "paddingLeft": "0.4rem"
    },
    "maxtap_img_wrapper_img": {
        "width": "5vw"
    }
}
export default styles;