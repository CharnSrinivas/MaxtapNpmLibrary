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
})({"../node_modules/maxtap_plugin_dev/node_modules/platform/platform.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
;
(function () {
  'use strict';
  /** Used to determine if values are of the language type `Object`. */

  var objectTypes = {
    'function': true,
    'object': true
  };
  /** Used as a reference to the global object. */

  var root = objectTypes[typeof window] && window || this;
  /** Backup possible global object. */

  var oldRoot = root;
  /** Detect free variable `exports`. */

  var freeExports = objectTypes[typeof exports] && exports;
  /** Detect free variable `module`. */

  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */

  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }
  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */


  var maxSafeInteger = Math.pow(2, 53) - 1;
  /** Regular expression to detect Opera. */

  var reOpera = /\bOpera/;
  /** Possible global object. */

  var thisBinding = this;
  /** Used for native method references. */

  var objectProto = Object.prototype;
  /** Used to check for own properties of an object. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /** Used to resolve the internal `[[Class]]` of values. */

  var toString = objectProto.toString;
  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */

  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */


  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4': '10 Technical Preview',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': 'Server 2008 R2 / 7',
      '6.0': 'Server 2008 / Vista',
      '5.2': 'Server 2003 / XP 64-bit',
      '5.1': 'XP',
      '5.01': '2000 SP1',
      '5.0': '2000',
      '4.0': 'NT',
      '4.90': 'ME'
    }; // Detect Windows version from platform tokens.

    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    } // Correct character case and cleanup string.


    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(os.replace(/ ce$/i, ' CE').replace(/\bhpw/i, 'web').replace(/\bMacintosh\b/, 'Mac OS').replace(/_PowerPC\b/i, ' OS').replace(/\b(OS X) [^ \d]+/i, '$1').replace(/\bMac (OS X)\b/, '$1').replace(/\/(\d)/, ' $1').replace(/_/g, '.').replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '').replace(/\bx86\.64\b/gi, 'x86_64').replace(/\b(Windows Phone) OS\b/, '$1').replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1').split(' on ')[0]);
    return os;
  }
  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */


  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }
  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */


  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
  }
  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */


  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }
  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */


  function getClassOf(value) {
    return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
  }
  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */


  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == 'object' ? !!object[property] : true);
  }
  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */


  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }
  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */


  function reduce(array, callback) {
    var accumulator = null;
    each(array, function (value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }
  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */


  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }
  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */


  function parse(ua) {
    /** The environment context object. */
    var context = root;
    /** Used to flag when a custom context is provided. */

    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String'; // Juggle arguments.

    if (isCustomContext) {
      context = ua;
      ua = null;
    }
    /** Browser navigator object. */


    var nav = context.navigator || {};
    /** Browser user agent string. */

    var userAgent = nav.userAgent || '';
    ua || (ua = userAgent);
    /** Used to flag when `thisBinding` is the [ModuleScope]. */

    var isModuleScope = isCustomContext || thisBinding == oldRoot;
    /** Used to detect if browser is like Chrome. */

    var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
    /** Internal `[[Class]]` value shortcuts. */

    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = isCustomContext && context.java ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';
    /** Detect Java environments. */

    var java = /\bJava/.test(javaClass) && context.java;
    /** Detect Rhino. */

    var rhino = java && getClassOf(context.environment) == enviroClass;
    /** A character to represent alpha. */

    var alpha = java ? 'a' : '\u03b1';
    /** A character to represent beta. */

    var beta = java ? 'b' : '\u03b2';
    /** Browser document object. */

    var doc = context.document || {};
    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */

    var opera = context.operamini || context.opera;
    /** Opera `[[Class]]`. */

    var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera['[[Class]]'] : getClassOf(opera)) ? operaClass : opera = null;
    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */

    var data;
    /** The CPU architecture. */

    var arch = ua;
    /** Platform description array. */

    var description = [];
    /** Platform alpha/beta indicator. */

    var prerelease = null;
    /** A flag to indicate that environment features should be used to resolve the platform. */

    var useFeatures = ua == userAgent;
    /** The browser/environment version. */

    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();
    /** A flag to indicate if the OS ends with "/ Version" */

    var isSpecialCasedOS;
    /* Detectable layout engines (order is important). */

    var layout = getLayout([{
      'label': 'EdgeHTML',
      'pattern': 'Edge'
    }, 'Trident', {
      'label': 'WebKit',
      'pattern': 'AppleWebKit'
    }, 'iCab', 'Presto', 'NetFront', 'Tasman', 'KHTML', 'Gecko']);
    /* Detectable browser names (order is important). */

    var name = getName(['Adobe AIR', 'Arora', 'Avant Browser', 'Breach', 'Camino', 'Electron', 'Epiphany', 'Fennec', 'Flock', 'Galeon', 'GreenBrowser', 'iCab', 'Iceweasel', 'K-Meleon', 'Konqueror', 'Lunascape', 'Maxthon', {
      'label': 'Microsoft Edge',
      'pattern': '(?:Edge|Edg|EdgA|EdgiOS)'
    }, 'Midori', 'Nook Browser', 'PaleMoon', 'PhantomJS', 'Raven', 'Rekonq', 'RockMelt', {
      'label': 'Samsung Internet',
      'pattern': 'SamsungBrowser'
    }, 'SeaMonkey', {
      'label': 'Silk',
      'pattern': '(?:Cloud9|Silk-Accelerated)'
    }, 'Sleipnir', 'SlimBrowser', {
      'label': 'SRWare Iron',
      'pattern': 'Iron'
    }, 'Sunrise', 'Swiftfox', 'Vivaldi', 'Waterfox', 'WebPositive', {
      'label': 'Yandex Browser',
      'pattern': 'YaBrowser'
    }, {
      'label': 'UC Browser',
      'pattern': 'UCBrowser'
    }, 'Opera Mini', {
      'label': 'Opera Mini',
      'pattern': 'OPiOS'
    }, 'Opera', {
      'label': 'Opera',
      'pattern': 'OPR'
    }, 'Chromium', 'Chrome', {
      'label': 'Chrome',
      'pattern': '(?:HeadlessChrome)'
    }, {
      'label': 'Chrome Mobile',
      'pattern': '(?:CriOS|CrMo)'
    }, {
      'label': 'Firefox',
      'pattern': '(?:Firefox|Minefield)'
    }, {
      'label': 'Firefox for iOS',
      'pattern': 'FxiOS'
    }, {
      'label': 'IE',
      'pattern': 'IEMobile'
    }, {
      'label': 'IE',
      'pattern': 'MSIE'
    }, 'Safari']);
    /* Detectable products (order is important). */

    var product = getProduct([{
      'label': 'BlackBerry',
      'pattern': 'BB10'
    }, 'BlackBerry', {
      'label': 'Galaxy S',
      'pattern': 'GT-I9000'
    }, {
      'label': 'Galaxy S2',
      'pattern': 'GT-I9100'
    }, {
      'label': 'Galaxy S3',
      'pattern': 'GT-I9300'
    }, {
      'label': 'Galaxy S4',
      'pattern': 'GT-I9500'
    }, {
      'label': 'Galaxy S5',
      'pattern': 'SM-G900'
    }, {
      'label': 'Galaxy S6',
      'pattern': 'SM-G920'
    }, {
      'label': 'Galaxy S6 Edge',
      'pattern': 'SM-G925'
    }, {
      'label': 'Galaxy S7',
      'pattern': 'SM-G930'
    }, {
      'label': 'Galaxy S7 Edge',
      'pattern': 'SM-G935'
    }, 'Google TV', 'Lumia', 'iPad', 'iPod', 'iPhone', 'Kindle', {
      'label': 'Kindle Fire',
      'pattern': '(?:Cloud9|Silk-Accelerated)'
    }, 'Nexus', 'Nook', 'PlayBook', 'PlayStation Vita', 'PlayStation', 'TouchPad', 'Transformer', {
      'label': 'Wii U',
      'pattern': 'WiiU'
    }, 'Wii', 'Xbox One', {
      'label': 'Xbox 360',
      'pattern': 'Xbox'
    }, 'Xoom']);
    /* Detectable manufacturers. */

    var manufacturer = getManufacturer({
      'Apple': {
        'iPad': 1,
        'iPhone': 1,
        'iPod': 1
      },
      'Alcatel': {},
      'Archos': {},
      'Amazon': {
        'Kindle': 1,
        'Kindle Fire': 1
      },
      'Asus': {
        'Transformer': 1
      },
      'Barnes & Noble': {
        'Nook': 1
      },
      'BlackBerry': {
        'PlayBook': 1
      },
      'Google': {
        'Google TV': 1,
        'Nexus': 1
      },
      'HP': {
        'TouchPad': 1
      },
      'HTC': {},
      'Huawei': {},
      'Lenovo': {},
      'LG': {},
      'Microsoft': {
        'Xbox': 1,
        'Xbox One': 1
      },
      'Motorola': {
        'Xoom': 1
      },
      'Nintendo': {
        'Wii U': 1,
        'Wii': 1
      },
      'Nokia': {
        'Lumia': 1
      },
      'Oppo': {},
      'Samsung': {
        'Galaxy S': 1,
        'Galaxy S2': 1,
        'Galaxy S3': 1,
        'Galaxy S4': 1
      },
      'Sony': {
        'PlayStation': 1,
        'PlayStation Vita': 1
      },
      'Xiaomi': {
        'Mi': 1,
        'Redmi': 1
      }
    });
    /* Detectable operating systems (order is important). */

    var os = getOS(['Windows Phone', 'KaiOS', 'Android', 'CentOS', {
      'label': 'Chrome OS',
      'pattern': 'CrOS'
    }, 'Debian', {
      'label': 'DragonFly BSD',
      'pattern': 'DragonFly'
    }, 'Fedora', 'FreeBSD', 'Gentoo', 'Haiku', 'Kubuntu', 'Linux Mint', 'OpenBSD', 'Red Hat', 'SuSE', 'Ubuntu', 'Xubuntu', 'Cygwin', 'Symbian OS', 'hpwOS', 'webOS ', 'webOS', 'Tablet OS', 'Tizen', 'Linux', 'Mac OS X', 'Macintosh', 'Mac', 'Windows 98;', 'Windows ']);
    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */

    function getLayout(guesses) {
      return reduce(guesses, function (result, guess) {
        return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }
    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */


    function getManufacturer(guesses) {
      return reduce(guesses, function (result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)) && key;
      });
    }
    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */


    function getName(guesses) {
      return reduce(guesses, function (result, guess) {
        return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }
    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */


    function getOS(guesses) {
      return reduce(guesses, function (result, guess) {
        var pattern = guess.pattern || qualify(guess);

        if (!result && (result = RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua))) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }

        return result;
      });
    }
    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */


    function getProduct(guesses) {
      return reduce(guesses, function (result, guess) {
        var pattern = guess.pattern || qualify(guess);

        if (!result && (result = RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) || RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) || RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua))) {
          // Split by forward slash and append product version if needed.
          if ((result = String(guess.label && !RegExp(pattern, 'i').test(guess.label) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          } // Correct character case and cleanup string.


          guess = guess.label || guess;
          result = format(result[0].replace(RegExp(pattern, 'i'), guess).replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ').replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }

        return result;
      });
    }
    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */


    function getVersion(patterns) {
      return reduce(patterns, function (result, pattern) {
        return result || (RegExp(pattern + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }
    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */


    function toStringPlatform() {
      return this.description || '';
    }
    /*------------------------------------------------------------------------*/
    // Convert layout to an array so we can add extra details.


    layout && (layout = [layout]); // Detect Android products.
    // Browsers on Android devices typically provide their product IDS after "Android;"
    // up to "Build" or ") AppleWebKit".
    // Example:
    // "Mozilla/5.0 (Linux; Android 8.1.0; Moto G (5) Plus) AppleWebKit/537.36
    // (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36"

    if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
      product = trim(data[1]) // Replace any language codes (eg. "en-US").
      .replace(/^[a-z]{2}-[a-z]{2};\s*/i, '') || null;
    } // Detect product names that contain their manufacturer's name.


    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    } else if (manufacturer && product) {
      product = product.replace(RegExp('^(' + qualify(manufacturer) + ')[-_.\\s]', 'i'), manufacturer + ' ').replace(RegExp('^(' + qualify(manufacturer) + ')[-_.]?(\\w)', 'i'), manufacturer + ' $2');
    } // Clean up Google TV.


    if (data = /\bGoogle TV\b/.exec(product)) {
      product = data[0];
    } // Detect simulators.


    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    } // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.


    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    } // Detect IE Mobile 11.


    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    } // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua)) ? ' ' + data[1].replace(/_/g, '.') : '');
    } // Detect Kubuntu.
    else if (name == 'Konqueror' && /^Linux\b/i.test(os)) {
      os = 'Kubuntu';
    } // Detect Android browsers.
    else if (manufacturer && manufacturer != 'Google' && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    } // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }

      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    } // Detect UC Browser speed mode.
    else if (name == 'UC Browser' && /\bUCWEB\b/.test(ua)) {
      description.push('speed mode');
    } // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    } // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    } // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      } // Reassign a generic name.


      if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    } // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    } // Detect non-Opera (Presto-based) versions (order is important).


    if (!version) {
      version = getVersion(['(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)', 'Version', qualify(name), '(?:Firefox|Minefield|NetFront)']);
    } // Detect stubborn layout engines.


    if (data = layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' || !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') || layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront') {
      layout = [data];
    } // Detect Windows Phone 7 desktop mode.


    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    } // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    } // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }

      name = 'IE';
      version = data[1];
    } // Leverage environment features.


    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }

        if (rhino) {
          try {
            version = context.require('ringo/engine').version.join('.');
            name = 'RingoJS';
          } catch (e) {
            if ((data = context.system) && data.global.system == context.system) {
              name = 'Narwhal';
              os || (os = data[0].os || null);
            }
          }

          if (!name) {
            name = 'Rhino';
          }
        } else if (typeof context.process == 'object' && !context.process.browser && (data = context.process)) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          }

          if (!name) {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version);
            version = version ? version[0] : null;
          }
        }
      } // Detect Adobe AIR.
      else if (getClassOf(data = context.runtime) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      } // Detect PhantomJS.
      else if (getClassOf(data = context.phantom) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && data.major + '.' + data.minor + '.' + data.patch;
      } // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];

        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }

        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      } // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }

      os = os && format(os);
    } // Detect prerelease phases.


    if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && 'a')) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') + (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    } // Detect Firefox Mobile.


    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
      name = 'Firefox Mobile';
    } // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    } // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }

      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    } // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    } // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch (e) {
        description.unshift('embedded');
      }
    } // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] || version)) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    } // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os) || name == 'IE' && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, '') + ';')) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');

      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }

        data = 'identify' + data;
      } // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;

        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }

        if (/\bIE\b/.test(data)) {
          os = null;
        }

        if (!useFeatures) {
          version = null;
        }
      }

      layout = ['Presto'];
      description.push(data);
    } // Detect WebKit Nightly and approximate Chrome/Safari versions.


    if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data]; // Nightly builds are postfixed with a "+".

      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      } // Clear incorrect browser versions.
      else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      } // Use the full Chrome version when available.


      data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1]; // Detect Blink layout engine.

      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      } // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi


      if (!useFeatures || !likeChrome && !data[1]) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : '12');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      } // Add the postfix of ".x" or "+" for approximate versions.


      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+')); // Obscure version for some Safari 1-2 releases.

      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      } else if (name == 'Chrome' && /\bHeadlessChrome/i.test(ua)) {
        description.unshift('headless');
      }
    } // Detect Opera desktop modes.


    if (name == 'Opera' && (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');

      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }

      os = os.replace(RegExp(' *' + data + '$'), '');
    } // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    } // Newer versions of SRWare Iron uses the Chrome tag to indicate its version number.
    else if (/\bSRWare Iron\b/.test(name) && !version) {
      version = getVersion('Chrome');
    } // Strip incorrect OS versions.


    if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    } // Ensure OS does not include the browser name.


    if (os && os.indexOf(name) != -1 && !RegExp(name + ' OS').test(os)) {
      os = os.replace(RegExp(' *' + qualify(name) + ' *'), '');
    } // Add layout engine.


    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    } // Combine contextual information.


    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    } // Append manufacturer to description.


    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    } // Append product to description.


    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    } // Parse the OS into an object.


    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': data && !isSpecialCasedOS ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function () {
          var version = this.version;
          return this.family + (version && !isSpecialCasedOS ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    } // Add browser/OS architecture.


    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }

      if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
        description.unshift('32-bit');
      }
    } // Chrome 39 and above on OS X is always 64-bit.
    else if (os && /^OS X/.test(os.family) && name == 'Chrome' && parseFloat(version) >= 39) {
      os.architecture = 64;
    }

    ua || (ua = null);
    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */

    var platform = {};
    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */

    platform.description = ua;
    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */

    platform.layout = layout && layout[0];
    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */

    platform.manufacturer = manufacturer;
    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */

    platform.name = name;
    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */

    platform.prerelease = prerelease;
    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */

    platform.product = product;
    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */

    platform.ua = ua;
    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */

    platform.version = name && version;
    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */

    platform.os = os || {
      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
       * "SuSE", "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function () {
        return 'null';
      }
    };
    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }

    if (platform.name) {
      description.unshift(name);
    }

    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }

    if (description.length) {
      platform.description = description.join(' ');
    }

    return platform;
  }
  /*--------------------------------------------------------------------------*/
  // Export platform.


  var platform = parse(); // Some AMD build optimizers, like r.js, check for condition patterns like the following:

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform; // Define as an anonymous module so platform can be aliased through path mapping.

    define(function () {
      return platform;
    });
  } // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function (value, key) {
      freeExports[key] = value;
    });
  } else {
    // Export to the global object.
    root.platform = platform;
  }
}).call(this);
},{}],"../node_modules/maxtap_plugin_dev/dist/maxtap_plugin_dev.cjs.development.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var platform = require('platform');

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

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

var css_248z = "video[data-displaymaxtap]{height:100%;width:100%}.maxtap_component_wrapper{align-self:flex-end;bottom:75px;display:flex;position:absolute;right:0}.maxtap_main{align-items:center;background-color:rgba(0,0,0,.2);cursor:pointer;display:flex;flex-direction:row;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;justify-content:space-between;z-index:10}.maxtap_main>p{color:#fff;font-family:ubuntu,Roboto,sans-serif,Arial,Helvetica;font-size:calc(1vw + .1rem);font-weight:500;margin-left:.2rem;margin-right:.1rem;padding-left:.4rem}.maxtap_img_wrapper{align-items:center;display:flex;justify-content:center;margin-left:.6rem;padding:.3vw;width:6vw}.maxtap_img_wrapper>img{width:100%}";
styleInject(css_248z);
var LIB_VERSION = "0.1.15";
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

  this.init = function () {
    try {
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

    if (!_this.components_data[_this.current_component_index]['is_image_loaded'] && _this.components_data[_this.current_component_index].start_time - _this.video.currentTime <= 15) {
      _this.prefetchImage();
    }

    if (_this.canCloseComponent(_this.video.currentTime)) {
      _this.removeCurrentComponent();

      return;
    }

    if (_this.canComponentDisplay(_this.video.currentTime)) {
      _this.displayComponent();
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
    (_this$parentElement = _this.parentElement) == null ? void 0 : _this$parentElement.appendChild(main_component);

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
        'content_id': current_component_data['content_id'] || 'null',
        'content_name': current_component_data['content_name'] || 'null',
        'product_type': current_component_data['article_type'] || 'null',
        'product_category': current_component_data['category'] || 'null',
        'product_subcategory': current_component_data['subcategory'] || 'null',
        'times_viewed': current_component_data['times_viewed'] || -1,
        'advertiser': "myntra",
        'client_name': current_component_data['client_name'] || 'null',
        'start_time': current_component_data['start_time'] || -1,
        'browser_name': platform.name || "null",
        'os_family': platform.os.family || "null",
        'device_manufacturer': platform.manufacturer,
        'os_architecture': platform.os.architecture,
        'os_version': platform.os.version || "null"
      };
      window.gtag('event', 'impression', ga_impression_data);
    }
  };

  this.onComponentClick = function () {
    try {
      if (!_this.components_data) {
        return;
      }

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
    }
  };

  this.content_id = data.content_id;
  this.parentElement = null;
};

console.log("maxtap_plugin@" + LIB_VERSION);
exports.Component = Component;
},{"platform":"../node_modules/maxtap_plugin_dev/node_modules/platform/platform.js"}],"../node_modules/maxtap_plugin_dev/dist/index.js":[function(require,module,exports) {
'use strict';

if ("development" === 'production') {
  module.exports = require('./maxtap_plugin_dev.cjs.production.min.js');
} else {
  module.exports = require('./maxtap_plugin_dev.cjs.development.js');
}
},{"./maxtap_plugin_dev.cjs.development.js":"../node_modules/maxtap_plugin_dev/dist/maxtap_plugin_dev.cjs.development.js"}],"app.js":[function(require,module,exports) {
"use strict";

var Maxtap = _interopRequireWildcard(require("maxtap_plugin_dev"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

window.addEventListener('load', function () {
  new Maxtap.Component({
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41879" + '/');

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