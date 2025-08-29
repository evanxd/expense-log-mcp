# Expense Log MCP

A MCP server that provides tools for logging expenses.

## ✨ Features

- Log a new expense to a ledger.
- Retrieve a list of all available expense categories.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- A [PostgreSQL](https://www.postgresql.org/) database

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/evanxd/expense-log-mcp.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    - Create a `.env` file in the root of the project.
    - Add your PostgreSQL connection string to the `.env` file:
      ```
      DB_USER="postgres"
      DB_HOST="localhost"
      DB_PORT="5432"
      DB_DATABASE="postgres"
      DB_PASSWORD="YOUR_DB_PASSWORD"
      DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"
      ```
    - Apply the database schema:
      ```bash
      npx prisma db push
      ```

4.  **Build the project:**
    ```bash
    npm run build
    ```

5.  **Set up the MCP server:**
    - Add the following configuration to your MCP host (e.g., Gemini CLI) settings:
    ```json
    "mcpServers": {
      "expense-log-mcp": {
        "command": "node",
        "args": [
          "/path/to/expense-log-mcp/dist/index.js"
        ]
      }
    }
    ```

## 🛠️ Tools

The server exposes the following tools:

### `addExpense`

Adds a new expense record.

**Parameters:**

| Name          | Type   | Description                               |
|---------------|--------|-------------------------------------------|
| `ledgerId`    | string | The ID of the ledger to add the expense to. |
| `categoryId`  | number | The ID of the expense category.           |
| `description` | string | A description of the expense.             |
| `amount`      | number | The amount of the expense.                |
| `payer`       | string | The name of the person who paid.          |

**Returns:**

A string confirming the expense has been added, e.g., `Expense added with id: 123`.

### `getExpenseCategories`

Retrieves the list of all expense categories.

**Parameters:**

None.

**Returns:**

A JSON string representing an array of category objects, e.g.:
```json
[
  {
    "expenseCategoryId": 1,
    "expenseCategoryName": "Groceries"
  },
  {
    "expenseCategoryId": 2,
    "expenseCategoryName": "Utilities"
  }
]
```

## 🗄️ Database Schema

This project uses Prisma to manage the database schema. The schema is defined in `prisma/schema.prisma` and includes the following models:

- `Ledger`: Represents a collection of expenses.
- `ExpenseCategory`: Represents a category for an expense.
- `Expense`: Represents a single expense record.

## 🙌 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
