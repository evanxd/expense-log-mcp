import prisma from "../db.js";

export const getExpenseCategories = {
  name: "getExpenseCategories",
  description: "Get the list of expense categories.",
  execute: async (): Promise<string> => {
    const categories = await prisma.expenseCategory.findMany();
    const categoryData = categories.map(category => ({
      expenseCategoryId: category.id,
      expenseCategoryName: category.name,
    }));
    return JSON.stringify(categoryData);
  }
};
