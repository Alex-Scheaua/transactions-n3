import {getAccounts} from "~/prisma/queries/accounts";

export default defineEventHandler((event) => {
  return getAccounts()
})
