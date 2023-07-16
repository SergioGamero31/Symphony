<template>
    <div class="flex flex-col justify-center items-center gap-8 text-white">
        <img class="w-24" src="../assets/img/404.svg">
        <div class="flex flex-col items-center gap-3 text-center">
            <p class="text-lg font-medium">No se encontraron resultados para "{{ store.searchTerm }}"</p>
            <p class="text-lg font-medium">¿Tienes alguna otra consulta en mente?</p>
        </div>
    </div>
</template>

<script setup>
    import { useSearchStore } from '../store/search';
    const store = useSearchStore()
</script>