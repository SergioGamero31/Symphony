import { defineStore } from "pinia";
import config from "../../config";

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
                    'X-RapidAPI-Key': config.apikey,
                    'X-RapidAPI-Host': config.apiHost
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
                    'X-RapidAPI-Key': config.apikey,
                    'X-RapidAPI-Host': config.apiHost
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