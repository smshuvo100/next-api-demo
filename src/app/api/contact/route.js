// export async function POST(req) {
//     const body = await req.json();
//     const { name, email } = body;

//     return new Response(
//         JSON.stringify({
//             message: `Hello ${name}, we will contact you at ${email} soon!`
//         }),
//         {
//             status: 200,
//             headers: {'Content-Type': 'application/json'}
//         }
//     );
// }
import { connectToDB } from "@/lib/mongoose";
import Contact from "@/models/Contact";
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // required fields validation
    if (!name || !email) {
      return new Response(
        JSON.stringify({
          error: "Name and email are required fields.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // email format validation
    if (!email.includes("@")) {
      return new Response(
        JSON.stringify({
          error: "Invalid email format.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    await connectToDB();

    const contact = await Contact.create({ name, email });
    // all good
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

//
