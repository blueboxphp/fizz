

var localStore = {
	clear: function () {
		window.localStorage.clear();
	},
	remove: function(key) {
		window.localStorage.removeItem(key);
	},
	set: function(key, value) {
		window.localStorage.setItem(key, value);
	},
	get: function(key) {
		return window.localStorage.getItem(key);
	},
	getKey: function(pos){
		return window.localStorage.key(pos);
	}
};

var app = {

  showAlert: function (title, message) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	registerEvents: function() {},

	processJson: function(data) {
		$.each(data, function(i, item){
			$('.loading').hide();
			switch(item.command) {
				case 'html_dump':
					$('#'+item.id).html(item.code);
					break;
				case 'after':
					$('#'+item.id).after(item.code);
					break;
				case 'append':
					$('#'+item.id).append(item.code);
					break;
				case 'rebuildForm':
					$('#'+item.form).trigger( "create" );
					break;
				case 'rebuildList':
					$('#'+item.list).listview('refresh');
					break;
				case 'rebuildSelect':
					$('#'+item.list).selectmenu('refresh');
					break;
				case 'updateImg':
					$('#'+item.id).attr('src', item.url);
					break;
				case 'mStore':
					localStore.set(item.key, item.data);
					break;
				case 'setValue':
					$(item.id).val(item.value);
					break;
				case 'showAlert':
					app.showAlert(item.alertTitle, item.alertMsg);
					break;
				case 'redirect':
					$.mobile.changePage(item.url);
					break;
				case 'callFunction':
					eval("("+item.callback+"());");
					break;
			}
		});	
	},

	initialize: function() {
		this.registerEvents();
	}

};


	function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	//
	var serviceURL = "http://madmedialabs-client.com/apps/services/public/";
	function onDeviceReady() {
		// Now safe to use the PhoneGap API called once
		localStore.set('serviceURL',"http://madmedialabs-client.com/apps/services/public/");
		//localStore.set('serviceURL',"http://10.0.2.2/kanto-services/public/");
		serviceURL = localStore.get('serviceURL');
		//var language = navigator.language.split("-");
		//localStore.set('language_root',language[0]);
	}
	
