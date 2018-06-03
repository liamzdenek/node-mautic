const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getAsset(assetId,callback){
		request.get({
			url: this.api.config.api_endpoint + "/assets/" + assetId + "?access_token=" + this.api.config.auth_object.access_token,
		},(err,res) =>{
			if (err) {
				callback(err);
			} else {
				if (res.body.errors) {
					callback(res.body);
				} else {
					var asset = JSON.parse(res.body);	
					callback(asset);
				}
			}
		})
	}
	listAssets(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/assets";
		if (queryParameters) {
			url = url + "?";
			Object.keys(queryParameters).forEach((key) =>{
				url = url + key + "=" + queryParameters[key] + "&";
			});
			url = url + "access_token=" + this.api.config.auth_object.access_token;
		} else {
			url = url + "?access_token=" + this.api.config.auth_object.access_token;
		}
		request.get({
			url: url,
		},(err,res) =>{
			if (err) {
				callback(err);
			} else {
				if (res.body.errors) {
					callback(res.body);
				} else {
					var asset = JSON.parse(res.body);	
					callback(asset);
				}
			}
		})
	}
}
