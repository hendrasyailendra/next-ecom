import mongoose from 'mongoose';

let connection: typeof mongoose;

const url =
	'mongodb+srv://hendrasyailendra:Rainbow123@commerce.skjdevd.mongodb.net/';
const startDb = async () => {
	try {
		if (!connection) {
			connection = await mongoose.connect(url);
		}
		return connection;
	} catch (error) {
		throw new Error((error as any).message);
	}
};

export default startDb;
