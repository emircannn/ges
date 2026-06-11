import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "E-posta", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Lütfen e-posta adresinizi ve şifrenizi girin.");
        }

        const email = credentials.username.trim().toLowerCase();
        const password = credentials.password.trim();

        // Mock login with flexible check for demo purposes
        if (
          (email === "admin@admin.com" || email === "admin") &&
          (password === "admin123" || password === "admin")
        ) {
          return {
            id: "1",
            name: "admin",
            email: "admin@admin.com",
            role: "ADMIN",
            manageBlogs: true,
            manageProducts: true,
            manageGallery: true,
            manageMessages: true,
            manageSettings: true,
          };
        }

        throw new Error("Hatalı e-posta veya şifre. Demo için: admin@admin.com / admin123 kullanın.");
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          role?: string;
          manageBlogs?: boolean;
          manageProducts?: boolean;
          manageGallery?: boolean;
          manageMessages?: boolean;
          manageSettings?: boolean;
        };
        token.id = user.id;
        token.name = user.name;
        token.role = u.role;
        token.manageBlogs = u.manageBlogs;
        token.manageProducts = u.manageProducts;
        token.manageGallery = u.manageGallery;
        token.manageMessages = u.manageMessages;
        token.manageSettings = u.manageSettings;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const su = session.user as {
          id?: string;
          role?: string;
          manageBlogs?: boolean;
          manageProducts?: boolean;
          manageGallery?: boolean;
          manageMessages?: boolean;
          manageSettings?: boolean;
        };
        su.id = token.id as string;
        su.role = token.role as string;
        su.manageBlogs = token.manageBlogs as boolean;
        su.manageProducts = token.manageProducts as boolean;
        su.manageGallery = token.manageGallery as boolean;
        su.manageMessages = token.manageMessages as boolean;
        su.manageSettings = token.manageSettings as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: "/nivaart/login",
    error: "/nivaart/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "vercel-demo-static-secret-key-12345",
};
