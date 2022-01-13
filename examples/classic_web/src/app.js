import { Component } from 'maxtap_plugin_dev'
// const maxtap_script = document.createElement('script');
// maxtap_script.src = "https://unpkg.com/maxtap_plugin_dev@latest/dist/plugin.js";
// maxtap_script.async = true
// maxtap_script.addEventListener('load', () => {
    
//     document.querySelector('video').setAttribute('data-displaymaxtap');
//     console.log(Maxtap);
//     new Maxtap.Component({ content_id: "koode_test_data" }).init();
// })
// document.querySelector('head').appendChild(maxtap_script)

window.addEventListener('load', () => {
    new Component({ content_id: "test_data" }).init();
})