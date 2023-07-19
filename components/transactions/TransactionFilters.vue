<template>
  <div class="flex mb-14 gap-2">
    <div>
      <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="searchInput">
        Search by bank, account, reference, category, data, amount, currency
      </label>
      <input
        :value="filters.search.string"
        class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm"
        @input="createFiltersAndSearch($event.target.value)"
      >
    </div>
    
    <div>
      <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="bankInput">
        Bank
      </label>
      <select
        :value="filters.bank"
        class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
        name="currency"
        @change="searchTransactions('bank', $event.target.value)"
      >
        <option value="">All</option>
        <option v-for="bank in banks" :key="bank.name" :value="bank.name">
          {{ bank.name }}
        </option>
      </select>
    </div>
    
    <div>
      <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="accountInput">
        Account
      </label>
      <select
        :value="filters.account"
        class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
        name="currency"
        @change="searchTransactions('account', $event.target.value)"
      >
        <option value="">All</option>
        <option v-for="account in accounts" :key="account.id" :value="account.id">
          {{ account.name }}
        </option>
      </select>
    </div>
    
    <div>
      <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="startMonthInput">
        Starting month
      </label>
      <input
        id="startMonthInput"
        class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm"
        placeholder="ex: yyyy/mm"
        @blur="setDate($event.target.value, 'startDate')"
      >
    </div>
    
    <div>
      <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="endMonthInput">
        Ending month
      </label>
      <input
        id="endMonthInput"
        class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm"
        placeholder="ex: yyyy/mm"
        @blur="setDate($event.target.value , 'endDate')"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Account, Category} from "~/interfaces"
import debounce from "~/services/debounce";
import {useStore} from "~/store";

const store = useStore()

const filters = computed(() => store.filters)

const accounts = computed(() => store.accounts)
const categories = computed(() => store.categories)
const banks = computed(() => store.banks)

const setDate = (stringDate: string, type: 'startDate' | 'endDate') => {
  const dateArray = stringDate.split('/')
  let date: Date
  
  if (dateArray.length > 1) {
    if (type === 'startDate') {
      date = new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]) || 1)
    } else {
      date = new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - (parseInt(dateArray[2]) ? 1 : 0), parseInt(dateArray[2]) || 0)
    }
    
    if (date.getFullYear()) {
      store.setFilter({key: type, value: date})
      debounce(() => store.getTransactions())
    }
  }
}

const searchTransactions = (key: 'bank' | 'account' | 'sort', value: string) => {
  store.setFilter({key, value})
  if (key === 'bank') {
    store.setFilter({
      key: 'banks',
      value: banks.value.find((bank: { name: string; }) => bank.name === value)?.ids || []
    })
  }
  debounce(() => store.getTransactions())
}

const createFiltersAndSearch = (search: string) => {
  debounce(() => {
    const filteredAccounts = accounts.value
      .filter((account: Account) => account.name.toLowerCase().includes(search.toLowerCase()))
      .map((account: Account) => account.id)
    
    const filteredCategories = categories.value
      .filter((category: Category) => category.name.toLowerCase().includes(search.toLowerCase()))
      .map((category: Category) => category.id)
    
    const filteredBanks = accounts.value
      .filter((account: Account) => account.bank.toLowerCase().includes(search.toLowerCase()))
      .map((category: Category) => category.id)
    
    store.setSearch({
      string: search,
      filteredAccounts,
      filteredCategories,
      filteredBanks,
    })
    store.getTransactions()
  })
}
</script>

<style scoped>

</style>
