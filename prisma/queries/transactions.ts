import { prisma } from "../prismaClient.js";
import { Prisma } from "@prisma/client";

type Id = string
export interface TransactionFilterFields {
    search: {
        string: string,
        filteredAccounts: Id[]
        filteredBanks: Id[]
        filteredCategories: Id[]
    }
    banks: Id[]
    account: Id
    startDate?: Date | null
    endDate?: Date | null
    sort: 'desc' | 'asc'
    cursor: Id
}

const generateQuery = (filters: TransactionFilterFields) => {
    const AND = []
    const OR = []

    if(filters.search.string) {
        OR.push({id: {equals: filters.search.string}})
        OR.push({reference: {contains: filters.search.string, mode: 'insensitive'}})
        if(Number(filters.search.string)) {
            OR.push({amount: {equals: parseFloat(filters.search.string)}})
        }
    }
    if(filters.search.filteredBanks.length || filters.search.filteredAccounts.length) {
        OR.push({accountId: {in: [...filters.search.filteredBanks, ...filters.search.filteredAccounts]}})
    }
    if(filters.search.filteredCategories.length) {
        OR.push({categoryId: {in: filters.search.filteredCategories}})
    }

    if(OR.length) {
        AND.push({OR} as Prisma.TransactionWhereInput)
    }

    if(filters.banks.length) {
        AND.push({accountId: {in: filters.banks}})
    }

    if(filters.account) {
        AND.push({accountId: filters.account})
    }

    if(filters.startDate) {
        AND.push({date: {gt: new Date(filters.startDate)}})
    }

    if(filters.endDate) {
        AND.push({date: {lt: new Date(filters.endDate)}})
    }
    return {where: { AND }}
}

export const getTransactions = (filters: TransactionFilterFields) => {
    return prisma.transaction.findMany({
        take: 20,
        cursor: filters.cursor ? {id: filters.cursor} : undefined,
        skip: filters.cursor ? 1 : 0,
        orderBy: {
            date: filters.sort
        },
        ...generateQuery(filters)
    })
}
