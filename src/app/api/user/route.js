export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  return new Response(JSON.stringify({
    success: true,
    message: `User ID is ${userId}`
}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}