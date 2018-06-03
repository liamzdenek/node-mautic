const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getSegment(segmentId,callback){
		var url = this.api.config.api_endpoint + "/segments/" + segmentId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listSegments(callback) {
	    var url = this.api.config.api_endpoint + "/segments?access_token=" + this.api.config.auth_object.access_token;
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
	createSegment(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/segments/new?access_token=" + this.api.config.auth_object.access_token;
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
	editSegment(method,queryParameters,segmentId,callback){
		var url = this.api.config.api_endpoint + "/segments/" + segmentId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
	deleteSegment(segmentId,callback){
		var url = this.api.config.api_endpoint + "/segments/" + segmentId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	addContactToSegment(segmentId,contactId,callback){
		var url = this.api.config.api_endpoint + "/segments/" + segmentId + "/contact/" + contactId + "/add?access_token=" + this.api.config.auth_object.access_token;
		request.post({
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
	removeContactFromSegment(segmentId,contactId,callback){
		var url = this.api.config.api_endpoint + "/segments/" + segmentId + "/contact/" + contactId + "/remove?access_token=" + this.api.config.auth_object.access_token;
		request.post({
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
