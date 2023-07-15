import { defineStore } from 'pinia'
import {
  loadTransactions,
  loadAccounts,
  loadCategories,
  loadBanks
} from "~/services/networkRequests"

import type {
  Id,
  Transaction,
  Category,
  Account,
  Bank,
  TransactionFilterFields,
  TransactionFilterFieldSearch
} from "~/interfaces"
interface State {
  transactions: Transaction[]
  selectedTransaction: Transaction | {}
  categories: Category[]
  accounts: Account[]
  banks: Bank[]
  filters: TransactionFilterFields
  loading: boolean
  lastBatch: boolean
}
export const useStore = defineStore('store', {
  state: () => (<State>{
    transactions: [],
    selectedTransaction: {},
    categories: [],
    accounts: [],
    banks: [],
    filters: {
      search: {
        string: '',
        filteredAccounts: [],
        filteredBanks: [],
        filteredCategories: []
      },
      banks: [],
      bank: '',
      account: '',
      sort: 'desc',
      cursor: '',
    },
    loading: false,
    lastBatch: false
  }),
  // getters: {
  //   getTransactions: (state: State) => state.transactions,
  //   getSelectedTransaction: (state: State) => state.selectedTransaction,
  //   getCategories: (state: State) => state.categories,
  //   getAccounts: (state: State) => state.accounts,
  //   getBanks: (state: State) => state.banks,
  //   getFilters: (state: State) => state.filters,
  //   getLoading: (state: State) => state.loading,
  //   getLastBatch: (state: State) => state.lastBatch,
  // },

  actions: {
    async nuxtServerInit() {
      await this.getTransactions()
      await this.getCategories()
      await this.getAccounts()
      await this.getBanks()

    },
    async getTransactions(loadMore: boolean = false) {
      this.loading = true
      try {
        if(this.filters.bank) {
          this.filters.banks = this.banks.find((bank: Bank) => bank.name === this.filters.bank)?.ids || []
        }

        const filters = {
          ...this.filters,
          cursor: loadMore ? this.filters.cursor : ''
        }
        const transactionsList = await loadTransactions(filters)

        this.transactions = loadMore ? [...this.transactions, ...transactionsList] : transactionsList
        this.filters.cursor = transactionsList.length ? transactionsList[transactionsList.length-1].id : ''
        this.lastBatch = transactionsList.length < 20
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    async getSelectedTransaction(id: Id) {
      try {
        const filter = {
          search: {
            string: id,
            filteredAccounts: [],
            filteredBanks: [],
            filteredCategories: []
          },
          banks: [],
          bank: '',
          account: '',
          sort: 'desc',
          cursor: '',
        }

        this.selectedTransaction = (await loadTransactions(filter))[0]
      } catch (e) {
        console.error(e)
      }
    },
    async getCategories() {
      try {
        this.categories = (await loadCategories())
      } catch (e) {
        console.error(e)
      }
    },
    async getAccounts() {
      try {
        this.accounts = (await loadAccounts())

      } catch (e) {
        console.error(e)
      }
    },
    async getBanks() {
      try {
        this.banks = (await loadBanks())

      } catch (e) {
        console.error(e)
      }
    },
    setFilter({key, value}: {key: 'bank'| 'account' | 'sort', value: string}) {
      this.filters[key] = value
    },
    setSearch(search: TransactionFilterFieldSearch) {
      this.filters.search = search
    },
  }
})
