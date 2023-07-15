import { prisma } from "../prismaClient.js";
export const getCategories = () => {
    return prisma.category.findMany()
}