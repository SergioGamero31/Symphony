import { defineStore } from "pinia";
import config from "../../config";

export const useSearchStore = defineStore('search', {
    state: ()=>{
        return {
            artist : {},
            search: []
        }
    },
    getters: {

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
                if(matchingArtist){
                    this.artist = matchingArtist.artist
                }
                else{
                    this.artist = {}
                }
            }
            catch(err){
                console.log(err)
            }
        },
        restoreContent(){
            this.search = []
            this.artist = {}
        }
    }
})