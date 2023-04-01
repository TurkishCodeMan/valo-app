<script setup lang="ts">
import  { AgentList } from '@/features/agents';
import { useAgents } from '@/stores/agents';
import type { Agent } from '@/utils/types';
import { storeToRefs } from 'pinia';
const agentStore = useAgents()
const { savedAgents } = storeToRefs(agentStore)
</script>

<template>
  <main>
    <AgentList :title="'Kaydedilenler'"  :agents="savedAgents as Agent[]" />
  </main>
</template>
