<template>
  <div class="flex justify-center items-center flex-col h-full ">
    <h1 class="text-3xl">Hello,</h1>
    <h2 class="text-xl mb-10">Wellcome to the Transactions POC</h2>
    <p class="font-semibold text-center mb-10">
      This Application is a simple bank transactions viewer coded with
      <span class="text-green-700">Vue 3</span>,
      <span class="text-green-900">Nuxt 3 with the Server API</span>,
      <span class="text-blue-400">Tailwind</span>,
      <span class="text-purple-800">Prisma</span>,
      <br>
      and a PostgreSQL database contained in a docker container
    </p>
    <nuxt-link
      class="py-2 px-16 border font-semibold rounded-md shadow hover:shadow-md duration-300"
      tag="button"
      to="/transactions"
    >
      Let's Start
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>

</style>
