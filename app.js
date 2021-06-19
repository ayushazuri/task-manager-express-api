const express = require("express");
const tasks = require("./routes/tasks.js");
const notFound = require("./middleware/not-found.js");
const path = require("path");
require("dotenv").config();
// {
// 	path: path.resolve(__dirname, "./.env");
// }
//Connections
const app = express();
const connectDB = require("./db/connector.js");

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(express.static("./public"));

//Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

//Listen
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(PORT, () => {
			console.log(`Server is listening to port `);
		});
	} catch (err) {
		console.log(err);
	}
};

start();
