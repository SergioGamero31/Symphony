<template>
    <ul v-if="songList" class="grid xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-5 w-fit">
        <li class="flex flex-col gap-1 overflow-hidden" v-for="track in songList" :key="track.id">
            <div @click="selectSong(track, songList)" class="flex flex-col gap-1 hover:cursor-pointer group">
                <img class="rounded-lg" :src="track.album.cover_medium" :alt="`Portada para la canción ${track.title} de ${track.artist.name}`">
                <h4 :class="{'group-hover:animate-slide-left' : track.title.length > 17}" class="text-white text-base whitespace-nowrap -block">{{ track.title }}</h4>
            </div>
            <RouterLink v-if="track.artist.name" class="text-battleship-gray text-sm font-semibold hover:underline self-start" :to="{name: 'artist', params: {id: track.artist.id}}"> 
                {{ track.artist.name }}
            </RouterLink>
        </li>
    </ul>
    <div v-else-if="albumList" class="grid xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 w-fit">
        <RouterLink :to="{name: 'album' , params:{ id: album.id}}" class="flex flex-col gap-2 overflow-hidden hover:scale-105 transition-transform" v-for="album in albumList" :key="album.id">
            <img class="rounded-lg" :src="album.cover_medium" :alt="`Portada para la canción ${album.title} de ${album.artist.name}`">
            <h4  class="text-white text-base truncate">{{ album.title }}</h4>
        </RouterLink>
    </div>
</template>

<script setup>
    import { useSongStore } from '../store/song';

    const store = useSongStore()
    const props = defineProps({
        songList: Array,
        albumList: Array
    })

    const selectSong = (song, songList) => { 
        store.setCurrentSong(song)
        store.setSongList(songList)
    }
</script>

<style scoped>
</style>