const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getNote(noteId,callback){
		var url = this.api.config.api_endpoint + "/notes/" + noteId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listContactNotes( callback) {
	    var url = this.api.config.api_endpoint + "/notes?access_token=" + this.api.config.auth_object.access_token;
	    if (queryParameters) {
	        url = url + "?";
	        Object.keys(queryParameters).forEach((key) => {
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
	createNote(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/notes/new?access_token=" + this.api.config.auth_object.access_token;
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
	editNote(method,queryParameters,noteId,callback){
		var url = this.api.config.api_endpoint + "/notes/" + noteId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
	deleteNote(noteId,callback){
		var url = this.api.config.api_endpoint + "/notes/" + noteId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
