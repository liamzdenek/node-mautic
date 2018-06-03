const MauticAuth = require('./MauticAuth').default;
const MauticAssets = require('./MauticAssets').default;
const MauticCampaigns = require('./MauticCampaigns').default;
const MauticCategories = require('./MauticCategories').default;
const MauticCompanies = require('./MauticCompanies').default;
const MauticContacts = require('./MauticContacts').default;
const MauticDashboard = require('./MauticDashboard').default;
const MauticDynamicContent = require('./MauticDynamicContent').default;
const MauticEmails = require('./MauticEmails').default;
const MauticFields = require('./MauticFields').default;
const MauticForms = require('./MauticForms').default;
const MauticMarketingMessages = require('./MauticMarketingMessages').default;
const MauticNotes = require('./MauticNotes').default;
const MauticNotifications = require('./MauticNotifications').default;
const MauticPages = require('./MauticPages').default;
const MauticPointActions = require('./MauticPointActions').default;
const MauticPointTriggers = require('./MauticPointTriggers').default;
const MauticRoles = require('./MauticRoles').default;
const MauticSegments = require('./MauticSegments').default;
const MauticTextMessages = require('./MauticTextMessages').default;
const MauticStages = require('./MauticStages').default;
const MauticThemes = require('./MauticThemes').default;
const MauticTweets = require('./MauticTweets').default;
const MauticUsers = require('./MauticUsers').default;
const MauticWebhooks = require('./MauticWebhooks').default;

exports.default = class MauticAPI {
	constructor(config) {
		this._config = config;
	}
	
	get config() { return this._config; }
	set config(config) { Object.assign(this._config, config); }

	// ['auth', 'assets', 'campaigns', 'categories', 'companies', 'contacts', 'dashboard', 'dynamicContent', 'emails', 'fields', 'forms', 'marketingMessages', 'notes', 'notifications', 'pages', 'pointActions', 'pointTriggers', 'roles', 'segments', 'textMessages', 'stages', 'themes', 'tweets', 'users', 'webhooks'].reduce((acc,k) => `${acc}get ${k}() { return new Mautic${k[0].toUpperCase()}${k.slice(1)}(this); }\n`, '')
	get auth() { return new MauticAuth(this); }
	get assets() { return new MauticAssets(this); }
	get campaigns() { return new MauticCampaigns(this); }
	get categories() { return new MauticCategories(this); }
	get companies() { return new MauticCompanies(this); }
	get contacts() { return new MauticContacts(this); }
	get dashboard() { return new MauticDashboard(this); }
	get dynamicContent() { return new MauticDynamicContent(this); }
	get emails() { return new MauticEmails(this); }
	get fields() { return new MauticFields(this); }
	get forms() { return new MauticForms(this); }
	get marketingMessages() { return new MauticMarketingMessages(this); }
	get notes() { return new MauticNotes(this); }
	get notifications() { return new MauticNotifications(this); }
	get pages() { return new MauticPages(this); }
	get pointActions() { return new MauticPointActions(this); }
	get pointTriggers() { return new MauticPointTriggers(this); }
	get roles() { return new MauticRoles(this); }
	get segments() { return new MauticSegments(this); }
	get textMessages() { return new MauticTextMessages(this); }
	get stages() { return new MauticStages(this); }
	get themes() { return new MauticThemes(this); }
	get tweets() { return new MauticTweets(this); }
	get users() { return new MauticUsers(this); }
	get webhooks() { return new MauticWebhooks(this); }
}
