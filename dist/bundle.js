(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APITransparenciaBrasilFactory = function () {
  function APITransparenciaBrasilFactory($http) {
    var _this = this;

    _classCallCheck(this, APITransparenciaBrasilFactory);

    this.hostname = 'http://api.transparencia.org.br/api/';
    this.resource = null;
    this.empty = {};
    this.options = {
      version: 'v1/',
      token: null
      // token: 'vRdqRoxdGSUk'
    };
    var options = ['version', 'token'];
    options.map(function (name) {
      _this[name] = angular.bind(_this, _this.getSetOption, name);
    });
    this.$http = $http;
    this.config = {
      headers: { 'App-Token': this.options.token },
      params: null
    };
  }

  _createClass(APITransparenciaBrasilFactory, [{
    key: 'getSetOption',
    value: function getSetOption(name, val) {
      if (val === void 0) {
        return this.options[name];
      }
      this.options[name] = val;
      return this;
    }
  }, {
    key: 'addCallbackToPromise',
    value: function addCallbackToPromise(deferred, callback) {
      var promise = deferred;
      if (typeof callback === 'function') {
        promise.then(callback);
      }
      return promise;
    }
  }, {
    key: 'init',
    value: function init(options) {
      this.options = angular.extend(this.options, options);
      if (!options.token) {
        throw new Error('APITransparenciaBrasilFactory: token não informado');
      }
      return this.options;
    }
  }, {
    key: 'api',
    value: function api(params, callback) {
      this.config.headers['App-Token'] = this.options.token;
      this.config.params = params;
      var deferred = this.$http.get(this.hostname + this.options.version + this.resource, this.config);
      return this.addCallbackToPromise(deferred, callback);
    }
  }, {
    key: 'getEstados',
    value: function getEstados(callback) {
      this.resource = 'estados';
      this.api(this.empty, callback);
    }
  }, {
    key: 'getPartidos',
    value: function getPartidos(callback) {
      this.resource = 'partidos';
      this.api(this.empty, callback);
    }
  }, {
    key: 'getCargos',
    value: function getCargos(callback) {
      this.resource = 'cargos';
      this.api(this.empty, callback);
    }
  }, {
    key: 'getCandidatos',
    value: function getCandidatos(params, callback) {
      this.resource = 'candidatos';
      this.api(params, callback);
    }
  }, {
    key: 'getCandidato',
    value: function getCandidato(id, route, callback) {
      route = route || null;
      this.resource = 'candidatos/' + id + route;
      this.api(this.empty, callback);
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new APITransparenciaBrasilFactory($http);
    }
  }]);

  return APITransparenciaBrasilFactory;
}();

APITransparenciaBrasilFactory.factory.$inject = ['$http'];

exports.default = APITransparenciaBrasilFactory;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _factory = require('./factory/factory.js');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ngAPITransparenciaBrasil', []).factory('APITransparenciaBrasilFactory', _factory2.default.factory);

},{"./factory/factory.js":1}]},{},[2]);
