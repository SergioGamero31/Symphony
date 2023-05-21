import { defineStore } from "pinia";

export const useHomeStore = defineStore('home', {
    state: ()=>{
        return {
            recommended: [],
            top: []
        }
    },
    getters: {
    },
    actions: {
        async fetchForYou(term){
            try{
                const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}&limit=9`;
                const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a4a3046c5dmsh5e782336d20aad0p11f6cajsnc58585bec798',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
                })
                const response = await res.json()
                this.recommended = response.data
            }
            catch(err){
                console.log(err)
            }
        },
        async fetchTopSongs(term){
            try{
                const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}&limit=18`;
                const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a4a3046c5dmsh5e782336d20aad0p11f6cajsnc58585bec798',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
                })
                const response = await res.json()
                this.top = response.data
            }
            catch(err){
                console.log(err)
            }
        }
    }
})