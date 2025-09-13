import { z } from "zod";
import prisma from "../db.js";
import { successResponse, errorResponse, getErrorMessage } from "../utils.js";

const addExpenseParameters = z.object({
  ledgerId: z.string(),
  categoryId: z.string(),
  messageId: z.string(),
  description: z.string(),
  amount: z.number(),
  payer: z.string(),
});

type AddExpenseParameters = z.infer<typeof addExpenseParameters>;

export const addExpense = {
  name: "addExpense",
  description: "Add a new expense.",
  parameters: addExpenseParameters,
  execute: async ({
    ledgerId,
    categoryId,
    messageId,
    description,
    amount,
    payer
  }: AddExpenseParameters): Promise<ReturnType<typeof successResponse> | ReturnType<typeof errorResponse>> => {
    try {
      await prisma.ledger.upsert({
        where: { id: ledgerId },
        update: {},
        create: { id: ledgerId, name: ledgerId },
      });
      const expense = await prisma.expense.create({
        data: {
          ledgerId,
          categoryId,
          messageId,
          description,
          amount,
          payer,
        },
      });
      return successResponse("Expense added successfully.", { expenseId: expense.id });
    } catch (e: unknown) {
      return errorResponse("DATABASE_ERROR", getErrorMessage(e));
    }
  },
};
