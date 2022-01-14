// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/maxtap_plugin_dev/dist/maxtap_plugin_dev.cjs.development.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var MaxTapComponentElementId = 'componentmaxtap';
var GoogleAnalyticsCode = 'G-05P2385Q2K';
var DataAttribute = 'data-displaymaxtap';
var DataUrl = "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com";
var CssCdn = 'https://unpkg.com/maxtap_plugin_dev@0.1.23/dist/styles.css';

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
  return;
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

      if (!_this.components_data[_this.current_component_index].is_image_loaded && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
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
      var _this$parentElement; //*  Getting data from firestore using http request. And changing state of component.


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
    console.log('update-2');
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
},{}],"../node_modules/maxtap_plugin_dev/dist/index.js":[function(require,module,exports) {
'use strict';

if ("development" === 'production') {
  module.exports = require('./maxtap_plugin_dev.cjs.production.min.js');
} else {
  module.exports = require('./maxtap_plugin_dev.cjs.development.js');
}
},{"./maxtap_plugin_dev.cjs.development.js":"../node_modules/maxtap_plugin_dev/dist/maxtap_plugin_dev.cjs.development.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _maxtap_plugin_dev = require("maxtap_plugin_dev");

// const maxtap_script = document.createElement('script');
// maxtap_script.src = "https://unpkg.com/maxtap_plugin_dev@latest/dist/plugin.js";
// maxtap_script.async = true
// maxtap_script.addEventListener('load', () => {
//     document.querySelector('video').setAttribute('data-displaymaxtap');
//     console.log(Maxtap);
//     new Maxtap.Component({ content_id: "koode_test_data" }).init();
// })
// document.querySelector('head').appendChild(maxtap_script)
setTimeout(function () {}, 3000);
window.addEventListener('load', function () {
  new _maxtap_plugin_dev.Component({
    content_id: "test_data"
  }).init();
});
},{"maxtap_plugin_dev":"../node_modules/maxtap_plugin_dev/dist/index.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45295" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map