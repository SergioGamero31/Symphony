<template>
  <div class="overflow-auto px-14 mt-9 pb-5">
    <SearchBar class="mb-5"/>
    <div v-if="searchResultAvailable" class="flex flex-col gap-5">
      <ArtistCard/>
      <h2 class="text-white font-semibold text-lg">Canciones</h2>
      <SongList :songList="store.search" overflowValue="auto"/> 
    </div>
    <div v-else class="flex flex-col">
      <h2 class="text-white font-semibold text-xl mt-4 mb-9">Para ti</h2>
      <section>
        <TrackList :songList="store.recommended"/>
      </section>
      <h2 class="text-white font-semibold text-xl my-9">Lo más escuchado</h2>
      <section>
        <TrackList :songList="store.top"/>
      </section>
    </div>  
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, computed } from 'vue';
  import SearchBar from '../components/SearchBar.vue';
  import SongList from '../components/SongList.vue';
  import ArtistCard from '../components/ArtistCard.vue';
  import TrackList from '../components/TrackList.vue';
  import { useSearchStore } from '../store/search';

  const store = useSearchStore()

  onMounted(()=>{
    store.fetchForYou('joji')
    store.fetchTopSongs('peso pluma')
  })

  const searchResultAvailable = computed(()=>{
    return store.search && store.search.length > 0
  })

  onUnmounted(()=>{
    store.restoreContent()
  })
</script>