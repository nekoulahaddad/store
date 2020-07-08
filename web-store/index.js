const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/items")
const users = require("./routes/Users")
const auth = require("./routes/auth")

const app = express();

app.use(express.json());

mongoose
.connect("mongodb://localhost/mernapp", {useNewUrlParser: true,useCreateIndex:true})
.then(() => console.log("the database is ready to use ..."))
.catch((err) => console.log(err));

app.use("/items", items);
app.use("/users", users);
app.use("/auth", auth);
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

//app.use(cors()) // hie mnshan ma yetla3 cors errors (7eyalla sha5es ye2der yfoot 3la al api)



const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("every thing is okk ...")
});