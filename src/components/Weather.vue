<template>
  <div>
    <p>{{msg}}</p>
    <p>
      {{weatherInfo.base}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      weatherInfo: {}
    }
  },
  mounted: function () {
    console.log('axios get Current Weather')
    this.weatherInfo = this.getWeatherInfo()
  },
  methods: {
    getWeatherInfo: function () {
      // this.$http
      //   .get('http://api.openweathermap.org/data/2.5/weather?q=Incheon,kr&appid=' + this.$store.getters.getApiId)
      //   .then(function (response) {
      //     console.log(response)
      //   }).catch(function (ex) {
      //     console.log(ex)
      //   })

      let responseData = {}

      this.$http({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        method: 'get',
        params: {
          q: 'Incheon,kr',
          appid: this.$store.getters.getApiId
        }
      }).then(function (response) {
        console.log(response)
        console.log(response.data)
        responseData = response.data
      }).catch(function (ex) {
        console.log(ex)
      })

      return responseData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
