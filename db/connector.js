const mongoose = require("mongoose");

const connectDB = (url) => {
	// console.log(url);
	return mongoose.connect(
		"mongodb+srv://admin:9892770647@taskmanager.uystu.mongodb.net/TaskManager?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}
	);
};

module.exports = connectDB;
