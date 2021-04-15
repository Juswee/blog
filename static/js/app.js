/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./#app/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./#app/assets/js/main.js":
/*!********************************!*\
  !*** ./#app/assets/js/main.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.onload = function () {\n  currentPage();\n  eventListener();\n  randomTagColor();\n  console.log(document.location.pathname);\n  if (document.location.pathname == '/') index();else if (document.location.pathname.includes('article')) article();\n};\n\nfunction index() {\n  console.log('index');\n  document.querySelector('.options__item[name=type]').value = 'text';\n}\n\nfunction article() {}\n\nfunction randomTagColor() {\n  var colors = ['black', 'grey', 'white', 'orange', 'blue', 'red', 'green', 'yellow', 'pink', 'purple'];\n  document.querySelectorAll('.tag__item').forEach(function (el) {\n    var color = Math.round(Math.random() * (colors.length - 1));\n    el.classList.add(\"li-\".concat(colors[color]));\n  });\n}\n\nfunction eventListener() {\n  var _this = this;\n\n  document.querySelectorAll('textarea').forEach(function (el) {\n    el.addEventListener('keyup', function () {\n      el.style.height = el.scrollHeight + 'px';\n    });\n  });\n  document.querySelector('.options__item[name=type]').addEventListener('change', function () {\n    var title = document.querySelector('.post-new__title');\n    var text = document.querySelector('.post-new__text');\n    var link = document.querySelector('.post-new__link');\n    var image = document.querySelector('.post-new__attachment');\n\n    if (this.value == 'text') {\n      image.hidden = true;\n      link.hidden = true;\n      title.hidden = true;\n      return text.hidden = false;\n    }\n\n    if (this.value == 'article') {\n      image.hidden = false;\n      link.hidden = true;\n      title.hidden = false;\n      return text.hidden = false;\n    }\n\n    if (this.value == 'video') {\n      image.hidden = false;\n      link.hidden = false;\n      title.hidden = false;\n      return text.hidden = true;\n    }\n  });\n  document.querySelector('.header__menu').addEventListener('click', function () {\n    this.classList.toggle('active');\n    document.querySelector('.sidebar').classList.toggle('active');\n  });\n  document.querySelectorAll('.search').forEach(function (el) {\n    el.addEventListener('keypress', function (e) {\n      if (_this.keyCode == 13) {\n        document.location.pathname = \"/filter/\".concat(el.value);\n      }\n    });\n  });\n}\n\nfunction currentPage() {\n  var page = window.location.pathname;\n  document.querySelectorAll(\".nav__link[href=\\\"\".concat(page, \"\\\"]\")).forEach(function (el) {\n    el.classList.add('active');\n  });\n}\n\n//# sourceURL=webpack:///./#app/assets/js/main.js?");

/***/ })

/******/ });