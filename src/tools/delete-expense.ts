import { z } from "zod";
import prisma from "../db.js";
import { successResponse, errorResponse, getErrorMessage } from "../utils.js";

const deleteExpenseParameters = z.object({
  ledgerId: z.string(),
  messageId: z.string(),
});

type DeleteExpenseParameters = z.infer<typeof deleteExpenseParameters>;

export const deleteExpense = {
  name: "deleteExpense",
  description: "Delete a certain expense.",
  parameters: deleteExpenseParameters,
  execute: async ({ ledgerId, messageId }: DeleteExpenseParameters):
    Promise<ReturnType<typeof successResponse> | ReturnType<typeof errorResponse>> => {
    try {
      const expense = await prisma.expense.delete({
        where: { ledgerId_messageId: { ledgerId, messageId } },
      });

      const { id, description, amount, createdAt } = expense;
      return successResponse("Expense deleted successfully.", {
        id,
        description,
        amount,
        createdAt: createdAt.toDateString(),
      });
    } catch (e: unknown) {
      return errorResponse("DATABASE_ERROR", getErrorMessage(e));
    }
  },
};
