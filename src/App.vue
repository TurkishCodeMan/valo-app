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



.wrapper {
  position: relative;

  .input-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    background: transparent;
    text-align: left;

    border: 1px solid var(--color-text);
    outline: none;
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
    &:focus {
      outline: none;
    }

    .combo-input {
      color: #fff;
      font-weight: 400;
      border: none;
      outline: none;
      background: transparent;
    }
    .combo-button {
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      top: 50%;
      background: transparent;
      margin-right: 0.5rem;
      border: none;
      outline: none;
      text-align: center;

      .down-icon {
        text-align: center;
        width: 1.5rem;
        color: #fff;
        background: transparent;
        height: 1.5rem;
      }
    }
  }
  .combo-list {
    position: absolute;
    margin-top: 0.5rem;
    max-height: 20rem;
    width: 100%;
    overflow: auto;
    border-radius: 1rem;
    background: #fff;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    z-index: 5;

    a {
      color: #000;
      text-decoration: none;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .img-box {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border: 1px solid var(--color-text);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  .check-icon {
    width: 1rem;
    height: 1rem;
  }
}


</style>
