const express = require("express");
const robot = require("kbm-robot");
const router = express.Router();
const mongoose = require('mongoose');
const clientSessions = require('client-sessions');
mongoose.connect('mongodb://admin:admin1@ds048878.mlab.com:48878/speech'); // Connecting to the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // If connection failed
db.once("open", function(callback) {
	console.log("Connection succeeded."); // If connection succeeded
});
const UserShm = mongoose.Schema({
	Name: String
});
const User = mongoose.model('UserList', UserShm);
robot.startJar()
router.get("/", function(req, res) {
	res.redirect("/read")
})
router.get("/read", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/readUsers.html")
})
router.get("/create", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/createUser.html")
})
router.get("/update", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/updateUser.html")
})
router.get("/delete", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/deleteUser.html")
})
router.post("/create/:name", function(req, res) {
	var name = req.params.name
	User.findOne({
		Name: name
	}, function(err, obj) {
		if (obj) {
			res.send("That name already exists.")
		} else if (!obj) {
			var myData = new User({
				Name: name
			});
			myData.save().then(item => {
				console.log("saved name: " + name + "");
			}).catch(err => {
				console.error("unable to save name: " + name + "");
			});
			res.send("Name: " + name + " created.");
		}
	})
})
router.get("/read/data", function(req, res) {
	User.find({}, {
		_id: 0,
		__v: 0
	}, function(err, obj) {
		res.send(obj)
	})
})
router.put("/update/:name/:newname", function(req, res) {
	var name = req.params.name
	var newName = req.params.newname
	User.findOne({
		Name: name
	}, function(err, obj) {
		if (obj) {
			var conditions = {
				Name: obj.Name
			};
			var update = {
				$set: {
					Name: newName
				}
			};
			User.findOneAndUpdate(conditions, update, function(err) {
				if (err) // If error
				{
					res.send("Name: " + name + " not updated to: " + newName +
						". Please try again later.");
				} else {
					res.send("Name: " + name + " updated to: " + newName + ".");
				}
			});
		} else {
			res.send("Name: " + name + " not found.");
		}
	});
})
router.delete("/delete/:name", function(req, res) {
	var name = req.params.name
	User.findOne({
		Name: name
	}, function(err, obj) {
		if (obj) {
			var conditions = {
				Name: obj.Name
			};
			User.findOneAndDelete(conditions, function(err) {
				if (err) // If error
				{
					res.send("Name: " + name + "not deleted. Please try again later.");
				} else {
					res.send("Name: " + name + " deleted.");
				}
			});
		} else {
			res.send("Name: " + name + " not found.");
		}
	});
})
router.post("/leftpressed", function(req, res) {
	robot.press("LEFT")
		.mouseMove(100, 100)
		.sleep(40)
		.release("LEFT")
		.go()
	res.send("")
})
router.post("/rightpressed", function(req, res) {
	robot.press("RIGHT")
		.mouseMove(200, 200)
		.sleep(40)
		.release("RIGHT")
		.go()
	res.send("")
})
module.exports = router
