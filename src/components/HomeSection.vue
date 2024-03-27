<template>
  <template v-for="(list, index) in TrackLists" :key="index">
    <h2 class="text-white font-semibold text-xl my-8">{{ list.title }}</h2>
    <section>
      <Suspense>
        <template #default>
          <TrackList :searchItem="list.searchItem" :limit="list.limit" />
        </template>
        <template #fallback>
          <ul
            class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5"
          >
            <TrackSuspense v-for="index in list.limit" :key="index" />
          </ul>
        </template>
      </Suspense>
    </section>
  </template>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import TrackSuspense from "./suspense/TrackSuspense.vue"
const TrackList = defineAsyncComponent(() => import("./TrackList.vue"))

const TrackLists = [
  {
    title: "Para ti",
    searchItem: "joji",
    type: "recommended",
    limit: 9
  },
  {
    title: "Lo más escuchado",
    searchItem: "peso pluma",
    type: "top",
    limit: 18
  }
]
</script>
