<template>
  <ul
    class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5 w-fit"
  >
    <TrackCard
      v-for="track in list"
      :key="track.id"
      :track="track"
      :songList="list"
    />
  </ul>
</template>

<script setup>
import { useSearchStore } from "../store/search"
import TrackCard from "./TrackCard.vue"

const store = useSearchStore()
const props = defineProps({
  searchItem: String,
  limit: Number
})

const list = await store.fetchSongs(props.searchItem, props.limit)
</script>
