<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import { useAgents } from './stores/agents'
import { storeToRefs } from 'pinia'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import Header from './components/Header.vue'
</script>

<template>
 <Header/>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@font-face {
  font-family: 'Valorant';
  src: local('Valorant'), url(./assets/Valorant.ttf) format('truetype');
}





</style>
