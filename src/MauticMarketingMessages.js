const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getMarketingMessage(messageId,callback){
		var url = this.api.config.api_endpoint + "/messages/" + messageId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listMarketingMessages(queryParameters,callback) {
	    var url = this.api.config.api_endpoint + "/messages";
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
	createMarketingMessage(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/messages/new?access_token=" + this.api.config.auth_object.access_token;
		queryParameters = JSON.stringify(queryParameters);
		request.post({
			url: url,
			body: queryParameters
		},(err,res) =>{
			if (err) {
				callback(err);
			} else {
				var asset = JSON.parse(res.body);
				if (asset.errors) {
					callback(asset.errors);
				} else {
					callback(asset);
				}
			}
		})
	}
	editMarketingMessage(method,queryParameters,messageId,callback){
		var url = this.api.config.api_endpoint + "/messages/" + messageId + "/edit?access_token=" + this.api.config.auth_object.access_token;
		queryParameters = JSON.stringify(queryParameters);
		if (method == "PATCH") {
			request.patch({
				url:url,
				body:queryParameters
			},(err,res) =>{
				if (err) {
					callback(err);
				} else {
					var asset = JSON.parse(res.body);	
					callback(asset);
				}
			})
		}
		if (method == "PUT") {
			request.put({
				url:url,
				body:queryParameters
			},(err,res) =>{
				if (err) {
					callback(err);
				} else {
					var asset = JSON.parse(res.body);	
					callback(asset);
				}
			})
		}
		if (method !== "PUT" && method !== "PATCH") {
			callback("Invalid Method");
		}
	}
	deleteMarketingMessage(messageId,callback){
		var url = this.api.config.api_endpoint + "/messages/" + messageId + "/delete?access_token=" + this.api.config.auth_object.access_token;
		request.delete({
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
