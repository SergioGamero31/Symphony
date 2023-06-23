<template>
    <nav :class="{'xs:flex': show, 'xs:hidden': !show}" 
        class="h-full md:flex flex-col justify-between items-center py-5 xs:px-8 md:px-5 lg:px-8">
        <div class="flex flex-col">
            <button @click="emitShowNavBar"  class="md:hidden self-start text-white text-lg mb-2 mt-7"><MenuIcon/></button>
            <ul class="flex flex-col gap-6 text-battleship-gray mt-4">
                <li><RouterLink :to="{name: 'home'}" class="flex items-center gap-3"><HomeIcon/><span class="md:hidden lg:block">Inicio</span></RouterLink></li>
                <li class="flex items-center gap-3"><CompassIcon/><span class="md:hidden lg:block">Explorar</span></li>
                <li class="flex items-center gap-3"><PlaylistIcon/><span class="md:hidden lg:block">Libreria</span></li>
                <li class="flex items-center gap-3"><SettingsIcon/><span class="md:hidden lg:block">Configuracion</span></li>
            </ul>
        </div> 
        <div class="flex">
            <span class="flex gap-4 items-center text-white">
                <img class="rounded-full w-11" src="https://i.scdn.co/image/ab67616d0000b2733a927e16c14f2aeb7c004e19">
                <span class="whitespace-nowrap md:hidden lg:block">Sergio G.</span>
            </span>
        </div>        
    </nav>
</template>

<script setup>
    import HomeIcon from '~icons/mingcute/home-1-fill'
    import CompassIcon from '~icons/mingcute/compass-fill'
    import PlaylistIcon from '~icons/mingcute/playlist-fill'
    import SettingsIcon from '~icons/mingcute/settings-4-fill'
    import MenuIcon from '~icons/mingcute/menu-line'

    const props = defineProps({
        show: Boolean,
    })

    const emit = defineEmits(['showNav'])
    const emitShowNavBar = () => { 
        emit('showNav') 
    }
</script>