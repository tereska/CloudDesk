
Ext.define('Stores.BuildList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'BuildList',
	proxy: {
		type: 'ajax',
		url: '/api/build/list',
		extraParams: {
			env: 'INT'
		},
		reader: {
			type: 'json'
		}
	},
	root: {
		text: 'Services',
		id: 'root', 
		expanded: true
	},
	folderSort: true,
	sorters: [{
		property: 'text',
		direction: 'ASC'
	}]
});