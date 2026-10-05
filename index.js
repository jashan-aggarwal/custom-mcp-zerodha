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
  { stock: z.string().trim().min(1), qty: z.number().int().positive().max(10) },
  async ({ stock, qty }) => {
    console.error(`Claude requested BUY: ${stock} x ${qty}`);
    const result = await placeOrder(stock, qty, "BUY");

    if (!result.success) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to buy ${stock}:\n${result.content[0].text}`
          }
        ]
      };
    }

    console.error(result.content);

    return {
      content: result.content
    };
  }
);

server.tool("sell-stock",
  { stock: z.string().trim().min(1), qty: z.number().int().positive().max(10) },
  async ({ stock, qty }) => {
    console.error(`Claude requested SELL: ${stock} x ${qty}`);
    const result = await placeOrder(stock, qty, "SELL");

    if (!result.success) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to sell ${stock}:\n${result.content[0].text}`
          }
        ]
      };
    }

    console.error(result.content);

    return {
      content: result.content
    };
  }
);

const transport = new StdioServerTransport();
console.error("Starting MCP server...");
await server.connect(transport);
console.error("MCP Server connected to Claude.");
