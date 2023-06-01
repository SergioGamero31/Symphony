import { defineStore } from "pinia";
import config from "../../config";

export const useSearchStore = defineStore('search', {
    state: ()=>{
        return {
            artist : {},
            search: [],
            recommended: [],
            top: []
        }
    },
    actions: {
        async fetchSearch(term){
            try{
                const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`;
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': config.apikey,
                        'X-RapidAPI-Host': config.apiHost
                    }
                })
                const response = await res.json()
                this.search = response.data

                const matchingArtist = this.search.find(result => result.artist.name.toLowerCase() === term.toLowerCase())
                this.artist = matchingArtist ? matchingArtist.artist : {}
            }
            catch(err){
                console.log(err)
            }
        },
        restoreContent(){
            this.search = []
            this.artist = {}
        },

        async fetchSongs(term, limit){
            try{
                const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}&limit=${limit}`
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': config.apikey,
                        'X-RapidAPI-Host': config.apiHost
                    }
                })
                const response = await res.json()
                return response.data
            }
            catch(err){
                console.log(err)
                return []
            }
        },
        async fetchForYou(term){
            const songs = await this.fetchSongs(term, 9);
            this.recommended = songs
        },
        async fetchTopSongs(term){
            const songs = await this.fetchSongs(term, 18);
            this.top = songs
        }
    }
})