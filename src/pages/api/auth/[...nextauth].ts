import { query as q } from "faunadb";
import NextAuth, { Account, Profile, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

interface signInProps {
  user: User;
  account: Account;
  profile: Profile;
  email: {
    verificationRequest?: boolean;
  };
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: signInProps) {
      const { email } = user;

      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        return true;
      } catch {
        return false;
      }
    },
  },
});
