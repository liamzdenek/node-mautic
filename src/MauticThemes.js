const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getTheme(themename,callback){
		var url = this.api.config.api_endpoint + "/themes/" + themename + "?access_token=" + this.api.config.auth_object.access_token;
		request.get({
			url:url
		},(err,res) =>{
			if (err) {
				callback(err);
			} else {
				var asset = JSON.parse(res.body);	
				callback(asset);
			}
		})
	}
	getListOfThemes(callback) {
	    var url = this.api.config.api_endpoint + "/themes?access_token=" + this.api.config.auth_object.access_token;
	    request.get({
	        url: url
	    }, (err, res) => {
	        if (err) {
	            callback(err);
	        } else {
	            var asset = JSON.parse(res.body);
	            callback(asset);
	        }
	    })
	}
}
