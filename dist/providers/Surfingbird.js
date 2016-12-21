'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Surfingbird (https://surfingbird.ru) provider.
 */

var Surfingbird = function () {
  function Surfingbird() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.head.querySelector('meta[name=description]').content;

    _classCallCheck(this, Surfingbird);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = encodeURIComponent(description);
  }

  _createClass(Surfingbird, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://surfingbird.ru/share?url=' + this.url + '&title=' + this.title + '&description=' + this.description;

      document.body.querySelectorAll('[data-social=surfingbird]').forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var script = document.createElement('script');
      var callback = ('cb_' + Math.random()).replace('.', '');
      var count_url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="https://surfingbird.ru/button?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;

      window[callback] = function (counter) {
        document.body.querySelectorAll('[data-counter=surfingbird]').forEach(function (item) {
          item.innerHTML = counter.results.length > 0 ? counter.results[0].match(/span class="stats-num">(\d+)</)[1] / 1 : 0;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return Surfingbird;
}();

var surfingbird_share = exports.surfingbird_share = new Surfingbird().shareWindow();
var surfingbird_counter = exports.surfingbird_counter = new Surfingbird().getCounter();