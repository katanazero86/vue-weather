import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titleString: 'Home',
    apiId: '9292233a78e0ccd650151d87f51f5133',
    currentWeather: {
      coord: {lon: '', lat: ''},
      weather: [{}],
      base: '',
      main: {temp: '', pressure: '', humidity: '', temp_min: '', temp_max: ''},
      visibility: '',
      wind: {speed: '', deg: ''},
      clouds: {all: 0},
      dt: '',
      sys: {type: '', id: '', message: '', country: '', sunrise: '', sunset: ''},
      id: '',
      name: '',
      cod: ''
    }
  },
  getters: {
    getTitle: function (state) {
      return state.titleString + ' (Made by phpbae)'
    },
    getApiId: function (state) {
      return state.apiId
    },
    getCurrentWeather: function (state) {
      return state.currentWeather
    }
  },
  mutations: {
    updateCurrentWeather: function (state, payload) {
      state.currentWeather = payload
    }
  }
})
