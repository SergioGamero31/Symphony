<template>
    <div class="bg-raisin-black rounded-xl flex px-5 sm:w-full lg:w-2/4">
        <input @keyup="handleSearch" v-model="searchItem" class=" bg-transparent focus:outline-none text-white placeholder:text-battleship-gray w-full py-2.5" type="text" placeholder="Buscar">
        <button @click="handleSearch" class="text-lg text-white"><SearchIcon/></button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useSearchStore } from '../store/search'
    import SearchIcon from '~icons/mingcute/search-2-line'

    const store = useSearchStore()
    let searchItem = ref('')
    let typingTimer
    const typingTimeOut = 500

    const handleSearch = () => { 
        const searchTerm = searchItem.value.trim()
        store.searchTerm = searchTerm
        clearTimeout(typingTimer)

        if(searchTerm === ''){
            store.restoreContent()
        }else{
            typingTimer = setTimeout(async() => {
                await store.fetchSearch(searchTerm)
                store.isSearched = true
            }, typingTimeOut)
        }
    }
</script>