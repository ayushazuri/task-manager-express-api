const mongoose = require("mongoose");

const connectDB = (url) => {
	console.log(typeof url.toString());
	return mongoose.connect(url.toString(), {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
