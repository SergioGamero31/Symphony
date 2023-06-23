<template>
  <div class="flex h-screen overflow-hidden">
    <header class="bg-night-darker max-md:absolute xs:h-screen">
      <NavBar @showNav="toogleNavBar" :show="showNavBar"/>
    </header>
    <div class="flex flex-col w-full justify-between">
      <main class="flex flex-col h-screen bg-night overflow-hidden">
        <RouterView @showNav="toogleNavBar"/>
      </main>
      <section class="bg-night-darker">
        <PlayBar v-if="store.currentSong"/>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import PlayBar from './components/PlayBar.vue';
  import { useSongStore } from './store/song';

  let showNavBar = ref(false)

  const store = useSongStore()
  const toogleNavBar = () =>{
    showNavBar.value = !showNavBar.value
  } 

</script>
  
<style>
.router-link-exact-active{
  color: #fff;
}
</style>
