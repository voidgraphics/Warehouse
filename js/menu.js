( function(){

	"use strict";

	// Getting a reference to the window.
	var gui = require( "nw.gui" );
	var win = gui.Window.get();
	win.show();
	// Creating the tray object
	var tray = new gui.Tray( { icon: "img/icon.png" } );
	tray.tooltip = "Warehouse";

	// Populating the menu
	var menu = new gui.Menu();

	menu.append( new gui.MenuItem( { enabled: false, label: "Warehouse" } ) );
	menu.append( new gui.MenuItem( { type: "separator" } ) );

	var configItem = new gui.MenuItem( { 
		label: "Change server settings",
		click: function(){
			global.openConfig();
		}
	} );
	menu.append( configItem );

	var clipboardItem = new gui.MenuItem( { 
		label: "Copy link to clipboard",
		type: "checkbox",
		checked: false,
		click: function(){
			if( this.checked ){
				global.bIsClipBoardEnabled = true;
			} else {
				global.bIsClipBoardEnabled = false;
			}
		}
	} );
	menu.append( clipboardItem );

	menu.append( new gui.MenuItem( { type: "separator" } ) );

	var alwaysOnTopItem = new gui.MenuItem( { 
		label: "Always on top",
		type: "checkbox",
		checked: false,
		click: function(){
			if( this.checked ){
				win.setAlwaysOnTop( true );
			} else {
				win.setAlwaysOnTop( false );
			}
		}
	} );
	menu.append( alwaysOnTopItem );

	var hideItem = new gui.MenuItem( { 
		label: "Hide window",
		click: function(){
			win.hide();
			menu.remove( hideItem );
			menu.insert( showItem, 6 );
		}
	} );
	menu.append( hideItem );

	var showItem = new gui.MenuItem( { 
		label: "Show window",
		click: function(){
			win.show();
			menu.remove( showItem );
			menu.insert( hideItem, 6 );
		}
	} );

	menu.append( new gui.MenuItem( { type: "separator" } ) );

	var quitItem = new gui.MenuItem( { 
		label: "Quit",
		click: function(){
			gui.App.closeAllWindows();
		}
	} );
	menu.append( quitItem );

	tray.menu = menu;


	global.openConfig = function(){
		var settings_win = gui.Window.open( 'settings.html', {
			"position": "center",
			"width": 300,
			"height": 480,
			"toolbar": false,
			"frame": false
		} );
	};

	document.body.addEventListener( 'contextmenu', function( e ) { 
	  e.preventDefault();
	  menu.popup( e.x, e.y );
	  return false;
	} );

}) ();