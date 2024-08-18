export async function GET(req, res) {
    console.log("request:", req);
  return new Response("Hello, Next.js!");
}

export async function POST(req, res) {
  return new Response("Hello, Next.js!");
}