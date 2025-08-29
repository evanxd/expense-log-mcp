import { z } from "zod";
import prisma from "../db.js";

const addExpenseParameters = z.object({
  ledgerId: z.string(),
  categoryId: z.number(),
  description: z.string(),
  amount: z.number(),
  payer: z.string(),
});

type AddExpenseParameters = z.infer<typeof addExpenseParameters>;

export const addExpense = {
  name: "addExpense",
  description: "Add a new expense.",
  parameters: addExpenseParameters,
  execute: async ({ ledgerId, categoryId, description, amount, payer }: AddExpenseParameters): Promise<string> => {
    await prisma.ledger.upsert({
      where: { id: ledgerId },
      update: {},
      create: { id: ledgerId, name: ledgerId },
    });
    const expense = await prisma.expense.create({
      data: {
        ledgerId,
        categoryId,
        description,
        amount,
        payer,
      },
    });
    return `Expense added with id: ${expense.id}`;
  },
};
