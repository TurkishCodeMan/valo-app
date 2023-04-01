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
