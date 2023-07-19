<template>
  <div v-if="selectedTransaction" class="flex justify-center items-center absolute top-0 left-0 bottom-0 right-0">
    <div class="bg-white w-1/2 my-32 border rounded-md shadow-lg">
      <div class="flex justify-between items-center py-4 px-6 bg-gray-50">
        <span class="text-xl">Transaction details</span>
        <nuxt-link class="rounded text-2xl hover:text-gray-500" tag="button" to="/transactions">
          &times;
        </nuxt-link>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-3 grid-flow-row gap-4">
          <div class="text-right col-span-1 font-semibold">Id:</div>
          <div class="col-span-2">{{ selectedTransaction.id }}</div>
          
          <div class="text-right col-span-1 font-semibold">Date:</div>
          <div class="col-span-2">{{ new Date(selectedTransaction.date).toLocaleString() }}</div>
          
          <div class="text-right col-span-1 font-semibold">Reference:</div>
          <div :class="selectedTransaction.reference ? 'text-gray-900' : 'text-gray-400'" class="col-span-2">
            {{ selectedTransaction.reference || 'None provided' }}
          </div>
          
          <div class="text-right col-span-1 font-semibold">Account:</div>
          <div class="col-span-2">{{ selectedAccount?.name }}</div>
          
          <div class="text-right col-span-1 font-semibold">Category:</div>
          <div class="col-span-2">
         <span :style="selectedColor" class="px-2 py-1 rounded-md">
             {{ selectedCategory?.name }}
         </span>
          </div>
          
          <div class="text-right col-span-1 font-semibold">Bank:</div>
          <div class="col-span-2">{{ selectedAccount?.bank }}</div>
          
          <div class="text-right col-span-1 font-semibold">Amount:</div>
          <div class="col-span-2">{{ selectedTransaction.amount }} {{ selectedTransaction.currency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Account, Category, Transaction} from "~/interfaces";
import {useStore} from "~/store";
import {ComputedRef} from "vue";

const route = ref(useRoute())
const store = useStore()

const selectedTransaction = computed(() => store.selectedTransaction) as ComputedRef<Transaction>
const accounts = computed(() => store.accounts)
const categories = computed(() => store.categories)

const selectedCategory = computed(() => categories.value.find((category: Category) => category.id === selectedTransaction.value.categoryId))
const selectedColor = computed(() => {
  if (selectedCategory.value?.color) {
    return {'background-color': `#${selectedCategory.value.color}99`}
  }
})
const selectedAccount = computed(() => accounts.value.find((account: Account) => account.id === selectedTransaction.value.accountId))

onMounted(() => {
  store.getSelectedTransaction(route.value.params.id)
})

watch(route, () => {
  return route.value.params.id && store.getSelectedTransaction(route.value.params.id)
})
</script>

