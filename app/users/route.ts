import { NextResponse } from 'next/server';

export const GET = (req: request) => {
	NextResponse.json({ ok: true, from: 'from api' });
};
