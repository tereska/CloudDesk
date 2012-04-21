
Ext.define('Stores.AppInfoBuilds', {
    extend: 'Ext.data.Store',

	storeId: 'AppInfoBuilds',
	pageSize: 1000,
	fields: ['appName'],
	proxy: {
		type: 'ajax',
		url: '/api/app/info',
		extraParams: {
			env: 'PROD',
			node: 'MicrositeController'
		},
		reader: {
			type: 'json',
			root: 'buildsgrid'
		}
	}
});