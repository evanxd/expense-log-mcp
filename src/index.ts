import { FastMCP } from "fastmcp";
import dotenv from "dotenv";

import { generateId } from "./utils.js" 
import { addExpense } from "./tools/add-expense.js";
import { deleteExpense } from "./tools/delete-expense.js";
import { getExpense } from "./tools/get-expense.js";
import { getGroupedExpenses } from "./tools/get-grouped-expenses.js";
import { getExpenseCategories } from "./tools/get-expense-categories.js";

dotenv.config();

const server = new FastMCP({
  name: "Expense Logging MCP Server",
  version: "1.0.10",
  authenticate: async (req) => {
    const auth = req.headers["authorization"];
    if (auth !== `Bearer ${process.env.MCP_SECRET_KEY}`) {
      throw new Response(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
    return {
      id: generateId(),
      authenticatedAt: new Date().toISOString(),
    }
  },
});

server.addTool(addExpense);
server.addTool(deleteExpense);
server.addTool(getExpense);
server.addTool(getExpenseCategories);
server.addTool(getGroupedExpenses);

server.start({
  transportType: "httpStream",
  httpStream: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 8080,
  },
});
