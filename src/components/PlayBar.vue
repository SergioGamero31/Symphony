<template>
    <div class="bg-white h-0.5" :style="{ width: progress + '%' }"></div>
    <div class="flex text-white items-center p-3 justify-between">
        <div class="flex items-center gap-5 w-1/3">
            <img class="rounded w-16 z-10" :src="store.currentSong.album.cover_medium">
            <div>
                <h3>{{ store.currentSong.title }}</h3>
                <p class="text-battleship-gray">{{ store.currentSong.artist.name}}</p>
            </div>
        </div>
        <div class="flex gap-6 items-center">
            <button @click="toggleRepeat" class="text-lg" :class="{ 'text-mslate-blue': store.isRepeat, 'text-white': !store.isRepeat }">
                <RepeatIcon/>
            </button>
            <div class="flex gap-4 items-center">
                <button @click="previousSong" class="text-xl rotate-180"><SkipIcon/></button>
                <button @click="togglePlay" class="text-4xl">
                    <component :is="store.isPlaying ? PauseIcon : PlayIcon" />
                </button>
                <button @click="nextSong" class="text-xl"><SkipIcon/></button>
            </div>
            <button class="text-lg"><ShuffleIcon/></button>
        </div>
        <div class="flex gap-2 items-center w-1/3 justify-end">
            <button @click="toggleMute" class="text-lg">
                <component :is="store.isMuted ? MuteIcon : VolumeIcon"/>
            </button>
            <input class="accent-mslate-blue cursor-pointer w-28 h-1.5" type="range" v-model="volume">
        </div>
    </div>
</template>

<script setup>
    import { ref, watchEffect, watch, computed} from 'vue'
    import { useSongStore } from '../store/song'
    import PlayIcon from '~icons/mingcute/play-fill'
    import PauseIcon from '~icons/mingcute/pause-fill'
    import SkipIcon from '~icons/mingcute/skip-forward-fill'
    import ShuffleIcon from '~icons/mingcute/shuffle-line'
    import RepeatIcon from '~icons/mingcute/repeat-line'
    import VolumeIcon from '~icons/mingcute/volume-fill'
    import MuteIcon from '~icons/mingcute/volume-mute-fill'

    const store = useSongStore()
    let progress = ref(0)
    let volume = ref(50)

    const shouldStopPlaying = computed(()=> progress.value >= 100)

    watchEffect(()=>{
        if(store.currentSong.preview) store.audio.play()    
    })

    watch(volume, (newVolume)=>{
        store.audio.volume = newVolume * 0.01
    }, { inmediate: true })

    watch(shouldStopPlaying, (shouldStop)=>{
        if(shouldStop) store.togglePlay()
    })

    const toggleRepeat = () => store.toggleRepeat()

    const previousSong = () => {
        const currentIndex = store.songs.findIndex(song => song === store.currentSong)
        const previousIndex = currentIndex - 1
        const lastIndex = store.songs.length -1

        if(previousIndex >= 0){
            const previousSong = store.songs[previousIndex]
            store.setCurrentSong(previousSong)
        }
        else {
            const previousSong = store.songs[lastIndex]
            store.setCurrentSong(previousSong)
        }
    }
    const nextSong = () => {
        const currentIndex = store.songs.findIndex(song => song === store.currentSong)
        const nextIndex = currentIndex + 1

        if(nextIndex < store.songs.length){
            const nextSong = store.songs[nextIndex]
            store.setCurrentSong(nextSong)
        }
        else{
            const nextSong = store.songs[0]
            store.setCurrentSong(nextSong)
        }
    }

    const togglePlay = () => {
        store.togglePlay()
        if (!store.isPlaying) store.audio.pause()
        else store.audio.play()
    }

    const toggleMute = () => { 
        store.toggleMute() 
        store.audio.muted = store.isMuted
    }

    const updateProgress = () =>{
        if(store.audio) progress.value = (store.audio.currentTime / store.audio.duration) * 100
        else progress.value = 0
        requestAnimationFrame(updateProgress)
    }   
    requestAnimationFrame(updateProgress)
</script>