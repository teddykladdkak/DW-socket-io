var http = require('http');
var fs = require('fs');
var path = require('path');
// Laddar config info
eval(fs.readFileSync('public/filer/config.js')+'');
//console.log(config);


//Startar server och tillåtna filer
var server = http.createServer(function (request, response) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = config.location.index;
    //Här radas alla tillåtna filer
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    //Säger till server att läsa och skicka fil till klient (Möjlighet att lägga till felmeddelanden)
    fs.readFile('./public/' + filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});
//Laddar sparad information från sparfil (save.json)
var loadsave = JSON.parse(fs.readFileSync(config.location.save, 'utf8'));
var sparadinfo = loadsave.information;
//Array med lista över alla användare
var allClients = [];
function loadusers(){
	//Laddar register där användarnamn är registrerade
	var loadstorednames = JSON.parse(fs.readFileSync(config.location.register, 'utf8'));
	//var storednames = loadstorednames.data;
	global['storednames'] = loadstorednames.data;
};
loadusers();
// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, username) {
	// When the client connects, they are sent a message
	socket.emit('message', 'You are connected!');
	// The other clients are told that someone new has arrived
	socket.broadcast.emit('message', 'Another client has just connected!');
	//Går igång när användare försöker logga in som admin
	socket.on('admin', function(userinfo) {
		//Username sparas
		console.log(userinfo);
		socket.username = userinfo.name;
		console.log(userinfo.name);
		console.log(userinfo.pw);
		var admin = false;
		for (var q = storednames.length - 1; q >= 0; q--) {
			if (storednames[q].name == socket.username) {
				console.log(storednames[q].admin)
				if(storednames[q].admin == true){
					if(storednames[q].losen == userinfo.pw){
						var admin = true;
					};
				};
			};
		};
		if(admin){
			socket.emit('admintrue', storednames);
		}else{
			console.log('Nope... Användare existerar inte eller har inte admin roll..')
		};
	});
	socket.on('savenewusers', function(data) {
		var jsonobj = {"data": data}
		//Uppdaterar register.json med uppdaterade listan av användare
		fs.writeFileSync(config.location.register, JSON.stringify(jsonobj, null, ' '));
		socket.emit('adminsparad', 'Ja!');
		loadusers();
		//var storednames = loadstorednames.data;
	});
	// As soon as the username is received, it's stored as a session variable
	socket.on('user', function(username) {
		socket.deleteuser = true;
		//Username sparas
		socket.username = username;
		//Kontrollerar ifall användare finns i register
		var userisinreg = false;
		for (var q = storednames.length - 1; q >= 0; q--) {
			if (storednames[q].name == socket.username) {
				userisinreg = true;
				editmode = storednames[q].edit;
			};
		};
//		console.log('Användare existerar? = ' + userisinreg);
		//Om användare finns fortsätt arbetet!
		if(userisinreg){
//			console.log('# Användare har loggat in med namnet: ' + socket.username);
			//Kontrollerar ifall användare redan är inloggad
			if (allClients.indexOf(socket.username) > -1) {
				//In the array!
				console.log('Användare är redan inloggad!');
				socket.deleteuser = false;
				//###Avbryt skicka info till sidan och avbryt kopplingen
				socket.emit('connectioninfo', 'Ditt användarnamn är redan använt! Du är inte inloggad. Testa igen.');
				//Tar bort koppling till sidan så inte användaren ska kunna redigera något
				socket.disconnect(true);
			} else {
				//Not in the array
				allClients.push(socket.username);
				//Ger ny client senaste informationen en bit i taget
				for (var i = sparadinfo.length - 1; i >= 0; i--) {
					socket.emit('textarea', sparadinfo[i]);
				};
				if(!editmode){
					socket.emit('readonly', 'aktiverad');
				};
			};
			//Username läggs till lista
			console.log(allClients);
		}else{
			//Användare finns inte i register och får därav inte informationen
//			console.log('Användare har försökt koppla upp sig med namnet "' + socket.username + '", finns inte i registret.');
			socket.emit('connectioninfo', 'Ditt användarnamn finns inte i registret. Var god kontakta din administratör.');
			socket.disconnect(true);
		};
	});

	//När användare disconectar tas namn bort
	socket.on('disconnect', function() {
		console.log('Got disconnect!');
		var i = allClients.indexOf(socket.username);
		//delete allClients[i];
		console.log(i);
		if(socket.deleteuser){
			if(i == -1){}else{
				allClients.splice(i, 1);
			};
		};
		console.log(allClients);
	});
	//Tar bort information med specifikt id från sparinfo array
	socket.on('removeinfo', function (message) {
		for (var i = sparadinfo.length - 1; i >= 0; i--) {
			if(sparadinfo[i].id == message){
				sparadinfo.splice(i, 1);
				socket.broadcast.emit('removeinfo', message);
			};
		};
	});
	socket.on('newpatient', function (message) {
		console.log(message);
		for (var y = message.length - 1; y >= 0; y--) {
			//Taggar uppdaterad del med användarnamnet
			message[y].user = socket.username;
			//Skickar ut förändringen till alla clienter
			socket.broadcast.emit('textarea', message[y]);
			// Variabel som säger att nytt objekt i array ska skapas (om det då inte ändras)
			var makenew = true;
			//Kollar genom alla nu sedan tidigare sparade objekt i "sparadinfo"
			for (var i = sparadinfo.length - 1; i >= 0; i--) {
				//Kollar ifall ett objekt med samma id redan existerar
				if(sparadinfo[i].id == message[y].id){
					//Uppdaterar med ny information
					sparadinfo[i] = message[y];
					//Änrar variabel som innan är satt, så inget nytt objekt skapas.
					var makenew = false;
					//Om all informaiton är borta, kan elementet lika bra tas bort, då det annars bara tar plats
					if(message[y].info == ''){
						sparadinfo.splice(i, 1);
					};
				};
			};
			//Skapar ett nytt objekt i array
			if(makenew){
				sparadinfo.push(message[y]);
			};
			//Visar i serverlogg senaste version av sparadinfo
	//		console.log(sparadinfo)
		};
	});
	//Startar när förändring skickas till servern
	socket.on('textarea', function (message) {
		// Serverloggen skriver ut vem och vad de skrivit
//		console.log('# ' + socket.username + ' is speaking to me! They\'re saying: ' + message.info);
		//Taggar uppdaterad del med användarnamnet
		message.user = socket.username;
		//Skickar ut förändringen till alla clienter
		socket.broadcast.emit('textarea', message);
		// Variabel som säger att nytt objekt i array ska skapas (om det då inte ändras)
		var makenew = true;
		//Kollar genom alla nu sedan tidigare sparade objekt i "sparadinfo"
		for (var i = sparadinfo.length - 1; i >= 0; i--) {
			//Kollar ifall ett objekt med samma id redan existerar
			if(sparadinfo[i].id == message.id){
				//Uppdaterar med ny information
				sparadinfo[i] = message;
				//Änrar variabel som innan är satt, så inget nytt objekt skapas.
				var makenew = false;
				//Om all informaiton är borta, kan elementet lika bra tas bort, då det annars bara tar plats
				if(message.info == ''){
					sparadinfo.splice(i, 1);
				};
			};
		};
		//Skapar ett nytt objekt i array
		if(makenew){
			sparadinfo.push(message);    
		};
		//Visar i serverlogg senaste version av sparadinfo
//		console.log(sparadinfo)
	});
	//Möjlighet att sända saveall kommando från client
	socket.on('saveall', function (message) {
		save();
	});
});
function skickaspara(message){
	
};
//Kollar IP adress för server.
function getIPAddress() {
	var interfaces = require('os').networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
			return alias.address;
		};
	};
	return '0.0.0.0';
};
function tid(eventuelltid){
	if(eventuelltid){
		/*var d = new Date(nyyear, nymonth, nyday);*/
		var tid = eventuelltid;
	}else{
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		if(h <= 9){var h = '0' + h;};
		if(m <= 9){var m = '0' + m;};
		var tid = h + ':' + m;
	};
	return tid;
};
function datum(eventuelltdatum){
	if(!eventuelltdatum){
		var d = new Date();
	}else{
		var nyyear = eventuelltdatum.split('-')[0];
		var nymonth = eventuelltdatum.split('-')[1] - 1;
		var nyday = eventuelltdatum.split('-')[2];
		var d = new Date(nyyear, nymonth, nyday);
	};
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if(day <= 9){var day = '0' + day;};
	if(month <= 9){var month = '0' + month;};
	var datetonumber = year + '-' + month + '-' + day;
	return datetonumber;
};
//Sätter save() funktionen i loop
setInterval(function() {
	save();
}, 1000 * 60 * config.saveloop);

//Sparar all information inom satt intervall eller på kommando
function save(){
	//Tar bort tomma nodes
	for (var i = sparadinfo.length - 1; i >= 0; i--) {
		if(sparadinfo[i].info == ''){
			sparadinfo.splice(i, 1);
		};
	};
	//Tar nuvarande datum
	var date = datum() + ' ' + tid();
//	console.log('Sparar loggfil... (' + date + ')');
	//Skapar nya json objektet
	var jsonobj = {"lastsave": "", "information": []}
		//Lägger till datum
		jsonobj.lastsave = date;
		//Lägger in all information en i taget
		for (var i = sparadinfo.length - 1; i >= 0; i--) {
			jsonobj.information.push(sparadinfo[i]);
		};
//	console.log(JSON.stringify(jsonobj, null, ' '));
	//Skriver in i sparfilen. ("null" lägger till nya rader)
	fs.writeFileSync(config.location.save, JSON.stringify(jsonobj, null, ' '));
};
/*function convertStringToArray(str, maxPartSize){

  const chunkArr = [];
  let leftStr = str;
  do {

    chunkArr.push(leftStr.substring(0, maxPartSize));
    leftStr = leftStr.substring(maxPartSize, leftStr.length);

  } while (leftStr.length > 0);

  return chunkArr;
};
function makeline(information){
	var beskrivningdivided = convertStringToArray(information, width - 4).reverse();
	for (var y = beskrivningdivided.length - 1; y >= 0; y--) {
		var beskrivninginfo = '##' + beskrivningdivided[y];
		var spacetoadd = (width - beskrivninginfo.length - 2);
		var beskrivningspacer = '';
		for (var a = spacetoadd - 1; a >= 0; a--) {
			var beskrivningspacer = beskrivningspacer + ' ';
		};
		var endline = beskrivninginfo + beskrivningspacer + '##';
		console.log(endline);
	};
};
function makerubrik(information){
	var letters = (width - information.length - 4) / 2;
	var spacer = ''
	for (var y = letters - 1; y >= 0; y--) {var spacer = spacer + ' ';};
	var rubrik = spacer + information + spacer;
	if(rubrik.length == width - 4){}else{var rubrik = rubrik + ' '};
	console.log('##' + rubrik + '##');
};


var ip = getIPAddress();
var width = config.cmd.infowidth;
var line = '';for (var y = width - 1; y >= 0; y--) {var line = line + '#';};
console.log(line);
console.log(line);
makerubrik(config.cmd.infostart);
console.log(line);
console.log(line);
config.cmd.versioner.reverse();
for (var i = config.cmd.versioner.length - 1; i >= 0; i--) {
	console.log(line);
	makeline(' ');
	makerubrik(config.cmd.versioner[i].namn);
	makeline(' ');
	console.log(line);
	makeline(config.cmd.versioner[i].beskrivning);
	console.log(line);
	makeline(config.cmd.infolink);
	makeline(config.cmd.infolocal + ': http://localhost:' + config.port + config.cmd.versioner[i].lank);
	makeline(config.cmd.infonetw + ': http://' + ip + ':' + config.port + config.cmd.versioner[i].lank);
	console.log(line);
	console.log(line);
};
makeline(' ');
makeline(config.cmd.infoturnoff);
makeline(' ');
console.log(line);
console.log(line);*/
var ip = getIPAddress();
console.log(config.cmd.infostart);
console.log(' ');
console.log(' ');
config.cmd.versioner.reverse();
for (var i = config.cmd.versioner.length - 1; i >= 0; i--) {
	console.log(config.cmd.versioner[i].namn);
	console.log(config.cmd.versioner[i].beskrivning);
	console.log(config.cmd.infolink);
	console.log(config.cmd.infolocal + ': http://localhost:' + config.port + config.cmd.versioner[i].lank);
	console.log(config.cmd.infonetw + ': http://' + ip + ':' + config.port + config.cmd.versioner[i].lank);
	console.log(' ');
	console.log(' ');
};
console.log(config.cmd.infoturnoff);
server.listen(config.port);