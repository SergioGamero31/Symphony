<template>
  <div class="h-screen w-screen flex">
    <header class="bg-raisin-black">
      <NavBar/>
    </header>
    <div class="flex flex-col w-full justify-between">
      <main class="h-full bg-jet">
        <RouterView/>
      </main>
      <section class="bg-raisin-black">
        <PlayBar/>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import PlayBar from './components/PlayBar.vue';
</script>

<style>

.router-link-exact-active{
  color: #fff;
}
</style>
