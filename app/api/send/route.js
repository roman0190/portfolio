import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, subject, message } = body;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["21-45129-2@student.aiub.edu"],
      subject: "Client Message",
      react: (
        <div>
          <p>{email}</p>
          <h1 className="text-red-500">{subject}</h1>
          <p className="text-green-400">{message}</p>
        </div>
      ),
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
