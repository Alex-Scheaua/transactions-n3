<template>
  <transition appear>
    <div v-if="isMounted" class="flex justify-center items-center flex-col h-full ">
      <h1 class="text-3xl">Hello,</h1>
      <h2 class="text-xl mb-10">Wellcome to the Transactions POC</h2>
      <p class="font-semibold text-center mb-10">
        This Application is a simple bank transactions viewer coded with
        <span class="text-green-700">Vue 2</span>,
        <span class="text-green-900">Nuxt 2</span>,
        <span class="text-blue-400">Tailwind</span>,
        <span class="text-pink-500">graphQL</span>,
        <span class="text-violet-900">Apollo</span>,
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
  </transition>
</template>

<script lang="ts">

export default {
  transition: {
    name: 'fade',
    mode: 'out-in',
    
  },
  setup() {
    const isMounted = ref(false);
    
    onMounted(() => {
      nextTick(() => {
        isMounted.value = true;
      })
    })
    
    return {isMounted}
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 2s;
}

.fade-leave-active {
  transition: opacity 500ms;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
