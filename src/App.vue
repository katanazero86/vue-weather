<template>
  <div id="app">
    <v-app dark>
      <v-toolbar>
        <v-toolbar-title>{{getTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat><router-link to="/">Home</router-link></v-btn>
          <v-btn flat><router-link to="/intro">Intro</router-link></v-btn>
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
