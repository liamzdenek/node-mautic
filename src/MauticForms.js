const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getForm(formId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listForms(queryParameters,callback) {
	    var url = this.api.config.api_endpoint + "/forms";
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
	createForm(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/forms/new?access_token=" + this.api.config.auth_object.access_token;
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
	editForm(method,queryParameters,formId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
			callback("Invalid Method");
		}
	}
	deleteForm(formId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	deleteFormFields(formId,queryParameters,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/fields/delete";
		if (queryParameters) {
			url = url + "?";
			Object.keys(queryParameters).forEach((key) =>{
				url = url + key + "=" + queryParameters[key] + "&";
			});
			url = url + "access_token=" + this.api.config.auth_object.access_token;
		} else {
			url = url + "?access_token=" + this.api.config.auth_object.access_token;
		}
		request.delete({
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
	deleteFormActions(formId,queryParameters,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/actions/delete";
		if (queryParameters) {
			url = url + "?";
			Object.keys(queryParameters).forEach((key) =>{
				url = url + key + "=" + queryParameters[key] + "&";
			});
			url = url + "access_token=" + this.api.config.auth_object.access_token;
		} else {
			url = url + "?access_token=" + this.api.config.auth_object.access_token;
		}
		request.delete({
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
	listFormSubmissions(formId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/submissions?access_token=" + this.api.config.auth_object.access_token;
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
	listFormSubmissionsForContact(formId,contactId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/submissions/contact/" + contactId + "?access_token=" + this.api.config.auth_object.access_token;
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
	getFormSubmission(formId,submissionId,callback){
		var url = this.api.config.api_endpoint + "/forms/" + formId + "/submissions/" + submissionId + "?access_token=" + this.api.config.auth_object.access_token;
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
