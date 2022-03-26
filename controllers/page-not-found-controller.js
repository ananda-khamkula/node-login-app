const notFound = (req, res, next) => {
	res.render("page-not-found", {
		data: {
			pageName: "error404",
			message: "Sorry! Page Not Found",
			class: "alert alert-primary",
			loginStatus: false
		}
	});
};
module.exports = notFound;