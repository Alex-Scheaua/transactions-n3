import {getBanks} from "~/prisma/queries/accounts";

export default defineEventHandler((event) => {
  return getBanks()
})
