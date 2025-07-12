export async function GET(req,{ params}){
    const userId = params.id;
    return new Response(JSON.stringify({
        success: true,
        message: `User ID is ${userId}`
    }),{
        status: 200,
        headers: { 'Content-Type': 'application/json' } 
    });
}