# Expense Log MCP

A MCP server that provides tools for logging expenses.

## ✨ Features

- Log a new expense to a ledger.
- Delete an expense record.
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
    - Seed the database with initial categories:
      ```bash
      npm run db:seed
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
        ],
        "env": {
          "DATABASE_URL": "postgresql://postgres:YOUR_DB_PASSWORD@localhost:5432/postgres?schema=public"
        }
      }
    }
    ```

## 🛠️ Tools

The server exposes the following tools:

### `addExpense`

Adds a new expense record.

**Parameters:**

| Name          | Type   | Description                                        |
|---------------|--------|----------------------------------------------------|
| `ledgerId`    | string | The ID of the ledger to add the expense to.        |
| `categoryId`  | string | The ID of the expense category.                    |
| `messageId`   | string | A unique ID for the message to prevent duplicates. |
| `description` | string | A description of the expense.                      |
| `amount`      | number | The amount of the expense.                         |
| `payer`       | string | The name of the person who paid.                   |

**Returns:**

A JSON string confirming the expense has been added, e.g.:
```json
{
  "success": true,
  "code": "OK",
  "message": "Expense added successfully.",
  "data": {
    "expenseId": "clx...456"
  }
}
```

### `deleteExpense`

Deletes an expense record.

**Parameters:**

| Name        | Type   | Description                                         |
|-------------|--------|-----------------------------------------------------|
| `ledgerId`  | string | The ID of the ledger the expense belongs to.        |
| `messageId` | string | The unique message ID of the expense to be deleted. |

**Returns:**

A JSON string confirming the expense has been deleted, and including details of the deleted expense, e.g.:
```json
{
  "success": true,
  "code": "OK",
  "message": "Expense deleted successfully.",
  "data": {
    "id": "clx...123",
    "description": "Lunch",
    "amount": 15.75,
    "createdAt": "Sun Sep 07 2025"
  }
}
```

### `getExpenseCategories`

Retrieves the list of all expense categories.

**Parameters:**

None.

**Returns:**

A JSON string containing the list of expense categories, e.g.:
```json
{
  "success": true,
  "code": "OK",
  "message": "Expense categories retrieved successfully.",
  "data": [
    {
      "expenseCategoryId": "clx...1",
      "expenseCategoryName": "Transportation"
    },
    {
      "expenseCategoryId": "clx...2",
      "expenseCategoryName": "Utilities"
    }
  ]
}
```

## 🗄️ Database Schema

This project uses Prisma to manage the database schema. The schema is defined in `prisma/schema.prisma` and includes the following models:

- `Ledger`: Represents a collection of expenses.
- `ExpenseCategory`: Represents a category for an expense.
- `Expense`: Represents a single expense record. A unique constraint is added on `ledgerId` and `messageId` to prevent duplicate expenses.

All models include `createdAt` and `updatedAt` timestamps. IDs are generated using `cuid()`.

## 🙌 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
