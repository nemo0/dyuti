import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "./connectDB";
import { UserModel } from "@/models/user";

export const nextauthOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const dbUser = await UserModel.findOne({ email: user.email });

      if (!dbUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
        });
      }

      return true;
    },
    async session({ session, token }: { session: Session; token: any }) {
      // Add property to session, like an access_token from a provider.
      if (token && session) {
        await connectDB();
        const user = await UserModel.findOne({ email: token.email });

        session.user.id = user?._id;
      }
      return session;
    },
  },
};
