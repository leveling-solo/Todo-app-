import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { Connect } from "@/dbconnect/connect";
import User from "@/Models/userModels";
import crypto from "crypto";

const generateRandomPassword: () => string = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

Connect();
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }): Promise<boolean> {
      const existingUser: any = await User.findOne({
        email: user.email,
      });
      if (!existingUser) {
        const newUser = new User({
          username: user.name,
          email: user.email,
          image: user.image,
          password: generateRandomPassword(), // Ensure password is unique
        });
        await newUser.save();
      }
      return true;
    },
    async session({ session }: { session: any }): Promise<any> {
      await Connect();
      const dbUser: any = await User.findOne({ email: session.user.email });
      session.user.id = dbUser._id;
      return session;
    },
  },
};
