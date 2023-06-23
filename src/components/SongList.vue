<template>
    <div class="bg-raisin-black rounded-2xl xs:p-2 md:p-3 overflow-auto">
        <ul class="flex flex-col gap-1 text-white h-full overflow-auto">
            <li @click="selectSong(item, songList)" class="flex items-center justify-between p-2 rounded-md hover:bg-night hover:cursor-pointer" v-for = "item in songList" :key="item.id">
                <div class="flex items-center gap-4">
                    <img class="rounded w-10" :src="item.album.cover" :alt="`Portada de ${item.title}`" loading="lazy">
                    <div class="flex flex-col">
                        <span>{{ item.title }}</span>
                        <span class="text-battleship-gray text-sm xs:font-medium md:font-semibold"> {{ item.artist.name }}</span>
                    </div>
                </div>
                <span class="text-battleship-gray xs:text-sm md:text-base xs:font-medium md:font-semibold">{{ getFormattedDuration(item.duration) }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSongStore } from '../store/song';

    const store = useSongStore()

    const props = defineProps({
        songList: ref(Array),
        overflowValue: String
    })

    const getFormattedDuration = (duration) => { 
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    const selectSong = (song, songList) => { 
        store.setCurrentSong(song)
        store.setSongList(songList)
    }
</script>