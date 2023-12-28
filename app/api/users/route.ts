import { NewUserRequest } from '@/app/types';
import startDb from '@lib/db';
import UserModel from '@models/userModel';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (req: Request) => {
	const body = (await req.json()) as NewUserRequest;
	await startDb();

	const newUser = await UserModel.create({
		...body,
	});

	const transport = nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '16119eff3e295a',
			pass: 'ae9f2b3271846b',
		},
	});
	transport.sendMail({
		from: 'verification@ecom.com',
		to: newUser.email,
		html: `<h1>Please verify your email by clicking <a href='http://localhost:3000'>this link<a></h1>`,
	});
	return NextResponse.json(newUser);
};
