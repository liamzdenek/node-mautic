const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getCompany(companyId,callback){
		var url = this.api.config.api_endpoint + "/companies/" + companyId + "?access_token=" + this.api.config.auth_object.access_token;
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
	listContactCompanies(callback){
		var url = this.api.config.api_endpoint + "/companies?access_token=" + this.api.config.auth_object.access_token;
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
	createCompany(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/companies/new?access_token=" + this.api.config.auth_object.access_token;
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
	editCompany(method,queryParameters,companyId,callback){
		var url = this.api.config.api_endpoint + "/companies/" + companyId + "/edit?access_token=" + this.api.config.auth_object.access_token;
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
	deleteCompany(companyId,callback){
		var url = this.api.config.api_endpoint + "/companies/" + companyId + "/delete?access_token=" + this.api.config.auth_object.access_token;
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
	addContactToCompany(companyId,contactId,callback){
		var url = this.api.config.api_endpoint + "/companies/" + companyId + "/contact/" + contactId + "/add?access_token=" + this.api.config.auth_object.access_token;
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
	removeContactFromCompany(companyId,contactId,callback){
		var url = this.api.config.api_endpoint + "/companies/" + companyId + "/contact/" + contactId + "/remove?access_token=" + this.api.config.auth_object.access_token;
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
