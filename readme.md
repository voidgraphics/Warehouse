#Warehouse

###What is it?

Warehouse is a simple app to drag/drop files to upload them via FTP to your server.  
Please note that's it's still in the very early stages of development, I have a lot of work to do on it.

![Screenshot of Warehouse on OS X](http://void.graphics/download/warehouse.png)  
*Temporary design.*

###But my FTP client already does that!
True. However if you're like me and you store a lot of your files on your server, having to start up your FTP client everytime you want to do a quick upload is a bit annoying. It takes more steps than it should, and this app is a way to get around that.

###How does it work?
Very easy: just launch the app and drag/drop your file to the small window.  
However you will have to configure it the first time to specify your server info.
To do that, right-click on the tray item and select "Change server settings".  
You can leave it running in the background so you don't have to re-open the app everytime. There's options in the tray menu to show and hide the app.  
You can also resize it by dragging from the edges to make it as big or small as you want.

###What's the tech behind it?
This app is built with [NW.js](https://github.com/nwjs/nw.js) (formerly known as node-webkit) and [jsftp](https://github.com/sergi/jsftp).  
If you're going to play with the code, don't forget to run `npm install` to get the dependencies.

###How do I run it?
You will need to download the NW.js executable for your operating system at [nwjs.io](http://nwjs.io), place those files in the folder containing my code and run the nwjs.app or nwjs.exe file.

###What's planned for the future of Warehouse?

Many, many things.

- [] Saving your settings using localStorage
- [] Make a proper design for it
- [] Give an option to enable a full-featured FTP interface
- [] Auto-copy url to clipboard (+ option to turn it off) for easy sharing
- And more to come as I think of new things.