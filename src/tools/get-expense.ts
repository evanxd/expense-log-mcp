import { z } from "zod";

import prisma from "../db.js";
import { errorResponse, getErrorMessage, successResponse } from "../utils.js";

const getExpenseParameters = z.object({
  ledgerId: z.string(),
  messageId: z.string(),
});

type GetExpenseParameters = z.infer<typeof getExpenseParameters>;

export const getExpense = {
  name: "getExpense",
  description: "Get the details of a specific expense.",
  parameters: getExpenseParameters,
  execute: async ({
    ledgerId,
    messageId,
  }: GetExpenseParameters): Promise<
    ReturnType<typeof successResponse> | ReturnType<typeof errorResponse>
  > => {
    try {
      if (!ledgerId || !messageId) {
        return errorResponse(
          "INVALID_INPUT",
          "To get an expense, both `ledgerId` and `messageId` must be provided.",
        );
      }

      const expense = await prisma.expense.findUnique({
        where: { ledgerId_messageId: { ledgerId, messageId } },
      });
      if (!expense) {
        return errorResponse("NOT_FOUND", "Expense not found.");
      }

      return successResponse("Expense retrieved successfully.", {
        ...expense,
        createdAt: expense.createdAt.toISOString(),
        updatedAt: expense.updatedAt.toISOString(),
      });
    } catch (e: unknown) {
      return errorResponse("DATABSAE_ERROR", getErrorMessage(e));
    }
  },
};
