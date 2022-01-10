var MaxTapComponentElementId = 'componentmaxtap';
var GoogleAnalyticsCode = 'G-05P2385Q2K';
var MaxTapMainContainerId = 'containermaxtap';
var DataAttribute = 'data-displaymaxtap';
var DataUrl = "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com";
var CssCdn = 'https://unpkg.com/maxtap_plugin_dev@0.1.16/dist/styles.css';

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

var Component = /*#__PURE__*/function () {
  function Component(data) {
    var _this = this;

    this.current_component_index = 0;

    this.init = function () {
      _this.video = document.querySelector("[" + DataAttribute + "]");

      if (!_this.video) {
        console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + ("\n            Example: <video src=\"https://some_source\" " + DataAttribute + " > </video> \n\n            [OR]\n\n            Try to initialize the maxtap_ad component after window load.\n            "));
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
          maxtap_component == null ? void 0 : maxtap_component.addEventListener('click', function () {}); //* Checking for every second if video time is equal to ad start time.

          _this.interval_id = setInterval(function () {
            _this.updateComponent();
          }, 1000);
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

      var video_current_time = _this.video.currentTime;

      _this.components_data.forEach(function (component, component_index) {
        if (video_current_time >= component.start_time && video_current_time <= component.end_time) {
          _this.current_component_index = component_index;
        }
      });

      if (!_this.components_data[_this.current_component_index].is_image_loaded && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
        _this.prefetchImage();
      }

      if (_this.canComponentDisplay(_this.video.currentTime)) {
        _this.displayComponent();
      }

      if (_this.canCloseComponent(_this.video.currentTime)) {
        console.log(_this.current_component_index);
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
      var main_component = document.createElement('div');
      var main_container = document.createElement('div');
      main_container.className = 'maxtap_container';
      main_container.id = MaxTapMainContainerId;
      main_component.style.display = 'none';
      main_component.addEventListener('click', _this.onComponentClick);
      main_component.id = MaxTapComponentElementId;
      main_component.className = 'maxtap_component_wrapper';
      main_container.appendChild(_this.video);
      main_container.appendChild(main_component);
      (_this$parentElement = _this.parentElement) == null ? void 0 : _this$parentElement.appendChild(main_container); //!<------------------>  Re-initializing the video to get latest reference after manipulating dom elements.<----------------------->

      _this.video = document.querySelector("[" + DataAttribute + "]");
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
      //* Displaying ad by just changing css display:none -> display:flex
      var main_component = document.getElementById(MaxTapComponentElementId);

      if (!main_component) {
        return;
      }

      main_component.style.display = 'flex';
      main_component.innerHTML = "\n        <div class=\"maxtap_main\" >\n            <p>" + _this.components_data[_this.current_component_index].caption_regional_language + "</p>\n            <div class=\"maxtap_img_wrapper\">\n                <img src=\"" + _this.components_data[_this.current_component_index].image_link + "\"/>\n            </div>\n        </div>\n        ";
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

      if (!_this.components_data || _this.components_data[_this.current_component_index].image_link) {
        return;
      }

      window.open(_this.components_data[_this.current_component_index].redirect_link, "_blank");
    };

    console.log("Hit");
    this.content_id = data.content_id;
    this.parentElement = null;
    var css_link_element = document.createElement('link');
    css_link_element.href = CssCdn;
    css_link_element.rel = 'stylesheet';
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
    head_tag == null ? void 0 : head_tag.appendChild(css_link_element);
    head_tag == null ? void 0 : head_tag.appendChild(ga_script_element);
  }

  var _proto = Component.prototype;

  _proto.removeCurrentComponent = function removeCurrentComponent() {
    var main_container = document.getElementById(MaxTapComponentElementId);

    if (this.current_component_index >= this.components_data.length) {
      clearInterval(this.interval_id);
    }

    if (!main_container) {
      return;
    }

    main_container.style.display = "none";
    main_container.innerHTML = '';
  };

  return Component;
}();

export { Component };
//# sourceMappingURL=package_name.esm.js.map
