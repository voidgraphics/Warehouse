( function(){

	"use strict";

	// Getting a reference to the window.
	var gui = require( "nw.gui" );
	var win = gui.Window.get();

	// Creating the tray object
	var tray = new gui.Tray( { icon: "img/icon.png" } );
	tray.tooltip = "Warehouse";

	// Populating the menu
	var menu = new gui.Menu();

	menu.append( new gui.MenuItem( { 
		label: "Change server settings",
		click: function(){
			global.openConfig();
		}
	} ) );

	menu.append( new gui.MenuItem( { 
		label: "Hide window",
		click: function(){
			win.hide();
		}
	} ) );

	menu.append( new gui.MenuItem( { 
		label: "Show window",
		click: function(){
			win.show();
		}
	} ) );

	menu.append( new gui.MenuItem( { 
		label: "Quit",
		click: function(){
			gui.App.closeAllWindows();
		}
	} ) );

	tray.menu = menu;

	global.openConfig = function(){
		var settings_win = gui.Window.open( 'settings.html', {
			"position": "center",
			"width": 300,
			"height": 400,
			"toolbar": false,
			"frame": false
		} );
	};

}) ();