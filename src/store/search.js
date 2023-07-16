import { defineStore } from "pinia";
import { useFetch } from "../composables/useFetch";
const {fetchData, results, error} = useFetch()

export const useSearchStore = defineStore('search', {
    state: ()=>{
        return {
            searchTerm: '',
            isSearched: false,
            artist : {},
            search: [],
            recommended: [],
            top: []
        }
    },
    actions: {
        async fetchSearch(term){
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`;
            await fetchData(url)
            if(error.value) console.log(error.value)
            else{
                this.search = results.value.data
                const matchingArtist = this.search.find(result => result.artist.name.toLowerCase() === term.toLowerCase())
                this.artist = matchingArtist ? matchingArtist.artist : {}
            }
        },
        async fetchSongs(term, limit){
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}&limit=${limit}`
            await fetchData(url)
            if(error.value) console.log(error.value)
            else return results.value.data
        },
        async fetchForYou(term){
            const songs = await this.fetchSongs(term, 9);
            if(error.value) console.log(error.value)
            else this.recommended = songs
        },
        async fetchTopSongs(term){
            const songs = await this.fetchSongs(term, 18);
            if(error.value) console.log(error.value)
            else this.top = songs
        },
        restoreContent(){
            this.isSearched = false
            this.search = []
            this.artist = {}
        }
    }
})