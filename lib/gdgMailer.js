'use strict';



/*!
 * moda_c <https://github.com/gdg/moda_c>
 *
 * Copyright © 2017 GDG™ -- (GDG/Tarek Al-Hariri).
 * Licensed under the OSL-3.0 License
 */

/**
 * GDG™ twilio comm module
 * used for general communication
 * classification: general-2/sensitive-1
 *
 */

/**
 * Module dependencies.
 * @private
 */
var fs = require('fs');
var path = require('path');
var dotenv = require('dotenv');
require('dotenv').config()

/**
 * Module exports.
 * @public
 */

function gdgMailer(__emSub, __emRec, __emBod) {
var p = {
	A: process.env.MAILGUN_DOMAIN_1,
	B: process.env.MAILGUN_DOMAIN_1_API_KEY,
	C: process.env.MAILGUN_DOMAIN_1_DEFAULT_SMTP_LOGIN
}
var _domainName = p.A;
var _apiKey = p.B;
var _sender = p.C;
var _recipientEmail = __emRec;
var mailGun = require("mailgun-js")({
    apiKey: _apiKey,
    domain: _domainName
});
var _emailTemplate = path.join('./lib/templates','action.html')
var _emailSubject = __emSub;
var emailBody = __emBod || fs.readFileSync(_emailTemplate).toString();
var emailData = {
    from: _sender,
    to: _recipientEmail,
    subject: _emailSubject,
    text: '',
    html: emailBody
}
mailGun.messages().send(emailData, function (error, body) {
    if(!error){
        console.log("sendEmail : email Sent to : "+_recipientEmail);
    }else{
        console.log("sendEmail : Can not send email to : "+_recipientEmail+" : Error : "+error);
    }
});
};
module.exports = gdgMailer;