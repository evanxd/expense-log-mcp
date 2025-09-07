import { z } from "zod";
import prisma from "../db.js";
import { successResponse, errorResponse, getErrorMessage } from "./utils.js";
import { Prisma } from "@prisma/client";

const getGroupedExpensesParameters = z.object({
  ledgerId: z.string(),
  categoryIds: z.array(z.string()).optional(),
  payer: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type GetGroupedExpensesParameters = z.infer<typeof getGroupedExpensesParameters>;

export const getGroupedExpenses = {
  name: "getGroupedExpenses",
  description: `Retrieves and groups expenses by payer and category, showing total amounts,
    with optional filters for category IDs, payer, and date range (ISO 8601 format).`,
  parameters: getGroupedExpensesParameters,
  execute: async (
    { ledgerId, categoryIds, payer, startDate, endDate }: GetGroupedExpensesParameters
  ): Promise<ReturnType<typeof successResponse> | ReturnType<typeof errorResponse>> => {
    try {
      const where = buildWhereFilter(ledgerId, categoryIds, payer, startDate, endDate);
      const expenses = await prisma.expense.findMany({ where });

      const categories = await prisma.expenseCategory.findMany();
      const categoryMap = new Map<string, string>();
      categories.forEach(category => {
        categoryMap.set(category.id, category.name);
      });

      const groupedExpenses = groupExpenses(expenses, categoryMap);
      return successResponse("Grouped expenses retrieved successfully.", groupedExpenses);
    } catch (e: unknown) {
      return errorResponse("DATABSAE_ERROR", getErrorMessage(e));
    }
  }
};

function buildWhereFilter(
  ledgerId: string,
  categoryIds?: string[],
  payer?: string,
  startDate?: string,
  endDate?: string
): Prisma.ExpenseWhereInput {
  const where: Prisma.ExpenseWhereInput = {};

  where.ledgerId = ledgerId;

  if (categoryIds && categoryIds.length > 0) {
    where.categoryId = { in: categoryIds };
  }

  if (payer) {
    where.payer = payer;
  }

  if (!startDate && !endDate) {
    const now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  }

  where.createdAt = {};
  if (startDate) {
    where.createdAt.gte = new Date(startDate);
  }
  if (endDate) {
    where.createdAt.lte = new Date(endDate);
  }

  return where;
}

function groupExpenses(
  expenses: { payer: string; categoryId: string; amount: number }[],
  categoryMap: Map<string, string>
): Record<string, { expenseCategories: Record<string, number>, totalAmount: number }> {
  return expenses.reduce((acc, expense) => {
    const payer = expense.payer;
    const categoryId = expense.categoryId;
    const categoryName = categoryMap.get(categoryId) || 'Unknown Category';

    if (!acc[payer]) {
      acc[payer] = { expenseCategories: {}, totalAmount: 0 };
    }

    if (!acc[payer].expenseCategories[categoryName]) {
      acc[payer].expenseCategories[categoryName] = 0;
    }

    acc[payer].expenseCategories[categoryName] += expense.amount;
    acc[payer].totalAmount += expense.amount;

    return acc;
  }, {} as Record<string, { expenseCategories: Record<string, number>, totalAmount: number }>);
}
