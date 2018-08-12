<template>
  <div id="app">
    <v-app dark>
      <v-toolbar>
        <v-toolbar-title>{{getTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!--<v-btn flat><router-link to="/" flat>Home</router-link></v-btn>-->
          <!--<v-btn flat><router-link to="/intro" flat>Intro</router-link></v-btn>-->
          <v-btn flat active-class to="/">Home</v-btn>
          <v-btn flat active-class to="/intro">Intro</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    getTitle: function () {
      return this.$store.getters.getTitle
    }
  }
}
</script>

<style scoped>
  a {
    color: #fff;
    text-decoration: none;
  }
</style>
