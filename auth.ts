import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignInCredentials } from './app/types';

const authConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			authorize(credentials, request) {
				const { email, password } = credentials as SignInCredentials;
				const { user, error }: any = fetch(
					'http://localhost:3000/api/users/signin',
					{
						method: 'POST',
						body: JSON.stringify({ email, password }),
					}
				).then(async (res) => await res.json());

				if (error) throw new Error(error);

				return { id: user.id };
			},
		}),
	],
};

export const {
	auth,
	handlers: { GET, POST },
} = NextAuth(authConfig);
