<template>
    <nav class="h-full w-max flex flex-col justify-between items-center py-5 px-8">
        <ul class="flex flex-col gap-6 text-battleship-gray mt-4">
            <li><RouterLink :to="{name: 'home'}" class="flex items-center gap-3"><HomeIcon/>Inicio</RouterLink></li>
            <li class="flex items-center gap-3"><CompassIcon/>Explorar</li>
            <li class="flex items-center gap-3"><PlaylistIcon/>Libreria</li>
            <li class="flex items-center gap-3"><SettingsIcon/>Configuracion</li>
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
    import HomeIcon from '~icons/mingcute/home-1-fill'
    import CompassIcon from '~icons/mingcute/compass-fill'
    import PlaylistIcon from '~icons/mingcute/playlist-fill'
    import SettingsIcon from '~icons/mingcute/settings-4-fill'
</script>