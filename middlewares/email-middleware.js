const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const bytes  = CryptoJS.AES.decrypt('U2FsdGVkX198nn7pMWkv+7CHHAwLzE9qq9rtkxwM3HM=', 'SECRETKEY').toString(CryptoJS.enc.Utf8);

module.exports = (mailOptions) => {
	const gmailSender = nodemailer.createTransport({
		//enable less secure email before use service: 'gmail'
		//https://myaccount.google.com/lesssecureapps
		//But by 30 May 2022, This capability will turn-off forever from google
		//service: 'gmail',
	
		host: '127.0.0.1',
		//port: 25,
		secure: "SSL/TLS", // true for 465, false for other ports
		tls: { rejectUnauthorized: false },
		auth: {
			user: 'adminweb@uknowwell.com',
			pass: bytes
		}
	});
	if (!mailOptions.from) {
		mailOptions.from = '"WebAdmin-UKnowWell.com" <adminweb@uknowwell.com>';
	}
	gmailSender.sendMail(mailOptions, function(error, response){
        if(error){
			console.log(error);
            return error;
        }else{
			console.log(response);
            return response;
        }
    });
}

