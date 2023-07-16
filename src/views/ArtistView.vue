<template>
    <div class="overflow-auto pb-8">
        <div v-if="store.artist" :style="artistBackground" class="flex h-96 text-white bg-cover">
            <div class="flex w-full flex-col justify-between xs:pl-5 md:pl-8 lg:pl-14 py-8 backdrop-opacity-20 bg-raisin-black/50">
                <button @click="goBack" class="text-lg rounded-full border border-transparent p-1 self-start hover:border-white transition-colors"><ArrowLeft/></button>
                <div class="flex flex-col gap-5">
                    <h1 class="text-4xl font-semibold">{{ store.artist.name }}</h1>
                    <p>{{ formattedFollowers }} seguidores</p>
                    <div class="flex gap-3 items-center">
                        <button @click="playSong(store.discography[0], store.discography.slice(0, 5))" class="rounded-lg py-1.5 px-5 bg-mslate-blue hover:bg-slate-blue active:text-raisin-black transition-colors">Reproducir</button>
                        <input class="hidden" id="heartCheckBox" type="checkbox" v-model="store.isFollow">
                        <label class="text-2xl hover:cursor-pointer hover:text-crimson transition-colors" :class="{'text-crimson' : store.isFollow}" for="heartCheckBox">
                            <component :is="store.isFollow ? HearIconFill : HeartIconLine" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="xs:px-5 md:px-8 lg:px-14 mt-9 text-white">
            <h2 class="font-semibold text-xl mb-7">Populares</h2>
            <section>
                <SongList :songList="store.discography.slice(0, 5)"/>
            </section>
            <section v-if="store.albums.length > 0">
                <h2 class="font-semibold text-xl mt-9 mb-7">Álbumes</h2>
                <TrackList :albumList="store.albums"/>
            </section>
            <section v-if="store.singles.length > 0">
                <h2 class="font-semibold text-xl mt-9 mb-7">Sencillos</h2>
                <TrackList :albumList="store.singles"/>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import SongList from '../components/SongList.vue'
    import TrackList from '../components/TrackList.vue';
    import ArrowLeft from '~icons/mingcute/arrow-left-line'
    import HeartIconLine from '~icons/mingcute/heart-line'
    import HearIconFill from '~icons/mingcute/heart-fill'
    import { useArtistStore } from '../store/artist'
    import { useSongStore } from '../store/song';
    
    const store = useArtistStore()
    const songStore = useSongStore()

    const router = useRouter()
    const artistId = router.currentRoute.value.params.id

    onMounted(() => {
        store.restoreContent()
        store.fetchArtist(artistId)
    })

    const goBack = () => router.go(-1)

    const artistBackground = computed(()=>{
        return {
            backgroundImage: `url(${store.artist.picture_xl})`
        }
    })

    const formattedFollowers = computed(()=>{
        if(store.artist.nb_fan) {
            return  parseFloat(store.artist.nb_fan).toLocaleString('en')
        }
    })
    
    const playSong = (song, songList) =>{
        songStore.setCurrentSong(song)
        songStore.setSongList(songList)
    }
</script>