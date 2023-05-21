<template>
    <div v-if="!emptyObject" class="flex bg-raisin-black rounded-2xl p-5 w-2/4 gap-5">
        <img class="rounded-2xl w-36" :src="store.artist.picture_medium" :alt="`Imagen de perfil de ${store.artist.name}`">
        <div class="flex flex-col gap-4 justify-center">
            <div class="flex flex-col gap-2">
                <span class="text-white text-2xl">{{ store.artist.name }}</span>
                <span class="text-eerie-black bg-white font-medium rounded-lg px-1 self-start">{{ store.artist.type}}</span>
            </div>
            <button class="text-white bg-mslate-blue rounded-xl px-5 py-1">Reproducir</button> 
        </div> 
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSearchStore } from '../store/search';
const store = useSearchStore()

const emptyObject = computed(()=>{
    return Object.keys(store.artist).length === 0
})

</script>

<style scoped>
</style>