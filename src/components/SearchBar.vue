<template>
    <div class="bg-raisin-black rounded-xl flex px-5 sm:w-full lg:w-2/4">
        <input @keyup="handleSearch" class=" bg-transparent focus:outline-none text-white placeholder:text-battleship-gray w-full py-2.5" type="text" placeholder="Buscar" v-model="searchItem" >
        <button @click="handleSearch" class="text-lg text-white"><SearchIcon/></button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSearchStore } from '../store/search'
    import SearchIcon from '~icons/mingcute/search-2-line'

    const store = useSearchStore()
    let searchItem = ref('')
    let searchTimeout = null

    const handleSearch = () => { 
        const searchTerm = searchItem.value.trim()

        if(searchTimeout) clearTimeout(searchTimeout)
        if(searchTerm === '')  store.restoreContent()
        else{
            searchTimeout = setTimeout(()=>{
                store.fetchSearch(searchTerm)
            }, 500)
        }
    }
</script>