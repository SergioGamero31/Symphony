<template>
    <div class="flex flex-col h-full items-center justify-center gap-10 px-5 md:px-8">
        <h1 class="text-white text-8xl xs:font-light md:font-normal">404</h1>
        <p class="text-battleship-gray text-lg text-center">¡Oops! Parece que hemos llegado a un callejón sin salida. La página que buscas no se encontró</p>
        <RouterLink :to="{name: 'home'}" class="text-white self-center px-5 py-2 rounded-lg bg-mslate-blue hover:bg-slate-blue active:text-night">Ir al Inicio</RouterLink>
    </div>
</template>