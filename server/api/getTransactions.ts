import {getTransactions} from "~/prisma/queries/transactions";

export default defineEventHandler(async (event) => {
  const filters = await readBody(event);

  return getTransactions(filters)
})
