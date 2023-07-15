import {getCategories} from "~/prisma/queries/categories";

export default defineEventHandler((event) => {
  return getCategories()
})
