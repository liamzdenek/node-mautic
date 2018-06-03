const MauticAPI = require('mautic-api-node').default;
const request = require('request');

const mautic = new MauticAPI({
	base_url: "https://example.mautic.com",
	redirect_uri: "https://www.mautic.com",
	public_key: "EXAMPLE_PUBLIC_KEY",
	secret_key: "EXAMPLE_SECRET_KEY",
	state: "RANDOM_STATE",
	code: "",
	api_endpoint: "https://example.mautic.com/api",
});


var logResult = function (asset) {
	console.log(asset.contact.fields.core);
};

var testFunction = function(config){
	if (config.auth_object) {
		var contactId = 111;
	 	mautic.contacts.getContact(config,contactId,logResult);
	}
};

mautic.auth.checkAuth(testFunction);
