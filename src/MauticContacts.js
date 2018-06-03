const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getContact(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listContacts(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/contacts";
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
	createContact(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/contacts/new?access_token=" + this.api.config.auth_object.access_token;
		queryParameters = JSON.stringify(queryParameters);
		request.post({
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
	editContact(method,queryParameters,contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
	deleteContact(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	addPoints( contactId, queryParameters, points, callback) {
	    var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/points/plus/" + points + "?access_token=" + this.api.config.auth_object.access_token;
	    if (queryParameters) {
	        queryParameters = JSON.stringify(queryParameters);
	    }
	    request.post({
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
	subtractPoints( contactId, queryParameters, points, callback) {
	    var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/points/minus/" + points + "?access_token=" + this.api.config.auth_object.access_token;
	    if (queryParameters) {
	        queryParameters = JSON.stringify(queryParameters);
	    }
	    request.post({
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
	listAvailableOwners(callback) {
	    var url = this.api.config.api_endpoint + "/contacts/list/owners?access_token=" + this.api.config.auth_object.access_token;
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
	listAvailableFields(callback) {
	    var url = this.api.config.api_endpoint + "/contacts/list/fields?access_token=" + this.api.config.auth_object.access_token;
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
	listContactNotes(contactId,queryParameters,callback) {
	    var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/notes";
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
	getSegmentMemberships(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/segments?access_token=" + this.api.config.auth_object.access_token;
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
	getCampaignMemberships(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/campaigns?access_token=" + this.api.config.auth_object.access_token;
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
	getActivityEventsForContact(contactId,queryParameters,callback) {
	    var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/activity";
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
	getContactCompanies(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/companies?access_token=" + this.api.config.auth_object.access_token;
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
	getContactDevices(contactId,callback){
		var url = this.api.config.api_endpoint + "/contacts/" + contactId + "/devices?access_token=" + this.api.config.auth_object.access_token;
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
