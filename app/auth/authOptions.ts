import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvide from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvide({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // if(!credentials?.email || credentials.password) return null

    //     console.log(credentials);
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials!.email,
    //       },
    //     });
    //     console.log(user);

    //     if (!user) return null;

    //     const passwordMatch = await bcrypt.compare(
    //       credentials!.password,
    //       user.hashedPassword!
    //     );
    //     return passwordMatch ? user : null;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
export default authOptions;
