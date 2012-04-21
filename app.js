Ext.Loader.setConfig({
	disableCaching: false,
	enabled: true,
	paths: {
	  'Ext.ux': 'js/ux',
	  'MyDesktop': 'js/modules',
	  'Stores': 'js/stores'
	}
});

Ext.Loader.require('MyDesktop.App');

var myDesktopApp;

Ext.Loader.onReady(function () {
	var loadingMask = Ext.get('loading-mask');
	var loading = Ext.get('loading');
	loading.remove();
	loadingMask.remove();
	myDesktopApp = new MyDesktop.App();
});