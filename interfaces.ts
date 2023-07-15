export type Id = string
export interface Transaction {
  id: Id
  accountId: Id
  categoryId: Id
  reference: string
  amount: number
  currency: 'EUR' | 'GBP'
  date: Date
}

export interface TransactionFilterFields {
    search: TransactionFilterFieldSearch
    banks: string[]
    bank: string,
    account: string
    startDate?: Date
    endDate?: Date
    sort: string
    cursor?: Id
}

export interface TransactionFilterFieldSearch {
    string: string,
    filteredAccounts: Id[]
    filteredBanks: Id[]
    filteredCategories: Id[]
}

export interface Category {
    id: Id
    name: string
    color: string
}

export interface Account {
    id: Id
    name: string
    bank: string
}

export interface Bank {
    name: string
    ids: Id[]
}
