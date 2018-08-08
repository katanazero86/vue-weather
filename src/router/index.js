import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'
import Intro from '@/components/Intro'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    }
  ]
})
