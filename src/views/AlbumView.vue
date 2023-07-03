<template>
    <div v-if="!emptyObject" class="flex flex-col h-full text-white overflow-auto">
        <div class="bg-cover" :style="albumBackground">
            <div class="flex flex-col h-[40vh] justify-between w-full xs:px-5 md:px-8 lg:px-14 py-8 bg-raisin-black/50">
                <button @click="goBack" class="text-lg rounded-full border border-transparent p-1 self-start hover:border-white transition-colors"><ArrowLeft/></button>
                <div class="flex flex-col gap-3">
                    <h1 class="xs:text-3xl md:text-4xl font-semibold">{{ album.title }}</h1>
                    <div class="flex flex-col gap-1">
                        <div>
                            <span class="font-medium">{{ album.artist.name }}</span>
                            <span class="text-zinc-300">, {{ getFormattedDuration(album.duration)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" xs:px-5 md:px-8 lg:px-14 py-6">
            <h2 class="font-semibold text-xl mb-6">Canciones</h2>
            <SongList class="mb-6" :songList="album.tracks.data"/>
            <div class="flex flex-col text-battleship-gray">
                <span>{{ album.label }}</span>
                <span>{{ album.release_date }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import SongList from '../components/SongList.vue'
    import ArrowLeft from '~icons/mingcute/arrow-left-line'
    import { useArtistStore } from '../store/artist'

    const store = useArtistStore()
    const router = useRouter()
    let album = ref({})

    onMounted(async ()=>{
        const params = router.currentRoute.value.params
        album.value = await store.fetchAlbum(params.id)
    })

    const goBack = () => router.go(-1)

    const emptyObject = computed(()=>{
        return Object.keys(album.value).length === 0
    })

    const albumBackground = computed(()=>{
        return {
            backgroundImage: `url(${album.value.cover_xl})`
        }
    })
    const getFormattedDuration = (duration) => { 
        const hours = Math.floor(duration / 3600)
        const minutes = Math.floor((duration % 3600) / 60)
        const seconds = duration % 60
        return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'min ' : ''}${seconds}s`;
    }
    
</script>