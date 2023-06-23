<template>
    <RouterLink class="xs:w-full lg:w-2/4" v-if="!emptyObject" :to="{name: 'artist', params: {id: store.artist.id}}">
        <div class="flex bg-raisin-black rounded-2xl xs:p-3 md:p-5 gap-5 hover:bg-night-darker">
            <img class="rounded-xl xs:w-1/4 lg:w-36" :src="store.artist.picture_medium" :alt="`Imagen de perfil de ${store.artist.name}`">
            <div class="flex flex-col gap-4 justify-center">
                <div class="flex flex-col gap-3">
                    <span class="text-white xs:text-xl md:text-2xl font-semibold">{{ store.artist.name }}</span>
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