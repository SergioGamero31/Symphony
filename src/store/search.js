import { defineStore } from "pinia";

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
                    'X-RapidAPI-Key': 'a4a3046c5dmsh5e782336d20aad0p11f6cajsnc58585bec798',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
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