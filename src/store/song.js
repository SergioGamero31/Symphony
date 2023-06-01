import { defineStore } from "pinia";

export const useSongStore = defineStore('song', {
    state: ()=>{
        return {
            currentSong: null,
            songs: [],
            audio: new Audio(),
            isPlaying: false,
            isRepeat: false,
            isShuffle: false,
            isMuted: false,
        }
    },
    getters:{
    },
    actions: {
        setCurrentSong(song){
            this.isPlaying = true
            if(this.currentSong == song){
                if(this.audio) {
                    this.audio.currentTime = 0
                    this.audio.play()
                } 
            }else{
                this.currentSong = song
                this.audio.src = this.currentSong.preview
            }
        },
        setSongList(songList){
            this.songs = songList
        },
        togglePlay(){
            this.isPlaying = !this.isPlaying
        },
        toggleRepeat(){
            this.isRepeat = !this.isRepeat
        },
        toggleMute(){
            this.isMuted = !this.isMuted
        }
    }
})