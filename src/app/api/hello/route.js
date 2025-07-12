export async function GET(req) {
    const resData = { message: "Hello, World!"};

    return new Response(JSON.stringify(resData), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}