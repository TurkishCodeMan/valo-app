<script setup lang="ts">
import { fetcher } from '@/utils/fetcher'
import type { Agent } from '@/utils/types'
import { onMounted, ref, watch } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params
const agent = ref<Agent>()
function fetchPage(id: string) {
  fetcher({ url: `agents/${id}`, method: 'GET' }).then((val) => (agent.value = val.data))
}
onMounted(() => {
  fetchPage(id as string)
  console.log('FETCHED')
})
watch(
  route,
  (path) => {
    fetchPage(path?.params?.id as string)
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <article>
    <h2>{{ agent?.displayName }} - Özellikleri</h2>
    <p>{{ agent?.description }}</p>
  </article>
</template>

<style scoped lang="scss">
article {
  padding: 5rem 2rem;

  p {
    max-width: 70%;
  }
}
</style>
