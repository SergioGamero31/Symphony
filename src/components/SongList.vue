<template>
    <div class="flex flex-col gap-1 bg-raisin-black rounded-2xl text-white p-5 h-80 overflow-auto ">
        <div class="flex items-center justify-between p-2 rounded-md hover:bg-darker-raisin hover:cursor-pointer" v-for = "item in store.search" :key="item.id">
            <div class="flex items-center gap-4">
                <img class="rounded w-10" :src="item.album.cover" loading="lazy">
                <span>{{ item.title}}</span>
            </div>
            <span>{{ item.duration }}</span>
        </div>
    </div>
</template>

<script setup>
    import { useSearchStore } from '../store/search';
    const store = useSearchStore()
</script>

<style scoped>
</style>