const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const homeController = require("./controllers/home-controller");
const pageNotFoundController = require("./controllers/page-not-found-controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongooseStrInternet = "mongodb+srv://<username>:<password>%<cluster>.mongodb.net/<project>?retryWrites=true&w=majority";
const mongooseStrlocal = "mongodb://ananda:fWd1Sna5@127.0.0.1:27017/myapp?retryWrites=true&w=majority";

//mongodb://username:password@host:port/database?options...

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(authRoute);

app.get("/", homeController);
app.get("*", pageNotFoundController);

mongoose
	.connect(mongooseStrlocal, {useNewUrlParser: true}
	)
	.then(() => {
		console.log("Database Connected");
	})
	.catch((err) => {
		console.log("Cannot Connect to Database!!!!");
		console.log(err);
	});

app.listen(port, function() {
	console.log("Listening on port", port);
});
