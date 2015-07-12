( function(){

	"use strict";

	// Main app

	var JSFtp = require( "jsftp" ),
		oSuccessAudio = new Audio( "sound/boop.ogg" );

	global.bIsClipBoardEnabled = false;

	var gui = require('nw.gui');
	var clipboard = gui.Clipboard.get();

	global.ftp_config = {
		host: localStorage.getItem( "host" ),
		port: localStorage.getItem( "port" ),
		username: localStorage.getItem( "username" ),
		password: localStorage.getItem( "password" ),
		uploadPath: localStorage.getItem( "uploadPath" ),
		publicLink: localStorage.getItem( "publicLink" )
	};

	var checkConfig = function(){
		if( global.ftp_config.host === null || global.ftp_config.port === null || global.ftp_config.username === null || global.ftp_config.password === null ){
			return false;
		}
		return true;
	};

	global.ftp_connect = function(){
		global.Ftp = new JSFtp({
		  host: global.ftp_config.host,
		  port: global.ftp_config.port
		});

		global.Ftp.auth( global.ftp_config.username, global.ftp_config.password, function(){
			console.log( "Authenticated: " + global.Ftp.authenticated );
			if( global.Ftp.authenticated ){
				oSuccessAudio.play();
			}
		} );
	};

	if( checkConfig() ){
		global.ftp_connect();
	} else {
		global.openConfig();
	}

	var preventOpeningOfFile = function( e ){
		e.preventDefault();
		return false;
	};

	var revert = function(){
		setTimeout( function(){
			oDropbox.className = "";
		}, 2000 );
	};

	var oDropbox = document.querySelector( "#drop" );

	oDropbox.addEventListener( "dragover", function(){
		this.className = "hover";
		this.firstChild.src = "img/send_arrow_active.svg";
		return false;
	} );

	oDropbox.addEventListener( "dragleave", function(){
		this.className = "";
		return false;
	} );

	oDropbox.addEventListener( "drop", function( e ){
		e.preventDefault();
		oDropbox.className = "";

		for( var i = 0; i < e.dataTransfer.files.length; i++ ){
			var file_path = e.dataTransfer.files[i].path;
			var file_name = e.dataTransfer.files[i].name

			oDropbox.className = "loading";

			global.Ftp.put( file_path, global.ftp_config.uploadPath + file_name, function( error ) {
				if ( error ) {
					console.error( error );
					oDropbox.className = "error";
					revert();
				}
				else {
					console.log( "File uploaded successfully" );
					oDropbox.className = "success";
					oSuccessAudio.play();
					if( global.bIsClipBoardEnabled ){
						clipboard.set( global.ftp_config.publicLink + file_name, "text" );
					}
					revert();
				} 
			});
		}
	} );

	window.addEventListener( "dragover", preventOpeningOfFile );
	window.addEventListener( "drop", preventOpeningOfFile );



} )();