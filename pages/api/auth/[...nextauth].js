/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { setCookie } from 'nookies';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn(user, account, profile) {
      // Aquí puedes obtener el nombre de usuario y la imagen de perfil
      const { name, image } = user?.user || user;

      // Crear un objeto 'user' con la información del usuario
      const userData = { name, image };

      // Guardar el objeto 'user' en cookies seguras
      setCookie(null, 'user_hotasm', JSON.stringify(userData), {
        maxAge: 30 * 24 * 60 * 60, // 30 días de expiración
        path: '/',
      });

      return Promise.resolve(true);
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
