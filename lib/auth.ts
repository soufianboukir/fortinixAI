import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { type NextAuthOptions } from "next-auth";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import { sendWelcomeEmail } from "./mail";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongo";
import Email from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url }) => {
        try {
          await sendWelcomeEmail({
            to: identifier,
            name: identifier.split("@")[0],
            magicLink: url,
          });
        } catch {
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await dbConnection();

      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          name: user.name ?? user.email?.split("@")[0],
          email: user.email,
          username: user.email?.split("@")[0],
          image: user.image,
          role: "user",
        });

        await sendWelcomeEmail({ to: user.email!, name: user.name ?? user.email });
      }

      user.id = dbUser._id.toString();
      user.username = dbUser.username;

      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.username = user.username;
      }
      if (trigger === "update" || token.email) {
        await dbConnection();
        const dbUser = await User.findOne({ email: token.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
          token.username = dbUser.username;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.username = token.username;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
