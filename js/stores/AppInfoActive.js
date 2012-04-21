
Ext.define('Stores.AppInfoActive', {
    extend: 'Ext.data.Store',

    storeId: 'AppInfoActive',
	pageSize: 1000,
	fields: ['appName', 'requested', 'instances'],
	proxy: {
		type: 'ajax',
		url: '/api/app/info',
		extraParams: {
			env: 'PROD',
			node: 'MicrositeController'
		},
		reader: {
			type: 'json',
			root: 'activegrid'
		}
	}
});