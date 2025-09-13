import { FastMCP } from "fastmcp";
import { addExpense } from "./tools/add-expense.js";
import { deleteExpense } from "./tools/delete-expense.js";
import { getGroupedExpenses } from "./tools/get-grouped-expenses.js";
import { getExpenseCategories } from "./tools/get-expense-categories.js";

const server = new FastMCP({
  name: "Expense Logging MCP Server",
  version: "1.0.10"
});

server.addTool(addExpense);
server.addTool(deleteExpense);
server.addTool(getExpenseCategories);
server.addTool(getGroupedExpenses);

server.start({ transportType: "httpStream" });
