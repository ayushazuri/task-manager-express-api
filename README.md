<h1 align="center"> Task Manager App🔥 </h1> 
<h3 align="center"> An Express and Node.js App that can manage all of your tasks!! </h3>

<p  align="center">Link to access the Website <a href="https://task-manager-express.herokuapp.com/">https://task-manager-express.herokuapp.com/</a></p>

<p align="center"> 
   <a href="https://task-manager-express.herokuapp.com/" target="_blank">
    <img src="./src/assets/Images/portfolio.png"></img>
  </a>
</p>

# Key Points 📋
- This is an Express and Node.js App that can help you manage your tasks efficiently. It follows all the CRUD application.
   - You can Create a new task.
   - You can read all the tasks.
   - You can update a task.
   - You can delete a task as well.
- This project used MongoDB as the database, to store all the datas and to create, read, update, and delete all the datas.
- The REST API has been made using ExpressJS. The project is very modular and contains different routes, controllers, middlewares, model, and a connector. 
- The Api Routes are as following: 
  - `/api/v1/tasks` - `get` method - To Read all the tasks present in the database.
  - `/api/v1/tasks` - `post` method - To Post a new task in the database.
  - `/api/v1/tasks/:id` - `get` method - to Get a particular task from the database, based on the id.
  - `/api/v1/tasks/:id` - `patch` method - to Update a particular task from the database, based on the id.
  - `/api/v1/tasks/:id` - `delete` method - to Delete a particular task from the database, based on the id.
- Frontend of this project is built with Vanilla Javascript, CSS, and HTML. It is present in `/public` folder.

# How to get started with MongoDB

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
   3. Get a particular data:

      - To get a particular data based on the ID, we can use `findOne(OBJECT)` which returns the document with the matching data as the provided object or null.

      ```javascript
      const getTask = async (req, res) => {
      	try {
      		const { id: taskID } = req.params;
      		const task = await Task.findOne({ _id: taskID });
      		if (!task)
      			return res.status(404).json({ msg: `No task with id: ${taskID}` });

      		res.status(200).json({ task });
      	} catch (error) {
      		res.status(500).json({ msg: error });
      	}
      };
      ```

   4. Delete a data

      - To delete a data use `findOneAndDelete(OBJECT)`. Rest part is same as above.

   5. Update a data using Patch:

      - To Update a data, use `findOneAndUpdate(OBJECT, newData, OptionsForValidationOrOtherFeature)`. Here the Object will be the data wrt which you need to find the data in the collection, newData can be `req.body` which comes from the frontend, and options is used for various reasons, if you dont use it, the returned task will be the previous data only, not the updated one, so if you want to get the new data at that instant, use `new: true`, and `runValidators: true` can be used to check for null enteries.

      ```javascript
      const updateTasks = async (req, res) => {
      	try {
      		const { id: taskID } = req.params;
      		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      			new: true,
      			runValidators: true,
      		});
      		if (!task)
      			return res.status(404).json({ msg: `No task with id: ${taskID}` });
      		res.status(200).json({ task });
      	} catch (error) {
      		res.status(500).json({ msg: error });
      	}
      };
      ```

      - Difference between PUT and PATCH is that, PUT replaces the whole object with the new object but PATCH does an partial update, ie, it will replace the data that are new, and the previous datas will remain the same.

# Deployment
- This web app has been hosted on Heroku. 
- Install heroku `npm i -g heroku`. Then login heroku in your project `heroku login`.
- Now you need to create a heroku project, you can either go to heroku website and make a project there, or just write in the terminal `heroku create project-name`.
- Now You can have 2 options for deploying your web app on heroku. 
  - Add a heroku remote `heroku git:remote -a project-name`
  - Add and commit all the changes.
  - push the changes to your heroku remote. `git push heroku master`
- Connect your github repository to the heroku app, from the heroku website. By doing this, your website will automatically be deployed after you push your changes to your github repository.
- Don't forget to add your config vars or environment variables, that are present in your .env file, to heroku. Go to `Settings -> Config Vars` and add the key and value. This is important because, your .env file will be present in the gitignore file and when you push the changes to git, this env file wont be pushed. So the server won't be able to get the data present in the .env file, it will get `undefined`. To avoid this, explicitly add it it to config vars on heroku.

# Technologies and Tools used 🛠️

- [ExpressJS](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Heroku](https://www.heroku.com)
