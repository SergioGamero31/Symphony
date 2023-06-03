<template>
    <ul class="flex flex-col gap-1 bg-raisin-black rounded-2xl text-white p-4 h-80 overflow-auto ">
        <li @click="selectSong(item, store.search)" class="flex items-center justify-between p-2 rounded-md hover:bg-night hover:cursor-pointer" v-for = "item in store.search" :key="item.id">
            <div class="flex items-center gap-4">
                <img class="rounded w-10" :src="item.album.cover" :alt="`Portada de ${item.title}`" loading="lazy">
                <div class="flex flex-col">
                    <span>{{ item.title }}</span>
                    <span class="text-battleship-gray text-sm font-semibold"> {{ item.artist.name }}</span>
                </div>
            </div>
            <span class="text-battleship-gray font-semibold">{{ getFormattedDuration(item.duration) }}</span>
        </li>
    </ul>
</template>

<script setup>
    import { useSearchStore } from '../store/search';
    import { useSongStore } from '../store/song';

    const store = useSearchStore()
    const songStore = useSongStore()
    
    const getFormattedDuration = (duration) => { 
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
    const selectSong = (song, songList) => { 
        songStore.setCurrentSong(song)
        songStore.setSongList(songList)
    }
</script>