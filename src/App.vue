<template>
  <header>
    <NavBar/>
  </header>
  <main>
    <RouterView/>
  </main>
  <section>
    <PlayBar/>
  </section>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import PlayBar from './components/PlayBar.vue';
</script>

<style scoped>
</style>
