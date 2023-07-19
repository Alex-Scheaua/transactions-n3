<template>
  <tr class="border-b hover:bg-gray-50 cursor-pointer" @click="navigateTo(`/transactions/${transaction.id}`)">
    <td :class="transaction.reference ? 'text-gray-900' : 'text-gray-400'"
        class="px-6 py-4 font-medium whitespace-nowrap">
      {{ transaction.reference || 'None provided' }}
    </td>
    <td class="px-6 py-4 text-black">
      <span :style="`background-color: #${category.color}99`" class="px-2 py-1 rounded-lg">
         {{ category.name }}
      </span>
    </td>
    <td class="px-6 py-4">
      {{ new Date(transaction.date).toLocaleString() }}
    </td>
    <td class="px-6 py-4 text-right">
      {{ transaction.amount }}
      <span class="text-gray-400">
        {{ transaction.currency }}
      </span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type {Category, Transaction} from "~/interfaces"

defineProps<{
  transaction: Transaction
  category: Category
}>()
</script>

<style scoped>

</style>
