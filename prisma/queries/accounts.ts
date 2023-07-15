import {prisma} from "../prismaClient.js";

type Id = string
interface Account {
    id: Id
    name: string
    bank: string
}

export const getAccounts = () => {
    return prisma.account.findMany()
}

export const getBanks = async () => {
    const accounts = await prisma.account.findMany()
    const banks = <{[key: string]: string[]}>{}

    accounts.forEach((account:Account) => {
        if(banks[account.bank]) {
            banks[account.bank].push(account.id)
        } else {
            banks[account.bank] = [account.id]
        }
    })
    return Object.keys(banks).map((key: string) => ({
        name: key,
        ids: banks[key]
    }))
}