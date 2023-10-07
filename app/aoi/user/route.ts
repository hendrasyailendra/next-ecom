import { NextResponse } from 'next/server';

export const POST = async (req: request) => {
	const values = await req.json();
	console.log(values);
	NextResponse.json({ ok: true, from: 'from api' });
};
