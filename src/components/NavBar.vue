<template>
    <nav class="h-full w-max flex flex-col justify-between items-center py-5 px-8">
        <ul class="flex flex-col gap-6 text-battleship-gray">
            <li><RouterLink :to="{name: 'home'}">Inicio</RouterLink></li>
            <li>Explorar</li>
            <li>Libreria</li>
            <li>Configuracion</li>
        </ul>
        <div class="flex">
            <span class="flex gap-4 items-center text-white">
                <img class="rounded-full w-11" src="https://i.scdn.co/image/ab67616d0000b2733a927e16c14f2aeb7c004e19">
                <span class="whitespace-nowrap">Sergio G.</span>
            </span>
        </div>        
    </nav>
</template>

<script setup>
</script>

<style scoped>

</style>