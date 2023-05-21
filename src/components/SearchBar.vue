<template>
    <div class="bg-dim-gray rounded-2xl flex px-5 my-9">
        <input @keyup="handleSearch" class=" bg-transparent focus:outline-none text-white placeholder:text-white w-full py-3" type="text" placeholder="Buscar" v-model="searchItem" >
        <button @click="handleSearch">Buscar</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSearchStore } from '../store/search';

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

<style scoped>
</style>