
Ext.define('Stores.AppInfoInitialized', {
    extend: 'Ext.data.Store',

	storeId: 'AppInfoInitialized',
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
			root: 'initializedgrid'
		}
	}
});