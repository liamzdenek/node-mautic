const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	checkAuth(callback) {
	    var jsonAuthFile = fs.readFile("token.json", "utf8", (err, data) => {
	        if (err) {
				this.api.auth.generateAuthUrl(callback);
	        } else {
	            var auth = JSON.parse(data);
	            this.api.config.auth_object = auth;
	            this.api.auth.testCall(callback);
	        }
	    })
	}
	generateAuthUrl(callback) {
	    var authUrl = this.api.config.base_url + "/oauth/v2/authorize?client_id=" + this.api.config.public_key + "&grant_type=authorization_code&redirect_uri=" + this.api.config.redirect_uri + "&response_type=code&state=" + this.api.config.state;
	    console.log("You've not yet authorised this app - please access the link below to generate two tokens in the URL it redirects to, State - to ensure that the request hasn't been tampered with, and 'code', which you'll need to copy and paste into this window to continue.");
	    console.log(authUrl);
	    var cliinput = readline.createInterface({
	        input: process.stdin,
	        output: process.stdout
	    });
	    cliinput.question("Please paste the code into this prompt and press enter to continue", (code) => {
	        console.log("Token Accepted");
	        this.api.config.code = code;
	        this.api.auth.getAccessToken(code,callback);
	    })
	}
	getAccessToken(code,callback) {
	    var postBody = {
	        code: this.api.config.code,
	        client_id: this.api.config.public_key,
	        client_secret: this.api.config.secret_key,
	        grant_type: "authorization_code",
	        redirect_uri: this.api.config.redirect_uri,
	    }
	    var tokenUrl = encodeURI(this.api.config.base_url + "/oauth/v2/token?client_id=" + this.api.config.public_key + "&client_secret=" + this.api.config.secret_key + "&grant_type=authorization_code&redirect_uri=" + this.api.config.redirect_uri + "&code=" + this.api.config.code);
	    request.post({
	        headers: { 'content-type': 'application/x-www-form-urlencoded' },
	        url: tokenUrl,
	        form: postBody
	    }, (err, httpResponse, body) => {
	        if (err) {
	            callback(err);
	        } else {
	            var resObject = JSON.parse(body);
	            if (resObject.errors) {
	                callback(resObject.errors);
	            } else {
	                var responseObject = JSON.parse(body);
	                this.api.config.auth_object = responseObject;
	                var jsonObject = JSON.stringify(this.api.config.auth_object);
	                fs.writeFile('token.json', jsonObject, 'utf-8', () => {
	                    this.api.auth.checkAuth(callback);
	                });
	            }
	        }
	    })
	}
	refreshToken(callback) {
	    var postBody = {
	        refresh_token: this.api.config.auth_object.refresh_token,
	        client_id: this.api.config.public_key,
	        client_secret: this.api.config.secret_key,
	        grant_type: "refresh_token",
	        redirect_uri: this.api.config.redirect_uri,
	    }
	    var tokenUrl = encodeURI(this.api.config.base_url + "/oauth/v2/token?refresh_token=" + this.api.config.auth_object.refresh_token + "&client_id=" + this.api.config.public_key + "&client_secret=" + this.api.config.secret_key + "&grant_type=refresh_token&redirect_uri=" + this.api.config.redirect_uri);
	    request.post({
	        headers: { 'content-type': 'application/x-www-form-urlencoded' },
	        url: tokenUrl,
	        form: postBody
	    }, (err, httpResponse, body) => {
	        if (err) {
	            callback(err);
	        } else {
	            var responseObject = JSON.parse(body);
	            if (responseObject.errors) {
	                callback(responseObject.errors);
	            } else {
	                this.api.config.auth_object = responseObject;
	                var jsonObject = JSON.stringify(this.api.config.auth_object);
	                fs.writeFile('token.json', jsonObject, 'utf-8', () => {
	                    this.api.auth.checkAuth(callback);
	                });
	            }
	        }
	    })
	}
	testCall(callback) {
	    var testPostBody = {
	        access_token: this.api.config.auth_object.access_token,
	        json: true
	    };
	    request.get({
	        url: this.api.config.api_endpoint + '/campaigns?access_token=' + this.api.config.auth_object.access_token
	    }, (err, httpResponse, body) => {
	        if (err) {
	        	this.api.auth.refreshToken(callback);
	        } else {
	            var objectBody = JSON.parse(body);
	            if (objectBody.errors) {
	                if (objectBody.errors[0].message == "The access token provided has expired." || objectBody.errors[0].message == "The access token provided is invalid.") {
	                    this.api.auth.refreshToken(callback);
	                }
	            } else {
	                callback(this.api.config);
	            }
	        }
	    })
	}
}
