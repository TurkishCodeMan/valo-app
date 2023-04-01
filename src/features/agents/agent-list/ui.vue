<script setup lang="ts">
import type { Agent } from '@/utils/types'
import { computed, ref, toRefs, watch } from 'vue'
import { Agent as AgentComp } from '@/features/agents/index'


const props=defineProps<{agents:Agent[],title:string}>()
const {agents,title}=toRefs(props)
const searchText = ref('')

const result = computed(() => {
  return agents?.value?.filter((val) =>
    val.displayName.toLowerCase().includes(searchText.value.toLowerCase())
  )
})
</script>

<template>
  <div class="agent-list">
    <div class="agent-list-header">
      <h3>{{title}}</h3>

      <div class="search-box">
        <input v-model="searchText" name="search" :placeholder="`Search ${title}`" type="search" />
        <ion-icon name="search-outline"></ion-icon>
      </div>
    </div>

    <div class="agent-list-items">
      <AgentComp v-for="item in result" :key="item.uuid" :item="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.agent-list {
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  padding: 0 2rem;

  &-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 25rem;

    h3 {
      font-size: 2.4rem;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
      }
      ion-icon {
        position: absolute;
        right: 0.5rem;
      }
    }
  }

  &-items {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5rem;
  }
}

@media (max-width: 800px) {
  .agent-list {
    &-items {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
