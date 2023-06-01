<template>
  <div class="h-screen w-screen flex">
    <header class="bg-raisin-black">
      <NavBar/>
    </header>
    <div class="flex flex-col w-full justify-between">
      <main class=" flex flex-col bg-jet px-14 h-full overflow-hidden">
        <RouterView/>
      </main>
      <section class="bg-raisin-black">
        <PlayBar v-if="store.currentSong"/>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import PlayBar from './components/PlayBar.vue';
  import { useSongStore } from './store/song';

  const store = useSongStore()
</script>
  
<style>
.router-link-exact-active{
  color: #fff;
}
</style>
