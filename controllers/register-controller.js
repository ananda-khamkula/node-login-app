const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sendGmail = require("../middlewares/email-middleware");
const createUser = async userObj => {
	const hash = await bcrypt.hash(userObj.password, 10);
	const user = new User ({
		username: userObj.username,
		password: hash
	});
	const data = await user.save();
	return data;
};

const register = (req, res, next) => {
	res.render("register", {
		data: {
			pageName: "Register",
			message: "Registeration",
			class: "alert alert-primary"
		}
	});
};
module.exports.register = register;
const postRegister = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	const userObj = {
		username: username,
		password: password
	};
	createUser(userObj) 
		.then(() => {
			const success = "Finish record " + userObj.username;
			const info = sendGmail({
				//from: '"WebAdmin-UKnowWell.com" <adminweb@uknowwell.com>',
				to: 'ananda.kha@gmail.com', // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
				subject: 'User registered', // หัวข้ออีเมล
				text: userObj.username + ' was registered', // plain text body
				html: '<center><b>' + userObj.username + '</b><br>Has been registered</center>' // html body
			});
			// log ข้อมูลการส่งว่าส่งได้-ไม่ได้
			//console.log('Message sent: %s', info.messageId);
			res.render("login", {
				data: {
					pageName: "Login",
					message: success,
					class: "alert alert-primary"
				}
			});
		})
		.catch(err => {
			res.status(401).render("register", {
				data: {
					pageName: "Error",
					message: err,
					class: "alert alert-primary"
				}
			});
		});
};
module.exports.postRegister = postRegister;