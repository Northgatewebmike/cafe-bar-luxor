import { createApp } from "../server/app";

// Vercel recognizes this default Express export as a Node.js serverless function.
// All backend routes continue to run under /api/* via vercel.json rewrites.
export default createApp();
