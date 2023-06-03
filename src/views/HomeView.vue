<template>
  <div class="px-14">
    <SearchBar/>
    <div v-if="searchResultAvailable" class="flex flex-col gap-5">
      <ArtistCard/>
      <SongList/> 
    </div>
    <div v-else class="flex flex-col h-full pb-5">
      <h2 class="text-white font-semibold text-xl mb-9">Para ti</h2>
      <section>
        <ul class="flex flex-wrap gap-5">
          <li @click="selectSong(track, store.recommended)" class="flex flex-col gap-1 w-40 hover:cursor-pointer group overflow-hidden" v-for="track in store.recommended" :key="track.id">
            <img class="rounded-lg" :src="track.album.cover_medium" :alt="`Portada para la canción ${track.title} de ${track.artist.name}`">
            <h4 :class="{'group-hover:animate-slide-left' : track.title.length > 16}" class="text-white text-base whitespace-nowrap -block">{{ track.title }}</h4>
            <p class="text-battleship-gray text-sm font-semibold">{{ track.artist.name }}</p>
          </li>
        </ul>
      </section>
      <h2 class="text-white font-semibold text-xl my-9">Lo más escuchado</h2>
      <section>
        <ul class="flex flex-wrap gap-5">
          <li @click="selectSong(track, store.top)" class="flex flex-col gap-1 w-40 hover:cursor-pointer group overflow-hidden" v-for="track in store.top" :key="track.id">
            <img class="rounded-lg" :src="track.album.cover_medium" :alt="`Portada para la canción ${track.title} de ${track.artist.name}`" loading="lazy">
            <h4 :class="{'group-hover:animate-slide-left' : track.title.length > 16}" class="text-white text-base whitespace-nowrap -block">{{ track.title }}</h4>
            <p class="text-battleship-gray text-sm font-semibold">{{ track.artist.name }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed } from 'vue';
  import SearchBar from '../components/SearchBar.vue';
  import SongList from '../components/SongList.vue';
  import ArtistCard from '../components/ArtistCard.vue';
  import { useSearchStore } from '../store/search';
  import { useSongStore } from '../store/song';

  const store = useSearchStore()
  const songStore = useSongStore()

  onMounted(()=>{
    store.fetchForYou('joji')
    store.fetchTopSongs('peso pluma')
  })

  const selectSong = (song, songList) => { 
    songStore.setCurrentSong(song)
    songStore.setSongList(songList)
  }

  const searchResultAvailable = computed(()=>{
    return store.search && store.search.length > 0
  })
</script>