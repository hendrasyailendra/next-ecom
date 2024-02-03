import { compare, genSalt, hash } from 'bcrypt';
import { Document, Model, ObjectId, Schema, model, models } from 'mongoose';

interface emailVerificationTokenDocument extends Document {
	user: ObjectId;
	token: string;
	createdAt: Date;
}

interface Methods {
	compareToken(token: string): Promise<boolean>;
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = Schema.Types.ObjectId;

// Define the schema
const emailVerificationTokenSchema = new Schema<
	emailVerificationTokenDocument,
	{},
	Methods
>({
	user: { type: ObjectId, required: true, ref: 'User' },
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, required: true },
});

// Hash the token before saving
emailVerificationTokenSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('token')) {
			return next();
		}
		// Generate a salt and hash the token
		const salt = await genSalt(10);
		this.token = await hash(this.token, salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

// Compare method for token validation
emailVerificationTokenSchema.methods.compareToken = async function (
	plainToken
) {
	try {
		// Use bcrypt's compare method to compare the plainToken with the hashed token
		return await compare(plainToken, this.token);
	} catch (error) {
		throw error;
	}
};

// Set token expiration to 24 hours
emailVerificationTokenSchema.index(
	{ createdAt: 1 },
	{ expireAfterSeconds: 24 * 60 * 60 }
);

// Create the model
const EmailVerificationToken =
	models.EmailVerificationToken ||
	model('EmailVerificationToken', emailVerificationTokenSchema);

// Export the model
export default EmailVerificationToken as Model<
	emailVerificationTokenDocument,
	{},
	Methods
>;
