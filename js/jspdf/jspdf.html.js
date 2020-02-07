(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}(function () {
    'use strict';

    /** @license
     * jsPDF - PDF Document creation from JavaScript
     * Version 1.5.3 Built on 2018-12-27T14:11:42.696Z
     *                      CommitID d93d28db14
     *
     * Copyright (c) 2010-2016 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
     *               2010 Aaron Spike, https://github.com/acspike
     *               2012 Willow Systems Corporation, willow-systems.com
     *               2012 Pablo Hess, https://github.com/pablohess
     *               2012 Florian Jenett, https://github.com/fjenett
     *               2013 Warren Weckesser, https://github.com/warrenweckesser
     *               2013 Youssef Beddad, https://github.com/lifof
     *               2013 Lee Driscoll, https://github.com/lsdriscoll
     *               2013 Stefan Slonevskiy, https://github.com/stefslon
     *               2013 Jeremy Morel, https://github.com/jmorel
     *               2013 Christoph Hartmann, https://github.com/chris-rock
     *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
     *               2014 James Makes, https://github.com/dollaruw
     *               2014 Diego Casorran, https://github.com/diegocr
     *               2014 Steven Spungin, https://github.com/Flamenco
     *               2014 Kenneth Glassey, https://github.com/Gavvers
     *
     * Licensed under the MIT License
     *
     * Contributor(s):
     *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
     *    kim3er, mfo, alnorth, Flamenco
     */

    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function (obj) {
                return typeof obj;
            };
        } else {
            _typeof = function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }

        return _typeof(obj);
    }

    /**
     * JavaScript Polyfill functions for jsPDF
     * Collected from public resources by
     * https://github.com/diegocr
     */
    (function (global) {
        if (_typeof(global.console) !== "object") {
            // Console-polyfill. MIT license.
            // https://github.com/paulmillr/console-polyfill
            // Make it safe to do console.log() always.
            global.console = {};
            var con = global.console;
            var prop, method;

            var dummy = function dummy() {};

            var properties = ['memory'];
            var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');

            while (prop = properties.pop()) {
                if (!con[prop]) con[prop] = {};
            }

            while (method = methods.pop()) {
                if (!con[method]) con[method] = dummy;
            }
        }

        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        if (typeof global.btoa === 'undefined') {
            global.btoa = function (data) {
                //  discuss at: http://phpjs.org/functions/base64_encode/
                // original by: Tyler Akins (http://rumkin.com)
                // improved by: Bayron Guevara
                // improved by: Thunder.m
                // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // improved by: Rafal Kukawski (http://kukawski.pl)
                // bugfixed by: Pellentesque Malesuada
                //   example 1: base64_encode('Kevin van Zonneveld');
                //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
                var o1,
                    o2,
                    o3,
                    h1,
                    h2,
                    h3,
                    h4,
                    bits,
                    i = 0,
                    ac = 0,
                    enc = '',
                    tmp_arr = [];

                if (!data) {
                    return data;
                }

                do {
                    // pack three octets into four hexets
                    o1 = data.charCodeAt(i++);
                    o2 = data.charCodeAt(i++);
                    o3 = data.charCodeAt(i++);
                    bits = o1 << 16 | o2 << 8 | o3;
                    h1 = bits >> 18 & 0x3f;
                    h2 = bits >> 12 & 0x3f;
                    h3 = bits >> 6 & 0x3f;
                    h4 = bits & 0x3f; // use hexets to index into b64, and append result to encoded string

                    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
                } while (i < data.length);

                enc = tmp_arr.join('');
                var r = data.length % 3;
                return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
            };
        }

        if (typeof global.atob === 'undefined') {
            global.atob = function (data) {
                //  discuss at: http://phpjs.org/functions/base64_decode/
                // original by: Tyler Akins (http://rumkin.com)
                // improved by: Thunder.m
                // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                //    input by: Aman Gupta
                //    input by: Brett Zamir (http://brett-zamir.me)
                // bugfixed by: Onno Marsman
                // bugfixed by: Pellentesque Malesuada
                // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
                //   returns 1: 'Kevin van Zonneveld'
                var o1,
                    o2,
                    o3,
                    h1,
                    h2,
                    h3,
                    h4,
                    bits,
                    i = 0,
                    ac = 0,
                    dec = '',
                    tmp_arr = [];

                if (!data) {
                    return data;
                }

                data += '';

                do {
                    // unpack four hexets into three octets using index points in b64
                    h1 = b64.indexOf(data.charAt(i++));
                    h2 = b64.indexOf(data.charAt(i++));
                    h3 = b64.indexOf(data.charAt(i++));
                    h4 = b64.indexOf(data.charAt(i++));
                    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
                    o1 = bits >> 16 & 0xff;
                    o2 = bits >> 8 & 0xff;
                    o3 = bits & 0xff;

                    if (h3 == 64) {
                        tmp_arr[ac++] = String.fromCharCode(o1);
                    } else if (h4 == 64) {
                        tmp_arr[ac++] = String.fromCharCode(o1, o2);
                    } else {
                        tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
                    }
                } while (i < data.length);

                dec = tmp_arr.join('');
                return dec;
            };
        }

        if (!Array.prototype.map) {
            Array.prototype.map = function (fun
                /*, thisArg */
            ) {
                if (this === void 0 || this === null || typeof fun !== "function") throw new TypeError();
                var t = Object(this),
                    len = t.length >>> 0,
                    res = new Array(len);
                var thisArg = arguments.length > 1 ? arguments[1] : void 0;

                for (var i = 0; i < len; i++) {
                    // NOTE: Absolute correctness would demand Object.defineProperty
                    //       be used.  But this method is fairly new, and failure is
                    //       possible only if Object.prototype or Array.prototype
                    //       has a property |i| (very unlikely), so use a less-correct
                    //       but more portable alternative.
                    if (i in t) res[i] = fun.call(thisArg, t[i], i, t);
                }

                return res;
            };
        }

        if (!Array.isArray) {
            Array.isArray = function (arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }

        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fun, thisArg) {

                if (this === void 0 || this === null || typeof fun !== "function") throw new TypeError();
                var t = Object(this),
                    len = t.length >>> 0;

                for (var i = 0; i < len; i++) {
                    if (i in t) fun.call(thisArg, t[i], i, t);
                }
            };
        } // https://tc39.github.io/ecma262/#sec-array.prototype.find


        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function value(predicate) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                    var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


                    var thisArg = arguments[1]; // 5. Let k be 0.

                    var k = 0; // 6. Repeat, while k < len

                    while (k < len) {
                        // a. Let Pk be ! ToString(k).
                        // b. Let kValue be ? Get(O, Pk).
                        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                        // d. If testResult is true, return kValue.
                        var kValue = o[k];

                        if (predicate.call(thisArg, kValue, k, o)) {
                            return kValue;
                        } // e. Increase k by 1.


                        k++;
                    } // 7. Return undefined.


                    return undefined;
                },
                configurable: true,
                writable: true
            });
        }

        if (!Object.keys) {
            Object.keys = function () {

                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !{
                        toString: null
                    }.propertyIsEnumerable('toString'),
                    dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                    dontEnumsLength = dontEnums.length;
                return function (obj) {
                    if (_typeof(obj) !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError();
                    }

                    var result = [],
                        prop,
                        i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }

                    return result;
                };
            }();
        }

        if (typeof Object.assign != 'function') {
            Object.assign = function (target) {

                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                target = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];

                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }

                return target;
            };
        }

        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, '');
            };
        }

        if (!String.prototype.trimLeft) {
            String.prototype.trimLeft = function () {
                return this.replace(/^\s+/g, "");
            };
        }

        if (!String.prototype.trimRight) {
            String.prototype.trimRight = function () {
                return this.replace(/\s+$/g, "");
            };
        }

        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        };
    })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')()); // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window

    /**
     * Creates new jsPDF document object instance.
     * @name jsPDF
     * @class
     * @param orientation {string/Object} Orientation of the first page. Possible values are "portrait" or "landscape" (or shortcuts "p" (Default), "l").<br />
     * Can also be an options object.
     * @param unit {string}  Measurement unit to be used when coordinates are specified.<br />
     * Possible values are "pt" (points), "mm" (Default), "cm", "in" or "px".
     * @param format {string/Array} The format of the first page. Can be:<ul><li>a0 - a10</li><li>b0 - b10</li><li>c0 - c10</li><li>dl</li><li>letter</li><li>government-letter</li><li>legal</li><li>junior-legal</li><li>ledger</li><li>tabloid</li><li>credit-card</li></ul><br />
     * Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89]
     * @returns {jsPDF} jsPDF-instance
     * @description
     * If the first parameter (orientation) is an object, it will be interpreted as an object of named parameters
     * ```
     * {
     *  orientation: 'p',
     *  unit: 'mm',
     *  format: 'a4',
     *  hotfixes: [] // an array of hotfix strings to enable
     * }
     * ```
     */
    var jsPDF = function (global) {
        /**
         * jsPDF's Internal PubSub Implementation.
         * Backward compatible rewritten on 2014 by
         * Diego Casorran, https://github.com/diegocr
         *
         * @class
         * @name PubSub
         * @ignore
         */

        function PubSub(context) {
            if (_typeof(context) !== 'object') {
                throw new Error('Invalid Context passed to initialize PubSub (jsPDF-module)');
            }

            var topics = {};

            this.subscribe = function (topic, callback, once) {
                once = once || false;

                if (typeof topic !== 'string' || typeof callback !== 'function' || typeof once !== 'boolean') {
                    throw new Error('Invalid arguments passed to PubSub.subscribe (jsPDF-module)');
                }

                if (!topics.hasOwnProperty(topic)) {
                    topics[topic] = {};
                }

                var token = Math.random().toString(35);
                topics[topic][token] = [callback, !!once];
                return token;
            };

            this.unsubscribe = function (token) {
                for (var topic in topics) {
                    if (topics[topic][token]) {
                        delete topics[topic][token];

                        if (Object.keys(topics[topic]).length === 0) {
                            delete topics[topic];
                        }

                        return true;
                    }
                }

                return false;
            };

            this.publish = function (topic) {
                if (topics.hasOwnProperty(topic)) {
                    var args = Array.prototype.slice.call(arguments, 1),
                        tokens = [];

                    for (var token in topics[topic]) {
                        var sub = topics[topic][token];

                        try {
                            sub[0].apply(context, args);
                        } catch (ex) {
                            if (global.console) {
                                console.error('jsPDF PubSub Error', ex.message, ex);
                            }
                        }

                        if (sub[1]) tokens.push(token);
                    }

                    if (tokens.length) tokens.forEach(this.unsubscribe);
                }
            };

            this.getTopics = function () {
                return topics;
            };
        }
        /**
         * @constructor
         * @private
         */


        function jsPDF(orientation, unit, format, compressPdf) {
            var options = {};
            var filters = [];
            var userUnit = 1.0;

            if (_typeof(orientation) === 'object') {
                options = orientation;
                orientation = options.orientation;
                unit = options.unit || unit;
                format = options.format || format;
                compressPdf = options.compress || options.compressPdf || compressPdf;
                filters = options.filters || (compressPdf === true ? ['FlateEncode'] : filters);
                userUnit = typeof options.userUnit === "number" ? Math.abs(options.userUnit) : 1.0;
            }

            unit = unit || 'mm';
            orientation = ('' + (orientation || 'P')).toLowerCase();
            var putOnlyUsedFonts = options.putOnlyUsedFonts || true;
            var usedFonts = {};
            var API = {
                internal: {},
                __private__: {}
            };
            API.__private__.PubSub = PubSub;
            var pdfVersion = '1.3';

            var getPdfVersion = API.__private__.getPdfVersion = function () {
                return pdfVersion;
            };

            var setPdfVersion = API.__private__.setPdfVersion = function (value) {
                pdfVersion = value;
            }; // Size in pt of various paper formats


            var pageFormats = {
                'a0': [2383.94, 3370.39],
                'a1': [1683.78, 2383.94],
                'a2': [1190.55, 1683.78],
                'a3': [841.89, 1190.55],
                'a4': [595.28, 841.89],
                'a5': [419.53, 595.28],
                'a6': [297.64, 419.53],
                'a7': [209.76, 297.64],
                'a8': [147.40, 209.76],
                'a9': [104.88, 147.40],
                'a10': [73.70, 104.88],
                'b0': [2834.65, 4008.19],
                'b1': [2004.09, 2834.65],
                'b2': [1417.32, 2004.09],
                'b3': [1000.63, 1417.32],
                'b4': [708.66, 1000.63],
                'b5': [498.90, 708.66],
                'b6': [354.33, 498.90],
                'b7': [249.45, 354.33],
                'b8': [175.75, 249.45],
                'b9': [124.72, 175.75],
                'b10': [87.87, 124.72],
                'c0': [2599.37, 3676.54],
                'c1': [1836.85, 2599.37],
                'c2': [1298.27, 1836.85],
                'c3': [918.43, 1298.27],
                'c4': [649.13, 918.43],
                'c5': [459.21, 649.13],
                'c6': [323.15, 459.21],
                'c7': [229.61, 323.15],
                'c8': [161.57, 229.61],
                'c9': [113.39, 161.57],
                'c10': [79.37, 113.39],
                'dl': [311.81, 623.62],
                'letter': [612, 792],
                'government-letter': [576, 756],
                'legal': [612, 1008],
                'junior-legal': [576, 360],
                'ledger': [1224, 792],
                'tabloid': [792, 1224],
                'credit-card': [153, 243]
            };

            var getPageFormats = API.__private__.getPageFormats = function () {
                return pageFormats;
            };

            var getPageFormat = API.__private__.getPageFormat = function (value) {
                return pageFormats[value];
            };

            if (typeof format === "string") {
                format = getPageFormat(format);
            }

            format = format || getPageFormat('a4');

            var f2 = API.f2 = API.__private__.f2 = function (number) {
                if (isNaN(number)) {
                    throw new Error('Invalid argument passed to jsPDF.f2');
                }

                return number.toFixed(2); // Ie, %.2f
            };

            var f3 = API.__private__.f3 = function (number) {
                if (isNaN(number)) {
                    throw new Error('Invalid argument passed to jsPDF.f3');
                }

                return number.toFixed(3); // Ie, %.3f
            };

            var fileId = '00000000000000000000000000000000';

            var getFileId = API.__private__.getFileId = function () {
                return fileId;
            };

            var setFileId = API.__private__.setFileId = function (value) {
                value = value || "12345678901234567890123456789012".split('').map(function () {
                    return "ABCDEF0123456789".charAt(Math.floor(Math.random() * 16));
                }).join('');
                fileId = value;
                return fileId;
            };
            /**
             * @name setFileId
             * @memberOf jsPDF
             * @function
             * @instance
             * @param {string} value GUID.
             * @returns {jsPDF}
             */


            API.setFileId = function (value) {
                setFileId(value);
                return this;
            };
            /**
             * @name getFileId
             * @memberOf jsPDF
             * @function
             * @instance
             *
             * @returns {string} GUID.
             */


            API.getFileId = function () {
                return getFileId();
            };

            var creationDate;

            var convertDateToPDFDate = API.__private__.convertDateToPDFDate = function (parmDate) {
                var result = '';
                var tzoffset = parmDate.getTimezoneOffset(),
                    tzsign = tzoffset < 0 ? '+' : '-',
                    tzhour = Math.floor(Math.abs(tzoffset / 60)),
                    tzmin = Math.abs(tzoffset % 60),
                    timeZoneString = [tzsign, padd2(tzhour), "'", padd2(tzmin), "'"].join('');
                result = ['D:', parmDate.getFullYear(), padd2(parmDate.getMonth() + 1), padd2(parmDate.getDate()), padd2(parmDate.getHours()), padd2(parmDate.getMinutes()), padd2(parmDate.getSeconds()), timeZoneString].join('');
                return result;
            };

            var convertPDFDateToDate = API.__private__.convertPDFDateToDate = function (parmPDFDate) {
                var year = parseInt(parmPDFDate.substr(2, 4), 10);
                var month = parseInt(parmPDFDate.substr(6, 2), 10) - 1;
                var date = parseInt(parmPDFDate.substr(8, 2), 10);
                var hour = parseInt(parmPDFDate.substr(10, 2), 10);
                var minutes = parseInt(parmPDFDate.substr(12, 2), 10);
                var seconds = parseInt(parmPDFDate.substr(14, 2), 10);
                var timeZoneHour = parseInt(parmPDFDate.substr(16, 2), 10);
                var timeZoneMinutes = parseInt(parmPDFDate.substr(20, 2), 10);
                var resultingDate = new Date(year, month, date, hour, minutes, seconds, 0);
                return resultingDate;
            };

            var setCreationDate = API.__private__.setCreationDate = function (date) {
                var tmpCreationDateString;
                var regexPDFCreationDate = /^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|\-0[0-9]|\-1[0-1])\'(0[0-9]|[1-5][0-9])\'?$/;

                if (typeof date === "undefined") {
                    date = new Date();
                }

                if (_typeof(date) === "object" && Object.prototype.toString.call(date) === "[object Date]") {
                    tmpCreationDateString = convertDateToPDFDate(date);
                } else if (regexPDFCreationDate.test(date)) {
                    tmpCreationDateString = date;
                } else {
                    throw new Error('Invalid argument passed to jsPDF.setCreationDate');
                }

                creationDate = tmpCreationDateString;
                return creationDate;
            };

            var getCreationDate = API.__private__.getCreationDate = function (type) {
                var result = creationDate;

                if (type === "jsDate") {
                    result = convertPDFDateToDate(creationDate);
                }

                return result;
            };
            /**
             * @name setCreationDate
             * @memberOf jsPDF
             * @function
             * @instance
             * @param {Object} date
             * @returns {jsPDF}
             */


            API.setCreationDate = function (date) {
                setCreationDate(date);
                return this;
            };
            /**
             * @name getCreationDate
             * @memberOf jsPDF
             * @function
             * @instance
             * @param {Object} type
             * @returns {Object}
             */


            API.getCreationDate = function (type) {
                return getCreationDate(type);
            };

            var padd2 = API.__private__.padd2 = function (number) {
                return ('0' + parseInt(number)).slice(-2);
            };

            var outToPages = !1; // switches where out() prints. outToPages true = push to pages obj. outToPages false = doc builder content

            var pages = [];
            var content = [];
            var currentPage;
            var content_length = 0;
            var customOutputDestination;

            var setOutputDestination = API.__private__.setCustomOutputDestination = function (destination) {
                customOutputDestination = destination;
            };

            var resetOutputDestination = API.__private__.resetCustomOutputDestination = function (destination) {
                customOutputDestination = undefined;
            };

            var out = API.__private__.out = function (string) {
                var writeArray;
                string = typeof string === "string" ? string : string.toString();

                if (typeof customOutputDestination === "undefined") {
                    writeArray = outToPages ? pages[currentPage] : content;
                } else {
                    writeArray = customOutputDestination;
                }

                writeArray.push(string);

                if (!outToPages) {
                    content_length += string.length + 1;
                }

                return writeArray;
            };

            var write = API.__private__.write = function (value) {
                return out(arguments.length === 1 ? value.toString() : Array.prototype.join.call(arguments, ' '));
            };

            var getArrayBuffer = API.__private__.getArrayBuffer = function (data) {
                var len = data.length,
                    ab = new ArrayBuffer(len),
                    u8 = new Uint8Array(ab);

                while (len--) {
                    u8[len] = data.charCodeAt(len);
                }

                return ab;
            };

            var standardFonts = [
                ['Helvetica', "helvetica", "normal", 'WinAnsiEncoding'],
                ['Helvetica-Bold', "helvetica", "bold", 'WinAnsiEncoding'],
                ['Helvetica-Oblique', "helvetica", "italic", 'WinAnsiEncoding'],
                ['Helvetica-BoldOblique', "helvetica", "bolditalic", 'WinAnsiEncoding'],
                ['Courier', "courier", "normal", 'WinAnsiEncoding'],
                ['Courier-Bold', "courier", "bold", 'WinAnsiEncoding'],
                ['Courier-Oblique', "courier", "italic", 'WinAnsiEncoding'],
                ['Courier-BoldOblique', "courier", "bolditalic", 'WinAnsiEncoding'],
                ['Times-Roman', "times", "normal", 'WinAnsiEncoding'],
                ['Times-Bold', "times", "bold", 'WinAnsiEncoding'],
                ['Times-Italic', "times", "italic", 'WinAnsiEncoding'],
                ['Times-BoldItalic', "times", "bolditalic", 'WinAnsiEncoding'],
                ['ZapfDingbats', "zapfdingbats", "normal", null],
                ['Symbol', "symbol", "normal", null]
            ];

            var getStandardFonts = API.__private__.getStandardFonts = function (data) {
                return standardFonts;
            };

            var activeFontSize = options.fontSize || 16;
            /**
             * Sets font size for upcoming text elements.
             *
             * @param {number} size Font size in points.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setFontSize
             */

            var setFontSize = API.__private__.setFontSize = API.setFontSize = function (size) {
                activeFontSize = size;
                return this;
            };
            /**
             * Gets the fontsize for upcoming text elements.
             *
             * @function
             * @instance
             * @returns {number}
             * @memberOf jsPDF
             * @name getFontSize
             */


            var getFontSize = API.__private__.getFontSize = API.getFontSize = function () {
                return activeFontSize;
            };

            var R2L = options.R2L || false;
            /**
             * Set value of R2L functionality.
             *
             * @param {boolean} value
             * @function
             * @instance
             * @returns {jsPDF} jsPDF-instance
             * @memberOf jsPDF
             * @name setR2L
             */

            var setR2L = API.__private__.setR2L = API.setR2L = function (value) {
                R2L = value;
                return this;
            };
            /**
             * Get value of R2L functionality.
             *
             * @function
             * @instance
             * @returns {boolean} jsPDF-instance
             * @memberOf jsPDF
             * @name getR2L
             */


            var getR2L = API.__private__.getR2L = API.getR2L = function (value) {
                return R2L;
            };

            var zoomMode; // default: 1;

            var setZoomMode = API.__private__.setZoomMode = function (zoom) {
                var validZoomModes = [undefined, null, 'fullwidth', 'fullheight', 'fullpage', 'original'];

                if (/^\d*\.?\d*\%$/.test(zoom)) {
                    zoomMode = zoom;
                } else if (!isNaN(zoom)) {
                    zoomMode = parseInt(zoom, 10);
                } else if (validZoomModes.indexOf(zoom) !== -1) {
                    zoomMode = zoom;
                } else {
                    throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + zoom + '" is not recognized.');
                }
            };

            var getZoomMode = API.__private__.getZoomMode = function () {
                return zoomMode;
            };

            var pageMode; // default: 'UseOutlines';

            var setPageMode = API.__private__.setPageMode = function (pmode) {
                var validPageModes = [undefined, null, 'UseNone', 'UseOutlines', 'UseThumbs', 'FullScreen'];

                if (validPageModes.indexOf(pmode) == -1) {
                    throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + pmode + '" is not recognized.');
                }

                pageMode = pmode;
            };

            var getPageMode = API.__private__.getPageMode = function () {
                return pageMode;
            };

            var layoutMode; // default: 'continuous';

            var setLayoutMode = API.__private__.setLayoutMode = function (layout) {
                var validLayoutModes = [undefined, null, 'continuous', 'single', 'twoleft', 'tworight', 'two'];

                if (validLayoutModes.indexOf(layout) == -1) {
                    throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + layout + '" is not recognized.');
                }

                layoutMode = layout;
            };

            var getLayoutMode = API.__private__.getLayoutMode = function () {
                return layoutMode;
            };
            /**
             * Set the display mode options of the page like zoom and layout.
             *
             * @name setDisplayMode
             * @memberOf jsPDF
             * @function 
             * @instance
             * @param {integer|String} zoom   You can pass an integer or percentage as
             * a string. 2 will scale the document up 2x, '200%' will scale up by the
             * same amount. You can also set it to 'fullwidth', 'fullheight',
             * 'fullpage', or 'original'.
             *
             * Only certain PDF readers support this, such as Adobe Acrobat.
             *
             * @param {string} layout Layout mode can be: 'continuous' - this is the
             * default continuous scroll. 'single' - the single page mode only shows one
             * page at a time. 'twoleft' - two column left mode, first page starts on
             * the left, and 'tworight' - pages are laid out in two columns, with the
             * first page on the right. This would be used for books.
             * @param {string} pmode 'UseOutlines' - it shows the
             * outline of the document on the left. 'UseThumbs' - shows thumbnails along
             * the left. 'FullScreen' - prompts the user to enter fullscreen mode.
             *
             * @returns {jsPDF}
             */


            var setDisplayMode = API.__private__.setDisplayMode = API.setDisplayMode = function (zoom, layout, pmode) {
                setZoomMode(zoom);
                setLayoutMode(layout);
                setPageMode(pmode);
                return this;
            };

            var documentProperties = {
                'title': '',
                'subject': '',
                'author': '',
                'keywords': '',
                'creator': ''
            };

            var getDocumentProperty = API.__private__.getDocumentProperty = function (key) {
                if (Object.keys(documentProperties).indexOf(key) === -1) {
                    throw new Error('Invalid argument passed to jsPDF.getDocumentProperty');
                }

                return documentProperties[key];
            };

            var getDocumentProperties = API.__private__.getDocumentProperties = function (properties) {
                return documentProperties;
            };
            /**
             * Adds a properties to the PDF document.
             *
             * @param {Object} A property_name-to-property_value object structure.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setDocumentProperties
             */


            var setDocumentProperties = API.__private__.setDocumentProperties = API.setProperties = API.setDocumentProperties = function (properties) {
                // copying only those properties we can render.
                for (var property in documentProperties) {
                    if (documentProperties.hasOwnProperty(property) && properties[property]) {
                        documentProperties[property] = properties[property];
                    }
                }

                return this;
            };

            var setDocumentProperty = API.__private__.setDocumentProperty = function (key, value) {
                if (Object.keys(documentProperties).indexOf(key) === -1) {
                    throw new Error('Invalid arguments passed to jsPDF.setDocumentProperty');
                }

                return documentProperties[key] = value;
            };

            var objectNumber = 0; // 'n' Current object number

            var offsets = []; // List of offsets. Activated and reset by buildDocument(). Pupulated by various calls buildDocument makes.

            var fonts = {}; // collection of font objects, where key is fontKey - a dynamically created label for a given font.

            var fontmap = {}; // mapping structure fontName > fontStyle > font key - performance layer. See addFont()

            var activeFontKey; // will be string representing the KEY of the font as combination of fontName + fontStyle

            var k; // Scale factor

            var page = 0;
            var pagesContext = [];
            var additionalObjects = [];
            var events = new PubSub(API);
            var hotfixes = options.hotfixes || [];

            var newObject = API.__private__.newObject = function () {
                var oid = newObjectDeferred();
                newObjectDeferredBegin(oid, true);
                return oid;
            }; // Does not output the object.  The caller must call newObjectDeferredBegin(oid) before outputing any data


            var newObjectDeferred = API.__private__.newObjectDeferred = function () {
                objectNumber++;

                offsets[objectNumber] = function () {
                    return content_length;
                };

                return objectNumber;
            };

            var newObjectDeferredBegin = function newObjectDeferredBegin(oid, doOutput) {
                doOutput = typeof doOutput === 'boolean' ? doOutput : false;
                offsets[oid] = content_length;

                if (doOutput) {
                    out(oid + ' 0 obj');
                }

                return oid;
            }; // Does not output the object until after the pages have been output.
            // Returns an object containing the objectId and content.
            // All pages have been added so the object ID can be estimated to start right after.
            // This does not modify the current objectNumber;  It must be updated after the newObjects are output.


            var newAdditionalObject = API.__private__.newAdditionalObject = function () {
                var objId = newObjectDeferred();
                var obj = {
                    objId: objId,
                    content: ''
                };
                additionalObjects.push(obj);
                return obj;
            };

            var rootDictionaryObjId = newObjectDeferred();
            var resourceDictionaryObjId = newObjectDeferred(); /////////////////////
            // Private functions
            /////////////////////

            var decodeColorString = API.__private__.decodeColorString = function (color) {
                var colorEncoded = color.split(' ');

                if (colorEncoded.length === 2 && (colorEncoded[1] === 'g' || colorEncoded[1] === 'G')) {
                    // convert grayscale value to rgb so that it can be converted to hex for consistency
                    var floatVal = parseFloat(colorEncoded[0]);
                    colorEncoded = [floatVal, floatVal, floatVal, 'r'];
                }

                var colorAsRGB = '#';

                for (var i = 0; i < 3; i++) {
                    colorAsRGB += ('0' + Math.floor(parseFloat(colorEncoded[i]) * 255).toString(16)).slice(-2);
                }

                return colorAsRGB;
            };

            var encodeColorString = API.__private__.encodeColorString = function (options) {
                var color;

                if (typeof options === "string") {
                    options = {
                        ch1: options
                    };
                }

                var ch1 = options.ch1;
                var ch2 = options.ch2;
                var ch3 = options.ch3;
                var ch4 = options.ch4;
                var precision = options.precision;
                var letterArray = options.pdfColorType === "draw" ? ['G', 'RG', 'K'] : ['g', 'rg', 'k'];

                if (typeof ch1 === "string" && ch1.charAt(0) !== '#') {
                    var rgbColor = new RGBColor(ch1);

                    if (rgbColor.ok) {
                        ch1 = rgbColor.toHex();
                    } else if (!/^\d*\.?\d*$/.test(ch1)) {
                        throw new Error('Invalid color "' + ch1 + '" passed to jsPDF.encodeColorString.');
                    }
                } //convert short rgb to long form


                if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{3}$/.test(ch1)) {
                    ch1 = '#' + ch1[1] + ch1[1] + ch1[2] + ch1[2] + ch1[3] + ch1[3];
                }

                if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{6}$/.test(ch1)) {
                    var hex = parseInt(ch1.substr(1), 16);
                    ch1 = hex >> 16 & 255;
                    ch2 = hex >> 8 & 255;
                    ch3 = hex & 255;
                }

                if (typeof ch2 === "undefined" || typeof ch4 === "undefined" && ch1 === ch2 && ch2 === ch3) {
                    // Gray color space.
                    if (typeof ch1 === "string") {
                        color = ch1 + " " + letterArray[0];
                    } else {
                        switch (options.precision) {
                            case 2:
                                color = f2(ch1 / 255) + " " + letterArray[0];
                                break;

                            case 3:
                            default:
                                color = f3(ch1 / 255) + " " + letterArray[0];
                        }
                    }
                } else if (typeof ch4 === "undefined" || _typeof(ch4) === "object") {
                    // assume RGBA
                    if (ch4 && !isNaN(ch4.a)) {
                        //TODO Implement transparency.
                        //WORKAROUND use white for now, if transparent, otherwise handle as rgb
                        if (ch4.a === 0) {
                            color = ['1.000', '1.000', '1.000', letterArray[1]].join(" ");
                            return color;
                        }
                    } // assume RGB


                    if (typeof ch1 === "string") {
                        color = [ch1, ch2, ch3, letterArray[1]].join(" ");
                    } else {
                        switch (options.precision) {
                            case 2:
                                color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), letterArray[1]].join(" ");
                                break;

                            default:
                            case 3:
                                color = [f3(ch1 / 255), f3(ch2 / 255), f3(ch3 / 255), letterArray[1]].join(" ");
                        }
                    }
                } else {
                    // assume CMYK
                    if (typeof ch1 === 'string') {
                        color = [ch1, ch2, ch3, ch4, letterArray[2]].join(" ");
                    } else {
                        switch (options.precision) {
                            case 2:
                                color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), f2(ch4 / 255), letterArray[2]].join(" ");
                                break;

                            case 3:
                            default:
                                color = [f3(ch1 / 255), f3(ch2 / 255), f3(ch3 / 255), f3(ch4 / 255), letterArray[2]].join(" ");
                        }
                    }
                }

                return color;
            };

            var getFilters = API.__private__.getFilters = function () {
                return filters;
            };

            var putStream = API.__private__.putStream = function (options) {
                options = options || {};
                var data = options.data || '';
                var filters = options.filters || getFilters();
                var alreadyAppliedFilters = options.alreadyAppliedFilters || [];
                var addLength1 = options.addLength1 || false;
                var valueOfLength1 = data.length;
                var processedData = {};

                if (filters === true) {
                    filters = ['FlateEncode'];
                }

                var keyValues = options.additionalKeyValues || [];

                if (typeof jsPDF.API.processDataByFilters !== 'undefined') {
                    processedData = jsPDF.API.processDataByFilters(data, filters);
                } else {
                    processedData = {
                        data: data,
                        reverseChain: []
                    };
                }

                var filterAsString = processedData.reverseChain + (Array.isArray(alreadyAppliedFilters) ? alreadyAppliedFilters.join(' ') : alreadyAppliedFilters.toString());

                if (processedData.data.length !== 0) {
                    keyValues.push({
                        key: 'Length',
                        value: processedData.data.length
                    });

                    if (addLength1 === true) {
                        keyValues.push({
                            key: 'Length1',
                            value: valueOfLength1
                        });
                    }
                }

                if (filterAsString.length != 0) {
                    //if (filters.length === 0 && alreadyAppliedFilters.length === 1 && typeof alreadyAppliedFilters !== "undefined") {
                    if (filterAsString.split('/').length - 1 === 1) {
                        keyValues.push({
                            key: 'Filter',
                            value: filterAsString
                        });
                    } else {
                        keyValues.push({
                            key: 'Filter',
                            value: '[' + filterAsString + ']'
                        });
                    }
                }

                out('<<');

                for (var i = 0; i < keyValues.length; i++) {
                    out('/' + keyValues[i].key + ' ' + keyValues[i].value);
                }

                out('>>');

                if (processedData.data.length !== 0) {
                    out('stream');
                    out(processedData.data);
                    out('endstream');
                }
            };

            var putPage = API.__private__.putPage = function (page) {
                var mediaBox = page.mediaBox;
                var pageNumber = page.number;
                var data = page.data;
                var pageObjectNumber = page.objId;
                var pageContentsObjId = page.contentsObjId;
                newObjectDeferredBegin(pageObjectNumber, true);
                var wPt = pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX;
                var hPt = pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY;
                out('<</Type /Page');
                out('/Parent ' + page.rootDictionaryObjId + ' 0 R');
                out('/Resources ' + page.resourceDictionaryObjId + ' 0 R');
                out('/MediaBox [' + parseFloat(f2(page.mediaBox.bottomLeftX)) + ' ' + parseFloat(f2(page.mediaBox.bottomLeftY)) + ' ' + f2(page.mediaBox.topRightX) + ' ' + f2(page.mediaBox.topRightY) + ']');

                if (page.cropBox !== null) {
                    out('/CropBox [' + f2(page.cropBox.bottomLeftX) + ' ' + f2(page.cropBox.bottomLeftY) + ' ' + f2(page.cropBox.topRightX) + ' ' + f2(page.cropBox.topRightY) + ']');
                }

                if (page.bleedBox !== null) {
                    out('/BleedBox [' + f2(page.bleedBox.bottomLeftX) + ' ' + f2(page.bleedBox.bottomLeftY) + ' ' + f2(page.bleedBox.topRightX) + ' ' + f2(page.bleedBox.topRightY) + ']');
                }

                if (page.trimBox !== null) {
                    out('/TrimBox [' + f2(page.trimBox.bottomLeftX) + ' ' + f2(page.trimBox.bottomLeftY) + ' ' + f2(page.trimBox.topRightX) + ' ' + f2(page.trimBox.topRightY) + ']');
                }

                if (page.artBox !== null) {
                    out('/ArtBox [' + f2(page.artBox.bottomLeftX) + ' ' + f2(page.artBox.bottomLeftY) + ' ' + f2(page.artBox.topRightX) + ' ' + f2(page.artBox.topRightY) + ']');
                }

                if (typeof page.userUnit === "number" && page.userUnit !== 1.0) {
                    out('/UserUnit ' + page.userUnit);
                }

                events.publish('putPage', {
                    objId: pageObjectNumber,
                    pageContext: pagesContext[pageNumber],
                    pageNumber: pageNumber,
                    page: data
                });
                out('/Contents ' + pageContentsObjId + ' 0 R');
                out('>>');
                out('endobj'); // Page content

                var pageContent = data.join('\n');
                newObjectDeferredBegin(pageContentsObjId, true);
                putStream({
                    data: pageContent,
                    filters: getFilters()
                });
                out('endobj');
                return pageObjectNumber;
            };

            var putPages = API.__private__.putPages = function () {
                var n,
                    i,
                    pageObjectNumbers = [];

                for (n = 1; n <= page; n++) {
                    pagesContext[n].objId = newObjectDeferred();
                    pagesContext[n].contentsObjId = newObjectDeferred();
                }

                for (n = 1; n <= page; n++) {
                    pageObjectNumbers.push(putPage({
                        number: n,
                        data: pages[n],
                        objId: pagesContext[n].objId,
                        contentsObjId: pagesContext[n].contentsObjId,
                        mediaBox: pagesContext[n].mediaBox,
                        cropBox: pagesContext[n].cropBox,
                        bleedBox: pagesContext[n].bleedBox,
                        trimBox: pagesContext[n].trimBox,
                        artBox: pagesContext[n].artBox,
                        userUnit: pagesContext[n].userUnit,
                        rootDictionaryObjId: rootDictionaryObjId,
                        resourceDictionaryObjId: resourceDictionaryObjId
                    }));
                }

                newObjectDeferredBegin(rootDictionaryObjId, true);
                out('<</Type /Pages');
                var kids = '/Kids [';

                for (i = 0; i < page; i++) {
                    kids += pageObjectNumbers[i] + ' 0 R ';
                }

                out(kids + ']');
                out('/Count ' + page);
                out('>>');
                out('endobj');
                events.publish('postPutPages');
            };

            var putFont = function putFont(font) {
                events.publish('putFont', {
                    font: font,
                    out: out,
                    newObject: newObject,
                    putStream: putStream
                });

                if (font.isAlreadyPutted !== true) {
                    font.objectNumber = newObject();
                    out('<<');
                    out('/Type /Font');
                    out('/BaseFont /' + font.postScriptName);
                    out('/Subtype /Type1');

                    if (typeof font.encoding === 'string') {
                        out('/Encoding /' + font.encoding);
                    }

                    out('/FirstChar 32');
                    out('/LastChar 255');
                    out('>>');
                    out('endobj');
                }
            };

            var putFonts = function putFonts() {
                for (var fontKey in fonts) {
                    if (fonts.hasOwnProperty(fontKey)) {
                        if (putOnlyUsedFonts === false || putOnlyUsedFonts === true && usedFonts.hasOwnProperty(fontKey)) {
                            putFont(fonts[fontKey]);
                        }
                    }
                }
            };

            var putResourceDictionary = function putResourceDictionary() {
                out('/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]');
                out('/Font <<'); // Do this for each font, the '1' bit is the index of the font

                for (var fontKey in fonts) {
                    if (fonts.hasOwnProperty(fontKey)) {
                        if (putOnlyUsedFonts === false || putOnlyUsedFonts === true && usedFonts.hasOwnProperty(fontKey)) {
                            out('/' + fontKey + ' ' + fonts[fontKey].objectNumber + ' 0 R');
                        }
                    }
                }

                out('>>');
                out('/XObject <<');
                events.publish('putXobjectDict');
                out('>>');
            };

            var putResources = function putResources() {
                putFonts();
                events.publish('putResources');
                newObjectDeferredBegin(resourceDictionaryObjId, true);
                out('<<');
                putResourceDictionary();
                out('>>');
                out('endobj');
                events.publish('postPutResources');
            };

            var putAdditionalObjects = function putAdditionalObjects() {
                events.publish('putAdditionalObjects');

                for (var i = 0; i < additionalObjects.length; i++) {
                    var obj = additionalObjects[i];
                    newObjectDeferredBegin(obj.objId, true);
                    out(obj.content);
                    out('endobj');
                }

                events.publish('postPutAdditionalObjects');
            };

            var addToFontDictionary = function addToFontDictionary(fontKey, fontName, fontStyle) {
                // this is mapping structure for quick font key lookup.
                // returns the KEY of the font (ex: "F1") for a given
                // pair of font name and type (ex: "Arial". "Italic")
                if (!fontmap.hasOwnProperty(fontName)) {
                    fontmap[fontName] = {};
                }

                fontmap[fontName][fontStyle] = fontKey;
            };

            var addFont = function addFont(postScriptName, fontName, fontStyle, encoding, isStandardFont) {
                isStandardFont = isStandardFont || false;
                var fontKey = 'F' + (Object.keys(fonts).length + 1).toString(10),
                    // This is FontObject
                    font = {
                        'id': fontKey,
                        'postScriptName': postScriptName,
                        'fontName': fontName,
                        'fontStyle': fontStyle,
                        'encoding': encoding,
                        'isStandardFont': isStandardFont,
                        'metadata': {}
                    };
                var instance = this;
                events.publish('addFont', {
                    font: font,
                    instance: instance
                });

                if (fontKey !== undefined) {
                    fonts[fontKey] = font;
                    addToFontDictionary(fontKey, fontName, fontStyle);
                }

                return fontKey;
            };

            var addFonts = function addFonts(arrayOfFonts) {
                for (var i = 0, l = standardFonts.length; i < l; i++) {
                    var fontKey = addFont(arrayOfFonts[i][0], arrayOfFonts[i][1], arrayOfFonts[i][2], standardFonts[i][3], true);
                    usedFonts[fontKey] = true; // adding aliases for standard fonts, this time matching the capitalization

                    var parts = arrayOfFonts[i][0].split('-');
                    addToFontDictionary(fontKey, parts[0], parts[1] || '');
                }

                events.publish('addFonts', {
                    fonts: fonts,
                    dictionary: fontmap
                });
            };

            var SAFE = function __safeCall(fn) {
                fn.foo = function __safeCallWrapper() {
                    try {
                        return fn.apply(this, arguments);
                    } catch (e) {
                        var stack = e.stack || '';
                        if (~stack.indexOf(' at ')) stack = stack.split(" at ")[1];
                        var m = "Error in function " + stack.split("\n")[0].split('<')[0] + ": " + e.message;

                        if (global.console) {
                            global.console.error(m, e);
                            if (global.alert) alert(m);
                        } else {
                            throw new Error(m);
                        }
                    }
                };

                fn.foo.bar = fn;
                return fn.foo;
            };

            var to8bitStream = function to8bitStream(text, flags) {
                /**
                 * PDF 1.3 spec:
                 * "For text strings encoded in Unicode, the first two bytes must be 254 followed by
                 * 255, representing the Unicode byte order marker, U+FEFF. (This sequence conflicts
                 * with the PDFDocEncoding character sequence thorn ydieresis, which is unlikely
                 * to be a meaningful beginning of a word or phrase.) The remainder of the
                 * string consists of Unicode character codes, according to the UTF-16 encoding
                 * specified in the Unicode standard, version 2.0. Commonly used Unicode values
                 * are represented as 2 bytes per character, with the high-order byte appearing first
                 * in the string."
                 *
                 * In other words, if there are chars in a string with char code above 255, we
                 * recode the string to UCS2 BE - string doubles in length and BOM is prepended.
                 *
                 * HOWEVER!
                 * Actual *content* (body) text (as opposed to strings used in document properties etc)
                 * does NOT expect BOM. There, it is treated as a literal GID (Glyph ID)
                 *
                 * Because of Adobe's focus on "you subset your fonts!" you are not supposed to have
                 * a font that maps directly Unicode (UCS2 / UTF16BE) code to font GID, but you could
                 * fudge it with "Identity-H" encoding and custom CIDtoGID map that mimics Unicode
                 * code page. There, however, all characters in the stream are treated as GIDs,
                 * including BOM, which is the reason we need to skip BOM in content text (i.e. that
                 * that is tied to a font).
                 *
                 * To signal this "special" PDFEscape / to8bitStream handling mode,
                 * API.text() function sets (unless you overwrite it with manual values
                 * given to API.text(.., flags) )
                 * flags.autoencode = true
                 * flags.noBOM = true
                 *
                 * ===================================================================================
                 * `flags` properties relied upon:
                 *   .sourceEncoding = string with encoding label.
                 *                     "Unicode" by default. = encoding of the incoming text.
                 *                     pass some non-existing encoding name
                 *                     (ex: 'Do not touch my strings! I know what I am doing.')
                 *                     to make encoding code skip the encoding step.
                 *   .outputEncoding = Either valid PDF encoding name
                 *                     (must be supported by jsPDF font metrics, otherwise no encoding)
                 *                     or a JS object, where key = sourceCharCode, value = outputCharCode
                 *                     missing keys will be treated as: sourceCharCode === outputCharCode
                 *   .noBOM
                 *       See comment higher above for explanation for why this is important
                 *   .autoencode
                 *       See comment higher above for explanation for why this is important
                 */
                var i, l, sourceEncoding, encodingBlock, outputEncoding, newtext, isUnicode, ch, bch;
                flags = flags || {};
                sourceEncoding = flags.sourceEncoding || 'Unicode';
                outputEncoding = flags.outputEncoding; // This 'encoding' section relies on font metrics format
                // attached to font objects by, among others,
                // "Willow Systems' standard_font_metrics plugin"
                // see jspdf.plugin.standard_font_metrics.js for format
                // of the font.metadata.encoding Object.
                // It should be something like
                //   .encoding = {'codePages':['WinANSI....'], 'WinANSI...':{code:code, ...}}
                //   .widths = {0:width, code:width, ..., 'fof':divisor}
                //   .kerning = {code:{previous_char_code:shift, ..., 'fof':-divisor},...}

                if ((flags.autoencode || outputEncoding) && fonts[activeFontKey].metadata && fonts[activeFontKey].metadata[sourceEncoding] && fonts[activeFontKey].metadata[sourceEncoding].encoding) {
                    encodingBlock = fonts[activeFontKey].metadata[sourceEncoding].encoding; // each font has default encoding. Some have it clearly defined.

                    if (!outputEncoding && fonts[activeFontKey].encoding) {
                        outputEncoding = fonts[activeFontKey].encoding;
                    } // Hmmm, the above did not work? Let's try again, in different place.


                    if (!outputEncoding && encodingBlock.codePages) {
                        outputEncoding = encodingBlock.codePages[0]; // let's say, first one is the default
                    }

                    if (typeof outputEncoding === 'string') {
                        outputEncoding = encodingBlock[outputEncoding];
                    } // we want output encoding to be a JS Object, where
                    // key = sourceEncoding's character code and
                    // value = outputEncoding's character code.


                    if (outputEncoding) {
                        isUnicode = false;
                        newtext = [];

                        for (i = 0, l = text.length; i < l; i++) {
                            ch = outputEncoding[text.charCodeAt(i)];

                            if (ch) {
                                newtext.push(String.fromCharCode(ch));
                            } else {
                                newtext.push(text[i]);
                            } // since we are looping over chars anyway, might as well
                            // check for residual unicodeness


                            if (newtext[i].charCodeAt(0) >> 8) {
                                /* more than 255 */
                                isUnicode = true;
                            }
                        }

                        text = newtext.join('');
                    }
                }

                i = text.length; // isUnicode may be set to false above. Hence the triple-equal to undefined

                while (isUnicode === undefined && i !== 0) {
                    if (text.charCodeAt(i - 1) >> 8) {
                        /* more than 255 */
                        isUnicode = true;
                    }

                    i--;
                }

                if (!isUnicode) {
                    return text;
                }

                newtext = flags.noBOM ? [] : [254, 255];

                for (i = 0, l = text.length; i < l; i++) {
                    ch = text.charCodeAt(i);
                    bch = ch >> 8; // divide by 256

                    if (bch >> 8) {
                        /* something left after dividing by 256 second time */
                        throw new Error("Character at position " + i + " of string '" + text + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
                    }

                    newtext.push(bch);
                    newtext.push(ch - (bch << 8));
                }

                return String.fromCharCode.apply(undefined, newtext);
            };

            var pdfEscape = API.__private__.pdfEscape = API.pdfEscape = function (text, flags) {
                /**
                 * Replace '/', '(', and ')' with pdf-safe versions
                 *
                 * Doing to8bitStream does NOT make this PDF display unicode text. For that
                 * we also need to reference a unicode font and embed it - royal pain in the rear.
                 *
                 * There is still a benefit to to8bitStream - PDF simply cannot handle 16bit chars,
                 * which JavaScript Strings are happy to provide. So, while we still cannot display
                 * 2-byte characters property, at least CONDITIONALLY converting (entire string containing)
                 * 16bit chars to (USC-2-BE) 2-bytes per char + BOM streams we ensure that entire PDF
                 * is still parseable.
                 * This will allow immediate support for unicode in document properties strings.
                 */
                return to8bitStream(text, flags).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            };

            var beginPage = API.__private__.beginPage = function (width, height) {
                var tmp; // Dimensions are stored as user units and converted to points on output

                var orientation = typeof height === 'string' && height.toLowerCase();

                if (typeof width === 'string') {
                    if (tmp = getPageFormat(width.toLowerCase())) {
                        width = tmp[0];
                        height = tmp[1];
                    }
                }

                if (Array.isArray(width)) {
                    height = width[1];
                    width = width[0];
                }

                if (isNaN(width) || isNaN(height)) {
                    width = format[0];
                    height = format[1];
                }

                if (orientation) {
                    switch (orientation.substr(0, 1)) {
                        case 'l':
                            if (height > width) orientation = 's';
                            break;

                        case 'p':
                            if (width > height) orientation = 's';
                            break;
                    }

                    if (orientation === 's') {
                        tmp = width;
                        width = height;
                        height = tmp;
                    }
                }

                if (width > 14400 || height > 14400) {
                    console.warn('A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400');
                    width = Math.min(14400, width);
                    height = Math.min(14400, height);
                }

                format = [width, height];
                outToPages = true;
                pages[++page] = [];
                pagesContext[page] = {
                    objId: 0,
                    contentsObjId: 0,
                    userUnit: Number(userUnit),
                    artBox: null,
                    bleedBox: null,
                    cropBox: null,
                    trimBox: null,
                    mediaBox: {
                        bottomLeftX: 0,
                        bottomLeftY: 0,
                        topRightX: Number(width),
                        topRightY: Number(height)
                    }
                };

                _setPage(page);
            };

            var _addPage = function _addPage() {
                beginPage.apply(this, arguments); // Set line width

                setLineWidth(lineWidth); // Set draw color

                out(strokeColor); // resurrecting non-default line caps, joins

                if (lineCapID !== 0) {
                    out(lineCapID + ' J');
                }

                if (lineJoinID !== 0) {
                    out(lineJoinID + ' j');
                }

                events.publish('addPage', {
                    pageNumber: page
                });
            };

            var _deletePage = function _deletePage(n) {
                if (n > 0 && n <= page) {
                    pages.splice(n, 1);
                    page--;

                    if (currentPage > page) {
                        currentPage = page;
                    }

                    this.setPage(currentPage);
                }
            };

            var _setPage = function _setPage(n) {
                if (n > 0 && n <= page) {
                    currentPage = n;
                }
            };

            var getNumberOfPages = API.__private__.getNumberOfPages = API.getNumberOfPages = function () {
                return pages.length - 1;
            };
            /**
             * Returns a document-specific font key - a label assigned to a
             * font name + font type combination at the time the font was added
             * to the font inventory.
             *
             * Font key is used as label for the desired font for a block of text
             * to be added to the PDF document stream.
             * @private
             * @function
             * @param fontName {string} can be undefined on "falthy" to indicate "use current"
             * @param fontStyle {string} can be undefined on "falthy" to indicate "use current"
             * @returns {string} Font key.
             * @ignore
             */


            var _getFont = function getFont(fontName, fontStyle, options) {
                var key = undefined,
                    fontNameLowerCase;
                options = options || {};
                fontName = fontName !== undefined ? fontName : fonts[activeFontKey].fontName;
                fontStyle = fontStyle !== undefined ? fontStyle : fonts[activeFontKey].fontStyle;
                fontNameLowerCase = fontName.toLowerCase();

                if (fontmap[fontNameLowerCase] !== undefined && fontmap[fontNameLowerCase][fontStyle] !== undefined) {
                    key = fontmap[fontNameLowerCase][fontStyle];
                } else if (fontmap[fontName] !== undefined && fontmap[fontName][fontStyle] !== undefined) {
                    key = fontmap[fontName][fontStyle];
                } else {
                    if (options.disableWarning === false) {
                        console.warn("Unable to look up font label for font '" + fontName + "', '" + fontStyle + "'. Refer to getFontList() for available fonts.");
                    }
                }

                if (!key && !options.noFallback) {
                    key = fontmap['times'][fontStyle];

                    if (key == null) {
                        key = fontmap['times']['normal'];
                    }
                }

                return key;
            };

            var putInfo = API.__private__.putInfo = function () {
                newObject();
                out('<<');
                out('/Producer (jsPDF ' + jsPDF.version + ')');

                for (var key in documentProperties) {
                    if (documentProperties.hasOwnProperty(key) && documentProperties[key]) {
                        out('/' + key.substr(0, 1).toUpperCase() + key.substr(1) + ' (' + pdfEscape(documentProperties[key]) + ')');
                    }
                }

                out('/CreationDate (' + creationDate + ')');
                out('>>');
                out('endobj');
            };

            var putCatalog = API.__private__.putCatalog = function (options) {
                options = options || {};
                var tmpRootDictionaryObjId = options.rootDictionaryObjId || rootDictionaryObjId;
                newObject();
                out('<<');
                out('/Type /Catalog');
                out('/Pages ' + tmpRootDictionaryObjId + ' 0 R'); // PDF13ref Section 7.2.1

                if (!zoomMode) zoomMode = 'fullwidth';

                switch (zoomMode) {
                    case 'fullwidth':
                        out('/OpenAction [3 0 R /FitH null]');
                        break;

                    case 'fullheight':
                        out('/OpenAction [3 0 R /FitV null]');
                        break;

                    case 'fullpage':
                        out('/OpenAction [3 0 R /Fit]');
                        break;

                    case 'original':
                        out('/OpenAction [3 0 R /XYZ null null 1]');
                        break;

                    default:
                        var pcn = '' + zoomMode;
                        if (pcn.substr(pcn.length - 1) === '%') zoomMode = parseInt(zoomMode) / 100;

                        if (typeof zoomMode === 'number') {
                            out('/OpenAction [3 0 R /XYZ null null ' + f2(zoomMode) + ']');
                        }

                }

                if (!layoutMode) layoutMode = 'continuous';

                switch (layoutMode) {
                    case 'continuous':
                        out('/PageLayout /OneColumn');
                        break;

                    case 'single':
                        out('/PageLayout /SinglePage');
                        break;

                    case 'two':
                    case 'twoleft':
                        out('/PageLayout /TwoColumnLeft');
                        break;

                    case 'tworight':
                        out('/PageLayout /TwoColumnRight');
                        break;
                }

                if (pageMode) {
                    /**
                     * A name object specifying how the document should be displayed when opened:
                     * UseNone      : Neither document outline nor thumbnail images visible -- DEFAULT
                     * UseOutlines  : Document outline visible
                     * UseThumbs    : Thumbnail images visible
                     * FullScreen   : Full-screen mode, with no menu bar, window controls, or any other window visible
                     */
                    out('/PageMode /' + pageMode);
                }

                events.publish('putCatalog');
                out('>>');
                out('endobj');
            };

            var putTrailer = API.__private__.putTrailer = function () {
                out('trailer');
                out('<<');
                out('/Size ' + (objectNumber + 1));
                out('/Root ' + objectNumber + ' 0 R');
                out('/Info ' + (objectNumber - 1) + ' 0 R');
                out("/ID [ <" + fileId + "> <" + fileId + "> ]");
                out('>>');
            };

            var putHeader = API.__private__.putHeader = function () {
                out('%PDF-' + pdfVersion);
                out("%\xBA\xDF\xAC\xE0");
            };

            var putXRef = API.__private__.putXRef = function () {
                var i = 1;
                var p = "0000000000";
                out('xref');
                out('0 ' + (objectNumber + 1));
                out('0000000000 65535 f ');

                for (i = 1; i <= objectNumber; i++) {
                    var offset = offsets[i];

                    if (typeof offset === 'function') {
                        out((p + offsets[i]()).slice(-10) + ' 00000 n ');
                    } else {
                        if (typeof offsets[i] !== "undefined") {
                            out((p + offsets[i]).slice(-10) + ' 00000 n ');
                        } else {
                            out('0000000000 00000 n ');
                        }
                    }
                }
            };

            var buildDocument = API.__private__.buildDocument = function () {
                outToPages = false; // switches out() to content
                //reset fields relevant for objectNumber generation and xref.

                objectNumber = 0;
                content_length = 0;
                content = [];
                offsets = [];
                additionalObjects = [];
                rootDictionaryObjId = newObjectDeferred();
                resourceDictionaryObjId = newObjectDeferred();
                events.publish('buildDocument');
                putHeader();
                putPages();
                putAdditionalObjects();
                putResources();
                putInfo();
                putCatalog();
                var offsetOfXRef = content_length;
                putXRef();
                putTrailer();
                out('startxref');
                out('' + offsetOfXRef);
                out('%%EOF');
                outToPages = true;
                return content.join('\n');
            };

            var getBlob = API.__private__.getBlob = function (data) {
                return new Blob([getArrayBuffer(data)], {
                    type: "application/pdf"
                });
            };
            /**
             * Generates the PDF document.
             *
             * If `type` argument is undefined, output is raw body of resulting PDF returned as a string.
             *
             * @param {string} type A string identifying one of the possible output types. Possible values are 'arraybuffer', 'blob', 'bloburi'/'bloburl', 'datauristring'/'dataurlstring', 'datauri'/'dataurl', 'dataurlnewwindow'.
             * @param {Object} options An object providing some additional signalling to PDF generator. Possible options are 'filename'.
             *
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name output
             */


            var output = API.output = API.__private__.output = SAFE(function output(type, options) {
                options = options || {};
                var pdfDocument = buildDocument();

                if (typeof options === "string") {
                    options = {
                        filename: options
                    };
                } else {
                    options.filename = options.filename || 'generated.pdf';
                }

                switch (type) {
                    case undefined:
                        return pdfDocument;

                    case 'save':
                        API.save(options.filename);
                        break;

                    case 'arraybuffer':
                        return getArrayBuffer(pdfDocument);

                    case 'blob':
                        return getBlob(pdfDocument);

                    case 'bloburi':
                    case 'bloburl':
                        // Developer is responsible of calling revokeObjectURL
                        if (typeof global.URL !== "undefined" && typeof global.URL.createObjectURL === "function") {
                            return global.URL && global.URL.createObjectURL(getBlob(pdfDocument)) || void 0;
                        } else {
                            console.warn('bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.');
                        }

                        break;

                    case 'datauristring':
                    case 'dataurlstring':
                        return 'data:application/pdf;filename=' + options.filename + ';base64,' + btoa(pdfDocument);

                    case 'dataurlnewwindow':
                        var htmlForNewWindow = '<html>' + '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' + '<body>' + '<iframe src="' + this.output('datauristring') + '"></iframe>' + '</body></html>';
                        var nW = global.open();

                        if (nW !== null) {
                            nW.document.write(htmlForNewWindow);
                        }

                        if (nW || typeof safari === "undefined") return nW;

                        /* pass through */

                    case 'datauri':
                    case 'dataurl':
                        return global.document.location.href = 'data:application/pdf;filename=' + options.filename + ';base64,' + btoa(pdfDocument);

                    default:
                        return null;
                }
            });
            /**
             * Used to see if a supplied hotfix was requested when the pdf instance was created.
             * @param {string} hotfixName - The name of the hotfix to check.
             * @returns {boolean}
             */

            var hasHotfix = function hasHotfix(hotfixName) {
                return Array.isArray(hotfixes) === true && hotfixes.indexOf(hotfixName) > -1;
            };

            switch (unit) {
                case 'pt':
                    k = 1;
                    break;

                case 'mm':
                    k = 72 / 25.4;
                    break;

                case 'cm':
                    k = 72 / 2.54;
                    break;

                case 'in':
                    k = 72;
                    break;

                case 'px':
                    if (hasHotfix('px_scaling') == true) {
                        k = 72 / 96;
                    } else {
                        k = 96 / 72;
                    }

                    break;

                case 'pc':
                    k = 12;
                    break;

                case 'em':
                    k = 12;
                    break;

                case 'ex':
                    k = 6;
                    break;

                default:
                    throw new Error('Invalid unit: ' + unit);
            }

            setCreationDate();
            setFileId(); //---------------------------------------
            // Public API

            var getPageInfo = API.__private__.getPageInfo = function (pageNumberOneBased) {
                if (isNaN(pageNumberOneBased) || pageNumberOneBased % 1 !== 0) {
                    throw new Error('Invalid argument passed to jsPDF.getPageInfo');
                }

                var objId = pagesContext[pageNumberOneBased].objId;
                return {
                    objId: objId,
                    pageNumber: pageNumberOneBased,
                    pageContext: pagesContext[pageNumberOneBased]
                };
            };

            var getPageInfoByObjId = API.__private__.getPageInfoByObjId = function (objId) {

                for (var pageNumber in pagesContext) {
                    if (pagesContext[pageNumber].objId === objId) {
                        break;
                    }
                }

                if (isNaN(objId) || objId % 1 !== 0) {
                    throw new Error('Invalid argument passed to jsPDF.getPageInfoByObjId');
                }

                return getPageInfo(pageNumber);
            };

            var getCurrentPageInfo = API.__private__.getCurrentPageInfo = function () {
                return {
                    objId: pagesContext[currentPage].objId,
                    pageNumber: currentPage,
                    pageContext: pagesContext[currentPage]
                };
            };
            /**
             * Adds (and transfers the focus to) new page to the PDF document.
             * @param format {String/Array} The format of the new page. Can be: <ul><li>a0 - a10</li><li>b0 - b10</li><li>c0 - c10</li><li>dl</li><li>letter</li><li>government-letter</li><li>legal</li><li>junior-legal</li><li>ledger</li><li>tabloid</li><li>credit-card</li></ul><br />
             * Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89]
             * @param orientation {string} Orientation of the new page. Possible values are "portrait" or "landscape" (or shortcuts "p" (Default), "l").
             * @function
             * @instance
             * @returns {jsPDF}
             *
             * @memberOf jsPDF
             * @name addPage
             */


            API.addPage = function () {
                _addPage.apply(this, arguments);

                return this;
            };
            /**
             * Adds (and transfers the focus to) new page to the PDF document.
             * @function
             * @instance
             * @returns {jsPDF}
             *
             * @memberOf jsPDF
             * @name setPage
             * @param {number} page Switch the active page to the page number specified.
             * @example
             * doc = jsPDF()
             * doc.addPage()
             * doc.addPage()
             * doc.text('I am on page 3', 10, 10)
             * doc.setPage(1)
             * doc.text('I am on page 1', 10, 10)
             */


            API.setPage = function () {
                _setPage.apply(this, arguments);

                return this;
            };
            /**
             * @name insertPage
             * @memberOf jsPDF
             * 
             * @function 
             * @instance
             * @param {Object} beforePage
             * @returns {jsPDF}
             */


            API.insertPage = function (beforePage) {
                this.addPage();
                this.movePage(currentPage, beforePage);
                return this;
            };
            /**
             * @name movePage
             * @memberOf jsPDF
             * @function
             * @instance
             * @param {Object} targetPage
             * @param {Object} beforePage
             * @returns {jsPDF}
             */


            API.movePage = function (targetPage, beforePage) {
                if (targetPage > beforePage) {
                    var tmpPages = pages[targetPage];
                    var tmpPagesContext = pagesContext[targetPage];

                    for (var i = targetPage; i > beforePage; i--) {
                        pages[i] = pages[i - 1];
                        pagesContext[i] = pagesContext[i - 1];
                    }

                    pages[beforePage] = tmpPages;
                    pagesContext[beforePage] = tmpPagesContext;
                    this.setPage(beforePage);
                } else if (targetPage < beforePage) {
                    var tmpPages = pages[targetPage];
                    var tmpPagesContext = pagesContext[targetPage];

                    for (var i = targetPage; i < beforePage; i++) {
                        pages[i] = pages[i + 1];
                        pagesContext[i] = pagesContext[i + 1];
                    }

                    pages[beforePage] = tmpPages;
                    pagesContext[beforePage] = tmpPagesContext;
                    this.setPage(beforePage);
                }

                return this;
            };
            /**
             * Deletes a page from the PDF.
             * @name deletePage
             * @memberOf jsPDF
             * @function
             * @instance
             * @returns {jsPDF}
             */


            API.deletePage = function () {
                _deletePage.apply(this, arguments);

                return this;
            };
            /**
             * Adds text to page. Supports adding multiline text when 'text' argument is an Array of Strings.
             *
             * @function
             * @instance
             * @param {String|Array} text String or array of strings to be added to the page. Each line is shifted one line down per font, spacing settings declared before this call.
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {Object} [options] - Collection of settings signaling how the text must be encoded.
             * @param {string} [options.align=left] - The alignment of the text, possible values: left, center, right, justify.
             * @param {string} [options.baseline=alphabetic] - Sets text baseline used when drawing the text, possible values: alphabetic, ideographic, bottom, top, middle.
             * @param {string} [options.angle=0] - Rotate the text counterclockwise. Expects the angle in degree.
             * @param {string} [options.charSpace=0] - The space between each letter.
             * @param {string} [options.lineHeightFactor=1.15] - The lineheight of each line.
             * @param {string} [options.flags] - Flags for to8bitStream.
             * @param {string} [options.flags.noBOM=true] - Don't add BOM to Unicode-text.
             * @param {string} [options.flags.autoencode=true] - Autoencode the Text.
             * @param {string} [options.maxWidth=0] - Split the text by given width, 0 = no split.
             * @param {string} [options.renderingMode=fill] - Set how the text should be rendered, possible values: fill, stroke, fillThenStroke, invisible, fillAndAddForClipping, strokeAndAddPathForClipping, fillThenStrokeAndAddToPathForClipping, addToPathForClipping.
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name text
             */


            var text = API.__private__.text = API.text = function (text, x, y, options) {
                /**
                 * Inserts something like this into PDF
                 *   BT
                 *    /F1 16 Tf  % Font name + size
                 *    16 TL % How many units down for next line in multiline text
                 *    0 g % color
                 *    28.35 813.54 Td % position
                 *    (line one) Tj
                 *    T* (line two) Tj
                 *    T* (line three) Tj
                 *   ET
                 */
                //backwardsCompatibility
                var tmp; // Pre-August-2012 the order of arguments was function(x, y, text, flags)
                // in effort to make all calls have similar signature like
                //   function(data, coordinates... , miscellaneous)
                // this method had its args flipped.
                // code below allows backward compatibility with old arg order.

                if (typeof text === 'number' && typeof x === 'number' && (typeof y === 'string' || Array.isArray(y))) {
                    tmp = y;
                    y = x;
                    x = text;
                    text = tmp;
                }

                var flags = arguments[3];
                var angle = arguments[4];
                var align = arguments[5];

                if (_typeof(flags) !== "object" || flags === null) {
                    if (typeof angle === 'string') {
                        align = angle;
                        angle = null;
                    }

                    if (typeof flags === 'string') {
                        align = flags;
                        flags = null;
                    }

                    if (typeof flags === 'number') {
                        angle = flags;
                        flags = null;
                    }

                    options = {
                        flags: flags,
                        angle: angle,
                        align: align
                    };
                }

                flags = flags || {};
                flags.noBOM = flags.noBOM || true;
                flags.autoencode = flags.autoencode || true;

                if (isNaN(x) || isNaN(y) || typeof text === "undefined" || text === null) {
                    throw new Error('Invalid arguments passed to jsPDF.text');
                }

                if (text.length === 0) {
                    return scope;
                }

                var xtra = '';
                var isHex = false;
                var lineHeight = typeof options.lineHeightFactor === 'number' ? options.lineHeightFactor : lineHeightFactor;
                var scope = options.scope || this;

                function ESC(s) {
                    s = s.split("\t").join(Array(options.TabLen || 9).join(" "));
                    return pdfEscape(s, flags);
                }

                function transformTextToSpecialArray(text) {
                    //we don't want to destroy original text array, so cloning it
                    var sa = text.concat();
                    var da = [];
                    var len = sa.length;
                    var curDa; //we do array.join('text that must not be PDFescaped")
                    //thus, pdfEscape each component separately

                    while (len--) {
                        curDa = sa.shift();

                        if (typeof curDa === "string") {
                            da.push(curDa);
                        } else {
                            if (Array.isArray(text) && curDa.length === 1) {
                                da.push(curDa[0]);
                            } else {
                                da.push([curDa[0], curDa[1], curDa[2]]);
                            }
                        }
                    }

                    return da;
                }

                function processTextByFunction(text, processingFunction) {
                    var result;

                    if (typeof text === 'string') {
                        result = processingFunction(text)[0];
                    } else if (Array.isArray(text)) {
                        //we don't want to destroy original text array, so cloning it
                        var sa = text.concat();
                        var da = [];
                        var len = sa.length;
                        var curDa;
                        var tmpResult; //we do array.join('text that must not be PDFescaped")
                        //thus, pdfEscape each component separately

                        while (len--) {
                            curDa = sa.shift();

                            if (typeof curDa === "string") {
                                da.push(processingFunction(curDa)[0]);
                            } else if (Array.isArray(curDa) && curDa[0] === "string") {
                                tmpResult = processingFunction(curDa[0], curDa[1], curDa[2]);
                                da.push([tmpResult[0], tmpResult[1], tmpResult[2]]);
                            }
                        }

                        result = da;
                    }

                    return result;
                } //Check if text is of type String


                var textIsOfTypeString = false;
                var tmpTextIsOfTypeString = true;

                if (typeof text === 'string') {
                    textIsOfTypeString = true;
                } else if (Array.isArray(text)) {
                    //we don't want to destroy original text array, so cloning it
                    var sa = text.concat();
                    var da = [];
                    var len = sa.length;
                    var curDa; //we do array.join('text that must not be PDFescaped")
                    //thus, pdfEscape each component separately

                    while (len--) {
                        curDa = sa.shift();

                        if (typeof curDa !== "string" || Array.isArray(curDa) && typeof curDa[0] !== "string") {
                            tmpTextIsOfTypeString = false;
                        }
                    }

                    textIsOfTypeString = tmpTextIsOfTypeString;
                }

                if (textIsOfTypeString === false) {
                    throw new Error('Type of text must be string or Array. "' + text + '" is not recognized.');
                } //Escaping 


                var activeFontEncoding = fonts[activeFontKey].encoding;

                if (activeFontEncoding === "WinAnsiEncoding" || activeFontEncoding === "StandardEncoding") {
                    text = processTextByFunction(text, function (text, posX, posY) {
                        return [ESC(text), posX, posY];
                    });
                } //If there are any newlines in text, we assume
                //the user wanted to print multiple lines, so break the
                //text up into an array. If the text is already an array,
                //we assume the user knows what they are doing.
                //Convert text into an array anyway to simplify
                //later code.


                if (typeof text === 'string') {
                    if (text.match(/[\r?\n]/)) {
                        text = text.split(/\r\n|\r|\n/g);
                    } else {
                        text = [text];
                    }
                } //baseline


                var height = activeFontSize / scope.internal.scaleFactor;
                var descent = height * (lineHeightFactor - 1);

                switch (options.baseline) {
                    case 'bottom':
                        y -= descent;
                        break;

                    case 'top':
                        y += height - descent;
                        break;

                    case 'hanging':
                        y += height - 2 * descent;
                        break;

                    case 'middle':
                        y += height / 2 - descent;
                        break;

                    case 'ideographic':
                    case 'alphabetic':
                    default:
                        // do nothing, everything is fine
                        break;
                } //multiline


                var maxWidth = options.maxWidth || 0;

                if (maxWidth > 0) {
                    if (typeof text === 'string') {
                        text = scope.splitTextToSize(text, maxWidth);
                    } else if (Object.prototype.toString.call(text) === '[object Array]') {
                        text = scope.splitTextToSize(text.join(" "), maxWidth);
                    }
                } //creating Payload-Object to make text byRef


                var payload = {
                    text: text,
                    x: x,
                    y: y,
                    options: options,
                    mutex: {
                        pdfEscape: pdfEscape,
                        activeFontKey: activeFontKey,
                        fonts: fonts,
                        activeFontSize: activeFontSize
                    }
                };
                events.publish('preProcessText', payload);
                text = payload.text;
                options = payload.options; //angle

                var angle = options.angle;
                var k = scope.internal.scaleFactor;
                var transformationMatrix = [];

                if (angle) {
                    angle *= Math.PI / 180;
                    var c = Math.cos(angle),
                        s = Math.sin(angle);
                    transformationMatrix = [f2(c), f2(s), f2(s * -1), f2(c)];
                } //charSpace


                var charSpace = options.charSpace;

                if (typeof charSpace !== 'undefined') {
                    xtra += f3(charSpace * k) + " Tc\n";
                } //lang


                var lang = options.lang;
                var tmpRenderingMode = -1;
                var parmRenderingMode = typeof options.renderingMode !== "undefined" ? options.renderingMode : options.stroke;
                var pageContext = scope.internal.getCurrentPageInfo().pageContext;

                switch (parmRenderingMode) {
                    case 0:
                    case false:
                    case 'fill':
                        tmpRenderingMode = 0;
                        break;

                    case 1:
                    case true:
                    case 'stroke':
                        tmpRenderingMode = 1;
                        break;

                    case 2:
                    case 'fillThenStroke':
                        tmpRenderingMode = 2;
                        break;

                    case 3:
                    case 'invisible':
                        tmpRenderingMode = 3;
                        break;

                    case 4:
                    case 'fillAndAddForClipping':
                        tmpRenderingMode = 4;
                        break;

                    case 5:
                    case 'strokeAndAddPathForClipping':
                        tmpRenderingMode = 5;
                        break;

                    case 6:
                    case 'fillThenStrokeAndAddToPathForClipping':
                        tmpRenderingMode = 6;
                        break;

                    case 7:
                    case 'addToPathForClipping':
                        tmpRenderingMode = 7;
                        break;
                }

                var usedRenderingMode = typeof pageContext.usedRenderingMode !== 'undefined' ? pageContext.usedRenderingMode : -1; //if the coder wrote it explicitly to use a specific 
                //renderingMode, then use it

                if (tmpRenderingMode !== -1) {
                    xtra += tmpRenderingMode + " Tr\n"; //otherwise check if we used the rendering Mode already
                    //if so then set the rendering Mode...
                } else if (usedRenderingMode !== -1) {
                    xtra += "0 Tr\n";
                }

                if (tmpRenderingMode !== -1) {
                    pageContext.usedRenderingMode = tmpRenderingMode;
                } //align


                var align = options.align || 'left';
                var leading = activeFontSize * lineHeight;
                var pageWidth = scope.internal.pageSize.getWidth();
                var k = scope.internal.scaleFactor;
                var activeFont = fonts[activeFontKey];
                var charSpace = options.charSpace || activeCharSpace;
                var maxWidth = options.maxWidth || 0;
                var lineWidths;
                var flags = {};
                var wordSpacingPerLine = [];

                if (Object.prototype.toString.call(text) === '[object Array]') {
                    var da = transformTextToSpecialArray(text);
                    var newY;
                    var maxLineLength;
                    var lineWidths;

                    if (align !== "left") {
                        lineWidths = da.map(function (v) {
                            return scope.getStringUnitWidth(v, {
                                font: activeFont,
                                charSpace: charSpace,
                                fontSize: activeFontSize
                            }) * activeFontSize / k;
                        });
                    }

                    var maxLineLength = Math.max.apply(Math, lineWidths); //The first line uses the "main" Td setting,
                    //and the subsequent lines are offset by the
                    //previous line's x coordinate.

                    var prevWidth = 0;
                    var delta;
                    var newX;

                    if (align === "right") {
                        x -= lineWidths[0];
                        text = [];

                        for (var i = 0, len = da.length; i < len; i++) {
                            delta = maxLineLength - lineWidths[i];

                            if (i === 0) {
                                newX = getHorizontalCoordinate(x);
                                newY = getVerticalCoordinate(y);
                            } else {
                                newX = (prevWidth - lineWidths[i]) * k;
                                newY = -leading;
                            }

                            text.push([da[i], newX, newY]);
                            prevWidth = lineWidths[i];
                        }
                    } else if (align === "center") {
                        x -= lineWidths[0] / 2;
                        text = [];

                        for (var i = 0, len = da.length; i < len; i++) {
                            delta = (maxLineLength - lineWidths[i]) / 2;

                            if (i === 0) {
                                newX = getHorizontalCoordinate(x);
                                newY = getVerticalCoordinate(y);
                            } else {
                                newX = (prevWidth - lineWidths[i]) / 2 * k;
                                newY = -leading;
                            }

                            text.push([da[i], newX, newY]);
                            prevWidth = lineWidths[i];
                        }
                    } else if (align === "left") {
                        text = [];

                        for (var i = 0, len = da.length; i < len; i++) {
                            newY = i === 0 ? getVerticalCoordinate(y) : -leading;
                            newX = i === 0 ? getHorizontalCoordinate(x) : 0; //text.push([da[i], newX, newY]);

                            text.push(da[i]);
                        }
                    } else if (align === "justify") {
                        text = [];
                        var maxWidth = maxWidth !== 0 ? maxWidth : pageWidth;

                        for (var i = 0, len = da.length; i < len; i++) {
                            newY = i === 0 ? getVerticalCoordinate(y) : -leading;
                            newX = i === 0 ? getHorizontalCoordinate(x) : 0;

                            if (i < len - 1) {
                                wordSpacingPerLine.push(((maxWidth - lineWidths[i]) / (da[i].split(" ").length - 1) * k).toFixed(2));
                            }

                            text.push([da[i], newX, newY]);
                        }
                    } else {
                        throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
                    }
                } //R2L


                var doReversing = typeof options.R2L === "boolean" ? options.R2L : R2L;

                if (doReversing === true) {
                    text = processTextByFunction(text, function (text, posX, posY) {
                        return [text.split("").reverse().join(""), posX, posY];
                    });
                } //creating Payload-Object to make text byRef


                var payload = {
                    text: text,
                    x: x,
                    y: y,
                    options: options,
                    mutex: {
                        pdfEscape: pdfEscape,
                        activeFontKey: activeFontKey,
                        fonts: fonts,
                        activeFontSize: activeFontSize
                    }
                };
                events.publish('postProcessText', payload);
                text = payload.text;
                isHex = payload.mutex.isHex;
                var da = transformTextToSpecialArray(text);
                text = [];
                var variant = 0;
                var len = da.length;
                var posX;
                var posY;
                var content;
                var wordSpacing = '';

                for (var i = 0; i < len; i++) {
                    wordSpacing = '';

                    if (!Array.isArray(da[i])) {
                        posX = getHorizontalCoordinate(x);
                        posY = getVerticalCoordinate(y);
                        content = (isHex ? "<" : "(") + da[i] + (isHex ? ">" : ")");
                    } else {
                        posX = parseFloat(da[i][1]);
                        posY = parseFloat(da[i][2]);
                        content = (isHex ? "<" : "(") + da[i][0] + (isHex ? ">" : ")");
                        variant = 1;
                    }

                    if (wordSpacingPerLine !== undefined && wordSpacingPerLine[i] !== undefined) {
                        wordSpacing = wordSpacingPerLine[i] + " Tw\n";
                    }

                    if (transformationMatrix.length !== 0 && i === 0) {
                        text.push(wordSpacing + transformationMatrix.join(" ") + " " + posX.toFixed(2) + " " + posY.toFixed(2) + " Tm\n" + content);
                    } else if (variant === 1 || variant === 0 && i === 0) {
                        text.push(wordSpacing + posX.toFixed(2) + " " + posY.toFixed(2) + " Td\n" + content);
                    } else {
                        text.push(wordSpacing + content);
                    }
                }

                if (variant === 0) {
                    text = text.join(" Tj\nT* ");
                } else {
                    text = text.join(" Tj\n");
                }

                text += " Tj\n";
                var result = 'BT\n/' + activeFontKey + ' ' + activeFontSize + ' Tf\n' + // font face, style, size
                    (activeFontSize * lineHeight).toFixed(2) + ' TL\n' + // line spacing
                    textColor + '\n';
                result += xtra;
                result += text;
                result += "ET";
                out(result);
                usedFonts[activeFontKey] = true;
                return scope;
            };
            /**
             * Letter spacing method to print text with gaps
             *
             * @function
             * @instance
             * @param {String|Array} text String to be added to the page.
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
             * @param {number} spacing Spacing (in units declared at inception)
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name lstext
             * @deprecated We'll be removing this function. It doesn't take character width into account.
             */


            var lstext = API.__private__.lstext = API.lstext = function (text, x, y, charSpace) {
                console.warn('jsPDF.lstext is deprecated');
                return this.text(text, x, y, {
                    charSpace: charSpace
                });
            };
            /**
             * 
             * @name clip
             * @function
             * @instance
             * @param {string} rule 
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @description All .clip() after calling drawing ops with a style argument of null.
             */


            var clip = API.__private__.clip = API.clip = function (rule) {
                // Call .clip() after calling drawing ops with a style argument of null
                // W is the PDF clipping op
                if ('evenodd' === rule) {
                    out('W*');
                } else {
                    out('W');
                } // End the path object without filling or stroking it.
                // This operator is a path-painting no-op, used primarily for the side effect of changing the current clipping path
                // (see Section 4.4.3, “Clipping Path Operators”)


                out('n');
            };
            /**
             * This fixes the previous function clip(). Perhaps the 'stroke path' hack was due to the missing 'n' instruction?
             * We introduce the fixed version so as to not break API.
             * @param fillRule
             * @ignore
             */


            var clip_fixed = API.__private__.clip_fixed = API.clip_fixed = function (rule) {
                console.log("clip_fixed is deprecated");
                API.clip(rule);
            };

            var isValidStyle = API.__private__.isValidStyle = function (style) {
                var validStyleVariants = [undefined, null, 'S', 'F', 'DF', 'FD', 'f', 'f*', 'B', 'B*'];
                var result = false;

                if (validStyleVariants.indexOf(style) !== -1) {
                    result = true;
                }

                return result;
            };

            var getStyle = API.__private__.getStyle = function (style) {
                // see path-painting operators in PDF spec
                var op = 'S'; // stroke

                if (style === 'F') {
                    op = 'f'; // fill
                } else if (style === 'FD' || style === 'DF') {
                    op = 'B'; // both
                } else if (style === 'f' || style === 'f*' || style === 'B' || style === 'B*') {
                    /*
                     Allow direct use of these PDF path-painting operators:
                     - f    fill using nonzero winding number rule
                     - f*    fill using even-odd rule
                     - B    fill then stroke with fill using non-zero winding number rule
                     - B*    fill then stroke with fill using even-odd rule
                     */
                    op = style;
                }

                return op;
            };
            /**
             * Draw a line on the current page.
             *
             * @name line
             * @function 
             * @instance
             * @param {number} x1
             * @param {number} y1
             * @param {number} x2
             * @param {number} y2
             * @returns {jsPDF}
             * @memberOf jsPDF
             */


            var line = API.__private__.line = API.line = function (x1, y1, x2, y2) {
                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                    throw new Error('Invalid arguments passed to jsPDF.line');
                }

                return this.lines([
                    [x2 - x1, y2 - y1]
                ], x1, y1);
            };
            /**
             * Adds series of curves (straight lines or cubic bezier curves) to canvas, starting at `x`, `y` coordinates.
             * All data points in `lines` are relative to last line origin.
             * `x`, `y` become x1,y1 for first line / curve in the set.
             * For lines you only need to specify [x2, y2] - (ending point) vector against x1, y1 starting point.
             * For bezier curves you need to specify [x2,y2,x3,y3,x4,y4] - vectors to control points 1, 2, ending point. All vectors are against the start of the curve - x1,y1.
             *
             * @example .lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, [1,1], 'F', false) // line, line, bezier curve, line
             * @param {Array} lines Array of *vector* shifts as pairs (lines) or sextets (cubic bezier curves).
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} scale (Defaults to [1.0,1.0]) x,y Scaling factor for all vectors. Elements can be any floating number Sub-one makes drawing smaller. Over-one grows the drawing. Negative flips the direction.
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @param {boolean} closed If true, the path is closed with a straight line from the end of the last curve to the starting point.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name lines
             */


            var lines = API.__private__.lines = API.lines = function (lines, x, y, scale, style, closed) {
                var scalex, scaley, i, l, leg, x2, y2, x3, y3, x4, y4, tmp; // Pre-August-2012 the order of arguments was function(x, y, lines, scale, style)
                // in effort to make all calls have similar signature like
                //   function(content, coordinateX, coordinateY , miscellaneous)
                // this method had its args flipped.
                // code below allows backward compatibility with old arg order.

                if (typeof lines === 'number') {
                    tmp = y;
                    y = x;
                    x = lines;
                    lines = tmp;
                }

                scale = scale || [1, 1];
                closed = closed || false;

                if (isNaN(x) || isNaN(y) || !Array.isArray(lines) || !Array.isArray(scale) || !isValidStyle(style) || typeof closed !== 'boolean') {
                    throw new Error('Invalid arguments passed to jsPDF.lines');
                } // starting point


                out(f3(getHorizontalCoordinate(x)) + ' ' + f3(getVerticalCoordinate(y)) + ' m ');
                scalex = scale[0];
                scaley = scale[1];
                l = lines.length; //, x2, y2 // bezier only. In page default measurement "units", *after* scaling
                //, x3, y3 // bezier only. In page default measurement "units", *after* scaling
                // ending point for all, lines and bezier. . In page default measurement "units", *after* scaling

                x4 = x; // last / ending point = starting point for first item.

                y4 = y; // last / ending point = starting point for first item.

                for (i = 0; i < l; i++) {
                    leg = lines[i];

                    if (leg.length === 2) {
                        // simple line
                        x4 = leg[0] * scalex + x4; // here last x4 was prior ending point

                        y4 = leg[1] * scaley + y4; // here last y4 was prior ending point

                        out(f3(getHorizontalCoordinate(x4)) + ' ' + f3(getVerticalCoordinate(y4)) + ' l');
                    } else {
                        // bezier curve
                        x2 = leg[0] * scalex + x4; // here last x4 is prior ending point

                        y2 = leg[1] * scaley + y4; // here last y4 is prior ending point

                        x3 = leg[2] * scalex + x4; // here last x4 is prior ending point

                        y3 = leg[3] * scaley + y4; // here last y4 is prior ending point

                        x4 = leg[4] * scalex + x4; // here last x4 was prior ending point

                        y4 = leg[5] * scaley + y4; // here last y4 was prior ending point

                        out(f3(getHorizontalCoordinate(x2)) + ' ' + f3(getVerticalCoordinate(y2)) + ' ' + f3(getHorizontalCoordinate(x3)) + ' ' + f3(getVerticalCoordinate(y3)) + ' ' + f3(getHorizontalCoordinate(x4)) + ' ' + f3(getVerticalCoordinate(y4)) + ' c');
                    }
                }

                if (closed) {
                    out(' h');
                } // stroking / filling / both the path


                if (style !== null) {
                    out(getStyle(style));
                }

                return this;
            };
            /**
             * Adds a rectangle to PDF.
             *
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} w Width (in units declared at inception of PDF document).
             * @param {number} h Height (in units declared at inception of PDF document).
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name rect
             */


            var rect = API.__private__.rect = API.rect = function (x, y, w, h, style) {
                if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || !isValidStyle(style)) {
                    throw new Error('Invalid arguments passed to jsPDF.rect');
                }

                out([f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y)), f2(w * k), f2(-h * k), 're'].join(' '));

                if (style !== null) {
                    out(getStyle(style));
                }

                return this;
            };
            /**
             * Adds a triangle to PDF.
             *
             * @param {number} x1 Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y1 Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} x2 Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y2 Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} x3 Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y3 Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name triangle
             */


            var triangle = API.__private__.triangle = API.triangle = function (x1, y1, x2, y2, x3, y3, style) {
                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || !isValidStyle(style)) {
                    throw new Error('Invalid arguments passed to jsPDF.triangle');
                }

                this.lines([
                        [x2 - x1, y2 - y1], // vector to point 2
                        [x3 - x2, y3 - y2], // vector to point 3
                        [x1 - x3, y1 - y3] // closing vector back to point 1
                    ], x1, y1, // start of path
                    [1, 1], style, true);
                return this;
            };
            /**
             * Adds a rectangle with rounded corners to PDF.
             *
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} w Width (in units declared at inception of PDF document).
             * @param {number} h Height (in units declared at inception of PDF document).
             * @param {number} rx Radius along x axis (in units declared at inception of PDF document).
             * @param {number} ry Radius along y axis (in units declared at inception of PDF document).
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name roundedRect
             */


            var roundedRect = API.__private__.roundedRect = API.roundedRect = function (x, y, w, h, rx, ry, style) {
                if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || isNaN(rx) || isNaN(ry) || !isValidStyle(style)) {
                    throw new Error('Invalid arguments passed to jsPDF.roundedRect');
                }

                var MyArc = 4 / 3 * (Math.SQRT2 - 1);
                this.lines([
                        [w - 2 * rx, 0],
                        [rx * MyArc, 0, rx, ry - ry * MyArc, rx, ry],
                        [0, h - 2 * ry],
                        [0, ry * MyArc, -(rx * MyArc), ry, -rx, ry],
                        [-w + 2 * rx, 0],
                        [-(rx * MyArc), 0, -rx, -(ry * MyArc), -rx, -ry],
                        [0, -h + 2 * ry],
                        [0, -(ry * MyArc), rx * MyArc, -ry, rx, -ry]
                    ], x + rx, y, // start of path
                    [1, 1], style);
                return this;
            };
            /**
             * Adds an ellipse to PDF.
             *
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} rx Radius along x axis (in units declared at inception of PDF document).
             * @param {number} ry Radius along y axis (in units declared at inception of PDF document).
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name ellipse
             */


            var ellise = API.__private__.ellipse = API.ellipse = function (x, y, rx, ry, style) {
                if (isNaN(x) || isNaN(y) || isNaN(rx) || isNaN(ry) || !isValidStyle(style)) {
                    throw new Error('Invalid arguments passed to jsPDF.ellipse');
                }

                var lx = 4 / 3 * (Math.SQRT2 - 1) * rx,
                    ly = 4 / 3 * (Math.SQRT2 - 1) * ry;
                out([f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y)), 'm', f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y - ly)), f2(getHorizontalCoordinate(x + lx)), f2(getVerticalCoordinate(y - ry)), f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y - ry)), 'c'].join(' '));
                out([f2(getHorizontalCoordinate(x - lx)), f2(getVerticalCoordinate(y - ry)), f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y - ly)), f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y)), 'c'].join(' '));
                out([f2(getHorizontalCoordinate(x - rx)), f2(getVerticalCoordinate(y + ly)), f2(getHorizontalCoordinate(x - lx)), f2(getVerticalCoordinate(y + ry)), f2(getHorizontalCoordinate(x)), f2(getVerticalCoordinate(y + ry)), 'c'].join(' '));
                out([f2(getHorizontalCoordinate(x + lx)), f2(getVerticalCoordinate(y + ry)), f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y + ly)), f2(getHorizontalCoordinate(x + rx)), f2(getVerticalCoordinate(y)), 'c'].join(' '));

                if (style !== null) {
                    out(getStyle(style));
                }

                return this;
            };
            /**
             * Adds an circle to PDF.
             *
             * @param {number} x Coordinate (in units declared at inception of PDF document) against left edge of the page.
             * @param {number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page.
             * @param {number} r Radius (in units declared at inception of PDF document).
             * @param {string} style A string specifying the painting style or null.  Valid styles include: 'S' [default] - stroke, 'F' - fill,  and 'DF' (or 'FD') -  fill then stroke. A null value postpones setting the style so that a shape may be composed using multiple method calls. The last drawing method call used to define the shape should not have a null style argument.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name circle
             */


            var circle = API.__private__.circle = API.circle = function (x, y, r, style) {
                if (isNaN(x) || isNaN(y) || isNaN(r) || !isValidStyle(style)) {
                    throw new Error('Invalid arguments passed to jsPDF.circle');
                }

                return this.ellipse(x, y, r, r, style);
            };
            /**
             * Sets text font face, variant for upcoming text elements.
             * See output of jsPDF.getFontList() for possible font names, styles.
             *
             * @param {string} fontName Font name or family. Example: "times".
             * @param {string} fontStyle Font style or variant. Example: "italic".
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setFont
             */


            API.setFont = function (fontName, fontStyle) {
                activeFontKey = _getFont(fontName, fontStyle, {
                    disableWarning: false
                });
                return this;
            };
            /**
             * Switches font style or variant for upcoming text elements,
             * while keeping the font face or family same.
             * See output of jsPDF.getFontList() for possible font names, styles.
             *
             * @param {string} style Font style or variant. Example: "italic".
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setFontStyle
             */


            API.setFontStyle = API.setFontType = function (style) {
                activeFontKey = _getFont(undefined, style); // if font is not found, the above line blows up and we never go further

                return this;
            };
            /**
             * Returns an object - a tree of fontName to fontStyle relationships available to
             * active PDF document.
             *
             * @public
             * @function
             * @instance
             * @returns {Object} Like {'times':['normal', 'italic', ... ], 'arial':['normal', 'bold', ... ], ... }
             * @memberOf jsPDF
             * @name getFontList
             */


            var getFontList = API.__private__.getFontList = API.getFontList = function () {
                // TODO: iterate over fonts array or return copy of fontmap instead in case more are ever added.
                var list = {},
                    fontName,
                    fontStyle,
                    tmp;

                for (fontName in fontmap) {
                    if (fontmap.hasOwnProperty(fontName)) {
                        list[fontName] = tmp = [];

                        for (fontStyle in fontmap[fontName]) {
                            if (fontmap[fontName].hasOwnProperty(fontStyle)) {
                                tmp.push(fontStyle);
                            }
                        }
                    }
                }

                return list;
            };
            /**
             * Add a custom font to the current instance.
             *
             * @property {string} postScriptName PDF specification full name for the font.
             * @property {string} id PDF-document-instance-specific label assinged to the font.
             * @property {string} fontStyle Style of the Font.
             * @property {Object} encoding Encoding_name-to-Font_metrics_object mapping.
             * @function
             * @instance
             * @memberOf jsPDF
             * @name addFont
             */


            API.addFont = function (postScriptName, fontName, fontStyle, encoding) {
                encoding = encoding || 'Identity-H';
                addFont.call(this, postScriptName, fontName, fontStyle, encoding);
            };

            var lineWidth = options.lineWidth || 0.200025; // 2mm

            /**
             * Sets line width for upcoming lines.
             *
             * @param {number} width Line width (in units declared at inception of PDF document).
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setLineWidth
             */

            var setLineWidth = API.__private__.setLineWidth = API.setLineWidth = function (width) {
                out((width * k).toFixed(2) + ' w');
                return this;
            };
            /**
             * Sets the dash pattern for upcoming lines.
             * 
             * To reset the settings simply call the method without any parameters.
             * @param {array} dashArray The pattern of the line, expects numbers. 
             * @param {number} dashPhase The phase at which the dash pattern starts.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setLineDash
             */


            var setLineDash = API.__private__.setLineDash = jsPDF.API.setLineDash = function (dashArray, dashPhase) {
                dashArray = dashArray || [];
                dashPhase = dashPhase || 0;

                if (isNaN(dashPhase) || !Array.isArray(dashArray)) {
                    throw new Error('Invalid arguments passed to jsPDF.setLineDash');
                }

                dashArray = dashArray.map(function (x) {
                    return (x * k).toFixed(3);
                }).join(' ');
                dashPhase = parseFloat((dashPhase * k).toFixed(3));
                out('[' + dashArray + '] ' + dashPhase + ' d');
                return this;
            };

            var lineHeightFactor;

            var getLineHeight = API.__private__.getLineHeight = API.getLineHeight = function () {
                return activeFontSize * lineHeightFactor;
            };

            var lineHeightFactor;

            var getLineHeight = API.__private__.getLineHeight = API.getLineHeight = function () {
                return activeFontSize * lineHeightFactor;
            };
            /**
             * Sets the LineHeightFactor of proportion.
             *
             * @param {number} value LineHeightFactor value. Default: 1.15.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setLineHeightFactor
             */


            var setLineHeightFactor = API.__private__.setLineHeightFactor = API.setLineHeightFactor = function (value) {
                value = value || 1.15;

                if (typeof value === "number") {
                    lineHeightFactor = value;
                }

                return this;
            };
            /**
             * Gets the LineHeightFactor, default: 1.15.
             *
             * @function
             * @instance
             * @returns {number} lineHeightFactor
             * @memberOf jsPDF
             * @name getLineHeightFactor
             */


            var getLineHeightFactor = API.__private__.getLineHeightFactor = API.getLineHeightFactor = function () {
                return lineHeightFactor;
            };

            setLineHeightFactor(options.lineHeight);

            var getHorizontalCoordinate = API.__private__.getHorizontalCoordinate = function (value) {
                return value * k;
            };

            var getVerticalCoordinate = API.__private__.getVerticalCoordinate = function (value) {
                return pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY - value * k;
            };

            var getHorizontalCoordinateString = API.__private__.getHorizontalCoordinateString = function (value) {
                return f2(value * k);
            };

            var getVerticalCoordinateString = API.__private__.getVerticalCoordinateString = function (value) {
                return f2(pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY - value * k);
            };

            var strokeColor = options.strokeColor || '0 G';
            /**
             *  Gets the stroke color for upcoming elements.
             *
             * @function
             * @instance
             * @returns {string} colorAsHex
             * @memberOf jsPDF
             * @name getDrawColor
             */

            var getStrokeColor = API.__private__.getStrokeColor = API.getDrawColor = function () {
                return decodeColorString(strokeColor);
            };
            /**
             * Sets the stroke color for upcoming elements.
             *
             * Depending on the number of arguments given, Gray, RGB, or CMYK
             * color space is implied.
             *
             * When only ch1 is given, "Gray" color space is implied and it
             * must be a value in the range from 0.00 (solid black) to to 1.00 (white)
             * if values are communicated as String types, or in range from 0 (black)
             * to 255 (white) if communicated as Number type.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When only ch1,ch2,ch3 are given, "RGB" color space is implied and each
             * value must be in the range from 0.00 (minimum intensity) to to 1.00
             * (max intensity) if values are communicated as String types, or
             * from 0 (min intensity) to to 255 (max intensity) if values are communicated
             * as Number types.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When ch1,ch2,ch3,ch4 are given, "CMYK" color space is implied and each
             * value must be a in the range from 0.00 (0% concentration) to to
             * 1.00 (100% concentration)
             *
             * Because JavaScript treats fixed point numbers badly (rounds to
             * floating point nearest to binary representation) it is highly advised to
             * communicate the fractional numbers as String types, not JavaScript Number type.
             *
             * @param {Number|String} ch1 Color channel value or {string} ch1 color value in hexadecimal, example: '#FFFFFF'.
             * @param {Number|String} ch2 Color channel value.
             * @param {Number|String} ch3 Color channel value.
             * @param {Number|String} ch4 Color channel value.
             *
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setDrawColor
             */


            var setStrokeColor = API.__private__.setStrokeColor = API.setDrawColor = function (ch1, ch2, ch3, ch4) {
                var options = {
                    "ch1": ch1,
                    "ch2": ch2,
                    "ch3": ch3,
                    "ch4": ch4,
                    "pdfColorType": "draw",
                    "precision": 2
                };
                strokeColor = encodeColorString(options);
                out(strokeColor);
                return this;
            };

            var fillColor = options.fillColor || '0 g';
            /**
             * Gets the fill color for upcoming elements.
             *
             * @function
             * @instance
             * @returns {string} colorAsHex
             * @memberOf jsPDF
             * @name getFillColor
             */

            var getFillColor = API.__private__.getFillColor = API.getFillColor = function () {
                return decodeColorString(fillColor);
            };
            /**
             * Sets the fill color for upcoming elements.
             *
             * Depending on the number of arguments given, Gray, RGB, or CMYK
             * color space is implied.
             *
             * When only ch1 is given, "Gray" color space is implied and it
             * must be a value in the range from 0.00 (solid black) to to 1.00 (white)
             * if values are communicated as String types, or in range from 0 (black)
             * to 255 (white) if communicated as Number type.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When only ch1,ch2,ch3 are given, "RGB" color space is implied and each
             * value must be in the range from 0.00 (minimum intensity) to to 1.00
             * (max intensity) if values are communicated as String types, or
             * from 0 (min intensity) to to 255 (max intensity) if values are communicated
             * as Number types.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When ch1,ch2,ch3,ch4 are given, "CMYK" color space is implied and each
             * value must be a in the range from 0.00 (0% concentration) to to
             * 1.00 (100% concentration)
             *
             * Because JavaScript treats fixed point numbers badly (rounds to
             * floating point nearest to binary representation) it is highly advised to
             * communicate the fractional numbers as String types, not JavaScript Number type.
             *
             * @param {Number|String} ch1 Color channel value or {string} ch1 color value in hexadecimal, example: '#FFFFFF'.
             * @param {Number|String} ch2 Color channel value.
             * @param {Number|String} ch3 Color channel value.
             * @param {Number|String} ch4 Color channel value.
             *
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setFillColor
             */


            var setFillColor = API.__private__.setFillColor = API.setFillColor = function (ch1, ch2, ch3, ch4) {
                var options = {
                    "ch1": ch1,
                    "ch2": ch2,
                    "ch3": ch3,
                    "ch4": ch4,
                    "pdfColorType": "fill",
                    "precision": 2
                };
                fillColor = encodeColorString(options);
                out(fillColor);
                return this;
            };

            var textColor = options.textColor || '0 g';
            /**
             * Gets the text color for upcoming elements.
             *
             * @function
             * @instance
             * @returns {string} colorAsHex
             * @memberOf jsPDF
             * @name getTextColor
             */

            var getTextColor = API.__private__.getTextColor = API.getTextColor = function () {
                return decodeColorString(textColor);
            };
            /**
             * Sets the text color for upcoming elements.
             *
             * Depending on the number of arguments given, Gray, RGB, or CMYK
             * color space is implied.
             *
             * When only ch1 is given, "Gray" color space is implied and it
             * must be a value in the range from 0.00 (solid black) to to 1.00 (white)
             * if values are communicated as String types, or in range from 0 (black)
             * to 255 (white) if communicated as Number type.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When only ch1,ch2,ch3 are given, "RGB" color space is implied and each
             * value must be in the range from 0.00 (minimum intensity) to to 1.00
             * (max intensity) if values are communicated as String types, or
             * from 0 (min intensity) to to 255 (max intensity) if values are communicated
             * as Number types.
             * The RGB-like 0-255 range is provided for backward compatibility.
             *
             * When ch1,ch2,ch3,ch4 are given, "CMYK" color space is implied and each
             * value must be a in the range from 0.00 (0% concentration) to to
             * 1.00 (100% concentration)
             *
             * Because JavaScript treats fixed point numbers badly (rounds to
             * floating point nearest to binary representation) it is highly advised to
             * communicate the fractional numbers as String types, not JavaScript Number type.
             *
             * @param {Number|String} ch1 Color channel value or {string} ch1 color value in hexadecimal, example: '#FFFFFF'.
             * @param {Number|String} ch2 Color channel value.
             * @param {Number|String} ch3 Color channel value.
             * @param {Number|String} ch4 Color channel value.
             *
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setTextColor
             */


            var setTextColor = API.__private__.setTextColor = API.setTextColor = function (ch1, ch2, ch3, ch4) {
                var options = {
                    "ch1": ch1,
                    "ch2": ch2,
                    "ch3": ch3,
                    "ch4": ch4,
                    "pdfColorType": "text",
                    "precision": 3
                };
                textColor = encodeColorString(options);
                return this;
            };

            var activeCharSpace = options.charSpace || 0;
            /**
             * Get global value of CharSpace.
             *
             * @function
             * @instance
             * @returns {number} charSpace
             * @memberOf jsPDF
             * @name getCharSpace
             */

            var getCharSpace = API.__private__.getCharSpace = API.getCharSpace = function () {
                return activeCharSpace;
            };
            /**
             * Set global value of CharSpace.
             *
             * @param {number} charSpace
             * @function
             * @instance
             * @returns {jsPDF} jsPDF-instance
             * @memberOf jsPDF
             * @name setCharSpace
             */


            var setCharSpace = API.__private__.setCharSpace = API.setCharSpace = function (charSpace) {
                if (isNaN(charSpace)) {
                    throw new Error('Invalid argument passed to jsPDF.setCharSpace');
                }

                activeCharSpace = charSpace;
                return this;
            };

            var lineCapID = 0;
            /**
             * Is an Object providing a mapping from human-readable to
             * integer flag values designating the varieties of line cap
             * and join styles.
             *
             * @memberOf jsPDF
             * @name CapJoinStyles
             */

            API.CapJoinStyles = {
                0: 0,
                'butt': 0,
                'but': 0,
                'miter': 0,
                1: 1,
                'round': 1,
                'rounded': 1,
                'circle': 1,
                2: 2,
                'projecting': 2,
                'project': 2,
                'square': 2,
                'bevel': 2
            };
            /**
             * Sets the line cap styles.
             * See {jsPDF.CapJoinStyles} for variants.
             *
             * @param {String|Number} style A string or number identifying the type of line cap.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setLineCap
             */

            var setLineCap = API.__private__.setLineCap = API.setLineCap = function (style) {
                var id = API.CapJoinStyles[style];

                if (id === undefined) {
                    throw new Error("Line cap style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
                }

                lineCapID = id;
                out(id + ' J');
                return this;
            };

            var lineJoinID = 0;
            /**
             * Sets the line join styles.
             * See {jsPDF.CapJoinStyles} for variants.
             *
             * @param {String|Number} style A string or number identifying the type of line join.
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setLineJoin
             */

            var setLineJoin = API.__private__.setLineJoin = API.setLineJoin = function (style) {
                var id = API.CapJoinStyles[style];

                if (id === undefined) {
                    throw new Error("Line join style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
                }

                lineJoinID = id;
                out(id + ' j');
                return this;
            };

            var miterLimit;
            /**
             * Sets the miterLimit property, which effects the maximum miter length.
             *
             * @param {number} length The length of the miter
             * @function
             * @instance
             * @returns {jsPDF}
             * @memberOf jsPDF
             * @name setMiterLimit
             */

            var setMiterLimit = API.__private__.setMiterLimit = API.setMiterLimit = function (length) {
                length = length || 0;

                if (isNaN(length)) {
                    throw new Error('Invalid argument passed to jsPDF.setMiterLimit');
                }

                miterLimit = parseFloat(f2(length * k));
                out(miterLimit + ' M');
                return this;
            };
            /**
             * Saves as PDF document. An alias of jsPDF.output('save', 'filename.pdf').
             * Uses FileSaver.js-method saveAs.
             *
             * @memberOf jsPDF
             * @name save
             * @function
             * @instance
             * @param  {string} filename The filename including extension.
             * @param  {Object} options An Object with additional options, possible options: 'returnPromise'.
             * @returns {jsPDF} jsPDF-instance
             */


            API.save = function (filename, options) {
                filename = filename || 'generated.pdf';
                options = options || {};
                options.returnPromise = options.returnPromise || false;

                if (options.returnPromise === false) {
                    saveAs(getBlob(buildDocument()), filename);

                    if (typeof saveAs.unload === 'function') {
                        if (global.setTimeout) {
                            setTimeout(saveAs.unload, 911);
                        }
                    }
                } else {
                    return new Promise(function (resolve, reject) {
                        try {
                            var result = saveAs(getBlob(buildDocument()), filename);

                            if (typeof saveAs.unload === 'function') {
                                if (global.setTimeout) {
                                    setTimeout(saveAs.unload, 911);
                                }
                            }

                            resolve(result);
                        } catch (e) {
                            reject(e.message);
                        }
                    });
                }
            }; // applying plugins (more methods) ON TOP of built-in API.
            // this is intentional as we allow plugins to override
            // built-ins


            for (var plugin in jsPDF.API) {
                if (jsPDF.API.hasOwnProperty(plugin)) {
                    if (plugin === 'events' && jsPDF.API.events.length) {
                        (function (events, newEvents) {
                            // jsPDF.API.events is a JS Array of Arrays
                            // where each Array is a pair of event name, handler
                            // Events were added by plugins to the jsPDF instantiator.
                            // These are always added to the new instance and some ran
                            // during instantiation.
                            var eventname, handler_and_args, i;

                            for (i = newEvents.length - 1; i !== -1; i--) {
                                // subscribe takes 3 args: 'topic', function, runonce_flag
                                // if undefined, runonce is false.
                                // users can attach callback directly,
                                // or they can attach an array with [callback, runonce_flag]
                                // that's what the "apply" magic is for below.
                                eventname = newEvents[i][0];
                                handler_and_args = newEvents[i][1];
                                events.subscribe.apply(events, [eventname].concat(typeof handler_and_args === 'function' ? [handler_and_args] : handler_and_args));
                            }
                        })(events, jsPDF.API.events);
                    } else {
                        API[plugin] = jsPDF.API[plugin];
                    }
                }
            }
            /**
             * Object exposing internal API to plugins
             * @public
             * @ignore
             */


            API.internal = {
                'pdfEscape': pdfEscape,
                'getStyle': getStyle,
                'getFont': function getFont() {
                    return fonts[_getFont.apply(API, arguments)];
                },
                'getFontSize': getFontSize,
                'getCharSpace': getCharSpace,
                'getTextColor': getTextColor,
                'getLineHeight': getLineHeight,
                'getLineHeightFactor': getLineHeightFactor,
                'write': write,
                'getHorizontalCoordinate': getHorizontalCoordinate,
                'getVerticalCoordinate': getVerticalCoordinate,
                'getCoordinateString': getHorizontalCoordinateString,
                'getVerticalCoordinateString': getVerticalCoordinateString,
                'collections': {},
                'newObject': newObject,
                'newAdditionalObject': newAdditionalObject,
                'newObjectDeferred': newObjectDeferred,
                'newObjectDeferredBegin': newObjectDeferredBegin,
                'getFilters': getFilters,
                'putStream': putStream,
                'events': events,
                // ratio that you use in multiplication of a given "size" number to arrive to 'point'
                // units of measurement.
                // scaleFactor is set at initialization of the document and calculated against the stated
                // default measurement units for the document.
                // If default is "mm", k is the number that will turn number in 'mm' into 'points' number.
                // through multiplication.
                'scaleFactor': k,
                'pageSize': {
                    getWidth: function getWidth() {
                        return (pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX) / k;
                    },
                    setWidth: function setWidth(value) {
                        pagesContext[currentPage].mediaBox.topRightX = value * k + pagesContext[currentPage].mediaBox.bottomLeftX;
                    },
                    getHeight: function getHeight() {
                        return (pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY) / k;
                    },
                    setHeight: function setHeight(value) {
                        pagesContext[currentPage].mediaBox.topRightY = value * k + pagesContext[currentPage].mediaBox.bottomLeftY;
                    }
                },
                'output': output,
                'getNumberOfPages': getNumberOfPages,
                'pages': pages,
                'out': out,
                'f2': f2,
                'f3': f3,
                'getPageInfo': getPageInfo,
                'getPageInfoByObjId': getPageInfoByObjId,
                'getCurrentPageInfo': getCurrentPageInfo,
                'getPDFVersion': getPdfVersion,
                'hasHotfix': hasHotfix //Expose the hasHotfix check so plugins can also check them.

            };
            Object.defineProperty(API.internal.pageSize, 'width', {
                get: function get() {
                    return (pagesContext[currentPage].mediaBox.topRightX - pagesContext[currentPage].mediaBox.bottomLeftX) / k;
                },
                set: function set(value) {
                    pagesContext[currentPage].mediaBox.topRightX = value * k + pagesContext[currentPage].mediaBox.bottomLeftX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(API.internal.pageSize, 'height', {
                get: function get() {
                    return (pagesContext[currentPage].mediaBox.topRightY - pagesContext[currentPage].mediaBox.bottomLeftY) / k;
                },
                set: function set(value) {
                    pagesContext[currentPage].mediaBox.topRightY = value * k + pagesContext[currentPage].mediaBox.bottomLeftY;
                },
                enumerable: true,
                configurable: true
            }); //////////////////////////////////////////////////////
            // continuing initialization of jsPDF Document object
            //////////////////////////////////////////////////////
            // Add the first page automatically

            addFonts(standardFonts);
            activeFontKey = 'F1';

            _addPage(format, orientation);

            events.publish('initialized');
            return API;
        }
        /**
         * jsPDF.API is a STATIC property of jsPDF class.
         * jsPDF.API is an object you can add methods and properties to.
         * The methods / properties you add will show up in new jsPDF objects.
         *
         * One property is prepopulated. It is the 'events' Object. Plugin authors can add topics,
         * callbacks to this object. These will be reassigned to all new instances of jsPDF.
         *
         * @static
         * @public
         * @memberOf jsPDF
         * @name API
         *
         * @example
         * jsPDF.API.mymethod = function(){
         *   // 'this' will be ref to internal API object. see jsPDF source
         *   // , so you can refer to built-in methods like so:
         *   //     this.line(....)
         *   //     this.text(....)
         * }
         * var pdfdoc = new jsPDF()
         * pdfdoc.mymethod() // <- !!!!!!
         */


        jsPDF.API = {
            events: []
        };
        /**
         * The version of jsPDF.
         * @name version
         * @type {string}
         * @memberOf jsPDF
         */

        jsPDF.version = '1.5.3';

        if (typeof define === 'function' && define.amd) {
            define('jsPDF', function () {
                return jsPDF;
            });
        } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = jsPDF;
            module.exports.jsPDF = jsPDF;
        } else {
            global.jsPDF = jsPDF;
        }

        return jsPDF;
    }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')()); // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window

    /*rollup-keeper-start*/


    window.tmp = jsPDF;
    /*rollup-keeper-end*/


    /**
     * @license
     * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
     *
     * Licensed under the MIT License.
     * http://opensource.org/licenses/mit-license
     */

    /**
     * jsPDF Canvas PlugIn
     * This plugin mimics the HTML5 Canvas
     * 
     * The goal is to provide a way for current canvas users to print directly to a PDF.
     * @name canvas
     * @module
     */
    (function (jsPDFAPI) {
        /**
         * @class Canvas
         * @classdesc A Canvas Wrapper for jsPDF
         */

        var Canvas = function Canvas() {
            var jsPdfInstance = undefined;
            Object.defineProperty(this, 'pdf', {
                get: function get() {
                    return jsPdfInstance;
                },
                set: function set(value) {
                    jsPdfInstance = value;
                }
            });
            var _width = 150;
            /**
             * The height property is a positive integer reflecting the height HTML attribute of the <canvas> element interpreted in CSS pixels. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of 150 is used.
             * This is one of the two properties, the other being width, that controls the size of the canvas.
             *
             * @name width
             */

            Object.defineProperty(this, 'width', {
                get: function get() {
                    return _width;
                },
                set: function set(value) {
                    if (isNaN(value) || Number.isInteger(value) === false || value < 0) {
                        _width = 150;
                    } else {
                        _width = value;
                    }

                    if (this.getContext('2d').pageWrapXEnabled) {
                        this.getContext('2d').pageWrapX = _width + 1;
                    }
                }
            });
            var _height = 300;
            /**
             * The width property is a positive integer reflecting the width HTML attribute of the <canvas> element interpreted in CSS pixels. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of 300 is used.
             * This is one of the two properties, the other being height, that controls the size of the canvas.
             *
             * @name height
             */

            Object.defineProperty(this, 'height', {
                get: function get() {
                    return _height;
                },
                set: function set(value) {
                    if (isNaN(value) || Number.isInteger(value) === false || value < 0) {
                        _height = 300;
                    } else {
                        _height = value;
                    }

                    if (this.getContext('2d').pageWrapYEnabled) {
                        this.getContext('2d').pageWrapY = _height + 1;
                    }
                }
            });
            var _childNodes = [];
            Object.defineProperty(this, 'childNodes', {
                get: function get() {
                    return _childNodes;
                },
                set: function set(value) {
                    _childNodes = value;
                }
            });
            var _style = {};
            Object.defineProperty(this, 'style', {
                get: function get() {
                    return _style;
                },
                set: function set(value) {
                    _style = value;
                }
            });
            Object.defineProperty(this, 'parentNode', {
                get: function get() {
                    return false;
                }
            });
        };
        /**
         * The getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
         * 
         * @name getContext
         * @function
         * @param {string} contextType Is a String containing the context identifier defining the drawing context associated to the canvas. Possible value is "2d", leading to the creation of a Context2D object representing a two-dimensional rendering context.
         * @param {object} contextAttributes
         */


        Canvas.prototype.getContext = function (contextType, contextAttributes) {
            contextType = contextType || '2d';
            var key;

            if (contextType !== '2d') {
                return null;
            }

            for (key in contextAttributes) {
                if (this.pdf.context2d.hasOwnProperty(key)) {
                    this.pdf.context2d[key] = contextAttributes[key];
                }
            }

            this.pdf.context2d._canvas = this;
            return this.pdf.context2d;
        };
        /**
         * The toDataURL() method is just a stub to throw an error if accidently called.
         * 
         * @name toDataURL
         * @function
         */


        Canvas.prototype.toDataURL = function () {
            throw new Error('toDataURL is not implemented.');
        };

        jsPDFAPI.events.push(['initialized', function () {
            this.canvas = new Canvas();
            this.canvas.pdf = this;
        }]);
        return this;
    })(jsPDF.API);


    /** 
     * @license
     * ====================================================================
     * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
     *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
     *               2013 Lee Driscoll, https://github.com/lsdriscoll
     *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
     *               2014 James Hall, james@parall.ax
     *               2014 Diego Casorran, https://github.com/diegocr
     *
     * 
     * ====================================================================
     */

    /**
     * @name cell
     * @module
     */
    (function (jsPDFAPI) {
        /*jslint browser:true */

        /*global document: false, jsPDF */

        var padding = 3,
            margin = 13,
            headerFunction,
            lastCellPos = {
                x: undefined,
                y: undefined,
                w: undefined,
                h: undefined,
                ln: undefined
            },
            pages = 1,
            setLastCellPosition = function setLastCellPosition(x, y, w, h, ln) {
                lastCellPos = {
                    'x': x,
                    'y': y,
                    'w': w,
                    'h': h,
                    'ln': ln
                };
            },
            getLastCellPosition = function getLastCellPosition() {
                return lastCellPos;
            },
            NO_MARGINS = {
                left: 0,
                top: 0,
                bottom: 0
            };
        /**
         * @name setHeaderFunction
         * @function
         * @param {function} func
         */


        jsPDFAPI.setHeaderFunction = function (func) {
            headerFunction = func;
        };
        /**
         * @name getTextDimensions
         * @function
         * @param {string} txt
         * @returns {Object} dimensions
         */


        jsPDFAPI.getTextDimensions = function (text, options) {
            var fontSize = this.table_font_size || this.internal.getFontSize();
            var fontStyle = this.internal.getFont().fontStyle;
            options = options || {};
            var scaleFactor = options.scaleFactor || this.internal.scaleFactor;
            var width = 0;
            var amountOfLines = 0;
            var height = 0;
            var tempWidth = 0;

            if (typeof text === 'string') {
                width = this.getStringUnitWidth(text) * fontSize;

                if (width !== 0) {
                    amountOfLines = 1;
                }
            } else if (Object.prototype.toString.call(text) === '[object Array]') {
                for (var i = 0; i < text.length; i++) {
                    tempWidth = this.getStringUnitWidth(text[i]) * fontSize;

                    if (width < tempWidth) {
                        width = tempWidth;
                    }
                }

                if (width !== 0) {
                    amountOfLines = text.length;
                }
            } else {
                throw new Error('getTextDimensions expects text-parameter to be of type String or an Array of Strings.');
            }

            width = width / scaleFactor;
            height = Math.max((amountOfLines * fontSize * this.getLineHeightFactor() - fontSize * (this.getLineHeightFactor() - 1)) / scaleFactor, 0);
            return {
                w: width,
                h: height
            };
        };
        /**
         * @name cellAddPage
         * @function
         */


        jsPDFAPI.cellAddPage = function () {
            var margins = this.margins || NO_MARGINS;
            this.addPage();
            setLastCellPosition(margins.left, margins.top, undefined, undefined); //setLastCellPosition(undefined, undefined, undefined, undefined, undefined);

            pages += 1;
        };
        /**
         * @name cellInitialize
         * @function
         */


        jsPDFAPI.cellInitialize = function () {
            lastCellPos = {
                x: undefined,
                y: undefined,
                w: undefined,
                h: undefined,
                ln: undefined
            };
            pages = 1;
        };
        /**
         * @name cell
         * @function
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         * @param {string} txt
         * @param {number} ln lineNumber
         * @param {string} align
         * @return {jsPDF} jsPDF-instance
         */


        jsPDFAPI.cell = function (x, y, w, h, txt, ln, align) {
            var curCell = getLastCellPosition();
            var pgAdded = false; // If this is not the first cell, we must change its position

            if (curCell.ln !== undefined) {
                if (curCell.ln === ln) {
                    //Same line
                    x = curCell.x + curCell.w;
                    y = curCell.y;
                } else {
                    //New line
                    var margins = this.margins || NO_MARGINS;

                    if (curCell.y + curCell.h + h + margin >= this.internal.pageSize.getHeight() - margins.bottom) {
                        this.cellAddPage();
                        pgAdded = true;

                        if (this.printHeaders && this.tableHeaderRow) {
                            this.printHeaderRow(ln, true);
                        }
                    } //We ignore the passed y: the lines may have different heights


                    y = getLastCellPosition().y + getLastCellPosition().h;
                    if (pgAdded) y = margin + 10;
                }
            }

            if (txt[0] !== undefined) {
                if (this.printingHeaderRow) {
                    this.rect(x, y, w, h, 'FD');
                } else {
                    this.rect(x, y, w, h);
                }

                if (align === 'right') {
                    if (!(txt instanceof Array)) {
                        txt = [txt];
                    }

                    for (var i = 0; i < txt.length; i++) {
                        var currentLine = txt[i];
                        var textSize = this.getStringUnitWidth(currentLine) * this.internal.getFontSize() / this.internal.scaleFactor;
                        this.text(currentLine, x + w - textSize - padding, y + this.internal.getLineHeight() * (i + 1));
                    }
                } else {
                    this.text(txt, x + padding, y + this.internal.getLineHeight());
                }
            }

            setLastCellPosition(x, y, w, h, ln);
            return this;
        };
        /**
         * Return the maximum value from an array
         * 
         * @name arrayMax
         * @function 
         * @param {Array} array
         * @param comparisonFn
         * @returns {number}
         */


        jsPDFAPI.arrayMax = function (array, comparisonFn) {
            var max = array[0],
                i,
                ln,
                item;

            for (i = 0, ln = array.length; i < ln; i += 1) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(max, item) === -1) {
                        max = item;
                    }
                } else {
                    if (item > max) {
                        max = item;
                    }
                }
            }

            return max;
        };
        /**
         * Create a table from a set of data.
         * @name table
         * @function
         * @param {Integer} [x] : left-position for top-left corner of table
         * @param {Integer} [y] top-position for top-left corner of table
         * @param {Object[]} [data] As array of objects containing key-value pairs corresponding to a row of data.
         * @param {String[]} [headers] Omit or null to auto-generate headers at a performance cost
         * @param {Object} [config.printHeaders] True to print column headers at the top of every page
         * @param {Object} [config.autoSize] True to dynamically set the column widths to match the widest cell value
         * @param {Object} [config.margins] margin values for left, top, bottom, and width
         * @param {Object} [config.fontSize] Integer fontSize to use (optional)
         * @returns {jsPDF} jsPDF-instance
         */


        jsPDFAPI.table = function (x, y, data, headers, config) {
            if (!data) {
                throw 'No data for PDF table';
            }

            var headerNames = [],
                headerPrompts = [],
                header,
                i,
                ln,
                cln,
                columnMatrix = {},
                columnWidths = {},
                columnData,
                column,
                columnMinWidths = [],
                j,
                tableHeaderConfigs = [],
                model,
                jln,
                func,
                //set up defaults. If a value is provided in config, defaults will be overwritten:
                autoSize = false,
                printHeaders = true,
                fontSize = 12,
                margins = NO_MARGINS;
            margins.width = this.internal.pageSize.getWidth();

            if (config) {
                //override config defaults if the user has specified non-default behavior:
                if (config.autoSize === true) {
                    autoSize = true;
                }

                if (config.printHeaders === false) {
                    printHeaders = false;
                }

                if (config.fontSize) {
                    fontSize = config.fontSize;
                }

                if (config.css && typeof config.css['font-size'] !== "undefined") {
                    fontSize = config.css['font-size'] * 16;
                }

                if (config.margins) {
                    margins = config.margins;
                }
            }
            /**
             * @property {Number} lnMod
             * Keep track of the current line number modifier used when creating cells
             */


            this.lnMod = 0;
            lastCellPos = {
                x: undefined,
                y: undefined,
                w: undefined,
                h: undefined,
                ln: undefined
            }, pages = 1;
            this.printHeaders = printHeaders;
            this.margins = margins;
            this.setFontSize(fontSize);
            this.table_font_size = fontSize; // Set header values

            if (headers === undefined || headers === null) {
                // No headers defined so we derive from data
                headerNames = Object.keys(data[0]);
            } else if (headers[0] && typeof headers[0] !== 'string') {
                var px2pt = 0.264583 * 72 / 25.4; // Split header configs into names and prompts

                for (i = 0, ln = headers.length; i < ln; i += 1) {
                    header = headers[i];
                    headerNames.push(header.name);
                    headerPrompts.push(header.prompt);
                    columnWidths[header.name] = header.width * px2pt;
                }
            } else {
                headerNames = headers;
            }

            if (autoSize) {
                // Create a matrix of columns e.g., {column_title: [row1_Record, row2_Record]}
                func = function func(rec) {
                    return rec[header];
                };

                for (i = 0, ln = headerNames.length; i < ln; i += 1) {
                    header = headerNames[i];
                    columnMatrix[header] = data.map(func); // get header width

                    columnMinWidths.push(this.getTextDimensions(headerPrompts[i] || header, {
                        scaleFactor: 1
                    }).w);
                    column = columnMatrix[header]; // get cell widths

                    for (j = 0, cln = column.length; j < cln; j += 1) {
                        columnData = column[j];
                        columnMinWidths.push(this.getTextDimensions(columnData, {
                            scaleFactor: 1
                        }).w);
                    } // get final column width


                    columnWidths[header] = jsPDFAPI.arrayMax(columnMinWidths); //have to reset

                    columnMinWidths = [];
                }
            } // -- Construct the table


            if (printHeaders) {
                var lineHeight = this.calculateLineHeight(headerNames, columnWidths, headerPrompts.length ? headerPrompts : headerNames); // Construct the header row

                for (i = 0, ln = headerNames.length; i < ln; i += 1) {
                    header = headerNames[i];
                    tableHeaderConfigs.push([x, y, columnWidths[header], lineHeight, String(headerPrompts.length ? headerPrompts[i] : header)]);
                } // Store the table header config


                this.setTableHeaderRow(tableHeaderConfigs); // Print the header for the start of the table

                this.printHeaderRow(1, false);
            } // Construct the data rows


            for (i = 0, ln = data.length; i < ln; i += 1) {
                var lineHeight;
                model = data[i];
                lineHeight = this.calculateLineHeight(headerNames, columnWidths, model);

                for (j = 0, jln = headerNames.length; j < jln; j += 1) {
                    header = headerNames[j];
                    this.cell(x, y, columnWidths[header], lineHeight, model[header], i + 2, header.align);
                }
            }

            this.lastCellPos = lastCellPos;
            this.table_x = x;
            this.table_y = y;
            return this;
        };
        /**
         * Calculate the height for containing the highest column
         *
         * @name calculateLineHeight
         * @function
         * @param {String[]} headerNames is the header, used as keys to the data
         * @param {Integer[]} columnWidths is size of each column
         * @param {Object[]} model is the line of data we want to calculate the height of
         * @returns {number} lineHeight
         */


        jsPDFAPI.calculateLineHeight = function (headerNames, columnWidths, model) {
            var header,
                lineHeight = 0;

            for (var j = 0; j < headerNames.length; j++) {
                header = headerNames[j];
                model[header] = this.splitTextToSize(String(model[header]), columnWidths[header] - padding);
                var h = this.internal.getLineHeight() * model[header].length + padding;
                if (h > lineHeight) lineHeight = h;
            }

            return lineHeight;
        };
        /**
         * Store the config for outputting a table header
         *
         * @name setTableHeaderRow
         * @function
         * @param {Object[]} config
         * An array of cell configs that would define a header row: Each config matches the config used by jsPDFAPI.cell
         * except the ln parameter is excluded
         */


        jsPDFAPI.setTableHeaderRow = function (config) {
            this.tableHeaderRow = config;
        };
        /**
         * Output the store header row
         * 
         * @name printHeaderRow
         * @function
         * @param {number} lineNumber The line number to output the header at
         * @param {boolean} new_page 
         */


        jsPDFAPI.printHeaderRow = function (lineNumber, new_page) {
            if (!this.tableHeaderRow) {
                throw 'Property tableHeaderRow does not exist.';
            }

            var tableHeaderCell, tmpArray, i, ln;
            this.printingHeaderRow = true;

            if (headerFunction !== undefined) {
                var position = headerFunction(this, pages);
                setLastCellPosition(position[0], position[1], position[2], position[3], -1);
            }

            this.setFontStyle('bold');
            var tempHeaderConf = [];

            for (i = 0, ln = this.tableHeaderRow.length; i < ln; i += 1) {
                this.setFillColor(200, 200, 200);
                tableHeaderCell = this.tableHeaderRow[i];

                if (new_page) {
                    this.margins.top = margin;
                    tableHeaderCell[1] = this.margins && this.margins.top || 0;
                    tempHeaderConf.push(tableHeaderCell);
                }

                tmpArray = [].concat(tableHeaderCell);
                this.cell.apply(this, tmpArray.concat(lineNumber));
            }

            if (tempHeaderConf.length > 0) {
                this.setTableHeaderRow(tempHeaderConf);
            }

            this.setFontStyle('normal');
            this.printingHeaderRow = false;
        };
    })(jsPDF.API);


    /**
     * jsPDF Context2D PlugIn Copyright (c) 2014 Steven Spungin (TwelveTone LLC) steven@twelvetone.tv
     *
     * Licensed under the MIT License. http://opensource.org/licenses/mit-license
     */

    /**
     * This plugin mimics the HTML5 CanvasRenderingContext2D.
     *
     * The goal is to provide a way for current canvas implementations to print directly to a PDF.
     *
     * @name context2d
     * @module
     */
    (function (jsPDFAPI, globalObj) {

        var ContextLayer = function ContextLayer(ctx) {
            ctx = ctx || {};
            this.isStrokeTransparent = ctx.isStrokeTransparent || false;
            this.strokeOpacity = ctx.strokeOpacity || 1;
            this.strokeStyle = ctx.strokeStyle || '#000000';
            this.fillStyle = ctx.fillStyle || '#000000';
            this.isFillTransparent = ctx.isFillTransparent || false;
            this.fillOpacity = ctx.fillOpacity || 1;
            this.font = ctx.font || '10px sans-serif';
            this.textBaseline = ctx.textBaseline || 'alphabetic';
            this.textAlign = ctx.textAlign || 'left';
            this.lineWidth = ctx.lineWidth || 1;
            this.lineJoin = ctx.lineJoin || 'miter';
            this.lineCap = ctx.lineCap || 'butt';
            this.path = ctx.path || [];
            this.transform = typeof ctx.transform !== 'undefined' ? ctx.transform.clone() : new Matrix();
            this.globalCompositeOperation = ctx.globalCompositeOperation || 'normal';
            this.globalAlpha = ctx.globalAlpha || 1.0;
            this.clip_path = ctx.clip_path || [];
            this.currentPoint = ctx.currentPoint || new Point();
            this.miterLimit = ctx.miterLimit || 10.0;
            this.lastPoint = ctx.lastPoint || new Point();
            this.ignoreClearRect = typeof ctx.ignoreClearRect === "boolean" ? ctx.ignoreClearRect : true;
            return this;
        }; //stub


        var f2, f3, getHorizontalCoordinateString, getVerticalCoordinateString, getHorizontalCoordinate, getVerticalCoordinate;
        jsPDFAPI.events.push(['initialized', function () {
            this.context2d = new Context2D(this);
            f2 = this.internal.f2;
            f3 = this.internal.f3;
            getHorizontalCoordinateString = this.internal.getCoordinateString;
            getVerticalCoordinateString = this.internal.getVerticalCoordinateString;
            getHorizontalCoordinate = this.internal.getHorizontalCoordinate;
            getVerticalCoordinate = this.internal.getVerticalCoordinate;
        }]);

        var Context2D = function Context2D(pdf) {
            Object.defineProperty(this, 'canvas', {
                get: function get() {
                    return {
                        parentNode: false,
                        style: false
                    };
                }
            });
            Object.defineProperty(this, 'pdf', {
                get: function get() {
                    return pdf;
                }
            });
            var _pageWrapXEnabled = false;
            /**
             * @name pageWrapXEnabled
             * @type {boolean}
             * @default false
             */

            Object.defineProperty(this, 'pageWrapXEnabled', {
                get: function get() {
                    return _pageWrapXEnabled;
                },
                set: function set(value) {
                    _pageWrapXEnabled = Boolean(value);
                }
            });
            var _pageWrapYEnabled = false;
            /**
             * @name pageWrapYEnabled
             * @type {boolean}
             * @default true
             */

            Object.defineProperty(this, 'pageWrapYEnabled', {
                get: function get() {
                    return _pageWrapYEnabled;
                },
                set: function set(value) {
                    _pageWrapYEnabled = Boolean(value);
                }
            });
            var _posX = 0;
            /**
             * @name posX
             * @type {number}
             * @default 0
             */

            Object.defineProperty(this, 'posX', {
                get: function get() {
                    return _posX;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _posX = value;
                    }
                }
            });
            var _posY = 0;
            /**
             * @name posY
             * @type {number}
             * @default 0
             */

            Object.defineProperty(this, 'posY', {
                get: function get() {
                    return _posY;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _posY = value;
                    }
                }
            });
            var _autoPaging = false;
            /**
             * @name autoPaging
             * @type {boolean}
             * @default true
             */

            Object.defineProperty(this, 'autoPaging', {
                get: function get() {
                    return _autoPaging;
                },
                set: function set(value) {
                    _autoPaging = Boolean(value);
                }
            });
            var lastBreak = 0;
            /**
             * @name lastBreak
             * @type {number}
             * @default 0
             */

            Object.defineProperty(this, 'lastBreak', {
                get: function get() {
                    return lastBreak;
                },
                set: function set(value) {
                    lastBreak = value;
                }
            });
            var pageBreaks = [];
            /**
             * Y Position of page breaks.
             * @name pageBreaks
             * @type {number}
             * @default 0
             */

            Object.defineProperty(this, 'pageBreaks', {
                get: function get() {
                    return pageBreaks;
                },
                set: function set(value) {
                    pageBreaks = value;
                }
            });

            var _ctx = new ContextLayer();
            /**
             * @name ctx
             * @type {object}
             * @default {}
             */


            Object.defineProperty(this, 'ctx', {
                get: function get() {
                    return _ctx;
                },
                set: function set(value) {
                    if (value instanceof ContextLayer) {
                        _ctx = value;
                    }
                }
            });
            /**
             * @name path
             * @type {array}
             * @default []
             */

            Object.defineProperty(this, 'path', {
                get: function get() {
                    return _ctx.path;
                },
                set: function set(value) {
                    _ctx.path = value;
                }
            });
            /**
             * @name ctxStack
             * @type {array}
             * @default []
             */

            var _ctxStack = [];
            Object.defineProperty(this, 'ctxStack', {
                get: function get() {
                    return _ctxStack;
                },
                set: function set(value) {
                    _ctxStack = value;
                }
            });
            /**
             * Sets or returns the color, gradient, or pattern used to fill the drawing
             *
             * @name fillStyle
             * @default #000000
             * @property {(color|gradient|pattern)} value The color of the drawing. Default value is #000000<br />
             * A gradient object (linear or radial) used to fill the drawing (not supported by context2d)<br />
             * A pattern object to use to fill the drawing (not supported by context2d)
             */

            Object.defineProperty(this, 'fillStyle', {
                get: function get() {
                    return this.ctx.fillStyle;
                },
                set: function set(value) {
                    var rgba;
                    rgba = getRGBA(value);
                    this.ctx.fillStyle = rgba.style;
                    this.ctx.isFillTransparent = rgba.a === 0;
                    this.ctx.fillOpacity = rgba.a;
                    this.pdf.setFillColor(rgba.r, rgba.g, rgba.b, {
                        a: rgba.a
                    });
                    this.pdf.setTextColor(rgba.r, rgba.g, rgba.b, {
                        a: rgba.a
                    });
                }
            });
            /**
             * Sets or returns the color, gradient, or pattern used for strokes
             *
             * @name strokeStyle
             * @default #000000
             * @property {color} color A CSS color value that indicates the stroke color of the drawing. Default value is #000000 (not supported by context2d)
             * @property {gradient} gradient A gradient object (linear or radial) used to create a gradient stroke (not supported by context2d)
             * @property {pattern} pattern A pattern object used to create a pattern stroke (not supported by context2d)
             */

            Object.defineProperty(this, 'strokeStyle', {
                get: function get() {
                    return this.ctx.strokeStyle;
                },
                set: function set(value) {
                    var rgba = getRGBA(value);
                    this.ctx.strokeStyle = rgba.style;
                    this.ctx.isStrokeTransparent = rgba.a === 0;
                    this.ctx.strokeOpacity = rgba.a;

                    if (rgba.a === 0) {
                        this.pdf.setDrawColor(255, 255, 255);
                    } else if (rgba.a === 1) {
                        this.pdf.setDrawColor(rgba.r, rgba.g, rgba.b);
                    } else {
                        this.pdf.setDrawColor(rgba.r, rgba.g, rgba.b);
                    }
                }
            });
            /**
             * Sets or returns the style of the end caps for a line
             *
             * @name lineCap
             * @default butt
             * @property {(butt|round|square)} lineCap butt A flat edge is added to each end of the line <br/>
             * round A rounded end cap is added to each end of the line<br/>
             * square A square end cap is added to each end of the line<br/>
             */

            Object.defineProperty(this, 'lineCap', {
                get: function get() {
                    return this.ctx.lineCap;
                },
                set: function set(value) {
                    if (['butt', 'round', 'square'].indexOf(value) !== -1) {
                        this.ctx.lineCap = value;
                        this.pdf.setLineCap(value);
                    }
                }
            });
            /**
             * Sets or returns the current line width
             *
             * @name lineWidth
             * @default 1
             * @property {number} lineWidth The current line width, in pixels
             */

            Object.defineProperty(this, 'lineWidth', {
                get: function get() {
                    return this.ctx.lineWidth;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        this.ctx.lineWidth = value;
                        this.pdf.setLineWidth(value);
                    }
                }
            });
            /**
             * Sets or returns the type of corner created, when two lines meet
             */

            Object.defineProperty(this, 'lineJoin', {
                get: function get() {
                    return this.ctx.lineJoin;
                },
                set: function set(value) {
                    if (['bevel', 'round', 'miter'].indexOf(value) !== -1) {
                        this.ctx.lineJoin = value;
                        this.pdf.setLineJoin(value);
                    }
                }
            });
            /**
             * A number specifying the miter limit ratio in coordinate space units. Zero, negative, Infinity, and NaN values are ignored. The default value is 10.0.
             *
             * @name miterLimit
             * @default 10
             */

            Object.defineProperty(this, 'miterLimit', {
                get: function get() {
                    return this.ctx.miterLimit;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        this.ctx.miterLimit = value;
                        this.pdf.setMiterLimit(value);
                    }
                }
            });
            Object.defineProperty(this, 'textBaseline', {
                get: function get() {
                    return this.ctx.textBaseline;
                },
                set: function set(value) {
                    this.ctx.textBaseline = value;
                }
            });
            Object.defineProperty(this, 'textAlign', {
                get: function get() {
                    return this.ctx.textAlign;
                },
                set: function set(value) {
                    if (['right', 'end', 'center', 'left', 'start'].indexOf(value) !== -1) {
                        this.ctx.textAlign = value;
                    }
                }
            });
            Object.defineProperty(this, 'font', {
                get: function get() {
                    return this.ctx.font;
                },
                set: function set(value) {
                    this.ctx.font = value;
                    var rx, matches; //source: https://stackoverflow.com/a/10136041

                    rx = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i;
                    matches = rx.exec(value);

                    if (matches !== null) {
                        var fontStyle = matches[1];
                        var fontVariant = matches[2];
                        var fontWeight = matches[3];
                        var fontSize = matches[4];
                        var fontSizeUnit = matches[5];
                        var fontFamily = matches[6];
                    } else {
                        return;
                    }

                    if ('px' === fontSizeUnit) {
                        fontSize = Math.floor(parseFloat(fontSize));
                    } else if ('em' === fontSizeUnit) {
                        fontSize = Math.floor(parseFloat(fontSize) * this.pdf.getFontSize());
                    } else {
                        fontSize = Math.floor(parseFloat(fontSize));
                    }

                    this.pdf.setFontSize(fontSize);
                    var style = '';

                    if (fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700 || fontStyle === 'bold') {
                        style = 'bold';
                    }

                    if (fontStyle === 'italic') {
                        style += 'italic';
                    }

                    if (style.length === 0) {
                        style = 'normal';
                    }

                    var jsPdfFontName = '';
                    var parts = fontFamily.toLowerCase().replace(/"|'/g, '').split(/\s*,\s*/);
                    var fallbackFonts = {
                        arial: 'Helvetica',
                        verdana: 'Helvetica',
                        helvetica: 'Helvetica',
                        'sans-serif': 'Helvetica',
                        fixed: 'Courier',
                        monospace: 'Courier',
                        terminal: 'Courier',
                        courier: 'Courier',
                        times: 'Times',
                        cursive: 'Times',
                        fantasy: 'Times',
                        serif: 'Times'
                    };

                    for (var i = 0; i < parts.length; i++) {
                        if (this.pdf.internal.getFont(parts[i], style, {
                                noFallback: true,
                                disableWarning: true
                            }) !== undefined) {
                            jsPdfFontName = parts[i];
                            break;
                        } else if (style === 'bolditalic' && this.pdf.internal.getFont(parts[i], 'bold', {
                                noFallback: true,
                                disableWarning: true
                            }) !== undefined) {
                            jsPdfFontName = parts[i];
                            style = 'bold';
                        } else if (this.pdf.internal.getFont(parts[i], 'normal', {
                                noFallback: true,
                                disableWarning: true
                            }) !== undefined) {
                            jsPdfFontName = parts[i];
                            style = 'normal';
                            break;
                        }
                    }

                    if (jsPdfFontName === '') {
                        for (var i = 0; i < parts.length; i++) {
                            if (fallbackFonts[parts[i]]) {
                                jsPdfFontName = fallbackFonts[parts[i]];
                                break;
                            }
                        }
                    }

                    jsPdfFontName = jsPdfFontName === '' ? 'Times' : jsPdfFontName;
                    this.pdf.setFont(jsPdfFontName, style);
                }
            });
            Object.defineProperty(this, 'globalCompositeOperation', {
                get: function get() {
                    return this.ctx.globalCompositeOperation;
                },
                set: function set(value) {
                    this.ctx.globalCompositeOperation = value;
                }
            });
            Object.defineProperty(this, 'globalAlpha', {
                get: function get() {
                    return this.ctx.globalAlpha;
                },
                set: function set(value) {
                    this.ctx.globalAlpha = value;
                }
            }); // Not HTML API

            Object.defineProperty(this, 'ignoreClearRect', {
                get: function get() {
                    return this.ctx.ignoreClearRect;
                },
                set: function set(value) {
                    this.ctx.ignoreClearRect = Boolean(value);
                }
            });
        };

        Context2D.prototype.fill = function () {
            pathPreProcess.call(this, 'fill', false);
        };
        /**
         * Actually draws the path you have defined
         *
         * @name stroke
         * @function
         * @description The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods. The default color is black.
         */


        Context2D.prototype.stroke = function () {
            pathPreProcess.call(this, 'stroke', false);
        };
        /**
         * Begins a path, or resets the current 
         *
         * @name beginPath
         * @function 
         * @description The beginPath() method begins a path, or resets the current path.
         */


        Context2D.prototype.beginPath = function () {
            this.path = [{
                type: 'begin'
            }];
        };
        /**
         * Moves the path to the specified point in the canvas, without creating a line
         * 
         * @name moveTo
         * @function
         * @param x {Number} The x-coordinate of where to move the path to
         * @param y {Number} The y-coordinate of where to move the path to
         */


        Context2D.prototype.moveTo = function (x, y) {
            if (isNaN(x) || isNaN(y)) {
                console.error('jsPDF.context2d.moveTo: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.moveTo');
            }

            var pt = this.ctx.transform.applyToPoint(new Point(x, y));
            this.path.push({
                type: 'mt',
                x: pt.x,
                y: pt.y
            });
            this.ctx.lastPoint = new Point(x, y);
        };
        /**
         * Creates a path from the current point back to the starting point
         * 
         * @name closePath
         * @function
         * @description The closePath() method creates a path from the current point back to the starting point.
         */


        Context2D.prototype.closePath = function () {
            var pathBegin = new Point(0, 0);
            var i = 0;

            for (i = this.path.length - 1; i !== -1; i--) {
                if (this.path[i].type === 'begin') {
                    if (_typeof(this.path[i + 1]) === 'object' && typeof this.path[i + 1].x === 'number') {
                        pathBegin = new Point(this.path[i + 1].x, this.path[i + 1].y);
                        this.path.push({
                            type: 'lt',
                            x: pathBegin.x,
                            y: pathBegin.y
                        });
                        break;
                    }
                }
            }

            if (_typeof(this.path[i + 2]) === 'object' && typeof this.path[i + 2].x === 'number') {
                this.path.push(JSON.parse(JSON.stringify(this.path[i + 2])));
            }

            this.path.push({
                type: 'close'
            });
            this.ctx.lastPoint = new Point(pathBegin.x, pathBegin.y);
        };
        /**
         * Adds a new point and creates a line to that point from the last specified point in the canvas
         * 
         * @name lineTo
         * @function
         * @param x The x-coordinate of where to create the line to
         * @param y The y-coordinate of where to create the line to
         * @description The lineTo() method adds a new point and creates a line TO that point FROM the last specified point in the canvas (this method does not draw the line).
         */


        Context2D.prototype.lineTo = function (x, y) {
            if (isNaN(x) || isNaN(y)) {
                console.error('jsPDF.context2d.lineTo: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.lineTo');
            }

            var pt = this.ctx.transform.applyToPoint(new Point(x, y));
            this.path.push({
                type: 'lt',
                x: pt.x,
                y: pt.y
            });
            this.ctx.lastPoint = new Point(pt.x, pt.y);
        };
        /**
         * Clips a region of any shape and size from the original canvas
         * 
         * @name clip
         * @function
         * @description The clip() method clips a region of any shape and size from the original canvas.
         */


        Context2D.prototype.clip = function () {
            this.ctx.clip_path = JSON.parse(JSON.stringify(this.path));
            pathPreProcess.call(this, null, true);
        };
        /**
         * Creates a cubic Bézier curve
         *
         * @name quadraticCurveTo
         * @function
         * @param cpx {Number} The x-coordinate of the Bézier control point
         * @param cpy {Number} The y-coordinate of the Bézier control point
         * @param x {Number} The x-coordinate of the ending point
         * @param y {Number} The y-coordinate of the ending point
         * @description The quadraticCurveTo() method adds a point to the current path by using the specified control points that represent a quadratic Bézier curve.<br /><br /> A quadratic Bézier curve requires two points. The first point is a control point that is used in the quadratic Bézier calculation and the second point is the ending point for the curve. The starting point for the curve is the last point in the current path. If a path does not exist, use the beginPath() and moveTo() methods to define a starting point.
         */


        Context2D.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
            if (isNaN(x) || isNaN(y) || isNaN(cpx) || isNaN(cpy)) {
                console.error('jsPDF.context2d.quadraticCurveTo: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.quadraticCurveTo');
            }

            var pt0 = this.ctx.transform.applyToPoint(new Point(x, y));
            var pt1 = this.ctx.transform.applyToPoint(new Point(cpx, cpy));
            this.path.push({
                type: 'qct',
                x1: pt1.x,
                y1: pt1.y,
                x: pt0.x,
                y: pt0.y
            });
            this.ctx.lastPoint = new Point(pt0.x, pt0.y);
        };
        /**
         * Creates a cubic Bézier curve
         *
         * @name bezierCurveTo
         * @function
         * @param cp1x {Number} The x-coordinate of the first Bézier control point
         * @param cp1y {Number} The y-coordinate of the first Bézier control point
         * @param cp2x {Number} The x-coordinate of the second Bézier control point
         * @param cp2y {Number} The y-coordinate of the second Bézier control point
         * @param x {Number} The x-coordinate of the ending point
         * @param y {Number} The y-coordinate of the ending point
         * @description The bezierCurveTo() method adds a point to the current path by using the specified control points that represent a cubic Bézier curve. <br /><br />A cubic bezier curve requires three points. The first two points are control points that are used in the cubic Bézier calculation and the last point is the ending point for the curve.  The starting point for the curve is the last point in the current path. If a path does not exist, use the beginPath() and moveTo() methods to define a starting point.
         */


        Context2D.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
            if (isNaN(x) || isNaN(y) || isNaN(cp1x) || isNaN(cp1y) || isNaN(cp2x) || isNaN(cp2y)) {
                console.error('jsPDF.context2d.bezierCurveTo: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.bezierCurveTo');
            }

            var pt0 = this.ctx.transform.applyToPoint(new Point(x, y));
            var pt1 = this.ctx.transform.applyToPoint(new Point(cp1x, cp1y));
            var pt2 = this.ctx.transform.applyToPoint(new Point(cp2x, cp2y));
            this.path.push({
                type: 'bct',
                x1: pt1.x,
                y1: pt1.y,
                x2: pt2.x,
                y2: pt2.y,
                x: pt0.x,
                y: pt0.y
            });
            this.ctx.lastPoint = new Point(pt0.x, pt0.y);
        };
        /**
         * Creates an arc/curve (used to create circles, or parts of circles)
         *
         * @name arc
         * @function
         * @param x {Number} The x-coordinate of the center of the circle
         * @param y {Number} The y-coordinate of the center of the circle
         * @param radius {Number} The radius of the circle
         * @param startAngle {Number} The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
         * @param endAngle {Number} The ending angle, in radians
         * @param counterclockwise {Boolean} Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
         * @description The arc() method creates an arc/curve (used to create circles, or parts of circles).
         */


        Context2D.prototype.arc = function (x, y, radius, startAngle, endAngle, counterclockwise) {
            if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(startAngle) || isNaN(endAngle)) {
                console.error('jsPDF.context2d.arc: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.arc');
            }

            counterclockwise = Boolean(counterclockwise);

            if (!this.ctx.transform.isIdentity) {
                var xpt = this.ctx.transform.applyToPoint(new Point(x, y));
                x = xpt.x;
                y = xpt.y;
                var x_radPt = this.ctx.transform.applyToPoint(new Point(0, radius));
                var x_radPt0 = this.ctx.transform.applyToPoint(new Point(0, 0));
                radius = Math.sqrt(Math.pow(x_radPt.x - x_radPt0.x, 2) + Math.pow(x_radPt.y - x_radPt0.y, 2));
            }

            if (Math.abs(endAngle - startAngle) >= 2 * Math.PI) {
                startAngle = 0;
                endAngle = 2 * Math.PI;
            }

            this.path.push({
                type: 'arc',
                x: x,
                y: y,
                radius: radius,
                startAngle: startAngle,
                endAngle: endAngle,
                counterclockwise: counterclockwise
            }); // this.ctx.lastPoint(new Point(pt.x,pt.y));
        };
        /**
         * Creates an arc/curve between two tangents
         * 
         * @name arcTo
         * @function
         * @param x1 {Number} The x-coordinate of the first tangent
         * @param y1 {Number} The y-coordinate of the first tangent
         * @param x2 {Number} The x-coordinate of the second tangent
         * @param y2 {Number} The y-coordinate of the second tangent
         * @param radius The radius of the arc
         * @description The arcTo() method creates an arc/curve between two tangents on the canvas.
         */


        Context2D.prototype.arcTo = function (x1, y1, x2, y2, radius) {
            throw new Error('arcTo not implemented.');
        };
        /**
         * Creates a rectangle
         *
         * @name rect
         * @function
         * @param x {Number} The x-coordinate of the upper-left corner of the rectangle
         * @param y {Number} The y-coordinate of the upper-left corner of the rectangle
         * @param w {Number} The width of the rectangle, in pixels
         * @param h {Number} The height of the rectangle, in pixels
         * @description The rect() method creates a rectangle.
         */


        Context2D.prototype.rect = function (x, y, w, h) {
            if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
                console.error('jsPDF.context2d.rect: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.rect');
            }

            this.moveTo(x, y);
            this.lineTo(x + w, y);
            this.lineTo(x + w, y + h);
            this.lineTo(x, y + h);
            this.lineTo(x, y);
            this.lineTo(x + w, y);
            this.lineTo(x, y);
        };
        /**
         * Draws a "filled" rectangle
         *
         * @name fillRect
         * @function
         * @param x {Number} The x-coordinate of the upper-left corner of the rectangle
         * @param y {Number} The y-coordinate of the upper-left corner of the rectangle
         * @param w {Number} The width of the rectangle, in pixels
         * @param h {Number} The height of the rectangle, in pixels
         * @description The fillRect() method draws a "filled" rectangle. The default color of the fill is black.
         */


        Context2D.prototype.fillRect = function (x, y, w, h) {
            if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
                console.error('jsPDF.context2d.fillRect: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.fillRect');
            }

            if (isFillTransparent.call(this)) {
                return;
            }

            var tmp = {};

            if (this.lineCap !== 'butt') {
                tmp.lineCap = this.lineCap;
                this.lineCap = 'butt';
            }

            if (this.lineJoin !== 'miter') {
                tmp.lineJoin = this.lineJoin;
                this.lineJoin = 'miter';
            }

            this.beginPath();
            this.rect(x, y, w, h);
            this.fill();

            if (tmp.hasOwnProperty('lineCap')) {
                this.lineCap = tmp.lineCap;
            }

            if (tmp.hasOwnProperty('lineJoin')) {
                this.lineJoin = tmp.lineJoin;
            }
        };
        /**
         *     Draws a rectangle (no fill)
         *
         * @name strokeRect
         * @function
         * @param x {Number} The x-coordinate of the upper-left corner of the rectangle
         * @param y {Number} The y-coordinate of the upper-left corner of the rectangle
         * @param w {Number} The width of the rectangle, in pixels
         * @param h {Number} The height of the rectangle, in pixels
         * @description The strokeRect() method draws a rectangle (no fill). The default color of the stroke is black.
         */


        Context2D.prototype.strokeRect = function strokeRect(x, y, w, h) {
            if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
                console.error('jsPDF.context2d.strokeRect: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.strokeRect');
            }

            if (isStrokeTransparent.call(this)) {
                return;
            }

            this.beginPath();
            this.rect(x, y, w, h);
            this.stroke();
        };
        /**
         * Clears the specified pixels within a given rectangle
         *
         * @name clearRect
         * @function
         * @param x {Number} The x-coordinate of the upper-left corner of the rectangle
         * @param y {Number} The y-coordinate of the upper-left corner of the rectangle
         * @param w {Number} The width of the rectangle to clear, in pixels
         * @param h {Number} The height of the rectangle to clear, in pixels
         * @description We cannot clear PDF commands that were already written to PDF, so we use white instead. <br />
         * As a special case, read a special flag (ignoreClearRect) and do nothing if it is set.
         * This results in all calls to clearRect() to do nothing, and keep the canvas transparent.
         * This flag is stored in the save/restore context and is managed the same way as other drawing states.
         *
         */


        Context2D.prototype.clearRect = function (x, y, w, h) {
            if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
                console.error('jsPDF.context2d.clearRect: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.clearRect');
            }

            if (this.ignoreClearRect) {
                return;
            }

            this.fillStyle = '#ffffff';
            this.fillRect(x, y, w, h);
        };
        /**
         * Saves the state of the current context
         * 
         * @name save
         * @function
         */


        Context2D.prototype.save = function (doStackPush) {
            doStackPush = typeof doStackPush === 'boolean' ? doStackPush : true;
            var tmpPageNumber = this.pdf.internal.getCurrentPageInfo().pageNumber;

            for (var i = 0; i < this.pdf.internal.getNumberOfPages(); i++) {
                this.pdf.setPage(i + 1);
                this.pdf.internal.out('q');
            }

            this.pdf.setPage(tmpPageNumber);

            if (doStackPush) {
                this.ctx.fontSize = this.pdf.internal.getFontSize();
                var ctx = new ContextLayer(this.ctx);
                this.ctxStack.push(this.ctx);
                this.ctx = ctx;
            }
        };
        /**
         * Returns previously saved path state and attributes
         * 
         * @name restore
         * @function
         */


        Context2D.prototype.restore = function (doStackPop) {
            doStackPop = typeof doStackPop === 'boolean' ? doStackPop : true;
            var tmpPageNumber = this.pdf.internal.getCurrentPageInfo().pageNumber;

            for (var i = 0; i < this.pdf.internal.getNumberOfPages(); i++) {
                this.pdf.setPage(i + 1);
                this.pdf.internal.out('Q');
            }

            this.pdf.setPage(tmpPageNumber);

            if (doStackPop && this.ctxStack.length !== 0) {
                this.ctx = this.ctxStack.pop();
                this.fillStyle = this.ctx.fillStyle;
                this.strokeStyle = this.ctx.strokeStyle;
                this.font = this.ctx.font;
                this.lineCap = this.ctx.lineCap;
                this.lineWidth = this.ctx.lineWidth;
                this.lineJoin = this.ctx.lineJoin;
            }
        };
        /** 
         * @name toDataURL
         * @function
         */


        Context2D.prototype.toDataURL = function () {
            throw new Error('toDataUrl not implemented.');
        }; //helper functions

        /**
         * Get the decimal values of r, g, b and a
         *
         * @name getRGBA
         * @function
         * @private
         * @ignore
         */


        var getRGBA = function getRGBA(style) {
            var rxRgb = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
            var rxRgba = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/;
            var rxTransparent = /transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/;
            var r, g, b, a;

            if (style.isCanvasGradient === true) {
                style = style.getColor();
            }

            if (!style) {
                return {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    style: style
                };
            }

            if (rxTransparent.test(style)) {
                r = 0;
                g = 0;
                b = 0;
                a = 0;
            } else {
                var matches = rxRgb.exec(style);

                if (matches !== null) {
                    r = parseInt(matches[1]);
                    g = parseInt(matches[2]);
                    b = parseInt(matches[3]);
                    a = 1;
                } else {
                    matches = rxRgba.exec(style);

                    if (matches !== null) {
                        r = parseInt(matches[1]);
                        g = parseInt(matches[2]);
                        b = parseInt(matches[3]);
                        a = parseFloat(matches[4]);
                    } else {
                        a = 1;

                        if (typeof style === "string" && style.charAt(0) !== '#') {
                            var rgbColor = new RGBColor(style);

                            if (rgbColor.ok) {
                                style = rgbColor.toHex();
                            } else {
                                style = '#000000';
                            }
                        }

                        if (style.length === 4) {
                            r = style.substring(1, 2);
                            r += r;
                            g = style.substring(2, 3);
                            g += g;
                            b = style.substring(3, 4);
                            b += b;
                        } else {
                            r = style.substring(1, 3);
                            g = style.substring(3, 5);
                            b = style.substring(5, 7);
                        }

                        r = parseInt(r, 16);
                        g = parseInt(g, 16);
                        b = parseInt(b, 16);
                    }
                }
            }

            return {
                r: r,
                g: g,
                b: b,
                a: a,
                style: style
            };
        };
        /**
         * @name isFillTransparent
         * @function 
         * @private
         * @ignore
         * @returns {Boolean}
         */


        var isFillTransparent = function isFillTransparent() {
            return this.ctx.isFillTransparent || this.globalAlpha == 0;
        };
        /**
         * @name isStrokeTransparent
         * @function 
         * @private
         * @ignore
         * @returns {Boolean}
         */


        var isStrokeTransparent = function isStrokeTransparent() {
            return Boolean(this.ctx.isStrokeTransparent || this.globalAlpha == 0);
        };
        /**
         * Draws "filled" text on the canvas
         * 
         * @name fillText
         * @function
         * @param text {String} Specifies the text that will be written on the canvas
         * @param x {Number} The x coordinate where to start painting the text (relative to the canvas)
         * @param y {Number} The y coordinate where to start painting the text (relative to the canvas)
         * @param maxWidth {Number} Optional. The maximum allowed width of the text, in pixels
         * @description The fillText() method draws filled text on the canvas. The default color of the text is black.
         */


        Context2D.prototype.fillText = function (text, x, y, maxWidth) {
            if (isNaN(x) || isNaN(y) || typeof text !== 'string') {
                console.error('jsPDF.context2d.fillText: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.fillText');
            }

            maxWidth = isNaN(maxWidth) ? undefined : maxWidth;

            if (isFillTransparent.call(this)) {
                return;
            }

            y = getBaseline.call(this, y);
            var degs = rad2deg(this.ctx.transform.rotation); // We only use X axis as scale hint 

            var scale = this.ctx.transform.scaleX;
            putText.call(this, {
                text: text,
                x: x,
                y: y,
                scale: scale,
                angle: degs,
                align: this.textAlign,
                maxWidth: maxWidth
            });
        };
        /**
         * Draws text on the canvas (no fill)
         * 
         * @name strokeText
         * @function
         * @param text {String} Specifies the text that will be written on the canvas
         * @param x {Number} The x coordinate where to start painting the text (relative to the canvas)
         * @param y {Number} The y coordinate where to start painting the text (relative to the canvas)
         * @param maxWidth {Number} Optional. The maximum allowed width of the text, in pixels
         * @description The strokeText() method draws text (with no fill) on the canvas. The default color of the text is black.
         */


        Context2D.prototype.strokeText = function (text, x, y, maxWidth) {
            if (isNaN(x) || isNaN(y) || typeof text !== 'string') {
                console.error('jsPDF.context2d.strokeText: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.strokeText');
            }

            if (isStrokeTransparent.call(this)) {
                return;
            }

            maxWidth = isNaN(maxWidth) ? undefined : maxWidth;
            y = getBaseline.call(this, y);
            var degs = rad2deg(this.ctx.transform.rotation);
            var scale = this.ctx.transform.scaleX;
            putText.call(this, {
                text: text,
                x: x,
                y: y,
                scale: scale,
                renderingMode: 'stroke',
                angle: degs,
                align: this.textAlign,
                maxWidth: maxWidth
            });
        };
        /**
         * Returns an object that contains the width of the specified text
         *
         * @name measureText
         * @function 
         * @param text {String} The text to be measured
         * @description The measureText() method returns an object that contains the width of the specified text, in pixels.
         * @returns {Number}
         */


        Context2D.prototype.measureText = function (text) {
            if (typeof text !== 'string') {
                console.error('jsPDF.context2d.measureText: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.measureText');
            }

            var pdf = this.pdf;
            var k = this.pdf.internal.scaleFactor;
            var fontSize = pdf.internal.getFontSize();
            var txtWidth = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;
            txtWidth *= Math.round(k * 96 / 72 * 10000) / 10000;

            var TextMetrics = function TextMetrics(options) {
                options = options || {};

                var _width = options.width || 0;

                Object.defineProperty(this, 'width', {
                    get: function get() {
                        return _width;
                    }
                });
                return this;
            };

            return new TextMetrics({
                width: txtWidth
            });
        }; //Transformations

        /**
         * Scales the current drawing bigger or smaller
         * 
         * @name scale 
         * @function
         * @param scalewidth {Number} Scales the width of the current drawing (1=100%, 0.5=50%, 2=200%, etc.)
         * @param scaleheight {Number} Scales the height of the current drawing (1=100%, 0.5=50%, 2=200%, etc.)
         * @description The scale() method scales the current drawing, bigger or smaller.
         */


        Context2D.prototype.scale = function (scalewidth, scaleheight) {
            if (isNaN(scalewidth) || isNaN(scaleheight)) {
                console.error('jsPDF.context2d.scale: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.scale');
            }

            var matrix = new Matrix(scalewidth, 0.0, 0.0, scaleheight, 0.0, 0.0);
            this.ctx.transform = this.ctx.transform.multiply(matrix);
        };
        /**
         * Rotates the current drawing
         * 
         * @name rotate
         * @function
         * @param angle {Number} The rotation angle, in radians.
         * @description To calculate from degrees to radians: degrees*Math.PI/180. <br />
         * Example: to rotate 5 degrees, specify the following: 5*Math.PI/180
         */


        Context2D.prototype.rotate = function (angle) {
            if (isNaN(angle)) {
                console.error('jsPDF.context2d.rotate: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.rotate');
            }

            var matrix = new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0.0, 0.0);
            this.ctx.transform = this.ctx.transform.multiply(matrix);
        };
        /**
         * Remaps the (0,0) position on the canvas
         * 
         * @name translate
         * @function
         * @param x {Number} The value to add to horizontal (x) coordinates
         * @param y {Number} The value to add to vertical (y) coordinates
         * @description The translate() method remaps the (0,0) position on the canvas.
         */


        Context2D.prototype.translate = function (x, y) {
            if (isNaN(x) || isNaN(y)) {
                console.error('jsPDF.context2d.translate: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.translate');
            }

            var matrix = new Matrix(1.0, 0.0, 0.0, 1.0, x, y);
            this.ctx.transform = this.ctx.transform.multiply(matrix);
        };
        /**
         * Replaces the current transformation matrix for the drawing
         * 
         * @name transform
         * @function
         * @param a {Number} Horizontal scaling
         * @param b {Number} Horizontal skewing
         * @param c {Number} Vertical skewing
         * @param d {Number} Vertical scaling
         * @param e {Number} Horizontal moving
         * @param f {Number} Vertical moving
         * @description Each object on the canvas has a current transformation matrix.<br /><br />The transform() method replaces the current transformation matrix. It multiplies the current transformation matrix with the matrix described by:<br /><br /><br /><br />a    c    e<br /><br />b    d    f<br /><br />0    0    1<br /><br />In other words, the transform() method lets you scale, rotate, move, and skew the current context.
         */


        Context2D.prototype.transform = function (a, b, c, d, e, f) {
            if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
                console.error('jsPDF.context2d.transform: Invalid arguments', arguments);
                throw new Error('Invalid arguments passed to jsPDF.context2d.transform');
            }

            var matrix = new Matrix(a, b, c, d, e, f);
            this.ctx.transform = this.ctx.transform.multiply(matrix);
        };
        /**
         * Resets the current transform to the identity matrix. Then runs transform()
         * 
         * @name setTransform
         * @function
         * @param a {Number} Horizontal scaling
         * @param b {Number} Horizontal skewing
         * @param c {Number} Vertical skewing
         * @param d {Number} Vertical scaling
         * @param e {Number} Horizontal moving
         * @param f {Number} Vertical moving
         * @description Each object on the canvas has a current transformation matrix. <br /><br />The setTransform() method resets the current transform to the identity matrix, and then runs transform() with the same arguments.<br /><br />In other words, the setTransform() method lets you scale, rotate, move, and skew the current context.
         */


        Context2D.prototype.setTransform = function (a, b, c, d, e, f) {
            a = isNaN(a) ? 1 : a;
            b = isNaN(b) ? 0 : b;
            c = isNaN(c) ? 0 : c;
            d = isNaN(d) ? 1 : d;
            e = isNaN(e) ? 0 : e;
            f = isNaN(f) ? 0 : f;
            this.ctx.transform = new Matrix(a, b, c, d, e, f);
        };
        /**
         * Draws an image, canvas, or video onto the canvas
         * 
         * @function 
         * @param img {} Specifies the image, canvas, or video element to use
         * @param sx {Number} Optional. The x coordinate where to start clipping
         * @param sy {Number} Optional. The y coordinate where to start clipping
         * @param swidth {Number} Optional. The width of the clipped image
         * @param sheight {Number} Optional. The height of the clipped image
         * @param x {Number} The x coordinate where to place the image on the canvas
         * @param y {Number} The y coordinate where to place the image on the canvas
         * @param width {Number} Optional. The width of the image to use (stretch or reduce the image)
         * @param height {Number} Optional. The height of the image to use (stretch or reduce the image)
         */


        Context2D.prototype.drawImage = function (img, sx, sy, swidth, sheight, x, y, width, height) {
            var imageProperties = this.pdf.getImageProperties(img);
            var factorX = 1;
            var factorY = 1;
            var clipFactorX = 1;
            var clipFactorY = 1;
            var scaleFactorX = 1;

            if (typeof swidth !== 'undefined' && typeof width !== 'undefined') {
                clipFactorX = width / swidth;
                clipFactorY = height / sheight;
                factorX = imageProperties.width / swidth * width / swidth;
                factorY = imageProperties.height / sheight * height / sheight;
            } //is sx and sy are set and x and y not, set x and y with values of sx and sy


            if (typeof x === 'undefined') {
                x = sx;
                y = sy;
                sx = 0;
                sy = 0;
            }

            if (typeof swidth !== 'undefined' && typeof width === 'undefined') {
                width = swidth;
                height = sheight;
            }

            if (typeof swidth === 'undefined' && typeof width === 'undefined') {
                width = imageProperties.width;
                height = imageProperties.height;
            }

            var decomposedTransformationMatrix = this.ctx.transform.decompose();
            var angle = rad2deg(decomposedTransformationMatrix.rotate.shx);
            scaleFactorX = decomposedTransformationMatrix.scale.sx;
            scaleFactorX = decomposedTransformationMatrix.scale.sy;
            var matrix = new Matrix();
            matrix = matrix.multiply(decomposedTransformationMatrix.translate);
            matrix = matrix.multiply(decomposedTransformationMatrix.skew);
            matrix = matrix.multiply(decomposedTransformationMatrix.scale);
            var mP = matrix.applyToPoint(new Point(width, height));
            var xRect = matrix.applyToRectangle(new Rectangle(x - sx * clipFactorX, y - sy * clipFactorY, swidth * factorX, sheight * factorY));
            var pageArray = getPagesByPath.call(this, xRect);
            var pages = [];

            for (var ii = 0; ii < pageArray.length; ii += 1) {
                if (pages.indexOf(pageArray[ii]) === -1) {
                    pages.push(pageArray[ii]);
                }
            }

            pages.sort();
            var clipPath;

            if (this.autoPaging) {
                var min = pages[0];
                var max = pages[pages.length - 1];

                for (var i = min; i < max + 1; i++) {
                    this.pdf.setPage(i);

                    if (this.ctx.clip_path.length !== 0) {
                        var tmpPaths = this.path;
                        clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
                        this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
                        drawPaths.call(this, 'fill', true);
                        this.path = tmpPaths;
                    }

                    var tmpRect = JSON.parse(JSON.stringify(xRect));
                    tmpRect = pathPositionRedo([tmpRect], this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY)[0];
                    this.pdf.addImage(img, 'jpg', tmpRect.x, tmpRect.y, tmpRect.w, tmpRect.h, null, null, angle);
                }
            } else {
                this.pdf.addImage(img, 'jpg', xRect.x, xRect.y, xRect.w, xRect.h, null, null, angle);
            }
        };

        var getPagesByPath = function getPagesByPath(path, pageWrapX, pageWrapY) {
            var result = [];
            pageWrapX = pageWrapX || this.pdf.internal.pageSize.width;
            pageWrapY = pageWrapY || this.pdf.internal.pageSize.height;

            switch (path.type) {
                default:
                case 'mt':
                case 'lt':
                    result.push(Math.floor((path.y + this.posY) / pageWrapY) + 1);
                    break;

                case 'arc':
                    result.push(Math.floor((path.y + this.posY - path.radius) / pageWrapY) + 1);
                    result.push(Math.floor((path.y + this.posY + path.radius) / pageWrapY) + 1);
                    break;

                case 'qct':
                    var rectOfQuadraticCurve = getQuadraticCurveBoundary(this.ctx.lastPoint.x, this.ctx.lastPoint.y, path.x1, path.y1, path.x, path.y);
                    result.push(Math.floor(rectOfQuadraticCurve.y / pageWrapY) + 1);
                    result.push(Math.floor((rectOfQuadraticCurve.y + rectOfQuadraticCurve.h) / pageWrapY) + 1);
                    break;

                case 'bct':
                    var rectOfBezierCurve = getBezierCurveBoundary(this.ctx.lastPoint.x, this.ctx.lastPoint.y, path.x1, path.y1, path.x2, path.y2, path.x, path.y);
                    result.push(Math.floor(rectOfBezierCurve.y / pageWrapY) + 1);
                    result.push(Math.floor((rectOfBezierCurve.y + rectOfBezierCurve.h) / pageWrapY) + 1);
                    break;

                case 'rect':
                    result.push(Math.floor((path.y + this.posY) / pageWrapY) + 1);
                    result.push(Math.floor((path.y + path.h + this.posY) / pageWrapY) + 1);
            }

            for (var i = 0; i < result.length; i += 1) {
                while (this.pdf.internal.getNumberOfPages() < result[i]) {
                    addPage.call(this);
                }
            }

            return result;
        };

        var addPage = function addPage() {
            var fillStyle = this.fillStyle;
            var strokeStyle = this.strokeStyle;
            var font = this.font;
            var lineCap = this.lineCap;
            var lineWidth = this.lineWidth;
            var lineJoin = this.lineJoin;
            this.pdf.addPage();
            this.fillStyle = fillStyle;
            this.strokeStyle = strokeStyle;
            this.font = font;
            this.lineCap = lineCap;
            this.lineWidth = lineWidth;
            this.lineJoin = lineJoin;
        };

        var pathPositionRedo = function pathPositionRedo(paths, x, y) {
            for (var i = 0; i < paths.length; i++) {
                switch (paths[i].type) {
                    case 'bct':
                        paths[i].x2 += x;
                        paths[i].y2 += y;

                    case 'qct':
                        paths[i].x1 += x;
                        paths[i].y1 += y;

                    case 'mt':
                    case 'lt':
                    case 'arc':
                    default:
                        paths[i].x += x;
                        paths[i].y += y;
                }
            }

            return paths;
        };

        var pathPreProcess = function pathPreProcess(rule, isClip) {
            var fillStyle = this.fillStyle;
            var strokeStyle = this.strokeStyle;
            var font = this.font;
            var lineCap = this.lineCap;
            var lineWidth = this.lineWidth;
            var lineJoin = this.lineJoin;
            var origPath = JSON.parse(JSON.stringify(this.path));
            var xPath = JSON.parse(JSON.stringify(this.path));
            var clipPath;
            var tmpPath;
            var pages = [];

            for (var i = 0; i < xPath.length; i++) {
                if (typeof xPath[i].x !== "undefined") {
                    var page = getPagesByPath.call(this, xPath[i]);

                    for (var ii = 0; ii < page.length; ii += 1) {
                        if (pages.indexOf(page[ii]) === -1) {
                            pages.push(page[ii]);
                        }
                    }
                }
            }

            for (var i = 0; i < pages.length; i++) {
                while (this.pdf.internal.getNumberOfPages() < pages[i]) {
                    addPage.call(this);
                }
            }

            pages.sort();

            if (this.autoPaging) {
                var min = pages[0];
                var max = pages[pages.length - 1];

                for (var i = min; i < max + 1; i++) {
                    this.pdf.setPage(i);
                    this.fillStyle = fillStyle;
                    this.strokeStyle = strokeStyle;
                    this.lineCap = lineCap;
                    this.lineWidth = lineWidth;
                    this.lineJoin = lineJoin;

                    if (this.ctx.clip_path.length !== 0) {
                        var tmpPaths = this.path;
                        clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
                        this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
                        drawPaths.call(this, rule, true);
                        this.path = tmpPaths;
                    }

                    tmpPath = JSON.parse(JSON.stringify(origPath));
                    this.path = pathPositionRedo(tmpPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);

                    if (isClip === false || i === 0) {
                        drawPaths.call(this, rule, isClip);
                    }
                }
            } else {
                drawPaths.call(this, rule, isClip);
            }

            this.path = origPath;
        };
        /**
         * Processes the paths
         *
         * @function 
         * @param rule {String}
         * @param isClip {Boolean}
         * @private
         * @ignore
         */


        var drawPaths = function drawPaths(rule, isClip) {
            if (rule === 'stroke' && !isClip && isStrokeTransparent.call(this)) {
                return;
            }

            if (rule !== 'stroke' && !isClip && isFillTransparent.call(this)) {
                return;
            }

            var moves = [];
            var alpha = this.ctx.globalAlpha;

            if (this.ctx.fillOpacity < 1) {
                alpha = this.ctx.fillOpacity;
            }

            var xPath = this.path;

            for (var i = 0; i < xPath.length; i++) {
                var pt = xPath[i];

                switch (pt.type) {
                    case 'begin':
                        moves.push({
                            begin: true
                        });
                        break;

                    case 'close':
                        moves.push({
                            close: true
                        });
                        break;

                    case 'mt':
                        moves.push({
                            start: pt,
                            deltas: [],
                            abs: []
                        });
                        break;

                    case 'lt':
                        var iii = moves.length;

                        if (!isNaN(xPath[i - 1].x)) {
                            var delta = [pt.x - xPath[i - 1].x, pt.y - xPath[i - 1].y];

                            if (iii > 0) {
                                for (iii; iii >= 0; iii--) {
                                    if (moves[iii - 1].close !== true && moves[iii - 1].begin !== true) {
                                        moves[iii - 1].deltas.push(delta);
                                        moves[iii - 1].abs.push(pt);
                                        break;
                                    }
                                }
                            }
                        }

                        break;

                    case 'bct':
                        var delta = [pt.x1 - xPath[i - 1].x, pt.y1 - xPath[i - 1].y, pt.x2 - xPath[i - 1].x, pt.y2 - xPath[i - 1].y, pt.x - xPath[i - 1].x, pt.y - xPath[i - 1].y];
                        moves[moves.length - 1].deltas.push(delta);
                        break;

                    case 'qct':
                        var x1 = xPath[i - 1].x + 2.0 / 3.0 * (pt.x1 - xPath[i - 1].x);
                        var y1 = xPath[i - 1].y + 2.0 / 3.0 * (pt.y1 - xPath[i - 1].y);
                        var x2 = pt.x + 2.0 / 3.0 * (pt.x1 - pt.x);
                        var y2 = pt.y + 2.0 / 3.0 * (pt.y1 - pt.y);
                        var x3 = pt.x;
                        var y3 = pt.y;
                        var delta = [x1 - xPath[i - 1].x, y1 - xPath[i - 1].y, x2 - xPath[i - 1].x, y2 - xPath[i - 1].y, x3 - xPath[i - 1].x, y3 - xPath[i - 1].y];
                        moves[moves.length - 1].deltas.push(delta);
                        break;

                    case 'arc':
                        moves.push({
                            deltas: [],
                            abs: [],
                            arc: true
                        });

                        if (Array.isArray(moves[moves.length - 1].abs)) {
                            moves[moves.length - 1].abs.push(pt);
                        }

                        break;
                }
            }

            var style;

            if (!isClip) {
                if (rule === 'stroke') {
                    style = 'stroke';
                } else {
                    style = 'fill';
                }
            } else {
                style = null;
            }

            for (var i = 0; i < moves.length; i++) {
                if (moves[i].arc) {
                    var arcs = moves[i].abs;

                    for (var ii = 0; ii < arcs.length; ii++) {
                        var arc = arcs[ii];

                        if (typeof arc.startAngle !== 'undefined') {
                            var start = rad2deg(arc.startAngle);
                            var end = rad2deg(arc.endAngle);
                            var x = arc.x;
                            var y = arc.y;
                            drawArc.call(this, x, y, arc.radius, start, end, arc.counterclockwise, style, isClip);
                        } else {
                            drawLine.call(this, arc.x, arc.y);
                        }
                    }
                }

                if (!moves[i].arc) {
                    if (moves[i].close !== true && moves[i].begin !== true) {
                        var x = moves[i].start.x;
                        var y = moves[i].start.y;
                        drawLines.call(this, moves[i].deltas, x, y, null, null);
                    }
                }
            }

            if (style) {
                putStyle.call(this, style);
            }

            if (isClip) {
                doClip.call(this);
            }
        };

        var getBaseline = function getBaseline(y) {
            var height = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor;
            var descent = height * (this.pdf.internal.getLineHeightFactor() - 1);

            switch (this.ctx.textBaseline) {
                case 'bottom':
                    return y - descent;

                case 'top':
                    return y + height - descent;

                case 'hanging':
                    return y + height - 2 * descent;

                case 'middle':
                    return y + height / 2 - descent;

                case 'ideographic':
                    // TODO not implemented
                    return y;

                case 'alphabetic':
                default:
                    return y;
            }
        };

        Context2D.prototype.createLinearGradient = function createLinearGradient() {
            var canvasGradient = function canvasGradient() {};

            canvasGradient.colorStops = [];

            canvasGradient.addColorStop = function (offset, color) {
                this.colorStops.push([offset, color]);
            };

            canvasGradient.getColor = function () {
                if (this.colorStops.length === 0) {
                    return '#000000';
                }

                return this.colorStops[0][1];
            };

            canvasGradient.isCanvasGradient = true;
            return canvasGradient;
        };

        Context2D.prototype.createPattern = function createPattern() {
            return this.createLinearGradient();
        };

        Context2D.prototype.createRadialGradient = function createRadialGradient() {
            return this.createLinearGradient();
        };
        /**
         *
         * @param x Edge point X
         * @param y Edge point Y
         * @param r Radius
         * @param a1 start angle
         * @param a2 end angle
         * @param counterclockwise
         * @param style
         * @param isClip
         */


        var drawArc = function drawArc(x, y, r, a1, a2, counterclockwise, style, isClip) {
            var k = this.pdf.internal.scaleFactor;
            var a1r = deg2rad(a1);
            var a2r = deg2rad(a2);
            var curves = createArc.call(this, r, a1r, a2r, counterclockwise);

            for (var i = 0; i < curves.length; i++) {
                var curve = curves[i];

                if (i === 0) {
                    doMove.call(this, curve.x1 + x, curve.y1 + y);
                }
                drawCurve.call(this, x, y, curve.x2, curve.y2, curve.x3, curve.y3, curve.x4, curve.y4);
            }

            if (!isClip) {
                putStyle.call(this, style);
            } else {
                doClip.call(this);
            }
        };

        var putStyle = function putStyle(style) {
            switch (style) {
                case 'stroke':
                    this.pdf.internal.out('S');
                    break;

                case 'fill':
                    this.pdf.internal.out('f');
                    break;
            }
        };

        var doClip = function doClip() {
            this.pdf.clip();
        };

        var doMove = function doMove(x, y) {
            this.pdf.internal.out(getHorizontalCoordinateString(x) + ' ' + getVerticalCoordinateString(y) + ' m');
        };

        var putText = function putText(options) {
            var textAlign;

            switch (options.align) {
                case 'right':
                case 'end':
                    textAlign = 'right';
                    break;

                case 'center':
                    textAlign = 'center';
                    break;

                case 'left':
                case 'start':
                default:
                    textAlign = 'left';
                    break;
            }

            var pt = this.ctx.transform.applyToPoint(new Point(options.x, options.y));
            var decomposedTransformationMatrix = this.ctx.transform.decompose();
            var matrix = new Matrix();
            matrix = matrix.multiply(decomposedTransformationMatrix.translate);
            matrix = matrix.multiply(decomposedTransformationMatrix.skew);
            matrix = matrix.multiply(decomposedTransformationMatrix.scale);
            var textDimensions = this.pdf.getTextDimensions(options.text);
            var textRect = this.ctx.transform.applyToRectangle(new Rectangle(options.x, options.y, textDimensions.w, textDimensions.h));
            var textXRect = matrix.applyToRectangle(new Rectangle(options.x, options.y - textDimensions.h, textDimensions.w, textDimensions.h));
            var pageArray = getPagesByPath.call(this, textXRect);
            var pages = [];

            for (var ii = 0; ii < pageArray.length; ii += 1) {
                if (pages.indexOf(pageArray[ii]) === -1) {
                    pages.push(pageArray[ii]);
                }
            }

            pages.sort();
            var clipPath;

            if (this.autoPaging === true) {
                var min = pages[0];
                var max = pages[pages.length - 1];

                for (var i = min; i < max + 1; i++) {
                    this.pdf.setPage(i);

                    if (this.ctx.clip_path.length !== 0) {
                        var tmpPaths = this.path;
                        clipPath = JSON.parse(JSON.stringify(this.ctx.clip_path));
                        this.path = pathPositionRedo(clipPath, this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY);
                        drawPaths.call(this, 'fill', true);
                        this.path = tmpPaths;
                    }

                    var tmpRect = JSON.parse(JSON.stringify(textRect));
                    tmpRect = pathPositionRedo([tmpRect], this.posX, -1 * this.pdf.internal.pageSize.height * (i - 1) + this.posY)[0];

                    if (options.scale >= 0.01) {
                        var oldSize = this.pdf.internal.getFontSize();
                        this.pdf.setFontSize(oldSize * options.scale);
                    }

                    this.pdf.text(options.text, tmpRect.x, tmpRect.y, {
                        angle: options.angle,
                        align: textAlign,
                        renderingMode: options.renderingMode,
                        maxWidth: options.maxWidth
                    });

                    if (options.scale >= 0.01) {
                        this.pdf.setFontSize(oldSize);
                    }
                }
            } else {
                if (options.scale >= 0.01) {
                    var oldSize = this.pdf.internal.getFontSize();
                    this.pdf.setFontSize(oldSize * options.scale);
                }

                this.pdf.text(options.text, pt.x + this.posX, pt.y + this.posY, {
                    angle: options.angle,
                    align: textAlign,
                    renderingMode: options.renderingMode,
                    maxWidth: options.maxWidth
                });

                if (options.scale >= 0.01) {
                    this.pdf.setFontSize(oldSize);
                }
            }
        };

        var drawLine = function drawLine(x, y, prevX, prevY) {
            prevX = prevX || 0;
            prevY = prevY || 0;
            this.pdf.internal.out(getHorizontalCoordinateString(x + prevX) + ' ' + getVerticalCoordinateString(y + prevY) + ' l');
        };

        var drawLines = function drawLines(lines, x, y) {
            return this.pdf.lines(lines, x, y, null, null);
        };

        var drawCurve = function drawCurve(x, y, x1, y1, x2, y2, x3, y3) {
            this.pdf.internal.out([f2(getHorizontalCoordinate(x1 + x)), f2(getVerticalCoordinate(y1 + y)), f2(getHorizontalCoordinate(x2 + x)), f2(getVerticalCoordinate(y2 + y)), f2(getHorizontalCoordinate(x3 + x)), f2(getVerticalCoordinate(y3 + y)), 'c'].join(' '));
        };
        /**
         * Return a array of objects that represent bezier curves which approximate the circular arc centered at the origin, from startAngle to endAngle (radians) with the specified radius.
         *
         * Each bezier curve is an object with four points, where x1,y1 and x4,y4 are the arc's end points and x2,y2 and x3,y3 are the cubic bezier's control points.
         * @function createArc
         */


        var createArc = function createArc(radius, startAngle, endAngle, anticlockwise) {
            var EPSILON = 0.00001; // Roughly 1/1000th of a degree, see below        // normalize startAngle, endAngle to [-2PI, 2PI]

            var twoPI = Math.PI * 2;
            var startAngleN = startAngle;

            if (startAngleN < twoPI || startAngleN > twoPI) {
                startAngleN = startAngleN % twoPI;
            }

            var endAngleN = endAngle;

            if (endAngleN < twoPI || endAngleN > twoPI) {
                endAngleN = endAngleN % twoPI;
            } // Compute the sequence of arc curves, up to PI/2 at a time.        // Total arc angle is less than 2PI.


            var curves = [];
            var piOverTwo = Math.PI / 2.0; //var sgn = (startAngle < endAngle) ? +1 : -1; // clockwise or counterclockwise

            var sgn = anticlockwise ? -1 : +1;
            var a1 = startAngle;

            for (var totalAngle = Math.min(twoPI, Math.abs(endAngleN - startAngleN)); totalAngle > EPSILON;) {
                var a2 = a1 + sgn * Math.min(totalAngle, piOverTwo);
                curves.push(createSmallArc.call(this, radius, a1, a2));
                totalAngle -= Math.abs(a2 - a1);
                a1 = a2;
            }

            return curves;
        };
        /**
         * Cubic bezier approximation of a circular arc centered at the origin, from (radians) a1 to a2, where a2-a1 < pi/2. The arc's radius is r.
         *
         * Returns an object with four points, where x1,y1 and x4,y4 are the arc's end points and x2,y2 and x3,y3 are the cubic bezier's control points.
         *
         * This algorithm is based on the approach described in: A. Riškus, "Approximation of a Cubic Bezier Curve by Circular Arcs and Vice Versa," Information Technology and Control, 35(4), 2006 pp. 371-378.
         */


        var createSmallArc = function createSmallArc(r, a1, a2) {
            var a = (a2 - a1) / 2.0;
            var x4 = r * Math.cos(a);
            var y4 = r * Math.sin(a);
            var x1 = x4;
            var y1 = -y4;
            var q1 = x1 * x1 + y1 * y1;
            var q2 = q1 + x1 * x4 + y1 * y4;
            var k2 = 4 / 3 * (Math.sqrt(2 * q1 * q2) - q2) / (x1 * y4 - y1 * x4);
            var x2 = x1 - k2 * y1;
            var y2 = y1 + k2 * x1;
            var x3 = x2;
            var y3 = -y2;
            var ar = a + a1;
            var cos_ar = Math.cos(ar);
            var sin_ar = Math.sin(ar);
            return {
                x1: r * Math.cos(a1),
                y1: r * Math.sin(a1),
                x2: x2 * cos_ar - y2 * sin_ar,
                y2: x2 * sin_ar + y2 * cos_ar,
                x3: x3 * cos_ar - y3 * sin_ar,
                y3: x3 * sin_ar + y3 * cos_ar,
                x4: r * Math.cos(a2),
                y4: r * Math.sin(a2)
            };
        };

        var rad2deg = function rad2deg(value) {
            return value * 180 / Math.PI;
        };

        var deg2rad = function deg2rad(deg) {
            return deg * Math.PI / 180;
        };

        var getQuadraticCurveBoundary = function getQuadraticCurveBoundary(sx, sy, cpx, cpy, ex, ey) {
            var midX1 = sx + (cpx - sx) * 0.50;
            var midY1 = sy + (cpy - sy) * 0.50;
            var midX2 = ex + (cpx - ex) * 0.50;
            var midY2 = ey + (cpy - ey) * 0.50;
            var resultX1 = Math.min(sx, ex, midX1, midX2);
            var resultX2 = Math.max(sx, ex, midX1, midX2);
            var resultY1 = Math.min(sy, ey, midY1, midY2);
            var resultY2 = Math.max(sy, ey, midY1, midY2);
            return new Rectangle(resultX1, resultY1, resultX2 - resultX1, resultY2 - resultY1);
        }; //De Casteljau algorithm


        var getBezierCurveBoundary = function getBezierCurveBoundary(ax, ay, bx, by, cx, cy, dx, dy) {
            var tobx = bx - ax;
            var toby = by - ay;
            var tocx = cx - bx;
            var tocy = cy - by;
            var todx = dx - cx;
            var tody = dy - cy;
            var precision = 40;
            var d, px, py, qx, qy, rx, ry, tx, ty, sx, sy, x, y, i, minx, miny, maxx, maxy, toqx, toqy, torx, tory, totx, toty;

            for (var i = 0; i < precision + 1; i++) {
                d = i / precision;
                px = ax + d * tobx;
                py = ay + d * toby;
                qx = bx + d * tocx;
                qy = by + d * tocy;
                rx = cx + d * todx;
                ry = cy + d * tody;
                toqx = qx - px;
                toqy = qy - py;
                torx = rx - qx;
                tory = ry - qy;
                sx = px + d * toqx;
                sy = py + d * toqy;
                tx = qx + d * torx;
                ty = qy + d * tory;
                totx = tx - sx;
                toty = ty - sy;
                x = sx + d * totx;
                y = sy + d * toty;

                if (i == 0) {
                    minx = x;
                    miny = y;
                    maxx = x;
                    maxy = y;
                } else {
                    minx = Math.min(minx, x);
                    miny = Math.min(miny, y);
                    maxx = Math.max(maxx, x);
                    maxy = Math.max(maxy, y);
                }
            }

            return new Rectangle(Math.round(minx), Math.round(miny), Math.round(maxx - minx), Math.round(maxy - miny));
        };

        var Point = function Point(x, y) {
            var _x = x || 0;

            Object.defineProperty(this, 'x', {
                enumerable: true,
                get: function get() {
                    return _x;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _x = parseFloat(value);
                    }
                }
            });

            var _y = y || 0;

            Object.defineProperty(this, 'y', {
                enumerable: true,
                get: function get() {
                    return _y;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _y = parseFloat(value);
                    }
                }
            });
            var _type = 'pt';
            Object.defineProperty(this, 'type', {
                enumerable: true,
                get: function get() {
                    return _type;
                },
                set: function set(value) {
                    _type = value.toString();
                }
            });
            return this;
        };

        var Rectangle = function Rectangle(x, y, w, h) {
            Point.call(this, x, y);
            this.type = 'rect';

            var _w = w || 0;

            Object.defineProperty(this, 'w', {
                enumerable: true,
                get: function get() {
                    return _w;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _w = parseFloat(value);
                    }
                }
            });

            var _h = h || 0;

            Object.defineProperty(this, 'h', {
                enumerable: true,
                get: function get() {
                    return _h;
                },
                set: function set(value) {
                    if (!isNaN(value)) {
                        _h = parseFloat(value);
                    }
                }
            });
            return this;
        };

        var Matrix = function Matrix(sx, shy, shx, sy, tx, ty) {
            var _matrix = [];
            Object.defineProperty(this, 'sx', {
                get: function get() {
                    return _matrix[0];
                },
                set: function set(value) {
                    _matrix[0] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'shy', {
                get: function get() {
                    return _matrix[1];
                },
                set: function set(value) {
                    _matrix[1] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'shx', {
                get: function get() {
                    return _matrix[2];
                },
                set: function set(value) {
                    _matrix[2] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'sy', {
                get: function get() {
                    return _matrix[3];
                },
                set: function set(value) {
                    _matrix[3] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'tx', {
                get: function get() {
                    return _matrix[4];
                },
                set: function set(value) {
                    _matrix[4] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'ty', {
                get: function get() {
                    return _matrix[5];
                },
                set: function set(value) {
                    _matrix[5] = Math.round(value * 100000) / 100000;
                }
            });
            Object.defineProperty(this, 'rotation', {
                get: function get() {
                    return Math.atan2(this.shx, this.sx);
                }
            });
            Object.defineProperty(this, 'scaleX', {
                get: function get() {
                    return this.decompose().scale.sx;
                }
            });
            Object.defineProperty(this, 'scaleY', {
                get: function get() {
                    return this.decompose().scale.sy;
                }
            });
            Object.defineProperty(this, 'isIdentity', {
                get: function get() {
                    if (this.sx !== 1) {
                        return false;
                    }

                    if (this.shy !== 0) {
                        return false;
                    }

                    if (this.shx !== 0) {
                        return false;
                    }

                    if (this.sy !== 1) {
                        return false;
                    }

                    if (this.tx !== 0) {
                        return false;
                    }

                    if (this.ty !== 0) {
                        return false;
                    }

                    return true;
                }
            });
            this.sx = !isNaN(sx) ? sx : 1;
            this.shy = !isNaN(shy) ? shy : 0;
            this.shx = !isNaN(shx) ? shx : 0;
            this.sy = !isNaN(sy) ? sy : 1;
            this.tx = !isNaN(tx) ? tx : 0;
            this.ty = !isNaN(ty) ? ty : 0;
            return this;
        };
        /**
         * Multiply the matrix with given Matrix
         * 
         * @function multiply
         * @param matrix
         * @returns {Matrix}
         * @private
         * @ignore
         */


        Matrix.prototype.multiply = function (matrix) {
            var sx = matrix.sx * this.sx + matrix.shy * this.shx;
            var shy = matrix.sx * this.shy + matrix.shy * this.sy;
            var shx = matrix.shx * this.sx + matrix.sy * this.shx;
            var sy = matrix.shx * this.shy + matrix.sy * this.sy;
            var tx = matrix.tx * this.sx + matrix.ty * this.shx + this.tx;
            var ty = matrix.tx * this.shy + matrix.ty * this.sy + this.ty;
            return new Matrix(sx, shy, shx, sy, tx, ty);
        };
        /**
         * @function decompose
         * @private
         * @ignore
         */


        Matrix.prototype.decompose = function () {
            var a = this.sx;
            var b = this.shy;
            var c = this.shx;
            var d = this.sy;
            var e = this.tx;
            var f = this.ty;
            var scaleX = Math.sqrt(a * a + b * b);
            a /= scaleX;
            b /= scaleX;
            var shear = a * c + b * d;
            c -= a * shear;
            d -= b * shear;
            var scaleY = Math.sqrt(c * c + d * d);
            c /= scaleY;
            d /= scaleY;
            shear /= scaleY;

            if (a * d < b * c) {
                a = -a;
                b = -b;
                shear = -shear;
                scaleX = -scaleX;
            }

            return {
                scale: new Matrix(scaleX, 0, 0, scaleY, 0, 0),
                translate: new Matrix(1, 0, 0, 1, e, f),
                rotate: new Matrix(a, b, -b, a, 0, 0),
                skew: new Matrix(1, 0, shear, 1, 0, 0)
            };
        };
        /**
         * @function applyToPoint
         * @private
         * @ignore
         */


        Matrix.prototype.applyToPoint = function (pt) {
            var x = pt.x * this.sx + pt.y * this.shx + this.tx;
            var y = pt.x * this.shy + pt.y * this.sy + this.ty;
            return new Point(x, y);
        };
        /**
         * @function applyToRectangle
         * @private
         * @ignore
         */


        Matrix.prototype.applyToRectangle = function (rect) {
            var pt1 = this.applyToPoint(rect);
            var pt2 = this.applyToPoint(new Point(rect.x + rect.w, rect.y + rect.h));
            return new Rectangle(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
        };
        /**
         * @function clone
         * @private
         * @ignore
         */


        Matrix.prototype.clone = function () {
            var sx = this.sx;
            var shy = this.shy;
            var shx = this.shx;
            var sy = this.sy;
            var tx = this.tx;
            var ty = this.ty;
            return new Matrix(sx, shy, shx, sy, tx, ty);
        };
    })(jsPDF.API, typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || Function('return typeof this === "object" && this.content')() || Function('return this')());


    /**
     * Copyright (c) 2018 Erik Koopmans
     * Released under the MIT License.
     *
     * Licensed under the MIT License.
     * http://opensource.org/licenses/mit-license
     */

    /**
     * jsPDF html PlugIn
     *
     * @name html
     * @module
     */
    (function (jsPDFAPI, global) {
        /**
         * Determine the type of a variable/object.
         * 
         * @private
         * @ignore
         */

        var objType = function objType(obj) {
            var type = _typeof(obj);

            if (type === 'undefined') return 'undefined';
            else if (type === 'string' || obj instanceof String) return 'string';
            else if (type === 'number' || obj instanceof Number) return 'number';
            else if (type === 'function' || obj instanceof Function) return 'function';
            else if (!!obj && obj.constructor === Array) return 'array';
            else if (obj && obj.nodeType === 1) return 'element';
            else if (type === 'object') return 'object';
            else return 'unknown';
        };
        /**
         * Create an HTML element with optional className, innerHTML, and style.
         * 
         * @private
         * @ignore
         */


        var createElement = function createElement(tagName, opt) {
            var el = document.createElement(tagName);
            if (opt.className) el.className = opt.className;

            if (opt.innerHTML) {
                el.innerHTML = opt.innerHTML;
                var scripts = el.getElementsByTagName('script');

                for (var i = scripts.length; i-- > 0; null) {
                    scripts[i].parentNode.removeChild(scripts[i]);
                }
            }

            for (var key in opt.style) {
                el.style[key] = opt.style[key];
            }

            return el;
        };
        /**
         * Deep-clone a node and preserve contents/properties.
         * 
         * @private
         * @ignore
         */


        var cloneNode = function cloneNode(node, javascriptEnabled) {
            // Recursively clone the node.
            var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

            for (var child = node.firstChild; child; child = child.nextSibling) {
                if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
                    clone.appendChild(cloneNode(child, javascriptEnabled));
                }
            }

            if (node.nodeType === 1) {
                // Preserve contents/properties of special nodes.
                if (node.nodeName === 'CANVAS') {
                    clone.width = node.width;
                    clone.height = node.height;
                    clone.getContext('2d').drawImage(node, 0, 0);
                } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
                    clone.value = node.value;
                } // Preserve the node's scroll position when it loads.


                clone.addEventListener('load', function () {
                    clone.scrollTop = node.scrollTop;
                    clone.scrollLeft = node.scrollLeft;
                }, true);
            } // Return the cloned node.


            return clone;
        };
        /* ----- CONSTRUCTOR ----- */


        var Worker = function Worker(opt) {
            // Create the root parent for the proto chain, and the starting Worker.
            var root = Object.assign(Worker.convert(Promise.resolve()), JSON.parse(JSON.stringify(Worker.template)));
            var self = Worker.convert(Promise.resolve(), root); // Set progress, optional settings, and return.

            self = self.setProgress(1, Worker, 1, [Worker]);
            self = self.set(opt);
            return self;
        }; // Boilerplate for subclassing Promise.


        Worker.prototype = Object.create(Promise.prototype);
        Worker.prototype.constructor = Worker; // Converts/casts promises into Workers.

        Worker.convert = function convert(promise, inherit) {
            // Uses prototypal inheritance to receive changes made to ancestors' properties.
            promise.__proto__ = inherit || Worker.prototype;
            return promise;
        };

        Worker.template = {
            prop: {
                src: null,
                container: null,
                overlay: null,
                canvas: null,
                img: null,
                pdf: null,
                pageSize: null,
                callback: function callback() {}
            },
            progress: {
                val: 0,
                state: null,
                n: 0,
                stack: []
            },
            opt: {
                filename: 'file.pdf',
                margin: [0, 0, 0, 0],
                enableLinks: true,
                x: 0,
                y: 0,
                html2canvas: {},
                jsPDF: {}
            }
        };
        /* ----- FROM / TO ----- */

        Worker.prototype.from = function from(src, type) {
            function getType(src) {
                switch (objType(src)) {
                    case 'string':
                        return 'string';

                    case 'element':
                        return src.nodeName.toLowerCase === 'canvas' ? 'canvas' : 'element';

                    default:
                        return 'unknown';
                }
            }

            return this.then(function from_main() {
                type = type || getType(src);

                switch (type) {
                    case 'string':
                        return this.set({
                            src: createElement('div', {
                                innerHTML: src
                            })
                        });

                    case 'element':
                        return this.set({
                            src: src
                        });

                    case 'canvas':
                        return this.set({
                            canvas: src
                        });

                    case 'img':
                        return this.set({
                            img: src
                        });

                    default:
                        return this.error('Unknown source type.');
                }
            });
        };

        Worker.prototype.to = function to(target) {
            // Route the 'to' request to the appropriate method.
            switch (target) {
                case 'container':
                    return this.toContainer();

                case 'canvas':
                    return this.toCanvas();

                case 'img':
                    return this.toImg();

                case 'pdf':
                    return this.toPdf();

                default:
                    return this.error('Invalid target.');
            }
        };

        Worker.prototype.toContainer = function toContainer() {
            // Set up function prerequisites.
            var prereqs = [function checkSrc() {
                return this.prop.src || this.error('Cannot duplicate - no source HTML.');
            }, function checkPageSize() {
                return this.prop.pageSize || this.setPageSize();
            }];
            return this.thenList(prereqs).then(function toContainer_main() {
                // Define the CSS styles for the container and its overlay parent.
                var overlayCSS = {
                    position: 'fixed',
                    overflow: 'hidden',
                    zIndex: 1000,
                    left: '-100000px',
                    right: 0,
                    bottom: 0,
                    top: 0
                };
                var containerCSS = {
                    position: 'relative',
                    display: 'inline-block',
                    width: Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) + 'px',
                    left: 0,
                    right: 0,
                    top: 0,
                    margin: 'auto',
                    backgroundColor: this.opt.backgroundColor || 'transparent'
                }; // Set the overlay to hidden (could be changed in the future to provide a print preview).

                var source = cloneNode(this.prop.src, this.opt.html2canvas.javascriptEnabled);

                if (source.tagName === 'BODY') {
                    containerCSS.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + 'px';
                }

                this.prop.overlay = createElement('div', {
                    className: 'html2pdf__overlay',
                    style: overlayCSS
                });
                this.prop.container = createElement('div', {
                    className: 'html2pdf__container',
                    style: containerCSS
                });
                this.prop.container.appendChild(source);
                this.prop.container.firstChild.appendChild(createElement('div', {
                    style: {
                        clear: 'both',
                        border: '0 none transparent',
                        margin: 0,
                        padding: 0,
                        height: 0
                    }
                }));
                this.prop.container.style.float = 'none';
                this.prop.overlay.appendChild(this.prop.container);
                document.body.appendChild(this.prop.overlay);
                this.prop.container.firstChild.style.position = 'relative';
                this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + 'px';
            });
        };

        Worker.prototype.toCanvas = function toCanvas() {
            // Set up function prerequisites.
            var prereqs = [function checkContainer() {
                return document.body.contains(this.prop.container) || this.toContainer();
            }]; // Fulfill prereqs then create the canvas.

            return this.thenList(prereqs).then(function toCanvas_main() {
                // Handle old-fashioned 'onrendered' argument.
                var options = Object.assign({}, this.opt.html2canvas);
                delete options.onrendered;

                if (!this.isHtml2CanvasLoaded()) {
                    return;
                }

                return html2canvas(this.prop.container, options);
            }).then(function toCanvas_post(canvas) {
                // Handle old-fashioned 'onrendered' argument.
                var onRendered = this.opt.html2canvas.onrendered || function () {};

                onRendered(canvas);
                this.prop.canvas = canvas;
                document.body.removeChild(this.prop.overlay);
            });
        };

        Worker.prototype.toContext2d = function toContext2d() {
            // Set up function prerequisites.
            var prereqs = [function checkContainer() {
                return document.body.contains(this.prop.container) || this.toContainer();
            }]; // Fulfill prereqs then create the canvas.

            return this.thenList(prereqs).then(function toContext2d_main() {
                // Handle old-fashioned 'onrendered' argument.
                var pdf = this.opt.jsPDF;
                var options = Object.assign({
                    async: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    imageTimeout: 15000,
                    logging: true,
                    proxy: null,
                    removeContainer: true,
                    foreignObjectRendering: false,
                    useCORS: false
                }, this.opt.html2canvas);
                delete options.onrendered;
                pdf.context2d.autoPaging = true;
                pdf.context2d.posX = this.opt.x;
                pdf.context2d.posY = this.opt.y;
                options.windowHeight = options.windowHeight || 0;
                options.windowHeight = options.windowHeight == 0 ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : options.windowHeight;

                if (!this.isHtml2CanvasLoaded()) {
                    return;
                }

                return html2canvas(this.prop.container, options);
            }).then(function toContext2d_post(canvas) {
                // Handle old-fashioned 'onrendered' argument.
                var onRendered = this.opt.html2canvas.onrendered || function () {};

                onRendered(canvas);
                this.prop.canvas = canvas;
                document.body.removeChild(this.prop.overlay);
            });
        };

        Worker.prototype.toImg = function toImg() {
            // Set up function prerequisites.
            var prereqs = [function checkCanvas() {
                return this.prop.canvas || this.toCanvas();
            }]; // Fulfill prereqs then create the image.

            return this.thenList(prereqs).then(function toImg_main() {
                var imgData = this.prop.canvas.toDataURL('image/' + this.opt.image.type, this.opt.image.quality);
                this.prop.img = document.createElement('img');
                this.prop.img.src = imgData;
            });
        };

        Worker.prototype.toPdf = function toPdf() {
            // Set up function prerequisites.
            var prereqs = [function checkContext2d() {
                    return this.toContext2d();
                } //function checkCanvas() { return this.prop.canvas || this.toCanvas(); }
            ]; // Fulfill prereqs then create the image.

            return this.thenList(prereqs).then(function toPdf_main() {
                // Create local copies of frequently used properties.
                this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
            });
        };
        /* ----- OUTPUT / SAVE ----- */


        Worker.prototype.output = function output(type, options, src) {
            // Redirect requests to the correct function (outputPdf / outputImg).
            src = src || 'pdf';

            if (src.toLowerCase() === 'img' || src.toLowerCase() === 'image') {
                return this.outputImg(type, options);
            } else {
                return this.outputPdf(type, options);
            }
        };

        Worker.prototype.outputPdf = function outputPdf(type, options) {
            // Set up function prerequisites.
            var prereqs = [function checkPdf() {
                return this.prop.pdf || this.toPdf();
            }]; // Fulfill prereqs then perform the appropriate output.

            return this.thenList(prereqs).then(function outputPdf_main() {
                /* Currently implemented output types:
                 *    https://rawgit.com/MrRio/jsPDF/master/docs/jspdf.js.html#line992
                 *  save(options), arraybuffer, blob, bloburi/bloburl,
                 *  datauristring/dataurlstring, dataurlnewwindow, datauri/dataurl
                 */
                return this.prop.pdf.output(type, options);
            });
        };

        Worker.prototype.outputImg = function outputImg(type, options) {
            // Set up function prerequisites.
            var prereqs = [function checkImg() {
                return this.prop.img || this.toImg();
            }]; // Fulfill prereqs then perform the appropriate output.

            return this.thenList(prereqs).then(function outputImg_main() {
                switch (type) {
                    case undefined:
                    case 'img':
                        return this.prop.img;

                    case 'datauristring':
                    case 'dataurlstring':
                        return this.prop.img.src;

                    case 'datauri':
                    case 'dataurl':
                        return document.location.href = this.prop.img.src;

                    default:
                        throw 'Image output type "' + type + '" is not supported.';
                }
            });
        };

        Worker.prototype.isHtml2CanvasLoaded = function () {
            var result = typeof global.html2canvas !== "undefined";

            if (!result) {
                console.error("html2canvas not loaded.");
            }

            return result;
        };

        Worker.prototype.save = function save(filename) {
            // Set up function prerequisites.
            var prereqs = [function checkPdf() {
                return this.prop.pdf || this.toPdf();
            }];

            if (!this.isHtml2CanvasLoaded()) {
                return;
            } // Fulfill prereqs, update the filename (if provided), and save the PDF.


            return this.thenList(prereqs).set(filename ? {
                filename: filename
            } : null).then(function save_main() {
                this.prop.pdf.save(this.opt.filename);
            });
        };

        Worker.prototype.doCallback = function doCallback(filename) {
            // Set up function prerequisites.
            var prereqs = [function checkPdf() {
                return this.prop.pdf || this.toPdf();
            }];

            if (!this.isHtml2CanvasLoaded()) {
                return;
            } // Fulfill prereqs, update the filename (if provided), and save the PDF.


            return this.thenList(prereqs).then(function doCallback_main() {
                this.prop.callback(this.prop.pdf);
            });
        };
        /* ----- SET / GET ----- */


        Worker.prototype.set = function set(opt) {
            // TODO: Implement ordered pairs?
            // Silently ignore invalid or empty input.
            if (objType(opt) !== 'object') {
                return this;
            } // Build an array of setter functions to queue.


            var fns = Object.keys(opt || {}).map(function (key) {
                if (key in Worker.template.prop) {
                    // Set pre-defined properties.
                    return function set_prop() {
                        this.prop[key] = opt[key];
                    };
                } else {
                    switch (key) {
                        case 'margin':
                            return this.setMargin.bind(this, opt.margin);

                        case 'jsPDF':
                            return function set_jsPDF() {
                                this.opt.jsPDF = opt.jsPDF;
                                return this.setPageSize();
                            };

                        case 'pageSize':
                            return this.setPageSize.bind(this, opt.pageSize);

                        default:
                            // Set any other properties in opt.
                            return function set_opt() {
                                this.opt[key] = opt[key];
                            };
                    }
                }
            }, this); // Set properties within the promise chain.

            return this.then(function set_main() {
                return this.thenList(fns);
            });
        };

        Worker.prototype.get = function get(key, cbk) {
            return this.then(function get_main() {
                // Fetch the requested property, either as a predefined prop or in opt.
                var val = key in Worker.template.prop ? this.prop[key] : this.opt[key];
                return cbk ? cbk(val) : val;
            });
        };

        Worker.prototype.setMargin = function setMargin(margin) {
            return this.then(function setMargin_main() {
                // Parse the margin property.
                switch (objType(margin)) {
                    case 'number':
                        margin = [margin, margin, margin, margin];

                    case 'array':
                        if (margin.length === 2) {
                            margin = [margin[0], margin[1], margin[0], margin[1]];
                        }

                        if (margin.length === 4) {
                            margin = [margin[0], margin[1], margin[2], margin[3]];
                            break;
                        }

                        default:
                            return this.error('Invalid margin array.');
                } // Set the margin property, then update pageSize.


                this.opt.margin = margin;
            }).then(this.setPageSize);
        };

        Worker.prototype.setPageSize = function setPageSize(pageSize) {
            function toPx(val, k) {
                return Math.floor(val * k / 72 * 96);
            }

            return this.then(function setPageSize_main() {
                // Retrieve page-size based on jsPDF settings, if not explicitly provided.
                pageSize = pageSize || jsPDF.getPageSize(this.opt.jsPDF); // Add 'inner' field if not present.

                if (!pageSize.hasOwnProperty('inner')) {
                    pageSize.inner = {
                        width: pageSize.width - this.opt.margin[1] - this.opt.margin[3],
                        height: pageSize.height - this.opt.margin[0] - this.opt.margin[2]
                    };
                    pageSize.inner.px = {
                        width: toPx(pageSize.inner.width, pageSize.k),
                        height: toPx(pageSize.inner.height, pageSize.k)
                    };
                    pageSize.inner.ratio = pageSize.inner.height / pageSize.inner.width;
                } // Attach pageSize to this.

                this.prop.pageSize = pageSize;
            });
        };

        Worker.prototype.setProgress = function setProgress(val, state, n, stack) {
            // Immediately update all progress values.
            if (val != null) this.progress.val = val;
            if (state != null) this.progress.state = state;
            if (n != null) this.progress.n = n;
            if (stack != null) this.progress.stack = stack;
            this.progress.ratio = this.progress.val / this.progress.state; // Return this for command chaining.

            return this;
        };

        Worker.prototype.updateProgress = function updateProgress(val, state, n, stack) {
            // Immediately update all progress values, using setProgress.
            return this.setProgress(val ? this.progress.val + val : null, state ? state : null, n ? this.progress.n + n : null, stack ? this.progress.stack.concat(stack) : null);
        };
        /* ----- PROMISE MAPPING ----- */


        Worker.prototype.then = function then(onFulfilled, onRejected) {
            // Wrap `this` for encapsulation.
            var self = this;
            return this.thenCore(onFulfilled, onRejected, function then_main(onFulfilled, onRejected) {
                // Update progress while queuing, calling, and resolving `then`.
                self.updateProgress(null, null, 1, [onFulfilled]);
                return Promise.prototype.then.call(this, function then_pre(val) {
                    self.updateProgress(null, onFulfilled);
                    return val;
                }).then(onFulfilled, onRejected).then(function then_post(val) {
                    self.updateProgress(1);
                    return val;
                });
            });
        };

        Worker.prototype.thenCore = function thenCore(onFulfilled, onRejected, thenBase) {
            // Handle optional thenBase parameter.
            thenBase = thenBase || Promise.prototype.then; // Wrap `this` for encapsulation and bind it to the promise handlers.

            var self = this;

            if (onFulfilled) {
                onFulfilled = onFulfilled.bind(self);
            }

            if (onRejected) {
                onRejected = onRejected.bind(self);
            } // Cast self into a Promise to avoid polyfills recursively defining `then`.


            var isNative = Promise.toString().indexOf('[native code]') !== -1 && Promise.name === 'Promise';
            var selfPromise = isNative ? self : Worker.convert(Object.assign({}, self), Promise.prototype); // Return the promise, after casting it into a Worker and preserving props.

            var returnVal = thenBase.call(selfPromise, onFulfilled, onRejected);
            return Worker.convert(returnVal, self.__proto__);
        };

        Worker.prototype.thenExternal = function thenExternal(onFulfilled, onRejected) {
            // Call `then` and return a standard promise (exits the Worker chain).
            return Promise.prototype.then.call(this, onFulfilled, onRejected);
        };

        Worker.prototype.thenList = function thenList(fns) {
            // Queue a series of promise 'factories' into the promise chain.
            var self = this;
            fns.forEach(function thenList_forEach(fn) {
                self = self.thenCore(fn);
            });
            return self;
        };

        Worker.prototype['catch'] = function (onRejected) {
            // Bind `this` to the promise handler, call `catch`, and return a Worker.
            if (onRejected) {
                onRejected = onRejected.bind(this);
            }

            var returnVal = Promise.prototype['catch'].call(this, onRejected);
            return Worker.convert(returnVal, this);
        };

        Worker.prototype.catchExternal = function catchExternal(onRejected) {
            // Call `catch` and return a standard promise (exits the Worker chain).
            return Promise.prototype['catch'].call(this, onRejected);
        };

        Worker.prototype.error = function error(msg) {
            // Throw the error in the Promise chain.
            return this.then(function error_main() {
                throw new Error(msg);
            });
        };
        /* ----- ALIASES ----- */


        Worker.prototype.using = Worker.prototype.set;
        Worker.prototype.saveAs = Worker.prototype.save;
        Worker.prototype.export = Worker.prototype.output;
        Worker.prototype.run = Worker.prototype.then; // Get dimensions of a PDF page, as determined by jsPDF.

        jsPDF.getPageSize = function (orientation, unit, format) {
            // Decode options object
            if (_typeof(orientation) === 'object') {
                var options = orientation;
                orientation = options.orientation;
                unit = options.unit || unit;
                format = options.format || format;
            } // Default options


            unit = unit || 'mm';
            format = format || 'a4';
            orientation = ('' + (orientation || 'P')).toLowerCase();
            var format_as_string = ('' + format).toLowerCase(); // Size in pt of various paper formats

            var pageFormats = {
                'a0': [2383.94, 3370.39],
                'a1': [1683.78, 2383.94],
                'a2': [1190.55, 1683.78],
                'a3': [841.89, 1190.55],
                'a4': [595.28, 841.89],
                'a5': [419.53, 595.28],
                'a6': [297.64, 419.53],
                'a7': [209.76, 297.64],
                'a8': [147.40, 209.76],
                'a9': [104.88, 147.40],
                'a10': [73.70, 104.88],
                'b0': [2834.65, 4008.19],
                'b1': [2004.09, 2834.65],
                'b2': [1417.32, 2004.09],
                'b3': [1000.63, 1417.32],
                'b4': [708.66, 1000.63],
                'b5': [498.90, 708.66],
                'b6': [354.33, 498.90],
                'b7': [249.45, 354.33],
                'b8': [175.75, 249.45],
                'b9': [124.72, 175.75],
                'b10': [87.87, 124.72],
                'c0': [2599.37, 3676.54],
                'c1': [1836.85, 2599.37],
                'c2': [1298.27, 1836.85],
                'c3': [918.43, 1298.27],
                'c4': [649.13, 918.43],
                'c5': [459.21, 649.13],
                'c6': [323.15, 459.21],
                'c7': [229.61, 323.15],
                'c8': [161.57, 229.61],
                'c9': [113.39, 161.57],
                'c10': [79.37, 113.39],
                'dl': [311.81, 623.62],
                'letter': [612, 792],
                'government-letter': [576, 756],
                'legal': [612, 1008],
                'junior-legal': [576, 360],
                'ledger': [1224, 792],
                'tabloid': [792, 1224],
                'credit-card': [153, 243]
            }; // Unit conversion

            switch (unit) {
                case 'pt':
                    var k = 1;
                    break;

                case 'mm':
                    var k = 72 / 25.4;
                    break;

                case 'cm':
                    var k = 72 / 2.54;
                    break;

                case 'in':
                    var k = 72;
                    break;

                case 'px':
                    var k = 72 / 96;
                    break;

                case 'pc':
                    var k = 12;
                    break;

                case 'em':
                    var k = 12;
                    break;

                case 'ex':
                    var k = 6;
                    break;

                default:
                    throw 'Invalid unit: ' + unit;
            } // Dimensions are stored as user units and converted to points on output


            if (pageFormats.hasOwnProperty(format_as_string)) {
                var pageHeight = pageFormats[format_as_string][1] / k;
                var pageWidth = pageFormats[format_as_string][0] / k;
            } else {
                try {
                    var pageHeight = format[1];
                    var pageWidth = format[0];
                } catch (err) {
                    throw new Error('Invalid format: ' + format);
                }
            } // Handle page orientation


            if (orientation === 'p' || orientation === 'portrait') {
                orientation = 'p';

                if (pageWidth > pageHeight) {
                    var tmp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = tmp;
                }
            } else if (orientation === 'l' || orientation === 'landscape') {
                orientation = 'l';

                if (pageHeight > pageWidth) {
                    var tmp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = tmp;
                }
            } else {
                throw 'Invalid orientation: ' + orientation;
            } // Return information (k is the unit conversion ratio from pts)


            var info = {
                'width': pageWidth,
                'height': pageHeight,
                'unit': unit,
                'k': k
            };
            return info;
        };
        /**
         * Generate a PDF from an HTML element or string using.
         *
         * @name html
         * @function
         * @param {Element|string} source The source element or HTML string.
         * @param {Object=} options An object of optional settings.
         * @description The Plugin needs html2canvas from niklasvh
         */


        jsPDFAPI.html = function (src, options) {

            options = options || {};

            options.callback = options.callback || function () {};

            options.html2canvas = options.html2canvas || {};
            options.html2canvas.canvas = options.html2canvas.canvas || this.canvas;
            options.jsPDF = options.jsPDF || this; // Create a new worker with the given options.

            var pdf = options.jsPDF;
            var worker = new Worker(options);

            if (!options.worker) {
                // If worker is not set to true, perform the traditional 'simple' operation.
                return worker.from(src).doCallback();
            } else {
                // Otherwise, return the worker for new Promise-based operation.
                return worker;
            }

            return this;
        };
    })(jsPDF.API, typeof window !== "undefined" && window || typeof global !== "undefined" && global);

    /**
     * @license
     * ==================================================================== 
     * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
     * 
     * 
     * ====================================================================
     */

    /*global jsPDF */

    /**
     * jsPDF JavaScript plugin
     *
     * @name javascript
     * @module
     */
    (function (jsPDFAPI) {

        var jsNamesObj, jsJsObj, text;
        /**
         * @name addJS
         * @function
         * @param {string} javascript The javascript to be embedded into the PDF-file.
         * @returns {jsPDF}
         */

        jsPDFAPI.addJS = function (javascript) {
            text = javascript;
            this.internal.events.subscribe('postPutResources', function (javascript) {
                jsNamesObj = this.internal.newObject();
                this.internal.out('<<');
                this.internal.out('/Names [(EmbeddedJS) ' + (jsNamesObj + 1) + ' 0 R]');
                this.internal.out('>>');
                this.internal.out('endobj');
                jsJsObj = this.internal.newObject();
                this.internal.out('<<');
                this.internal.out('/S /JavaScript');
                this.internal.out('/JS (' + text + ')');
                this.internal.out('>>');
                this.internal.out('endobj');
            });
            this.internal.events.subscribe('putCatalog', function () {
                if (jsNamesObj !== undefined && jsJsObj !== undefined) {
                    this.internal.out('/Names <</JavaScript ' + jsNamesObj + ' 0 R>>');
                }
            });
            return this;
        };
    })(jsPDF.API);


    /**
     * @license
     * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
     *
     * Licensed under the MIT License.
     * http://opensource.org/licenses/mit-license
     */

    (function (jsPDFAPI) {
        jsPDFAPI.events.push(['postPutResources', function () {
            var pdf = this;
            var rx = /^(\d+) 0 obj$/; // Write action goto objects for each page
            // this.outline.destsGoto = [];
            // for (var i = 0; i < totalPages; i++) {
            // var id = pdf.internal.newObject();
            // this.outline.destsGoto.push(id);
            // pdf.internal.write("<</D[" + (i * 2 + 3) + " 0 R /XYZ null
            // null null]/S/GoTo>> endobj");
            // }
            //
            // for (var i = 0; i < dests.length; i++) {
            // pdf.internal.write("(page_" + (i + 1) + ")" + dests[i] + " 0
            // R");
            // }
            //				

            if (this.outline.root.children.length > 0) {
                var lines = pdf.outline.render().split(/\r\n/);

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var m = rx.exec(line);

                    if (m != null) {
                        var oid = m[1];
                        pdf.internal.newObjectDeferredBegin(oid, false);
                    }

                    pdf.internal.write(line);
                }
            } // This code will write named destination for each page reference
            // (page_1, etc)


            if (this.outline.createNamedDestinations) {
                var totalPages = this.internal.pages.length; // WARNING: this assumes jsPDF starts on page 3 and pageIDs
                // follow 5, 7, 9, etc
                // Write destination objects for each page

                var dests = [];

                for (var i = 0; i < totalPages; i++) {
                    var id = pdf.internal.newObject();
                    dests.push(id);
                    var info = pdf.internal.getPageInfo(i + 1);
                    pdf.internal.write("<< /D[" + info.objId + " 0 R /XYZ null null null]>> endobj");
                } // assign a name for each destination


                var names2Oid = pdf.internal.newObject();
                pdf.internal.write('<< /Names [ ');

                for (var i = 0; i < dests.length; i++) {
                    pdf.internal.write("(page_" + (i + 1) + ")" + dests[i] + " 0 R");
                }

                pdf.internal.write(' ] >>', 'endobj'); // var kids = pdf.internal.newObject();
                // pdf.internal.write('<< /Kids [ ' + names2Oid + ' 0 R');
                // pdf.internal.write(' ] >>', 'endobj');

                var namesOid = pdf.internal.newObject();
                pdf.internal.write('<< /Dests ' + names2Oid + " 0 R");
                pdf.internal.write('>>', 'endobj');
            }
        }]);
        jsPDFAPI.events.push(['putCatalog', function () {
            var pdf = this;

            if (pdf.outline.root.children.length > 0) {
                pdf.internal.write("/Outlines", this.outline.makeRef(this.outline.root));

                if (this.outline.createNamedDestinations) {
                    pdf.internal.write("/Names " + namesOid + " 0 R");
                } // Open with Bookmarks showing
                // pdf.internal.write("/PageMode /UseOutlines");

            }
        }]);
        jsPDFAPI.events.push(['initialized', function () {
            var pdf = this;
            pdf.outline = {
                createNamedDestinations: false,
                root: {
                    children: []
                }
            };
            /**
             * Options: pageNumber
             */

            pdf.outline.add = function (parent, title, options) {
                var item = {
                    title: title,
                    options: options,
                    children: []
                };

                if (parent == null) {
                    parent = this.root;
                }

                parent.children.push(item);
                return item;
            };

            pdf.outline.render = function () {
                this.ctx = {};
                this.ctx.val = '';
                this.ctx.pdf = pdf;
                this.genIds_r(this.root);
                this.renderRoot(this.root);
                this.renderItems(this.root);
                return this.ctx.val;
            };

            pdf.outline.genIds_r = function (node) {
                node.id = pdf.internal.newObjectDeferred();

                for (var i = 0; i < node.children.length; i++) {
                    this.genIds_r(node.children[i]);
                }
            };

            pdf.outline.renderRoot = function (node) {
                this.objStart(node);
                this.line('/Type /Outlines');

                if (node.children.length > 0) {
                    this.line('/First ' + this.makeRef(node.children[0]));
                    this.line('/Last ' + this.makeRef(node.children[node.children.length - 1]));
                }

                this.line('/Count ' + this.count_r({
                    count: 0
                }, node));
                this.objEnd();
            };

            pdf.outline.renderItems = function (node) {
                var getHorizontalCoordinateString = this.ctx.pdf.internal.getCoordinateString;
                var getVerticalCoordinateString = this.ctx.pdf.internal.getVerticalCoordinateString;

                for (var i = 0; i < node.children.length; i++) {
                    var item = node.children[i];
                    this.objStart(item);
                    this.line('/Title ' + this.makeString(item.title));
                    this.line('/Parent ' + this.makeRef(node));

                    if (i > 0) {
                        this.line('/Prev ' + this.makeRef(node.children[i - 1]));
                    }

                    if (i < node.children.length - 1) {
                        this.line('/Next ' + this.makeRef(node.children[i + 1]));
                    }

                    if (item.children.length > 0) {
                        this.line('/First ' + this.makeRef(item.children[0]));
                        this.line('/Last ' + this.makeRef(item.children[item.children.length - 1]));
                    }

                    var count = this.count = this.count_r({
                        count: 0
                    }, item);

                    if (count > 0) {
                        this.line('/Count ' + count);
                    }

                    if (item.options) {
                        if (item.options.pageNumber) {
                            // Explicit Destination
                            //WARNING this assumes page ids are 3,5,7, etc.
                            var info = pdf.internal.getPageInfo(item.options.pageNumber);
                            this.line('/Dest ' + '[' + info.objId + ' 0 R /XYZ 0 ' + getVerticalCoordinateString(0) + ' 0]'); // this line does not work on all clients (pageNumber instead of page ref)
                            //this.line('/Dest ' + '[' + (item.options.pageNumber - 1) + ' /XYZ 0 ' + this.ctx.pdf.internal.pageSize.getHeight() + ' 0]');
                            // Named Destination
                            // this.line('/Dest (page_' + (item.options.pageNumber) + ')');
                            // Action Destination
                            // var id = pdf.internal.newObject();
                            // pdf.internal.write('<</D[' + (item.options.pageNumber - 1) + ' /XYZ null null null]/S/GoTo>> endobj');
                            // this.line('/A ' + id + ' 0 R' );
                        }
                    }

                    this.objEnd();
                }

                for (var i = 0; i < node.children.length; i++) {
                    var item = node.children[i];
                    this.renderItems(item);
                }
            };

            pdf.outline.line = function (text) {
                this.ctx.val += text + '\r\n';
            };

            pdf.outline.makeRef = function (node) {
                return node.id + ' 0 R';
            };

            pdf.outline.makeString = function (val) {
                return '(' + pdf.internal.pdfEscape(val) + ')';
            };

            pdf.outline.objStart = function (node) {
                this.ctx.val += '\r\n' + node.id + ' 0 obj' + '\r\n<<\r\n';
            };

            pdf.outline.objEnd = function (node) {
                this.ctx.val += '>> \r\n' + 'endobj' + '\r\n';
            };

            pdf.outline.count_r = function (ctx, node) {
                for (var i = 0; i < node.children.length; i++) {
                    ctx.count++;
                    this.count_r(ctx, node.children[i]);
                }

                return ctx.count;
            };
        }]);
        return this;
    })(jsPDF.API);


    /** @license
     * MIT license.
     * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
     *               2014 Diego Casorran, https://github.com/diegocr
     *
     * 
     * ====================================================================
     */

    /**
     * jsPDF split_text_to_size plugin 
     * 
     * @name split_text_to_size
     * @module
     */
    (function (API) {
        /**
         * Returns an array of length matching length of the 'word' string, with each
         * cell occupied by the width of the char in that position.
         * 
         * @name getCharWidthsArray
         * @function
         * @param {string} text
         * @param {Object} options
         * @returns {Array}
         */

        var getCharWidthsArray = API.getCharWidthsArray = function (text, options) {
            options = options || {};
            var activeFont = options.font || this.internal.getFont();
            var fontSize = options.fontSize || this.internal.getFontSize();
            var charSpace = options.charSpace || this.internal.getCharSpace();
            var widths = options.widths ? options.widths : activeFont.metadata.Unicode.widths;
            var widthsFractionOf = widths.fof ? widths.fof : 1;
            var kerning = options.kerning ? options.kerning : activeFont.metadata.Unicode.kerning;
            var kerningFractionOf = kerning.fof ? kerning.fof : 1;
            var i;
            var l;
            var char_code;
            var prior_char_code = 0; //for kerning

            var default_char_width = widths[0] || widthsFractionOf;
            var output = [];

            for (i = 0, l = text.length; i < l; i++) {
                char_code = text.charCodeAt(i);

                if (typeof activeFont.metadata.widthOfString === "function") {
                    output.push((activeFont.metadata.widthOfGlyph(activeFont.metadata.characterToGlyph(char_code)) + charSpace * (1000 / fontSize) || 0) / 1000);
                } else {
                    output.push((widths[char_code] || default_char_width) / widthsFractionOf + (kerning[char_code] && kerning[char_code][prior_char_code] || 0) / kerningFractionOf);
                }

                prior_char_code = char_code;
            }

            return output;
        };
        /**
         * Calculate the sum of a number-array
         * 
         * @name getArraySum
         * @public
         * @function
         * @param {Array} array Array of numbers
         * @returns {number}
         */


        var getArraySum = API.getArraySum = function (array) {
            var i = array.length,
                output = 0;

            while (i) {
                i--;
                output += array[i];
            }

            return output;
        };
        /**
         * Returns a widths of string in a given font, if the font size is set as 1 point.
         *
         * In other words, this is "proportional" value. For 1 unit of font size, the length
         * of the string will be that much.
         * 
         * Multiply by font size to get actual width in *points*
         * Then divide by 72 to get inches or divide by (72/25.6) to get 'mm' etc.
         * 
         * @name getStringUnitWidth
         * @public
         * @function
         * @param {string} text
         * @param {string} options
         * @returns {number} result
         */


        var getStringUnitWidth = API.getStringUnitWidth = function (text, options) {
            options = options || {};
            var fontSize = options.fontSize || this.internal.getFontSize();
            var font = options.font || this.internal.getFont();
            var charSpace = options.charSpace || this.internal.getCharSpace();
            var result = 0;

            if (typeof font.metadata.widthOfString === "function") {
                result = font.metadata.widthOfString(text, fontSize, charSpace) / fontSize;
            } else {
                result = getArraySum(getCharWidthsArray.apply(this, arguments));
            }

            return result;
        };
        /**
        returns array of lines
        */


        var splitLongWord = function splitLongWord(word, widths_array, firstLineMaxLen, maxLen) {
            var answer = []; // 1st, chop off the piece that can fit on the hanging line.

            var i = 0,
                l = word.length,
                workingLen = 0;

            while (i !== l && workingLen + widths_array[i] < firstLineMaxLen) {
                workingLen += widths_array[i];
                i++;
            } // this is first line.


            answer.push(word.slice(0, i)); // 2nd. Split the rest into maxLen pieces.

            var startOfLine = i;
            workingLen = 0;

            while (i !== l) {
                if (workingLen + widths_array[i] > maxLen) {
                    answer.push(word.slice(startOfLine, i));
                    workingLen = 0;
                    startOfLine = i;
                }

                workingLen += widths_array[i];
                i++;
            }

            if (startOfLine !== i) {
                answer.push(word.slice(startOfLine, i));
            }

            return answer;
        }; // Note, all sizing inputs for this function must be in "font measurement units"
        // By default, for PDF, it's "point".


        var splitParagraphIntoLines = function splitParagraphIntoLines(text, maxlen, options) {
            // at this time works only on Western scripts, ones with space char
            // separating the words. Feel free to expand.
            if (!options) {
                options = {};
            }

            var line = [],
                lines = [line],
                line_length = options.textIndent || 0,
                separator_length = 0,
                current_word_length = 0,
                word,
                widths_array,
                words = text.split(' '),
                spaceCharWidth = getCharWidthsArray.apply(this, [' ', options])[0],
                i,
                l,
                tmp,
                lineIndent;

            if (options.lineIndent === -1) {
                lineIndent = words[0].length + 2;
            } else {
                lineIndent = options.lineIndent || 0;
            }

            if (lineIndent) {
                var pad = Array(lineIndent).join(" "),
                    wrds = [];
                words.map(function (wrd) {
                    wrd = wrd.split(/\s*\n/);

                    if (wrd.length > 1) {
                        wrds = wrds.concat(wrd.map(function (wrd, idx) {
                            return (idx && wrd.length ? "\n" : "") + wrd;
                        }));
                    } else {
                        wrds.push(wrd[0]);
                    }
                });
                words = wrds;
                lineIndent = getStringUnitWidth.apply(this, [pad, options]);
            }

            for (i = 0, l = words.length; i < l; i++) {
                var force = 0;
                word = words[i];

                if (lineIndent && word[0] == "\n") {
                    word = word.substr(1);
                    force = 1;
                }

                widths_array = getCharWidthsArray.apply(this, [word, options]);
                current_word_length = getArraySum(widths_array);

                if (line_length + separator_length + current_word_length > maxlen || force) {
                    if (current_word_length > maxlen) {
                        // this happens when you have space-less long URLs for example.
                        // we just chop these to size. We do NOT insert hiphens
                        tmp = splitLongWord.apply(this, [word, widths_array, maxlen - (line_length + separator_length), maxlen]); // first line we add to existing line object

                        line.push(tmp.shift()); // it's ok to have extra space indicator there
                        // last line we make into new line object

                        line = [tmp.pop()]; // lines in the middle we apped to lines object as whole lines

                        while (tmp.length) {
                            lines.push([tmp.shift()]); // single fragment occupies whole line
                        }

                        current_word_length = getArraySum(widths_array.slice(word.length - (line[0] ? line[0].length : 0)));
                    } else {
                        // just put it on a new line
                        line = [word];
                    } // now we attach new line to lines


                    lines.push(line);
                    line_length = current_word_length + lineIndent;
                    separator_length = spaceCharWidth;
                } else {
                    line.push(word);
                    line_length += separator_length + current_word_length;
                    separator_length = spaceCharWidth;
                }
            }

            if (lineIndent) {
                var postProcess = function postProcess(ln, idx) {
                    return (idx ? pad : '') + ln.join(" ");
                };
            } else {
                var postProcess = function postProcess(ln) {
                    return ln.join(" ");
                };
            }

            return lines.map(postProcess);
        };
        /**
         * Splits a given string into an array of strings. Uses 'size' value
         * (in measurement units declared as default for the jsPDF instance)
         * and the font's "widths" and "Kerning" tables, where available, to
         * determine display length of a given string for a given font.
         * 
         * We use character's 100% of unit size (height) as width when Width
         * table or other default width is not available.
         * 
         * @name splitTextToSize
         * @public
         * @function
         * @param {string} text Unencoded, regular JavaScript (Unicode, UTF-16 / UCS-2) string.
         * @param {number} size Nominal number, measured in units default to this instance of jsPDF.
         * @param {Object} options Optional flags needed for chopper to do the right thing.
         * @returns {Array} array Array with strings chopped to size.
         */


        API.splitTextToSize = function (text, maxlen, options) {

            options = options || {};

            var fsize = options.fontSize || this.internal.getFontSize(),
                newOptions = function (options) {
                    var widths = {
                            0: 1
                        },
                        kerning = {};

                    if (!options.widths || !options.kerning) {
                        var f = this.internal.getFont(options.fontName, options.fontStyle),
                            encoding = 'Unicode'; // NOT UTF8, NOT UTF16BE/LE, NOT UCS2BE/LE
                        // Actual JavaScript-native String's 16bit char codes used.
                        // no multi-byte logic here

                        if (f.metadata[encoding]) {
                            return {
                                widths: f.metadata[encoding].widths || widths,
                                kerning: f.metadata[encoding].kerning || kerning
                            };
                        } else {
                            return {
                                font: f.metadata,
                                fontSize: this.internal.getFontSize(),
                                charSpace: this.internal.getCharSpace()
                            };
                        }
                    } else {
                        return {
                            widths: options.widths,
                            kerning: options.kerning
                        };
                    } // then use default values


                    return {
                        widths: widths,
                        kerning: kerning
                    };
                }.call(this, options); // first we split on end-of-line chars


            var paragraphs;

            if (Array.isArray(text)) {
                paragraphs = text;
            } else {
                paragraphs = text.split(/\r?\n/);
            } // now we convert size (max length of line) into "font size units"
            // at present time, the "font size unit" is always 'point'
            // 'proportional' means, "in proportion to font size"


            var fontUnit_maxLen = 1.0 * this.internal.scaleFactor * maxlen / fsize; // at this time, fsize is always in "points" regardless of the default measurement unit of the doc.
            // this may change in the future?
            // until then, proportional_maxlen is likely to be in 'points'
            // If first line is to be indented (shorter or longer) than maxLen
            // we indicate that by using CSS-style "text-indent" option.
            // here it's in font units too (which is likely 'points')
            // it can be negative (which makes the first line longer than maxLen)

            newOptions.textIndent = options.textIndent ? options.textIndent * 1.0 * this.internal.scaleFactor / fsize : 0;
            newOptions.lineIndent = options.lineIndent;
            var i,
                l,
                output = [];

            for (i = 0, l = paragraphs.length; i < l; i++) {
                output = output.concat(splitParagraphIntoLines.apply(this, [paragraphs[i], fontUnit_maxLen, newOptions]));
            }

            return output;
        };
    })(jsPDF.API);

    /** @license
     jsPDF standard_fonts_metrics plugin
     * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
     * MIT license.
     * 
     * ====================================================================
     */

    (function (API) {
        /*
        # reference (Python) versions of 'compress' and 'uncompress'
        # only 'uncompress' function is featured lower as JavaScript
        # if you want to unit test "roundtrip", just transcribe the reference
        # 'compress' function from Python into JavaScript
        
        def compress(data):
        
            keys =   '0123456789abcdef'
            values = 'klmnopqrstuvwxyz'
            mapping = dict(zip(keys, values))
            vals = []
            for key in data.keys():
                value = data[key]
                try:
                    keystring = hex(key)[2:]
                    keystring = keystring[:-1] + mapping[keystring[-1:]]
                except:
                    keystring = key.join(["'","'"])
                    #print('Keystring is %s' % keystring)
        
                try:
                    if value < 0:
                        valuestring = hex(value)[3:]
                        numberprefix = '-'
                    else:
                        valuestring = hex(value)[2:]
                        numberprefix = ''
                    valuestring = numberprefix + valuestring[:-1] + mapping[valuestring[-1:]]
                except:
                    if type(value) == dict:
                        valuestring = compress(value)
                    else:
                        raise Exception("Don't know what to do with value type %s" % type(value))
        
                vals.append(keystring+valuestring)
            
            return '{' + ''.join(vals) + '}'
        
        def uncompress(data):
        
            decoded = '0123456789abcdef'
            encoded = 'klmnopqrstuvwxyz'
            mapping = dict(zip(encoded, decoded))
        
            sign = +1
            stringmode = False
            stringparts = []
        
            output = {}
        
            activeobject = output
            parentchain = []
        
            keyparts = ''
            valueparts = ''
        
            key = None
        
            ending = set(encoded)
        
            i = 1
            l = len(data) - 1 # stripping starting, ending {}
            while i != l: # stripping {}
                # -, {, }, ' are special.
        
                ch = data[i]
                i += 1
        
                if ch == "'":
                    if stringmode:
                        # end of string mode
                        stringmode = False
                        key = ''.join(stringparts)
                    else:
                        # start of string mode
                        stringmode = True
                        stringparts = []
                elif stringmode == True:
                    #print("Adding %s to stringpart" % ch)
                    stringparts.append(ch)
        
                elif ch == '{':
                    # start of object
                    parentchain.append( [activeobject, key] )
                    activeobject = {}
                    key = None
                    #DEBUG = True
                elif ch == '}':
                    # end of object
                    parent, key = parentchain.pop()
                    parent[key] = activeobject
                    key = None
                    activeobject = parent
                    #DEBUG = False
        
                elif ch == '-':
                    sign = -1
                else:
                    # must be number
                    if key == None:
                        #debug("In Key. It is '%s', ch is '%s'" % (keyparts, ch))
                        if ch in ending:
                            #debug("End of key")
                            keyparts += mapping[ch]
                            key = int(keyparts, 16) * sign
                            sign = +1
                            keyparts = ''
                        else:
                            keyparts += ch
                    else:
                        #debug("In value. It is '%s', ch is '%s'" % (valueparts, ch))
                        if ch in ending:
                            #debug("End of value")
                            valueparts += mapping[ch]
                            activeobject[key] = int(valueparts, 16) * sign
                            sign = +1
                            key = None
                            valueparts = ''
                        else:
                            valueparts += ch
        
                    #debug(activeobject)
        
            return output
        
        */

        /**
        Uncompresses data compressed into custom, base16-like format. 
        @public
        @function
        @param
        @returns {Type}
        */

        var uncompress = function uncompress(data) {
            var decoded = '0123456789abcdef',
                encoded = 'klmnopqrstuvwxyz',
                mapping = {};

            for (var i = 0; i < encoded.length; i++) {
                mapping[encoded[i]] = decoded[i];
            }

            var undef,
                output = {},
                sign = 1,
                stringparts // undef. will be [] in string mode
                ,
                activeobject = output,
                parentchain = [],
                parent_key_pair,
                keyparts = '',
                valueparts = '',
                key // undef. will be Truthy when Key is resolved.
                ,
                datalen = data.length - 1 // stripping ending }
                ,
                ch;
            i = 1; // stripping starting {

            while (i != datalen) {
                // - { } ' are special.
                ch = data[i];
                i += 1;

                if (ch == "'") {
                    if (stringparts) {
                        // end of string mode
                        key = stringparts.join('');
                        stringparts = undef;
                    } else {
                        // start of string mode
                        stringparts = [];
                    }
                } else if (stringparts) {
                    stringparts.push(ch);
                } else if (ch == '{') {
                    // start of object
                    parentchain.push([activeobject, key]);
                    activeobject = {};
                    key = undef;
                } else if (ch == '}') {
                    // end of object
                    parent_key_pair = parentchain.pop();
                    parent_key_pair[0][parent_key_pair[1]] = activeobject;
                    key = undef;
                    activeobject = parent_key_pair[0];
                } else if (ch == '-') {
                    sign = -1;
                } else {
                    // must be number
                    if (key === undef) {
                        if (mapping.hasOwnProperty(ch)) {
                            keyparts += mapping[ch];
                            key = parseInt(keyparts, 16) * sign;
                            sign = +1;
                            keyparts = '';
                        } else {
                            keyparts += ch;
                        }
                    } else {
                        if (mapping.hasOwnProperty(ch)) {
                            valueparts += mapping[ch];
                            activeobject[key] = parseInt(valueparts, 16) * sign;
                            sign = +1;
                            key = undef;
                            valueparts = '';
                        } else {
                            valueparts += ch;
                        }
                    }
                }
            } // end while


            return output;
        }; // encoding = 'Unicode' 
        // NOT UTF8, NOT UTF16BE/LE, NOT UCS2BE/LE. NO clever BOM behavior
        // Actual 16bit char codes used.
        // no multi-byte logic here
        // Unicode characters to WinAnsiEncoding:
        // {402: 131, 8211: 150, 8212: 151, 8216: 145, 8217: 146, 8218: 130, 8220: 147, 8221: 148, 8222: 132, 8224: 134, 8225: 135, 8226: 149, 8230: 133, 8364: 128, 8240:137, 8249: 139, 8250: 155, 710: 136, 8482: 153, 338: 140, 339: 156, 732: 152, 352: 138, 353: 154, 376: 159, 381: 142, 382: 158}
        // as you can see, all Unicode chars are outside of 0-255 range. No char code conflicts.
        // this means that you can give Win cp1252 encoded strings to jsPDF for rendering directly
        // as well as give strings with some (supported by these fonts) Unicode characters and 
        // these will be mapped to win cp1252 
        // for example, you can send char code (cp1252) 0x80 or (unicode) 0x20AC, getting "Euro" glyph displayed in both cases.


        var encodingBlock = {
                'codePages': ['WinAnsiEncoding'],
                'WinAnsiEncoding': uncompress("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
            },
            encodings = {
                'Unicode': {
                    'Courier': encodingBlock,
                    'Courier-Bold': encodingBlock,
                    'Courier-BoldOblique': encodingBlock,
                    'Courier-Oblique': encodingBlock,
                    'Helvetica': encodingBlock,
                    'Helvetica-Bold': encodingBlock,
                    'Helvetica-BoldOblique': encodingBlock,
                    'Helvetica-Oblique': encodingBlock,
                    'Times-Roman': encodingBlock,
                    'Times-Bold': encodingBlock,
                    'Times-BoldItalic': encodingBlock,
                    'Times-Italic': encodingBlock //	, 'Symbol'
                    //	, 'ZapfDingbats'

                }
            },
            fontMetrics = {
                'Unicode': {
                    // all sizing numbers are n/fontMetricsFractionOf = one font size unit
                    // this means that if fontMetricsFractionOf = 1000, and letter A's width is 476, it's
                    // width is 476/1000 or 47.6% of its height (regardless of font size)
                    // At this time this value applies to "widths" and "kerning" numbers.
                    // char code 0 represents "default" (average) width - use it for chars missing in this table.
                    // key 'fof' represents the "fontMetricsFractionOf" value
                    'Courier-Oblique': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                    'Times-BoldItalic': uncompress("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
                    'Helvetica-Bold': uncompress("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                    'Courier': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                    'Courier-BoldOblique': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                    'Times-Bold': uncompress("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
                    'Symbol': uncompress("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),
                    'Helvetica': uncompress("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
                    'Helvetica-BoldOblique': uncompress("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                    'ZapfDingbats': uncompress("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),
                    'Courier-Bold': uncompress("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                    'Times-Italic': uncompress("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
                    'Times-Roman': uncompress("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
                    'Helvetica-Oblique': uncompress("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
                }
            };
        /*
        This event handler is fired when a new jsPDF object is initialized
        This event handler appends metrics data to standard fonts within
        that jsPDF instance. The metrics are mapped over Unicode character
        codes, NOT CIDs or other codes matching the StandardEncoding table of the
        standard PDF fonts.
        Future:
        Also included is the encoding maping table, converting Unicode (UCS-2, UTF-16)
        char codes to StandardEncoding character codes. The encoding table is to be used
        somewhere around "pdfEscape" call.
        */

        API.events.push(['addFont', function (data) {
            var font = data.font;
            var metrics,
                unicode_section,
                encoding = 'Unicode',
                encodingBlock;
            metrics = fontMetrics[encoding][font.postScriptName];

            if (metrics) {
                if (font.metadata[encoding]) {
                    unicode_section = font.metadata[encoding];
                } else {
                    unicode_section = font.metadata[encoding] = {};
                }

                unicode_section.widths = metrics.widths;
                unicode_section.kerning = metrics.kerning;
            }

            encodingBlock = encodings[encoding][font.postScriptName];

            if (encodingBlock) {
                if (font.metadata[encoding]) {
                    unicode_section = font.metadata[encoding];
                } else {
                    unicode_section = font.metadata[encoding] = {};
                }

                unicode_section.encoding = encodingBlock;

                if (encodingBlock.codePages && encodingBlock.codePages.length) {
                    font.encoding = encodingBlock.codePages[0];
                }
            }
        }]); // end of adding event handler
    })(jsPDF.API);


    /* Blob.js
     * A Blob, File, FileReader & URL implementation.
     * 2018-08-09
     *
     * By Eli Grey, http://eligrey.com
     * By Jimmy Wärting, https://github.com/jimmywarting
     * License: MIT
     *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
     */

    (function (global) {
        var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

        global.URL = global.URL || global.webkitURL || function (href, a) {
            a = document.createElement('a');
            a.href = href;
            return a;
        };

        var origBlob = global.Blob;
        var createObjectURL = URL.createObjectURL;
        var revokeObjectURL = URL.revokeObjectURL;
        var strTag = global.Symbol && global.Symbol.toStringTag;
        var blobSupported = false;
        var blobSupportsArrayBufferView = false;
        var arrayBufferSupported = !!global.ArrayBuffer;
        var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

        try {
            // Check if Blob constructor is supported
            blobSupported = new Blob(['ä']).size === 2; // Check if Blob constructor supports ArrayBufferViews
            // Fails in Safari 6, so we need to map to ArrayBuffers there.

            blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
        } catch (e) {}
        /**
         * Helper function that maps ArrayBufferViews to ArrayBuffers
         * Used by BlobBuilder constructor and old browsers that didn't
         * support it in the Blob constructor.
         */


        function mapArrayBufferViews(ary) {
            return ary.map(function (chunk) {
                if (chunk.buffer instanceof ArrayBuffer) {
                    var buf = chunk.buffer; // if this is a subarray, make a copy so we only
                    // include the subarray region from the underlying buffer

                    if (chunk.byteLength !== buf.byteLength) {
                        var copy = new Uint8Array(chunk.byteLength);
                        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                        buf = copy.buffer;
                    }

                    return buf;
                }

                return chunk;
            });
        }

        function BlobBuilderConstructor(ary, options) {
            options = options || {};
            var bb = new BlobBuilder();
            mapArrayBufferViews(ary).forEach(function (part) {
                bb.append(part);
            });
            return options.type ? bb.getBlob(options.type) : bb.getBlob();
        }

        function BlobConstructor(ary, options) {
            return new origBlob(mapArrayBufferViews(ary), options || {});
        }

        if (global.Blob) {
            BlobBuilderConstructor.prototype = Blob.prototype;
            BlobConstructor.prototype = Blob.prototype;
        }

        function FakeBlobBuilder() {
            function toUTF8Array(str) {
                var utf8 = [];

                for (var i = 0; i < str.length; i++) {
                    var charcode = str.charCodeAt(i);
                    if (charcode < 0x80) utf8.push(charcode);
                    else if (charcode < 0x800) {
                        utf8.push(0xc0 | charcode >> 6, 0x80 | charcode & 0x3f);
                    } else if (charcode < 0xd800 || charcode >= 0xe000) {
                        utf8.push(0xe0 | charcode >> 12, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
                    } // surrogate pair
                    else {
                        i++; // UTF-16 encodes 0x10000-0x10FFFF by
                        // subtracting 0x10000 and splitting the
                        // 20 bits of 0x0-0xFFFFF into two halves

                        charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
                        utf8.push(0xf0 | charcode >> 18, 0x80 | charcode >> 12 & 0x3f, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
                    }
                }

                return utf8;
            }

            function fromUtf8Array(array) {
                var out, i, len, c;
                var char2, char3;
                out = "";
                len = array.length;
                i = 0;

                while (i < len) {
                    c = array[i++];

                    switch (c >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            // 0xxxxxxx
                            out += String.fromCharCode(c);
                            break;

                        case 12:
                        case 13:
                            // 110x xxxx   10xx xxxx
                            char2 = array[i++];
                            out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                            break;

                        case 14:
                            // 1110 xxxx  10xx xxxx  10xx xxxx
                            char2 = array[i++];
                            char3 = array[i++];
                            out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                            break;
                    }
                }

                return out;
            }

            function isDataView(obj) {
                return obj && DataView.prototype.isPrototypeOf(obj);
            }

            function bufferClone(buf) {
                var view = new Array(buf.byteLength);
                var array = new Uint8Array(buf);
                var i = view.length;

                while (i--) {
                    view[i] = array[i];
                }

                return view;
            }

            function encodeByteArray(input) {
                var byteToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var output = [];

                for (var i = 0; i < input.length; i += 3) {
                    var byte1 = input[i];
                    var haveByte2 = i + 1 < input.length;
                    var byte2 = haveByte2 ? input[i + 1] : 0;
                    var haveByte3 = i + 2 < input.length;
                    var byte3 = haveByte3 ? input[i + 2] : 0;
                    var outByte1 = byte1 >> 2;
                    var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
                    var outByte3 = (byte2 & 0x0F) << 2 | byte3 >> 6;
                    var outByte4 = byte3 & 0x3F;

                    if (!haveByte3) {
                        outByte4 = 64;

                        if (!haveByte2) {
                            outByte3 = 64;
                        }
                    }

                    output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
                }

                return output.join('');
            }

            var create = Object.create || function (a) {
                function c() {}

                c.prototype = a;
                return new c();
            };

            if (arrayBufferSupported) {
                var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

                var isArrayBufferView = ArrayBuffer.isView || function (obj) {
                    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
                };
            }
            /********************************************************/

            /*                   Blob constructor                   */

            /********************************************************/


            function Blob(chunks, opts) {
                chunks = chunks || [];

                for (var i = 0, len = chunks.length; i < len; i++) {
                    var chunk = chunks[i];

                    if (chunk instanceof Blob) {
                        chunks[i] = chunk._buffer;
                    } else if (typeof chunk === 'string') {
                        chunks[i] = toUTF8Array(chunk);
                    } else if (arrayBufferSupported && (ArrayBuffer.prototype.isPrototypeOf(chunk) || isArrayBufferView(chunk))) {
                        chunks[i] = bufferClone(chunk);
                    } else if (arrayBufferSupported && isDataView(chunk)) {
                        chunks[i] = bufferClone(chunk.buffer);
                    } else {
                        chunks[i] = toUTF8Array(String(chunk));
                    }
                }

                this._buffer = [].concat.apply([], chunks);
                this.size = this._buffer.length;
                this.type = opts ? opts.type || '' : '';
            }

            Blob.prototype.slice = function (start, end, type) {
                var slice = this._buffer.slice(start || 0, end || this._buffer.length);

                return new Blob([slice], {
                    type: type
                });
            };

            Blob.prototype.toString = function () {
                return '[object Blob]';
            };
            /********************************************************/

            /*                   File constructor                   */

            /********************************************************/


            function File(chunks, name, opts) {
                opts = opts || {};
                var a = Blob.call(this, chunks, opts) || this;
                a.name = name;
                a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
                a.lastModified = +a.lastModifiedDate;
                return a;
            }

            File.prototype = create(Blob.prototype);
            File.prototype.constructor = File;
            if (Object.setPrototypeOf) Object.setPrototypeOf(File, Blob);
            else {
                try {
                    File.__proto__ = Blob;
                } catch (e) {}
            }

            File.prototype.toString = function () {
                return '[object File]';
            };
            /********************************************************/

            /*                FileReader constructor                */

            /********************************************************/


            function FileReader() {
                if (!(this instanceof FileReader)) throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
                var delegate = document.createDocumentFragment();
                this.addEventListener = delegate.addEventListener;

                this.dispatchEvent = function (evt) {
                    var local = this['on' + evt.type];
                    if (typeof local === 'function') local(evt);
                    delegate.dispatchEvent(evt);
                };

                this.removeEventListener = delegate.removeEventListener;
            }

            function _read(fr, blob, kind) {
                if (!(blob instanceof Blob)) throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
                fr.result = '';
                setTimeout(function () {
                    this.readyState = FileReader.LOADING;
                    fr.dispatchEvent(new Event('load'));
                    fr.dispatchEvent(new Event('loadend'));
                });
            }

            FileReader.EMPTY = 0;
            FileReader.LOADING = 1;
            FileReader.DONE = 2;
            FileReader.prototype.error = null;
            FileReader.prototype.onabort = null;
            FileReader.prototype.onerror = null;
            FileReader.prototype.onload = null;
            FileReader.prototype.onloadend = null;
            FileReader.prototype.onloadstart = null;
            FileReader.prototype.onprogress = null;

            FileReader.prototype.readAsDataURL = function (blob) {
                _read(this, blob, 'readAsDataURL');

                this.result = 'data:' + blob.type + ';base64,' + encodeByteArray(blob._buffer);
            };

            FileReader.prototype.readAsText = function (blob) {
                _read(this, blob, 'readAsText');

                this.result = fromUtf8Array(blob._buffer);
            };

            FileReader.prototype.readAsArrayBuffer = function (blob) {
                _read(this, blob, 'readAsText');

                this.result = blob._buffer.slice();
            };

            FileReader.prototype.abort = function () {};
            /********************************************************/

            /*                         URL                          */

            /********************************************************/


            URL.createObjectURL = function (blob) {
                return blob instanceof Blob ? 'data:' + blob.type + ';base64,' + encodeByteArray(blob._buffer) : createObjectURL.call(URL, blob);
            };

            URL.revokeObjectURL = function (url) {
                revokeObjectURL && revokeObjectURL.call(URL, url);
            };
            /********************************************************/

            /*                         XHR                          */

            /********************************************************/


            var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

            if (_send) {
                XMLHttpRequest.prototype.send = function (data) {
                    if (data instanceof Blob) {
                        this.setRequestHeader('Content-Type', data.type);

                        _send.call(this, fromUtf8Array(data._buffer));
                    } else {
                        _send.call(this, data);
                    }
                };
            }

            global.FileReader = FileReader;
            global.File = File;
            global.Blob = Blob;
        }

        if (strTag) {
            try {
                File.prototype[strTag] = 'File';
                Blob.prototype[strTag] = 'Blob';
                FileReader.prototype[strTag] = 'FileReader';
            } catch (e) {}
        }

        function fixFileAndXHR() {
            var isIE = !!global.ActiveXObject || '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style; // Monkey patched 
            // IE don't set Content-Type header on XHR whose body is a typed Blob
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6047383

            var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

            if (isIE && _send) {
                XMLHttpRequest.prototype.send = function (data) {
                    if (data instanceof Blob) {
                        this.setRequestHeader('Content-Type', data.type);

                        _send.call(this, data);
                    } else {
                        _send.call(this, data);
                    }
                };
            }

            try {
                new File([], '');
            } catch (e) {
                try {
                    var klass = new Function('class File extends Blob {' + 'constructor(chunks, name, opts) {' + 'opts = opts || {};' + 'super(chunks, opts || {});' + 'this.name = name;' + 'this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date;' + 'this.lastModified = +this.lastModifiedDate;' + '}};' + 'return new File([], ""), File')();
                    global.File = klass;
                } catch (e) {
                    var klass = function klass(b, d, c) {
                        var blob = new Blob(b, c);
                        var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
                        blob.name = d;
                        blob.lastModifiedDate = t;
                        blob.lastModified = +t;

                        blob.toString = function () {
                            return '[object File]';
                        };

                        if (strTag) blob[strTag] = 'File';
                        return blob;
                    };

                    global.File = klass;
                }
            }
        }

        if (blobSupported) {
            fixFileAndXHR();
            global.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
        } else if (blobBuilderSupported) {
            fixFileAndXHR();
            global.Blob = BlobBuilderConstructor;
        } else {
            FakeBlobBuilder();
        }
    })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')());

    /* FileSaver.js
     * A saveAs() FileSaver implementation.
     * 1.3.8
     * 2018-03-22 14:03:47
     *
     * By Eli Grey, https://eligrey.com
     * License: MIT
     *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
     */

    /*global self */

    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */
    var saveAs = saveAs || function (view) {

        if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }

        var doc = view.document // only get URL when necessary in case Blob.js hasn't overridden it yet
            ,
            get_URL = function () {
                return view.URL || view.webkitURL || view;
            },
            save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            can_use_save_link = "download" in save_link,
            click = function (node) {
                var event = new MouseEvent("click");
                node.dispatchEvent(event);
            },
            is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
            is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
            setImmediate = view.setImmediate || view.setTimeout,
            throw_outside = function (ex) {
                setImmediate(function () {
                    throw ex;
                }, 0);
            },
            force_saveable_type = "application/octet-stream" // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
            ,
            arbitrary_revoke_timeout = 1000 * 40 // in ms
            ,
            revoke = function (file) {
                var revoker = function () {
                    if (typeof file === "string") {
                        // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else {
                        // file is a File
                        file.remove();
                    }
                };

                setTimeout(revoker, arbitrary_revoke_timeout);
            },
            dispatch = function (filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;

                while (i--) {
                    var listener = filesaver["on" + event_types[i]];

                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            },
            auto_bom = function (blob) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                    return new Blob([String.fromCharCode(0xFEFF), blob], {
                        type: blob.type
                    });
                }

                return blob;
            },
            FileSaver = function (blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                } // First try a.download, then web filesystem, then object URLs


                var filesaver = this,
                    type = blob.type,
                    force = type === force_saveable_type,
                    object_url,
                    dispatch_all = function () {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    } // on any filesys errors revert to saving with object URLs
                    ,
                    fs_error = function () {
                        if ((is_chrome_ios || force && is_safari) && view.FileReader) {
                            // Safari doesn't allow downloading of blob urls
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                                var popup = view.open(url, '_blank');
                                if (!popup) view.location.href = url;
                                url = undefined; // release reference before dispatching

                                filesaver.readyState = filesaver.DONE;
                                dispatch_all();
                            };

                            reader.readAsDataURL(blob);
                            filesaver.readyState = filesaver.INIT;
                            return;
                        } // don't create more object URLs than needed


                        if (!object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }

                        if (force) {
                            view.location.href = object_url;
                        } else {
                            var opened = view.open(object_url, "_blank");

                            if (!opened) {
                                // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                                view.location.href = object_url;
                            }
                        }

                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    };

                filesaver.readyState = filesaver.INIT;

                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    setImmediate(function () {
                        save_link.href = object_url;
                        save_link.download = name;
                        click(save_link);
                        dispatch_all();
                        revoke(object_url);
                        filesaver.readyState = filesaver.DONE;
                    }, 0);
                    return;
                }

                fs_error();
            },
            FS_proto = FileSaver.prototype,
            saveAs = function (blob, name, no_auto_bom) {
                return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
            }; // IE 10+ (native saveAs)


        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            return function (blob, name, no_auto_bom) {
                name = name || blob.name || "download";

                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }

                return navigator.msSaveOrOpenBlob(blob, name);
            };
        } // todo: detect chrome extensions & packaged apps
        //save_link.target = "_blank";


        FS_proto.abort = function () {};

        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
        FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
        return saveAs;
    }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined);


    /*
     Copyright (c) 2013 Gildas Lormeau. All rights reserved.
  
     Redistribution and use in source and binary forms, with or without
     modification, are permitted provided that the following conditions are met:
  
     1. Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.
  
     2. Redistributions in binary form must reproduce the above copyright 
     notice, this list of conditions and the following disclaimer in 
     the documentation and/or other materials provided with the distribution.
  
     3. The names of the authors may not be used to endorse or promote products
     derived from this software without specific prior written permission.
  
     THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
     INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
     INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
     OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

    /*
     * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
     * JZlib is based on zlib-1.1.3, so all credit should go authors
     * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
     * and contributors of zlib.
     */
    (function (global) {

        var MAX_BITS = 15;
        var D_CODES = 30;
        var BL_CODES = 19;
        var LENGTH_CODES = 29;
        var LITERALS = 256;
        var L_CODES = LITERALS + 1 + LENGTH_CODES;
        var HEAP_SIZE = 2 * L_CODES + 1;
        var END_BLOCK = 256; // Bit length codes must not exceed MAX_BL_BITS bits

        var MAX_BL_BITS = 7; // repeat previous bit length 3-6 times (2 bits of repeat count)

        var REP_3_6 = 16; // repeat a zero length 3-10 times (3 bits of repeat count)

        var REPZ_3_10 = 17; // repeat a zero length 11-138 times (7 bits of repeat count)

        var REPZ_11_138 = 18; // The lengths of the bit length codes are sent in order of decreasing
        // probability, to avoid transmitting the lengths for unused bit
        // length codes.

        var Buf_size = 8 * 2; // JZlib version : "1.0.2"

        var Z_DEFAULT_COMPRESSION = -1; // compression strategy

        var Z_FILTERED = 1;
        var Z_HUFFMAN_ONLY = 2;
        var Z_DEFAULT_STRATEGY = 0;
        var Z_NO_FLUSH = 0;
        var Z_PARTIAL_FLUSH = 1;
        var Z_FULL_FLUSH = 3;
        var Z_FINISH = 4;
        var Z_OK = 0;
        var Z_STREAM_END = 1;
        var Z_NEED_DICT = 2;
        var Z_STREAM_ERROR = -2;
        var Z_DATA_ERROR = -3;
        var Z_BUF_ERROR = -5; // Tree
        // see definition of array dist_code below

        var _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];

        function Tree() {
            var that = this; // dyn_tree; // the dynamic tree
            // max_code; // largest code with non zero frequency
            // stat_desc; // the corresponding static tree
            // Compute the optimal bit lengths for a tree and update the total bit
            // length
            // for the current block.
            // IN assertion: the fields freq and dad are set, heap[heap_max] and
            // above are the tree nodes sorted by increasing frequency.
            // OUT assertions: the field len is set to the optimal bit length, the
            // array bl_count contains the frequencies for each bit length.
            // The length opt_len is updated; static_len is also updated if stree is
            // not null.

            function gen_bitlen(s) {
                var tree = that.dyn_tree;
                var stree = that.stat_desc.static_tree;
                var extra = that.stat_desc.extra_bits;
                var base = that.stat_desc.extra_base;
                var max_length = that.stat_desc.max_length;
                var h; // heap index

                var n, m; // iterate over the tree elements

                var bits; // bit length

                var xbits; // extra bits

                var f; // frequency

                var overflow = 0; // number of elements with bit length too large

                for (bits = 0; bits <= MAX_BITS; bits++) {
                    s.bl_count[bits] = 0;
                } // In a first pass, compute the optimal bit lengths (which may
                // overflow in the case of the bit length tree).


                tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

                for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
                    n = s.heap[h];
                    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;

                    if (bits > max_length) {
                        bits = max_length;
                        overflow++;
                    }

                    tree[n * 2 + 1] = bits; // We overwrite tree[n*2+1] which is no longer needed

                    if (n > that.max_code) continue; // not a leaf node

                    s.bl_count[bits]++;
                    xbits = 0;
                    if (n >= base) xbits = extra[n - base];
                    f = tree[n * 2];
                    s.opt_len += f * (bits + xbits);
                    if (stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
                }

                if (overflow === 0) return; // This happens for example on obj2 and pic of the Calgary corpus
                // Find the first bit length which could increase:

                do {
                    bits = max_length - 1;

                    while (s.bl_count[bits] === 0) {
                        bits--;
                    }

                    s.bl_count[bits]--; // move one leaf down the tree

                    s.bl_count[bits + 1] += 2; // move one overflow item as its brother

                    s.bl_count[max_length]--; // The brother of the overflow item also moves one step up,
                    // but this does not affect bl_count[max_length]

                    overflow -= 2;
                } while (overflow > 0);

                for (bits = max_length; bits !== 0; bits--) {
                    n = s.bl_count[bits];

                    while (n !== 0) {
                        m = s.heap[--h];
                        if (m > that.max_code) continue;

                        if (tree[m * 2 + 1] != bits) {
                            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
                            tree[m * 2 + 1] = bits;
                        }

                        n--;
                    }
                }
            } // Reverse the first len bits of a code, using straightforward code (a
            // faster
            // method would use a table)
            // IN assertion: 1 <= len <= 15


            function bi_reverse(code, // the value to invert
                len // its bit length
            ) {
                var res = 0;

                do {
                    res |= code & 1;
                    code >>>= 1;
                    res <<= 1;
                } while (--len > 0);

                return res >>> 1;
            } // Generate the codes for a given tree and bit counts (which need not be
            // optimal).
            // IN assertion: the array bl_count contains the bit length statistics for
            // the given tree and the field len is set for all tree elements.
            // OUT assertion: the field code is set for all tree elements of non
            // zero code length.


            function gen_codes(tree, // the tree to decorate
                max_code, // largest code with non zero frequency
                bl_count // number of codes at each bit length
            ) {
                var next_code = []; // next code value for each
                // bit length

                var code = 0; // running code value

                var bits; // bit index

                var n; // code index

                var len; // The distribution counts are first used to generate the code values
                // without bit reversal.

                for (bits = 1; bits <= MAX_BITS; bits++) {
                    next_code[bits] = code = code + bl_count[bits - 1] << 1;
                } // Check that the bit counts in bl_count are consistent. The last code
                // must be all ones.
                // Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
                // "inconsistent bit counts");
                // Tracev((stderr,"\ngen_codes: max_code %d ", max_code));


                for (n = 0; n <= max_code; n++) {
                    len = tree[n * 2 + 1];
                    if (len === 0) continue; // Now reverse the bits

                    tree[n * 2] = bi_reverse(next_code[len]++, len);
                }
            } // Construct one Huffman tree and assigns the code bit strings and lengths.
            // Update the total bit length for the current block.
            // IN assertion: the field freq is set for all tree elements.
            // OUT assertions: the fields len and code are set to the optimal bit length
            // and corresponding code. The length opt_len is updated; static_len is
            // also updated if stree is not null. The field max_code is set.


            that.build_tree = function (s) {
                var tree = that.dyn_tree;
                var stree = that.stat_desc.static_tree;
                var elems = that.stat_desc.elems;
                var n, m; // iterate over heap elements

                var max_code = -1; // largest code with non zero frequency

                var node; // new node being created
                // Construct the initial heap, with least frequent element in
                // heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
                // heap[0] is not used.

                s.heap_len = 0;
                s.heap_max = HEAP_SIZE;

                for (n = 0; n < elems; n++) {
                    if (tree[n * 2] !== 0) {
                        s.heap[++s.heap_len] = max_code = n;
                        s.depth[n] = 0;
                    } else {
                        tree[n * 2 + 1] = 0;
                    }
                } // The pkzip format requires that at least one distance code exists,
                // and that at least one bit should be sent even if there is only one
                // possible code. So to avoid special checks later on we force at least
                // two codes of non zero frequency.


                while (s.heap_len < 2) {
                    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
                    tree[node * 2] = 1;
                    s.depth[node] = 0;
                    s.opt_len--;
                    if (stree) s.static_len -= stree[node * 2 + 1]; // node is 0 or 1 so it does not have extra bits
                }

                that.max_code = max_code; // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
                // establish sub-heaps of increasing lengths:

                for (n = Math.floor(s.heap_len / 2); n >= 1; n--) {
                    s.pqdownheap(tree, n);
                } // Construct the Huffman tree by repeatedly combining the least two
                // frequent nodes.


                node = elems; // next internal node of the tree

                do {
                    // n = node of least frequency
                    n = s.heap[1];
                    s.heap[1] = s.heap[s.heap_len--];
                    s.pqdownheap(tree, 1);
                    m = s.heap[1]; // m = node of next least frequency

                    s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency

                    s.heap[--s.heap_max] = m; // Create a new node father of n and m

                    tree[node * 2] = tree[n * 2] + tree[m * 2];
                    s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
                    tree[n * 2 + 1] = tree[m * 2 + 1] = node; // and insert the new node in the heap

                    s.heap[1] = node++;
                    s.pqdownheap(tree, 1);
                } while (s.heap_len >= 2);

                s.heap[--s.heap_max] = s.heap[1]; // At this point, the fields freq and dad are set. We can now
                // generate the bit lengths.

                gen_bitlen(s); // The field len is now set, we can generate the bit codes

                gen_codes(tree, that.max_code, s.bl_count);
            };
        }

        Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28];
        Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
        Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576]; // Mapping from a distance to a distance code. dist is the distance - 1 and
        // must not have side effects. _dist_code[256] and _dist_code[257] are never
        // used.

        Tree.d_code = function (dist) {
            return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
        }; // extra bits for each length code


        Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]; // extra bits for each distance code

        Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]; // extra bits for each bit length code

        Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
        Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; // StaticTree

        function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
            var that = this;
            that.static_tree = static_tree;
            that.extra_bits = extra_bits;
            that.extra_base = extra_base;
            that.elems = elems;
            that.max_length = max_length;
        }

        StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8];
        StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5];
        StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
        StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
        StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS); // Deflate

        var MAX_MEM_LEVEL = 9;
        var DEF_MEM_LEVEL = 8;

        function Config(good_length, max_lazy, nice_length, max_chain, func) {
            var that = this;
            that.good_length = good_length;
            that.max_lazy = max_lazy;
            that.nice_length = nice_length;
            that.max_chain = max_chain;
            that.func = func;
        }

        var STORED = 0;
        var FAST = 1;
        var SLOW = 2;
        var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];
        var z_errmsg = ["need dictionary", // Z_NEED_DICT
            // 2
            "stream end", // Z_STREAM_END 1
            "", // Z_OK 0
            "", // Z_ERRNO (-1)
            "stream error", // Z_STREAM_ERROR (-2)
            "data error", // Z_DATA_ERROR (-3)
            "", // Z_MEM_ERROR (-4)
            "buffer error", // Z_BUF_ERROR (-5)
            "", // Z_VERSION_ERROR (-6)
            ""
        ]; // block not completed, need more input or more output

        var NeedMore = 0; // block flush performed

        var BlockDone = 1; // finish started, need only more output at next deflate

        var FinishStarted = 2; // finish done, accept no more input or output

        var FinishDone = 3; // preset dictionary flag in zlib header

        var PRESET_DICT = 0x20;
        var INIT_STATE = 42;
        var BUSY_STATE = 113;
        var FINISH_STATE = 666; // The deflate compression method

        var Z_DEFLATED = 8;
        var STORED_BLOCK = 0;
        var STATIC_TREES = 1;
        var DYN_TREES = 2;
        var MIN_MATCH = 3;
        var MAX_MATCH = 258;
        var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

        function smaller(tree, n, m, depth) {
            var tn2 = tree[n * 2];
            var tm2 = tree[m * 2];
            return tn2 < tm2 || tn2 == tm2 && depth[n] <= depth[m];
        }

        function Deflate() {
            var that = this;
            var strm; // pointer back to this zlib stream

            var status; // as the name implies
            // pending_buf; // output still pending

            var pending_buf_size; // size of pending_buf

            var last_flush; // value of flush param for previous deflate call

            var w_size; // LZ77 window size (32K by default)

            var w_bits; // log2(w_size) (8..16)

            var w_mask; // w_size - 1

            var window; // Sliding window. Input bytes are read into the second half of the window,
            // and move to the first half later to keep a dictionary of at least wSize
            // bytes. With this organization, matches are limited to a distance of
            // wSize-MAX_MATCH bytes, but this ensures that IO is always
            // performed with a length multiple of the block size. Also, it limits
            // the window size to 64K, which is quite useful on MSDOS.
            // To do: use the user input buffer as sliding window.

            var window_size; // Actual size of window: 2*wSize, except when the user input buffer
            // is directly used as sliding window.

            var prev; // Link to older string with same hash index. To limit the size of this
            // array to 64K, this link is maintained only for the last 32K strings.
            // An index in this array is thus a window index modulo 32K.

            var head; // Heads of the hash chains or NIL.

            var ins_h; // hash index of string to be inserted

            var hash_size; // number of elements in hash table

            var hash_bits; // log2(hash_size)

            var hash_mask; // hash_size-1
            // Number of bits by which ins_h must be shifted at each input
            // step. It must be such that after MIN_MATCH steps, the oldest
            // byte no longer takes part in the hash key, that is:
            // hash_shift * MIN_MATCH >= hash_bits

            var hash_shift; // Window position at the beginning of the current output block. Gets
            // negative when the window is moved backwards.

            var block_start;
            var match_length; // length of best match

            var prev_match; // previous match

            var match_available; // set if previous match exists

            var strstart; // start of string to insert

            var match_start; // start of matching string

            var lookahead; // number of valid bytes ahead in window
            // Length of the best match at previous step. Matches not greater than this
            // are discarded. This is used in the lazy match evaluation.

            var prev_length; // To speed up deflation, hash chains are never searched beyond this
            // length. A higher limit improves compression ratio but degrades the speed.

            var max_chain_length; // Attempt to find a better match only when the current match is strictly
            // smaller than this value. This mechanism is used only for compression
            // levels >= 4.

            var max_lazy_match; // Insert new strings in the hash table only if the match length is not
            // greater than this length. This saves time but degrades compression.
            // max_insert_length is used only for compression levels <= 3.

            var level; // compression level (1..9)

            var strategy; // favor or force Huffman coding
            // Use a faster search when the previous match is longer than this

            var good_match; // Stop searching when current match exceeds this

            var nice_match;
            var dyn_ltree; // literal and length tree

            var dyn_dtree; // distance tree

            var bl_tree; // Huffman tree for bit lengths

            var l_desc = new Tree(); // desc for literal tree

            var d_desc = new Tree(); // desc for distance tree

            var bl_desc = new Tree(); // desc for bit length tree
            // that.heap_len; // number of elements in the heap
            // that.heap_max; // element of largest frequency
            // The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
            // The same heap array is used to build all trees.
            // Depth of each subtree used as tie breaker for trees of equal frequency

            that.depth = [];
            var l_buf; // index for literals or lengths */
            // Size of match buffer for literals/lengths. There are 4 reasons for
            // limiting lit_bufsize to 64K:
            // - frequencies can be kept in 16 bit counters
            // - if compression is not successful for the first block, all input
            // data is still in the window so we can still emit a stored block even
            // when input comes from standard input. (This can also be done for
            // all blocks if lit_bufsize is not greater than 32K.)
            // - if compression is not successful for a file smaller than 64K, we can
            // even emit a stored file instead of a stored block (saving 5 bytes).
            // This is applicable only for zip (not gzip or zlib).
            // - creating new Huffman trees less frequently may not provide fast
            // adaptation to changes in the input data statistics. (Take for
            // example a binary file with poorly compressible code followed by
            // a highly compressible string table.) Smaller buffer sizes give
            // fast adaptation but have of course the overhead of transmitting
            // trees more frequently.
            // - I can't count above 4

            var lit_bufsize;
            var last_lit; // running index in l_buf
            // Buffer for distances. To simplify the code, d_buf and l_buf have
            // the same number of elements. To use different lengths, an extra flag
            // array would be necessary.

            var d_buf; // index of pendig_buf
            // that.opt_len; // bit length of current block with optimal trees
            // that.static_len; // bit length of current block with static trees

            var matches; // number of string matches in current block

            var last_eob_len; // bit length of EOB code for last block
            // Output buffer. bits are inserted starting at the bottom (least
            // significant bits).

            var bi_buf; // Number of valid bits in bi_buf. All bits above the last valid bit
            // are always zero.

            var bi_valid; // number of codes at each bit length for an optimal tree

            that.bl_count = []; // heap used to build the Huffman trees

            that.heap = [];
            dyn_ltree = [];
            dyn_dtree = [];
            bl_tree = [];

            function lm_init() {
                var i;
                window_size = 2 * w_size;
                head[hash_size - 1] = 0;

                for (i = 0; i < hash_size - 1; i++) {
                    head[i] = 0;
                } // Set the default configuration parameters:


                max_lazy_match = config_table[level].max_lazy;
                good_match = config_table[level].good_length;
                nice_match = config_table[level].nice_length;
                max_chain_length = config_table[level].max_chain;
                strstart = 0;
                block_start = 0;
                lookahead = 0;
                match_length = prev_length = MIN_MATCH - 1;
                match_available = 0;
                ins_h = 0;
            }

            function init_block() {
                var i; // Initialize the trees.

                for (i = 0; i < L_CODES; i++) {
                    dyn_ltree[i * 2] = 0;
                }

                for (i = 0; i < D_CODES; i++) {
                    dyn_dtree[i * 2] = 0;
                }

                for (i = 0; i < BL_CODES; i++) {
                    bl_tree[i * 2] = 0;
                }

                dyn_ltree[END_BLOCK * 2] = 1;
                that.opt_len = that.static_len = 0;
                last_lit = matches = 0;
            } // Initialize the tree data structures for a new zlib stream.


            function tr_init() {
                l_desc.dyn_tree = dyn_ltree;
                l_desc.stat_desc = StaticTree.static_l_desc;
                d_desc.dyn_tree = dyn_dtree;
                d_desc.stat_desc = StaticTree.static_d_desc;
                bl_desc.dyn_tree = bl_tree;
                bl_desc.stat_desc = StaticTree.static_bl_desc;
                bi_buf = 0;
                bi_valid = 0;
                last_eob_len = 8; // enough lookahead for inflate
                // Initialize the first block of the first file:

                init_block();
            } // Restore the heap property by moving down the tree starting at node k,
            // exchanging a node with the smallest of its two sons if necessary,
            // stopping
            // when the heap property is re-established (each father smaller than its
            // two sons).


            that.pqdownheap = function (tree, // the tree to restore
                k // node to move down
            ) {
                var heap = that.heap;
                var v = heap[k];
                var j = k << 1; // left son of k

                while (j <= that.heap_len) {
                    // Set j to the smallest of the two sons:
                    if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
                        j++;
                    } // Exit if v is smaller than both sons


                    if (smaller(tree, v, heap[j], that.depth)) break; // Exchange v with the smallest son

                    heap[k] = heap[j];
                    k = j; // And continue down the tree, setting j to the left son of k

                    j <<= 1;
                }

                heap[k] = v;
            }; // Scan a literal or distance tree to determine the frequencies of the codes
            // in the bit length tree.


            function scan_tree(tree, // the tree to be scanned
                max_code // and its largest code of non zero frequency
            ) {
                var n; // iterates over all tree elements

                var prevlen = -1; // last emitted length

                var curlen; // length of current code

                var nextlen = tree[0 * 2 + 1]; // length of next code

                var count = 0; // repeat count of the current code

                var max_count = 7; // max repeat count

                var min_count = 4; // min repeat count

                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }

                tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];

                    if (++count < max_count && curlen == nextlen) {
                        continue;
                    } else if (count < min_count) {
                        bl_tree[curlen * 2] += count;
                    } else if (curlen !== 0) {
                        if (curlen != prevlen) bl_tree[curlen * 2]++;
                        bl_tree[REP_3_6 * 2]++;
                    } else if (count <= 10) {
                        bl_tree[REPZ_3_10 * 2]++;
                    } else {
                        bl_tree[REPZ_11_138 * 2]++;
                    }

                    count = 0;
                    prevlen = curlen;

                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    } else if (curlen == nextlen) {
                        max_count = 6;
                        min_count = 3;
                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            } // Construct the Huffman tree for the bit lengths and return the index in
            // bl_order of the last bit length code to send.


            function build_bl_tree() {
                var max_blindex; // index of last bit length code of non zero freq
                // Determine the bit length frequencies for literal and distance trees

                scan_tree(dyn_ltree, l_desc.max_code);
                scan_tree(dyn_dtree, d_desc.max_code); // Build the bit length tree:

                bl_desc.build_tree(that); // opt_len now includes the length of the tree representations, except
                // the lengths of the bit lengths codes and the 5+5+4 bits for the
                // counts.
                // Determine the number of bit length codes to send. The pkzip format
                // requires that at least 4 bit length codes be sent. (appnote.txt says
                // 3 but the actual value used is 4.)

                for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
                    if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) break;
                } // Update opt_len to include the bit length tree and counts


                that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
                return max_blindex;
            } // Output a byte on the stream.
            // IN assertion: there is enough room in pending_buf.


            function put_byte(p) {
                that.pending_buf[that.pending++] = p;
            }

            function put_short(w) {
                put_byte(w & 0xff);
                put_byte(w >>> 8 & 0xff);
            }

            function putShortMSB(b) {
                put_byte(b >> 8 & 0xff);
                put_byte(b & 0xff & 0xff);
            }

            function send_bits(value, length) {
                var val,
                    len = length;

                if (bi_valid > Buf_size - len) {
                    val = value; // bi_buf |= (val << bi_valid);

                    bi_buf |= val << bi_valid & 0xffff;
                    put_short(bi_buf);
                    bi_buf = val >>> Buf_size - bi_valid;
                    bi_valid += len - Buf_size;
                } else {
                    // bi_buf |= (value) << bi_valid;
                    bi_buf |= value << bi_valid & 0xffff;
                    bi_valid += len;
                }
            }

            function send_code(c, tree) {
                var c2 = c * 2;
                send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
            } // Send a literal or distance tree in compressed form, using the codes in
            // bl_tree.


            function send_tree(tree, // the tree to be sent
                max_code // and its largest code of non zero frequency
            ) {
                var n; // iterates over all tree elements

                var prevlen = -1; // last emitted length

                var curlen; // length of current code

                var nextlen = tree[0 * 2 + 1]; // length of next code

                var count = 0; // repeat count of the current code

                var max_count = 7; // max repeat count

                var min_count = 4; // min repeat count

                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];

                    if (++count < max_count && curlen == nextlen) {
                        continue;
                    } else if (count < min_count) {
                        do {
                            send_code(curlen, bl_tree);
                        } while (--count !== 0);
                    } else if (curlen !== 0) {
                        if (curlen != prevlen) {
                            send_code(curlen, bl_tree);
                            count--;
                        }

                        send_code(REP_3_6, bl_tree);
                        send_bits(count - 3, 2);
                    } else if (count <= 10) {
                        send_code(REPZ_3_10, bl_tree);
                        send_bits(count - 3, 3);
                    } else {
                        send_code(REPZ_11_138, bl_tree);
                        send_bits(count - 11, 7);
                    }

                    count = 0;
                    prevlen = curlen;

                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    } else if (curlen == nextlen) {
                        max_count = 6;
                        min_count = 3;
                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            } // Send the header for a block using dynamic Huffman trees: the counts, the
            // lengths of the bit length codes, the literal tree and the distance tree.
            // IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.


            function send_all_trees(lcodes, dcodes, blcodes) {
                var rank; // index in bl_order

                send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt

                send_bits(dcodes - 1, 5);
                send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt

                for (rank = 0; rank < blcodes; rank++) {
                    send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
                }

                send_tree(dyn_ltree, lcodes - 1); // literal tree

                send_tree(dyn_dtree, dcodes - 1); // distance tree
            } // Flush the bit buffer, keeping at most 7 bits in it.


            function bi_flush() {
                if (bi_valid == 16) {
                    put_short(bi_buf);
                    bi_buf = 0;
                    bi_valid = 0;
                } else if (bi_valid >= 8) {
                    put_byte(bi_buf & 0xff);
                    bi_buf >>>= 8;
                    bi_valid -= 8;
                }
            } // Send one empty static block to give enough lookahead for inflate.
            // This takes 10 bits, of which 7 may remain in the bit buffer.
            // The current inflate code requires 9 bits of lookahead. If the
            // last two codes for the previous block (real code plus EOB) were coded
            // on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
            // the last real code. In this case we send two empty static blocks instead
            // of one. (There are no problems if the previous block is stored or fixed.)
            // To simplify the code, we assume the worst case of last real code encoded
            // on one bit only.


            function _tr_align() {
                send_bits(STATIC_TREES << 1, 3);
                send_code(END_BLOCK, StaticTree.static_ltree);
                bi_flush(); // Of the 10 bits for the empty block, we have already sent
                // (10 - bi_valid) bits. The lookahead for the last real code (before
                // the EOB of the previous block) was thus at least one plus the length
                // of the EOB plus what we have just sent of the empty static block.

                if (1 + last_eob_len + 10 - bi_valid < 9) {
                    send_bits(STATIC_TREES << 1, 3);
                    send_code(END_BLOCK, StaticTree.static_ltree);
                    bi_flush();
                }

                last_eob_len = 7;
            } // Save the match info and tally the frequency counts. Return true if
            // the current block must be flushed.


            function _tr_tally(dist, // distance of matched string
                lc // match length-MIN_MATCH or unmatched char (if dist==0)
            ) {
                var out_length, in_length, dcode;
                that.pending_buf[d_buf + last_lit * 2] = dist >>> 8 & 0xff;
                that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;
                that.pending_buf[l_buf + last_lit] = lc & 0xff;
                last_lit++;

                if (dist === 0) {
                    // lc is the unmatched char
                    dyn_ltree[lc * 2]++;
                } else {
                    matches++; // Here, lc is the match length - MIN_MATCH

                    dist--; // dist = match distance - 1

                    dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
                    dyn_dtree[Tree.d_code(dist) * 2]++;
                }

                if ((last_lit & 0x1fff) === 0 && level > 2) {
                    // Compute an upper bound for the compressed length
                    out_length = last_lit * 8;
                    in_length = strstart - block_start;

                    for (dcode = 0; dcode < D_CODES; dcode++) {
                        out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
                    }

                    out_length >>>= 3;
                    if (matches < Math.floor(last_lit / 2) && out_length < Math.floor(in_length / 2)) return true;
                }

                return last_lit == lit_bufsize - 1; // We avoid equality with lit_bufsize because of wraparound at 64K
                // on 16 bit machines and because stored blocks are restricted to
                // 64K-1 bytes.
            } // Send the block data compressed using the given Huffman trees


            function compress_block(ltree, dtree) {
                var dist; // distance of matched string

                var lc; // match length or unmatched char (if dist === 0)

                var lx = 0; // running index in l_buf

                var code; // the code to send

                var extra; // number of extra bits to send

                if (last_lit !== 0) {
                    do {
                        dist = that.pending_buf[d_buf + lx * 2] << 8 & 0xff00 | that.pending_buf[d_buf + lx * 2 + 1] & 0xff;
                        lc = that.pending_buf[l_buf + lx] & 0xff;
                        lx++;

                        if (dist === 0) {
                            send_code(lc, ltree); // send a literal byte
                        } else {
                            // Here, lc is the match length - MIN_MATCH
                            code = Tree._length_code[lc];
                            send_code(code + LITERALS + 1, ltree); // send the length
                            // code

                            extra = Tree.extra_lbits[code];

                            if (extra !== 0) {
                                lc -= Tree.base_length[code];
                                send_bits(lc, extra); // send the extra length bits
                            }

                            dist--; // dist is now the match distance - 1

                            code = Tree.d_code(dist);
                            send_code(code, dtree); // send the distance code

                            extra = Tree.extra_dbits[code];

                            if (extra !== 0) {
                                dist -= Tree.base_dist[code];
                                send_bits(dist, extra); // send the extra distance bits
                            }
                        } // literal or match pair ?
                        // Check that the overlay between pending_buf and d_buf+l_buf is
                        // ok:

                    } while (lx < last_lit);
                }

                send_code(END_BLOCK, ltree);
                last_eob_len = ltree[END_BLOCK * 2 + 1];
            } // Flush the bit buffer and align the output on a byte boundary


            function bi_windup() {
                if (bi_valid > 8) {
                    put_short(bi_buf);
                } else if (bi_valid > 0) {
                    put_byte(bi_buf & 0xff);
                }

                bi_buf = 0;
                bi_valid = 0;
            } // Copy a stored block, storing first the length and its
            // one's complement if requested.


            function copy_block(buf, // the input data
                len, // its length
                header // true if block header must be written
            ) {
                bi_windup(); // align on byte boundary

                last_eob_len = 8; // enough lookahead for inflate

                if (header) {
                    put_short(len);
                    put_short(~len);
                }

                that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
                that.pending += len;
            } // Send a stored block


            function _tr_stored_block(buf, // input block
                stored_len, // length of input block
                eof // true if this is the last block for a file
            ) {
                send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type

                copy_block(buf, stored_len, true); // with header
            } // Determine the best encoding for the current block: dynamic trees, static
            // trees or store, and output the encoded block to the zip file.


            function _tr_flush_block(buf, // input block, or NULL if too old
                stored_len, // length of input block
                eof // true if this is the last block for a file
            ) {
                var opt_lenb, static_lenb; // opt_len and static_len in bytes

                var max_blindex = 0; // index of last bit length code of non zero freq
                // Build the Huffman trees unless a stored block is forced

                if (level > 0) {
                    // Construct the literal and distance trees
                    l_desc.build_tree(that);
                    d_desc.build_tree(that); // At this point, opt_len and static_len are the total bit lengths
                    // of
                    // the compressed block data, excluding the tree representations.
                    // Build the bit length tree for the above two trees, and get the
                    // index
                    // in bl_order of the last bit length code to send.

                    max_blindex = build_bl_tree(); // Determine the best encoding. Compute first the block length in
                    // bytes

                    opt_lenb = that.opt_len + 3 + 7 >>> 3;
                    static_lenb = that.static_len + 3 + 7 >>> 3;
                    if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
                } else {
                    opt_lenb = static_lenb = stored_len + 5; // force a stored block
                }

                if (stored_len + 4 <= opt_lenb && buf != -1) {
                    // 4: two words for the lengths
                    // The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
                    // Otherwise we can't have processed more than WSIZE input bytes
                    // since
                    // the last block flush, because compression would have been
                    // successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
                    // transform a block into a stored block.
                    _tr_stored_block(buf, stored_len, eof);
                } else if (static_lenb == opt_lenb) {
                    send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
                    compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
                } else {
                    send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
                    send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
                    compress_block(dyn_ltree, dyn_dtree);
                } // The above check is made mod 2^32, for files larger than 512 MB
                // and uLong implemented on 32 bits.


                init_block();

                if (eof) {
                    bi_windup();
                }
            }

            function flush_block_only(eof) {
                _tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);

                block_start = strstart;
                strm.flush_pending();
            } // Fill the window when the lookahead becomes insufficient.
            // Updates strstart and lookahead.
            //
            // IN assertion: lookahead < MIN_LOOKAHEAD
            // OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
            // At least one byte has been read, or avail_in === 0; reads are
            // performed for at least two bytes (required for the zip translate_eol
            // option -- not supported here).


            function fill_window() {
                var n, m;
                var p;
                var more; // Amount of free space at the end of the window.

                do {
                    more = window_size - lookahead - strstart; // Deal with !@#$% 64K limit:

                    if (more === 0 && strstart === 0 && lookahead === 0) {
                        more = w_size;
                    } else if (more == -1) {
                        // Very unlikely, but possible on 16 bit machine if strstart ==
                        // 0
                        // and lookahead == 1 (input done one byte at time)
                        more--; // If the window is almost full and there is insufficient
                        // lookahead,
                        // move the upper half to the lower one to make room in the
                        // upper half.
                    } else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
                        window.set(window.subarray(w_size, w_size + w_size), 0);
                        match_start -= w_size;
                        strstart -= w_size; // we now have strstart >= MAX_DIST

                        block_start -= w_size; // Slide the hash table (could be avoided with 32 bit values
                        // at the expense of memory usage). We slide even when level ==
                        // 0
                        // to keep the hash table consistent if we switch back to level
                        // > 0
                        // later. (Using level 0 permanently is not an optimal usage of
                        // zlib, so we don't care about this pathological case.)

                        n = hash_size;
                        p = n;

                        do {
                            m = head[--p] & 0xffff;
                            head[p] = m >= w_size ? m - w_size : 0;
                        } while (--n !== 0);

                        n = w_size;
                        p = n;

                        do {
                            m = prev[--p] & 0xffff;
                            prev[p] = m >= w_size ? m - w_size : 0; // If n is not on any hash chain, prev[n] is garbage but
                            // its value will never be used.
                        } while (--n !== 0);

                        more += w_size;
                    }

                    if (strm.avail_in === 0) return; // If there was no sliding:
                    // strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
                    // more == window_size - lookahead - strstart
                    // => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
                    // => more >= window_size - 2*WSIZE + 2
                    // In the BIG_MEM or MMAP case (not yet supported),
                    // window_size == input_size + MIN_LOOKAHEAD &&
                    // strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
                    // Otherwise, window_size == 2*WSIZE so more >= 2.
                    // If there was sliding, more >= WSIZE. So in all cases, more >= 2.

                    n = strm.read_buf(window, strstart + lookahead, more);
                    lookahead += n; // Initialize the hash value now that we have some input:

                    if (lookahead >= MIN_MATCH) {
                        ins_h = window[strstart] & 0xff;
                        ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask;
                    } // If the whole input has less than MIN_MATCH bytes, ins_h is
                    // garbage,
                    // but this is not important since only literal bytes will be
                    // emitted.

                } while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
            } // Copy without compression as much as possible from the input stream,
            // return
            // the current block state.
            // This function does not insert new strings in the dictionary since
            // uncompressible data is probably not useful. This function is used
            // only for the level=0 compression option.
            // NOTE: this function should be optimized to avoid extra copying from
            // window to pending_buf.


            function deflate_stored(flush) {
                // Stored blocks are limited to 0xffff bytes, pending_buf is limited
                // to pending_buf_size, and each stored block has a 5 byte header:
                var max_block_size = 0xffff;
                var max_start;

                if (max_block_size > pending_buf_size - 5) {
                    max_block_size = pending_buf_size - 5;
                } // Copy as much as possible from input to output:


                while (true) {
                    // Fill the window as much as possible:
                    if (lookahead <= 1) {
                        fill_window();
                        if (lookahead === 0 && flush == Z_NO_FLUSH) return NeedMore;
                        if (lookahead === 0) break; // flush the current block
                    }

                    strstart += lookahead;
                    lookahead = 0; // Emit a stored block if pending_buf will be full:

                    max_start = block_start + max_block_size;

                    if (strstart === 0 || strstart >= max_start) {
                        // strstart === 0 is possible when wraparound on 16-bit machine
                        lookahead = strstart - max_start;
                        strstart = max_start;
                        flush_block_only(false);
                        if (strm.avail_out === 0) return NeedMore;
                    } // Flush if we may have to slide, otherwise block_start may become
                    // negative and the data will be gone:


                    if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
                        flush_block_only(false);
                        if (strm.avail_out === 0) return NeedMore;
                    }
                }

                flush_block_only(flush == Z_FINISH);
                if (strm.avail_out === 0) return flush == Z_FINISH ? FinishStarted : NeedMore;
                return flush == Z_FINISH ? FinishDone : BlockDone;
            }

            function longest_match(cur_match) {
                var chain_length = max_chain_length; // max hash chain length

                var scan = strstart; // current string

                var match; // matched string

                var len; // length of current match

                var best_len = prev_length; // best match length so far

                var limit = strstart > w_size - MIN_LOOKAHEAD ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
                var _nice_match = nice_match; // Stop when cur_match becomes <= limit. To simplify the code,
                // we prevent matches with the string of window index 0.

                var wmask = w_mask;
                var strend = strstart + MAX_MATCH;
                var scan_end1 = window[scan + best_len - 1];
                var scan_end = window[scan + best_len]; // The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
                // 16.
                // It is easy to get rid of this optimization if necessary.
                // Do not waste too much time if we already have a good match:

                if (prev_length >= good_match) {
                    chain_length >>= 2;
                } // Do not look for matches beyond the end of the input. This is
                // necessary
                // to make deflate deterministic.


                if (_nice_match > lookahead) _nice_match = lookahead;

                do {
                    match = cur_match; // Skip to next match if the match length cannot increase
                    // or if the match length is less than 2:

                    if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan] || window[++match] != window[scan + 1]) continue; // The check at best_len-1 can be removed because it will be made
                    // again later. (This heuristic is not always a win.)
                    // It is not necessary to compare scan[2] and match[2] since they
                    // are always equal when the other bytes match, given that
                    // the hash keys are equal and that HASH_BITS >= 8.

                    scan += 2;
                    match++; // We check for insufficient lookahead only every 8th comparison;
                    // the 256th check will be made at strstart+258.

                    do {} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);

                    len = MAX_MATCH - (strend - scan);
                    scan = strend - MAX_MATCH;

                    if (len > best_len) {
                        match_start = cur_match;
                        best_len = len;
                        if (len >= _nice_match) break;
                        scan_end1 = window[scan + best_len - 1];
                        scan_end = window[scan + best_len];
                    }
                } while ((cur_match = prev[cur_match & wmask] & 0xffff) > limit && --chain_length !== 0);

                if (best_len <= lookahead) return best_len;
                return lookahead;
            } // Compress as much as possible from the input stream, return the current
            // block state.
            // This function does not perform lazy evaluation of matches and inserts
            // new strings in the dictionary only for unmatched strings or for short
            // matches. It is used only for the fast compression options.


            function deflate_fast(flush) {
                // short hash_head = 0; // head of the hash chain
                var hash_head = 0; // head of the hash chain

                var bflush; // set if current block must be flushed

                while (true) {
                    // Make sure that we always have enough lookahead, except
                    // at the end of the input file. We need MAX_MATCH bytes
                    // for the next match, plus MIN_MATCH bytes to insert the
                    // string following the next match.
                    if (lookahead < MIN_LOOKAHEAD) {
                        fill_window();

                        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
                            return NeedMore;
                        }

                        if (lookahead === 0) break; // flush the current block
                    } // Insert the string window[strstart .. strstart+2] in the
                    // dictionary, and set hash_head to the head of the hash chain:


                    if (lookahead >= MIN_MATCH) {
                        ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

                        hash_head = head[ins_h] & 0xffff;
                        prev[strstart & w_mask] = head[ins_h];
                        head[ins_h] = strstart;
                    } // Find the longest match, discarding those <= prev_length.
                    // At this point we have always match_length < MIN_MATCH


                    if (hash_head !== 0 && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
                        // To simplify the code, we prevent matches with the string
                        // of window index 0 (in particular we have to avoid a match
                        // of the string with itself at the start of the input file).
                        if (strategy != Z_HUFFMAN_ONLY) {
                            match_length = longest_match(hash_head);
                        } // longest_match() sets match_start

                    }

                    if (match_length >= MIN_MATCH) {
                        // check_match(strstart, match_start, match_length);
                        bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
                        lookahead -= match_length; // Insert new strings in the hash table only if the match length
                        // is not too large. This saves time but degrades compression.

                        if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
                            match_length--; // string at strstart already in hash table

                            do {
                                strstart++;
                                ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

                                hash_head = head[ins_h] & 0xffff;
                                prev[strstart & w_mask] = head[ins_h];
                                head[ins_h] = strstart; // strstart never exceeds WSIZE-MAX_MATCH, so there are
                                // always MIN_MATCH bytes ahead.
                            } while (--match_length !== 0);

                            strstart++;
                        } else {
                            strstart += match_length;
                            match_length = 0;
                            ins_h = window[strstart] & 0xff;
                            ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask; // If lookahead < MIN_MATCH, ins_h is garbage, but it does
                            // not
                            // matter since it will be recomputed at next deflate call.
                        }
                    } else {
                        // No match, output a literal byte
                        bflush = _tr_tally(0, window[strstart] & 0xff);
                        lookahead--;
                        strstart++;
                    }

                    if (bflush) {
                        flush_block_only(false);
                        if (strm.avail_out === 0) return NeedMore;
                    }
                }

                flush_block_only(flush == Z_FINISH);

                if (strm.avail_out === 0) {
                    if (flush == Z_FINISH) return FinishStarted;
                    else return NeedMore;
                }

                return flush == Z_FINISH ? FinishDone : BlockDone;
            } // Same as above, but achieves better compression. We use a lazy
            // evaluation for matches: a match is finally adopted only if there is
            // no better match at the next window position.


            function deflate_slow(flush) {
                // short hash_head = 0; // head of hash chain
                var hash_head = 0; // head of hash chain

                var bflush; // set if current block must be flushed

                var max_insert; // Process the input block.

                while (true) {
                    // Make sure that we always have enough lookahead, except
                    // at the end of the input file. We need MAX_MATCH bytes
                    // for the next match, plus MIN_MATCH bytes to insert the
                    // string following the next match.
                    if (lookahead < MIN_LOOKAHEAD) {
                        fill_window();

                        if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
                            return NeedMore;
                        }

                        if (lookahead === 0) break; // flush the current block
                    } // Insert the string window[strstart .. strstart+2] in the
                    // dictionary, and set hash_head to the head of the hash chain:


                    if (lookahead >= MIN_MATCH) {
                        ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

                        hash_head = head[ins_h] & 0xffff;
                        prev[strstart & w_mask] = head[ins_h];
                        head[ins_h] = strstart;
                    } // Find the longest match, discarding those <= prev_length.


                    prev_length = match_length;
                    prev_match = match_start;
                    match_length = MIN_MATCH - 1;

                    if (hash_head !== 0 && prev_length < max_lazy_match && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
                        // To simplify the code, we prevent matches with the string
                        // of window index 0 (in particular we have to avoid a match
                        // of the string with itself at the start of the input file).
                        if (strategy != Z_HUFFMAN_ONLY) {
                            match_length = longest_match(hash_head);
                        } // longest_match() sets match_start


                        if (match_length <= 5 && (strategy == Z_FILTERED || match_length == MIN_MATCH && strstart - match_start > 4096)) {
                            // If prev_match is also MIN_MATCH, match_start is garbage
                            // but we will ignore the current match anyway.
                            match_length = MIN_MATCH - 1;
                        }
                    } // If there was a match at the previous step and the current
                    // match is not better, output the previous match:


                    if (prev_length >= MIN_MATCH && match_length <= prev_length) {
                        max_insert = strstart + lookahead - MIN_MATCH; // Do not insert strings in hash table beyond this.
                        // check_match(strstart-1, prev_match, prev_length);

                        bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH); // Insert in hash table all strings up to the end of the match.
                        // strstart-1 and strstart are already inserted. If there is not
                        // enough lookahead, the last two strings are not inserted in
                        // the hash table.

                        lookahead -= prev_length - 1;
                        prev_length -= 2;

                        do {
                            if (++strstart <= max_insert) {
                                ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

                                hash_head = head[ins_h] & 0xffff;
                                prev[strstart & w_mask] = head[ins_h];
                                head[ins_h] = strstart;
                            }
                        } while (--prev_length !== 0);

                        match_available = 0;
                        match_length = MIN_MATCH - 1;
                        strstart++;

                        if (bflush) {
                            flush_block_only(false);
                            if (strm.avail_out === 0) return NeedMore;
                        }
                    } else if (match_available !== 0) {
                        // If there was no match at the previous position, output a
                        // single literal. If there was a match but the current match
                        // is longer, truncate the previous match to a single literal.
                        bflush = _tr_tally(0, window[strstart - 1] & 0xff);

                        if (bflush) {
                            flush_block_only(false);
                        }

                        strstart++;
                        lookahead--;
                        if (strm.avail_out === 0) return NeedMore;
                    } else {
                        // There is no previous match to compare with, wait for
                        // the next step to decide.
                        match_available = 1;
                        strstart++;
                        lookahead--;
                    }
                }

                if (match_available !== 0) {
                    bflush = _tr_tally(0, window[strstart - 1] & 0xff);
                    match_available = 0;
                }

                flush_block_only(flush == Z_FINISH);

                if (strm.avail_out === 0) {
                    if (flush == Z_FINISH) return FinishStarted;
                    else return NeedMore;
                }

                return flush == Z_FINISH ? FinishDone : BlockDone;
            }

            function deflateReset(strm) {
                strm.total_in = strm.total_out = 0;
                strm.msg = null; //

                that.pending = 0;
                that.pending_out = 0;
                status = BUSY_STATE;
                last_flush = Z_NO_FLUSH;
                tr_init();
                lm_init();
                return Z_OK;
            }

            that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
                if (!_method) _method = Z_DEFLATED;
                if (!memLevel) memLevel = DEF_MEM_LEVEL;
                if (!_strategy) _strategy = Z_DEFAULT_STRATEGY; // byte[] my_version=ZLIB_VERSION;
                //
                // if (!version || version[0] != my_version[0]
                // || stream_size != sizeof(z_stream)) {
                // return Z_VERSION_ERROR;
                // }

                strm.msg = null;
                if (_level == Z_DEFAULT_COMPRESSION) _level = 6;

                if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
                    return Z_STREAM_ERROR;
                }

                strm.dstate = that;
                w_bits = bits;
                w_size = 1 << w_bits;
                w_mask = w_size - 1;
                hash_bits = memLevel + 7;
                hash_size = 1 << hash_bits;
                hash_mask = hash_size - 1;
                hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
                window = new Uint8Array(w_size * 2);
                prev = [];
                head = [];
                lit_bufsize = 1 << memLevel + 6; // 16K elements by default
                // We overlay pending_buf and d_buf+l_buf. This works since the average
                // output size for (length,distance) codes is <= 24 bits.

                that.pending_buf = new Uint8Array(lit_bufsize * 4);
                pending_buf_size = lit_bufsize * 4;
                d_buf = Math.floor(lit_bufsize / 2);
                l_buf = (1 + 2) * lit_bufsize;
                level = _level;
                strategy = _strategy;
                return deflateReset(strm);
            };

            that.deflateEnd = function () {
                if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
                    return Z_STREAM_ERROR;
                } // Deallocate in reverse order of allocations:


                that.pending_buf = null;
                head = null;
                prev = null;
                window = null; // free

                that.dstate = null;
                return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
            };

            that.deflateParams = function (strm, _level, _strategy) {
                var err = Z_OK;

                if (_level == Z_DEFAULT_COMPRESSION) {
                    _level = 6;
                }

                if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
                    return Z_STREAM_ERROR;
                }

                if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
                    // Flush the last buffer:
                    err = strm.deflate(Z_PARTIAL_FLUSH);
                }

                if (level != _level) {
                    level = _level;
                    max_lazy_match = config_table[level].max_lazy;
                    good_match = config_table[level].good_length;
                    nice_match = config_table[level].nice_length;
                    max_chain_length = config_table[level].max_chain;
                }

                strategy = _strategy;
                return err;
            };

            that.deflateSetDictionary = function (strm, dictionary, dictLength) {
                var length = dictLength;
                var n,
                    index = 0;
                if (!dictionary || status != INIT_STATE) return Z_STREAM_ERROR;
                if (length < MIN_MATCH) return Z_OK;

                if (length > w_size - MIN_LOOKAHEAD) {
                    length = w_size - MIN_LOOKAHEAD;
                    index = dictLength - length; // use the tail of the dictionary
                }

                window.set(dictionary.subarray(index, index + length), 0);
                strstart = length;
                block_start = length; // Insert all strings in the hash table (except for the last two bytes).
                // s->lookahead stays null, so s->ins_h will be recomputed at the next
                // call of fill_window.

                ins_h = window[0] & 0xff;
                ins_h = (ins_h << hash_shift ^ window[1] & 0xff) & hash_mask;

                for (n = 0; n <= length - MIN_MATCH; n++) {
                    ins_h = (ins_h << hash_shift ^ window[n + (MIN_MATCH - 1)] & 0xff) & hash_mask;
                    prev[n & w_mask] = head[ins_h];
                    head[ins_h] = n;
                }

                return Z_OK;
            };

            that.deflate = function (_strm, flush) {
                var i, header, level_flags, old_flush, bstate;

                if (flush > Z_FINISH || flush < 0) {
                    return Z_STREAM_ERROR;
                }

                if (!_strm.next_out || !_strm.next_in && _strm.avail_in !== 0 || status == FINISH_STATE && flush != Z_FINISH) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR];
                    return Z_STREAM_ERROR;
                }

                if (_strm.avail_out === 0) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
                    return Z_BUF_ERROR;
                }

                strm = _strm; // just in case

                old_flush = last_flush;
                last_flush = flush; // Write the zlib header

                if (status == INIT_STATE) {
                    header = Z_DEFLATED + (w_bits - 8 << 4) << 8;
                    level_flags = (level - 1 & 0xff) >> 1;
                    if (level_flags > 3) level_flags = 3;
                    header |= level_flags << 6;
                    if (strstart !== 0) header |= PRESET_DICT;
                    header += 31 - header % 31;
                    status = BUSY_STATE;
                    putShortMSB(header);
                } // Flush as much pending output as possible


                if (that.pending !== 0) {
                    strm.flush_pending();

                    if (strm.avail_out === 0) {
                        // console.log(" avail_out==0");
                        // Since avail_out is 0, deflate will be called again with
                        // more output space, but possibly with both pending and
                        // avail_in equal to zero. There won't be anything to do,
                        // but this is not an error situation so make sure we
                        // return OK instead of BUF_ERROR at next call of deflate:
                        last_flush = -1;
                        return Z_OK;
                    } // Make sure there is something to do and avoid duplicate
                    // consecutive
                    // flushes. For repeated and useless calls with Z_FINISH, we keep
                    // returning Z_STREAM_END instead of Z_BUFF_ERROR.

                } else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
                    strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
                    return Z_BUF_ERROR;
                } // User must not provide more input after the first FINISH:


                if (status == FINISH_STATE && strm.avail_in !== 0) {
                    _strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
                    return Z_BUF_ERROR;
                } // Start a new block or continue the current one.


                if (strm.avail_in !== 0 || lookahead !== 0 || flush != Z_NO_FLUSH && status != FINISH_STATE) {
                    bstate = -1;

                    switch (config_table[level].func) {
                        case STORED:
                            bstate = deflate_stored(flush);
                            break;

                        case FAST:
                            bstate = deflate_fast(flush);
                            break;

                        case SLOW:
                            bstate = deflate_slow(flush);
                            break;

                        default:
                    }

                    if (bstate == FinishStarted || bstate == FinishDone) {
                        status = FINISH_STATE;
                    }

                    if (bstate == NeedMore || bstate == FinishStarted) {
                        if (strm.avail_out === 0) {
                            last_flush = -1; // avoid BUF_ERROR next call, see above
                        }

                        return Z_OK; // If flush != Z_NO_FLUSH && avail_out === 0, the next call
                        // of deflate should use the same flush parameter to make sure
                        // that the flush is complete. So we don't have to output an
                        // empty block here, this will be done at next call. This also
                        // ensures that for a very small output buffer, we emit at most
                        // one empty block.
                    }

                    if (bstate == BlockDone) {
                        if (flush == Z_PARTIAL_FLUSH) {
                            _tr_align();
                        } else {
                            // FULL_FLUSH or SYNC_FLUSH
                            _tr_stored_block(0, 0, false); // For a full flush, this empty block will be recognized
                            // as a special marker by inflate_sync().


                            if (flush == Z_FULL_FLUSH) {
                                // state.head[s.hash_size-1]=0;
                                for (i = 0; i < hash_size
                                    /*-1*/
                                    ; i++) {
                                    // forget history
                                    head[i] = 0;
                                }
                            }
                        }

                        strm.flush_pending();

                        if (strm.avail_out === 0) {
                            last_flush = -1; // avoid BUF_ERROR at next call, see above

                            return Z_OK;
                        }
                    }
                }

                if (flush != Z_FINISH) return Z_OK;
                return Z_STREAM_END;
            };
        } // ZStream


        function ZStream() {
            var that = this;
            that.next_in_index = 0;
            that.next_out_index = 0; // that.next_in; // next input byte

            that.avail_in = 0; // number of bytes available at next_in

            that.total_in = 0; // total nb of input bytes read so far
            // that.next_out; // next output byte should be put there

            that.avail_out = 0; // remaining free space at next_out

            that.total_out = 0; // total nb of bytes output so far
            // that.msg;
            // that.dstate;
        }

        ZStream.prototype = {
            deflateInit: function deflateInit(level, bits) {
                var that = this;
                that.dstate = new Deflate();
                if (!bits) bits = MAX_BITS;
                return that.dstate.deflateInit(that, level, bits);
            },
            deflate: function deflate(flush) {
                var that = this;

                if (!that.dstate) {
                    return Z_STREAM_ERROR;
                }

                return that.dstate.deflate(that, flush);
            },
            deflateEnd: function deflateEnd() {
                var that = this;
                if (!that.dstate) return Z_STREAM_ERROR;
                var ret = that.dstate.deflateEnd();
                that.dstate = null;
                return ret;
            },
            deflateParams: function deflateParams(level, strategy) {
                var that = this;
                if (!that.dstate) return Z_STREAM_ERROR;
                return that.dstate.deflateParams(that, level, strategy);
            },
            deflateSetDictionary: function deflateSetDictionary(dictionary, dictLength) {
                var that = this;
                if (!that.dstate) return Z_STREAM_ERROR;
                return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
            },
            // Read a new buffer from the current input stream, update the
            // total number of bytes read. All deflate() input goes through
            // this function so some applications may wish to modify it to avoid
            // allocating a large strm->next_in buffer and copying from it.
            // (See also flush_pending()).
            read_buf: function read_buf(buf, start, size) {
                var that = this;
                var len = that.avail_in;
                if (len > size) len = size;
                if (len === 0) return 0;
                that.avail_in -= len;
                buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
                that.next_in_index += len;
                that.total_in += len;
                return len;
            },
            // Flush as much pending output as possible. All deflate() output goes
            // through this function so some applications may wish to modify it
            // to avoid allocating a large strm->next_out buffer and copying into it.
            // (See also read_buf()).
            flush_pending: function flush_pending() {
                var that = this;
                var len = that.dstate.pending;
                if (len > that.avail_out) len = that.avail_out;
                if (len === 0) return; // if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
                // || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
                // len)) {
                // console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
                // that.next_out_index + ", " + len);
                // console.log("avail_out=" + that.avail_out);
                // }

                that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
                that.next_out_index += len;
                that.dstate.pending_out += len;
                that.total_out += len;
                that.avail_out -= len;
                that.dstate.pending -= len;

                if (that.dstate.pending === 0) {
                    that.dstate.pending_out = 0;
                }
            }
        }; // Deflater

        function Deflater(options) {
            var that = this;
            var z = new ZStream();
            var bufsize = 512;
            var flush = Z_NO_FLUSH;
            var buf = new Uint8Array(bufsize);
            var level = options ? options.level : Z_DEFAULT_COMPRESSION;
            if (typeof level == "undefined") level = Z_DEFAULT_COMPRESSION;
            z.deflateInit(level);
            z.next_out = buf;

            that.append = function (data, onprogress) {
                var err,
                    buffers = [],
                    lastIndex = 0,
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;
                if (!data.length) return;
                z.next_in_index = 0;
                z.next_in = data;
                z.avail_in = data.length;

                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    err = z.deflate(flush);
                    if (err != Z_OK) throw new Error("deflating: " + z.msg);
                    if (z.next_out_index)
                        if (z.next_out_index == bufsize) buffers.push(new Uint8Array(buf));
                        else buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                    bufferSize += z.next_out_index;

                    if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
                        onprogress(z.next_in_index);
                        lastIndex = z.next_in_index;
                    }
                } while (z.avail_in > 0 || z.avail_out === 0);

                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };

            that.flush = function () {
                var err,
                    buffers = [],
                    bufferIndex = 0,
                    bufferSize = 0,
                    array;

                do {
                    z.next_out_index = 0;
                    z.avail_out = bufsize;
                    err = z.deflate(Z_FINISH);
                    if (err != Z_STREAM_END && err != Z_OK) throw new Error("deflating: " + z.msg);
                    if (bufsize - z.avail_out > 0) buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
                    bufferSize += z.next_out_index;
                } while (z.avail_in > 0 || z.avail_out === 0);

                z.deflateEnd();
                array = new Uint8Array(bufferSize);
                buffers.forEach(function (chunk) {
                    array.set(chunk, bufferIndex);
                    bufferIndex += chunk.length;
                });
                return array;
            };
        } // 'zip' may not be defined in z-worker and some tests


        var env = global.zip || global;
        env.Deflater = env._jzlib_Deflater = Deflater;
    })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')()); // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window


    /**
     * A class to parse color values
     * @author Stoyan Stefanov <sstoo@gmail.com>
     * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
     * @license Use it if you like it
     */
    (function (global) {

        function RGBColor(color_string) {
            color_string = color_string || '';
            this.ok = false; // strip any leading #

            if (color_string.charAt(0) == '#') {
                // remove # if any
                color_string = color_string.substr(1, 6);
            }

            color_string = color_string.replace(/ /g, '');
            color_string = color_string.toLowerCase();
            var channels; // before getting into regexps, try simple matches
            // and overwrite the input

            var simple_colors = {
                aliceblue: 'f0f8ff',
                antiquewhite: 'faebd7',
                aqua: '00ffff',
                aquamarine: '7fffd4',
                azure: 'f0ffff',
                beige: 'f5f5dc',
                bisque: 'ffe4c4',
                black: '000000',
                blanchedalmond: 'ffebcd',
                blue: '0000ff',
                blueviolet: '8a2be2',
                brown: 'a52a2a',
                burlywood: 'deb887',
                cadetblue: '5f9ea0',
                chartreuse: '7fff00',
                chocolate: 'd2691e',
                coral: 'ff7f50',
                cornflowerblue: '6495ed',
                cornsilk: 'fff8dc',
                crimson: 'dc143c',
                cyan: '00ffff',
                darkblue: '00008b',
                darkcyan: '008b8b',
                darkgoldenrod: 'b8860b',
                darkgray: 'a9a9a9',
                darkgreen: '006400',
                darkkhaki: 'bdb76b',
                darkmagenta: '8b008b',
                darkolivegreen: '556b2f',
                darkorange: 'ff8c00',
                darkorchid: '9932cc',
                darkred: '8b0000',
                darksalmon: 'e9967a',
                darkseagreen: '8fbc8f',
                darkslateblue: '483d8b',
                darkslategray: '2f4f4f',
                darkturquoise: '00ced1',
                darkviolet: '9400d3',
                deeppink: 'ff1493',
                deepskyblue: '00bfff',
                dimgray: '696969',
                dodgerblue: '1e90ff',
                feldspar: 'd19275',
                firebrick: 'b22222',
                floralwhite: 'fffaf0',
                forestgreen: '228b22',
                fuchsia: 'ff00ff',
                gainsboro: 'dcdcdc',
                ghostwhite: 'f8f8ff',
                gold: 'ffd700',
                goldenrod: 'daa520',
                gray: '808080',
                green: '008000',
                greenyellow: 'adff2f',
                honeydew: 'f0fff0',
                hotpink: 'ff69b4',
                indianred: 'cd5c5c',
                indigo: '4b0082',
                ivory: 'fffff0',
                khaki: 'f0e68c',
                lavender: 'e6e6fa',
                lavenderblush: 'fff0f5',
                lawngreen: '7cfc00',
                lemonchiffon: 'fffacd',
                lightblue: 'add8e6',
                lightcoral: 'f08080',
                lightcyan: 'e0ffff',
                lightgoldenrodyellow: 'fafad2',
                lightgrey: 'd3d3d3',
                lightgreen: '90ee90',
                lightpink: 'ffb6c1',
                lightsalmon: 'ffa07a',
                lightseagreen: '20b2aa',
                lightskyblue: '87cefa',
                lightslateblue: '8470ff',
                lightslategray: '778899',
                lightsteelblue: 'b0c4de',
                lightyellow: 'ffffe0',
                lime: '00ff00',
                limegreen: '32cd32',
                linen: 'faf0e6',
                magenta: 'ff00ff',
                maroon: '800000',
                mediumaquamarine: '66cdaa',
                mediumblue: '0000cd',
                mediumorchid: 'ba55d3',
                mediumpurple: '9370d8',
                mediumseagreen: '3cb371',
                mediumslateblue: '7b68ee',
                mediumspringgreen: '00fa9a',
                mediumturquoise: '48d1cc',
                mediumvioletred: 'c71585',
                midnightblue: '191970',
                mintcream: 'f5fffa',
                mistyrose: 'ffe4e1',
                moccasin: 'ffe4b5',
                navajowhite: 'ffdead',
                navy: '000080',
                oldlace: 'fdf5e6',
                olive: '808000',
                olivedrab: '6b8e23',
                orange: 'ffa500',
                orangered: 'ff4500',
                orchid: 'da70d6',
                palegoldenrod: 'eee8aa',
                palegreen: '98fb98',
                paleturquoise: 'afeeee',
                palevioletred: 'd87093',
                papayawhip: 'ffefd5',
                peachpuff: 'ffdab9',
                peru: 'cd853f',
                pink: 'ffc0cb',
                plum: 'dda0dd',
                powderblue: 'b0e0e6',
                purple: '800080',
                red: 'ff0000',
                rosybrown: 'bc8f8f',
                royalblue: '4169e1',
                saddlebrown: '8b4513',
                salmon: 'fa8072',
                sandybrown: 'f4a460',
                seagreen: '2e8b57',
                seashell: 'fff5ee',
                sienna: 'a0522d',
                silver: 'c0c0c0',
                skyblue: '87ceeb',
                slateblue: '6a5acd',
                slategray: '708090',
                snow: 'fffafa',
                springgreen: '00ff7f',
                steelblue: '4682b4',
                tan: 'd2b48c',
                teal: '008080',
                thistle: 'd8bfd8',
                tomato: 'ff6347',
                turquoise: '40e0d0',
                violet: 'ee82ee',
                violetred: 'd02090',
                wheat: 'f5deb3',
                white: 'ffffff',
                whitesmoke: 'f5f5f5',
                yellow: 'ffff00',
                yellowgreen: '9acd32'
            };

            for (var key in simple_colors) {
                if (color_string == key) {
                    color_string = simple_colors[key];
                }
            } // emd of simple type-in colors
            // array of color definition objects


            var color_defs = [{
                re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
                process: function process(bits) {
                    return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
                }
            }, {
                re: /^(\w{2})(\w{2})(\w{2})$/,
                example: ['#00ff00', '336699'],
                process: function process(bits) {
                    return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
                }
            }, {
                re: /^(\w{1})(\w{1})(\w{1})$/,
                example: ['#fb0', 'f0f'],
                process: function process(bits) {
                    return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
                }
            }]; // search through the definitions to find a match

            for (var i = 0; i < color_defs.length; i++) {
                var re = color_defs[i].re;
                var processor = color_defs[i].process;
                var bits = re.exec(color_string);

                if (bits) {
                    channels = processor(bits);
                    this.r = channels[0];
                    this.g = channels[1];
                    this.b = channels[2];
                    this.ok = true;
                }
            } // validate/cleanup values


            this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
            this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
            this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b; // some getters

            this.toRGB = function () {
                return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
            };

            this.toHex = function () {
                var r = this.r.toString(16);
                var g = this.g.toString(16);
                var b = this.b.toString(16);
                if (r.length == 1) r = '0' + r;
                if (g.length == 1) g = '0' + g;
                if (b.length == 1) b = '0' + b;
                return '#' + r + g + b;
            };
        }

        global.RGBColor = RGBColor;
    })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || Function('return typeof this === "object" && this.content')() || Function('return this')()); // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window
}));

try {
    module.exports = jsPDF;
} catch (e) {}