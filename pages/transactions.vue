<template>
    <div>
      <div class="flex flex-col overflow-hidden w-5/6">
        <h1 class="text-xl font-bold text-gray-700 my-8">
          Transactions
        </h1>
        <client-only>
          <transactions-transaction-filters/>
          <transactions-transaction-table/>
        </client-only>
      </div>
      <Transition name="modal" mode="out-in" appear>
        <div class="modal-container" v-if="route.params.id" :key="route.params.id">
          <nuxt-page :page-key="route.params.id"/>
        </div>
      </Transition>
    </div>
</template>

<script lang="ts" setup>

import {useStore} from "~/store"

const {nuxtServerInit} = useStore()

const route = ref(useRoute())

if (process.client)
  await nuxtServerInit()

</script>

<style scoped>
.modal-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: transform .5s, opacity .5s;
}

.modal-enter-from, .modal-leave-to /* .fade-leave-active below version 2.1.8 */
{
  transform: scale(0);
  opacity: 0;
}
</style>
