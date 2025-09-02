#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { getExpenseCategories } from "./tools/get-expense-categories.js";
import { addExpense } from "./tools/add-expense.js";

const server = new FastMCP({
  name: "Expense Logging MCP Server",
  version: "1.0.0",
});

server.addTool(getExpenseCategories);
server.addTool(addExpense);

server.start({ transportType: "stdio" });
