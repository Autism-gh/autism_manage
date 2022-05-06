<template>
  <div id="app">
    <router-view />

    <MyWife></MyWife>
  </div>
</template>

<script>
import MyWife from '@/entry/wife/MyWife'
export default {
  name: 'App',
  components: {
    MyWife
  }
}
</script>

<style>
html, body {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

#app {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
</style>
