'use strict'

var request = require('request');
var fs = require('fs');
var readline = require('readline');
const MauticAPI = require('./MauticAPI').default;

module.exports.config = {
	base_url: "https://example.mautic.com",
	redirect_uri:"https://example.mautic.com/redirecthere",
	public_key: "EXAMPLE_PUBLIC_KEY",
	secret_key: "EXAMPLE_SECRET_KEY",
	state: "RANDOMSTATE",
	code: "",
	api_endpoint: "https://example.mautic.com/api"
};

module.exports.default = MauticAPI;
