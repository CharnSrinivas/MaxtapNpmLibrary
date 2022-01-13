/*! For license information please see plugin.js.LICENSE.txt */
var Maxtap;(()=>{var t={144:(t,e,n)=>{"use strict";n.r(e),n.d(e,{Component:()=>w});var r=n(379),o=n.n(r),a=n(795),i=n.n(a),c=n(569),s=n.n(c),u=n(565),l=n.n(u),p=n(216),d=n.n(p),f=n(589),m=n.n(f),h=n(746),v={};v.styleTagTransform=m(),v.setAttributes=l(),v.insert=s().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=d(),o()(h.Z,v),h.Z&&h.Z.locals&&h.Z.locals;var y="componentmaxtap",g="G-05P2385Q2K",A="data-displaymaxtap",_=function(){for(var t=document.querySelectorAll("["+A+"]"),e=0;e<t.length;e++)if("VIDEO"===t[e].tagName)return t[e];console.error("Cannot find video element,Please check data attribute. It should be "+A+'\n                   Example: <video src="https://some_source" '+A+" > </video> \n                            [OR]\n                   Try to initialize the maxtap_ad component after window load.")},w=function(){function t(t){var e=this;this.current_component_index=0,this.init=function(){var t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-05P2385Q2K",t.async=!0,t.id=g,t.addEventListener("load",(function(){window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",g)}));var n,r=document.querySelector("head");if(null==r||r.appendChild(t),e.video=_(),e.video)try{(n=e.content_id,new Promise((function(t,e){try{n.includes(".json")||(n+=".json"),fetch("https://storage.googleapis.com/maxtap-adserver-dev.appspot.com/"+n,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){e.json().then((function(e){e.sort((function(t,e){return parseInt(t.start_time)<parseInt(e.start_time)?-1:parseInt(t.start_time)>parseInt(e.start_time)?1:0})),t(e)}))})).catch((function(t){e(t)}))}catch(t){e(t)}}))).then((function(t){e.components_data=t,e.components_data&&(e.initializeComponent(),document.getElementById(y).addEventListener("click",(function(){e.onComponentClick()})),setInterval((function(){e.updateComponent()}),500))})).catch((function(t){console.error(t)}))}catch(t){console.error(t)}else console.error("Cannot find video element,Please check data attribute. It should be "+A+'\n            Example: <video src="https://some_source" '+A+" > </video> \n            [OR]\n            Try to initialize the maxtap_ad component after window load.\n            ")},this.updateComponent=function(){if(e.video&&e.components_data){var t=function(t,e){for(var n=0;n<t.length;n++){var r=t[n];if(e>=r.start_time&&e<=r.end_time)return n}return-1}(e.components_data,e.video.currentTime);t>=0?e.current_component_index=t:e.removeCurrentComponent(),!e.components_data[e.current_component_index].is_image_loaded&&e.components_data[e.current_component_index].start_time-e.video.currentTime<=15&&e.prefetchImage(),e.canComponentDisplay(e.video.currentTime)&&e.displayComponent(),e.canCloseComponent(e.video.currentTime)&&(e.current_component_index++,e.removeCurrentComponent())}else console.error("Cannot find video element with id ")},this.initializeComponent=function(){var t;if(e.video&&(e.video.style.width="100%",e.video.style.height="100%",e.parentElement=e.video.parentElement,e.parentElement)){e.parentElement.style.position="relative";var n=document.createElement("div");n.style.display="none",n.id=y,n.className="maxtap_component_wrapper",null===(t=e.parentElement)||void 0===t||t.appendChild(n),e.video=_()}},this.prefetchImage=function(){e.components_data&&(e.components_data[e.current_component_index].is_image_loaded=!0,(new Image).src=e.components_data[e.current_component_index].image_link)},this.canComponentDisplay=function(t){return!!e.components_data&&!(e.components_data[e.current_component_index].start_time<0)&&t>=e.components_data[e.current_component_index].start_time},this.canCloseComponent=function(t){return!e.components_data||!(e.components_data[e.current_component_index].start_time<0)&&t>=e.components_data[e.current_component_index].end_time},this.displayComponent=function(){var t=document.getElementById(y);if(t){var n='\n        <div class="maxtap_main" >\n        <p>'+e.components_data[e.current_component_index].caption_regional_language+'</p>\n        <div class="maxtap_img_wrapper">\n        <img src="'+e.components_data[e.current_component_index].image_link+'"/>\n        </div>\n        </div>\n        ';"none"===t.style.display&&(t.style.display="flex",t.innerHTML=n),window.gtag("event","watch",{event_category:"impression",event_action:"watch",content_id:e.content_id})}},this.onComponentClick=function(){window.gtag("event","click",{event_category:"action",event_action:"click",content_id:e.content_id,click_time:Math.floor(e.video.currentTime)}),e.components_data&&window.open(e.components_data[e.current_component_index].redirect_link,"_blank")},this.content_id=t.content_id,this.parentElement=null}return t.prototype.removeCurrentComponent=function(){var t=document.getElementById(y);t&&"none"!==t.style.display&&(t.style.display="none",t.innerHTML="")},t}();console.log("maxtap_version(0.1.29)")},746:(t,e,n)=>{"use strict";n.d(e,{Z:()=>c});var r=n(537),o=n.n(r),a=n(645),i=n.n(a)()(o());i.push([t.id,'video[data-displaymaxtap]{\n    width: 100%;\n    height: 100%;\n}\n.maxtap_component_wrapper {\n    align-self: flex-end;\n    position: absolute;\n    right: 0px;\n    bottom: 75px;\n    display: flex;\n}\n.maxtap_main{\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    height: fit-content;\n    background-color: hsla(0, 0%, 0%, 0.2);\n    cursor: pointer;\n    z-index: 10;\n}\n.maxtap_img_wrapper {\n    margin-left: 0.6rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.3vw;\n    width: 6vw;\n}\n.maxtap_img_wrapper > img{\n    width: 100%;\n}\n.maxtap_main>p {\n    font-family: ubuntu,"Roboto",sans-serif,Arial, Helvetica, sans-serif;\n    font-weight: 500;\n    font-size: calc(1vw + 0.1rem);\n    padding-left: 0.4rem;\n    margin-left: 0.2rem;\n    margin-right: 0.1rem;\n    color: white;\n}',"",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA;IACI,WAAW;IACX,YAAY;AAChB;AACA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,UAAU;IACV,YAAY;IACZ,aAAa;AACjB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,8BAA8B;IAC9B,mBAAmB;IACnB,sCAAsC;IACtC,eAAe;IACf,WAAW;AACf;AACA;IACI,mBAAmB;IACnB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,cAAc;IACd,UAAU;AACd;AACA;IACI,WAAW;AACf;AACA;IACI,oEAAoE;IACpE,gBAAgB;IAChB,6BAA6B;IAC7B,oBAAoB;IACpB,mBAAmB;IACnB,oBAAoB;IACpB,YAAY;AAChB",sourcesContent:['video[data-displaymaxtap]{\n    width: 100%;\n    height: 100%;\n}\n.maxtap_component_wrapper {\n    align-self: flex-end;\n    position: absolute;\n    right: 0px;\n    bottom: 75px;\n    display: flex;\n}\n.maxtap_main{\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    height: fit-content;\n    background-color: hsla(0, 0%, 0%, 0.2);\n    cursor: pointer;\n    z-index: 10;\n}\n.maxtap_img_wrapper {\n    margin-left: 0.6rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.3vw;\n    width: 6vw;\n}\n.maxtap_img_wrapper > img{\n    width: 100%;\n}\n.maxtap_main>p {\n    font-family: ubuntu,"Roboto",sans-serif,Arial, Helvetica, sans-serif;\n    font-weight: 500;\n    font-size: calc(1vw + 0.1rem);\n    padding-left: 0.4rem;\n    margin-left: 0.2rem;\n    margin-right: 0.1rem;\n    color: white;\n}'],sourceRoot:""}]);const c=i},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,a){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<t.length;u++){var l=[].concat(t[u]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),i=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[e].concat(i).concat([a]).join("\n")}return[e].join("\n")}},666:t=>{var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,a=Object.create(o.prototype),i=new L(r||[]);return a._invoke=function(t,e,n){var r=p;return function(o,a){if(r===f)throw new Error("Generator is already running");if(r===m){if("throw"===o)throw a;return T()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=I(i,n);if(c){if(c===h)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===p)throw r=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var s=l(t,e,n);if("normal"===s.type){if(r=n.done?m:d,s.arg===h)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=m,n.method="throw",n.arg=s.arg)}}}(t,n,i),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var p="suspendedStart",d="suspendedYield",f="executing",m="completed",h={};function v(){}function y(){}function g(){}var A={};s(A,a,(function(){return this}));var _=Object.getPrototypeOf,w=_&&_(_(j([])));w&&w!==n&&r.call(w,a)&&(A=w);var x=g.prototype=v.prototype=Object.create(A);function C(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,a,i,c){var s=l(t[o],t,a);if("throw"!==s.type){var u=s.arg,p=u.value;return p&&"object"==typeof p&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(p).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}}function I(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,I(t,n),"throw"===n.method))return h;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var o=l(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,h;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,h):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function j(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:T}}function T(){return{value:e,done:!0}}return y.prototype=g,s(x,"constructor",g),s(g,"constructor",y),y.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},C(b.prototype),s(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new b(u(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},C(x),s(x,c,"Generator"),s(x,a,(function(){return this})),s(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=j,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(B),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),B(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;B(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:j(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),h}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var a={},i=[],c=0;c<t.length;c++){var s=t[c],u=r.base?s[0]+r.base:s[0],l=a[u]||0,p="".concat(u," ").concat(l);a[u]=l+1;var d=n(p),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)e[d].references++,e[d].updater(f);else{var m=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:p,updater:m,references:1})}i.push(p)}return i}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var a=r(t=t||[],o=o||{});return function(t){t=t||[];for(var i=0;i<a.length;i++){var c=n(a[i]);e[c].references--}for(var s=r(t,o),u=0;u<a.length;u++){var l=n(a[u]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=s}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return t[r](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(666);var r=n(144);Maxtap=r})();