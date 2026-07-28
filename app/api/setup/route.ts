import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check if the admin already exists (we just use a static email for the initial admin)
    const email = "admin@ifaboru.edu.et";
    const password = "password123";
    const name = "Super Admin";

    // Since Better Auth doesn't have a direct 'check user' in the basic adapter without using db,
    // we'll just try to create and catch if it already exists, or we use db directly.
    const { db } = await import("@/lib/db");
    const existing = await db.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ message: "Admin already exists", email, password: "password123 (or whatever you changed it to)" });
    }

    // Creating the user via Better Auth's credential provider 
    // requires a POST to the auth API normally, but we can't easily call the client here.
    // Instead, Better Auth encrypts passwords using bcrypt or standard hashes. 
    // To make it fully compatible, we should use the built-in auth API.

    // Setup HTML page for admin creation
    
    return new NextResponse(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h1>Setup Admin</h1>
          <p>Since this is a development environment, you can quickly create your admin account below.</p>
          <form id="setup-form">
            <input type="email" id="email" value="admin@ifaboru.edu.et" required /><br/><br/>
            <input type="text" id="name" value="Super Admin" required /><br/><br/>
            <input type="password" id="password" value="password123" required /><br/><br/>
            <button type="submit">Create Admin Account</button>
          </form>
          <div id="result" style="margin-top: 1rem; color: green;"></div>
          
          <script>
            document.getElementById('setup-form').addEventListener('submit', async (e) => {
              e.preventDefault();
              const email = document.getElementById('email').value;
              const name = document.getElementById('name').value;
              const password = document.getElementById('password').value;
              
              const res = await fetch('/api/auth/sign-up/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, password })
              });
              
              if (res.ok) {
                document.getElementById('result').innerText = "Success! You can now login at /login";
                setTimeout(() => window.location.href = '/login', 2000);
              } else {
                const data = await res.json();
                document.getElementById('result').innerText = "Error: " + JSON.stringify(data);
                document.getElementById('result').style.color = 'red';
              }
            });
          </script>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
