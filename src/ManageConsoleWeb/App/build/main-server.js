(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(16);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = msg;
function msg(title, text, type) {
    var temp = new PNotify({
        title: title,
        text: text,
        type: type,
        styling: 'bootstrap3'
    });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = {
    send: function send(url, data, method, callback, errorcb) {
        $.ajax({
            type: method,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function success(data, status, xhr) {
                if (callback !== undefined || callback !== null) callback(data);
            },
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            error: function error(xhr, status, _error) {
                if (xhr.status === 401) {
                    window.location.href = "/login";
                } else if (xhr.status === 403) {
                    //forbidden
                    (0, _msg2.default)("错误", "您没有权限做此操作!请联系管理员", "error");
                    window.location.href = "/Account/AccessDenied";
                    return;
                }
                if (errorcb !== undefined && errorcb !== null && typeof errorcb === "function") errorcb(xhr, status, _error);else (0, _msg2.default)("失败", "服务器异常!请从新尝试!", "error");
            }
        });
    },
    post: function post(url, data, callback, errorcb) {
        this.send(url, data, "POST", callback, errorcb);
    },
    get: function get(url, data, callback, errorcb) {
        $.ajax({
            type: "get",
            url: url,
            data: data,
            success: function success(data, status, xhr) {
                if (callback !== undefined || callback !== null) callback(data);
            },
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            error: function error(xhr, status, _error2) {
                if (xhr.status === 401) {
                    window.location.href = "/login";
                } else if (xhr.status === 403) {
                    //forbidden
                    (0, _msg2.default)("错误", "您没有权限做此操作!请联系管理员", "error");
                    window.location.href = "/Account/AccessDenied";
                    return;
                }
                if (errorcb !== undefined && errorcb !== null && typeof errorcb === "function") errorcb(xhr, status, _error2);else (0, _msg2.default)("失败", "服务器异常!请从新尝试!", "error");
            }
        });
    },
    put: function put(url, data, callback, errorcb) {
        this.send(url, data, "PUT", callback, errorcb);
    },
    delete: function _delete(url, data, callback, errorcb) {
        this.send(url, data, "DELETE", callback, errorcb);
    },
    patch: function patch(url, data, callback, errorcb) {
        this.send(url, data, "PATCH", callback, errorcb);
    }
}; //let $ = require("jquery");//先不处理
exports.default = http;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(22);
var isBuffer = __webpack_require__(103);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ActionTypes = {
    Role: {
        LOADALL: "ROLE.LOADAA", //加载所有的角色
        ADD: "ROLE.ADD", //添加一个角色
        DELETE: "ROLE.DELETE", //删除一个角色
        UPDATE: "ROLE.UPDATE", //更新一个角色
        SELECT: "ROLE.SELECT", //选中一个角色 important
        LOADALLCLIENT: "ROLE.LOADALLCLIENT", //获取所有的客户端
        LOADALLUSERS: "ROLE.LOADALLUSERS",
        LOADROLEUSERS: "ROLE.LOADROLEUSERS", //获取角色下面的多个用户
        REMOVEUSERS: "ROLE.REMOVEUSERS" //移除一个角色下面多个用户
    },
    UserRole: {
        LOAD: "USERROlE.LOAD", //加载一个角色下面的用户
        ADD: "USERROLE.ADD", //角色下加入一个用户
        DELETE: "USERROLE.DELETE", //删除一个用户
        USERREMOVEROLES: "USERROLE.USERREMOVEROLES",
        UPDATEUSERROLES: "USERROLE.UPDATEUSERROLES"
    },
    Client: {
        ADD: "CLIENT.ADD", //添加一个客户端
        LOAD: "CLIENT.LOAD", //加载一个所有的客户端
        UPDATE: "CLIENT.UPDATE",
        DELETE: "CLIENT.DELETE" //删除一个客户端
    },
    Resouces: {
        LOAD: "RESOUCES.LOAD", //加载所有的资源
        ADD: "RESOUCES.ADD", //添加一个资源
        UPDATE: "RESOUCES.UPDATE", //更新一个资源
        DELETE: "RESOUCES.DELETE" //删除一个资源
    },
    User: {
        LOAD: "USER.LOAD",
        DELETE: "USER.DELETE", //删除一个用户
        SEARCH: "USER.SEARCH",
        EDITMOBILE: "USER.EDITMOBILE", //修改手机号码
        EDITPASSWORD: "USER.EDITPASSWORD",
        UPDATESTATE: "USER.UPDATESTATE", //修改状态
        ADD: "USER.ADD",
        EDITUSERNAME: "USER.EDITUSERNAME"
    },
    EMP: {
        LOAD: "EMP.LOAD", //加载所有的
        CREATEUSER: "EMP.CREATEUSER" //创建用户
    }
};

exports.default = ActionTypes;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(232);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = confirm;
function confirm(cb, message) {
    $.confirm({
        title: '确认!',
        content: message,
        buttons: {
            confirm: {
                text: "确定",
                btnClass: "btn-blue",
                action: cb
            },
            cancel: {
                text: "取消",
                btnClass: "btn-blue",
                action: function action() {}
            }
        }

    });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(565);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "loader" },
                _react2.default.createElement(
                    "div",
                    { className: "loader-inner ball-pulse" },
                    _react2.default.createElement("div", { style: { backgroundColor: "#74aabe" } }),
                    _react2.default.createElement("div", { style: { backgroundColor: "#74aabe" } }),
                    _react2.default.createElement("div", { style: { backgroundColor: "#74aabe" } })
                )
            );
        }
    }]);

    return Loading;
}(_react.Component);

exports.default = Loading;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//分页控件,index表示当前的页码,pageCount代表的是总的页数
var Pager = function (_Component) {
    _inherits(Pager, _Component);

    function Pager(props) {
        _classCallCheck(this, Pager);

        var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));

        _this.state = {
            showIndex: 5
        };
        return _this;
    }

    _createClass(Pager, [{
        key: "hanldeClick",
        value: function hanldeClick(index) {
            var pageCount = this.props.pageCount;

            if (index <= 0 || index > pageCount) //超出索引不做任何的操作
                return;
            if (this.props.click) {
                this.props.click(index);
            }
        }
    }, {
        key: "renderPages",
        value: function renderPages() {
            var _this2 = this;

            //解构赋值
            var indexs = [];
            var _props = this.props,
                index = _props.index,
                pageCount = _props.pageCount,
                showCount = _props.showCount;

            var showIndex = 5;
            for (var i = 1; i <= pageCount; i++) {
                indexs.push(i);
            }
            var startIndex = index - showCount / 2;
            var spliceStart = startIndex < 0 ? 0 : startIndex + showIndex < pageCount ? startIndex : pageCount - showIndex;
            spliceStart = spliceStart < 0 ? 0 : spliceStart;
            indexs = indexs.splice(spliceStart, showIndex);
            return indexs.map(function (u) {
                var className = "paginate_button ";
                if (u === index) {
                    className += "active";
                }
                return _react2.default.createElement(
                    "li",
                    { onClick: _this2.hanldeClick.bind(_this2, u), className: className },
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0)" },
                        u
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                { className: "dataTables_paginate paging_simple_numbers", id: "datatable_paginate" },
                _react2.default.createElement(
                    "ul",
                    { className: "pagination" },
                    _react2.default.createElement(
                        "li",
                        { className: "paginate_button previous", onClick: this.hanldeClick.bind(this, this.props.index - 1) },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)" },
                            "Previous"
                        )
                    ),
                    this.renderPages(),
                    _react2.default.createElement(
                        "li",
                        { className: "paginate_button next", onClick: this.hanldeClick.bind(this, this.props.index + 1) },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)" },
                            "Next"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "span",
                            null,
                            " \u5F53\u524D\u7B2C",
                            this.props.index,
                            "\u9875,\u603B\u8BA1",
                            this.props.pageCount,
                            "\u9875"
                        )
                    )
                )
            );
        }
    }]);

    return Pager;
}(_react.Component);

exports.default = Pager;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.msg = msg;
function msg(title, text, type) {
    var temp = new PNotify({
        title: title,
        text: text,
        type: type,
        styling: 'bootstrap3'
    });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var urls = {
    dbInfo: {
        loadAll: "/DbInfoManager?handler=AllDbInfo", //载入所有的dbinfo信息
        update: "/DbInfoManager?handler=AddOrEditOrDelete", //更新dbinfo的信息
        del: "/DbInfoManager?handler=AddOrEditOrDelete", //删除一个dbinfo的信息
        add: "/DbInfoManager?handler=AddOrEditOrDelete" //添加一个dbinfo的信息    
    },
    ingestJob: {
        loadAll: "/IngestJobsManager?handler=AllInstance",
        update: "/IngestJobsManager?handler=ActionInstance",
        del: "/IngestJobsManager?handler=ActionInstance",
        add: "/IngestJobsManager?handler=ActionInstance"
    },
    ingestInstance: {
        loadAll: "/InstanceManager?handler=AllInstance",
        update: "/InstanceManager?handler=ActionInstance",
        del: "/InstanceManager?handler=ActionInstance",
        add: "/InstanceManager?handler=ActionInstance"
    },
    schedulefullingest: {
        loadAll: "/ScheduleManager?handler=AllInstance",
        update: "/ScheduleManager?handler=ActionInstance",
        del: "/ScheduleManager?handler=ActionInstance",
        add: "/ScheduleManager?handler=ActionInstance"
    }
};

exports.default = urls;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(539);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(105);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(106);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(111);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(24);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(590);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = __webpack_require__(59);

var Client = _interopRequireWildcard(_client);

var _resources = __webpack_require__(60);

var Resources = _interopRequireWildcard(_resources);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ClientActions = {
    Client: Client,
    Resources: Resources
};

exports.default = ClientActions;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _role = __webpack_require__(66);

var Role = _interopRequireWildcard(_role);

var _userrole = __webpack_require__(67);

var RoleUser = _interopRequireWildcard(_userrole);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RoleActions = {
    Role: Role,
    RoleUser: RoleUser
};

exports.default = RoleActions;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = __webpack_require__(82);

var User = _interopRequireWildcard(_user);

var _Emp = __webpack_require__(83);

var Emp = _interopRequireWildcard(_Emp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UserActions = {
    User: User,
    Emp: Emp
};

exports.default = UserActions;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_Component) {
    _inherits(SearchBar, _Component);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: "search",
        value: function search(e) {
            e.preventDefault();
            var data = this.getFormData();
            if (this.props.load) {
                this.props.load(data);
            }
        }
    }, {
        key: "getFormData",
        value: function getFormData() {
            var data = {};
            data["IDKey"] = parseInt($('#IDKey').val());
            data["name"] = $("#name").val();
            data["deptName"] = $('#deptName').val();
            data["srcOrgName"] = $("#srcOrgName").val();
            data["fRelationStatus"] = $("#fRelationStatus").val();
            data["number"] = $("#number").val();
            return data;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "form",
                { className: "form-inline" },
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "IDKey"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "text", className: "form-control", id: "IDKey", placeholder: "\u6309Id\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "\u59D3\u540D"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "email", className: "form-control", id: "name", placeholder: "\u6309\u59D3\u540D\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "\u5458\u5DE5\u7F16\u53F7"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "email", className: "form-control", id: "number", placeholder: "\u6309\u5458\u5DE5\u7F16\u53F7\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "\u804C\u4F4D"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "email", className: "form-control", id: "deptName", placeholder: "\u6309\u804C\u4F4D\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "\u7EC4\u7EC7\u673A\u6784"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "email", className: "form-control", id: "srcOrgName", placeholder: "\u6309\u7EC4\u7EC7\u673A\u6784\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "\u5165\u804C\u72B6\u6001"
                    ),
                    "\xA0",
                    _react2.default.createElement("input", { type: "email", className: "form-control", id: "fRelationStatus", placeholder: "\u6309\u5165\u804C\u72B6\u6001\u641C\u7D22" }),
                    "\xA0\xA0\xA0"
                ),
                _react2.default.createElement(
                    "button",
                    { type: "submit", className: "btn btn-default", onClick: this.search.bind(this) },
                    "\u641C\u7D22"
                )
            );
        }
    }]);

    return SearchBar;
}(_react.Component);

exports.default = SearchBar;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(16);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(29);
var http = __webpack_require__(26);
var https = __webpack_require__(27);
var assert = __webpack_require__(112);
var Writable = __webpack_require__(113).Writable;
var debug = __webpack_require__(114)("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data and end
  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;
    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(116);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(34);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = __webpack_require__(35);

var _reactRouterRedux = __webpack_require__(17);

var _reactRedux = __webpack_require__(8);

var _server = __webpack_require__(40);

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

var _aspnetPrerendering = __webpack_require__(53);

var _routers = __webpack_require__(54);

var _reactRouterDom = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _aspnetPrerendering.createServerRenderer)(function (params) {
    return new Promise(function (resolvue, reject) {
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var routerContext = {};

        // 服务器端渲染
        var html = (0, _server.renderToString)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: _store2.default },
            _react2.default.createElement(_reactRouterDom.StaticRouter, { basename: basename, context: routerContext, location: params.location.path, children: _routers.routes })
        ));

        resolvue({ html: html });
    });
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(260);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36)


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */

if (true) {
  module.exports = __webpack_require__(37);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(38);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */

if (true) {
  module.exports = __webpack_require__(39);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */

var React = __webpack_require__(0);

var Component = React.Component;

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer() {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
  }

  _createClass(AppContainer, [{
    key: 'render',
    value: function render() {
      if (this.props.component) {
        return React.createElement(this.props.component, this.props.props);
      }

      return React.Children.only(this.props.children);
    }
  }]);

  return AppContainer;
}(Component);

module.exports = AppContainer;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(535);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _reduxLogger = __webpack_require__(42);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = __webpack_require__(43);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterRedux = __webpack_require__(17);

var _role = __webpack_require__(44);

var _role2 = _interopRequireDefault(_role);

var _client = __webpack_require__(47);

var _client2 = _interopRequireDefault(_client);

var _user = __webpack_require__(50);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    Role: _role2.default,
    Client: _client2.default,
    User: _user2.default
});

//引入reducers


var Store = (0, _redux.createStore)(rootReducer, (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxLogger2.default));
exports.default = Store;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(593);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(594);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _role = __webpack_require__(45);

var _role2 = _interopRequireDefault(_role);

var _userrole = __webpack_require__(46);

var _userrole2 = _interopRequireDefault(_userrole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoleReducers = (0, _redux.combineReducers)({
    Role: _role2.default,
    UserRole: _userrole2.default
});

exports.default = RoleReducers;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Role;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    select: "", //选中的Id
    datas: [],
    clients: [], //客户端资源
    users: [], //所有用户
    roleUsers: [] //角色下面的用户
};

function Role() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.Role.REMOVEUSERS:
            //这里从新公共一个类库出来
            var temps = []; //将会被删除的数据
            var ids = action.ids;
            for (var i = 0; i < state.roleUsers.length; i++) {
                for (var j = 0; j < ids.length; j++) {
                    if (state.roleUsers[i].id === ids[j]) {
                        temps.push(state.roleUsers[i]);
                    }
                }
            }

            for (var _i = 0; _i < temps.length; _i++) {
                var _index = state.roleUsers.indexOf(temps[_i]);
                if (_index > -1) state.roleUsers.splice(_index, 1);
            }
            return state;
        case _ActionTypes2.default.Role.LOADROLEUSERS:
            state.roleUsers = action.datas;
            return state;
        case _ActionTypes2.default.Role.LOADALLUSERS:
            state.users = action.datas;
            return state;
        case _ActionTypes2.default.Role.LOADALLCLIENT:

            state.clients = action.clients;
            return state;
        case _ActionTypes2.default.Role.LOADALL:
            state.datas = []; //清楚之前的影响
            for (var _i2 = 0; _i2 < action.datas.length; _i2++) {
                state.datas.push(action.datas[_i2]);
            }
            return state;

        case _ActionTypes2.default.Role.UPDATE:

            for (var _i3 = 0; _i3 < state.datas.length; _i3++) {
                if (state.datas[_i3].id === action.data.id) {
                    state.datas[_i3].name = action.data.name;
                    state.datas[_i3].clientIds = [];
                    for (var _j = 0; _j < action.data.clientId.length; _j++) {
                        var id = action.data.clientId[_j];
                        //根据id找到客户端名称
                        var client = state.clients.filter(function (u) {
                            return u.clientId === id;
                        })[0];
                        state.datas[_i3].clientIds.push({ clientId: id, clientName: client.clientName });
                    }
                    break;
                }
            }
            return state;

        case _ActionTypes2.default.Role.ADD:
            var item = {
                id: action.data.id,
                name: action.data.name,
                clientIds: [] //遍历查找
            };
            action.data.clientId.map(function (u) {
                var client = state.clients.filter(function (x) {
                    return x.clientId === u;
                })[0]; //必须找到
                item.clientIds.push({ clientId: client.clientId, clientName: client.clientName });
            });
            state.datas.push(item);
            return state;
        case _ActionTypes2.default.Role.DELETE:

            var temp = null;
            for (var _i4 = 0; _i4 < state.datas.length; _i4++) {
                if (state.datas[_i4].id === action.id) temp = state.datas[_i4];
            }
            if (temp != null) {
                var index = state.datas.indexOf(temp);
                if (index > -1) state.datas.splice(index, 1);
            }
            return state;
        case _ActionTypes2.default.Role.SELECT:

            state.select = action.id;
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = UserRole;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    items: []
};

function UserRole() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.UserRole.UPDATEUSERROLES:
            var temp = null;
            for (var i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.data.userId) {
                    temp = state.items[i];
                    break;
                }
            }
            temp.roles = action.data.roles;
            return state;
        case _ActionTypes2.default.UserRole.USERREMOVEROLES:
            var temp = null;
            var tempRoles = []; //将要排除的
            for (var _i = 0; _i < state.items.length; _i++) {
                if (state.items[_i].id === action.data.userId) {
                    temp = state.items[_i]; //肯定会取到值
                    break;
                }
            }

            for (var _i2 = 0; _i2 < temp.roles.length; _i2++) {
                for (var j = 0; j < action.data.roleIds.length; j++) {
                    if (temp.roles[_i2].id === action.data.roleIds[j]) tempRoles.push(temp.roles[_i2]);
                }
            }

            for (var _i3 = 0; _i3 < tempRoles.length; _i3++) {
                var _index = temp.roles.indexOf(tempRoles[_i3]);
                if (_index > -1) temp.roles.splice(_index, 1);
            }
            return state;
        case _ActionTypes2.default.UserRole.LOAD:
            //加载
            state.items = action.datas;
            return state;
        case _ActionTypes2.default.UserRole.DELETE:
            //移除一个用户
            var temp = null;
            for (var _i4 = 0; _i4 < state.items.length; _i4++) {
                if (state.items[_i4].id === action.id) {
                    temp = state.items[_i4];
                    break;
                }
            }
            //开始移除
            if (temp != null) {
                var index = state.items.indexOf(temp);
                if (index > -1) state.items.splice(index, 1);
            }
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _client = __webpack_require__(48);

var _client2 = _interopRequireDefault(_client);

var _resources = __webpack_require__(49);

var _resources2 = _interopRequireDefault(_resources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientReducers = (0, _redux.combineReducers)({
    Client: _client2.default,
    Resources: _resources2.default
});

exports.default = ClientReducers;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Client;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    clients: []
};

function Client() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.Client.ADD:
            state.clients.push(action.data);
            return state;
        case _ActionTypes2.default.Client.LOAD:
            state.clients = action.datas;
            return state;
        case _ActionTypes2.default.Client.UPDATE:
            state.clients = state.clients.map(function (u) {
                if (u.clientId === action.data.clientId) return action.data;
                return u;
            });
            return state;
        case _ActionTypes2.default.Client.DELETE:
            state.clients = state.clients.filter(function (u) {
                return u.clientId !== action.id;
            });
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Resources;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    resources: null
};

function Resources() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.Resouces.LOAD:
            state.resources = action.datas;
            return state;
        case _ActionTypes2.default.Resouces.ADD:
            //这里要进行一次区分
            if (action.data.type === "api") {
                state.resources.apiResources.push(action.data);
            } else {
                state.resources.identityResources.push(action.data);
            }
            return state;
        case _ActionTypes2.default.Resouces.UPDATE:
            if (action.data.type === "api") {
                state.resources.apiResources = state.resources.apiResources.map(function (u) {
                    if (u.name === action.data.name) return action.data;
                    return u;
                });
            } else {
                state.resources.identityResources = state.resources.identityResources.map(function (u) {
                    if (u.name === action.data.name) return action.data;
                    return u;
                });
            }
            return state;
        case _ActionTypes2.default.Resouces.DELETE:
            if (action.data.type === "api") {
                state.resources.apiResources = state.resources.apiResources.filter(function (u) {
                    return u.name !== action.data.Name;
                });
            } else {
                state.resources.identityResources = state.resources.identityResources.filter(function (u) {
                    return u.name !== action.data.IdentityName;
                });
            }
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _user = __webpack_require__(51);

var _user2 = _interopRequireDefault(_user);

var _emp = __webpack_require__(52);

var _emp2 = _interopRequireDefault(_emp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserReducers = (0, _redux.combineReducers)({
    User: _user2.default,
    Emp: _emp2.default
});

exports.default = UserReducers;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = User;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    users: [],
    backs: [] //备份
};

function User() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.User.LOAD:
            state.users = action.datas;
            state.backs = _extends([], action.datas);
            return state;
        case _ActionTypes2.default.User.DELETE:
            state.users = state.users.filter(function (u) {
                return u.id.id !== action.id;
            });
            state.backs = _extends([], state.users);
            return state;
        case _ActionTypes2.default.User.SEARCH:
            search(state, action.data);
            return state;
        case _ActionTypes2.default.User.EDITMOBILE:
            state.users = state.users.map(function (u) {
                if (u.id.id === action.data.id.id) return action.data;
                return u;
            });
            return state;
        case _ActionTypes2.default.User.UPDATESTATE:
            state.users = state.users.map(function (u) {
                if (u.id.id === action.id) {
                    u.isActive = !u.isActive;
                }
                return u;
            });
            return state;
        case _ActionTypes2.default.User.ADD:
            state.users.push(action.data);
            return state;
        default:
            return state;
    }
}

//处理搜索,搜索的时候,要从备份对象中取回完整的数据
//username,name,
function search(state, data) {
    state.users = _extends([], state.backs);
    state.users = state.users.filter(function (u) {
        //console.log(u);
        console.log(u);
        if (data.username !== "" && (u.username === null || u.username.indexOf(data.username) < 0)) return false;
        if (data.name !== "" && (u.name === null || u.name.indexOf(data.name) < 0)) return false;
        if (data.idCardNo !== "" && (u.idCardNo === null || u.idCardNo.indexOf(data.idCardNo) < 0)) return false;
        if (data.employeeNumber !== "" && (u.employeeNumber === null || u.employeeNumber.indexOf(data.employeeNumber) < 0)) return false;
        if (data.mobile !== "" && (u.mobile === null || u.mobile.indexOf(data.mobile) < 0)) return false;
        if (data.email !== "" && (u.email !== null || u.email.indexOf(data.email) < 0)) return false;
        if (data.lock === true && u.lockoutEnd !== null) return true;else if (data.lock === true && u.lockoutEnd === null) return false;
        return true;
    });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Emp;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    emps: []
};

function Emp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    state = _extends({}, state);
    switch (action.type) {
        case _ActionTypes2.default.EMP.LOAD:
            state.emps = action.datas;
            return state;
        case _ActionTypes2.default.EMP.CREATEUSER:
            state.emps.forEach(function (u) {
                if (u.idCardNo === action.idcardNo) {
                    u.haveRegisteUser = true;
                }
            });
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5))(530);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(55);

var _layout2 = _interopRequireDefault(_layout);

var _reactRouterDom = __webpack_require__(14);

var _ClientContainer = __webpack_require__(58);

var _ClientContainer2 = _interopRequireDefault(_ClientContainer);

var _RoleContainer = __webpack_require__(65);

var _RoleContainer2 = _interopRequireDefault(_RoleContainer);

var _RoleUsersTable = __webpack_require__(74);

var _RoleUsersTable2 = _interopRequireDefault(_RoleUsersTable);

var _ResourceContainer = __webpack_require__(77);

var _ResourceContainer2 = _interopRequireDefault(_ResourceContainer);

var _UserContainer = __webpack_require__(81);

var _UserContainer2 = _interopRequireDefault(_UserContainer);

var _Index = __webpack_require__(92);

var _Index2 = _interopRequireDefault(_Index);

var _AccessDenied = __webpack_require__(93);

var _AccessDenied2 = _interopRequireDefault(_AccessDenied);

var _NotFound = __webpack_require__(94);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Errors = __webpack_require__(95);

var _Errors2 = _interopRequireDefault(_Errors);

var _EmpContainer = __webpack_require__(96);

var _EmpContainer2 = _interopRequireDefault(_EmpContainer);

var _SyncContainer = __webpack_require__(100);

var _SyncContainer2 = _interopRequireDefault(_SyncContainer);

var _ContactGroupTable = __webpack_require__(101);

var _ContactGroupTable2 = _interopRequireDefault(_ContactGroupTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//导入组件
var routes = exports.routes = _react2.default.createElement(
    _layout2.default,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Index2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/ReactClientManage', component: _ClientContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/reactRoleManager', component: _RoleContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/reactRoleUsersManage', component: _RoleUsersTable2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/reactResourceManager', component: _ResourceContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/ReactUserManager', component: _UserContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/ReactEmpManager', component: _EmpContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/Sync', component: _SyncContainer2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/contactgroup', component: _ContactGroupTable2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/Account/AccessDenied', component: _AccessDenied2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/NotFound', component: _NotFound2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/error', component: _Errors2.default })
);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Sidebar = __webpack_require__(56);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Nav = __webpack_require__(57);

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
    _inherits(Layout, _Component);

    function Layout() {
        _classCallCheck(this, Layout);

        //获取用户名
        var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

        var userName = $("#_username").val();
        _this.state = {
            loading: false,
            userName: userName
        };
        return _this;
    }

    _createClass(Layout, [{
        key: "changeLoading",
        value: function changeLoading() {
            this.setState({
                loading: !this.state.loading
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "main_container" },
                _react2.default.createElement(_Sidebar2.default, { userName: this.state.userName }),
                _react2.default.createElement(_Nav2.default, { userName: this.state.userName }),
                _react2.default.createElement(
                    "div",
                    { className: "right_col", style: { "minHeight": 768 }, role: "main" },
                    this.props.children
                ),
                _react2.default.createElement(
                    "footer",
                    null,
                    _react2.default.createElement(
                        "div",
                        { className: "pull-right" },
                        "SSO - \u5355\u70B9\u767B\u5F55\u540E\u53F0\u7BA1\u7406 ",
                        _react2.default.createElement(
                            "a",
                            { href: "#" },
                            "\u56DB\u5DDD\u8DEF\u6865"
                        )
                    ),
                    _react2.default.createElement("div", { className: "clearfix" })
                )
            );
        }
    }]);

    return Layout;
}(_react.Component);

exports.default = Layout;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
    _inherits(Sidebar, _Component);

    function Sidebar(props) {
        _classCallCheck(this, Sidebar);

        var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

        _this.state = {
            items: [{
                groupName: "General",
                groupItems: [{
                    label: "角色管理",
                    items: [{
                        name: "系统角色",
                        link: "/reactRoleManager"
                    }, {
                        name: "用户角色",
                        link: "/ReactRoleUsersManage"
                    }, {
                        name: "员工组管理",
                        link: "/contactgroup"
                    }]
                }, {
                    label: "资源管理",
                    items: [{
                        name: "客户端管理",
                        link: "/ReactClientManage"
                    }, {
                        name: "资源管理",
                        link: "/ReactResourceManager"
                    }]
                }, {
                    label: "人员管理",
                    items: [{
                        name: "用户管理",
                        link: "/ReactUserManager"
                    }, {
                        name: "职员管理",
                        link: "/reactEmpManager"
                    }]
                }]
            }]
        };
        return _this;
    }

    _createClass(Sidebar, [{
        key: "renderMenu",
        value: function renderMenu(datas) {
            if (datas === null || datas === undefined || datas.length === 0) return "";
            return datas.map(function (u) {
                return _react2.default.createElement(
                    "div",
                    { key: u.groupName, className: "menu_section" },
                    _react2.default.createElement(
                        "h3",
                        null,
                        u.groupName
                    ),
                    _react2.default.createElement(
                        "ul",
                        { className: "nav side-menu" },
                        u.groupItems.map(function (x) {
                            return _react2.default.createElement(
                                "li",
                                { key: x.label },
                                _react2.default.createElement(
                                    "a",
                                    null,
                                    _react2.default.createElement("i", { className: "fa fa-home" }),
                                    " ",
                                    x.label,
                                    " ",
                                    _react2.default.createElement("span", { className: "fa fa-chevron-down" })
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "nav child_menu" },
                                    x.items.map(function (y) {
                                        return _react2.default.createElement(
                                            "li",
                                            { key: y.link },
                                            _react2.default.createElement(
                                                _reactRouterDom.Link,
                                                { to: y.link },
                                                y.name
                                            )
                                        );
                                    })
                                )
                            );
                        })
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "col-md-3 left_col" },
                _react2.default.createElement(
                    "div",
                    { className: "left_col scroll-view" },
                    _react2.default.createElement(
                        "div",
                        { className: "navbar nav_title", style: { border: 0 } },
                        _react2.default.createElement(
                            "a",
                            { href: "/", className: "site_title" },
                            _react2.default.createElement("i", { className: "fa fa-paw" }),
                            " ",
                            _react2.default.createElement(
                                "span",
                                null,
                                "SSO\u540E\u53F0\u7BA1\u7406"
                            )
                        )
                    ),
                    _react2.default.createElement("div", { className: "clearfix" }),
                    _react2.default.createElement(
                        "div",
                        { className: "profile clearfix" },
                        _react2.default.createElement(
                            "div",
                            { className: "profile_pic" },
                            _react2.default.createElement("img", { src: "/images/img.jpg", alt: "...", className: "img-circle profile_img" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "profile_info" },
                            _react2.default.createElement(
                                "span",
                                null,
                                "Welcome,"
                            ),
                            _react2.default.createElement(
                                "h2",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "/login" },
                                    this.props.userName === "" ? "请登录" : this.props.userName
                                )
                            )
                        )
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "div",
                        { id: "sidebar-menu", className: "main_menu_side hidden-print main_menu" },
                        this.props.userName === "" ? "" : this.renderMenu(this.state.items)
                    )
                )
            );
        }
    }]);

    return Sidebar;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Sidebar);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_Component) {
    _inherits(Nav, _Component);

    function Nav() {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
    }

    _createClass(Nav, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "top_nav" },
                _react2.default.createElement(
                    "div",
                    { className: "nav_menu" },
                    _react2.default.createElement(
                        "nav",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "nav toggle" },
                            _react2.default.createElement(
                                "a",
                                { id: "menu_toggle" },
                                _react2.default.createElement("i", { className: "fa fa-bars" })
                            )
                        ),
                        _react2.default.createElement(
                            "ul",
                            { className: "nav navbar-nav navbar-right" },
                            _react2.default.createElement(
                                "li",
                                { className: "" },
                                _react2.default.createElement(
                                    "a",
                                    { href: "javascript:;", className: "user-profile dropdown-toggle", "data-toggle": "dropdown", "aria-expanded": "false" },
                                    _react2.default.createElement("img", { src: "/images/img.jpg", alt: "" }),
                                    this.props.userName === "" ? "请登录" : this.props.userName,
                                    _react2.default.createElement("span", { className: " fa fa-angle-down" })
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "dropdown-menu dropdown-usermenu pull-right" },
                                    this.renderLoginOrOut()
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderLoginOrOut",
        value: function renderLoginOrOut() {
            if (this.props.userName === "") {
                return _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        "a",
                        { href: "/Login" },
                        _react2.default.createElement("i", { className: "fa fa-sign-out pull-right" }),
                        "\u767B\u5F55"
                    )
                );
            } else {
                return _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        "a",
                        { href: "/Logout" },
                        _react2.default.createElement("i", { className: "fa fa-sign-out pull-right" }),
                        "\u767B\u51FA"
                    )
                );
            }
        }
    }]);

    return Nav;
}(_react.Component);

exports.default = Nav;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _Client = __webpack_require__(18);

var _Client2 = _interopRequireDefault(_Client);

var _ClientTable = __webpack_require__(61);

var _ClientTable2 = _interopRequireDefault(_ClientTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入Action


//导入组件


var ClientContainer = function (_Component) {
    _inherits(ClientContainer, _Component);

    function ClientContainer() {
        _classCallCheck(this, ClientContainer);

        return _possibleConstructorReturn(this, (ClientContainer.__proto__ || Object.getPrototypeOf(ClientContainer)).apply(this, arguments));
    }

    _createClass(ClientContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_ClientTable2.default, _extends({}, this.props.state, { Actions: this.props.Actions }))
            );
        }
    }]);

    return ClientContainer;
}(_react.Component);

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            Client: (0, _redux.bindActionCreators)(_Client2.default.Client, dispatch),
            Resource: (0, _redux.bindActionCreators)(_Client2.default.Resources, dispatch)
        }
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ClientContainer);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.add = add;
exports.update = update;
exports.del = del;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/client", {}, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Client.LOAD, datas: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

//添加一个客户端
function add(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/client", data, function (result) {
            if (result.success) {
                data = result.data;
                dispatch({ type: _ActionTypes2.default.Client.ADD, data: data });
                cb(result, data); //这个data包含了数据Id
            } else {
                cb(result, data);
            }
        });
    };
}

//更新客户端
function update(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/client", data, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Client.UPDATE, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

function del(id, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        (0, _confirm2.default)(function (_) {
            _http2.default.delete("/api/client", { ClientId: id }, function (result) {
                if (result.success) {
                    dispatch({ type: _ActionTypes2.default.Client.DELETE, id: id });
                    cb(result);
                } else {
                    cb(result);
                }
            });
        }, "确定要删除此客户端?");
    };
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.add = add;
exports.update = update;
exports.del = del;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载所有的资源
function load(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/resource", {}, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Resouces.LOAD, datas: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

function add(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/resource", data, function (result) {
            if (result.success) {
                result.data.type = data.type;
                dispatch({ type: _ActionTypes2.default.Resouces.ADD, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

function update(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/resource", data, function (result) {
            if (result.success) {
                result.data.type = data.type;
                dispatch({ type: _ActionTypes2.default.Resouces.UPDATE, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

function del(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.delete("/api/resource", data, function (result) {
            if (result.success) {
                data.type = data.Name === "" ? "identity" : "api";
                dispatch({ type: _ActionTypes2.default.Resouces.DELETE, data: data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _Action = __webpack_require__(62);

var _Action2 = _interopRequireDefault(_Action);

var _ClientUpdateAndAddModal = __webpack_require__(63);

var _ClientUpdateAndAddModal2 = _interopRequireDefault(_ClientUpdateAndAddModal);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _ClientDetail = __webpack_require__(64);

var _ClientDetail2 = _interopRequireDefault(_ClientDetail);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入公共类库


//导入组件


var ClientTable = function (_Component) {
    _inherits(ClientTable, _Component);

    function ClientTable() {
        _classCallCheck(this, ClientTable);

        var _this = _possibleConstructorReturn(this, (ClientTable.__proto__ || Object.getPrototypeOf(ClientTable)).call(this));

        _this.state = {
            widths: ["20%", "20%", "50%", "10%"],
            loading: true,
            selected: null,
            view: null,
            index: 1,
            showCount: 10,
            pageCount: 1
        };
        return _this;
    }

    //页面渲染完毕后,一定要初始化


    _createClass(ClientTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.Actions.Client) {
                var cb = function cb(result) {
                    _this2.setState({ loading: false });
                    if (result.success) {
                        var pageCount = Math.ceil(result.data.length / _this2.state.showCount);
                        _this2.setState({ pageCount: pageCount });
                    } else {
                        (0, _msg2.default)("失败", result.message, "error");
                    }
                };
                this.props.Actions.Client.load(cb.bind(this));
            }
        }

        //更新分页相关的信息

    }, {
        key: "updatePageInfo",
        value: function updatePageInfo() {
            var dataCount = this.props.Client.Client.clients.length;
            var pageCount = Math.ceil(dataCount / this.state.showCount);
            this.setState({
                pageCount: pageCount
            });
        }
    }, {
        key: "handlePageData",
        value: function handlePageData(index, cb) {
            this.setState({
                index: index
            });
        }
    }, {
        key: "handleAddClick",
        value: function handleAddClick() {
            this.setState({
                selected: null,
                view: null
            });
            if (this.props.Client.Resources.resources === null) {
                this.props.Actions.Resource.load();
            }
            $('.addandupdateclientmodal').modal("show");
        }

        //删除

    }, {
        key: "handleDelete",
        value: function handleDelete(clientId) {
            if (this.props.Actions.Client.del) this.props.Actions.Client.del(clientId, function (result) {
                if (result.success) {
                    (0, _msg2.default)("成功", "删除客户端成功!", "success");
                } else {
                    (0, _msg2.default)("失败", result.message, "error");
                }
            });
        }
    }, {
        key: "hanldeEdit",
        value: function hanldeEdit(client) {
            //这里是一个client对象
            //$(".clientDetialContain").show();
            //这里要开始判断
            this.setState({
                selected: client
            });
            if (this.props.Client.Resources.resources === null) {
                this.props.Actions.Resource.load(function (x) {
                    if (x.success) {
                        //确保打开的时候是初始化完成了
                        $('.addandupdateclientmodal').modal("show");
                    }
                });
            } else {
                $('.addandupdateclientmodal').modal("show");
            }
        }
    }, {
        key: "handleView",
        value: function handleView(client) {
            //对象
            this.setState({
                view: client
            });
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this3 = this;

            if (this.state.loading) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "4", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            var datas = this.props.Client.Client.clients;
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount;

            var offset = (index - 1) * this.state.showCount;
            datas = offset + showCount >= datas.length ? datas.slice(offset, datas.length) : datas.slice(offset, offset + showCount);
            if (datas === null || datas === undefined || datas.length === 0) return _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                    "td",
                    { colSpan: "4", style: { "textAlign": "center" } },
                    "\u6682\u65E0\u6570\u636E\uFF01"
                )
            );
            return datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    { style: { "cursor": "pointer" } },
                    _react2.default.createElement(
                        "th",
                        { onDoubleClick: _this3.handleView.bind(_this3, u), scope: "row" },
                        _react2.default.createElement(
                            "a",
                            { href: "#" },
                            u.clientName
                        )
                    ),
                    _react2.default.createElement(
                        "td",
                        { onDoubleClick: _this3.handleView.bind(_this3, u) },
                        u.clientId
                    ),
                    _react2.default.createElement(
                        "td",
                        { onDoubleClick: _this3.handleView.bind(_this3, u) },
                        u.allowedGrantTypes.map(function (x) {
                            return _react2.default.createElement(
                                "label",
                                { style: { display: "inline-block" }, className: "label label-primary" },
                                x
                            );
                        })
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(_Action2.default, { view: _this3.handleView.bind(_this3, u), del: _this3.handleDelete.bind(_this3, u.clientId), edit: _this3.hanldeEdit.bind(_this3, u) })
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                index = _state2.index,
                showCount = _state2.showCount,
                pageCount = _state2.pageCount;

            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            var resources = this.props.Client.Resources.resources;
            var selected = this.state.selected;
            var data = { resources: resources, selected: selected };
            return _react2.default.createElement(
                "div",
                { className: "col-md-12 col-sm-12 col-xs-12" },
                _react2.default.createElement(
                    "div",
                    { className: "x_panel" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_title" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "\u5BA2\u6237\u7AEF\u8D44\u6E90\u7BA1\u7406 ",
                            _react2.default.createElement(
                                "small",
                                null,
                                "\u5BA2\u6237\u7AEF\u8D44\u6E90\u5217\u8868"
                            ),
                            "\xA0\xA0\xA0\xA0",
                            _react2.default.createElement(
                                "a",
                                { style: { marginBottom: -7 }, className: "btn btn-primary", onClick: this.handleAddClick.bind(this), href: "javascript:void(0)" },
                                "\u6DFB\u52A0\u65B0\u5BA2\u6237\u7AEF"
                            )
                        ),
                        _react2.default.createElement(
                            "ul",
                            { className: "nav navbar-right panel_toolbox" },
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "collapse-link" },
                                    _react2.default.createElement("i", { className: "fa fa-chevron-up" })
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                { className: "dropdown" },
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-expanded": "false" },
                                    _react2.default.createElement("i", { className: "fa fa-wrench" })
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "dropdown-menu", role: "menu" },
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 1"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 2"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "close-link" },
                                    _react2.default.createElement("i", { className: "fa fa-close" })
                                )
                            )
                        ),
                        _react2.default.createElement("div", { className: "clearfix" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "x_content" },
                        _react2.default.createElement(
                            "table",
                            { className: "table table-hover", style: { tableLayout: "fixed" } },
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[0] },
                                        "\u5BA2\u6237\u7AEF\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[1] },
                                        "\u5BA2\u6237\u7AEFId"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[2] },
                                        "\u6388\u6743\u7C7B\u578B"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[3] },
                                        "\u64CD\u4F5C"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) })),
                _react2.default.createElement(_ClientUpdateAndAddModal2.default, { data: data, Actions: this.props.Actions }),
                _react2.default.createElement(_ClientDetail2.default, { data: this.state.view, setState: this.setState.bind(this) })
            );
        }
    }]);

    return ClientTable;
}(_react.Component);

exports.default = ClientTable;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _tool = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "del",
        value: function del() {
            if (this.props.del) this.props.del();
        }
    }, {
        key: "view",
        value: function view() {
            if (this.props.view) this.props.view();
        }
    }, {
        key: "edit",
        value: function edit() {
            if (this.props.edit) this.props.edit();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.edit.bind(this) },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.view.bind(this) },
                            "\u8BE6\u60C5"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.del.bind(this) },
                            "\u5220\u9664"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClientUpdateAndAddModal = function (_Component) {
    _inherits(ClientUpdateAndAddModal, _Component);

    function ClientUpdateAndAddModal(props) {
        _classCallCheck(this, ClientUpdateAndAddModal);

        var _this = _possibleConstructorReturn(this, (ClientUpdateAndAddModal.__proto__ || Object.getPrototypeOf(ClientUpdateAndAddModal)).call(this, props));

        _this.state = {
            resources: null
        };
        return _this;
    }

    _createClass(ClientUpdateAndAddModal, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.initForm();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.initForm();
        }

        //初始化表单

    }, {
        key: "initForm",
        value: function initForm() {
            $("#clientName").val($("#hideClientName").val());
            $("#clientId").val($("#hideClientID").val());
            //$("#inputSecret").val($("#hideSecret").val() === "" ? "" : "重置密码");
            var granTypes = $("#hideAuthType").val().split(",");
            $(".AuthType").select2({
                placeholder: '请选择授权类型',
                multiple: true
            }).val(granTypes).trigger("change");
            var resources = $("#hideScope").val().split(",");
            $(".resourceScope").select2({
                placeholder: '请选择资源',
                multiple: true
            }).val(resources).trigger("change");
            $('#hideLogoutAddress').next().tagsInput().importTags($("#hideLogoutAddress").val());
            $('#hideLoginAddress').next().tagsInput().importTags($("#hideLoginAddress").val());
            $("#inputSecret").val("");
        }
    }, {
        key: "createCode",
        value: function createCode() {
            //改变值
            _http2.default.post("/api/client/CreateSecrt", {}, function (result) {
                var code = result.data;
                $("#hideSecret").val($("#hideSecret").val() + code + ",");
                $("#inputSecret").val(code);
            });
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            //关闭对话框
            $(".addandupdateclientmodal").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var data = this.getFormData();
            //新增提交代码
            if (this.props.data.selected === null) {
                var cb = function cb(result) {
                    if (result.success) {
                        (0, _msg2.default)("成功", "添加客户端成功", "success");
                        _this2.closeModal();
                    } else {
                        (0, _msg2.default)("失败", result.message, "error");
                    }
                };
                this.props.Actions.Client.add(data, cb.bind(this));
            } else {
                var _cb = function _cb(result) {
                    _this2.closeModal();
                    if (result.success) {
                        (0, _msg2.default)("成功", "更新客户端成功", "success");
                    } else {
                        (0, _msg2.default)("失败", result.message, "error");
                    }
                };
                this.props.Actions.Client.update(data, _cb.bind(this));
            }
        }
    }, {
        key: "getFormData",
        value: function getFormData() {
            var clientName = $("#clientName").val();
            var clientId = $('#clientId').val();
            var clientSecrets = [];
            var secrets = $("#inputSecret").val();
            if (secrets !== null && secrets !== "") {
                clientSecrets.push({ description: null, expiration: null, type: "SharedSecret", value: secrets });
            }
            var redirectUris = $("#hideLoginAddress").next().val().split(",");
            var postLogoutRedirectUris = $("#hideLogoutAddress").next().val().split(",");
            var allowedGrantTypes = $(".AuthType").val();
            var allowedScopes = $(".resourceScope").val();
            return {
                clientName: clientName,
                clientId: clientId,
                clientSecrets: clientSecrets,
                redirectUris: redirectUris,
                postLogoutRedirectUris: postLogoutRedirectUris,
                allowedGrantTypes: allowedGrantTypes,
                allowedScopes: allowedScopes
            };
        }
        //api资源

    }, {
        key: "RenderApiResources",
        value: function RenderApiResources() {
            var resources = this.props.data.resources;

            if (resources != null) {
                if (resources.apiResources.length === 0) {
                    return "";
                } else {
                    return resources.apiResources.map(function (x) {
                        return _react2.default.createElement(
                            "option",
                            { value: x.name },
                            x.name
                        );
                    });
                }
            }
        }

        //Identity资源

    }, {
        key: "RenderIdentityResources",
        value: function RenderIdentityResources() {
            var resources = this.props.data.resources;

            if (resources != null) {
                if (resources.identityResources.length === 0) {
                    return "";
                } else {
                    return resources.identityResources.map(function (x) {
                        return _react2.default.createElement(
                            "option",
                            { value: x.name },
                            x.name
                        );
                    });
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.props.data.selected;
            return _react2.default.createElement(
                "div",
                { className: "modal fade addandupdateclientmodal", id: "userrolemodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                data === null ? "添加" : "更新",
                                "\u5BA2\u6237\u7AEF"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u5BA2\u6237\u7AEF\u540D\u79F0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideClientName", value: data === null ? "" : data.clientName, type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "clientName", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u5BA2\u6237\u7AEFID\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideClientID", value: data === null ? "" : data.clientId, type: "hidden" }),
                                        data === null ? _react2.default.createElement("input", { type: "text", id: "clientId", className: "form-control col-md-7 col-xs-12" }) : _react2.default.createElement("input", { type: "text", id: "clientId", className: "form-control col-md-7 col-xs-12", readOnly: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-sm-12" },
                                        _react2.default.createElement(
                                            "textarea",
                                            { readOnly: "readonly", className: "col-sm-12 form-control", style: { height: 110, maxHeight: 150, overflowY: "auto", resize: "none" } },
                                            "\u4F01\u4E1A\u667A\u80FD\u7BA1\u7406\u5E73\u53F0\uFF1AOM\u3001\u9879\u76EE\u7BA1\u7406\u7CFB\u7EDF\uFF1APM\u3001\u5171\u4EAB\u8D22\u52A1\u7CFB\u7EDF\uFF1AFSSC\u3001\u4EBA\u529B\u8D44\u6E90\u7CFB\u7EDF\uFF1AHR\u3001\u534F\u540C\u529E\u516C\u7CFB\u7EDF\uFF1AOA\u3002Clientid\u7F16\u7801\u89C4\u5219\uFF1A\u9879\u76EE\u7F29\u5199+\"_\"+\u7CFB\u7EDF\u7F29\u5199+\"_\"+\u5BA2\u6237\u7AEF\u7C7B\u578B(\u5982Mobile\uFF0CWeb\uFF0CDesktop)+\"_\"+\u987A\u5E8F\u53F7(3\u4F4D)\u3002\u6BD4\u5982\u79FB\u52A8\u7AEF\u5373\u65F6\u901A\u7684ClientId\u4E3A\uFF1AOM_AppStore_Mobile_001\uFF1BBI\u95E8\u6237\u7684ClientId\u4E3A\uFF1AOM_PORTAL_Web_001"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u5BC6\u94A5\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideSecret", type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "inputSecret", placeholder: data === null ? "" : "更新状态不填,服务端将不会更新密钥", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u6388\u6743\u7C7B\u578B\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "hidden", value: data === null || data.allowedGrantTypes === null ? "" : data.allowedGrantTypes.join(","), id: "hideAuthType" }),
                                        _react2.default.createElement(
                                            "select",
                                            { className: "AuthType form-control col-md-7 col-xs-12" },
                                            _react2.default.createElement(
                                                "option",
                                                { value: "implicit" },
                                                "Implicit"
                                            ),
                                            _react2.default.createElement(
                                                "option",
                                                { value: "client_credentials" },
                                                "ClientCredentials"
                                            ),
                                            _react2.default.createElement(
                                                "option",
                                                { value: "authorization_code" },
                                                "Code"
                                            ),
                                            _react2.default.createElement(
                                                "option",
                                                { value: "hybrid" },
                                                "Hybrid"
                                            ),
                                            _react2.default.createElement(
                                                "option",
                                                { value: "password" },
                                                "ResourceOwnerPassword"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8BF7\u6C42\u4F5C\u7528\u57DF\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "hidden", value: data === null || data.allowedScopes === null ? "" : data.allowedScopes.join(","), id: "hideScope" }),
                                        _react2.default.createElement(
                                            "select",
                                            { className: "resourceScope form-control col-md-7 col-xs-12" },
                                            _react2.default.createElement(
                                                "optgroup",
                                                { label: "Identity\u8D44\u6E90" },
                                                this.RenderIdentityResources()
                                            ),
                                            _react2.default.createElement(
                                                "optgroup",
                                                { label: "api\u8D44\u6E90" },
                                                this.RenderApiResources()
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u6388\u6743\u767B\u5F55\u5730\u5740\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideLoginAddress", value: data === null || data.redirectUris === null ? "" : data.redirectUris.join(","), type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "LoginAddress", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u6388\u6743\u767B\u51FA\u5730\u5740\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideLogoutAddress", value: data === null || data.postLogoutRedirectUris === null ? "" : data.postLogoutRedirectUris.join(","), type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "LogoutAddress", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ClientUpdateAndAddModal;
}(_react.Component);

exports.default = ClientUpdateAndAddModal;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import from "./ClientDetail.css";

var ClientDetail = function (_Component) {
    _inherits(ClientDetail, _Component);

    function ClientDetail() {
        _classCallCheck(this, ClientDetail);

        return _possibleConstructorReturn(this, (ClientDetail.__proto__ || Object.getPrototypeOf(ClientDetail)).call(this));
    }

    _createClass(ClientDetail, [{
        key: "hideShow",
        value: function hideShow() {
            this.props.setState({
                view: null
            });
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.props.data;
            return _react2.default.createElement(
                "div",
                { className: "clientDetialContain", style: { display: this.props.data === null ? "none" : "block" } },
                _react2.default.createElement("div", { className: "clientdetailshow", onClick: this.hideShow.bind(this) }),
                _react2.default.createElement(
                    "div",
                    { className: "clientdetail" },
                    _react2.default.createElement(
                        "h4",
                        null,
                        "\xA0\xA0\xA0\u5BA2\u6237\u7AEF\u8BE6\u60C5"
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "form",
                        { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u662F\u5426\u542F\u7528"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.enabled === null ? "" : data.enabled.toString()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u5BA2\u6237\u7AEFId"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null ? "" : data.clientId
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u5BA2\u6237\u7AEF\u540D\u79F0"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null ? "" : data.clientName
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u6388\u6743\u7C7B\u578B"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                data === null || data.allowedGrantTypes === null ? "" : data.allowedGrantTypes.map(function (u) {
                                    return _react2.default.createElement(
                                        "span",
                                        { style: { borderStyle: "none" }, className: "form-control" },
                                        _react2.default.createElement(
                                            "label",
                                            { className: "label label-primary" },
                                            u
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u767B\u51FA\u56DE\u8C03\u5730\u5740"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                data === null || data.postLogoutRedirectUris === null ? "" : data.postLogoutRedirectUris.map(function (u) {
                                    return _react2.default.createElement(
                                        "span",
                                        { style: { borderStyle: "none" }, className: "form-control" },
                                        _react2.default.createElement(
                                            "label",
                                            { className: "label label-primary" },
                                            u
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u767B\u5F55\u56DE\u8C03\u5730\u5740"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                data === null || data.redirectUris === null ? "" : data.redirectUris.map(function (u) {
                                    return _react2.default.createElement(
                                        "span",
                                        { style: { borderStyle: "none" }, className: "form-control" },
                                        _react2.default.createElement(
                                            "label",
                                            { className: "label label-primary" },
                                            u
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u534F\u8BAE\u7C7B\u578B"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.protocolType === null ? "" : data.protocolType.toString()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u662F\u5426\u9700\u8981\u5BA2\u6237\u7AEF\u5BC6\u7801"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.requireClientSecret === null ? "" : data.requireClientSecret.toString()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u5BA2\u6237\u7AEFUri"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.clientUri === null ? "" : data.clientUri.toString()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u9700\u8981\u540C\u610F(RequireConsent)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.requireConsent === null ? "" : data.requireConsent.toString()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "form-group" },
                            _react2.default.createElement(
                                "label",
                                { style: { textAlign: "left" }, className: "control-label col-md-12 col-sm-12 col-xs-12" },
                                "\u9700\u8981\u8BB0\u4F4F\u540C\u610F(AllowRememberConsent)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-12 col-sm-12 col-xs-12" },
                                _react2.default.createElement(
                                    "span",
                                    { style: { borderStyle: "none" }, className: "form-control" },
                                    data === null || data.allowRememberConsent === null ? "" : data.allowRememberConsent.toString()
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ClientDetail;
}(_react.Component);

exports.default = ClientDetail;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _Role = __webpack_require__(19);

var _Role2 = _interopRequireDefault(_Role);

var _RoleTable = __webpack_require__(68);

var _RoleTable2 = _interopRequireDefault(_RoleTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//引入组件


var RoleContainer = function (_Component) {
    _inherits(RoleContainer, _Component);

    function RoleContainer() {
        _classCallCheck(this, RoleContainer);

        return _possibleConstructorReturn(this, (RoleContainer.__proto__ || Object.getPrototypeOf(RoleContainer)).apply(this, arguments));
    }

    _createClass(RoleContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_RoleTable2.default, { Actions: this.props.RoleActions, RoleUserActions: this.props.RoleUserActions, RoleState: this.props.Role.Role, RoleUsersState: this.props.Role.UserRole })
            );
        }
    }]);

    return RoleContainer;
}(_react.Component);

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        RoleActions: (0, _redux.bindActionCreators)(_Role2.default.Role, dispatch),
        RoleUserActions: (0, _redux.bindActionCreators)(_Role2.default.RoleUser, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoleContainer);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadAll = loadAll;
exports.del = del;
exports.add = add;
exports.update = update;
exports.select = select;
exports.bindUsers = bindUsers;
exports.loadAllClient = loadAllClient;
exports.loaddAllUsers = loaddAllUsers;
exports.loadRoleUsers = loadRoleUsers;
exports.delRoleUsers = delRoleUsers;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _urls = __webpack_require__(12);

var _urls2 = _interopRequireDefault(_urls);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载所有的角色


//引入http
function loadAll(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/role", {}, function (result) {
            if (result.success) {
                cb(result.data);
                dispatch({ type: _ActionTypes2.default.Role.LOADALL, datas: result.data });
            } else {
                cb(result.data);
                (0, _msg2.default)("错误", "获取数据失败", "error");
            }
        });
    };
}

//删除一个角色
function del(id) {
    return function (dispatch) {
        (0, _confirm2.default)(function () {
            _http2.default.delete("/api/role", { id: id }, function (result) {
                if (result.success) {
                    dispatch({ type: _ActionTypes2.default.Role.DELETE, id: id });
                    (0, _msg2.default)("成功", "删除角色成功", "success");
                } else {
                    (0, _msg2.default)("失败", result.message, "error");
                }
            });
        }, "是否删除该系统角色?");
    };
}

//新增的一个角色
function add(id, name, clientId, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/role", { id: id, name: name, clientIds: clientId }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.ADD, data: { id: id, name: name, clientId: clientId } });
                cb(result.success);
                (0, _msg2.default)("成功", "添加角色成功", "success");
            } else {
                cb(result.success);
                (0, _msg2.default)("失败", result.message, "error");
            }
        });
    };
}

function update(id, name, clientId, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/role", { id: id, name: name, clientIds: clientId }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.UPDATE, data: { id: id, name: name, clientId: clientId } });
                (0, _msg2.default)("成功", "更新角色成功", "success");
                cb(result.success);
            } else {
                (0, _msg2.default)("失败", result.message, "error");
                cb(result.success);
            }
        });
    };
}

//选中一个角色
function select(id) {
    return function (dispatch) {
        dispatch({ type: _ActionTypes2.default.Role.SELECT, id: id });
    };
}

//角色绑定多个用户
function bindUsers(id, userIds, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/role/binduser", { roleId: id, userIds: userIds }, function (result) {
            if (result.success) {
                (0, _msg2.default)("成功", "绑定用户成功", "success");
            } else {
                (0, _msg2.default)("失败", result.message, "error");
            }
            cb(result);
        });
    };
}

//获取所有的客户端资源
function loadAllClient(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/client", {}, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.LOADALLCLIENT, clients: result.data });
            }
            cb(result);
        });
    };
}

function loaddAllUsers(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/role/allroleusers", {}, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.LOADALLUSERS, datas: result.data });
            }
            cb(result);
        });
    };
}

//角色下面的多个用户加载
function loadRoleUsers(Id, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/role/roleusers", { Id: Id }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.LOADROLEUSERS, datas: result.data });
                cb(result);
                $(".RoleUsersModal").modal("show");
            } else {
                cb(result);
            }
        });
    };
}

//移除一个角色下面的多个用户
function delRoleUsers(id, userIds) {
    return function (dispatch) {
        _http2.default.delete("/api/role/removeroleusers", { RoleId: id, UserIds: userIds }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.Role.REMOVEUSERS, ids: userIds });
                (0, _msg2.default)("成功", "移除用户成功", "success");
            } else {
                (0, _msg2.default)("失败", "移除用户失败", "error");
            }
        });
    };
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.del = del;
exports.removeRole = removeRole;
exports.updateRoles = updateRoles;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _urls = __webpack_require__(12);

var _urls2 = _interopRequireDefault(_urls);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载一个角色下面的用户,id 角色的id


//引入http
function load(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/roleuser", {}, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.UserRole.LOAD, datas: result.data });
                cb(result);
            } else {
                (0, _msg2.default)("失败", result.message, "error");
                cb(result);
            }
        });
    };
}

//删除角色用户
function del(userId, roleId) {
    return function (dispatch) {
        _http2.default.post("", { userId: userId, roleId: roleId }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.UserRole.DELETE, id: userId });
                (0, _msg2.default)("成功", "删除角色用户成功", "success");
            } else {
                (0, _msg2.default)("失败", result.message, "error");
            }
        });
    };
}

function removeRole(userId, roleIds) {
    return function (dispatch) {
        //dispatch({ type: ActionTypes.UserRole.USERREMOVEROLES, data: { userId, roleIds } });
        (0, _confirm2.default)(function () {
            _http2.default.delete("/api/roleuser/removeroles", { userId: userId, roleIds: roleIds }, function (result) {
                if (result.success) {
                    dispatch({ type: _ActionTypes2.default.UserRole.USERREMOVEROLES, data: { userId: userId, roleIds: roleIds } });
                    (0, _msg2.default)("成功", "移除角色成功", "success");
                } else {
                    (0, _msg2.default)("失败", result.message, "error");
                }
            });
        }, "是否要删除该用户下所有的角色?");
    };
}

function updateRoles(userId, roles) {
    return function (dispatch) {
        //dispatch({ type: ActionTypes.UserRole.UPDATEUSERROLES, data: { userId, roles } });
        var roleIds = [];
        for (var i = 0; i < roles.length; i++) {
            roleIds.push(roles[i].id);
        }
        _http2.default.put("/api/roleuser", { userId: userId, roleIds: roleIds }, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.UserRole.UPDATEUSERROLES, data: { userId: userId, roles: roles } });
                (0, _msg2.default)("成功", "更新用户角色成功!", "success");
            } else {
                (0, _msg2.default)("失败", result.message, "error");
            }
        });
    };
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Action = __webpack_require__(69);

var _Action2 = _interopRequireDefault(_Action);

var _RoleUpdateAndAddModal = __webpack_require__(70);

var _RoleUpdateAndAddModal2 = _interopRequireDefault(_RoleUpdateAndAddModal);

var _BindUsersModal = __webpack_require__(71);

var _BindUsersModal2 = _interopRequireDefault(_BindUsersModal);

var _RoleUsersModal = __webpack_require__(72);

var _RoleUsersModal2 = _interopRequireDefault(_RoleUsersModal);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入组件


var RoleTable = function (_Component) {
    _inherits(RoleTable, _Component);

    function RoleTable(props) {
        _classCallCheck(this, RoleTable);

        var _this = _possibleConstructorReturn(this, (RoleTable.__proto__ || Object.getPrototypeOf(RoleTable)).call(this, props));

        _this.state = {
            selected: null,
            widths: ["20%", "20%", "50%", "10%"],
            loadding: true,
            roleUsersLoadding: true,
            index: 1, //分页信息
            showCount: 10,
            pageCount: 1,
            innerPageCount: 1
        };
        return _this;
    }

    //渲染完成之后需要亲求数据


    _createClass(RoleTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var self = this;
            this.props.Actions.loadAll(function (x) {
                if (x !== undefined && x !== null) {
                    var pageCount = Math.ceil(x.length / self.state.showCount);
                    self.setState({
                        pageCount: pageCount,
                        loadding: false
                    });
                }
            });
        }

        //更新分页相关的信息

    }, {
        key: "updatePageInfo",
        value: function updatePageInfo() {
            var dataCount = this.props.RoleState.datas.length;
            var pageCount = Math.ceil(dataCount / this.state.showCount);
            this.setState({
                pageCount: pageCount
            });
        }
    }, {
        key: "handlePageData",
        value: function handlePageData(index, cb) {
            this.setState({
                index: index
            });
        }

        //处理添加操作

    }, {
        key: "handleAddClick",
        value: function handleAddClick(e) {
            e.preventDefault();
            this.setState({
                selected: null
            });
            this.loadClients();
            $("#inputRoleId").val("");
            $(".addupdaterolemodal").modal("show");
        }
    }, {
        key: "handleDel",
        value: function handleDel(id) {
            this.props.Actions.del(id);
        }
    }, {
        key: "handleEdit",
        value: function handleEdit(id) {
            console.log(id);
            this.updateStateById(id);
            this.loadClients(function (x) {
                if (x.success) {
                    $(".addupdaterolemodal").modal("show");
                }
            });
        }
    }, {
        key: "loadClients",
        value: function loadClients(cb) {
            cb = cb || function () {};
            if (this.props.RoleState.clients.length === 0) {
                this.props.Actions.loadAllClient(cb);
            } else {
                var obj = { success: true };
                cb(obj); //有点问题
            }
        }
    }, {
        key: "handleBindUsers",
        value: function handleBindUsers(id) {
            if (this.props.RoleState.users === null || this.props.RoleState.users.length === 0) {
                this.props.Actions.loaddAllUsers(function (x) {
                    if (x.success) {
                        $(".bindUsers").modal("show");
                    }
                });
            } else {
                $(".bindUsers").modal("show");
            }
            this.updateStateById(id);
        }
    }, {
        key: "handleLookUsers",
        value: function handleLookUsers(id) {
            var _this2 = this;

            this.updateStateById(id);
            //开始加载
            var self = this;
            this.props.Actions.loadRoleUsers(id, function (u) {
                self.setState({
                    roleUsersLoadding: false
                });
                if (u.success) {
                    var pageCount = Math.ceil(u.data.length / _this2.state.showCount);
                    self.setState({
                        innerPageCount: pageCount
                    });
                }
            });
        }
    }, {
        key: "updateStateById",
        value: function updateStateById(id) {
            var temp = null;
            var datas = this.props.RoleState.datas;
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].id === id) {
                    temp = datas[i];
                    break;
                }
            }
            this.setState({
                selected: temp
            });
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this3 = this;

            if (this.state.loadding) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "3", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            var roleState = this.props.RoleState;
            if (roleState.datas.length === 0) return _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                    "td",
                    { colSpan: "3", style: { "textAlign": "center" } },
                    "\u6682\u65E0\u6570\u636E\uFF01"
                )
            );
            //这里要处理分页数据的问题
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount;

            var offset = (index - 1) * this.state.showCount;
            var datas = offset + showCount >= roleState.datas.length ? roleState.datas.slice(offset, roleState.datas.length) : roleState.datas.slice(offset, offset + showCount);
            return datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    { key: u.id },
                    _react2.default.createElement(
                        "td",
                        null,
                        u.id
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                            "a",
                            null,
                            u.name
                        )
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.clientIds.map(function (x) {
                            return _react2.default.createElement(
                                "label",
                                { key: x.clientId, style: { display: "inline-block" }, className: "label label-info" },
                                x.clientName,
                                "\xA0"
                            );
                        })
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(_Action2.default, { lookUsers: _this3.handleLookUsers.bind(_this3, u.id), bindUsers: _this3.handleBindUsers.bind(_this3, u.id), edit: _this3.handleEdit.bind(_this3, u.id), del: _this3.handleDel.bind(_this3, u.id) })
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                index = _state2.index,
                showCount = _state2.showCount,
                pageCount = _state2.pageCount;

            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            return _react2.default.createElement(
                "div",
                { className: "col-md-12 col-sm-12 col-xs-12" },
                _react2.default.createElement(
                    "div",
                    { className: "x_panel" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_title" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "\u7CFB\u7EDF\u89D2\u8272"
                        ),
                        "\xA0\xA0\xA0\xA0",
                        _react2.default.createElement(
                            "a",
                            { style: { marginBottom: -7 }, className: "btn btn-primary", onClick: this.handleAddClick.bind(this), href: "javascript:void(0)" },
                            "\u6DFB\u52A0\u89D2\u8272"
                        ),
                        _react2.default.createElement("ul", { className: "nav navbar-right panel_toolbox" }),
                        _react2.default.createElement("div", { className: "clearfix" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "x_content" },
                        _react2.default.createElement(
                            "table",
                            { style: { tableLayout: "fixed" }, className: "table table-hover" },
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[0] },
                                        "\u89D2\u8272\u4EE3\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[1] },
                                        "\u89D2\u8272\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[2] },
                                        "\u5173\u8054\u5BA2\u6237\u7AEF"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[3] },
                                        "\u64CD\u4F5C"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) })),
                _react2.default.createElement(_RoleUpdateAndAddModal2.default, { Actions: this.props.Actions, updatePageInfo: this.updatePageInfo.bind(this), clients: this.props.RoleState.clients, data: this.state.selected }),
                _react2.default.createElement(_BindUsersModal2.default, { Actions: this.props.Actions, data: this.state.selected, users: this.props.RoleState.users }),
                _react2.default.createElement(_RoleUsersModal2.default, { Actions: this.props.Actions, data: this.state.selected, datas: this.props.RoleState.roleUsers, loadding: this.state.roleUsersLoadding, pageCount: this.state.innerPageCount })
            );
        }
    }]);

    return RoleTable;
}(_react.Component);

exports.default = RoleTable;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _tool = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "bindUsers",
        value: function bindUsers() {
            if (this.props.bindUsers) this.props.bindUsers();
        }
    }, {
        key: "del",
        value: function del() {
            if (this.props.del) {
                this.props.del();
            }
        }
    }, {
        key: "edit",
        value: function edit() {
            if (this.props.edit) this.props.edit();
        }
    }, {
        key: "lookUsers",
        value: function lookUsers() {
            if (this.props.lookUsers) this.props.lookUsers();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.bindUsers.bind(this) },
                            "\u7ED1\u5B9A\u7528\u6237"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.lookUsers.bind(this) },
                            "\u67E5\u770B\u5DF2\u7ED1\u5B9A\u7528\u6237"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.edit.bind(this) },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.del.bind(this) },
                            "\u5220\u9664"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleUpdateAndAddModal = function (_Component) {
    _inherits(RoleUpdateAndAddModal, _Component);

    function RoleUpdateAndAddModal() {
        _classCallCheck(this, RoleUpdateAndAddModal);

        return _possibleConstructorReturn(this, (RoleUpdateAndAddModal.__proto__ || Object.getPrototypeOf(RoleUpdateAndAddModal)).apply(this, arguments));
    }

    _createClass(RoleUpdateAndAddModal, [{
        key: "componentDidMount",


        //加载所有的客户端
        value: function componentDidMount() {
            this.syncFormValue();
        }
    }, {
        key: "handCreateCode",
        value: function handCreateCode() {
            if (this.props.data !== null) return;
            var self = this;
            _http2.default.post("/api/role/CreateGuid", {}, function (result) {
                $("#inputRoleId").val(result.data);
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.syncFormValue();
        }
    }, {
        key: "syncFormValue",
        value: function syncFormValue() {
            $("#roleName").val($("#hideRoleName").val());
            //稍微要处理一下编辑的逻辑
            if ("" !== $("#hideRoleId").val()) {
                //
                $("#inputRoleId").val($("#hideRoleId").val());
                $("#inputRoleId").prop("readonly", true);
            } else {
                $("#inputRoleId").prop("readonly", false);
            }

            var array = $("#hideClientId").val().split(",");
            $(".clientIdInfo").select2({
                placeholder: '请选择客户端Id',
                multiple: true,
                separator: ","
            }).val(array).trigger('change');
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            $(".addupdaterolemodal").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var name = $('#roleName').val();
            var clientId = $(".clientIdInfo").val(); //默认是用英文逗号隔开的
            var id = $("#inputRoleId").val();
            if (id === null || id === "") {
                (0, _msg2.default)("错误", "角色代码不能够为空", "error");
                return;
            }
            if (clientId === null || clientId.length === 0) {
                (0, _msg2.default)("错误", "客户端不能够为空", "error");
                return;
            }
            if (this.props.data !== null) {
                //这是更新角色
                this.props.Actions.update(id, name, clientId, function (x) {
                    if (x) {
                        _this2.closeModal();
                    }
                });
            } else {
                var self = this;
                this.props.Actions.add(id, name, clientId, function (success) {
                    if (success && self.props.updatePageInfo) {
                        self.props.updatePageInfo();
                        self.closeModal();
                    }
                });
            }
        }
    }, {
        key: "renderClients",
        value: function renderClients() {
            return this.props.clients.map(function (u) {
                return _react2.default.createElement(
                    "option",
                    { key: u.clientId, value: u.clientId },
                    u.clientName
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var clientIdArry = "";
            if (this.props.data != null) {
                var clients = this.props.data.clientIds;
                for (var i = 0; i < clients.length; i++) {
                    clientIdArry += clients[i].clientId + ",";
                }
                if (clientIdArry.length > 0) {
                    clientIdArry = clientIdArry.substr(0, clientIdArry.length - 1);
                }
            }
            return _react2.default.createElement(
                "div",
                { className: "modal fade addupdaterolemodal", id: "userrolemodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                this.props.data === null ? "添加" : "更新",
                                "\u7CFB\u7EDF\u89D2\u8272"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7CFB\u7EDF\u89D2\u8272\u4EE3\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "input-group" },
                                            _react2.default.createElement("input", { id: "hideRoleId", type: "hidden", value: this.props.data === null ? "" : this.props.data.id }),
                                            _react2.default.createElement("input", { type: "text", id: "inputRoleId", className: "form-control col-md-5 col-xs-12" }),
                                            _react2.default.createElement(
                                                "span",
                                                { style: { cursor: this.props.data === null ? "pointer" : "not-allowed" }, onClick: this.handCreateCode.bind(this), className: "input-group-addon" },
                                                "\u751F\u6210\u4EE3\u7801"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement("input", { type: "hidden", ref: "id" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7CFB\u7EDF\u89D2\u8272\u540D\u79F0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideRoleName", value: this.props.data === null ? "" : this.props.data.name, type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "roleName", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u5BA2\u6237\u7AEF\uFF1A ",
                                        _react2.default.createElement(
                                            "span",
                                            { className: "required" },
                                            "*"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "hidden", id: "hideClientId", value: this.props.data === null ? "" : clientIdArry }),
                                        _react2.default.createElement(
                                            "select",
                                            { className: "clientIdInfo form-control col-md-7 col-xs-12" },
                                            this.renderClients()
                                        )
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return RoleUpdateAndAddModal;
}(_react.Component);

exports.default = RoleUpdateAndAddModal;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BindUsersModal = function (_Component) {
    _inherits(BindUsersModal, _Component);

    function BindUsersModal() {
        _classCallCheck(this, BindUsersModal);

        return _possibleConstructorReturn(this, (BindUsersModal.__proto__ || Object.getPrototypeOf(BindUsersModal)).apply(this, arguments));
    }

    _createClass(BindUsersModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.syncData();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.syncData();
        }
    }, {
        key: 'syncData',
        value: function syncData() {
            $('#bindUsersSelect').select2({
                placeholder: '请选择用户',
                multiple: true,
                separator: ","
            }).val([]).trigger('change');
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            $(".bindUsers").modal("hide");
        }
    }, {
        key: 'hanldeSubmit',
        value: function hanldeSubmit(e) {
            e.preventDefault();
            var id = this.props.data.id;
            var userIds = $('#bindUsersSelect').val();
            if (userIds === null) {
                (0, _msg2.default)("错误", "请选择需要绑定的用户", "error");
                return;
            }
            var self = this;
            if (this.props.Actions) {
                //绑定多个用户
                this.props.Actions.bindUsers(id, userIds, function (u) {
                    if (u.success) {
                        self.closeModal();
                    }
                });
            }
        }
    }, {
        key: 'renderUsersOptions',
        value: function renderUsersOptions() {
            return this.props.users.map(function (u) {
                return _react2.default.createElement(
                    'option',
                    { key: u.id, value: u.id },
                    u.name
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'modal fade bindUsers', id: 'bindUserModal', role: 'dialog', 'aria-hidden': 'true' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            ),
                            _react2.default.createElement(
                                'h4',
                                { className: 'modal-title' },
                                '\u7ED1\u5B9A\u591A\u4E2A\u7528\u6237\u81F3\u89D2\u8272'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body' },
                            _react2.default.createElement(
                                'form',
                                { id: 'demo-form2', 'data-parsley-validate': '', className: 'form-horizontal form-label-left' },
                                _react2.default.createElement('input', { type: 'hidden', ref: 'id' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'control-label col-md-3 col-sm-3 col-xs-12' },
                                        '\u89D2\u8272\uFF1A'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-md-9 col-sm-9 col-xs-12' },
                                        _react2.default.createElement('input', { type: 'text', value: this.props.data === null ? "" : this.props.data.name, className: 'form-control col-md-7 col-xs-12' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'control-label col-md-3 col-sm-3 col-xs-12' },
                                        '\u7528\u6237\uFF1A'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-md-9 col-sm-9 col-xs-12' },
                                        _react2.default.createElement(
                                            'select',
                                            { id: 'bindUsersSelect', className: ' form-control col-md-7 col-xs-12' },
                                            this.renderUsersOptions()
                                        )
                                    )
                                ),
                                _react2.default.createElement('div', { className: 'ln_solid' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-md-6 col-sm-6 col-xs-12 col-md-offset-3' },
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'btn btn-primary', type: 'button', onClick: this.closeModal },
                                            '\u53D6\u6D88'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { type: 'submit', className: 'btn btn-success', onClick: this.hanldeSubmit.bind(this) },
                                            '\u63D0\u4EA4'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BindUsersModal;
}(_react.Component);

exports.default = BindUsersModal;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _RoleUserTable = __webpack_require__(73);

var _RoleUserTable2 = _interopRequireDefault(_RoleUserTable);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleUsersModal = function (_Component) {
    _inherits(RoleUsersModal, _Component);

    function RoleUsersModal(props) {
        _classCallCheck(this, RoleUsersModal);

        var _this = _possibleConstructorReturn(this, (RoleUsersModal.__proto__ || Object.getPrototypeOf(RoleUsersModal)).call(this, props));

        _this.state = {
            index: 1, //分页信息
            showCount: 10
        };
        return _this;
    }

    _createClass(RoleUsersModal, [{
        key: "handlePageData",
        value: function handlePageData(index, cb) {
            this.setState({
                index: index
            });
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            var arr = [];
            $('.checkRoleUsers').each(function () {
                if ($(this).prop("checked")) {
                    arr.push($(this).val());
                }
            });
            if (arr.length === 0) {
                (0, _msg2.default)("错误", "请选择需要移除的用户", "error");
                return;
            }
            //开始请求删除多个数据
            var selcted = this.props.data;
            this.props.Actions.delRoleUsers(selcted.id, arr);
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount;

            var pageCount = this.props.pageCount;
            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            var offset = (index - 1) * this.state.showCount;
            var datas = offset + showCount >= this.props.datas.length ? this.props.datas.slice(offset, this.props.datas.length) : this.props.datas.slice(offset, offset + showCount);

            return _react2.default.createElement(
                "div",
                { className: "modal fade RoleUsersModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog modal-lg" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                this.props.data === null ? "" : this.props.data.name,
                                " \u89D2\u8272\u4E0B\u7684\u7528\u6237\uFF1A"
                            ),
                            _react2.default.createElement(
                                "a",
                                { onClick: this.handleClick.bind(this), style: { float: "right" }, href: "javascript:void(0)", className: "btn btn-primary" },
                                "\u79FB\u9664\u9009\u4E2D\u7528\u6237"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(_RoleUserTable2.default, { datas: datas, select: this.props.selectd }),
                            _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) }))
                        )
                    )
                )
            );
        }
    }]);

    return RoleUsersModal;
}(_react.Component);

exports.default = RoleUsersModal;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleUserTable = function (_Component) {
    _inherits(RoleUserTable, _Component);

    function RoleUserTable() {
        _classCallCheck(this, RoleUserTable);

        var _this = _possibleConstructorReturn(this, (RoleUserTable.__proto__ || Object.getPrototypeOf(RoleUserTable)).call(this));

        _this.state = {
            items: [],
            widths: ["10%", "25%", "25%", "25%", "15%"]
        };
        return _this;
    }

    _createClass(RoleUserTable, [{
        key: "handleCheckAll",
        value: function handleCheckAll(e) {
            $(".checkRoleUsers").each(function () {
                $(this).prop("checked", e.target.checked); //设置选中值
            });
        }
    }, {
        key: "renderData",
        value: function renderData() {
            if (this.props.loadding) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            if (this.props.datas === null || this.props.datas.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        "\u6682\u65E0\u6570\u636E..."
                    )
                );
            }

            return this.props.datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    { key: u.username },
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement("input", { className: "checkRoleUsers", type: "checkbox", value: u.id })
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.username
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.mail
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.state
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "table",
                { className: "table table-hover", style: { tableLayout: "fixed" } },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            { width: this.state.widths[0], style: { width: "10%" } },
                            _react2.default.createElement("input", { onChange: this.handleCheckAll, type: "checkbox", className: "allcheck" }),
                            "\u5168\u9009"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: this.state.widths[1] },
                            "\u7528\u6237\u540D"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: this.state.widths[2] },
                            "\u59D3\u540D"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: this.state.widths[3] },
                            "\u90AE\u7BB1"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: this.state.widths[4] },
                            "\u72B6\u6001"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    this.renderData()
                )
            );
        }
    }]);

    return RoleUserTable;
}(_react.Component);

exports.default = RoleUserTable;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _Role = __webpack_require__(19);

var _Role2 = _interopRequireDefault(_Role);

var _Action = __webpack_require__(75);

var _Action2 = _interopRequireDefault(_Action);

var _BindRolesModal = __webpack_require__(76);

var _BindRolesModal2 = _interopRequireDefault(_BindRolesModal);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入组件


var RoleUsersTable = function (_Component) {
    _inherits(RoleUsersTable, _Component);

    function RoleUsersTable() {
        _classCallCheck(this, RoleUsersTable);

        var _this = _possibleConstructorReturn(this, (RoleUsersTable.__proto__ || Object.getPrototypeOf(RoleUsersTable)).call(this));

        _this.state = {
            selected: null,
            loading: true,
            widths: ["15%", "15%", "20%", "30%", "10%", "10%"],
            index: 1, //分页信息
            showCount: 10,
            pageCount: 1
        };
        return _this;
    }

    _createClass(RoleUsersTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            this.props.RoleUserActions.load(function (x) {
                var pageCount = Math.ceil(x.data.length / self.state.showCount);
                self.setState({
                    loading: false,
                    pageCount: pageCount
                });
            }); //加载用户列表
        }
    }, {
        key: 'updatePageInfo',
        value: function updatePageInfo() {
            var dataCount = this.props.Role.UserRole.items.length;
            var pageCount = Math.ceil(dataCount / this.state.showCount);
            this.setState({
                pageCount: pageCount
            });
        }
    }, {
        key: 'handlePageData',
        value: function handlePageData(index, cb) {
            this.setState({
                index: index
            });
        }
    }, {
        key: 'handleEdit',
        value: function handleEdit(id) {
            var datas = this.props.Role.UserRole.items;
            var temp = null;
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].id === id) {
                    temp = datas[i];
                    break;
                }
            }
            if (this.props.Role.Role.datas === null || this.props.Role.Role.datas.length === 0) {
                var self = this;
                this.props.RoleActions.loadAll(function (x) {
                    self.setState({
                        selected: temp
                    });
                    if (x) {
                        $(".bindUserRole").modal("show");
                    }
                });
            } else {
                $(".bindUserRole").modal("show");
            }
        }
    }, {
        key: 'renderData',
        value: function renderData() {
            var _this2 = this;

            if (this.state.loading) {
                return _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { colSpan: '6', style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            var datas = this.props.Role.UserRole.items;
            if (datas === null || datas.length === 0) return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { colSpan: '6', style: { "textAlign": "center" } },
                    '\u6682\u65E0\u6570\u636E...'
                )
            );
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount;

            var offset = (index - 1) * this.state.showCount;
            datas = offset + showCount >= datas.length ? datas.slice(offset, datas.length) : datas.slice(offset, offset + showCount);
            return datas.map(function (u) {
                return _react2.default.createElement(
                    'tr',
                    { key: u.username },
                    _react2.default.createElement(
                        'td',
                        null,
                        u.username
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        u.mail
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        u.roles.map(function (x) {
                            return _react2.default.createElement(
                                'label',
                                { style: { display: "inline-block" }, className: 'label label-info' },
                                x.name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        u.state
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(_Action2.default, { edit: _this2.handleEdit.bind(_this2, u.id), Actions: _this2.props.RoleUserActions, data: u })
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                index = _state2.index,
                showCount = _state2.showCount,
                pageCount = _state2.pageCount;

            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            return _react2.default.createElement(
                'div',
                { className: 'col-md-12 col-sm-12 col-xs-12' },
                _react2.default.createElement(
                    'div',
                    { className: 'x_panel' },
                    _react2.default.createElement(
                        'div',
                        { className: 'x_title' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            '\u7528\u6237\u89D2\u8272\u7BA1\u7406'
                        ),
                        _react2.default.createElement('ul', { className: 'nav navbar-right panel_toolbox' }),
                        _react2.default.createElement('div', { className: 'clearfix' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'x_content' },
                        _react2.default.createElement(
                            'table',
                            { style: { tableLayout: "fixed" }, className: 'table table-hover' },
                            _react2.default.createElement(
                                'thead',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[0] },
                                        '\u7528\u6237\u540D'
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[1] },
                                        '\u59D3\u540D'
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[2] },
                                        '\u90AE\u7BB1'
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[3] },
                                        '\u89D2\u8272'
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[4] },
                                        '\u72B6\u6001'
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { width: this.state.widths[5] },
                                        '\u64CD\u4F5C'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) })),
                _react2.default.createElement(_BindRolesModal2.default, { Actions: this.props.RoleUserActions, roles: this.props.Role.Role.datas, data: this.state.selected })
            );
        }
    }]);

    return RoleUsersTable;
}(_react.Component);

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        RoleActions: (0, _redux.bindActionCreators)(_Role2.default.Role, dispatch),
        RoleUserActions: (0, _redux.bindActionCreators)(_Role2.default.RoleUser, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoleUsersTable);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _tool = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "removeAllRole",
        value: function removeAllRole(e) {
            e.preventDefault();
            var roleIds = [];
            for (var i = 0; i < this.props.data.roles.length; i++) {
                roleIds.push(this.props.data.roles[i].id);
            }
            this.props.Actions.removeRole(this.props.data.id, roleIds);
        }
    }, {
        key: "updateRole",
        value: function updateRole(e) {
            e.preventDefault();
            this.props.edit();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.removeAllRole.bind(this) },
                            "\u79FB\u9664\u6240\u6709\u89D2\u8272"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.updateRole.bind(this) },
                            "\u66F4\u65B0\u89D2\u8272"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BindRolesModal = function (_Component) {
    _inherits(BindRolesModal, _Component);

    function BindRolesModal() {
        _classCallCheck(this, BindRolesModal);

        return _possibleConstructorReturn(this, (BindRolesModal.__proto__ || Object.getPrototypeOf(BindRolesModal)).apply(this, arguments));
    }

    _createClass(BindRolesModal, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.syncFormValue();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.syncFormValue();
        }
    }, {
        key: "syncFormValue",
        value: function syncFormValue() {
            var array = $("#hidenRoels").val().split(",");
            $("#rolelist").select2({
                placeholder: '请选择角色',
                multiple: true,
                separator: ","
            }).val(array).trigger('change');
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            $(".bindUserRole").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            e.preventDefault();
            var userId = this.props.data.id;
            var roleIds = $("#rolelist").val();
            if (roleIds === null) {
                (0, _msg2.default)("失败", "请选择需要绑定的角色", "error");
                return;
            }
            var roles = [];
            for (var i = 0; i < roleIds.length; i++) {
                for (var j = 0; j < this.props.roles.length; j++) {
                    if (roleIds[i] === this.props.roles[j].id) {
                        roles.push(this.props.roles[j]);
                    }
                }
            }
            this.props.Actions.updateRoles(userId, roles);
            this.closeModal();
        }
    }, {
        key: "renderRoles",
        value: function renderRoles() {
            if (this.props.roles === null) {
                return "";
            }
            return this.props.roles.map(function (u) {
                return _react2.default.createElement(
                    "option",
                    { key: u.id, value: u.id },
                    u.name
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var roles = "";
            if (this.props.data !== null && this.props.data.roles.length > 0) {
                roles = this.props.data.roles.map(function (u) {
                    return u.id;
                }).join(",");
            }
            return _react2.default.createElement(
                "div",
                { className: "modal fade bindUserRole", id: "userrolemodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u7528\u6237:",
                                this.props.data === null ? "" : this.props.data.name,
                                " \u7ED1\u5B9A\u89D2\u8272\uFF1A"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u89D2\u8272"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "hidden", id: "hidenRoels", value: roles }),
                                        _react2.default.createElement(
                                            "select",
                                            { id: "rolelist", className: " form-control col-md-7 col-xs-12" },
                                            this.renderRoles()
                                        )
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BindRolesModal;
}(_react.Component);

exports.default = BindRolesModal;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _Client = __webpack_require__(18);

var _Client2 = _interopRequireDefault(_Client);

var _ResourceTable = __webpack_require__(78);

var _ResourceTable2 = _interopRequireDefault(_ResourceTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入Action


//导入组件


var ResourceContainer = function (_Component) {
    _inherits(ResourceContainer, _Component);

    function ResourceContainer() {
        _classCallCheck(this, ResourceContainer);

        return _possibleConstructorReturn(this, (ResourceContainer.__proto__ || Object.getPrototypeOf(ResourceContainer)).apply(this, arguments));
    }

    _createClass(ResourceContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_ResourceTable2.default, _extends({}, this.props.state, { Actions: this.props.Actions }));
        }
    }]);

    return ResourceContainer;
}(_react.Component);

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            Client: (0, _redux.bindActionCreators)(_Client2.default.Client, dispatch),
            Resource: (0, _redux.bindActionCreators)(_Client2.default.Resources, dispatch)
        }
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResourceContainer);

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _Action = __webpack_require__(79);

var _Action2 = _interopRequireDefault(_Action);

var _ResourceUpdateAndAddModal = __webpack_require__(80);

var _ResourceUpdateAndAddModal2 = _interopRequireDefault(_ResourceUpdateAndAddModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入公共类库


var ResourceTable = function (_Component) {
    _inherits(ResourceTable, _Component);

    function ResourceTable() {
        _classCallCheck(this, ResourceTable);

        var _this = _possibleConstructorReturn(this, (ResourceTable.__proto__ || Object.getPrototypeOf(ResourceTable)).call(this));

        _this.state = {
            loading: false,
            widths: ["15%", "15%", "10%", "25%", "25%", "10%"],
            selected: null
        };
        return _this;
    }

    _createClass(ResourceTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var resources = this.props.Client.Resources.resources;
            if (resources === null) {
                //开始加载
                this.setState({ loading: true });
                var cb = function cb(x) {
                    _this2.setState({ loading: false });
                    if (!x.success) {
                        (0, _msg2.default)("失败", "获取资源失败", "error");
                    }
                };
                this.props.Actions.Resource.load(cb.bind(this));
            }
        }
    }, {
        key: "handleView",
        value: function handleView(resource) {
            this.setState({ selected: resource });
            $(".addandupdateResourcemodal").modal("show");
        }
    }, {
        key: "handleDel",
        value: function handleDel(u) {
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "删除成功", "success");
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            var data = {
                IdentityName: u.type === "IdentityResource" ? u.name : "",
                Name: u.type === "ApiResources" ? u.name : ""
            };
            this.props.Actions.Resource.del(data, cb);
        }
    }, {
        key: "handleAddClick",
        value: function handleAddClick() {
            this.setState({ selected: null });
            $(".addandupdateResourcemodal").modal("show");
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this3 = this;

            if (this.state.loading) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "5", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            var resources = this.props.Client.Resources.resources;
            if (resources === null || resources.apiResources.length === 0 && resources.identityResources.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "5", style: { "textAlign": "center" } },
                        "\u6682\u65E0\u6570\u636E..."
                    )
                );
            }
            var arr = [];
            resources.apiResources.map(function (x) {
                arr.push({ type: "ApiResources", name: x.name, displayName: x.displayName, description: x.description, userClaims: x.userClaims });
            });
            resources.identityResources.map(function (x) {
                arr.push({ type: "IdentityResource", name: x.name, displayName: x.displayName, description: x.description, userClaims: x.userClaims });
            });
            return arr.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        u.type
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.displayName
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.userClaims == null || u.userClaims.length === 0 ? "" : u.userClaims.map(function (x) {
                            return _react2.default.createElement(
                                "label",
                                { style: { display: "inline-block" }, className: "label label-primary" },
                                x
                            );
                        })
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.description
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(_Action2.default, { edit: _this3.handleView.bind(_this3, u), del: _this3.handleDel.bind(_this3, u) })
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            console.log(this);
            return _react2.default.createElement(
                "div",
                { className: "col-md-12 col-sm-12 col-xs-12" },
                _react2.default.createElement(
                    "div",
                    { className: "x_panel" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_title" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "\u8D44\u6E90\u7BA1\u7406 ",
                            _react2.default.createElement(
                                "small",
                                null,
                                "\u8D44\u6E90\u7BA1\u7406\u5217\u8868"
                            ),
                            "\xA0\xA0\xA0\xA0",
                            _react2.default.createElement(
                                "a",
                                { style: { marginBottom: -7 }, className: "btn btn-primary", onClick: this.handleAddClick.bind(this), href: "javascript:void(0)" },
                                "\u6DFB\u52A0\u65B0\u7684\u8D44\u6E90"
                            )
                        ),
                        _react2.default.createElement(
                            "ul",
                            { className: "nav navbar-right panel_toolbox" },
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "collapse-link" },
                                    _react2.default.createElement("i", { className: "fa fa-chevron-up" })
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                { className: "dropdown" },
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-expanded": "false" },
                                    _react2.default.createElement("i", { className: "fa fa-wrench" })
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "dropdown-menu", role: "menu" },
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 1"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 2"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "close-link" },
                                    _react2.default.createElement("i", { className: "fa fa-close" })
                                )
                            )
                        ),
                        _react2.default.createElement("div", { className: "clearfix" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "x_content" },
                        _react2.default.createElement(
                            "table",
                            { className: "table table-hover", style: { tableLayout: "fixed" } },
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[0] },
                                        "\u8D44\u6E90\u7C7B\u578B"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[1] },
                                        "\u8D44\u6E90\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[2] },
                                        "\u8D44\u6E90\u663E\u793A\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[3] },
                                        "\u8D44\u6E90\u6807\u8BB0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[4] },
                                        "\u63CF\u8FF0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[5] },
                                        "\u64CD\u4F5C"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_ResourceUpdateAndAddModal2.default, { data: this.state.selected, Actions: this.props.Actions })
            );
        }
    }]);

    return ResourceTable;
}(_react.Component);

exports.default = ResourceTable;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "del",
        value: function del() {
            var _this2 = this;

            if (this.props.del) {
                (0, _confirm2.default)(function (_) {
                    _this2.props.del();
                }, "确定要删除该资源");
            }
        }
    }, {
        key: "view",
        value: function view() {
            if (this.props.view) this.props.view();
        }
    }, {
        key: "edit",
        value: function edit() {
            if (this.props.edit) this.props.edit();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.edit.bind(this) },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.del.bind(this) },
                            "\u5220\u9664"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceUpdateAndAddModal = function (_Component) {
    _inherits(ResourceUpdateAndAddModal, _Component);

    function ResourceUpdateAndAddModal() {
        _classCallCheck(this, ResourceUpdateAndAddModal);

        return _possibleConstructorReturn(this, (ResourceUpdateAndAddModal.__proto__ || Object.getPrototypeOf(ResourceUpdateAndAddModal)).apply(this, arguments));
    }

    _createClass(ResourceUpdateAndAddModal, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.initForm();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.initForm();
        }
    }, {
        key: "initForm",
        value: function initForm() {

            $("#resourceName").val($("#hideResourceName").val());
            $("#displayName").val($('#hideDisplayName').val());
            $("#resourceDescription").val($("#hideDescription").val());
            $("#hideResourceTag").next().tagsInput().importTags($("#hideResourceTag").val());
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            $(".addandupdateResourcemodal").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var data = this.getFormData();
            if (this.props.data === null) {
                var cb = function cb(x) {
                    if (x.success) {
                        (0, _msg2.default)("成功", "添加资源成功", "success");
                        _this2.closeModal();
                    } else {
                        (0, _msg2.default)("失败", x.message, "error");
                    }
                };
                this.props.Actions.Resource.add(data, cb.bind(this));
            } else {
                var _cb = function _cb(x) {
                    if (x.success) {
                        (0, _msg2.default)("成功", "更新资源成功", "success");
                        _this2.closeModal();
                    } else {
                        (0, _msg2.default)("失败", x.message, "error");
                    }
                };
                this.props.Actions.Resource.update(data, _cb.bind(this));
            }
        }
    }, {
        key: "getFormData",
        value: function getFormData() {
            var data = {};
            data.Description = $("#resourceDescription").val();
            data.DisplayName = $("#displayName").val();
            if ($("#resourceType").val() === "Api") {
                data.Name = $('#resourceName').val();
                data.type = "api";
            } else {
                data.IdentityName = $('#resourceName').val();
                data.type = "identity";
            }
            data.UserClaims = $("#hideResourceTag").next().val().split(",");
            return data;
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.props.data;
            return _react2.default.createElement(
                "div",
                { className: "modal fade addandupdateResourcemodal", id: "userrolemodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                this.props.data === null ? "添加" : "更新",
                                "\u8D44\u6E90"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8D44\u6E90\u7C7B\u578B\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideResourceType", value: data === null || data.type === null ? "" : data.type, type: "hidden" }),
                                        _react2.default.createElement(
                                            "select",
                                            { id: "resourceType", disabled: data === null ? false : true, className: "form-control col-md-7 col-xs-12" },
                                            _react2.default.createElement(
                                                "option",
                                                { value: "Api" },
                                                "Api"
                                            ),
                                            _react2.default.createElement(
                                                "option",
                                                { value: "Identity" },
                                                "Identity"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8D44\u6E90\u540D\u79F0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideResourceName", value: data === null || data.name === null ? "" : data.name, type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "resourceName", readOnly: data === null ? false : true, className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8D44\u6E90\u5C55\u793A\u540D\u79F0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideDisplayName", value: data === null || data.displayName === null ? "" : data.displayName, type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "displayName", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8D44\u6E90\u6807\u8BB0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideResourceTag", value: data === null || data.UserClaims === null ? "" : data.userClaims.join(","), type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "resourceTag", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u63CF\u8FF0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { id: "hideDescription", value: data === null || data.description === null ? "" : data.description, type: "hidden" }),
                                        _react2.default.createElement("input", { type: "text", id: "resourceDescription", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal.bind(this) },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ResourceUpdateAndAddModal;
}(_react.Component);

exports.default = ResourceUpdateAndAddModal;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _User = __webpack_require__(20);

var _User2 = _interopRequireDefault(_User);

var _UserTable = __webpack_require__(84);

var _UserTable2 = _interopRequireDefault(_UserTable);

var _SearchBar = __webpack_require__(91);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserContainer = function (_Component) {
    _inherits(UserContainer, _Component);

    function UserContainer() {
        _classCallCheck(this, UserContainer);

        return _possibleConstructorReturn(this, (UserContainer.__proto__ || Object.getPrototypeOf(UserContainer)).apply(this, arguments));
    }

    _createClass(UserContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SearchBar2.default, { Actions: this.props.Actions }),
                _react2.default.createElement(_UserTable2.default, _extends({}, this.props.state, { Actions: this.props.Actions }))
            );
        }
    }]);

    return UserContainer;
}(_react.Component);

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            User: (0, _redux.bindActionCreators)(_User2.default.User, dispatch)
        }
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserContainer);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.editUserName = editUserName;
exports.del = del;
exports.editMobile = editMobile;
exports.editPassword = editPassword;
exports.editState = editState;
exports.unLockUser = unLockUser;
exports.add = add;
exports.search = search;
exports.cancelSearch = cancelSearch;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _urls = __webpack_require__(12);

var _urls2 = _interopRequireDefault(_urls);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入http
function load(cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.get("/api/user", {}, function (x) {
            if (x.success) {
                dispatch({ type: _ActionTypes2.default.User.LOAD, datas: x.data });
                cb(x);
            } else {
                cb(x);
            }
        });
    };
}

function editUserName(id, userName, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/user/rename", { id: id, userName: userName }, function (x) {
            if (x.success) {
                dispatch({ type: _ActionTypes2.default.User.EDITUSERNAME, data: x.data });
            }
            cb(x);
        });
    };
}

function del(id, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        (0, _confirm2.default)(function (_) {
            _http2.default.delete("/api/user", { id: id }, function (x) {
                if (x.success) {
                    dispatch({ type: _ActionTypes2.default.User.DELETE, id: id });
                }
                cb(x);
            });
        }, "确定要删除该用户");
    };
}

function editMobile(id, Mobile, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/user", { id: id, Mobile: Mobile }, function (x) {
            if (x.success) {
                dispatch({ type: _ActionTypes2.default.User.EDITMOBILE, data: x.data });
            }
            cb(x);
        });
    };
}

function editPassword(id, password1, pasword2, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/user/updatepassword", { id: id, password: password1, repassword: pasword2 }, function (x) {
            cb(x);
        });
    };
}

//修改状态
function editState(id, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.put("/api/user/updatestate", { id: id }, function (x) {
            if (x.success) {
                dispatch({ type: _ActionTypes2.default.User.UPDATESTATE, id: id });
            }
            cb(x);
        });
    };
}

function unLockUser(id, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        (0, _confirm2.default)(function (_) {
            _http2.default.post("/api/user/unlockUser?userid=" + id, null, function (x) {
                cb(x);
            });
        }, "确定解除锁定状态");
    };
}

function add(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/user", data, function (x) {
            if (x.success) {
                dispatch({ type: _ActionTypes2.default.User.ADD, data: x.data });
            }
            cb(x);
        });
    };
}

//搜索
function search(data) {
    return function (dispatch) {
        dispatch({ type: _ActionTypes2.default.User.SEARCH, data: data });
    };
}

//取消搜索
function cancelSearch() {
    return function (dispatch) {
        dispatch({ type: _ActionTypes2.default.User.CANCELSEARCH });
    };
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.createUser = createUser;

var _ActionTypes = __webpack_require__(4);

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _urls = __webpack_require__(12);

var _urls2 = _interopRequireDefault(_urls);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载所有的数据,这里开始要进行分页操作
function load(data, cb) {
    cb = cb || function () {};
    return function (dispatch) {
        _http2.default.post("/api/empinfo/", data, function (result) {
            if (result.success) {
                dispatch({ type: _ActionTypes2.default.EMP.LOAD, datas: result.data.data });
            }
            cb(result);
        });
    };
}

function createUser(idcardNo) {
    return function (dispatch) {
        dispatch({ type: _ActionTypes2.default.EMP.CREATEUSER, idcardNo: idcardNo });
    };
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

var _EditMobile = __webpack_require__(85);

var _EditMobile2 = _interopRequireDefault(_EditMobile);

var _EditPassword = __webpack_require__(86);

var _EditPassword2 = _interopRequireDefault(_EditPassword);

var _UserAddModal = __webpack_require__(87);

var _UserAddModal2 = _interopRequireDefault(_UserAddModal);

var _CSVFileModal = __webpack_require__(88);

var _CSVFileModal2 = _interopRequireDefault(_CSVFileModal);

var _EditUserName = __webpack_require__(89);

var _EditUserName2 = _interopRequireDefault(_EditUserName);

var _Action = __webpack_require__(90);

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入组件


var UserTable = function (_Component) {
    _inherits(UserTable, _Component);

    function UserTable() {
        _classCallCheck(this, UserTable);

        var _this = _possibleConstructorReturn(this, (UserTable.__proto__ || Object.getPrototypeOf(UserTable)).call(this));

        _this.state = {
            loading: false,
            widths: ["15%", "10%", "20%", "20%", "10%", "10%", "10%", "10%"],
            selected: null,
            index: 1,
            showCount: 10,
            isExportting: false
        };
        return _this;
    }

    _createClass(UserTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var datas = this.props.User.User.users;
            if (datas === null || datas.length === 0) {
                //开始加载
                this.setState({ loading: true });
                var cb = function cb(x) {
                    _this2.setState({ loading: false });
                    if (!x.success) {
                        (0, _msg2.default)("错误", x.message, "error");
                    }
                };
                this.props.Actions.User.load(cb.bind(this));
                return;
            }
            var pageCount = Math.ceil(datas.length / this.state.showCount);
            this.setState({ pageCount: pageCount });
        }
    }, {
        key: "handlePageData",
        value: function handlePageData(index, cb) {
            this.setState({ index: index });
        }

        //修改手机号码

    }, {
        key: "handleEditMobile",
        value: function handleEditMobile(u) {
            this.setState({ selected: u });
            $(".editMobile").modal("show");
        }
    }, {
        key: "handleEditPassword",
        value: function handleEditPassword(u) {
            this.setState({ selected: u });
            $(".editpassword").modal("show");
        }
    }, {
        key: "handleEditUserName",
        value: function handleEditUserName(u) {
            this.setState({ selected: u });
            $(".editUserName").modal("show");
        }
    }, {
        key: "handleEditState",
        value: function handleEditState(u) {
            var self = this;
            (0, _confirm2.default)(function (_) {
                self.props.Actions.User.editState(u.id.id, function (x) {
                    if (x.success) {
                        (0, _msg2.default)("成功", "修改用户状态成功", "success");
                    } else {
                        (0, _msg2.default)("失败", x.message, "error");
                    }
                });
            }, "是否修改该用户状态?");
        }
    }, {
        key: "handUnLockUser",
        value: function handUnLockUser(id) {
            this.props.Actions.User.unLockUser(id, function (x) {
                if (x.success) {
                    (0, _msg2.default)("成功", x.message, "success");
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            });
        }
    }, {
        key: "handleAddClick",
        value: function handleAddClick() {
            $("#useraddform")[0].reset();
            $(".addUser").modal("show");
        }

        //处理删除

    }, {
        key: "handleDelete",
        value: function handleDelete(id) {
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "删除成功", "success");
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            this.props.Actions.User.del(id, cb.bind(this));
        }
    }, {
        key: "handleExportUserData",
        value: function handleExportUserData() {
            var _this3 = this;

            (0, _confirm2.default)(function (_) {
                var cb = function cb(x) {
                    if (x.success) {
                        (0, _msg2.default)("成功", "导出用户数据成功", "success");
                    } else {
                        (0, _msg2.default)("失败", x.message, "error");
                    }
                };
                _http2.default.post("/api/user/ExportUserData", null, cb.bind(_this3));
            }, "确定是否要导出用户数据到到存储服务!!?");
        }
    }, {
        key: "handleImportUserData",
        value: function handleImportUserData() {
            $(".csvfilemodal").modal("show");
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount;

            var pageCount = Math.ceil(this.props.User.User.users.length / this.state.showCount);
            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            return _react2.default.createElement(
                "div",
                { className: "col-md-12 col-sm-12 col-xs-12" },
                _react2.default.createElement(
                    "div",
                    { className: "x_panel" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_title" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "\u7528\u6237\u7BA1\u7406 ",
                            _react2.default.createElement(
                                "small",
                                null,
                                "\u7528\u6237\u7BA1\u7406\u5217\u8868"
                            ),
                            "\xA0\xA0\xA0\xA0",
                            _react2.default.createElement(
                                "button",
                                { style: { marginBottom: -7, display: "none" }, className: "btn btn-primary", onClick: this.handleAddClick.bind(this) },
                                "\u6DFB\u52A0\u7528\u6237"
                            ),
                            _react2.default.createElement(
                                "button",
                                { style: { marginBottom: -7 }, disabled: this.state.isExportting, className: "btn btn-primary", onClick: this.handleExportUserData.bind(this) },
                                "\u5BFC\u51FA\u7528\u6237\u6570\u636E"
                            ),
                            _react2.default.createElement(
                                "button",
                                { style: { marginBottom: -7 }, className: "btn btn-primary", onClick: this.handleImportUserData.bind(this) },
                                "\u5BFC\u5165\u7528\u6237\u6570\u636E"
                            )
                        ),
                        _react2.default.createElement("div", { className: "clearfix" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "x_content" },
                        _react2.default.createElement(
                            "table",
                            { className: "table table-hover", style: { tableLayout: "fixed" } },
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[0] },
                                        "\u7528\u6237\u540D"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[1] },
                                        "\u59D3\u540D"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[2] },
                                        "\u8EAB\u4EFD\u8BC1\u53F7"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[3] },
                                        "\u624B\u673A\u53F7\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { width: this.state.widths[4] },
                                        "\u5458\u5DE5\u7F16\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[5] },
                                        "\u9501\u5B9A"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[6] },
                                        "\u72B6\u6001"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[7] },
                                        "\u64CD\u4F5C"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) })),
                _react2.default.createElement(_EditMobile2.default, { data: this.state.selected, Actions: this.props.Actions }),
                _react2.default.createElement(_EditPassword2.default, { data: this.state.selected, Actions: this.props.Actions }),
                _react2.default.createElement(_UserAddModal2.default, { Actions: this.props.Actions }),
                _react2.default.createElement(_EditUserName2.default, { data: this.state.selected, Actions: this.props.Actions }),
                _react2.default.createElement(_CSVFileModal2.default, null)
            );
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this4 = this;

            var datas = this.props.User.User.users;
            var _state2 = this.state,
                index = _state2.index,
                showCount = _state2.showCount;

            var offset = (index - 1) * this.state.showCount;
            datas = offset + showCount >= datas.length ? datas.slice(offset, datas.length) : datas.slice(offset, offset + showCount);
            if (this.state.loading) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            if (datas === null || datas.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        "\u6682\u65E0\u6570\u636E..."
                    )
                );
            }
            //开始渲染数据
            return datas.map(function (u) {
                var events = {
                    EditPassword: _this4.handleEditPassword.bind(_this4, u),
                    EditMobile: _this4.handleEditMobile.bind(_this4, u),
                    EditState: _this4.handleEditState.bind(_this4, u),
                    Delete: _this4.handleDelete.bind(_this4, u.id.id),
                    EditUserName: _this4.handleEditUserName.bind(_this4, u),
                    unLockUser: _this4.handUnLockUser.bind(_this4, u.id.id)
                };
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        u.username
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.idCardNo
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.mobile
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.employeeNumber
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.lockoutEnd === null ? "未锁定" : "已锁定"
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.isActive ? "可用" : "不可用"
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(_Action2.default, events)
                    )
                );
            });
        }
    }]);

    return UserTable;
}(_react.Component);

exports.default = UserTable;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditMobile = function (_Component) {
    _inherits(EditMobile, _Component);

    function EditMobile() {
        _classCallCheck(this, EditMobile);

        return _possibleConstructorReturn(this, (EditMobile.__proto__ || Object.getPrototypeOf(EditMobile)).apply(this, arguments));
    }

    _createClass(EditMobile, [{
        key: "closeModal",
        value: function closeModal() {
            $(".editMobile").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var id = this.props.data.id.id;
            var mobile = $("#mobiles").val();
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "修改手机号码成功", "success");
                    _this2.closeModal();
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            this.props.Actions.User.editMobile(id, mobile, cb.bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade editMobile", id: "bindUserModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u4FEE\u6539\u7528\u6237",
                                this.props.data === null ? "" : this.props.data.name,
                                "\u624B\u673A\u53F7:"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement("input", { type: "hidden", ref: "id" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u624B\u673A\u53F7\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "mobiles", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return EditMobile;
}(_react.Component);

exports.default = EditMobile;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditPassword = function (_Component) {
    _inherits(EditPassword, _Component);

    function EditPassword() {
        _classCallCheck(this, EditPassword);

        return _possibleConstructorReturn(this, (EditPassword.__proto__ || Object.getPrototypeOf(EditPassword)).apply(this, arguments));
    }

    _createClass(EditPassword, [{
        key: "closeModal",
        value: function closeModal() {
            $(".editpassword").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var id = this.props.data.id.id;
            var password1 = $("#password1").val();
            var password2 = $('#password2').val();
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "修改密码成功", "success");
                    _this2.closeModal();
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            this.props.Actions.User.editPassword(id, password1, password2, cb.bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade editpassword", id: "bindUserModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u4FEE\u6539\u7528\u6237",
                                this.props.data === null ? "" : this.props.data.name,
                                "\u5BC6\u7801:"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement("input", { type: "hidden", ref: "id" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u65B0\u5BC6\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "password", id: "password1", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "password", id: "password2", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return EditPassword;
}(_react.Component);

exports.default = EditPassword;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserAddModal = function (_Component) {
    _inherits(UserAddModal, _Component);

    function UserAddModal() {
        _classCallCheck(this, UserAddModal);

        return _possibleConstructorReturn(this, (UserAddModal.__proto__ || Object.getPrototypeOf(UserAddModal)).apply(this, arguments));
    }

    _createClass(UserAddModal, [{
        key: "closeModal",
        value: function closeModal() {
            $(".addUser").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var data = this.getFormData();
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "添加用户成功", "success");
                    _this2.closeModal();
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            this.props.Actions.User.add(data, cb.bind(this));
        }
    }, {
        key: "getFormData",
        value: function getFormData() {
            var data = {};
            data.name = $("#addname").val();
            data.IdCardNo = $("#idcardno").val();
            data.Mobile = $("#phones").val();
            data.Username = $("#usernames").val();
            data.UserPwd = $("#pwd").val();
            return data;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade addUser", id: "bindUserModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u6DFB\u52A0\u7528\u6237"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "useraddform", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement("input", { type: "hidden", ref: "id" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u59D3\u540D"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "addname", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8EAB\u4EFD\u8BC1\u53F7\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "idcardno", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u624B\u673A\u53F7\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "phones", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u540D"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "usernames", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u5BC6\u7801"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "password", id: "pwd", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return UserAddModal;
}(_react.Component);

exports.default = UserAddModal;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVFileModal = function (_Component) {
    _inherits(CSVFileModal, _Component);

    function CSVFileModal() {
        _classCallCheck(this, CSVFileModal);

        var _this = _possibleConstructorReturn(this, (CSVFileModal.__proto__ || Object.getPrototypeOf(CSVFileModal)).call(this));

        _this.state = {
            files: [] //文件的名称
        };
        return _this;
    }

    _createClass(CSVFileModal, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            (0, _confirm2.default)(function (_) {
                var formData = new FormData($("#form1")[0]);
                $.ajax({
                    url: "/api/user/ImportUserData",
                    type: 'POST',
                    data: formData,
                    // 告诉jQuery不要去处理发送的数据  
                    processData: false,
                    // 告诉jQuery不要去设置Content-Type请求头  
                    contentType: false,
                    async: true,
                    success: function success(data) {
                        if (data) {
                            if (data.success) {
                                (0, _msg2.default)("成功", "还原数据到ServiceFabric集群成功,请刷新页面查看", "success");
                            } else {
                                (0, _msg2.default)("失败", data.message, "error");
                            }
                        }
                    }
                });
            }, "确定要您所选择的用户备份文件");
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            if (e.target.files !== null && e.target.files.length > 0) {
                var arr = [];
                for (var i = 0; i < e.target.files.length; i++) {
                    arr.push(e.target.files[i].name);
                }
                this.setState({ files: arr });
            } else {
                this.setState({ files: [] });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade csvfilemodal", id: "bindUserModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u9009\u62E9\u5BFC\u5165\u6587\u4EF6"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { action: "uploadTrainProduct", method: "post", enctype: "multipart/form-data", id: "form1" },
                                _react2.default.createElement("input", { onChange: this.handleChange.bind(this), id: "csvfile", type: "file", name: "csvfile", multiple: "multiple" }),
                                this.state.files.map(function (u) {
                                    return _react2.default.createElement(
                                        "div",
                                        null,
                                        _react2.default.createElement(
                                            "span",
                                            null,
                                            u
                                        )
                                    );
                                }),
                                _react2.default.createElement("br", null),
                                _react2.default.createElement(
                                    "button",
                                    { onClick: this.handleSubmit.bind(this), className: "btn btn-primary" },
                                    "\u63D0\u4EA4"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CSVFileModal;
}(_react.Component);

exports.default = CSVFileModal;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditUserName = function (_Component) {
    _inherits(EditUserName, _Component);

    function EditUserName() {
        _classCallCheck(this, EditUserName);

        return _possibleConstructorReturn(this, (EditUserName.__proto__ || Object.getPrototypeOf(EditUserName)).apply(this, arguments));
    }

    _createClass(EditUserName, [{
        key: "closeModal",
        value: function closeModal() {
            $(".editUserName").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var id = this.props.data.id.id;
            var username = $("#usernames1").val();
            var cb = function cb(x) {
                if (x.success) {
                    (0, _msg2.default)("成功", "修改手机号码成功", "success");
                    _this2.closeModal();
                } else {
                    (0, _msg2.default)("失败", x.message, "error");
                }
            };
            this.props.Actions.User.editUserName(id, username, cb.bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade editUserName", id: "bindUserModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title" },
                                "\u4FEE\u6539\u7528\u6237",
                                this.props.data === null ? "" : this.props.data.name,
                                "\u7528\u6237\u540D:"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement("input", { type: "hidden", ref: "id" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u540D\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "usernames1", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return EditUserName;
}(_react.Component);

exports.default = EditUserName;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _tool = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.EditPassword },
                            "\u4FEE\u6539\u5BC6\u7801"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.EditMobile },
                            "\u4FEE\u6539\u624B\u673A\u53F7"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.EditState },
                            "\u4FEE\u6539\u72B6\u6001"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.EditUserName },
                            "\u4FEE\u6539\u7528\u6237\u540D"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.unLockUser },
                            "\u89E3\u9664\u9501\u5B9A"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascrpit:void(0)", onClick: this.props.Delete },
                            "\u5220\u9664"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_Component) {
    _inherits(SearchBar, _Component);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: 'search',
        value: function search(e) {
            e.preventDefault();
            var data = this.getFormData();
            if (this.props.Actions.User.search) this.props.Actions.User.search(data);
        }
    }, {
        key: 'getFormData',
        value: function getFormData() {
            var data = {};
            data["username"] = $('#username').val();
            data["name"] = $("#name").val();
            data["idCardNo"] = $('#idCardNo').val();
            data["mobile"] = $("#mobile").val();
            data["email"] = $("#email").val();
            data["employeeNumber"] = $("#employeeNumber").val();
            data["lock"] = $("#lock").prop('checked');
            return data;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { className: 'form-inline' },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u7528\u6237\u540D'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'username', placeholder: '\u6309\u7528\u6237\u540D\u641C\u7D22' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u59D3\u540D'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'email', className: 'form-control', id: 'name', placeholder: '\u6309\u59D3\u540D\u641C\u7D22' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u8EAB\u4EFD\u8BC1\u53F7'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'email', className: 'form-control', id: 'idCardNo', placeholder: '\u6309\u8EAB\u4EFD\u8BC1\u53F7\u641C\u7D22' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u624B\u673A\u53F7\u7801'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'email', className: 'form-control', id: 'mobile', placeholder: '\u6309\u624B\u673A\u53F7\u7801\u641C\u7D22' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u5458\u5DE5\u7F16\u7801'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'employeeNumber', placeholder: '\u5458\u5DE5\u7F16\u7801' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u662F\u5426\u9501\u5B9A'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'checkbox', className: 'form-control', id: 'lock', value: 'true', placeholder: '\u662F\u5426\u9501\u5B9A' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u90AE\u7BB1'
                    ),
                    '\xA0',
                    _react2.default.createElement('input', { type: 'email', className: 'form-control', id: 'email', placeholder: '\u6309\u90AE\u7BB1\u641C\u7D22' }),
                    '\xA0\xA0\xA0'
                ),
                _react2.default.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-default', onClick: this.search.bind(this) },
                    '\u641C\u7D22'
                )
            );
        }
    }]);

    return SearchBar;
}(_react.Component);

exports.default = SearchBar;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导出Index首页组件
var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {
            loaded: false,
            users: 0,
            clients: 0,
            roles: 0
        };
        return _this;
    }

    _createClass(Index, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!this.loaded) {
                //开始加载
                var self = this;
                _http2.default.get("/api/count", {}, function (result) {
                    if (result.success) {
                        self.setState({
                            users: result.data.userCount,
                            clients: result.data.clientCount,
                            roles: result.data.roleCount
                        });
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "row tile_count" },
                _react2.default.createElement(
                    "div",
                    { className: "col-md-2 col-sm-4 col-xs-6 tile_stats_count" },
                    _react2.default.createElement(
                        "span",
                        { className: "count_top" },
                        _react2.default.createElement("i", { className: "fa fa-user" }),
                        " \u603B\u8BA1\u7528\u6237"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "count" },
                        this.state.users
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "count_bottom" },
                        _react2.default.createElement(
                            "i",
                            { className: "green" },
                            "4% "
                        ),
                        " From last Week"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "col-md-2 col-sm-4 col-xs-6 tile_stats_count" },
                    _react2.default.createElement(
                        "span",
                        { className: "count_top" },
                        _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                        " \u603B\u8BA1\u5BA2\u6237\u7AEF"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "count" },
                        this.state.clients
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "count_bottom" },
                        _react2.default.createElement(
                            "i",
                            { className: "green" },
                            _react2.default.createElement("i", { className: "fa fa-sort-asc" }),
                            "3% "
                        ),
                        " From last Week"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "col-md-2 col-sm-4 col-xs-6 tile_stats_count" },
                    _react2.default.createElement(
                        "span",
                        { className: "count_top" },
                        _react2.default.createElement("i", { className: "fa fa-user" }),
                        " \u603B\u8BA1\u89D2\u8272"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "count green" },
                        this.state.roles
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "count_bottom" },
                        _react2.default.createElement(
                            "i",
                            { className: "green" },
                            _react2.default.createElement("i", { className: "fa fa-sort-asc" }),
                            "34% "
                        ),
                        " From last Week"
                    )
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

exports.default = Index;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccessDenied = function (_Component) {
    _inherits(AccessDenied, _Component);

    function AccessDenied() {
        _classCallCheck(this, AccessDenied);

        return _possibleConstructorReturn(this, (AccessDenied.__proto__ || Object.getPrototypeOf(AccessDenied)).apply(this, arguments));
    }

    _createClass(AccessDenied, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "header",
                    { style: { margin: "0 auto", textAlign: "center" } },
                    _react2.default.createElement(
                        "h1",
                        { className: "text-danger" },
                        "\u7981\u6B62\u8BBF\u95EE,\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u4EE5\u83B7\u5F97\u6743\u9650!"
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "text-danger", style: { margin: "0 auto" } },
                        "You do not have access to this resource."
                    )
                )
            );
        }
    }]);

    return AccessDenied;
}(_react.Component);

exports.default = AccessDenied;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
    _inherits(NotFound, _Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "header",
                    { style: { margin: "0 auto", textAlign: "center" } },
                    _react2.default.createElement(
                        "h1",
                        { className: "text-danger" },
                        "\u8D44\u6E90\u672A\u627E\u5230,\u8BF7\u8F93\u5165\u6B63\u786E\u7684URL"
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "text-danger", style: { margin: "0 auto" } },
                        "Page Not Found!"
                    )
                )
            );
        }
    }]);

    return NotFound;
}(_react.Component);

exports.default = NotFound;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Errors = function (_Component) {
    _inherits(Errors, _Component);

    function Errors() {
        _classCallCheck(this, Errors);

        return _possibleConstructorReturn(this, (Errors.__proto__ || Object.getPrototypeOf(Errors)).apply(this, arguments));
    }

    _createClass(Errors, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "header",
                    { style: { margin: "0 auto", textAlign: "center" } },
                    _react2.default.createElement(
                        "h1",
                        { className: "text-danger" },
                        "\u670D\u52A1\u5668\u9047\u89C1\u4E0D\u53EF\u7406\u89E3\u7684\u95EE\u9898..."
                    ),
                    _react2.default.createElement(
                        "p",
                        { className: "text-danger", style: { margin: "0 auto" } },
                        "Page Error!"
                    )
                )
            );
        }
    }]);

    return Errors;
}(_react.Component);

exports.default = Errors;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _redux = __webpack_require__(6);

var _User = __webpack_require__(20);

var _User2 = _interopRequireDefault(_User);

var _EmpTable = __webpack_require__(97);

var _EmpTable2 = _interopRequireDefault(_EmpTable);

var _SearchBar = __webpack_require__(21);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入Action


//导入组件


var EmpContainer = function (_Component) {
    _inherits(EmpContainer, _Component);

    function EmpContainer() {
        _classCallCheck(this, EmpContainer);

        return _possibleConstructorReturn(this, (EmpContainer.__proto__ || Object.getPrototypeOf(EmpContainer)).call(this));
    }

    _createClass(EmpContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_EmpTable2.default, _extends({}, this.props.state, { Actions: this.props.Actions }))
            );
        }
    }]);

    return EmpContainer;
}(_react.Component);

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            Emp: (0, _redux.bindActionCreators)(_User2.default.Emp, dispatch)
        }
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EmpContainer);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Loading = __webpack_require__(9);

var _Loading2 = _interopRequireDefault(_Loading);

var _Pager = __webpack_require__(10);

var _Pager2 = _interopRequireDefault(_Pager);

var _Action = __webpack_require__(98);

var _Action2 = _interopRequireDefault(_Action);

var _CreateUserModal = __webpack_require__(99);

var _CreateUserModal2 = _interopRequireDefault(_CreateUserModal);

var _SearchBar = __webpack_require__(21);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入组件


//导入公共类库


var TmpTable = function (_Component) {
    _inherits(TmpTable, _Component);

    function TmpTable() {
        _classCallCheck(this, TmpTable);

        var _this = _possibleConstructorReturn(this, (TmpTable.__proto__ || Object.getPrototypeOf(TmpTable)).call(this));

        _this.state = {
            widths: ["10%", "15%", "10%", "25%", "25%", "10%", "10%"],
            loading: true,
            selected: null,
            index: 1,
            showCount: 10,
            pageCount: 1
        };
        return _this;
    }

    //组件渲染结束


    _createClass(TmpTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var cb = function cb(result) {
                _this2.setState({ loading: false });
                if (!result.success) {
                    (0, _msg2.default)("错误", result.message, "error");
                } else {
                    _this2.setState({ pageCount: result.data.pageCount });
                }
            };
            this.props.Actions.Emp.load(null, cb.bind(this));
        }
    }, {
        key: "handleLoad",
        value: function handleLoad(query) {
            var _this3 = this;

            //处理搜索记载的问题
            if (query === null || query == undefined) return;
            query["PageIndex"] = 1;
            query["PageSize"] = 10;
            this.setState({ index: 1 });
            var cb = function cb(result) {
                _this3.setState({ loading: false });
                if (!result.success) {
                    (0, _msg2.default)("错误", result.message, "error");
                } else {
                    _this3.setState({ pageCount: result.data.pageCount });
                }
            };
            this.props.Actions.Emp.load(query, cb.bind(this));
        }
    }, {
        key: "handlePageData",
        value: function handlePageData(index) {
            var _this4 = this;

            this.setState({
                index: index,
                loading: true
            });
            var cb = function cb(x) {
                _this4.setState({ loading: false, pageCount: x.data.pageCount });
            };
            //TODO：下一个分支代码优化这一部分
            var data = {};
            data["IDKey"] = parseInt($('#IDKey').val());
            data["name"] = $("#name").val();
            data["deptName"] = $('#deptName').val();
            data["srcOrgName"] = $("#srcOrgName").val();
            data["fRelationStatus"] = $("#fRelationStatus").val();
            data["pageIndex"] = index;
            data["pageSize"] = this.state.showCount;
            this.props.Actions.Emp.load(data, cb.bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                index = _state.index,
                showCount = _state.showCount,
                pageCount = _state.pageCount;

            var pageInfo = { index: index, showCount: showCount, pageCount: pageCount };
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_SearchBar2.default, { load: this.handleLoad.bind(this) }),
                _react2.default.createElement(
                    "div",
                    { className: "col-md-12 col-sm-12 col-xs-12" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_panel" },
                        _react2.default.createElement(
                            "div",
                            { className: "x_title" },
                            _react2.default.createElement(
                                "h2",
                                null,
                                "\u804C\u5458\u7BA1\u7406 ",
                                _react2.default.createElement(
                                    "small",
                                    null,
                                    "\u804C\u5458\u8D44\u6E90\u5217\u8868"
                                ),
                                "\xA0\xA0\xA0\xA0"
                            ),
                            _react2.default.createElement("div", { className: "clearfix" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "x_content" },
                            _react2.default.createElement(
                                "table",
                                { className: "table table-hover", style: { tableLayout: "fixed" } },
                                _react2.default.createElement(
                                    "thead",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[0] },
                                            "IDKey"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[1] },
                                            "\u59D3\u540D"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[2] },
                                            "\u5458\u5DE5\u7F16\u53F7"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[3] },
                                            "\u804C\u4F4D\u540D\u79F0"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[4] },
                                            "\u7EC4\u7EC7\u673A\u6784\u540D\u79F0"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[5] },
                                            "\u5165\u804C\u72B6\u6001"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[6] },
                                            "\u64CD\u4F5C"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    this.renderData()
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(_Pager2.default, _extends({}, pageInfo, { click: this.handlePageData.bind(this) })),
                    _react2.default.createElement(_CreateUserModal2.default, { createUser: this.props.Actions.Emp.createUser, data: this.state.selected })
                )
            );
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this5 = this;

            if (this.state.loading) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        _react2.default.createElement(_Loading2.default, null)
                    )
                );
            }
            console.log(this);
            var datas = this.props.User.Emp.emps;
            if (datas === null || datas.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        "\u6682\u672A\u67E5\u8BE2\u5230\u6570\u636E"
                    )
                );
            }
            return datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        u.idKey
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.number
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.deptName
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.srcOrgName
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.fRelationStatus
                    ),
                    u.haveRegisteUser ? _react2.default.createElement(
                        "td",
                        null,
                        "\u6B64\u804C\u5458\u4EE5\u6CE8\u518C\u7528\u6237"
                    ) : _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(_Action2.default, { createUser: _this5.createUser.bind(_this5, u) })
                    )
                );
            });
        }
    }, {
        key: "createUser",
        value: function createUser(model) {
            this.setState({ selected: model });
            $("#phone").val("");
            $("#username").val("");
            $("#password").val("");
            $(".createuserbyempmodal").modal("show");
        }
    }]);

    return TmpTable;
}(_react.Component);

exports.default = TmpTable;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function (_Component) {
    _inherits(Action, _Component);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "createUser",
        value: function createUser() {
            if (this.props.createUser) this.props.createUser();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "btn-group" },
                _react2.default.createElement(
                    "button",
                    { "data-toggle": "dropdown", className: "btn btn-default dropdown-toggle", type: "button", "aria-expanded": "true" },
                    "\u64CD\u4F5C",
                    _react2.default.createElement("span", { className: "caret" })
                ),
                _react2.default.createElement(
                    "ul",
                    { style: { minWidth: 30 }, role: "menu", className: "dropdown-menu" },
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.createUser.bind(this) },
                            "\u521B\u5EFA\u7528\u6237"
                        )
                    )
                )
            );
        }
    }]);

    return Action;
}(_react.Component);

exports.default = Action;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg = __webpack_require__(1);

var _msg2 = _interopRequireDefault(_msg);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入公共类库


var CreateUserModal = function (_Component) {
    _inherits(CreateUserModal, _Component);

    function CreateUserModal() {
        _classCallCheck(this, CreateUserModal);

        return _possibleConstructorReturn(this, (CreateUserModal.__proto__ || Object.getPrototypeOf(CreateUserModal)).apply(this, arguments));
    }

    _createClass(CreateUserModal, [{
        key: "closeModal",
        value: function closeModal() {
            $(".createuserbyempmodal").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var data = this.getFormData();
            var cb = function cb(result) {
                if (result.success) {
                    (0, _msg2.default)("成功", "注册成功", "success");
                    _this2.props.createUser(data.IdCardNo);
                    _this2.closeModal();
                } else {
                    (0, _msg2.default)("失败", result.message, "error");
                }
            };
            _http2.default.post("/api/empinfo/CreateUser", data, cb.bind(this));
        }
    }, {
        key: "getFormData",
        value: function getFormData() {
            var data = {};
            data.IdCardNo = $("#IdCardNo").val();
            data.Name = $("#IdCardName").val();
            data.EmployeeNumber = $("#EmployeeNumber").val();
            data.Phone = $("#phone").val();
            data.UserName = $("#username").val();
            data.Password = $("#password").val();
            data.Gender = $("#Gender").val();
            return data;
        }
    }, {
        key: "render",
        value: function render() {

            var data = this.props.data;
            return _react2.default.createElement(
                "div",
                { className: "modal fade createuserbyempmodal", id: "userrolemodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                "\u521B\u5EFA\u7528\u6237"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u8EAB\u4EFD\u8BC1\u53F7\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "IdCardNo", readOnly: true, value: data === null ? "" : data.idCardNo, className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u8EAB\u4EFD\u8BC1\u59D3\u540D\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "IdCardName", readOnly: true, value: data === null ? "" : data.name, className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u5458\u5DE5\u7F16\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "EmployeeNumber", readOnly: true, value: data === null ? "" : data.number, className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u6027\u522B\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "Gender", readOnly: true, value: data === null ? "" : data.gender, className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u624B\u673A\u53F7\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "phone", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u6CE8\u518C\u7528\u6237\u540D\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "username", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u7528\u6237\u540D\u5BC6\u7801\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", id: "password", className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CreateUserModal;
}(_react.Component);

exports.default = CreateUserModal;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyncContainer = function (_Component) {
    _inherits(SyncContainer, _Component);

    function SyncContainer() {
        _classCallCheck(this, SyncContainer);

        return _possibleConstructorReturn(this, (SyncContainer.__proto__ || Object.getPrototypeOf(SyncContainer)).apply(this, arguments));
    }

    _createClass(SyncContainer, [{
        key: "syncKingdee",
        value: function syncKingdee(e) {
            e.preventDefault();
            _http2.default.post("/api/sync/employee", {}, function (x) {
                alert(x.message);
            }, function (x) {
                alert("失败,请重新请求");
            });
        }
    }, {
        key: "syncToActor",
        value: function syncToActor(e) {
            e.preventDefault();
            _http2.default.post("/api/sync/syncToUser", {}, function (x) {
                alert(x.message);
            }, function (x) {
                alert("失败,请重新操作!");
            });
        }
    }, {
        key: "syncOrg",
        value: function syncOrg(e) {
            e.preventDefault();
            _http2.default.post("/api/sync/org", {}, function (x) {
                alert(x.message);
            }, function (x) {
                alert("失败,请重新操作!");
            });
        }
    }, {
        key: "batchCreate",
        value: function batchCreate(e) {
            e.preventDefault();
            var id = $("#orgId").val();
            _http2.default.post("/api/sync/batchCreate?orgId=" + id, {}, function (x) {
                alert(x.message);
            });
        }
    }, {
        key: "syncNumber",
        value: function syncNumber(e) {
            e.preventDefault();
            _http2.default.post("/api/sync/FillEmployeeNumberToUserItem", {}, function (x) {
                alert(x.message);
            });
        }
    }, {
        key: "SendAdOrgs",
        value: function SendAdOrgs(e) {
            e.preventDefault();
            _http2.default.post("/api/sync/SendAdOrgs", {}, function (x) {
                alert(x.message);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "button",
                    { onClick: this.syncNumber },
                    "\u8865\u5145\u6CE8\u518C\u5458\u5DE5\u7F16\u53F7\uFF0C\u4EE5\u53CA\u5934\u50CF"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.syncKingdee },
                    "Kingdee\u804C\u5458\u540C\u6B65"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.syncOrg },
                    "\u540C\u6B65\u7EC4\u7EC7\u7ED3\u6784\u4FE1\u606F"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.syncToActor },
                    "\u6CE8\u518C\u7528\u6237\u4FE1\u606F\u540C\u6B65\u5230\u804C\u5458\u4E2D"
                ),
                _react2.default.createElement("input", { type: "text", id: "orgId" }),
                _react2.default.createElement(
                    "button",
                    { onClick: this.batchCreate },
                    "\u66F4\u5177\u7EC4\u7EC7\u673A\u6784\u521B\u5EFA\u7528\u6237"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.SendAdOrgs },
                    "\u7ED9AD\u53D1\u9001\u6240\u6709\u7EC4\u7EC7\u7ED3\u6784"
                )
            );
        }
    }]);

    return SyncContainer;
}(_react.Component);

exports.default = SyncContainer;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

var _confirm = __webpack_require__(7);

var _confirm2 = _interopRequireDefault(_confirm);

var _AddUpdateModal = __webpack_require__(130);

var _AddUpdateModal2 = _interopRequireDefault(_AddUpdateModal);

var _GroupMembersModal = __webpack_require__(131);

var _GroupMembersModal2 = _interopRequireDefault(_GroupMembersModal);

var _addMembersModal = __webpack_require__(132);

var _addMembersModal2 = _interopRequireDefault(_addMembersModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//导入对话框组件


var ContactGroupTable = function (_Component) {
    _inherits(ContactGroupTable, _Component);

    function ContactGroupTable() {
        _classCallCheck(this, ContactGroupTable);

        var _this = _possibleConstructorReturn(this, (ContactGroupTable.__proto__ || Object.getPrototypeOf(ContactGroupTable)).call(this));

        _this.state = {
            loading: false,
            widths: ["5%", "20%", "20%", "25%", "25%"],
            selected: null,
            datas: null
        };
        return _this;
    }

    //生命周期,完成之后


    _createClass(ContactGroupTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            var self = this;
            _axios2.default.post("/api/contactgroup/GetGroups", null).then(function (res) {
                console.log(res);
                if (res.data.success) {
                    self.setState({ datas: res.data.data });
                } else {
                    self.setState({ datas: [] });
                }
            });
        }
    }, {
        key: "handleAddClick",
        value: function handleAddClick() {
            this.setState({ selected: null });
            $(".addupdatecontactgroupmodal").modal("show");
        }
    }, {
        key: "handleRemoveClick",
        value: function handleRemoveClick(id) {
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            var self = this;
            (0, _confirm2.default)(function (_) {
                _axios2.default.post("/api/contactgroup/DeleteGroup" + "?groupId=" + id, null).then(function (res) {
                    if (res.data.success) {
                        alert("移除成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
            }, "确定要移除该联系人组?");
        }
    }, {
        key: "handleRenameClick",
        value: function handleRenameClick(entity) {
            this.setState({ selected: entity });
            $(".addupdatecontactgroupmodal").modal("show");
        }
    }, {
        key: "hanleLookMembers",
        value: function hanleLookMembers(entity) {
            this.setState({ selected: entity });
            $(".groupMembersmodal").modal("show");
        }
    }, {
        key: "handleAddMemberClick",
        value: function handleAddMemberClick(entity) {
            this.setState({ selected: entity });
            $(".addMembersModal").modal("show");
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this2 = this;

            if (!this.state.datas) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "4", style: { "textAlign": "center" } },
                        "\u6B63\u5728\u52A0\u8F7D\u6570\u636E..."
                    )
                );
            }
            if (this.state.datas.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "4", style: { "textAlign": "center" } },
                        "\u6682\u65E0\u6570\u636E..."
                    )
                );
            }
            return this.state.datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        u.id
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.remark
                    ),
                    _react2.default.createElement(
                        "td",
                        { onClick: _this2.hanleLookMembers.bind(_this2, u) },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)" },
                            u.contactGroupMembers.length,
                            "(\u70B9\u51FB\u67E5\u770B\u4EBA\u5458\u8BE6\u60C5)"
                        )
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: _this2.handleRemoveClick.bind(_this2, u.id) },
                            "\u5220\u9664\u7EC4"
                        ),
                        "\xA0\xA0",
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: _this2.handleRenameClick.bind(_this2, u) },
                            "\u91CD\u547D\u540D\u7EC4"
                        ),
                        "\xA0\xA0",
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: _this2.handleAddMemberClick.bind(_this2, u) },
                            "\u6DFB\u52A0\u6210\u5458"
                        ),
                        "\xA0\xA0",
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: _this2.hanleLookMembers.bind(_this2, u) },
                            "\u5220\u9664\u6210\u5458"
                        )
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "col-md-12 col-sm-12 col-xs-12" },
                _react2.default.createElement(
                    "div",
                    { className: "x_panel" },
                    _react2.default.createElement(
                        "div",
                        { className: "x_title" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "\u8054\u7CFB\u4EBA\u7EC4\u7BA1\u7406 ",
                            _react2.default.createElement(
                                "small",
                                null,
                                "\u8054\u7CFB\u4EBA\u7EC4\u7BA1\u7406\u5217\u8868"
                            ),
                            "\xA0\xA0\xA0\xA0",
                            _react2.default.createElement(
                                "a",
                                { style: { marginBottom: -7 }, className: "btn btn-primary", onClick: this.handleAddClick.bind(this), href: "javascript:void(0)" },
                                "\u6DFB\u52A0\u65B0\u8054\u7CFB\u4EBA\u7EC4"
                            )
                        ),
                        _react2.default.createElement(
                            "ul",
                            { className: "nav navbar-right panel_toolbox" },
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "collapse-link" },
                                    _react2.default.createElement("i", { className: "fa fa-chevron-up" })
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                { className: "dropdown" },
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-expanded": "false" },
                                    _react2.default.createElement("i", { className: "fa fa-wrench" })
                                ),
                                _react2.default.createElement(
                                    "ul",
                                    { className: "dropdown-menu", role: "menu" },
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 1"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "li",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { href: "#" },
                                            "Settings 2"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { className: "close-link" },
                                    _react2.default.createElement("i", { className: "fa fa-close" })
                                )
                            )
                        ),
                        _react2.default.createElement("div", { className: "clearfix" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "x_content" },
                        _react2.default.createElement(
                            "table",
                            { className: "table table-hover", style: { tableLayout: "fixed" } },
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[0] },
                                        "Id"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[1] },
                                        "\u8054\u7CFB\u4EBA\u7EC4\u540D\u79F0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[2] },
                                        "\u8054\u7CFB\u4EBA\u7EC4\u6807\u8BB0"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[3] },
                                        "\u8054\u7CFB\u4EBA\u7EC4\u4EBA\u6570"
                                    ),
                                    _react2.default.createElement(
                                        "th",
                                        { width: this.state.widths[4] },
                                        "\u64CD\u4F5C"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "tbody",
                                null,
                                this.renderData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(_AddUpdateModal2.default, { data: this.state.selected }),
                _react2.default.createElement(_GroupMembersModal2.default, { groupId: this.state.selected === null ? 0 : this.state.selected.id }),
                _react2.default.createElement(_addMembersModal2.default, { groupId: this.state.selected === null ? 0 : this.state.selected.id })
            );
        }
    }]);

    return ContactGroupTable;
}(_react.Component);

exports.default = ContactGroupTable;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(22);
var Axios = __webpack_require__(104);
var defaults = __webpack_require__(15);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(32);
axios.CancelToken = __webpack_require__(128);
axios.isCancel = __webpack_require__(31);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(129);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(15);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(123);
var dispatchRequest = __webpack_require__(124);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(25);
var parseHeaders = __webpack_require__(107);
var isURLSameOrigin = __webpack_require__(108);
var createError = __webpack_require__(16);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(109);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(110);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(25);
var http = __webpack_require__(26);
var https = __webpack_require__(27);
var httpFollow = __webpack_require__(28).http;
var httpsFollow = __webpack_require__(28).https;
var url = __webpack_require__(29);
var zlib = __webpack_require__(121);
var pkg = __webpack_require__(122);
var createError = __webpack_require__(16);
var enhanceError = __webpack_require__(24);

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = new Buffer(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = new Buffer(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttps ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(115);
} else {
  module.exports = __webpack_require__(117);
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(30);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(118);
var util = __webpack_require__(119);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(30);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(120);
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = {"_from":"axios","_id":"axios@0.18.0","_inBundle":false,"_integrity":"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=","_location":"/axios","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"axios","name":"axios","escapedName":"axios","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"http://registry.npmjs.org/axios/-/axios-0.18.0.tgz","_shasum":"32d53e4851efdc0a11993b6cd000789d70c05102","_spec":"axios","_where":"C:\\Code\\WorkCode\\SsoSfApp2\\src\\ManageConsoleWeb","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.5.7","coveralls":"^2.11.9","es6-promise":"^4.0.5","grunt":"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","sinon":"^1.17.4","typescript":"^2.0.3","url-search-params":"^0.6.1","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","version":"0.18.0"}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(125);
var isCancel = __webpack_require__(31);
var defaults = __webpack_require__(15);
var isAbsoluteURL = __webpack_require__(126);
var combineURLs = __webpack_require__(127);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(32);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUpdateModal = function (_Component) {
    _inherits(AddUpdateModal, _Component);

    function AddUpdateModal(props) {
        _classCallCheck(this, AddUpdateModal);

        var _this = _possibleConstructorReturn(this, (AddUpdateModal.__proto__ || Object.getPrototypeOf(AddUpdateModal)).call(this, props));

        var data = _this.props.data;
        if (data) {
            _this.state = {
                groupId: data.id,
                name: data.name,
                remark: data.remark
            };
        } else {
            _this.state = {
                groupId: 0,
                name: "",
                remark: ""
            };
        }

        return _this;
    }

    _createClass(AddUpdateModal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var data = props.data;
            if (data === undefined || data === null) {
                this.setState({ name: "", remark: "", groupId: 0 });
            } else {
                this.setState({ name: data.name, remark: data.remark, groupId: data.id });
            }
        }
    }, {
        key: "changeFormValue",
        value: function changeFormValue(key, e) {
            this.setState(_defineProperty({}, key, e.target.value));
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            $(".addupdatecontactgroupmodal").modal("hide");
        }
    }, {
        key: "hanldeSubmit",
        value: function hanldeSubmit(e) {
            //0表示新增
            e.preventDefault();
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            console.log(this.state.groupId);
            if (this.state.groupId === 0) {
                _axios2.default.post("/api/contactgroup/AddGroup", this.state).then(function (res) {
                    if (res.data.success) {
                        alert("添加成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
            } else {
                _axios2.default.post("/api/contactgroup/UpdateGroup", this.state).then(function (res) {
                    if (res.data.success) {
                        alert("重命名成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade addupdatecontactgroupmodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                this.props.data === null ? "添加" : "更新",
                                "\u8054\u7CFB\u4EBA\u7EC4"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement("input", { type: "hidden", value: this.state.groupId }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8054\u7CFB\u4EBA\u7EC4\u540D\u79F0\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", value: this.state.name, onChange: this.changeFormValue.bind(this, "name"), className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "label",
                                        { className: "control-label col-md-3 col-sm-3 col-xs-12" },
                                        "\u8054\u7CFB\u4EBA\u7EC4\u5907\u6CE8\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-9 col-sm-9 col-xs-12" },
                                        _react2.default.createElement("input", { type: "text", value: this.state.remark, onChange: this.changeFormValue.bind(this, "remark"), className: "form-control col-md-7 col-xs-12" })
                                    )
                                ),
                                _react2.default.createElement("div", { className: "ln_solid" }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal.bind(this) },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.hanldeSubmit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AddUpdateModal;
}(_react.Component);

exports.default = AddUpdateModal;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupMembersModal = function (_Component) {
    _inherits(GroupMembersModal, _Component);

    function GroupMembersModal(props) {
        _classCallCheck(this, GroupMembersModal);

        var _this = _possibleConstructorReturn(this, (GroupMembersModal.__proto__ || Object.getPrototypeOf(GroupMembersModal)).call(this, props));

        _this.state = {
            groupId: props.groupId,
            datas: null,
            widths: ["4%", "10%", "10%", "20%", "20%", "25%", "11%"]
        };
        return _this;
    }

    _createClass(GroupMembersModal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var groupId = props.groupId;
            this.setState({ groupId: groupId });
            var self = this;
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            _axios2.default.post("/api/contactgroupmember/GetGroupmembers?groupId=" + groupId, {}).then(function (res) {
                if (res.data.success) {
                    self.setState({ datas: res.data.data });
                }
            });
        }
    }, {
        key: "handleRemoveMember",
        value: function handleRemoveMember(entity) {
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            var self = this;
            _axios2.default.post("/api/contactgroupmember/deleteMembers", { groupId: self.state.groupId, memberIds: [entity.id] }).then(function (res) {
                if (res.data.success) {
                    alert("移除成功!");
                    var newDatas = self.state.datas.filter(function (u) {
                        return u.empId !== entity.empId;
                    });
                    self.setState({ datas: newDatas });
                    window.location.reload();
                }
            });
        }
    }, {
        key: "renderData",
        value: function renderData() {
            var _this2 = this;

            if (this.state.datas === null) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        "\u6B63\u5728\u52A0\u8F7D\u6570\u636E..."
                    )
                );
            }
            if (this.state.datas.length === 0) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        { colSpan: "6", style: { "textAlign": "center" } },
                        "\u6682\u65E0\u6570\u636E..."
                    )
                );
            }
            return this.state.datas.map(function (u) {
                return _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                        "td",
                        null,
                        u.id
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.name
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.gender
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.phone
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.position
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        u.department
                    ),
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: _this2.handleRemoveMember.bind(_this2, u) },
                            "\u79FB\u9664\u6210\u5458"
                        )
                    )
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade groupMembersmodal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                "\u8054\u7CFB\u4EBA\u7EC4\u4EBA\u5458"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body", style: { overflow: "scroll", height: 600 } },
                            _react2.default.createElement(
                                "table",
                                { className: "table table-hover" },
                                _react2.default.createElement(
                                    "thead",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[0] },
                                            "Id"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[1] },
                                            "\u59D3\u540D"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[2] },
                                            "\u6027\u522B"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[3] },
                                            "\u624B\u673A/\u7535\u8BDD"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[4] },
                                            "\u804C\u4F4D"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[5] },
                                            "\u90E8\u95E8"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { width: this.state.widths[6] },
                                            "\u64CD\u4F5C"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    this.renderData()
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return GroupMembersModal;
}(_react.Component);

exports.default = GroupMembersModal;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var readSerach = false;

var AddMembersModal = function (_Component) {
    _inherits(AddMembersModal, _Component);

    function AddMembersModal(props) {
        _classCallCheck(this, AddMembersModal);

        var _this = _possibleConstructorReturn(this, (AddMembersModal.__proto__ || Object.getPrototypeOf(AddMembersModal)).call(this, props));

        _this.state = {
            groupId: props.groupId,
            datas: []
        };
        return _this;
    }

    _createClass(AddMembersModal, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.initTree();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({ groupId: props.groupId });
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            $(".addMembersModal").modal("hide");
        }
    }, {
        key: "initTree",
        value: function initTree() {
            $('#jstree_demo_div').jstree({
                "core": {
                    "data": {
                        "url": "/api/orgtree/load",
                        "data": function data(node) {
                            return { "id": node.id };
                        }
                    }
                },
                "types": {
                    "default": {
                        "icon": "fa fa-user"
                    }
                },
                plugins: ["sort", "types", "checkbox", "themes", "html_data"],
                "checkbox": {
                    "keep_selected_style": false, //是否默认选中
                    "three_state": true, //父子级别级联选择
                    "tie_selection": false
                }
            });
        }
    }, {
        key: "handleSearchClick",
        value: function handleSearchClick(e) {
            e.preventDefault();
            var val = $("#q").val();
            if (val === null || val === "") {
                $("#search_result").hide();
                $('#jstree_demo_div').show();
                readSerach = false;
                return;
            }
            $("input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
            var self = this;
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            _axios2.default.post("/api/orgtree/search?keyword=" + val, null).then(function (res) {
                if (res.data.success) {
                    $('#jstree_demo_div').hide();
                    if (res.data.data.length === 0) {
                        alert("没有查询到数据!");
                    } else {
                        self.setState({ datas: res.data.data });
                        $("#search_result").show();
                        readSerach = true;
                        console.log(res);
                    }
                }
            });
        }
    }, {
        key: "handleSubit",
        value: function handleSubit(e) {
            e.preventDefault();
            var ids = [];
            var idss = [];
            if (!readSerach) {
                $('#jstree_demo_div').find(".jstree-checked").each(function () {
                    ids.push($(this).attr("id"));
                });
                if (ids.length === 0) {
                    alert("请选择要选择的人员");
                    return;
                }

                for (var i = 0; i < ids.length; i++) {
                    var item = ids[i];
                    var val = item.split("_")[0];
                    idss.push(val);
                }
                if (ids.length === 0) {
                    alert("请选择要选择的人员,并需要展开所选的节点！");
                    return;
                }
            } else {
                //获取checkbox中的值
                $("#search_result input[type='checkbox']:checked").each(function () {
                    idss.push($(this).val());
                });
            }
            _axios2.default.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
            var self = this;
            console.log(this);
            _axios2.default.post("/api/contactgroupmember/AddMembers", { groupId: self.state.groupId, MemberIds: idss }).then(function (res) {
                if (res.data.success) {
                    alert("添加成功");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            });
        }
    }, {
        key: "renderSearch",
        value: function renderSearch() {
            if (this.state.datas === null || this.state.datas.length === 0) return "";
            return _react2.default.createElement(
                "table",
                { className: "table table-hover", style: { tableLayout: "fixed" } },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("th", { width: "5%" }),
                        _react2.default.createElement(
                            "th",
                            { width: "10%" },
                            "\u59D3\u540D"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: "10%" },
                            "\u6027\u522B"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: "25%" },
                            "\u4E0A\u7EA7\u90E8\u95E8"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: "25%" },
                            "\u5F53\u524D\u90E8\u95E8"
                        ),
                        _react2.default.createElement(
                            "th",
                            { width: "25%" },
                            "\u5F53\u524D\u804C\u4F4D"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    this.state.datas.map(function (u) {
                        return _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement("input", { type: "checkbox", value: u.empId })
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                u.name
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                u.gender
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                u.parentDepartment
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                u.department
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                u.position
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal fade addMembersModal", role: "dialog", "aria-hidden": "true" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            _react2.default.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal" },
                                _react2.default.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            ),
                            _react2.default.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                this.props.data === null ? "添加" : "更新",
                                "\u8054\u7CFB\u4EBA\u7EC4"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            _react2.default.createElement(
                                "div",
                                { className: "form" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    _react2.default.createElement(
                                        "label",
                                        { "for": "name", className: "col-sm-2 control-label" },
                                        "\u8054\u7CFB\u4EBA\u59D3\u540D\uFF1A"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-sm-5" },
                                        _react2.default.createElement("input", { type: "text", id: "q", className: "form-control PhoneNo", name: "mp-PhoneNo", placeholder: "\u8054\u7CFB\u4EBA" })
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-sm-2" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", onClick: this.handleSearchClick.bind(this) },
                                            "\u641C\u7D22"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "form",
                                { id: "demo-form2", "data-parsley-validate": "", className: "form-horizontal form-label-left" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group", style: { overflow: "scroll", height: 600 } },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-12 col-sm-12 col-xs-12" },
                                        _react2.default.createElement("div", { id: "jstree_demo_div" }),
                                        _react2.default.createElement(
                                            "div",
                                            { id: "search_result" },
                                            this.renderSearch()
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "form-group" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6 col-sm-6 col-xs-12 col-md-offset-3" },
                                        _react2.default.createElement(
                                            "button",
                                            { className: "btn btn-primary", type: "button", onClick: this.closeModal.bind(this) },
                                            "\u53D6\u6D88"
                                        ),
                                        _react2.default.createElement(
                                            "button",
                                            { type: "submit", className: "btn btn-success", onClick: this.handleSubit.bind(this) },
                                            "\u63D0\u4EA4"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AddMembersModal;
}(_react.Component);

exports.default = AddMembersModal;

/***/ })
/******/ ])));