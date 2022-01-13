function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

<<<<<<< HEAD:dist/maxtap_plugin.esm.js
var css_248z = "video[data-displaymaxtap]{height:100%;width:100%}.maxtap_component_wrapper{align-self:flex-end;bottom:75px;display:flex;position:absolute;right:0}.maxtap_main{align-items:center;background-color:rgba(0,0,0,.2);cursor:pointer;display:flex;flex-direction:row;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;justify-content:space-between;z-index:10}.maxtap_main>p{color:#fff;font-family:ubuntu,Roboto,sans-serif,Arial,Helvetica;font-size:calc(1vw + .1rem);font-weight:500;margin-left:.2rem;margin-right:.1rem;padding-left:.4rem}.maxtap_img_wrapper{align-items:center;display:flex;justify-content:center;margin-left:.6rem;padding:.3vw;width:6vw}.maxtap_img_wrapper>img{width:100%}";
styleInject(css_248z);

var LIB_VERSION = "0.1.29";

=======
var css_248z = "video[data-displaymaxtap]{height:100%;width:100%}.maxtap_component_wrapper{align-self:flex-end;bottom:75px;display:flex;position:absolute;right:0}.maxtap_main{align-items:center;background-color:rgba(0,0,0,.2);cursor:pointer;display:flex;flex-direction:row;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;justify-content:space-between;z-index:10}.maxtap_img_wrapper{align-items:center;display:flex;justify-content:center;margin-left:.6rem;padding:.3vw;width:6vw}.maxtap_img_wrapper>img{width:100%}.maxtap_main>p{color:#fff;font-family:ubuntu,Roboto,sans-serif,Arial,Helvetica;font-size:calc(1vw + .1rem);font-weight:500;margin-left:.2rem;margin-right:.1rem;padding-left:.4rem}";
styleInject(css_248z);

>>>>>>> charan:dist/maxtap_plugin_dev.esm.js
var MaxTapComponentElementId = 'componentmaxtap';
var GoogleAnalyticsCode = 'G-05P2385Q2K';
var DataAttribute = 'data-displaymaxtap';
var DataUrl = "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com";

var fetchAdData = function fetchAdData(file_name) {
  return new Promise(function (res, rej) {
    try {
      if (!file_name.includes('.json')) {
        file_name += '.json';
      }

      fetch(DataUrl + "/" + file_name, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(function (fetch_res) {
        fetch_res.json().then(function (json_data) {
          json_data.sort(function (a, b) {
            if (parseInt(a['start_time']) < parseInt(b['start_time'])) {
              return -1;
            }

            if (parseInt(a['start_time']) > parseInt(b['start_time'])) {
              return 1;
            }

            return 0;
          });
          res(json_data);
        });
      })["catch"](function (err) {
        rej(err);
      });
    } catch (err) {
      rej(err);
    }
  });
};
var getVideoElement = function getVideoElement() {
  var elements = document.querySelectorAll("[" + DataAttribute + "]");

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].tagName === 'VIDEO') {
      return elements[i];
    }
  }

  console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + ("\n                   Example: <video src=\"https://some_source\" " + DataAttribute + " > </video> \n                            [OR]\n                   Try to initialize the maxtap_ad component after window load."));
  return undefined;
};
var getCurrentComponentIndex = function getCurrentComponentIndex(components_data, video_current_time) {
  for (var i = 0; i < components_data.length; i++) {
    var component = components_data[i];

    if (video_current_time >= component.start_time && video_current_time <= component.end_time) {
      return i;
    }
  }

  return -1;
};

var Component = function Component(data) {
  var _this = this;

  this.current_component_index = 0;

<<<<<<< HEAD:dist/maxtap_plugin.esm.js
    this.init = function () {
=======
  this.init = function () {
    try {
>>>>>>> charan:dist/maxtap_plugin_dev.esm.js
      var ga_script_element = document.createElement('script');
      ga_script_element.src = "https://www.googletagmanager.com/gtag/js?id=" + GoogleAnalyticsCode;
      ga_script_element.async = true;
      ga_script_element.id = GoogleAnalyticsCode;
      ga_script_element.addEventListener('load', function () {
        window.dataLayer = window.dataLayer || [];

        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', GoogleAnalyticsCode);
      });
      var head_tag = document.querySelector('head');
      head_tag == null ? void 0 : head_tag.appendChild(ga_script_element);
      _this.video = getVideoElement();

      if (!_this.video) {
        console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + ("\n            Example: <video src=\"https://some_source\" " + DataAttribute + " > </video> \n            [OR]\n            Try to initialize the maxtap_ad component after window load.\n            "));
        return;
      }

      fetchAdData(_this.content_id).then(function (data) {
        _this.components_data = data;

        if (!_this.components_data) {
          return;
        }

        _this.initializeComponent();

        var maxtap_component = document.getElementById(MaxTapComponentElementId);
        maxtap_component.addEventListener('click', function () {
          _this.onComponentClick();
        }); //* Checking for every second if video time is equal to ad start time.

        setInterval(function () {
          _this.updateComponent();
        }, 500);
      })["catch"](function (err) {
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  };

  this.updateComponent = function () {
    if (!_this.video || !_this.components_data) {
      console.error("Cannot find video element with id ");
      return;
    }

    var current_index = getCurrentComponentIndex(_this.components_data, _this.video.currentTime);

    if (current_index >= 0) {
      _this.current_component_index = current_index;
    } else {
      _this.removeCurrentComponent();
    }

<<<<<<< HEAD:dist/maxtap_plugin.esm.js
      if (_this.components_data[_this.current_component_index] !== undefined) {
        if (!_this.components_data[_this.current_component_index]['is_image_loaded'] && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
          _this.prefetchImage();
        }
      }
=======
    if (!_this.components_data[_this.current_component_index]['is_image_loaded'] && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
      _this.prefetchImage();
    }
>>>>>>> charan:dist/maxtap_plugin_dev.esm.js

    if (_this.canCloseComponent(_this.video.currentTime)) {
      _this.removeCurrentComponent();

      return;
    }

    if (_this.canComponentDisplay(_this.video.currentTime)) {
      _this.displayComponent();
    }
  };

  this.initializeComponent = function () {
    var _this$parentElement;

    //*  Getting data from firestore using http request. And changing state of component.
    if (!_this.video) {
      return;
    }

    _this.video.style.width = "100%";
    _this.video.style.height = "100%";
    _this.parentElement = _this.video.parentElement;

    if (!_this.parentElement) {
      return;
    }

<<<<<<< HEAD:dist/maxtap_plugin.esm.js
      _this.parentElement.style.position = 'relative';
      var main_component = document.createElement('div');
      main_component.style.display = 'none';
      main_component.id = MaxTapComponentElementId;
      main_component.className = 'maxtap_component_wrapper';
      (_this$parentElement = _this.parentElement) == null ? void 0 : _this$parentElement.appendChild(main_component);

      for (var i = 0; i < _this.components_data.length; i++) {
        _this.components_data[i].is_image_loaded = false;
      } //! Re-initializing the video to get latest reference after manipulating dom elements.

=======
    _this.parentElement.style.position = 'relative';
    var main_component = document.createElement('div');
    main_component.style.display = 'none';
    main_component.id = MaxTapComponentElementId;
    main_component.className = 'maxtap_component_wrapper';
    (_this$parentElement = _this.parentElement) == null ? void 0 : _this$parentElement.appendChild(main_component);
>>>>>>> charan:dist/maxtap_plugin_dev.esm.js

    for (var i = 0; i < _this.components_data.length; i++) {
      _this.components_data[i]['times_viewed'] = 0;
      _this.components_data[i]['times_clicked'] = 0;
      _this.components_data[i]['is_image_loaded'] = false;
    } //!<------------------>  Re-initializing the video to get latest reference after manipulating dom elements.<----------------------->


    _this.video = getVideoElement();
  };

  this.prefetchImage = function () {
    if (!_this.components_data) {
      return;
    }

    _this.components_data[_this.current_component_index].is_image_loaded = true;
    var img = new Image();
    img.src = _this.components_data[_this.current_component_index]['image_link'];
  };

  this.canComponentDisplay = function (currentTime) {
    if (!_this.components_data) {
      return false;
    }

    if (_this.components_data[_this.current_component_index].start_time < 0) {
      return false;
    } //* Checking video time and also if video is already shown.


    if (currentTime < _this.components_data[_this.current_component_index]['end_time'] && currentTime > _this.components_data[_this.current_component_index]['start_time']) {
      return true;
    }
    return false;
  };

  this.canCloseComponent = function (currentTime) {
    if (!_this.components_data) return true;

    if (_this.components_data[_this.current_component_index].start_time < 0) {
      return false;
    }

    if (currentTime > _this.components_data[_this.current_component_index]['end_time'] || currentTime < _this.components_data[_this.current_component_index]['start_time']) {
      return true;
    }

    return false;
  };

  this.removeCurrentComponent = function () {
    var main_container = document.getElementById(MaxTapComponentElementId);

    if (!main_container) {
      return;
    }

    if (main_container.style.display !== 'none') {
      main_container.style.display = "none";
      main_container.innerHTML = '';
    }
  };

  this.displayComponent = function () {
    var main_component = document.getElementById(MaxTapComponentElementId);

    if (!main_component) {
      return;
    }

    var component_html = "\n        <div class=\"maxtap_main\" >\n        <p>" + _this.components_data[_this.current_component_index].caption_regional_language + "</p>\n        <div class=\"maxtap_img_wrapper\">\n        <img src=\"" + _this.components_data[_this.current_component_index].image_link + "\"/>\n        </div>\n        </div>\n        ";

    if (main_component.style.display === 'none') {
      main_component.style.display = 'flex';
      main_component.innerHTML = component_html;
      _this.components_data[_this.current_component_index]['times_viewed']++; // * Incrementing no of times ad is viewed.

      var current_component_data = _this.components_data[_this.current_component_index];
      var ga_impression_data = {
        'event_category': 'impression',
        'event_action': 'watch',
        'content_id': current_component_data['content_id'],
        'content_name': current_component_data['content_name'] || "",
        'product_type': current_component_data['article_type'] || "",
        'product_category': current_component_data['category'] || "",
        'product_subcategory': current_component_data['subcategory'] || "",
        'times_viewed': current_component_data['times_viewed'] || 0
      };
      window.gtag('event', 'impression', ga_impression_data);
    }
  };

  this.onComponentClick = function () {
    try {
      if (!_this.components_data) {
        return;
      }

<<<<<<< HEAD:dist/maxtap_plugin.esm.js
      window.open(_this.components_data[_this.current_component_index].redirect_link, "_blank");
    };

    this.content_id = data.content_id;
    this.parentElement = null;
  }

  var _proto = Component.prototype;

  _proto.removeCurrentComponent = function removeCurrentComponent() {
    var main_container = document.getElementById(MaxTapComponentElementId);

    if (!main_container) {
      return;
    }

    if (main_container.style.display !== 'none') {
      main_container.style.display = "none";
      main_container.innerHTML = '';
=======
      _this.components_data[_this.current_component_index]['times_clicked']++;
      var current_component_data = _this.components_data[_this.current_component_index];
      var ga_click_data = {
        'event_category': 'action',
        'event_action': 'click',
        "content_id": current_component_data['content_id'] || _this.content_id,
        "time_to_click": Math.floor(_this.video.currentTime - _this.components_data[_this.current_component_index]['start_time']),
        "times_clicked": current_component_data['times_clicked']
      };
      window.gtag('event', 'click', ga_click_data);
      window.open(_this.components_data[_this.current_component_index].redirect_link, "_blank");
    } catch (err) {
      console.error(err);
>>>>>>> charan:dist/maxtap_plugin_dev.esm.js
    }
  };

  this.content_id = data.content_id;
  this.parentElement = null;
};

var MAXTAP_VERSION = 'maxtap_version(%MAXTAP_VERSION%)';
console.log(MAXTAP_VERSION);

console.log("maxtap_plugin@" + LIB_VERSION);

export { Component };
//# sourceMappingURL=maxtap_plugin.esm.js.map
