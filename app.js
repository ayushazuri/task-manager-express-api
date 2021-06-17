const express = require("express");
const tasks = require("./routes/tasks.js");
const app = express();
const connectDB = require("./db/connector.js");
require("dotenv").config();

const PORT = 5000;

app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
	res.send("Hello");
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(PORT, () => {
			console.log(`Server is listening to http://localhost:${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

start();
