<template>
    <h2 class="text-white font-semibold text-xl my-8">Para ti</h2>
    <section>
        <TrackList :songList="store.recommended"/>
    </section>
    <h2 class="text-white font-semibold text-xl my-8">Lo más escuchado</h2>
    <section>
        <TrackList :songList="store.top"/>
    </section>
</template>

<script setup>
    import TrackList from '../components/TrackList.vue'
    import { useSearchStore } from '../store/search'

    const store = useSearchStore()
</script>