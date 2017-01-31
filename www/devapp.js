jQuery.sap.declare("Reader1.devapp");

Reader1.devapp = {
	smpInfo: {},
	devLogon: null,

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener("deviceready", jQuery.proxy(this.onDeviceReady, this), false);
	},

	onDeviceReady: function() {
		startApp();
	}
};