export async function GET(req, res) {
    console.log(req);
  return new Response("Hello, Next.js!");
}

export async function POST(req, res) {
  return new Response("Hello, Next.js!");
}