<script setup lang="ts">
import  { AgentList } from '@/features/agents';
import { useAgents } from '@/stores/agents';
import type { Agent } from '@/utils/types';
import { storeToRefs } from 'pinia';
const agentStore = useAgents()
const { agents } = storeToRefs(agentStore)
</script>

<template>
  <main>
    <AgentList :agents="agents as Agent[]" :title="'Ajanlar'" />
  </main>
</template>
