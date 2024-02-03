import { notFound } from 'next/navigation';

interface Props {
	searchParams: { token: string; userId: string };
}
export default function Verify(props: Props) {
	const { token, userId } = props.searchParams;

	if (!token || !userId) return notFound();
	return (
		<div className='text-3xl opacity-70 text-center p-5 animate-pulse'>
			... Please wait we are verifying your email
		</div>
	);
}
