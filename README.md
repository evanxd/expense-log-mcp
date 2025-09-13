# Expense Log MCP

An SSE-based MCP server providing tools for logging expenses.

## ✨ Features

- Log a new expense to a ledger.
- Delete an expense record.
- Retrieve a list of all available expense categories.
- Retrieve and group expenses by payer and category.

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
    - **Add server configuration to your `.env` file:**
      ```
      MCP_SECRET_KEY="YOUR_SECRET_KEY" # A strong, unique key for authenticating with the MCP server
      PORT="8080" # The port the MCP server will listen on (default is 8080)
      ```
    - Apply the database schema:
      ```bash
      npx prisma db push
      ```
    - Seed the database with initial categories:
      ```bash
      npm run db:seed
      ```

4.  **Build and start the server:**
    ```bash
    npm run build && npm start
    ```
    This command compiles the TypeScript code and then starts the server, which will listen for incoming requests on the specified `PORT` (defaulting to 8080).

5.  **Configure your MCP host (e.g., Gemini CLI):**
    - Add the following configuration to your Gemini CLI settings (typically found in `~/.gemini-cli/config.json` or similar, depending on your OS):
    ```json
    "mcpServers": {
      "expense-log-mcp": {
        "url": "http://localhost:8080/sse",
        "headers": {
          "Authorization": "Bearer YOUR_SECRET_KEY"
        }
      }
    }
    ```
    **Important:** Replace `YOUR_SECRET_KEY` with the actual `MCP_SECRET_KEY` you set in your `.env` file. This tells the Gemini CLI how to connect to and authenticate with your locally running Expense Log MCP server.

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

### `getGroupedExpenses`

Retrieves and groups expenses by payer and then by category name, returning the total amount for each category,
with optional filters for category IDs, payer, and a date range.

**Parameters:**

| Name          | Type     | Description                                                        |
|---------------|----------|--------------------------------------------------------------------|
| `ledgerId`    | string   | The ID of the ledger to retrieve expenses from.                    |
| `categoryIds` | string[] | Optional. An array of category IDs to filter by.                   |
| `payer`       | string   | Optional. The name of the payer to filter by.                      |
| `startDate`   | string   | Optional. The start date for filtering expenses (ISO 8601 format). |
| `endDate`     | string   | Optional. The end date for filtering expenses (ISO 8601 format).   |

**Returns:**

A JSON string containing the grouped expenses, e.g.:
```json
{
  "success": true,
  "code": "OK",
  "message": "Grouped expenses retrieved successfully.",
  "data": {
    "Payer1": {
      "expenseCategories": {
        "Entertainment": 100,
        "Transportation": 50
      },
      "totalAmount": 150
    },
    "Payer2": {
      "expenseCategories": {
        "Dining/Snacks": 75
      },
      "totalAmount": 75
    }
  }
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
