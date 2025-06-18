import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { type } from "os";
import { z } from "zod";
import { KiteConnect } from "kiteconnect";
import { placeOrder } from './trade.js';

const server = new McpServer({
  name: "trade",
  version: "1.0.0"
});

server.tool("buy-stock",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    console.log(`Claude requested BUY: ${stock} x ${qty}`);
    const result = await placeOrder(stock, qty, "BUY");

    if (!result.success) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to buy ${stock}:\n${result.content[0].text}`
          }
        ]
      };
    }

    console.log(result.content);

    return {
      content: result.content
    };
  }
);

server.tool("sell-stock",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    console.log(`Claude requested SELL: ${stock} x ${qty}`);
    const result = await placeOrder(stock, qty, "SELL");

    if (!result.success) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to sell ${stock}:\n${result.content[0].text}`
          }
        ]
      };
    }

    console.log(result.content);

    return {
      content: result.content
    };
  }
);

// server.tool("show-portfolio",
//   { },
//   async () => {
//     return {
//       content: await getPositions(),
//     };
//   }
// );


// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
console.log("Starting MCP server...");
await server.connect(transport);
console.log("MCP Server connected to Claude.");
