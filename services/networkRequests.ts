import type {Account, Bank, Category, TransactionFilterFields} from "~/interfaces";
import { Transaction } from "~/interfaces";

class Api {
    static get = (url: string) => {
        return fetch(url) as Promise<any>
    }

    static post = (url: string, params: Record<string, any> | null = null) => {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(params)
        }) as Promise<any>
    }
}

export const loadTransactions = async (filter: TransactionFilterFields): Promise<Transaction[]> => {
    return await Api.post('./api/getTransactions', filter)
      .then(response => response.json())
}
export const loadAccounts = async (): Promise<Account[]> => {
    return await Api.get('./api/getAccounts')
      .then(response => response.json())
}

export const loadBanks = async (): Promise<Bank[]> => {
    return await Api.get('./api/getBanks')
      .then(response => response.json())
}
export const loadCategories = async (): Promise<Category[]> => {
    return await Api.get('./api/getCategories')
      .then(response => response.json())
}
