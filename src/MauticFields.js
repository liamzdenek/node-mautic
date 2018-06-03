const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getField(fieldType,fieldId,callback){
		if (fieldType == "contact"){
			var url = this.api.config.api_endpoint + "/fields/contact/" + fieldId + "?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company") {
			var url = this.api.config.api_endpoint + "/fields/company/" + fieldId + "?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company" || fieldType == "contact") {
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
		} else {
			callback("Please enter either 'company' or 'contact' for the Field Type");
		}
	}
	listContactFields(fieldType,callback){
		var url = "";
		if (fieldType == "contact"){
			url = this.api.config.api_endpoint + "/fields/contact?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company") {
			url = this.api.config.api_endpoint + "/fields/company?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company" || fieldType == "contact") {
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
		} else {
			callback("Please enter either 'company' or 'contact' for the Field Type");
		}
	}
	createField(fieldType,queryParameters,callback){
		var url = "";
		if (fieldType == "contact"){
			url = this.api.config.api_endpoint + "/fields/contact/new?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company") {
			url = this.api.config.api_endpoint + "/fields/company/new?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company" || fieldType == "contact") {
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
		} else {
			console.log("Please enter either 'company' or 'contact' for the Field Type");
			var asset = {
				errors: [
					"Incorrect Field Type"
				]
			};
			callback(asset);
		}
	}
	editField( method, fieldType, queryParameters, fieldId, callback) {
	    var url = "";
	    if (fieldType == "contact") {
	        url = this.api.config.api_endpoint + "/fields/contact/" + fieldId + "/edit?access_token=" + this.api.config.auth_object.access_token;
	    }
	    if (fieldType == "company") {
	        url = this.api.config.api_endpoint + "/fields/company/" + fieldId + "/edit?access_token=" + this.api.config.auth_object.access_token;
	    }	    
	    queryParameters = JSON.stringify(queryParameters);
	    if (fieldType == "contact" || fieldType == "company") {
	        if (method == "PATCH") {
	            request.patch({
	                url: url,
	                body: queryParameters
	            }, (err, res) => {
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
	                url: url,
	                body: queryParameters
	            }, (err, res) => {
	                if (err) {
	                    callback(err);
	                } else {
	                    var asset = JSON.parse(res.body);
	                    callback(asset);
	                }
	            })
	        }
	        if (method !== "PUT" && method !== "PATCH") {
	            var errors = {errors:["Invalid Method"]}
	            callback(errors);
	        }
	    } else {
			console.log("Please enter either 'company' or 'contact' for the Field Type");
			var asset = {
				errors: [
					"Incorrect Field Type"
				]
			};
			callback(asset);
	    }
	}
	deleteField( fieldType, fieldId, callback){
		if (fieldType == "contact"){
			var url = this.api.config.api_endpoint + "/fields/contact/" + fieldId + "/delete?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company") {
			var url = this.api.config.api_endpoint + "/fields/company/" + fieldId + "/delete?access_token=" + this.api.config.auth_object.access_token;
		}
		if (fieldType == "company" || fieldType == "contact") {
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
		} else {
			console.log("Please enter either 'company' or 'contact' for the Field Type");
			var asset = {
				errors: [
					"Incorrect Field Type"
				]
			};
			callback(asset);
		}
	}
}
