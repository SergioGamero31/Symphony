<template>
  <SearchBar/>
  <div v-if="searchResultAvailable" class="flex flex-col gap-5">
    <ArtistCard/>
    <SongList/> 
  </div>
  <div v-else class="flex flex-col h-full overflow-auto mb-2">
    <h2 class="text-white font-semibold text-xl mb-9">Para ti</h2>
    <section>
      <ul class="flex flex-wrap gap-5">
        <li class="flex flex-col gap-1 w-40 hover:cursor-pointer group overflow-hidden" v-for="track in store.recommended" :key="track.id">
          <img class="rounded-xl" :src="track.album.cover_medium" :alt="`Portada para la canción ${track.title} de ${track.artist.name}`">
          <h4 :class="{'group-hover:animate-slide-left' : track.title.length > 16}" class="text-white text-base whitespace-nowrap -block">{{ track.title }}</h4>
          <p class="text-battleship-gray text-sm font-semibold">{{ track.artist.name }}</p>
        </li>
      </ul>
    </section>
    <h2 class="text-white font-semibold text-xl my-9">Lo más escuchado</h2>
    <section>
      <ul class="flex flex-wrap gap-5">
        <li class="flex flex-col gap-1 w-40 hover:cursor-pointer group overflow-hidden" v-for="track in store.top" :key="track.id">
          <img class="rounded-xl" :src="track.album.cover_medium" :alt="`Portada para la canción ${track.title} de ${track.artist.name}`" loading="lazy">
          <h4 :class="{'group-hover:animate-slide-left' : track.title.length > 16}" class="text-white text-base whitespace-nowrap -block">{{ track.title }}</h4>
          <p class="text-battleship-gray text-sm font-semibold">{{ track.artist.name }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
  import { onMounted, computed } from 'vue';
  import SearchBar from '../components/SearchBar.vue';
  import SongList from '../components/SongList.vue';
  import ArtistCard from '../components/ArtistCard.vue';
  import { useHomeStore } from '../store/home';
  import { useSearchStore } from '../store/search';

  const store = useHomeStore()
  const searchStore = useSearchStore()

  onMounted(()=>{
    store.fetchForYou('joji')
    store.fetchTopSongs('peso pluma')
  })

  const searchResultAvailable = computed(()=>{
    return searchStore.search && searchStore.search.length > 0
  })

</script>

<style scoped>
</style>