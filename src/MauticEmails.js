const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getEmail(emailId,callback){
		var url = this.api.config.api_endpoint + "/emails/" + emailId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listEmails(callback){
		var url = this.api.config.api_endpoint + "/emails?access_token=" + this.api.config.auth_object.access_token;
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
	createEmail(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/emails/new?access_token=" + this.api.config.auth_object.access_token;
		queryParameters = JSON.stringify(queryParameters);
		request.post({
			url: url,
			body: queryParameters
		},(err,res) =>{
			if (err) {
				callback(err);
			} else {
				var asset = JSON.parse(res.body);	
				callback(asset);
			}
		})
	}
	editEmail(method,queryParameters,emailId,callback){
		var url = this.api.config.api_endpoint + "/emails/" + emailId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
			console.log("Invalid Method");
		}
	}
	deleteEmail(emailId,callback){
		var url = this.api.config.api_endpoint + "/emails/" + emailId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	sendEmailToContact(emailId,contactId,callback){
		var url = this.api.config.api_endpoint + "/emails/" + emailId + "/contact/" + contactId + "/send?access_token=" + this.api.config.auth_object.access_token;
		request.post({
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
	sendEmailToSegment(emailId,callback){
		var url = this.api.config.api_endpoint + "/emails/" + emailId + "/send?access_token=" + this.api.config.auth_object.access_token;
		request.post({
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
