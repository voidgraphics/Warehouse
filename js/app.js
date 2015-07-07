( function(){

	"use strict";

	// Main app

	var JSFtp = require( "jsftp" ),
		oSuccessAudio = new Audio( "sound/boop.ogg" );

	global.ftp_config = {
		host: null,
		port: 21,
		username: null,
		password: null,
		uploadPath: "/upload/"
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
		  port: global.ftp_config.port,
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

	var oDropbox = document.querySelector( "#drop" );
	var sInitialText = oDropbox.innerHTML;

	oDropbox.addEventListener( "dragover", function(){
		this.className = "hover";
		this.innerHTML = "Drop the file";
		return false;
	} );

	oDropbox.addEventListener( "dragleave", function(){
		this.className = "";
		this.innerHTML = sInitialText;
		return false;
	} );

	oDropbox.addEventListener( "drop", function( e ){
		e.preventDefault();

		var string = e.dataTransfer.files.length > 1 ? " files" : " file";

		oDropbox.innerHTML = "Uploading " + e.dataTransfer.files.length + string;
		for( var i = 0; i < e.dataTransfer.files.length; i++ ){
			var file = e.dataTransfer.files[i].path;
			global.Ftp.put( file, global.ftp_config.uploadPath + e.dataTransfer.files[i].name, function( error ) {
				if ( error ) {
					console.error( error );
				}
				else {
					oDropbox.innerHTML = "Success!";
					
					oSuccessAudio.play();

				} 
			});
		}
	} );

	window.addEventListener( "dragover", preventOpeningOfFile );
	window.addEventListener( "drop", preventOpeningOfFile );



} )();