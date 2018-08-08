import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titleString: 'Home',
    apiId: '9292233a78e0ccd650151d87f51f5133'
  },
  getters: {
    getTitle: function (state) {
      return state.titleString + ' (Made by phpbae)'
    },
    getApiId: function (state) {
      return state.apiId
    }
  }
})
