<template>
  <div class="flex flex-col overflow-hidden w-5/6">
    <h1 class="text-xl font-bold text-gray-700 my-8">
      Transactions
    </h1>
    <client-only>
      <transactions-transaction-filters/>
      <transactions-transaction-table/>
    </client-only>
  </div>
  <nuxt-page :page-key="route.params.id"/>
</template>

<script lang="ts" setup>

import {useStore} from "~/store"

const {nuxtServerInit} = useStore()

const route = ref(useRoute())

if (process.client)
  await nuxtServerInit()

</script>

<style scoped>
</style>
