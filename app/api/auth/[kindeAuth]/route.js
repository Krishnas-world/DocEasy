// pages/api/auth/[kindeAuth].js
import { handleAuth, handleCallback } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(request, { params }) {
  const endpoint = params.kindeAuth;
  
  if (endpoint === 'kinde_callback') {
    return await handleCallback(request, (req, res, tokenSet) => {
      // Process the token set and perform any necessary actions (e.g., save user info)
      res.redirect('/dashboard'); // Redirect to your desired page after successful login
    });
  }

  return await handleAuth(request, endpoint);
}
