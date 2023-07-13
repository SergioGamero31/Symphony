import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistView from '../views/ArtistView.vue'
import AlbumView from '../views/AlbumView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: ArtistView
    },
    {
      path: '/album/:id',
      name: 'album',
      component: AlbumView
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error',
      component: ErrorView
    }
  ]
})

export default router
