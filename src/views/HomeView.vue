<template>
  <div class="py-9 xs:px-5 md:px-8 lg:px-14 flex flex-col overflow-auto">
    <div class="flex w-full gap-4">
      <button @click="emitShowNavBar" class="md:hidden text-white">
        <MenuIcon class="text-lg" />
      </button>
      <SearchBar class="xs:w-full" />
    </div>
    <div class="flex flex-col h-[91%]" v-if="store.isSearched">
      <div class="flex flex-col gap-5 mt-6 h-full" v-if="searchResultAvailable">
        <ArtistCard />
        <h2 class="text-white font-semibold text-lg">Canciones</h2>
        <SongList :songList="store.search" />
      </div>
      <NotFound class="h-screen" v-else />
    </div>
    <HomeSection v-else />
  </div>
</template>

<script setup>
import { onUnmounted, computed } from "vue"
import SearchBar from "../components/SearchBar.vue"
import SongList from "../components/SongList.vue"
import ArtistCard from "../components/ArtistCard.vue"
import HomeSection from "../components/HomeSection.vue"
import NotFound from "../components/NotFound.vue"
import MenuIcon from "~icons/mingcute/menu-line"
import { useSearchStore } from "../store/search"

const store = useSearchStore()

const searchResultAvailable = computed(() => {
  return store.search && store.search.length > 0
})

const emit = defineEmits(["showNav"])
const emitShowNavBar = () => {
  emit("showNav")
}

onUnmounted(() => {
  store.restoreContent()
})
</script>
