#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { addExpense } from "./tools/add-expense.js";
import { deleteExpense } from "./tools/delete-expense.js";
import { getExpenseCategories } from "./tools/get-expense-categories.js";

const server = new FastMCP({
  name: "Expense Logging MCP Server",
  version: "1.0.0",
});

server.addTool(getExpenseCategories);
server.addTool(addExpense);
server.addTool(deleteExpense);

server.start({ transportType: "stdio" });
