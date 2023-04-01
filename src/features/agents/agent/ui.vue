<script setup lang="ts">
import type { Agent } from '@/utils/types'
import { computed, ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

import { useAgents } from '@/stores/agents'
import { storeToRefs } from 'pinia'
const agentStore = useAgents()
const { item } = defineProps<{ item: Agent }>()

const { savedAgents } = storeToRefs(agentStore)
const selected = ref(false)

const checked=computed(()=>savedAgents.value.includes(item))

watch(selected, () => {
  if (selected && !savedAgents.value?.includes(item)) {
    return (savedAgents.value = [...(savedAgents.value as []), item])
  } else {
    return savedAgents.value = savedAgents?.value?.filter((val) => val.uuid != item.uuid)
  }
})
</script>

<template>
  <article :key="item.uuid">
    <RouterLink :to="`/agent/${item.uuid}`">
      <div class="overlay">{{ item.description }}</div>
      <h4>{{ item.displayName }}</h4>
      <div class="content">
        <img :src="item.fullPortrait" alt="Card" />
      </div>
    </RouterLink>

    <Switch as="div" v-model="selected">
      <button :class="checked ? 'sw-on' : 'sw-off'" class="switch">
        <span :class="checked ? 'ball-on' : 'ball-off'" class="switch-ball" />
      </button>
    </Switch>
  </article>
</template>

<style scoped lang="scss">
.switch {
  width: 5rem;
  height: 2rem;
  flex-shrink: 0;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 1rem;
  padding: 0 0.2rem;
  transition: 0.3s;
  z-index: 3;
}

span.ball-on {
  background: rgb(16, 230, 16);
  transform: translateX(100%);
}

span {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: rgb(122, 125, 119);
  border-radius: 50%;
  transform: translateX(-100%);
  transition: 0.3s;
  margin: 0 0.3rem;
}
a {
  color: #000;
  text-decoration: none;
}
article {
  background: var(--color-red);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.4rem;
  position: relative;
  min-width: 20rem;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }

  div.overlay {
    visibility: hidden;
    transition: 0.3s;
    width: 100%;
    background: rgba(55, 55, 55, 0.5);
    border-radius: 2rem;
    height: 85%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    opacity: 0;
    padding: 1rem;
    text-align: center;
    color: var(--color-text);
  }

  &:hover  div.overlay {
    visibility: visible;
    opacity: 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h4 {
    color: var(--color-text);
    font-weight: bold;
    font-size: 2.6rem;
    margin-bottom: 1.6rem;
    text-align: center;
  }

  label {
    position: absolute;
    right: 0;
    bottom: 4rem;
    z-index: 99;
    span {
      content: '';
      width: 2rem;
      height: 2rem;
      position: absolute;
      border: 1px solid white;
      right: 1rem;
      border-radius: 5rem;
      transition: 0.2s;
    }
    input {
      display: none;
    }
    input:checked ~ span {
      background: var(--color-text);
    }
  }
}
</style>
