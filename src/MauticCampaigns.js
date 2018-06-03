const request = require('request');
const fs = require('fs');
const readline = require('readline');

exports.default = class MauticAuth {
	constructor(api) {
		this.api = api;	
	}
	getCampaign(campaignId,callback){
		request.get({
			url: this.api.config.api_endpoint + "/campaigns/" + campaignId + "?access_token=" + this.api.config.auth_object.access_token,
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
	listCampaigns(queryParameters,callback){
		var url = this.api.config.api_endpoint + "/campaigns";
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
	listCampaignContacts(campaignId,callback){
		var url = this.api.config.api_endpoint + "/campaigns/" + campaignId + "/contacts?access_token=" + this.api.config.auth_object.access_token;
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
	addContactToCampaign(campaignId,contactId,callback){
		var url = this.api.config.api_endpoint + "/campaigns/" + campaignId + "/contact/" + contactId + "/add?access_token=" + this.api.config.auth_object.access_token;
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
	removeContactFromCampaign(campaignId,contactId,callback){
		var url = this.api.config.api_endpoint + "/campaigns/" + campaignId + "/contact/" + contactId + "/remove?access_token=" + this.api.config.auth_object.access_token;
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
