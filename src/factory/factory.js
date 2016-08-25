class APITransparenciaBrasilFactory {
  constructor($http, $q) {
    this.hostname = 'http://api.transparencia.org.br/api/'
    this.resource = null
    this.options = {
      version: 'v1/',
      token: null
      // token: 'vRdqRoxdGSUk'
    }
    let options = ['version','token']
    options.map(name => {
      this[name] = angular.bind(this, this.getSetOption, name)
    })
    this.$http = $http
    this.$q = $q
    this.config = {
      headers: {'App-Token': this.options.token},
      params: null
    }
  }
  getSetOption(name, val) {
    if (val === void 0) {
      return this.options[name]
    }
    this.options[name] = val
    return this
  }
  handleResponse(response) {
    if (!response || response.error) {
      this.reject(response && response.error || false)
    } else {
      this.resolve(response)
    }
  }
  addCallbackToPromise(deferred, callback) {
    let promise = deferred
    if (typeof callback === 'function') {
      promise.then(callback)
    }
    return promise
  }
  init(options) {
    this.options = angular.extend(this.options, options)
    console.log(this.options)
    if (!options.token) {
      throw new Error('APITransparenciaBrasilFactory: token não informado')
    }
    return this.options
  }
  api(params, callback) {
    this.config.headers['App-Token'] = this.options.token
    this.config.params = params
    let deferred = this.$http.get(
      this.hostname + 
      this.options.version + 
      this.resource,
      this.config
    )
    return this.addCallbackToPromise(deferred, callback)
  }
  getPartidos(callback) {
    this.resource = 'partidos'
    this.api({}, callback)
  }
  getCandidatos(params, callback) {
    this.resource = 'candidatos'
    this.api(params, callback)
  }
  static factory($http, $q) {
    return new APITransparenciaBrasilFactory($http, $q)
  }
}

APITransparenciaBrasilFactory.factory.$inject = ['$http', '$q']

export default APITransparenciaBrasilFactory