<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup>
import {useStore} from "~/store/index";

const {nuxtServerInit} = useStore();

onMounted(() => nuxtServerInit())
</script>
