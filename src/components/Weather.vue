<template>
  <div style="padding: 10px; background: linear-gradient(141deg, #303030 0%, #373a5b 51%, #424aa3 75%); height: 100%">
    <v-layout my-3 row warp>
      <v-flex xs10 offset-xs1>
        <v-card dark color="primary">
          <v-card-text class="px-0 text-xs-center">{{msg}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout my-3 row warp justify-center>
      <v-flex xs10>
        <v-select :items="cityList" label="도시 선택(City Select)" v-model="selectedCity"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs10>
        <v-card dark>
          <v-card-media height="180px">
            <custom-icon v-bind:name="iconName" base-class="custom-icon"></custom-icon>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Weather in {{selectedCity}}, KR</h3>
              <div>
                <p>갱신 시간 : {{updateTime}}</p>
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
            <v-card-actions>
              <v-btn flat round large :loading="loading" :disabled="loading" color="info" @click.native="loader='loading'">
                <v-icon>cached</v-icon> 선택된 도시 날씨 정보 새로고침
              </v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import weatherConst from './WEATHER_CONST'
import axios from 'axios'
import customIcon from 'vue-icon/lib/vue-feather.esm'

export default {
  name: 'Weather',
  components: {
    customIcon
  },
  data () {
    return {
      loader: null,
      loading: false,
      msg: 'Welcome to Your Vue.js Weather App',
      updateTime: '',
      selectedCity: 'Seoul',
      cityList: [],
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
  created: function () {
    this.cityList = weatherConst.cityList
  },
  mounted: function () {
    this.getWeatherInfoAxios()
  },
  methods: {
    getWeatherInfoAxios: function () {
      console.log('axios get Current Weather..')
      const endPoint = 'https://api.openweathermap.org/data/2.5/weather'

      axios({
        url: endPoint,
        method: 'get',
        params: {
          q: this.selectedCity + ',kr',
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

        this.updateTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

        // 현재 날씨 icon
        this.getIcon(this.$store.getters.getCurrentWeather.weather[0].main)
      }).catch((ex) => {
        console.log(ex)
        alert('날씨정보를 불러오는데, 실패하였습니다. 관리자에게 문의해주세요.')
      })
    },
    getIcon: function (weatherName) {
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
  },
  watch: {
    loader () {
      console.log(this.selectedCity)
      const l = this.loader // click 하면, 'loading' 문자열이 loader에 들어감(네이티브 바인딩)
      this[l] = !this[l] // this.loading = !this.loading  false 면 true로..
      setTimeout(() => { this[l] = false }, 950)

      if (this.loader != null) {
        this.getWeatherInfoAxios()
      }
      this.loader = null
    },
    selectedCity () {
      this.getWeatherInfoAxios()
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
