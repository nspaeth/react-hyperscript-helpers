'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hh = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tagNames = require('./tag-names.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = function isArray(x) {
  return Array.isArray(x);
};
var isString = function isString(x) {
  return typeof x === 'string' && x.length > 0;
};
var isSelector = function isSelector(x) {
  return isString(x) && (startsWith(x, '.') || startsWith(x, '#'));
};
var isChildren = function isChildren(x) {
  return (/string|number|boolean/.test(typeof x === 'undefined' ? 'undefined' : _typeof(x)) || isArray(x)
  );
};
var startsWith = function startsWith(string, start) {
  return string.indexOf(start) === 0;
};
var split = function split(string, separator) {
  return string.split(separator);
};
var subString = function subString(string, start, end) {
  return string.substring(start, end);
};

var parseSelector = function parseSelector(selector) {
  var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
  var parts = split(selector, classIdSplit);

  return parts.reduce(function (acc, part) {

    if (startsWith(part, '#')) {
      acc.id = subString(part, 1);
    } else if (startsWith(part, '.')) {
      acc.className = (acc.className + ' ' + subString(part, 1)).trim();
    }

    return acc;
  }, { className: '' });
};

var createElement = function createElement(nameOrType) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var args = [nameOrType, props];

  if (!isArray(children)) {
    args.push(children);
  } else {
    args.push.apply(args, _toConsumableArray(children));
  }

  return _react2.default.createElement.apply(_react2.default, args);
};

var hh = exports.hh = function hh(nameOrType) {
  return function (first, second, third) {

    if (isSelector(first)) {
      var selector = parseSelector(first);

      // selector, children
      if (isChildren(second)) {
        return createElement(nameOrType, selector, second);
      }

      // selector, props, children

      var _ref = second || {},
          _ref$className = _ref.className,
          className = _ref$className === undefined ? '' : _ref$className;

      className = (selector.className + ' ' + className + ' ').trim();
      var props = _extends({}, second, selector, { className: className });

      if (isChildren(third)) {
        return createElement(nameOrType, props, third);
      }

      return createElement(nameOrType, props);
    }

    // children
    if (isChildren(first)) {
      return createElement(nameOrType, {}, first);
    }

    // props, children
    if (isChildren(second)) {
      return createElement(nameOrType, first, second);
    }

    return createElement(nameOrType, first);
  };
};

var h = function h(nameOrType) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return hh(nameOrType).apply(undefined, rest);
};

module.exports = _tagNames.TAG_NAMES.reduce(function (exported, type) {
  exported[type] = hh(type);
  return exported;
}, { h: h, hh: hh });