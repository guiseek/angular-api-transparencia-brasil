angular
  .module('app', ['ngAPITransparenciaBrasil'])
  .controller('AppController', ['$scope', 'APITransparenciaBrasilFactory', function ($scope, APITransparenciaBrasilFactory) {
    APITransparenciaBrasilFactory.init({
      token: 'vRdqRoxdGSUk'
    })
    $scope.busca = {}
    $scope.loading = {}
    $scope.getEstados = function () {
      $scope.loading.estados = true
      APITransparenciaBrasilFactory.getEstados(function (response) {
        $scope.loading.estados = false
        $scope.estados = response.data
      })
    }
    $scope.getPartidos = function () {
      $scope.loading.partidos = true
      APITransparenciaBrasilFactory.getPartidos(function (response) {
        $scope.loading.partidos = false
        $scope.partidos = response.data
      })
    }
    $scope.getCargos = function () {
      $scope.loading.cargos = true
      APITransparenciaBrasilFactory.getCargos(function (response) {
        $scope.loading.cargos = false
        $scope.cargos = response.data
      })
    }
    $scope.getEstados()
    $scope.getPartidos()
    $scope.getCargos()
    $scope.getCandidatos = function (params) {
      $scope.loading = {}
      $scope.loading.candidatos = true
      $scope.candidatos = []
      $scope.candidato = {}
      var params = angular.copy(params) || {}
      APITransparenciaBrasilFactory.getCandidatos(params, function (response) {
        $scope.loading.candidatos = false
        $scope.candidatos = response.data
      })
    }
    $scope.getBens = function (id) {
      $scope.loading.bens = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/bens', function (response) {
        $scope.loading.bens = false
        $scope.candidato.bens = response.data
      })
    }
    $scope.getDoadores = function (id) {
      $scope.loading.doadores = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/doadores', function (response) {
        $scope.loading.doadores = false
        $scope.candidato.doadores = response.data
      })
    }
    $scope.getEstatisticas = function (id) {
      $scope.loading.estatisticas = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/estatisticas', function (response) {
        $scope.loading.estatisticas = false
        $scope.candidato.estatisticas = response.data
      })
    }
    $scope.getCandidaturas = function (id) {
      $scope.loading.candidaturas = true
      $scope.candidato = {}
      APITransparenciaBrasilFactory.getCandidato(id, '/candidaturas', function (response) {
        $scope.loading.candidaturas = false
        $scope.candidato.candidaturas = response.data
      })
    }
    $scope.nav = {}
    $scope.changeEstado = function (item) {
      $scope.nav.estado = item
      $scope.busca.estado = item.sigla
    }
    $scope.changePartido = function (item) {
      $scope.nav.partido = item
      $scope.busca.partido = item.partidoId
    }
    $scope.changeCargo = function (item) {
      $scope.nav.cargo = item
      $scope.busca.cargo = item.cargoId
    }
  }])