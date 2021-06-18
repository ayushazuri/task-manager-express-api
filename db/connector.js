const mongoose = require("mongoose");

const connectDB = (url) => {
	// console.log(url);
	return mongoose.connect(String(url), {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
