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
 *  Buffer (https://buffer.com) provider.
 */

var Buffer = function () {
  function Buffer() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

    _classCallCheck(this, Buffer);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }

  _createClass(Buffer, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://buffer.com/add?url=' + this.url + '&text=' + this.title;

      document.body.querySelectorAll('[data-social=buffer]').forEach(function (item) {
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
      var count_url = 'https://api.bufferapp.com/1/links/shares.json?url=' + this.url + '&callback=' + callback;

      window[callback] = function (counter) {
        document.body.querySelectorAll('[data-counter=buffer]').forEach(function (item) {
          item.innerHTML = counter.shares ? counter.shares : 0;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return Buffer;
}();

var buffer_share = exports.buffer_share = new Buffer().shareWindow();
var buffer_counter = exports.buffer_counter = new Buffer().getCounter();