import { verifyToken } from "@/lib/authMiddleware";

export async function GET(req) {
  const user = verifyToken(req);

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({
    success: true,
    message: `Hello, protected user with ID: ${user.id}`
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
