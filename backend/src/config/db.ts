import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			dbName: "CooksDB",
		});
	} catch (err) {
		console.log(err);
	}
};
