import { defineStore } from "pinia";
import { useFetch } from "../composables/useFetch";
const { fetchData, results, error } = useFetch()

export const useArtistStore = defineStore('artist', {
    state: ()=>{
        return {
            artist : {},
            discography: [],
            albums: [],
            singles: [],
            isFollow: false,
            cache: {}
        }
    },
    actions : {
        toogleFollow(){
            this.isFollow = !this.isFollow
        },
        async fetchArtist(id){
            if(this.cache[id]){
                this.artist = this.cache[id].artist
                this.discography = this.cache[id].discography
                this.albums = this.cache[id].albums
                this.singles = this.cache[id].singles
                return
            }
            const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;
            await fetchData(url)
            if(error.value) console.log(error.value)
            else{
                this.artist = results.value
                if(results.value.name) {
                    await this.fetchDiscography(results.value.name)
                }
                this.cache[id] = {
                    artist: this.artist,
                    discography: this.discography,
                    albums: this.albums,
                    singles: this.singles
                  };
            }
        },
        async fetchDiscography(term){
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`;
            await fetchData(url)
            if(error.value) console.log(error.value)
            else{
                this.discography = results.value.data
                this.getAlbumDetail()
            }
        },
        async fetchAlbum(id){
            const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;
            await fetchData(url)
            if(error.value) console.log(error.value)
            else return results.value
        },
        getAlbumDetail(){
            const albums = this.discography.map(album => this.fetchAlbum(album.album.id))
            Promise.all(albums)
            .then(response => {
                response.forEach(album =>{
                    const albumExists = this.albums.find(a => a.id === album.id)
                    const singleExists = this.singles.find(s => s.id === album.id)
                    let isContributor = false

                    album.contributors.forEach(contributor => {
                        if(contributor.name === this.artist.name) isContributor = true
                    })

                    if((album.record_type === 'album' || album.record_type === 'ep') && isContributor){
                        !albumExists && this.albums.push(album)
                    }
                    else if(album.record_type === 'single' && isContributor) {
                        !singleExists && this.singles.push(album)
                    }
                })
            })
            .catch(err =>{
                console.error(err)
            })
        },
        restoreContent(){
            this.artist = {}
            this.discography = []
            this.albums = []
            this.singles = []
        }
    }
})