'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MaxTapComponentElementId = 'componentmaxtap';
var GoogleAnalyticsCode = 'G-05P2385Q2K';
var DataAttribute = 'data-displaymaxtap';
var DataUrl = "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com"; // export const CssCdn = 'https://unpkg.com/maxtap_plugin_dev@latest/dist/styles.css';

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

var Component = /*#__PURE__*/function () {
  function Component(data) {
    var _this = this;

    this.current_component_index = 0;

    this.init = function () {
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

      try {
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

      if (!_this.components_data[_this.current_component_index]['is_image_loaded'] && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
        _this.prefetchImage();
      }

      if (_this.canComponentDisplay(_this.video.currentTime)) {
        _this.displayComponent();
      }

      if (_this.canCloseComponent(_this.video.currentTime)) {
        _this.current_component_index++;

        _this.removeCurrentComponent();
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

      _this.parentElement.style.position = 'relative';
      var main_component = document.createElement('div');
      main_component.style.display = 'none';
      main_component.id = MaxTapComponentElementId;
      main_component.className = 'maxtap_component_wrapper';
      (_this$parentElement = _this.parentElement) == null ? void 0 : _this$parentElement.appendChild(main_component); //!<------------------>  Re-initializing the video to get latest reference after manipulating dom elements.<----------------------->

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


      if (currentTime >= _this.components_data[_this.current_component_index].start_time) {
        return true;
      }
      return false;
    };

    this.canCloseComponent = function (currentTime) {
      if (!_this.components_data) return true;

      if (_this.components_data[_this.current_component_index].start_time < 0) {
        return false;
      }

      if (currentTime >= _this.components_data[_this.current_component_index].end_time) {
        return true;
      }

      return false;
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
      }

      window.gtag('event', 'watch', {
        'event_category': 'impression',
        'event_action': 'watch',
        "content_id": _this.content_id
      });
    };

    this.onComponentClick = function () {
      window.gtag('event', 'click', {
        'event_category': 'action',
        'event_action': 'click',
        "content_id": _this.content_id,
        "click_time": Math.floor(_this.video.currentTime)
      });

      if (!_this.components_data) {
        return;
      }

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
    }
  };

  return Component;
}();

exports.Component = Component;
//# sourceMappingURL=maxtap_plugin_dev.cjs.development.js.map
