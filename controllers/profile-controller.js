const jwt = require("jsonwebtoken");
const profile = (req, res, next) => {
	try {
		const token = req.get("Cookie").split("token=")[1].trim();
		const user = jwt.verify(token, "SECRETKEY");
		res.render("profile", {
			data: {
				pageName: "Profile",
				message: "",
				class: "alert alert-primary",
				username: user.username,
				loginStatus: user.loginStatus
			}
		});
	} catch (error) {
		res.render("login", {
			data: {
				pageName: "Login",
				message: "Please do login, before see the profile",
				class: "alert alert-primary",
			}
		});
	}
};
module.exports = profile;