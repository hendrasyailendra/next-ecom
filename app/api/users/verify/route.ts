import EmailVerificationToken from '@/app/models/emailVerificationToken';
import UserModel from '@/app/models/userModel';
import { EmailVerifyRequest } from '@/app/types';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	try {
		const { token, userId } = (await req.json()) as EmailVerifyRequest;

		if (!isValidObjectId(userId) || !token) {
			return NextResponse.json({ error: 'invalid request' }, { status: 401 });
		}

		const verifyToken = await EmailVerificationToken.findOne({ user: userId });

		if (!verifyToken) {
			return NextResponse.json({ error: 'invalid user' }, { status: 401 });
		}

		const isMatched = verifyToken.compareToken(token);

		if (!isMatched) {
			return NextResponse.json({ error: 'invalid token' }, { status: 401 });
		}

		await UserModel.findByIdAndUpdate(userId, { verified: true });

		await EmailVerificationToken.findByIdAndDelete(verifyToken._id);

		return NextResponse.json({ message: 'Your email is verified' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Could not verify email' },
			{ status: 500 }
		);
	}
};
