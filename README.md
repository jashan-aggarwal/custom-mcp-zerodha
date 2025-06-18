# custom-mcp-zerodha

This is a basic integration of Zerodha's Kite API using custom tools built with the Model Context Protocol (MCP). The project includes simple buy and sell stock commands that can be triggered through the MCP interface.

## Features

- Buy stocks using `buy-stock` tool  
- Sell stocks using `sell-stock` tool  
- Handles basic error cases like market timing, invalid symbols, and margin issues  
- Uses `dotenv` for secure environment configuration  
- Designed to work with Claude or other MCP-compatible agents  

## Tools

- `buy-stock`: Place a market order to buy a stock  
- `sell-stock`: Place a market order to sell a stock  

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

- You can generate your `request_token` by logging in through the URL printed in the terminal when you run the project.
- Use the `generateSession()` function in `trade.js` to get your access token if you haven’t already.

### 4. Run the server

You should see:
```
Starting MCP server...
MCP Server connected to Claude.
```

The server is now ready to accept commands via MCP-compatible interfaces.

## File Structure

- `index.js`: Sets up the MCP server and tools  
- `trade.js`: Contains the logic to place buy/sell orders via Kite Connect  
- `package.json`: Lists dependencies  

## Notes

- This is a basic prototype meant for learning and experimentation.  
- It doesn't implement full account management or session refresh logic.  

## License

MIT — free to use, modify, and share.
