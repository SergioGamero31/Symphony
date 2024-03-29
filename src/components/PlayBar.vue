<template>
    <div class="bg-white h-0.5" :style="{ width: progress + '%' }"></div>
    <div class="flex text-white items-center p-3 justify-between">
        <div class="flex items-center gap-5 xs:w-3/5 md:w-1/3 ">
            <img class="rounded xs:w-10 md:w-16" :src="store.currentSong.album.cover_medium">
            <div class="overflow-hidden xs:whitespace-nowrap md:whitespace-normal">
                <h3 class="truncate">{{ store.currentSong.title }}</h3>
                <p class="text-battleship-gray xs:text-sm md:text-base">{{ store.currentSong.artist.name }}</p>
            </div>
        </div>
        <div class="flex gap-6 items-center">
            <button @click="toggleRepeat" class="text-lg xs:hidden md:block" :class="{ 'text-mslate-blue': store.isRepeat, 'text-white': !store.isRepeat }">
                <RepeatIcon/>
            </button>
            <div class="flex gap-4 items-center">
                <button @click="previousSong" class="text-xl rotate-180 active:scale-90 transition-transform"><SkipIcon/></button>
                <button @click="togglePlay" class="text-4xl xs:active:scale-90 lg:active:scale-75 transition-transform">
                    <component :is="store.isPlaying ? PauseIcon : PlayIcon" />
                </button>
                <button @click="nextSong" class="text-xl active:scale-90 transition-transform"><SkipIcon/></button>
            </div>
            <button class="text-lg xs:hidden md:block"><ShuffleIcon/></button>
        </div>
        <div class="xs:hidden md:flex gap-2 items-center w-1/3 justify-end">
            <button @click="toggleMute" class="text-lg">
                <component :is="store.isMuted ? MuteIcon : VolumeIcon"/>
            </button>
            <input class="accent-mslate-blue cursor-pointer w-28 h-1.5" type="range" v-model="volume">
        </div>
    </div>
</template>

<script setup>
    import { ref, watchEffect, watch, computed, onBeforeUnmount } from 'vue'
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
        if (shouldStop) autoChangeSong()
    })

    const toggleRepeat = () => store.toggleRepeat()

    const previousSong = () => {
        const currentIndex = store.songs.findIndex(song => song === store.currentSong)
        const previousIndex = (currentIndex - 1 + store.songs.length) % store.songs.length
        const previousSong = store.songs[previousIndex]
        store.setCurrentSong(previousSong)
    }

    const nextSong = () => {
        const currentIndex = store.songs.findIndex(song => song === store.currentSong)
        const lastIndex = store.songs.length - 1;
        const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
        const nextSong = store.songs[nextIndex]
        store.setCurrentSong(nextSong)
    }

    const autoChangeSong = () => {
        const currentIndex = store.songs.findIndex(song => song === store.currentSong)
        const lastIndex = store.songs.length - 1;
        const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
       
        if (currentIndex === lastIndex && !store.isRepeat) store.togglePlay();
        else {
            const nextSong = store.songs[nextIndex];
            store.setCurrentSong(nextSong);
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

    onBeforeUnmount(()=>{
       store.audio.pause()
       store.currentSong = null
    })
</script>