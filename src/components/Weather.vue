<template>
  <div style="padding: 10px; background: linear-gradient(141deg, #303030 0%, #373a5b 51%, #424aa3 75%);">
    <v-layout my-3>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0 text-xs-center">{{msg}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media height="180px">
            <custom-icon v-bind:name="iconName" base-class="custom-icon"></custom-icon>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Weather in Incheon, KR</h3>
              <div>
                <p>갱신 시간 : {{currentWeatherInfo.dt}}</p>
                <p>현재 날씨 : {{currentWeatherInfo.weather[0].main}}</p>
                <p>현재 기온 : {{currentWeatherInfo.main.temp}}</p>
                <p>최저 기온 : {{currentWeatherInfo.main.temp_min}} / 최고 기온 : {{currentWeatherInfo.main.temp_max}}</p>
                <p>기압 : {{currentWeatherInfo.main.pressure}} hpa</p>
                <p>습도 : {{currentWeatherInfo.main.humidity}} %</p>
                <p>풍속 : {{currentWeatherInfo.wind.speed}} m/s</p>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat icon color="pink" @click="getWeatherInfoAxios">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import customIcon from 'vue-icon/lib/vue-feather.esm'

export default {
  name: 'Weather',
  components: {
    customIcon
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js Weather App',
      currentWeatherInfo: {
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
      },
      iconName: 'alert-octagon'
    }
  },
  mounted: function () {
    console.log('axios get Current Weather')
    this.getWeatherInfoAxios()
  },
  methods: {
    getWeatherInfoAxios: function () {
      const endPoint = 'http://api.openweathermap.org/data/2.5/weather'

      axios({
        url: endPoint,
        method: 'get',
        params: {
          q: 'Incheon,kr',
          appid: this.$store.getters.getApiId
        }
      }).then((response) => {
        console.log(response.data)
        this.$store.commit('updateCurrentWeather', response.data)
        this.currentWeatherInfo = this.$store.getters.getCurrentWeather

        // 기온 단위 변환(현재, 최저, 최고)
        this.currentWeatherInfo.main.temp = (this.$store.getters.getCurrentWeather.main.temp - 273.15).toFixed()
        this.currentWeatherInfo.main.temp_min = (this.$store.getters.getCurrentWeather.main.temp_min - 273.15).toFixed()
        this.currentWeatherInfo.main.temp_max = (this.$store.getters.getCurrentWeather.main.temp_max - 273.15).toFixed()

        // dt 시간 변환
        let date = new Date(this.$store.getters.getCurrentWeather.dt * 1000)
        this.currentWeatherInfo.dt = date.toLocaleString()

        // 현재 날씨 icon
        this.getIcon(this.$store.getters.getCurrentWeather.weather[0].main)
      }).catch((ex) => {
        console.log(ex)
      })
    },
    getIcon: function (weatherName) {
      console.log(weatherName)

      switch (weatherName) {
        case 'Thunderstorm' :
          this.iconName = 'cloud-lightning'
          break
        case 'Drizzle' :
          this.iconName = 'cloud-drizzle'
          break
        case 'Rain':
          this.iconName = 'cloud-rain'
          break
        case 'Snow':
          this.iconName = 'cloud-snow'
          break
        case 'Mist':
          this.iconName = 'align-center'
          break
        case 'Clear':
          this.iconName = 'cloud-off'
          break
        case 'Clouds':
          this.iconName = 'cloud'
          break
        default:
          this.iconName = 'alert-octagon'
      }
    }
  }
}
</script>

<style scoped>
  .v-icon, .custom-icon {
    width: 100%;
    text-align: center;
  }
</style>
