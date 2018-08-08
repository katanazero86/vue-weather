# vue-weather-app

- Vue 날씨 웹 앱
- IDE : WebStorm 사용
- node.js : 8.9.3
- npm : 6.2.0
- vue-cli : 2.9.6

1. https://bitbucket.org/phpbae/vue-weather-app/src/master/
2. git clone https://phpbae@bitbucket.org/phpbae/vue-weather-app.git
3. 프로젝트 구성 vue-cli 를 이용하여, 제공해주는 템플릿을 이용(webpack) - vue init webpack vue-weather-app
```
vue list

 ★  browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
 ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
 ★  pwa - PWA template for vue-cli based on the webpack template
 ★  simple - The simplest possible Vue setup in a single HTML file
 ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
 ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.
```

## 날씨 API 이용하기
1. https://openweathermap.org/  -> 이 사이트 가입해서, API Key 발급받아야함
2. 가입 후, 상위 메뉴 API 클릭 후, Current weather data -> 구독 버튼 클릭
3. Free 에서 "Get API Key and Start" 버튼 클릭
4. Sign up 클릭
5. 결과

![api result](./img/api.PNG)

```
api call

api.openweathermap.org/data/2.5/weather?q={city name},{country code}
예) api.openweathermap.org/data/2.5/weather?q=London,uk

Incheon, KR

Current weather data
참고 : https://openweathermap.org/current

How to use API key in API call
Description:
To get access to weather API you need an API key whatever account you chose from Free to Enterprise.

Activation of an API key for Free and Startup plans takes 10 minutes. For other tariff plans it is 10 to 60 minutes.

We keep right to not to process API requests without API key.

API call:
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Parameters:
APPID {APIKEY} is your unique API key 
Example of API call:
api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111 


My endpoint
http://api.openweathermap.org/data/2.5/weather?q=Incheon,kr&appid=

```

## axios 설치

- Vue는 화면에 대한 책임만 있기 때문에, HTTP 통신을 대신 해주는 axios를 사용해야함. 
- vue-resource 도 있지만, 왜 사용안할까? 에번 유가 공식적으로 추천하지 않는 프로젝트 + 업데이트가 되지 않고 있음.
- npm i --save axios
- main.js 를 열어 axios를 추가하고  vue 전역으로 사용할 수 있도록 해주자

## vuex 설치

- Vue 상태 관리를 위해 설치.
- npm i --save vuex
- store.js 파일 작성
- vuex 를 사용가능하게 등록해주자.

```
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.use(axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App },
  template: '<App/>'
})
```

---

## vue-weather-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
