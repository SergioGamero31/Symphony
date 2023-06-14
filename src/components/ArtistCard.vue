<template>
    <RouterLink v-if="!emptyObject" :to="{name: 'artist', params: {id: store.artist.id}}">
        <div class="flex bg-raisin-black rounded-2xl p-5 w-2/4 gap-5">
            <img class="rounded-xl w-36" :src="store.artist.picture_medium" :alt="`Imagen de perfil de ${store.artist.name}`">
            <div class="flex flex-col gap-4 justify-center">
                <div class="flex flex-col gap-3">
                    <span class="text-white text-2xl font-semibold">{{ store.artist.name }}</span>
                    <span class="text-eerie-black bg-white font-medium text-sm rounded-md px-1 self-start">{{ store.artist.type}}</span>
                </div>
            </div> 
        </div>
    </RouterLink>
</template>

<script setup>
    import { computed } from 'vue';
    import { useSearchStore } from '../store/search';

    const store = useSearchStore()

    const emptyObject = computed(()=>{
        return Object.keys(store.artist).length === 0
    })
</script>