import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
require("dotenv").config();

const credentials = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    const { username, password } = credentials;

    // Check if the request is for sign-up or login
    const isSignUp = !!credentials.name;

    try {
      const response = await fetch(
        isSignUp
          ? "https://code-exchange-backend.vercel.app/signup"
          : "https://code-exchange-backend.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            name: isSignUp ? credentials.name : undefined,
          }),
        }
      );
      const data = await response.json();

      if (data.success && data.id && data.name) {
        return { id: data.id, name: data.name };
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      throw new Error(errorMessage);
    }
  },
});

const google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.NEXTAUTH_URL, 
});

const github = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

export const authOptions = {
  providers: [
    google,
    github,
    credentials,
    /* Add other providers here */
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async (account) => {
      if (account.account.provider === "google") {
        const { email, name } = account.profile;
        const response = await fetch(
          "https://code-exchange-backend.vercel.app/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name, password: email + name }),
          }
        );
        const data = await response.json();
        if (data.success && data.id && data.name) {
          account.user.id = data.id;
          return account;
        }
        const response2 = await fetch(
          "https://code-exchange-backend.vercel.app/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: name,
              password: email + name,
              name: name,
            }),
          }
        );
        const data2 = await response2.json();
        if (data2.success && data2.id && data2.name) {
          account.user.id = data2.id;
          return account;
        }
        return false;
      } else {
        if (account.account.provider === "github") {
          const { login, node_id, name } = account.profile;
          const response = await fetch(
            "https://code-exchange-backend.vercel.app/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: name,
                password: login + name + node_id,
              }),
            }
          );
          const data = await response.json();
          if (data.success && data.id && data.name) {
            account.user.id = data.id;
            return account;
          }
          const response2 = await fetch(
            "https://code-exchange-backend.vercel.app/signup",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: name,
                password: login + name + node_id,
                name: name,
              }),
            }
          );
          const data2 = await response2.json();
          if (data2.success && data2.id && data2.name) {
            account.user.id = data2.id;
            return account;
          }
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
