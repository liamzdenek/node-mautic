const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getAvailableWidgetTypes(callback){
		var url = this.api.config.api_endpoint + "/data?access_token=" + this.api.config.auth_object.access_token;
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
}
