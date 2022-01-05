var MaxTapComponentElementId = 'componentmaxtap';
var GoogleAnalyticsCode = 'G-05P2385Q2K';
var MaxTapMainContainerId = 'containermaxtap';
var DataAttribute = 'data-displaymaxtap';
var DataUrl = "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com";
var CssCdn = 'https://unpkg.com/maxtap_ads_js@latest/dist/maxtap_styles.css';

var queryData = function queryData(file_name) {
  return new Promise(function (res, rej) {
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
          if (parseInt(a['start']) < parseInt(b['start'])) {
            return -1;
          }

          if (parseInt(a['start']) > parseInt(b['start'])) {
            return 1;
          }

          return 0;
        });
        res(json_data);
      });
    })["catch"](function (err) {
      rej(err);
    });
  });
};

var Component = /*#__PURE__*/function () {
  function Component(content_id) {
    var _this = this;

    this.component_start_time = -1;
    this.component_end_time = -1;
    this.current_component_index = 0;
    this.is_component_showing = false;

    this.init = function () {
      _this.video = document.querySelector("[" + DataAttribute + "]");

      if (!_this.video) {
        console.error("Cannot find video element,Please check data attribute. It should be " + DataAttribute + ("\n            Example:\n            <video src=\"https://some_source\" " + DataAttribute + " > </video> "));
        return;
      }

      queryData(_this.content_id).then(function (data) {
        _this.component_data = data;

        if (!_this.component_data) {
          return;
        }

        _this.setRequiredComponentData();

        _this.initializeComponent();

        var maxtap_component = document.getElementById(MaxTapComponentElementId);
        maxtap_component == null ? void 0 : maxtap_component.addEventListener('click', function () {}); //* Checking for every second if video time is equal to ad start time.

        _this.interval_id = setInterval(function () {
          if (!_this.video) {
            console.error("Cannot find video element with id ");
            return;
          }

          if (!_this.image_loaded && _this.component_start_time - _this.video.currentTime <= 15) {
            console.log("Loding");

            _this.prefetchImage();
          }

          if (_this.canComponentDisplay(_this.video.currentTime)) {
            _this.displayComponent();

            return;
          }

          if (_this.canCloseComponent(_this.video.currentTime)) {
            _this.current_component_index++;

            _this.removeCurrentComponent();
          } //* Updating the current ad data to next ad data.;

        }, 500);
      });
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
      if (!_this.component_data) {
        return;
      }

      _this.image_loaded = true;
      var img = new Image();
      img.src = _this.component_data[_this.current_component_index]['img_url'];
    };

    this.canComponentDisplay = function (currentTime) {
      if (_this.component_start_time < 0) {
        return false;
      } //* Checking video time and also if video is already shown.


      if (currentTime >= _this.component_start_time && !_this.is_component_showing) {
        return true;
      }
      return false;
    };

    this.canCloseComponent = function (currentTime) {
      if (_this.component_start_time < 0) {
        return false;
      }

      if (currentTime >= _this.component_end_time && _this.is_component_showing) {
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
      main_component.innerHTML = "\n        <div class=\"maxtap_main\" >\n            <p>" + _this.product_details + "</p>\n            <div class=\"maxtap_img_wrapper\">\n                <img src=\"" + _this.image_url + "\"/>\n            </div>\n        </div>\n        ";
      window.gtag('event', 'watch', {
        'event_category': 'impression',
        'event_action': 'watch',
        "content_id": _this.content_id
      });
      _this.is_component_showing = true;
    };

    this.onComponentClick = function () {
      window.gtag('event', 'click', {
        'event_category': 'action',
        'event_action': 'click',
        "content_id": _this.content_id,
        "click_time": Math.floor(_this.video.currentTime)
      });

      if (!_this.redirect_url) {
        return;
      }

      window.open(_this.redirect_url, "_blank");
    };

    this.content_id = content_id;
    this.parentElement = null;
    this.image_loaded = false;
    var css_file = document.createElement('link');
    css_file.href = CssCdn;
    css_file.rel = 'stylesheet';
    var ga_script = document.createElement('script');
    ga_script.src = "https://www.googletagmanager.com/gtag/js?id=" + GoogleAnalyticsCode;
    ga_script.async = true;
    ga_script.id = GoogleAnalyticsCode;
    ga_script.addEventListener('load', function () {
      window.dataLayer = window.dataLayer || [];

      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', GoogleAnalyticsCode);
    });
    var head_tag = document.querySelector('head');
    head_tag == null ? void 0 : head_tag.appendChild(css_file);
    head_tag == null ? void 0 : head_tag.appendChild(ga_script);
  }

  var _proto = Component.prototype;

  _proto.removeCurrentComponent = function removeCurrentComponent() {
    var main_container = document.getElementById(MaxTapComponentElementId);

    if (this.current_component_index >= this.component_data.length) {
      console.log("clear interval");
      clearInterval(this.interval_id);
    } else {
      this.setRequiredComponentData(); // * Updating next ad data to class variables.
    }

    if (!main_container) {
      return;
    }

    main_container.style.display = "none";
    main_container.innerHTML = '';
    this.image_loaded = false;
    this.is_component_showing = false;
  };

  _proto.setRequiredComponentData = function setRequiredComponentData() {
    //* Setting ad to class variable and as well to react state.
    if (!this.component_data) return;
    var data = this.component_data;
    this.component_start_time = parseInt(data[this.current_component_index]['start']);
    this.image_url = data[this.current_component_index]['img_url'];
    this.redirect_url = data[this.current_component_index]['ad_url'];
    this.product_details = data[this.current_component_index]['product_details'];
    this.component_end_time = parseInt(data[this.current_component_index]['end']);
  };

  return Component;
}();

export { Component };
//# sourceMappingURL=maxtap_public.esm.js.map
