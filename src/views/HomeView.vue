<template>
  <div class="overflow-y-auto xs:px-5 md:px-8 lg:px-14 pt-9 pb-5">
    <div class="flex w-full gap-4">
      <button @click="emitShowNavBar" class="md:hidden text-white">
        <MenuIcon class="text-lg"/>  
      </button>
      <SearchBar class="xs:w-full"/>
    </div>
    <div v-if="searchResultAvailable" class="h-[91%] flex flex-col pt-5 gap-5">
      <ArtistCard/>
      <h2 class="text-white font-semibold text-lg">Canciones</h2>
      <SongList :songList="store.search"/> 
    </div>
    <div v-else class="flex flex-col">
      <h2 class="text-white font-semibold text-xl my-9">Para ti</h2>
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
  import { onMounted, onUnmounted, computed } from 'vue'
  import SearchBar from '../components/SearchBar.vue'
  import SongList from '../components/SongList.vue'
  import ArtistCard from '../components/ArtistCard.vue'
  import TrackList from '../components/TrackList.vue'
  import MenuIcon from '~icons/mingcute/menu-line'
  import { useSearchStore } from '../store/search'

  const store = useSearchStore()

  onMounted(()=>{
    store.fetchForYou('joji')
    store.fetchTopSongs('peso pluma')
  })

  const searchResultAvailable = computed(()=>{
    return store.search && store.search.length > 0
  })

  const emit = defineEmits(['showNav'])
  const emitShowNavBar = () => { 
    emit('showNav') 
  }

  onUnmounted(()=>{
    store.restoreContent()
  })
</script>