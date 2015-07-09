( function(){

	"use strict";

	var gui = require('nw.gui');
	var win = gui.Window.get();

	var saveData = function( e ){

		e.preventDefault();

		var host = document.querySelector( "#host" ).value;
		var port = document.querySelector( "#port" ).value;
		var username = document.querySelector( "#username" ).value;
		var password = document.querySelector( "#password" ).value;
		var path = document.querySelector( "#path" ).value;
		var link = document.querySelector( "#link" ).value;
		var remember = document.querySelector( "#remember" ).checked;

		console.log( "remember: " + remember );

		var bHostOK = ( host !== "" ) ? true : false;
		var bUsernameOK = ( username !== "" ) ? true : false;
		var bPasswordOK = ( password !== "" ) ? true : false;
		port = ( port === "" ) ? 21 : port; 
		path = ( path === "" ) ? "/upload/" : path; 

		if( bHostOK && bUsernameOK && bPasswordOK ){
			console.log( "everything ok" );

			if( remember ){
				localStorage.setItem( "host", host );
				localStorage.setItem( "port", port );
				localStorage.setItem( "username", username );
				localStorage.setItem( "password", password );
				localStorage.setItem( "uploadPath", path );
				localStorage.setItem( "publicLink", link );
			}

			global.ftp_config.host = host;
			global.ftp_config.port = port;
			global.ftp_config.username = username;
			global.ftp_config.password = password;
			global.ftp_config.uploadPath = path;
			global.ftp_config.publicLink = link;
			global.ftp_connect();
		} else {
			console.error( "missing info" );
			if( !bPasswordOK ){
				document.querySelector( "#password" ).className = "error";
			}
			if( !bUsernameOK ){
				document.querySelector( "#username" ).className = "error";
			}
			if( !bHostOK ){
				document.querySelector( "#host" ).className = "error";
			}
		}

	};

	var oSubmitBtn = document.querySelector( "#save" );
	oSubmitBtn.addEventListener( "click", saveData );
	var oCloseBtn = document.querySelector( "#close" );
	oCloseBtn.addEventListener( "click", function(){
		win.close(true);
	} );


} )();