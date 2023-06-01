import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SigninMessage } from '../../../utils/SigninMessage';
import userService from '../../../service/userService';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	const providers = [
		CredentialsProvider({
			name: 'Solana',
			credentials: {
				message: {
					label: 'Message',
					type: 'text',
				},
				signature: {
					label: 'Signature',
					type: 'text',
				},
			},
			async authorize(credentials) {
				try {
					const signinMessage = new SigninMessage(
						JSON.parse(credentials?.message || '{}')
					);
					const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);
					if (signinMessage.domain !== nextAuthUrl.host) {
						return null;
					}

					if (signinMessage.nonce !== (await getCsrfToken({ req }))) {
						return null;
					}

					const validationResult = await signinMessage.validate(
						credentials?.signature || ''
					);

					if (!validationResult) throw new Error('Could not validate the signed message');

					return {
						id: signinMessage.publicKey,
					};
				} catch (e) {
					return null;
				}
			},
		}),
	];

	const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth?.includes('signin');

	// Hides Sign-In with Solana from the default sign page
	if (isDefaultSigninPage) {
		providers.pop();
	}

	return await NextAuth(req, res, {
		providers,
		session: {
			strategy: 'jwt',
		},
		secret: process.env.NEXTAUTH_SECRET,
		callbacks: {
			async session({ session, token }) {
				session.user.publicKey = token.sub;
				if (token.sub) {
					session.user.userName = await getUser(token.sub);
				}
				return session;
			},
		},
	});
}

const getUser = async (publicKey: string) => {
	try {
		return (await userService.getUser({ publicKey })).userName;
	} catch (error: any) {
		if (error.message === 'User not found') {
			try {
				const newUser = await userService.createUser({
					publicKey,
				});

				return newUser.userName;
			} catch (error: any) {
				console.log('what', error);
			}
		}
	}
};
