<template>
  <li class="flex flex-col gap-1 overflow-hidden">
    <div
      @click="selectSong(track, songList)"
      class="flex flex-col gap-1 hover:cursor-pointer group"
    >
      <img
        :src="track.album.cover_medium"
        :alt="`Portada para la canción ${track.title} de ${track.artist.name}`"
        class="rounded-lg"
      />
      <h4
        :class="{ 'group-hover:animate-slide-left': track.title.length > 17 }"
        class="text-white text-base whitespace-nowrap -block"
      >
        {{ track.title }}
      </h4>
    </div>
    <RouterLink
      v-if="track.artist.name"
      :to="{ name: 'artist', params: { id: track.artist.id } }"
      class="text-battleship-gray text-sm font-semibold hover:underline self-start"
    >
      {{ track.artist.name }}
    </RouterLink>
  </li>
</template>

<script setup>
import { useSongStore } from "../store/song"

const store = useSongStore()
const props = defineProps({
  track: Object,
  songList: Array
})

const selectSong = (song, songList) => {
  store.setCurrentSong(song)
  store.setSongList(songList)
}
</script>
