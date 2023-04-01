<script setup lang="ts">
import { useAgents } from '@/stores/agents'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useRoute, useRouter } from 'vue-router'

const agentStore = useAgents()
const { filteredAgents } = storeToRefs(agentStore)

let selected = ref()
let query = ref('')

let filteredAgents_ = computed(() =>
  query.value === ''
    ? filteredAgents.value
    : filteredAgents.value?.filter((agent) =>
        agent.displayName
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>

<template>
  <header>
    <div class="logo">
      <h3>VMW</h3>
    </div>
    <nav>
      <ul>
        <li>
          <RouterLink exact-active-class="active" to="/">Anasayfa</RouterLink>
        </li>
        <li>
          <RouterLink exact-active-class="active" to="/save">Kaydedilenler</RouterLink>
        </li>
      </ul>

      <Combobox v-model="selected">
        <div class="wrapper">
          <div class="input-wrapper">
            <ComboboxInput
              class="combo-input"
              as="input"
              placeholder="Search"
              :displayValue="(agent:any) => agent?.displayName"
              @change="query = $event.target.value"
            />
            <ComboboxButton class="combo-button">
              <ChevronUpDownIcon class="down-icon" aria-hidden="true" />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions class="combo-list">
              <div
                v-if="filteredAgents?.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="agent in filteredAgents_"
                as="template"
                :key="agent.uuid"
                :value="agent"
                v-slot="{ selected, active }"
              >
                <RouterLink :to="`/agent/${agent.uuid}`">
                  <li>
                    <div class="img-box">
                      <img :src="agent.fullPortrait" alt="AgenImg" />
                    </div>
                    <span class="block truncate">
                      {{ agent.displayName }}
                    </span>
                    <span v-if="selected">
                      <CheckIcon class="check-icon" aria-hidden="true" />
                    </span>
                  </li>
                </RouterLink>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </nav>
  </header>
</template>

<style scoped lang="scss">

.active {
    font-size: 1.8rem;
    font-weight: bold;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--color-red);

  .logo {
    h3 {
      font-family: 'Valorant', sans-serif;
      color: var(--color-text);
    }
  }

  nav {
    position: relative;
    display: flex;
    gap: 2rem;
    ul {
      list-style-type: none;
      display: flex;
      align-items: center;
      gap: 1rem;

      li a {
        color: var(--color-text);
        text-decoration: none;
        transition: .3s;
      }
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input {
      border: 2px solid var(--color-text);
      background: transparent;
      padding: 0.6rem;
      color: var(--color-text);
      outline: none;

      &::placeholder {
        color: var(--color-text);
      }
    }

    ion-icon {
      position: absolute;
      right: 0;
      margin-right: 0.5rem;
      font-size: 1.9rem;
      color: var(--color-text);
    }
  }
}
</style>
