import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },

      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              email,
              password,
            }),
            
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          if (user?.user?.role !== 'admin') {
            return user;
          }
        } else return null;
       
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt(params) {
      return { ...params.user, ...params.token };
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // Send properties to the client, like an access_token from a provider.

      session = {
        ...user,
        ...token,
      };
      return session;
    },
    redirect(params) {
      return params.baseUrl;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
