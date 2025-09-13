import prisma from "../db.js";
import { successResponse, errorResponse, getErrorMessage } from "../utils.js"

export const getExpenseCategories = {
  name: "getExpenseCategories",
  description: "Get the list of expense categories.",
  execute: async (): Promise<ReturnType<typeof successResponse> | ReturnType<typeof errorResponse>> => {
    try {
      const categories = await prisma.expenseCategory.findMany();
      const categoryData = categories.map(category => ({
        expenseCategoryId: category.id,
        expenseCategoryName: category.name,
      }));
      return successResponse("Expense categories retrieved successfully.", categoryData);
    } catch (e: unknown) {
      return errorResponse("DATABSAE_ERROR", getErrorMessage(e));
    }
  }
};
