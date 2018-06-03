const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getUser(userId,callback){
		var url = this.api.config.api_endpoint + "/users/" + userId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listContactUsers(callback) {
	    var url = this.api.config.api_endpoint + "/users?access_token=" + this.api.config.auth_object.access_token;
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
	createUser(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/users/new?access_token=" + this.api.config.auth_object.access_token;
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
	editUser(method,queryParameters,userId,callback){
		var url = this.api.config.api_endpoint + "/users/" + userId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
	deleteUser(userId,callback){
		var url = this.api.config.api_endpoint + "/users/" + userId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	getSelfUser(callback) {
	    var url = this.api.config.api_endpoint + "/users/self?access_token=" + this.api.config.auth_object.access_token;
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
	checkUserPermissions(userId,callback){
		var url = this.api.config.api_endpoint + "/users/" + userId + "/permissioncheck?access_token=" + this.api.config.auth_object.access_token;
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
