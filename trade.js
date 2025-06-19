import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const requestToken = process.env.REQUEST_TOKEN;
let accessToken = process.env.ACCESS_TOKEN;

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);

export async function placeOrder(tradingsymbol, quantity, type) {
  try {
    const orderDetails = await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET"
    });

    return {
      success: true,
      content: [
        { 
          type: "text", 
          text: `Order placed successfully!\nOrder ID: ${orderDetails.order_id}\nSymbol: ${tradingsymbol}\nQty: ${quantity}\nType: ${type}`
        }
      ]
    };
  } catch (err) {
      
    const errorMessage = err.message || String(err);
    let userMessage = "Order failed.";
    if (errorMessage.includes("market is closed")) {
      userMessage = "Market is currently closed. Try again during trading hours.";
    } else if (errorMessage.includes("Invalid")) {
      userMessage = "Invalid stock symbol or quantity.";
    } else if (errorMessage.includes("margin")) {
      userMessage = "Insufficient margin for this trade.";
    }

    return {
      success: false,
      content: [
        {
          type: "text",
          text: `${userMessage}\nError: ${errorMessage}`
        }
      ]
    };
  };
};

async function init() {
  try {
    // await generateSession();
    // await getProfile();
    await placeOrder();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    console.log(response.access_token);
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

console.log(kc.getLoginURL());
init();
