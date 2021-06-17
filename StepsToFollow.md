# Steps to follow for connecting your project to MongoDB

1. Make a project on Mongo DB atlas and connect to it, and make the database connection and network connection.
2. Copy the Mongo db connection string present in the cluster's connect to application option.
3. Add it to the .env file so as to protect it from displaying it to others.
4. Make a connector.js file and import mongoose in it. Make a Funtion connectDB in which use `mongoose.connect(url, func)` to connect to your database. url here is your connection string.
5. Import connectDB to your app.js and the make a new function `start`
   - Add connectDB and app.listen both to your start function. The idea here is that the server should start only when the connection to the database is successful.
   - connectDB returns a promise, so accordingly make an async await function start and add everything in it.
   - In connectDB you need to pass the url, ie, the mongodb connection string which is present in the .env file.
   - Install `dotenv` package and import it in app.js in this manner `require("dotenv").config()`.
   - In connectDB arguement add `process.env.MONGO_URL` where MONGO_URL is the variable name present in the .env file
   - Now connection to the Database has been completed.
6. Now make a model which will will contain the schema for your collection.
   - Make a folder `model` and in it make the js file.
   - Import `mongoose` and make a taskSchema variable in this manner, `mongoose.Schema({})`. In the parameters object add the schema, ie, name: String, etc.
   ```javascript
   const TaskSchema = new mongoose.Schema({
   	name: String,
   	completed: Boolean,
   });
   ```
   - In the end, export mongoose.model(), a model which is like a container to the schema, with the following parameters, collection name and the schema variable that you made.
   ```javascript
   mongoose.model("Task", TaskSchema);
   ```
   - Now this model will be used for all the CRUD operations.
   - You can also add some validators to your schema, for example, if you dont want to take empty string, you can add `required: true` or you can trim a string for extra spaces as well, and have a default value. This can be done in the following way.
   ```javascript
   const TaskSchema = new mongoose.Schema({
   	name: {
   		type: String,
   		required: [true, "Must Provide name"],
   		trim: true,
   	},
   	completed: {
   		type: Boolean,
   		default: false,
   	},
   });
   ```
7. Now coming to the CRUD Operations, import your model in your connector folder or wherever you want to use the model for CRUD operations.

   1. Create :

      - To Create a new Document in the particular collection mentioned in the model. use modelName.create(data, callback)
      - You can either use callback function with parameters as `err, data` and check for err and send data
        ```javascript
        Tasks.create(dbData, (err, data) => {
        	if (err) {
        		res.status(500).send(err);
        	} else {
        		res.status(201).send(data);
        	}
        });
        ```
      - Or you can use async await and do it like this.

      ```javascript
      const createTasks = async (req, res) => {
      	try {
      		const task = await Task.create(req.body);
      		res.status(201).json(task);
      	} catch (error) {
      		res.status(500).json({ msg: error });
      	}
      };
      ```

      - A document with the provided data will be made in the database. If you add any data in your database, which is not present in the schema, that data will be ignored. If you add a data with data type than which was specified, You will get error.

   2. Find/Get All Data:
      - To Find all the data from mongodb we use `model.find({})`. If we add an empty object, it will give us all the documents present in that collection. If we want to add some kind of condition, we can add it in the object, for ex, if we add name: "ayush" in the object, then all the ayush named object will be displayed.
      - This can be done in the following way or by using callbacks:
      ```javascript
      const getAllTasks = async (req, res) => {
      	try {
      		const tasks = await Task.find({});
      		res.status(200).json({ tasks });
      	} catch (error) {
      		res.status(500).json(error);
      	}
      };
      ```
