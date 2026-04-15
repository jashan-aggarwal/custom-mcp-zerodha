# custom-mcp-zerodha
This is a basic integration of Zerodha's Kite API using custom tools built with the Model Context Protocol (MCP). The project includes simple buy and sell stock commands that can be triggered through Claude Desktop.

## Features
- Buy stocks using `buy-stock` tool  
- Sell stocks using `sell-stock` tool  
- Uses `dotenv` for secure environment configuration  
- Designed to work with Claude Desktop via MCP

## Tools
- `buy-stock`: Place a market buy order on NSE for a given stock and quantity
- `sell-stock`: Place a market sell order on NSE for a given stock and quantity

## Getting Started

### 1. Clone the repo

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following:
```
API_KEY=your_kite_api_key
API_SECRET=your_kite_api_secret
REQUEST_TOKEN=your_generated_request_token
ACCESS_TOKEN=your_access_token
```
- Generate your `REQUEST_TOKEN` from the Kite login URL printed in the terminal on startup.
- Use `generateSession()` in `trade.js` to exchange it for your `ACCESS_TOKEN`.

### 4. Connect to Claude Desktop
Add this to your `claude_desktop_config.json` and restart Claude Desktop:
```json
{
  "mcpServers": {
    "trade": {
      "command": "node",
      "args": ["/absolute/path/to/index.js"]
    }
  }
}
```

### 5. Run the server
You should see:
```
Starting MCP server...
MCP Server connected to Claude.
```

## File Structure
- `index.js`: Sets up the MCP server and tools  
- `trade.js`: Contains the logic to place buy/sell orders via Kite Connect  
- `package.json`: Lists dependencies  

## Warning
This places **real orders** on your Zerodha account. Use carefully.

## Notes
- This is a basic prototype meant for learning and experimentation.  
- It doesn't implement full account management or session refresh logic.
