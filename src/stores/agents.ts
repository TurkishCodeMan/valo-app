import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Agent } from '@/utils/types'
import { fetcher } from '@/utils/fetcher'

export const useAgents = defineStore('agents', () => {
  const agents = ref<Agent[]>()
  const savedAgents = ref<Agent[]>([])
  const searchText = ref('')
  const filteredAgents = computed(() =>
    agents.value?.filter((val) =>
      val.displayName.toLowerCase().includes(searchText.value.toLowerCase())
    )
  )
onMounted(()=>  fetcher({ url: 'agents', method: 'GET' }).then((val) => (agents.value = val.data)))
  return { agents,filteredAgents, savedAgents, searchText }
})
