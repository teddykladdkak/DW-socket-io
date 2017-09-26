function medicinskbedomnbutton(number){
	var wrapper = document.getElementById('tableroom' + number).getElementsByClassName('roomnumber')[0];
	if(!wrapper.getAttribute('style')){
		return config.medicinskbedomningknapp.huvudtext + config.medicinskbedomningknapp.off;
	}else{
		return config.medicinskbedomningknapp.huvudtext + config.medicinskbedomningknapp.on;
	};
};
function medicinskbedomn(element, number){
	var wrapper = document.getElementById('tableroom' + number).getElementsByClassName('roomnumber')[0];
	if(!wrapper.getAttribute('style')){
		element.value = medicinskbedomnbutton(number);
		savetohdd(number + '|||||medicinskbedomn', 'true');
		wrapper.setAttribute('style', config.medicinskbedomningknapp.style);
	}else{
		element.value = medicinskbedomnbutton(number);
		removefromhdd(number + '|||||medicinskbedomn');
		wrapper.removeAttribute('style');
	};
	hidemenu();
};
function afterloadscripts(){
	var header = document.getElementsByTagName('head')[0];
	for (var i = config.externalscriptafterload.length - 1; i >= 0; i--) {
		var nyscript = document.createElement('script');
			nyscript.setAttribute('type', 'application/javascript');
			nyscript.setAttribute('src', config.location.externalfolder + config.externalscriptafterload[i] + '.js');
		header.appendChild(nyscript);
	};
};
function loadscripts(){
	var header = document.getElementsByTagName('head')[0];
	for (var i = config.externalscript.length - 1; i >= 0; i--) {
		var nyscript = document.createElement('script');
			nyscript.setAttribute('type', 'application/javascript');
			nyscript.setAttribute('src', config.location.externalfolder + config.externalscript[i] + '.js');
		header.appendChild(nyscript);
	};
};
loadscripts();
var touchredigera;
function todotouchstart(element) {
    touchredigera = setTimeout(function(){ redigeratodo(element) }, config.tidtodoredigerahalla);
};
function todotouchstop(element) {
    clearTimeout(touchredigera);
};
function redigeratodo(element) {
	clearTimeout(touchredigera);
	var bedinfo = element.parentElement.getAttribute('name').split('|||||');
	var parent = element.parentElement;
	element.parentElement.removeChild(element);
	hidemenu();
	addhistory('Punkten "' + element.innerText + '"', 'redigeras', bedinfo[0], bedinfo[1]);
	save(parent);
	clearTimeout(showmenydelay);
	showmeny(bedinfo[1], bedinfo[0], 'redigeratodo');
	setTimeout(function(){
		getmoreinfo("annat", bedinfo[0], "text", bedinfo[1], element.innerText, "Skriv text nedan, för att lägga till en ny punkt");
		var allbuttons = document.getElementById('kontroller').getElementsByTagName('input');
		allbuttons[allbuttons.length - 1].setAttribute('onclick', 'getmoreinfo("' + element.innerText.replace('\n', '') + '", "' + bedinfo[0] + '", "none", "' + bedinfo[1] + '", "", "");');
		
	}, config.whaitondoubleclick + 1);
};
function addgray(el){
	if (el.value === '') {
		el.classList.add("empty");
	} else {
		el.classList.remove("empty");
	};
};
function checkallinputdates(){
	var allinput = document.getElementsByTagName('input');
	for (var i = allinput.length - 1; i >= 0; i--) {
		if(allinput[i].getAttribute('type') == 'date') {
			addgray(allinput[i]);
		};
	};
};
function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
};
var kollagomdinfoloop;
function startkollagomdinfo(){
	kollagomdinfo();
	clearInterval(kollagomdinfoloop);
	kollagomdinfoloop = setInterval(kollagomdinfo, config.sektocheckinfoutanfor * 1000);
};
function kollagomdinfo(){
	var top = document.getElementById('moreinfotop');
	var bottom = document.getElementById('moreinfobottom');
	var alllines = document.getElementsByClassName('tableroom');
	if(isScrolledIntoView(alllines[0])){
		top.removeAttribute('style');
	}else{
		top.setAttribute('style', 'display: block;');
	};
	if(isScrolledIntoView(alllines[alllines.length - 1])){
		bottom.removeAttribute('style');
	}else{
		bottom.setAttribute('style', 'display: block;');
	};
};
var alertinfoett;
function alertbox(type, info, functiontodo){
	hidemenu();
	var element = document.getElementById('alert');
	while (element.hasChildNodes()) {element.removeChild(element.firstChild);};
	if(type == 'confirm'){
		var p = document.createElement('p');
			var ptext = document.createTextNode(info);
			p.appendChild(ptext);
		element.appendChild(p);
		var br = document.createElement('br');
		element.appendChild(br);
		var ja = document.createElement('input');
			ja.setAttribute('type', 'button');
			ja.setAttribute('value', 'Ja');
			ja.setAttribute('onclick', 'closealert();' + functiontodo);
		element.appendChild(ja);
		var nej = document.createElement('input');
			nej.setAttribute('type', 'button');
			nej.setAttribute('value', 'Nej');
			nej.setAttribute('onclick', 'closealert();');
		element.appendChild(nej);
		element.removeAttribute('style');
	}else if(type == 'alert'){
		var p = document.createElement('p');
			var ptext = document.createTextNode(info);
			p.appendChild(ptext);
		element.appendChild(p);
		var br = document.createElement('br');
		element.appendChild(br);
		var ok = document.createElement('input');
			ok.setAttribute('type', 'button');
			ok.setAttribute('value', 'Stäng');
			ok.setAttribute('onclick', 'closealert();');
		element.appendChild(ok);
		element.removeAttribute('style');
	}else{
		console.log('Något gick fel i "alertbox()".');
	};
};
function closealert(){
	var element = document.getElementById('alert');
		element.setAttribute('style', 'display: none;');
	while (element.hasChildNodes()) {element.removeChild(element.firstChild);};
};
var scrolldelay;
window.onscroll = function() {
	clearTimeout(scrolldelay);
	scrolldelay = setTimeout(function(){
		dothescroll();
	}, config.sekresetscroll * 1000);
	startkollagomdinfo();
};
function dothescroll(){
	var bodyelement = document.getElementsByTagName('body')[0];
		bodyelement.scrollTop = 0;
		bodyelement.scrollTop = config.spacersize;
};
/*window.onbeforeunload = function(e) {
	if(config.onclose.savelogg){
		savelogg();
	};
	if(!config.onclose.nomessage){
		return config.messageonclose;
	};
};*/
function loadnyheter(){
	var nyheterwrapper = document.getElementById('nyheter');
	for(i=0;i<nyheterflode.length;i++){
		var titel = document.createElement('h3');
			var titeltext = document.createTextNode(nyheterflode[i].titel);
			titel.appendChild(titeltext);
		nyheterwrapper.appendChild(titel);
		var datum = document.createElement('p');
			var datumtext = document.createTextNode(nyheterflode[i].datum);
			datum.appendChild(datumtext);
		nyheterwrapper.appendChild(datum);
		var text = document.createElement('p');
			var texttext = document.createTextNode(nyheterflode[i].text);
			text.appendChild(texttext);
		nyheterwrapper.appendChild(text);
	};
};
var doubleclickklickad = false;
var doubleclickonetap;
var trippleclickklickad = false;
var trippleclickonetap;
function doubleclick(ett, tva, element) {
    if (window['doubleclickklickad']){
	    clearTimeout(doubleclickonetap);
	    window['doubleclickklickad'] = false;
	    if (window['trippleclickklickad']){
		    clearTimeout(trippleclickonetap);
		    window['trippleclickklickad'] = false;
		    setTimeout(function(){clearTimeout(showmenydelay);hidemenu();}, config.whaitondoubleclick);
		    window[tva](element);
	    }else{
		    if(!ett){
			    trippleclickonetap = setTimeout(function(){clearTimeout(showmenydelay); window['doubleclickklickad'] = false; window['trippleclickklickad'] = false; }, config.whaitondoubleclick);
		    }else{
			    trippleclickonetap = setTimeout(function(){clearTimeout(showmenydelay); setTimeout(function(){hidemenu();}, config.whaitondoubleclick); window[ett](element); window['doubleclickklickad'] = false; window['trippleclickklickad'] = false; }, config.whaitondoubleclick);
		    };
		    window['trippleclickklickad'] = true;
		    window['doubleclickklickad'] = true;
	    };
    }else{
		doubleclickonetap = setTimeout(function(){ window['doubleclickklickad'] = false; }, config.whaitondoubleclick);
        window['doubleclickklickad'] = true;
    };
};
var starttoken = false;
function onload(){
	loadnyheter();
	if(!getfromhdd('historia')){
		addhistory('Sida', 'laddades', '', '');
	}else{
		var historikelement = getfromhdd('historia').split('|||||');
		var historikwrapper = document.getElementById('historikwrapper');
		for(i=0;i<historikelement.length;i++){
			var paragraf = document.createElement('p');
				var paragraftext = document.createTextNode(historikelement[i]);
				paragraf.appendChild(paragraftext);
			historikwrapper.appendChild(paragraf);
		};
		addhistory('Sida', 'uppdaterades', '', '');
	};
	loadinstallningar();
	laddavardplaner();
	if(!getfromhdd('installning|||||pw')){}else{document.getElementById('andralosen').value = 'Ändra lösenord';};
	for(i=0;i<4;i++){document.getElementsByName('installning|||||vplcolor[' + i + ']')[0].value = config.vplcolor[i];};
	document.getElementsByName('installning|||||duetodaystyle')[0].value = config.duetodaystyle;
	document.getElementsByName('installning|||||overduestyle')[0].value = config.overduestyle;
	document.getElementsByName('installning|||||dueandoverduestyle')[0].value = config.dueandoverduestyle;
	var lastmodified = document.getElementById('datumsenastredigerad');
		var lastmodifiedtext = document.createTextNode(document.lastModified)
		while (lastmodified.hasChildNodes()) {lastmodified.removeChild(lastmodified.firstChild);};
		lastmodified.appendChild(lastmodifiedtext);
	var ikonbeskrivning = document.getElementById('icobeskrivning');
		var ikonbeskrivningt = document.createElement('table');
			var ikonbeskrivningtb = document.createElement('tbody');
			for(b=0;b<config.icotodo.length-1;b++){
				var ikonbeskrivningtbtr = document.createElement('tr');
					var ikonbeskrivningtbtrtd = document.createElement('td');
						var ikonbeskrivningtbtrtdimage = document.createElement('img');
							ikonbeskrivningtbtrtdimage.setAttribute('src', config.icolink[0] + config.icotodo[b].namn + config.icolink[1]);
							ikonbeskrivningtbtrtdimage.setAttribute('title', config.icotodo[b].title);
						ikonbeskrivningtbtrtd.appendChild(ikonbeskrivningtbtrtdimage);
					ikonbeskrivningtbtr.appendChild(ikonbeskrivningtbtrtd);
					var ikonbeskrivningtbtrtdtext = document.createElement('td');
						var ikonbeskrivningtbtrtdtexttext = document.createTextNode(config.icotodo[b].title);
						ikonbeskrivningtbtrtdtext.appendChild(ikonbeskrivningtbtrtdtexttext);
					ikonbeskrivningtbtr.appendChild(ikonbeskrivningtbtrtdtext);
				ikonbeskrivningtb.appendChild(ikonbeskrivningtbtr);
			};
			ikonbeskrivningt.appendChild(ikonbeskrivningtb);
		ikonbeskrivning.appendChild(ikonbeskrivningt);
	var doljsangarwrapper = document.getElementById('doljsangar');
	for(i=0;i<config.roomnumbers.length;i++){
		var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('class', 'dontsave');
			checkbox.setAttribute('checked', '');
			checkbox.setAttribute('onclick', 'toogletr(this, "' + config.roomnumbers[i].replace(':', '-') + '")');
		doljsangarwrapper.appendChild(checkbox);
		var label = document.createElement('label');
			var labeltext = document.createTextNode(config.roomnumbers[i]);
			label.appendChild(labeltext);
		doljsangarwrapper.appendChild(label);
		var colorsangar = document.createElement('input');
			colorsangar.setAttribute('type', 'color');
			colorsangar.setAttribute('class', 'dontsave');
			colorsangar.setAttribute('value', '#FFFFFF');
			colorsangar.setAttribute('onchange', 'markline(this, "' + config.roomnumbers[i].replace(':', '-') + '")');
		doljsangarwrapper.appendChild(colorsangar);
		var brake = document.createElement('br');
		doljsangarwrapper.appendChild(brake);
	};
		var stanginput = document.createElement('input');
			stanginput.setAttribute('type', 'button');
			stanginput.setAttribute('value', 'Stäng');
			stanginput.setAttribute('onclick', 'showhide("doljsangar");');
		doljsangarwrapper.appendChild(stanginput);
	var tbody = document.getElementById('contentwrapper').getElementsByTagName('tbody')[0];
		var datalistkost = document.getElementById('kost');
		for(a=0;a<config.kost.length;a++){
			var nutritionselectoption = document.createElement('option');
				nutritionselectoption.setAttribute('value', config.kost[a]);
			datalistkost.appendChild(nutritionselectoption);
		};
		var datalistingrepp = document.getElementById('op');
		for(a=0;a<config.ingrepp.length;a++){
			var ingreppselectoption = document.createElement('option');
				ingreppselectoption.setAttribute('value', config.ingrepp[a]);
			datalistingrepp.appendChild(ingreppselectoption);
		};
		var datalistextra = document.getElementById('opextra');
		for(a=0;a<config.ingreppextra.length;a++){
			var datalistextraoption = document.createElement('option');
				datalistextraoption.setAttribute('value', config.ingreppextra[a]);
			datalistextra.appendChild(datalistextraoption);
		};
		for(i=0;i<config.roomnumbers.length;i++){
			var line = document.createElement('tr');
				line.setAttribute('id', 'tableroom' + config.roomnumbers[i].replace(':', '-'));
				line.setAttribute('class', 'tableroom');
				var roomnumber = document.createElement('td');
					roomnumber.setAttribute('class', 'roomnumber');
					roomnumber.setAttribute('onclick', 'showmeny("roomnumber", "' + config.roomnumbers[i].replace(':', '-') + '");');
					var roomnumbertext = document.createTextNode(config.roomnumbers[i]);roomnumber.appendChild(roomnumbertext);line.appendChild(roomnumber);
				var patient = document.createElement('td');
					patient.setAttribute('class', 'patientinfo');
					var patienttext = document.createElement('input');
						patienttext.setAttribute('type', 'text');
						patienttext.setAttribute('maxlength', '3');
						patienttext.setAttribute('size', '3');
						patienttext.setAttribute('onkeypress', 'addcolon(this);');
						patienttext.setAttribute('onkeyup', 'removecolon(this);');
						patienttext.setAttribute('placeholder', 'X:X');
						patienttext.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||namn');
					patient.appendChild(patienttext);
					var patientyear = document.createElement('input');
						patientyear.setAttribute('type', 'text');
						patientyear.setAttribute('maxlength', '3');
						patientyear.setAttribute('size', '3');
						patientyear.setAttribute('onkeypress', 'alderaddline(this);');
						patientyear.setAttribute('onkeyup', 'alderremoveline(this);');
						patientyear.setAttribute('placeholder', '-ÅÅ');
						patientyear.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||alder');
					patient.appendChild(patientyear);
					var genderspan = document.createElement('span');
						genderspan.setAttribute('class', 'gender');
						var manimg = document.createElement('img');
							manimg.setAttribute('style', 'width: 50%;');
							manimg.setAttribute('src', config.genderlink[0] + 'man' + config.genderlink[1]);
							manimg.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||gender');
							manimg.setAttribute('class', 'genderimage');
							manimg.setAttribute('onclick', 'chosegender(this)');
						genderspan.appendChild(manimg);
						var kvinnaimg = document.createElement('img');
							kvinnaimg.setAttribute('style', 'width: 50%;');
							kvinnaimg.setAttribute('src', config.genderlink[0] + 'kvinna' + config.genderlink[1]);
							kvinnaimg.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||gender');
							kvinnaimg.setAttribute('class', 'genderimage');
							kvinnaimg.setAttribute('onclick', 'chosegender(this)');
						genderspan.appendChild(kvinnaimg);
					patient.appendChild(genderspan);
					var buttonbakgrund = document.createElement('input');
						buttonbakgrund.setAttribute('type', 'button');
						buttonbakgrund.setAttribute('onclick', 'showpatblad("' + config.roomnumbers[i].replace(':', '-') + '")');
						buttonbakgrund.setAttribute('value', 'SBAR');
						buttonbakgrund.setAttribute('class', 'patblad');
					patient.appendChild(buttonbakgrund);
				line.appendChild(patient);
				var opdat = document.createElement('td');
					var opdatdate = document.createElement('input');
						opdatdate.setAttribute('type', 'date');
						opdatdate.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||opdate');
						opdatdate.setAttribute('onchange', 'standardvardplan(this);addgray(this);');
					opdat.appendChild(opdatdate);
					var opdatbrake = document.createElement('br');
					opdat.appendChild(opdatbrake);
					var opdattext = document.createElement('input');
						opdattext.setAttribute('type', 'text');
						opdattext.setAttribute('placeholder', 'Typ av operation');
						opdattext.setAttribute('list', 'op');
						opdattext.setAttribute('onchange', 'extendinput(this);standardvardplan(this);');
						opdattext.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||optext');
					opdat.appendChild(opdattext);
					var opdatbraketwo = document.createElement('br');
					opdat.appendChild(opdatbraketwo);
					var opdatextra = document.createElement('input');
						opdatextra.setAttribute('type', 'text');
						opdatextra.setAttribute('list', 'opextra');
						opdatextra.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||opextra');
					opdat.appendChild(opdatextra);
				line.appendChild(opdat);
				var aktuellt = document.createElement('td');
					aktuellt.setAttribute('contenteditable', 'true');
					aktuellt.setAttribute('class', 'editable');
					aktuellt.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||aktuellt');
				line.appendChild(aktuellt);
				var uppgifter = document.createElement('td');
					uppgifter.setAttribute('onclick', 'showmeny("uppgifter", "' + config.roomnumbers[i].replace(':', '-') + '");');
					uppgifter.setAttribute('class', 'uppgifter');
					var uppgifterlist = document.createElement('ul');
						uppgifterlist.setAttribute('class', 'todolist');
						uppgifterlist.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||uppgifter');
					uppgifter.appendChild(uppgifterlist);
				line.appendChild(uppgifter);
				var kontroll = document.createElement('td');
					kontroll.setAttribute('onclick', 'showmeny("kontroller", "' + config.roomnumbers[i].replace(':', '-') + '");');
					kontroll.setAttribute('class', 'kontroller');
					var kontrolllist = document.createElement('ul');
						kontrolllist.setAttribute('class', 'todolist');
						kontrolllist.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||kontroller');
					kontroll.appendChild(kontrolllist);
				line.appendChild(kontroll);
				var nutrition = document.createElement('td');
					var nutritionselect = document.createElement('input');
						nutritionselect.setAttribute('class', 'kostselect');
						nutritionselect.setAttribute('list', 'kost');
						nutritionselect.setAttribute('type', 'text');
						nutritionselect.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||kost');
					nutrition.appendChild(nutritionselect);
					var nutritiontextarea = document.createElement('textarea');
						nutritiontextarea.setAttribute('class', 'nutritiontextarea');
						nutritiontextarea.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||extrakost');
					nutrition.appendChild(nutritiontextarea);
				line.appendChild(nutrition);
				var obs = document.createElement('td');
					obs.setAttribute('class', 'obsicon');
					obs.setAttribute('onclick', 'showmeny("obsicon", "' + config.roomnumbers[i].replace(':', '-') + '");');
					for(a=0;a<config.icotodo.length-1;a++){
						var imgwrapper = document.createElement('div');
							imgwrapper.setAttribute('class', 'tooltip');
							imgwrapper.setAttribute('ontouchstart', 'showtitle(this);');
							imgwrapper.setAttribute('ontouchend', 'hidetitle(this);');
							imgwrapper.setAttribute('onmousedown', 'showtitle(this);');
							imgwrapper.setAttribute('onmouseup', 'hidetitle(this);');
							imgwrapper.setAttribute('onclick', 'doubleclick("", "removeicontrippel", this);');
							var obsimg = document.createElement('img');
								obsimg.setAttribute('src', config.icolink[0] + config.icotodo[a].namn + config.icolink[1]);
								obsimg.setAttribute('class', config.icotodo[a].namn + ' notactive');
								obsimg.setAttribute('title', config.icotodo[a].title);
							imgwrapper.appendChild(obsimg);
							var obsimgtitle = document.createElement('span');
								obsimgtitle.setAttribute('class', 'tooltiptext');
								var obsimgtitletext = document.createTextNode(config.icotodo[a].title);
								obsimgtitle.appendChild(obsimgtitletext);
							imgwrapper.appendChild(obsimgtitle);
						obs.appendChild(imgwrapper);
						/*obs.appendChild(obsimg);*/
					};
						var obstext = document.createElement('div');
							obstext.setAttribute('id', 'icotext' + config.roomnumbers[i].replace(':', '-'));
							obstext.setAttribute('class', 'icotext');
						obs.appendChild(obstext);
				line.appendChild(obs);
				var utskriv = document.createElement('td');
					var utskrivtable = document.createElement('table');
						utskrivtable.setAttribute('class', 'vpl');
						var utskrivtabletr = document.createElement('tr');
							var utskrivtabletrtd = document.createElement('td');
								var planutinput = document.createElement('input');
									planutinput.setAttribute('type', 'date');
									planutinput.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||utdate');
									planutinput.setAttribute('onchange', 'addgray(this);');
								utskrivtabletrtd.appendChild(planutinput);
								var utskrivanteck = document.createElement('textarea');
									utskrivanteck.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||utinfo');
								utskrivtabletrtd.appendChild(utskrivanteck);
								var hemtransport = document.createElement('select');
									hemtransport.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||planut');
									var hemtransportstart = document.createElement('option');
										var hemtransportstarttext = document.createTextNode(' ');
										hemtransportstart.appendChild(hemtransportstarttext);
									hemtransport.appendChild(hemtransportstart);
								for(f=0;f<config.hemtransport.length;f++){
									var hemtransportoption = document.createElement('option');
										var hemtransportoptiontext = document.createTextNode(config.hemtransport[f]);
										hemtransportoption.appendChild(hemtransportoptiontext);
									hemtransport.appendChild(hemtransportoption);
								};
								utskrivtabletrtd.appendChild(hemtransport);
							utskrivtabletr.appendChild(utskrivtabletrtd);
							var utskrivtabletrtdextra = document.createElement('td');
								utskrivtabletrtdextra.setAttribute('class', 'vplimg');
								var vplimg = document.createElement('img');
									vplimg.setAttribute('src', config.vpllink[0] + 1 + config.vpllink[1]);
									vplimg.setAttribute('onclick', 'changevplstatus(1, this);');
									vplimg.setAttribute('name', config.roomnumbers[i].replace(':', '-') + '|||||vplimg');
									if(getfromhdd('installning|||||vplcolor[0]')){config.vplcolor[0] = getfromhdd('installning|||||vplcolor[0]');};
									vplimg.setAttribute('style', 'background-color:' + config.vplcolor[0] + ';');
								utskrivtabletrtdextra.appendChild(vplimg);
								var skrivut = document.createElement('input');
									skrivut.setAttribute('type', 'button');
									skrivut.setAttribute('value', 'Ta bort');
									skrivut.setAttribute('onclick', 'removepatient(this, "' + config.roomnumbers[i].replace(':', '-') + '");');
								utskrivtabletrtdextra.appendChild(skrivut);
							utskrivtabletr.appendChild(utskrivtabletrtdextra);
						utskrivtable.appendChild(utskrivtabletr);
					utskriv.appendChild(utskrivtable);
				line.appendChild(utskriv);
				var menyknappelement = document.getElementById('menyknapp');
					menyknappelement.setAttribute('colspan', config.extrafarger.length);
				for (var q = config.extrafarger.length - 1; q >= 0; q--) {
					var colorelement = document.createElement('td');
						colorelement.setAttribute('class', 'color');
						colorelement.setAttribute('data', config.extrafarger[q]);
						colorelement.setAttribute('onclick', 'addcolor(this)');
					line.appendChild(colorelement);
				};
			tbody.appendChild(line);
			var imagescontainer = document.getElementById('iconmenu');
			var imageroom = document.createElement('span');
				imageroom.setAttribute('id', 'menuicons' + config.roomnumbers[i].replace(':', '-'));
				imageroom.setAttribute('style', 'display: none;');
			for(b=0;b<config.icotodo.length-1;b++){
				var image = document.createElement('img');
					image.setAttribute('src', config.icolink[0] + config.icotodo[b].namn + config.icolink[1]);
					image.setAttribute('onclick', 'addicon(this)');
					image.setAttribute('data', config.icotodo[b].namn);
					image.setAttribute('class', 'notactive');
					image.setAttribute('title', config.icotodo[b].title);
				imageroom.appendChild(image);
			};
				var annatico = document.createElement('input');
					annatico.setAttribute('onclick', 'addicon(this)');
					annatico.setAttribute('type', 'button');
					annatico.setAttribute('value', 'Annat...');
					annatico.setAttribute('class', 'annaticon');
					annatico.setAttribute('data', 'annat');
				imageroom.appendChild(annatico);
			imagescontainer.appendChild(imageroom);
			makepatblad(config.roomnumbers[i]);
		};
	/*load();
	updatefunctions();
	addtopatblad();*/
	afterloadscripts();
	window['starttoken'] = true;
	startkollagomdinfo();
	dothescroll();
	checkallinputdates();
	addsave();
};
function markline(element, number){
	document.getElementById('tableroom' + number).setAttribute('style', 'background-color:' + element.value + ';');
};
function toogletr(element, number){
	if(element.checked){
		document.getElementById('tableroom' + number).removeAttribute('style');
		document.getElementById('patblad' + number).removeAttribute('style');
		
	}else{
		document.getElementById('tableroom' + number).setAttribute('style', 'display: none;');
		document.getElementById('patblad' + number).setAttribute('style', 'display: none;');
	};
};
function extendinput(element){
	var tmp = document.createElement("span");
		tmp.className = "input-element tmp-element";
		tmp.innerHTML = element.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	document.body.appendChild(tmp);
	var theWidth = tmp.getBoundingClientRect().width;
	document.body.removeChild(tmp);
		element.setAttribute('style', 'min-width:' + (parseInt(theWidth) + 25) + 'px;');
};
function skrivut(what){
	var styleorientation = document.getElementById('print');
	var body = document.getElementsByTagName('body')[0];
	while (styleorientation.hasChildNodes()) {styleorientation.removeChild(styleorientation.firstChild);};
	if(what == 'sbar'){
		var orientation = 'landscape';
		body.setAttribute('id', 'sbar');
		addtopatblad();
	}else if(what == 'attgora'){
		var orientation = 'portrait';
		body.setAttribute('id', 'attgora');
		addattgora();
	}else if(what == 'nutrition'){
		var orientation = 'portrait';
		body.setAttribute('id', 'nutrition');
		addnutrition();
	}else if(what == 'sbarmin'){
		var orientation = 'portrait';
		body.setAttribute('id', 'sbarmin');
		printsbarmini();
	};
	var nycode = document.createTextNode('@page { size: ' + orientation + '; }');
	styleorientation.appendChild(nycode);
	window.print();
	setTimeout(function () { dothescroll(); }, 100);
};
function printsbarmini(){
	addtopatblad();
	var allinfo = '';
	var allpages = document.getElementsByClassName('page');
	var arraytoprinttext = [];
	var arraytoprinthead = [];
	for (var i = allpages.length - 1; i >= 0; i--) {
		var info = '';
		var infoarray = [];
		var line = allpages[i].getElementsByTagName('tr');
		var head = allpages[i].getElementsByClassName('patbladhead')[0].innerText;
		for (var a = line.length - 1; a >= 0; a--) {
			if(line[a].getAttribute('class') == 'patbladextrainfo'){}else{
				var allp = line[a].getElementsByTagName('p');
				for (var b = allp.length - 1; b >= 0; b--) {
					if(allp[b].getAttribute('data') == 'uppgiftkontroll'){}else{
						if(allp[b].innerText == ''){}else{
							var info = allp[b].innerText.replace(/\r?\n|\r/g, '') + ' ' + info;
							infoarray.push(allp[b].innerText.replace(/\r?\n|\r/g, ''));
						};
					};
				};
			};
			var checkboxes = line[a].getElementsByClassName('patbladmarkactive');
			for (var c = checkboxes.length - 1; c >= 0; c--) {
				var info = checkboxes[c].innerText.replace(/\r?\n|\r/g, '') + '. ' + info;
				infoarray.push(checkboxes[c].innerText.replace(/\r?\n|\r/g, '') + '. ');
			};
		};
		if(info.replace(/ /g, '') == ''){}else{
			arraytoprinthead.push(head);
			arraytoprinttext.push(info.replace(/  /g, ' '));
			var allinfo = head + '\n' + info.replace(/  /g, ' ') + '\n' + allinfo;
		};
	};
	var minisbarcontainer = document.getElementById('minisbarcontainer');
	while (minisbarcontainer.hasChildNodes()) {minisbarcontainer.removeChild(minisbarcontainer.firstChild);};
		var dateandtime = document.createElement('p');
			dateandtime.setAttribute('class', 'datumsbar');
			var dateandtimetext = document.createTextNode(datum() + ' ' + tid());
			dateandtime.appendChild(dateandtimetext);
		minisbarcontainer.appendChild(dateandtime);
		var table = document.createElement('table');
			for (var i = arraytoprinthead.length - 1; i >= 0; i--) {
				var headchange = arraytoprinthead[i].split('/').reverse().join('');
				var tr = document.createElement('tr');
					var td = document.createElement('td');
						var head = document.createElement('h3');
							var texthead = document.createTextNode(headchange);
							head.appendChild(texthead);
						td.appendChild(head);
						var paragraf = document.createElement('p');
							var textparagraf = document.createTextNode(arraytoprinttext[i]);
							paragraf.appendChild(textparagraf);
						td.appendChild(paragraf);
					tr.appendChild(td);
				table.appendChild(tr);
			};
		minisbarcontainer.appendChild(table);
};
function addnutrition(){
	var container = document.getElementById('nutritioncontainer');
	while (container.hasChildNodes()) {container.removeChild(container.firstChild);};
	for (var i = config.roomnumbers.length - 1; i >= 0; i--) {
		var number = config.roomnumbers[i];
		var codenumber = config.roomnumbers[i].replace(':', '-');
		var namn = document.getElementsByName(codenumber + '|||||namn')[0].value;
		var kost = document.getElementsByName(codenumber + '|||||kost')[0].value;
		var extrakost = document.getElementsByName(codenumber + '|||||extrakost')[0].value;
		var p = document.createElement('p');
			var ptext = document.createTextNode(number + ' ' + namn + ' | ' + kost + ' [' + extrakost + '].');
			p.appendChild(ptext);
		container.insertBefore(p, container.childNodes[0]);
	};
	var head = document.createElement('h1');
		var headtext = document.createTextNode('Nutritions lista (' + datum() + ' ' + tid() + ')');
		head.appendChild(headtext);
	container.insertBefore(head, container.childNodes[0]);	
};
function addattgora(){
	var wrapper = document.getElementById('attgoracontainer');
	while (wrapper.hasChildNodes()) {wrapper.removeChild(wrapper.firstChild);};
	var olika = ['uppgifter', 'kontroller'];
	var dateparagraf = document.createElement('p');
		dateparagraf.setAttribute('class', 'datumsbar');
		var dateparagraftext = document.createTextNode(datum() + ' ' + tid());
		dateparagraf.appendChild(dateparagraftext);
	wrapper.appendChild(dateparagraf);
	var table = document.createElement('table');
		var tbody = document.createElement('tbody');
			var rubrik = document.createElement('tr');
			for (var i = olika.length - 1; i >= 0; i--) {
				var rubriktvabox = document.createElement('td');
					var rubriktvaboxh = document.createElement('h2');
						var rubriktvaboxhtext = document.createTextNode(olika[i].toUpperCase());
						rubriktvaboxh.appendChild(rubriktvaboxhtext);
					rubriktvabox.appendChild(rubriktvaboxh);
				rubrik.appendChild(rubriktvabox);
			};
			tbody.appendChild(rubrik);
		for(i=0;i<config.roomnumbers.length;i++){
			var headrow = document.createElement('tr');
				var headbox = document.createElement('td');
					headbox.setAttribute('colspan', '2');
					var head = document.createElement('h3');
						var namn = document.getElementsByName(config.roomnumbers[i].replace(':', '-') + '|||||namn')[0].value;
						var headtext = document.createTextNode(config.roomnumbers[i] + ' ' + namn);
						head.appendChild(headtext);
					headbox.appendChild(head);
				headrow.appendChild(headbox);
			tbody.appendChild(headrow);
			var contentrow = document.createElement('tr');
			var olika = ['uppgifter', 'kontroller'];
			for (var a = olika.length - 1; a >= 0; a--) {
				var contentbox = document.createElement('td');
					var ul = document.createElement('ul');
					var ulwrapper = document.getElementsByName(config.roomnumbers[i].replace(':', '-') + '|||||' + olika[a])[0];
					var allli = ulwrapper.getElementsByTagName('li');
					for (var b = allli.length - 1; b >= 0; b--) {
						if(allli[b].getAttribute('style')){}else{
							var li = document.createElement('li');
								var litext = document.createTextNode(allli[b].innerText + addboxes(allli[b].innerText));
								li.appendChild(litext);
							ul.appendChild(li);
						};
					};
					contentbox.appendChild(ul);
				contentrow.appendChild(contentbox);
			};
			tbody.appendChild(contentrow);
		};
		table.appendChild(tbody);
	wrapper.appendChild(table);
}
function addboxes(text){
	if(text.indexOf(' x') !== -1){
		var numberofboxes = parseInt(addboxesloopnumbers(text.split(' x')[1]));
		if(!numberofboxes){return '';}else if(numberofboxes == ''){return '';}else{
			return Array(numberofboxes + 1).join(' \u25A1');
		};
	}else{
		return '';
	};
};
function addboxesloopnumbers(string){
	var characters = string.split('').reverse();
	var returnstring = '';
	for (var i = characters.length - 1; i >= 0; i--) {
		if (characters[i] >= '0' && characters[i] <= '9') {
		    //console.log(text + ' ska lägga till ' + c + ' st rutor.');
		    var returnstring = returnstring + characters[i];
		} else {
			return returnstring;
		};
	};
	return returnstring;
};
function patbladeditable(){
	var editable = document.createElement('p');
		editable.setAttribute('class', 'edit');
		editable.setAttribute('contenteditable', 'true');
	return editable;
}
function patbladpaste(todo){
	var paste = document.createElement('p');
		paste.setAttribute('class', 'paste');
		if(!todo){}else{
			paste.setAttribute('data', todo);
		};
	return paste;
}
function patbladbrake(){
	var brakeelement = document.createElement('br');
	return brakeelement;
}
function makepatblad(nummer){
	var patblad = document.getElementById('patblad');
		var page = document.createElement('div');
			page.setAttribute('id', 'patblad' + nummer.replace(':', '-'));
			page.setAttribute('class', 'page');
			var patbladt = document.createElement('table');
				var patbladtb = document.createElement('tbody');
					var patientinfo = document.createElement('tr');
						var patientinfoblankt = document.createElement('td');
						patientinfo.appendChild(patientinfoblankt);
						var patientinfotd = document.createElement('td');
							patientinfotd.setAttribute('colspan', '4');
							patientinfotd.setAttribute('class', 'patbladborder patbladhead');
							var initial = document.createElement('span');
								initial.setAttribute('class', 'paste');
							patientinfotd.appendChild(initial);
							var nummer = document.createTextNode(' / ' + nummer + ' / ');
							patientinfotd.appendChild(nummer);
							var nollhlr = document.createElement('span');
								nollhlr.setAttribute('class', 'patbladnollhlr');
							patientinfotd.appendChild(nollhlr);
						patientinfo.appendChild(patientinfotd);
					patbladtb.appendChild(patientinfo);

					var situation = document.createElement('tr');
						situation.setAttribute('class', 'patbladinfoline');
						var situationhead = document.createElement('td');
							var situationheadmark = document.createElement('h3');
								var situationheadmarktext = document.createTextNode('S');
								situationheadmark.appendChild(situationheadmarktext);
							situationhead.appendChild(situationheadmark);
						situation.appendChild(situationhead);
						var situationcontent = document.createElement('td');
							situationcontent.setAttribute('colspan', '4');
							situationcontent.setAttribute('class', 'patbladborder');
							situationcontent.appendChild(patbladeditable());
							situationcontent.appendChild(patbladpaste());
							situationcontent.appendChild(patbladeditable());
						situation.appendChild(situationcontent);
					patbladtb.appendChild(situation);

					var bakgrund = document.createElement('tr');
						bakgrund.setAttribute('class', 'patbladinfoline');
						var bakgrundhead = document.createElement('td');
							var bakgrundheadmark = document.createElement('h3');
								var bakgrundheadmarktext = document.createTextNode('B');
								bakgrundheadmark.appendChild(bakgrundheadmarktext);
							bakgrundhead.appendChild(bakgrundheadmark);
						bakgrund.appendChild(bakgrundhead);
						var bakgrundcontent = document.createElement('td');
							bakgrundcontent.setAttribute('colspan', '4');
							bakgrundcontent.setAttribute('class', 'patbladborder');
							bakgrundcontent.appendChild(patbladeditable());
							bakgrundcontent.appendChild(patbladpaste());
							bakgrundcontent.appendChild(patbladeditable());
						bakgrund.appendChild(bakgrundcontent);
					patbladtb.appendChild(bakgrund);

					var aktuellt = document.createElement('tr');
						aktuellt.setAttribute('class', 'patbladextrainfo');
						var aktuellthead = document.createElement('td');
							aktuellthead.setAttribute('rowspan', '2');
							var baktuelltheadmark = document.createElement('h3');
								var aktuelltheadmarktext = document.createTextNode('A');
								baktuelltheadmark.appendChild(aktuelltheadmarktext);
							aktuellthead.appendChild(baktuelltheadmark);
						aktuellt.appendChild(aktuellthead);
						var checkboxconfig = config.elementstosbarbox;
						var checkboxar = [];
						for (var i = checkboxconfig.length - 1; i >= 0; i--) {checkboxar.push(checkboxconfig[i]);}
						for (var i = checkboxar.length - 1; i >= 0; i--) {
							var aktuellttd = document.createElement('td');
								var aktuellttdspan = document.createElement('span');
									aktuellttdspan.setAttribute('class', 'patbladmark');
									var aktuellttdspantext = document.createTextNode(' ' + checkboxar[i].toUpperCase());
									aktuellttdspan.appendChild(aktuellttdspantext);
								aktuellttd.appendChild(aktuellttdspan);
							aktuellt.appendChild(aktuellttd);
						};
					patbladtb.appendChild(aktuellt);

					var aktuellttwo = document.createElement('tr');
						aktuellttwo.setAttribute('class', 'patbladinfoline');
						var aktuellttwocontent = document.createElement('td');
							aktuellttwocontent.setAttribute('colspan', '4');
							aktuellttwocontent.setAttribute('class', 'patbladborder');
							aktuellttwocontent.appendChild(patbladeditable());
							aktuellttwocontent.appendChild(patbladpaste());
							aktuellttwocontent.appendChild(patbladpaste('uppgiftkontroll'));
							aktuellttwocontent.appendChild(patbladeditable());
						aktuellttwo.appendChild(aktuellttwocontent);
					patbladtb.appendChild(aktuellttwo);

					var rekomendation = document.createElement('tr');
						rekomendation.setAttribute('class', 'patbladinfoline');
						var rekomendationhead = document.createElement('td');
							var rekomendationheadmark = document.createElement('h3');
								var rekomendationheadmarktext = document.createTextNode('R');
								rekomendationheadmark.appendChild(rekomendationheadmarktext);
							rekomendationhead.appendChild(rekomendationheadmark);
						rekomendation.appendChild(rekomendationhead);
						var rekomendationcontent = document.createElement('td');
							rekomendationcontent.setAttribute('colspan', '4');
							rekomendationcontent.appendChild(patbladeditable());
							rekomendationcontent.appendChild(patbladpaste());
							rekomendationcontent.appendChild(patbladeditable());
						rekomendation.appendChild(rekomendationcontent);
					patbladtb.appendChild(rekomendation);
					var datum = document.createElement('tr');
						var datumtd = document.createElement('td');
							datumtd.setAttribute('colspan', '4');
							datumtd.setAttribute('class', 'datumsbar');
						datum.appendChild(datumtd);
					patbladtb.appendChild(datum);

				patbladt.appendChild(patbladtb);
			page.appendChild(patbladt);
		patblad.appendChild(page);
};
function showpatblad(number){
	addtopatblad(number);
	var patblad = document.getElementById('patblad');
		patblad.setAttribute('style', 'display: block; zoom: ' + config.sbarzoom + '; width: 100%;');
		var page = document.getElementById('patblad' + number);
			page.setAttribute('style', 'display: inline-table; width: 100%;');
	var contentwrapper = document.getElementById('contentwrapper');
		contentwrapper.setAttribute('style', 'display: none;');
};
function closepatblad(){
	var page = document.getElementsByClassName('page');
	for(i=0;i<page.length;i++){
		if(!page[i].getAttribute('style')){}else{
			var number = page[i].getAttribute('id').replace('patblad', '');
			page[i].removeAttribute('style');
			var alleditable = page[i].getElementsByClassName('edit');
			var edittext = '';
			for(a=0;a<alleditable.length;a++){
				var edittext = edittext + alleditable[a].innerText + '|||||';
			};
			savetohdd(number + '|||||edit', edittext);
		};
	};
	var patblad = document.getElementById('patblad');
		patblad.removeAttribute('style');
	var contentwrapper = document.getElementById('contentwrapper');
		contentwrapper.removeAttribute('style', 'display: none;');
	dothescroll();
};
function addtopatblad(num){
	for(q=0;q<config.roomnumbers.length;q++){
		var number = config.roomnumbers[q].replace(':', '-');
		var page = document.getElementById('patblad' + number);
		var datumwrapper = page.getElementsByClassName('datumsbar')[0];
		while (datumwrapper.hasChildNodes()) {datumwrapper.removeChild(datumwrapper.firstChild);};
		var datumtext = document.createTextNode(datum() + ' ' + tid());
		datumwrapper.appendChild(datumtext);
		
		var nollhlr = page.getElementsByClassName('patbladnollhlr')[0];
			nollhlr.setAttribute('class', nollhlr.getAttribute('class').replace('patbladnollhlractive', '').replace(' ', ''));
		var checkboxes = page.getElementsByClassName('patbladmark');
		for (var i = checkboxes.length - 1; i >= 0; i--) {
			checkboxes[i].setAttribute('class', checkboxes[i].getAttribute('class').replace('patbladmarkactive', '').replace(' ', ''));
		};
		var allpaste = page.getElementsByClassName('paste');
		for(i=0;i<allpaste.length;i++){
			while (allpaste[i].hasChildNodes()) {allpaste[i].removeChild(allpaste[i].firstChild);};
		};
		if(!getfromhdd(number + '|||||edit')){}else{
			var alleditable = page.getElementsByClassName('edit');
			var edittext = '';
			var allhistory = getfromhdd(number + '|||||edit').split('|||||');
			for(a=0;a<alleditable.length;a++){
				alleditable[a].innerText = allhistory[a];
			};
		};
		var namn = document.getElementsByName(number + '|||||namn')[0].value;
		var alder = document.getElementsByName(number + '|||||alder')[0].value;
		var opdate = document.getElementsByName(number + '|||||opdate')[0].value;
		var optext = document.getElementsByName(number + '|||||optext')[0].value;
		var opextra = document.getElementsByName(number + '|||||opextra')[0].value;
		var aktuellt = document.getElementsByName(number + '|||||aktuellt')[0].innerText;
		var kost = document.getElementsByName(number + '|||||kost')[0].value;
		var extrakost = document.getElementsByName(number + '|||||extrakost')[0].value;
		var utdate = document.getElementsByName(number + '|||||utdate')[0].value;
		var utinfo = document.getElementsByName(number + '|||||utinfo')[0].value;
		var planut = document.getElementsByName(number + '|||||planut')[0].value;
		var uppgifter = document.getElementsByName(number + '|||||uppgifter')[0].getElementsByTagName('li');
		var uppgiftertogether = [];
		for(i=0;i<uppgifter.length;i++){
			if(!uppgifter[i].getAttribute('style')){
				uppgiftertogether.push(uppgifter[i].innerText);
			};
		};
		var kontroller = document.getElementsByName(number + '|||||kontroller')[0].getElementsByTagName('li');
		var kontrollertogether = [];
		for(i=0;i<kontroller.length;i++){
			if(!kontroller[i].getAttribute('style')){
				kontrollertogether.push(kontroller[i].innerText);
			};
		};
		var vplimg = document.getElementsByName(number + '|||||vplimg')[0].getAttribute('src').replace(config.vpllink[0], '').replace(config.vpllink[1], '');
		if(vplimg == '1'){
			var vplimgtext = '';
		}else if(vplimg == '2'){
			var vplimgtext = config.vplimgtext[1];
		}else if(vplimg == '3'){
			var vplimgtext = config.vplimgtext[2];
		}else if(vplimg == '4'){
			var vplimgtext = config.vplimgtext[3];
		};
		var allimg = document.getElementById('tableroom' + number).getElementsByClassName('obsicon')[0].getElementsByTagName('img');
		var icobakgrund = '';
		var icoaktuellt = '';
		for(i=0;i<allimg.length;i++){
			if(allimg[i].getAttribute('class').indexOf('notactive') !== -1){}else{
				if(!allimg[i].getAttribute('style')){
					var iconamn = allimg[i].getAttribute('src').replace(config.icolink[0], '').replace(config.icolink[1], '');
					var icoconfig = window['config']['icotodo'];
					for(a=0;a<icoconfig.length;a++){
						if(icoconfig[a].namn == iconamn){
							if(icoconfig[a].namn == 'ejhlr'){
								nollhlr.setAttribute('class', nollhlr.getAttribute('class') + ' patbladnollhlractive');
							};

							if(icoconfig[a].typ == 'none'){
								var icoextratext = '';
							}else{
								var icoextratext = ': ' + allimg[i].getAttribute('title');
							};
							var titel = allimg[i].title.toLowerCase();
							if(icoconfig[a].toprint == 'checkbox'){
								var titel = allimg[i].title.toLowerCase();
								var checboxelements = window['config']['elementstosbarbox'];
								if(titel == config.elementstosbarbox[0] || iconamn == config.elementstosbarbox[0]){
									checkboxes[0].setAttribute('class', checkboxes[0].getAttribute('class') + ' patbladmarkactive');
								}else if(titel == config.elementstosbarbox[1] || iconamn == config.elementstosbarbox[1]){
									checkboxes[1].setAttribute('class', checkboxes[1].getAttribute('class') + ' patbladmarkactive');
								}else if(titel == config.elementstosbarbox[2] || iconamn == config.elementstosbarbox[2]){
									checkboxes[2].setAttribute('class', checkboxes[2].getAttribute('class') + ' patbladmarkactive');
								}else if(titel == config.elementstosbarbox[3] || iconamn == config.elementstosbarbox[3]){
									checkboxes[3].setAttribute('class', checkboxes[3].getAttribute('class') + ' patbladmarkactive');
								};
								
							}else if(icoconfig[a].toprint == 'bakgrund'){
								var icobakgrund = icobakgrund + icoconfig[a].title + icoextratext + '. ';
							}else if(icoconfig[a].toprint == 'aktuellt'){
								var icoaktuellt = icoaktuellt + icoconfig[a].title + icoextratext + '. ';
							};
						};
					};
				};
			};
		};
		var allicotext = document.getElementById('icotext' + number).getElementsByTagName('p');
		if(allicotext.length == 0){}else{
			var icotexttogether = 'OBS!: ';
			for(i=0;i<allicotext.length;i++){
				var icotexttogether = icotexttogether + allicotext[i].innerText + '. ';
			};
			var icotextelement = document.createTextNode(icotexttogether);
			allpaste[2].appendChild(icotextelement);
		};
		var patnametext = document.createTextNode(namn + ' ' + alder);
		allpaste[0].appendChild(patnametext);
		
		var icobakgrundtext = document.createTextNode(icobakgrund);
		allpaste[2].appendChild(icobakgrundtext);
		allpaste[2].appendChild(patbladbrake());

		var icoaktuellttext = document.createTextNode(icoaktuellt);
		allpaste[3].appendChild(icoaktuellttext);
		allpaste[3].appendChild(patbladbrake());
		if(!opextra){var opextratext = '';}else{
			var opextratext = ' (' + opextra + ')';
		}
		if(!opdate || !optext){}else{
			var optext = document.createTextNode('Opererades den ' + opdate + ', gjorde då ' + optext + opextratext + '.');
			allpaste[1].appendChild(optext);
		};
		if(!kost){
			var nutritioninfo = '';
		}else{
			var nutritioninfo = 'Kost: ' + kost + '.';
		}
		if(!extrakost){
			var nutritionextrainfo = '';
		}else{
			if(!nutritioninfo){
				var before = '';
			}else{
				var nutritioninfo = nutritioninfo.slice(0, -1);
				var before = ', ';
			};
			var nutritionextrainfo = before + extrakost + '.';
		};
		var svalt = document.getElementsByName(number + '|||||kost')[0].parentElement.getAttribute('style');
		var svaltspan = document.createElement('span');
			if(!svalt){}else{
				svaltspan.setAttribute('class', 'sbarsvalt');
			};
			var bakgrundtext = document.createTextNode(nutritioninfo + nutritionextrainfo);
			svaltspan.appendChild(bakgrundtext);
		allpaste[2].appendChild(svaltspan);
		var aktuellt = document.createTextNode(aktuellt);
		allpaste[3].appendChild(aktuellt);
		var brake = document.createElement('br');
		allpaste[4].appendChild(brake);
		if(uppgiftertogether.length == 0){}else{
			var uppgiftertext = document.createTextNode('Uppgifter:');
			allpaste[4].appendChild(uppgiftertext);
			var ul = document.createElement('ul');
				for(i=0;i<uppgiftertogether.length;i++){
					var li = document.createElement('li');
						var litext = document.createTextNode(uppgiftertogether[i]);
						li.appendChild(litext);
					ul.appendChild(li);
				};
			allpaste[4].appendChild(ul);
		};
		if(kontrollertogether.length == 0){}else{
			var kontrollertext = document.createTextNode('Kontroller:');
			allpaste[4].appendChild(kontrollertext);
			var ul = document.createElement('ul');
				for(i=0;i<kontrollertogether.length;i++){
					var li = document.createElement('li');
						var litext = document.createTextNode(kontrollertogether[i]);
						li.appendChild(litext);
					ul.appendChild(li);
				};
			allpaste[4].appendChild(ul);
		};
		if(!utdate){var utdatetext = '';}else{
			var utdatetext = 'Planerad utskrivning den ' + utdate + '. ';
		}
		if(!planut){var utdatetextplan = '';}else{
			if(!utdatetext){
				var utdatetextplan = planut + '. ';
			}else{
				var utdatetextplan = ' ' + planut + '. ';
			};
		};
		if(!utinfo){var utdatetextextra = '';}else{
			if(!utdatetextplan || !utdatetext){
				var utdatetextextra = utinfo + '.'
			}else{
				var utdatetextextra = ' ' + utinfo + '.'
			};
		};
		var textut = document.createTextNode(utdatetext + utdatetextplan + utdatetextextra + vplimgtext);
		allpaste[5].appendChild(textut);
	};
};
function removepatient(element, number, varning){
	var prittynumber = number.replace('-', ':');
	if(varning){
		dotheremove(number);
	}else{
		var message = config.messagetabortpatient[0] + prittynumber + config.messagetabortpatient[1];
		alertbox('confirm', message, 'dotheremove("' + number + '");');
	};
};
function dotheremove(number){
	addhistory('All information tas bort', '', number, '');
	visanutrition('', number, '', '', '', '');
	var page = document.getElementById('patblad' + number)
	var allpaste = page.getElementsByClassName('paste');
	for(i=0;i<allpaste.length;i++){
		while (allpaste[i].hasChildNodes()) {allpaste[i].removeChild(allpaste[i].firstChild);};
	};
	var alledit = page.getElementsByClassName('edit');
	for(i=0;i<alledit.length;i++){
		while (alledit[i].hasChildNodes()) {alledit[i].removeChild(alledit[i].firstChild);};
	};
	removefromhdd(number + '|||||edit');
	var alleditable = document.getElementById('tableroom' + number).getElementsByClassName('editable');
	for(i=0;i<alleditable.length;i++){
		while (alleditable[i].hasChildNodes()) {alleditable[i].removeChild(alleditable[i].firstChild);};
		save(alleditable[i]);
	};
	var allinput = document.getElementById('tableroom' + number).getElementsByTagName('input');
	for(i=0;i<allinput.length;i++){
		if(allinput[i].getAttribute('type') == 'button'){}else{
			allinput[i].value = '';
			save(allinput[i]);
		};
	};
	var alltextarea = document.getElementById('tableroom' + number).getElementsByTagName('textarea');
	for(i=0;i<alltextarea.length;i++){
		alltextarea[i].value = '';
		save(alltextarea[i]);
	};
	var allselect = document.getElementById('tableroom' + number).getElementsByTagName('select');
	for(i=0;i<allselect.length;i++){
		if(allselect[i].selectedIndex == 0){}else{
			allselect[i].selectedIndex = 0;
			save(allselect[i]);
		};
	};
	var todolist = document.getElementById('tableroom' + number).getElementsByClassName('todolist');
	for (var i = todolist.length - 1; i >= 0; i--) {
		if(todolist[i].hasChildNodes()){
			while (todolist[i].hasChildNodes()) {   
		    	todolist[i].removeChild(todolist[i].firstChild);
			};
			save(todolist[i]);
		};
	};
	var vplimg = document.getElementById('tableroom' + number).getElementsByClassName('vplimg')[0].getElementsByTagName('img')[0];
	changevplstatus(4, vplimg);
	var genderimage = document.getElementById('tableroom' + number).getElementsByClassName('gender')[0].getElementsByTagName('img');
	chosegender(genderimage[0]);
	chosegender(genderimage[1]);
	chosegender(genderimage[1]);
	var colors = document.getElementById('tableroom' + number).getElementsByClassName('color');
	for(i=0;i<colors.length;i++){
		colors[i].removeAttribute('style');
	};
	addcolor(colors[0]);
	addcolor(colors[0]);
	var icotext = document.getElementById('icotext' + number);
	while (icotext.hasChildNodes()) {   
		icotext.removeChild(icotext.firstChild);
	};
	save(icotext);
	var icocontainer = document.getElementById('tableroom' + number).getElementsByClassName('obsicon')[0];
	var allmenyicocontainer = document.getElementById('menuicons' + number);
	var allmenyico = allmenyicocontainer.getElementsByTagName('img')
	var allico = icocontainer.getElementsByTagName('img');
	for(i=0;i<allico.length;i++){
		allico[i].parentElement.getElementsByClassName('tooltiptext')[0].innerText = config.icotodo[i].title;
		var imagename = allmenyico[i].getAttribute('data');
		allico[i].setAttribute('class', imagename + ' notactive');
		allico[i].setAttribute('title', config.icotodo[i].title);
		allico[i].removeAttribute('style');
		allmenyico[i].setAttribute('class', 'notactive');
		allmenyico[i].setAttribute('onclick', 'addicon(this)');
		save(allico[i]);
	};
	var medicinskbedomn = document.getElementById('tableroom' + number).getElementsByClassName('roomnumber')[0];
		medicinskbedomn.removeAttribute('style');
		medicinskbedomn.setAttribute('class', 'roomnumber');
		removefromhdd(number + '|||||medicinskbedomn');
		removefromhdd(number + '|||||medicinskbedomnstatus');
	checkallinputdates();
};
function movepatient(number){
	var to = document.getElementById('tobemoved').value.replace(':', '-');
	if(to == number){
		alertbox('alert', config.meddelandeomsammaplats);
		return false;
	};
	addtopatblad();
	var wrapper = document.getElementById('tableroom' + to);
	var infofinns = false;
	var allinput = document.getElementById('tableroom' + to).getElementsByTagName('input');
	for(i=0;i<allinput.length;i++){if(allinput[i].getAttribute('type') == 'button'){}else{if(!allinput[i].value){}else{var infofinns = true};};};
	var alltextarea = document.getElementById('tableroom' + to).getElementsByTagName('textarea');
	for(i=0;i<alltextarea.length;i++){if(!alltextarea[i].value){}else{var infofinns = true};};
	var allselect = document.getElementById('tableroom' + to).getElementsByTagName('select');
	for(i=0;i<allselect.length;i++){if(allselect[i].selectedIndex == 0){}else{if(allselect[i].selectedIndex == 0){}else{var infofinns = true};};};
	if(infofinns){
		alertbox('alert', config.meddelandeompatientredanexisterar);
		return false;
	};
	startthemove(number, to);
	checkallwatch();
	hidemenu();
};
function startthemove(numberfrom, numberto){
	addhistory('Patient flyttas från rum ' + numberfrom.replace('-', ':') + ' till ' + numberto.replace('-', ':'), '', '', '');
	if(!document.getElementById('tableroom' + numberfrom).getElementsByClassName('kostselect')[0].getAttribute('style')){}else{
		visanutrition('', numberfrom, '', '', '', '');
		doljnutrition('', numberto, '', '', '', '');
	};
	var patbladhistory = getfromhdd(numberfrom + '|||||edit');
	if(!patbladhistory){}else{
		savetohdd(numberto + '|||||edit', patbladhistory);
		removefromhdd(numberfrom + '|||||edit');
	};
	var alleditablefrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('editable')[0];
	var alleditableto = document.getElementById('tableroom' + numberto).getElementsByClassName('editable')[0];
		alleditableto.innerHTML = alleditablefrom.innerHTML;
		save(alleditableto);
	var allinputfrom = document.getElementById('tableroom' + numberfrom).getElementsByTagName('input');
	var allinputto = document.getElementById('tableroom' + numberto).getElementsByTagName('input');
	for(i=0;i<allinputfrom.length;i++){
		if(allinputfrom[i].getAttribute('type') == 'button'){}else{
			allinputto[i].value = allinputfrom[i].value;
			save(allinputto[i]);
		};
	};
	var alltextareafrom = document.getElementById('tableroom' + numberfrom).getElementsByTagName('textarea');
	var alltextareato = document.getElementById('tableroom' + numberto).getElementsByTagName('textarea');
	for(i=0;i<alltextareafrom.length;i++){
		alltextareato[i].value = alltextareafrom[i].value;
		save(alltextareato[i]);
	};
	var allselectfrom = document.getElementById('tableroom' + numberfrom).getElementsByTagName('select');
	var allselectto = document.getElementById('tableroom' + numberto).getElementsByTagName('select');
	for(i=0;i<allselectfrom.length;i++){
		allselectto[i].selectedIndex = allselectfrom[i].selectedIndex;
		save(allselectto[i]);
	};
	var genderto = document.getElementById('tableroom' + numberto).getElementsByClassName('gender')[0];
	var genderfromselected = document.getElementById('tableroom' + numberfrom).getElementsByClassName('gender')[0].getElementsByClassName('genderimage');
	if(genderfromselected.length == 2){}else{
		var who = genderfromselected[0].getAttribute('src').replace(config.genderlink[0], '').replace(config.genderlink[1], '');
		if(who == 'man'){
			var toclick = 1;
		}else if(who == 'kvinna'){
			var toclick = 0;
		}
		genderto.getElementsByTagName('img')[toclick].click();
	};
	var vplimgfrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('vplimg')[0].getElementsByTagName('img')[0];
		var vplimgto = document.getElementById('tableroom' + numberto).getElementsByClassName('vplimg')[0].getElementsByTagName('img')[0];
		var number = parseInt(vplimgfrom.getAttribute('src').replace(config.vpllink[0], '').replace(config.vpllink[1], '')) - 1;
		changevplstatus(number, vplimgto);
	var todolistfrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('todolist');
	var todolistto = document.getElementById('tableroom' + numberto).getElementsByClassName('todolist');
	for(i=0;i<todolistfrom.length;i++){
		var todolistfromli = todolistfrom[i].getElementsByTagName('li');
		var todolisttoli = todolistto[i].getElementsByTagName('li');
		for(a=0;a<todolistfromli.length;a++){
			var lielement = document.createElement('li');
				lielement.setAttribute('onclick', 'doubleclick("markuppgift", "removeuppgift", this)');
				lielement.setAttribute('ontouchstart', 'todotouchstart(this);');
				lielement.setAttribute('ontouchend', 'todotouchstop(this);');
				lielement.setAttribute('onmousedown', 'todotouchstart(this);');
				lielement.setAttribute('onmouseup', 'todotouchstop(this);');
				if(todolistfromli[a].getAttribute('style')){
					lielement.setAttribute('style', todolistfromli[a].getAttribute('style'));
				};
				var pelementfromtodo = todolistfromli[a].getElementsByTagName('p')[0];
				var nyparagraf = document.createElement('p');
				if(pelementfromtodo.getAttribute('style')){
					nyparagraf.setAttribute('style', pelementfromtodo.getAttribute('style'));
				};
				var allspanelements = pelementfromtodo.getElementsByTagName('span');
				for(q=0;q<allspanelements.length;q++){
					var textfromspan = allspanelements[q].innerText
					var nyparagrafspan = document.createElement('span');
					if(allspanelements[q].getAttribute('data')){
						nyparagrafspan.setAttribute('class', 'watch');
						nyparagrafspan.setAttribute('data', textfromspan);
					};
						var nydatespantext = document.createTextNode(textfromspan);
						nyparagrafspan.appendChild(nydatespantext);
					nyparagraf.appendChild(nyparagrafspan);
				};
				lielement.appendChild(nyparagraf);
			todolistto[i].appendChild(lielement);
		};
		save(todolistto[i]);
	};
	var wrapperfrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('obsicon')[0];
	var wrapperto = document.getElementById('tableroom' + numberto).getElementsByClassName('obsicon')[0];
	var menyicoto = document.getElementById('menuicons' + numberto).getElementsByTagName('img');
	for(i=0;i<config.icotodo.length-1;i++){
		var fromimage = wrapperfrom.getElementsByClassName(config.icotodo[i].namn)[0];
		var toimage = wrapperto.getElementsByClassName(config.icotodo[i].namn)[0];
			toimage.setAttribute('class', fromimage.getAttribute('class'));
			toimage.setAttribute('title', fromimage.getAttribute('title'));
			if(fromimage.getAttribute('style')){
				toimage.setAttribute('style', fromimage.getAttribute('style'));
			};
			toimage.parentElement.getElementsByClassName('tooltiptext')[0].innerText = fromimage.getAttribute('title');
			if(fromimage.getAttribute('class').indexOf('notactive') !== -1){}else{
				menyicoto[i].setAttribute('onclick', 'removeicon(this);');
				menyicoto[i].setAttribute('class', '');
			};
			save(toimage);
	};
	var icotextwrapperfrom = document.getElementById('icotext' + numberfrom).getElementsByTagName('p');
	var icotextwrapperto = document.getElementById('icotext' + numberto);
	for(i=0;i<icotextwrapperfrom.length;i++){
		var paragraf = document.createElement('p');
			paragraf.setAttribute('onclick', 'doubleclick("", "removeobstext", this)');
			var paragraftext = document.createTextNode(icotextwrapperfrom[i].innerText);
			paragraf.appendChild(paragraftext);
		icotextwrapperto.appendChild(paragraf);
	};
	var colorfrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('color');
	var colorto = document.getElementById('tableroom' + numberto).getElementsByClassName('color');
	for(i=0;i<colorfrom.length;i++){
		if(!colorfrom[i].getAttribute('style')){}else{
			addcolor(colorto[i], false);
		};
	};
	save(icotextwrapperto);
	var medicinskbedomnfrom = document.getElementById('tableroom' + numberfrom).getElementsByClassName('roomnumber')[0];
	var medicinskbedomnto = document.getElementById('tableroom' + numberto).getElementsByClassName('roomnumber')[0];
	medicinskbedomnto.setAttribute('class', medicinskbedomnfrom.getAttribute('class'));
	savetohdd(numberto + '|||||medicinskbedomnstatus', medicinskbedomnfrom.getAttribute('class'));
	if(!medicinskbedomnfrom.getAttribute('style')){
		removefromhdd(numberto + '|||||medicinskbedomn');
		medicinskbedomnto.removeAttribute('style');
	}else{
		savetohdd(numberto + '|||||medicinskbedomn', 'true');
		medicinskbedomnto.setAttribute('style', config.medicinskbedomningknapp.style);
	};
	removepatient('', numberfrom, true);
	checkallinputdates();
};
function addcolor(element, ifsave){
	var color = element.getAttribute('data');
	if(element.getAttribute('style')){
		element.removeAttribute('style');
	}else{
		element.setAttribute('style', 'background-color:' + color + ';color:' + color);
	};
	if(!ifsave){
		save(element);
	};
};
function addcolon(element){
	if(element.value.length === 1){
		element.value = element.value + ':';
	};
	element.value = element.value.toUpperCase();
};
function removecolon(element){
	var lastChar = element.value.substr(element.value.length - 1);
	if (lastChar == ":") {
		element.value = element.value.slice(0, -1);
	};
	element.value = element.value.toUpperCase();
	save(element);
};
function alderaddline(element){
	if(element.value.length === 0){
		element.value = '-';
	};
};
function alderremoveline(element){
	if (element.value == "-") {
		element.value = '';
	};
};
var showmenydelay;
function showmeny(type, number, redigera){
	clearTimeout(showmenydelay);
	showmenydelay = setTimeout(function(){
		if(!document.getElementById('iconmenu').getAttribute('style')){
			//Förhindrar att meny ska visas när den redan syns.
			return false;
		};
		var uppgiftwrapper = document.getElementById('kontroller');
			while (uppgiftwrapper.firstChild) {uppgiftwrapper.removeChild(uppgiftwrapper.firstChild);};
		var move = document.getElementById('move');
			while (move.firstChild) {move.removeChild(move.firstChild);};
		var iconelements = document.getElementById('iconmenu').getElementsByTagName('span');
		for(c=0;c<iconelements.length;c++){iconelements[c].setAttribute('style', 'display: none;');};
		var iconinfo = document.getElementById('iconinfo');
			while (iconinfo.firstChild) {iconinfo.removeChild(iconinfo.firstChild);};
		for(a=0;a<config.elementstodisable.length;a++){
			var allrum = document.getElementsByClassName(config.elementstodisable[a]);
			for(i=0;i<allrum.length;i++){
				var takeonclick = allrum[i].getAttribute('onclick');
				allrum[i].setAttribute('data', takeonclick);
				allrum[i].removeAttribute('onclick');
			};
		};
		if(redigera == 'redigeratodo'){

		}else if(type == config.elementstodisable[0]){
			var info = document.createElement('p');
				var infotext = document.createTextNode(config.meddelandevidflytt);
				info.appendChild(infotext);
			move.appendChild(info);
			var select = document.createElement('select');
				select.setAttribute('id', 'tobemoved');
				select.setAttribute('onkeypress', 'checkkey(event, "' + number + '", "")');
				
			for(i=0;i<config.roomnumbers.length;i++){
				var option = document.createElement('option');
				if(config.roomnumbers[i].replace(':', '-') == number){
					option.setAttribute('selected', 'selected');
				};
					var optiontext = document.createTextNode(config.roomnumbers[i]);
					option.appendChild(optiontext);
				select.appendChild(option);
			};
			move.appendChild(select);
			var nylinje = document.createElement('br');
			move.appendChild(nylinje);
			var okbutton = document.createElement('input');
				okbutton.setAttribute('type', 'button');
				okbutton.setAttribute('value', 'Ok');
				okbutton.setAttribute('id', 'ok');
				okbutton.setAttribute('onclick', 'movepatient("' + number + '")');
			move.appendChild(okbutton);
			var avbrytbutton = document.createElement('input');
				avbrytbutton.setAttribute('type', 'button');
				avbrytbutton.setAttribute('value', 'Avbryt');
				avbrytbutton.setAttribute('onclick', 'hidemenu();');
			move.appendChild(avbrytbutton);
			var nylinjetva = document.createElement('br');
			move.appendChild(nylinjetva);
			/*var medicinskbedomn = document.createElement('input');
				medicinskbedomn.setAttribute('type', 'button');
				medicinskbedomn.setAttribute('value', medicinskbedomnbutton(number));
				medicinskbedomn.setAttribute('class', 'medicinskbedomn');
				medicinskbedomn.setAttribute('onclick', 'medicinskbedomn(this, "' + number + '");');
			move.appendChild(medicinskbedomn);
			var nylinjetre = document.createElement('br');
			move.appendChild(nylinjetre);*/
			var title = document.createElement('h3');
				var titletext = document.createTextNode(config.medisinskbedomning.title);
				title.appendChild(titletext);
			move.appendChild(title);
			var chosen = document.getElementById('tableroom' + number).getElementsByClassName('roomnumber')[0].getAttribute('class');
			console.log(chosen);
			for (var i = config.medisinskbedomning.element.length - 1; i >= 0; i--) {
				var radiowrapper = document.createElement('span');
					var ratioelement = document.createElement('input');
						ratioelement.setAttribute('type', 'radio');
						ratioelement.setAttribute('name', 'medbedomn');
						ratioelement.setAttribute('data-class', config.medisinskbedomning.element[i].stil);
						ratioelement.setAttribute('data-number', number);
						ratioelement.setAttribute('onclick', 'addmedicinskbedomn(this)');
						if(chosen.indexOf(config.medisinskbedomning.element[i].stil) !== -1){
							ratioelement.setAttribute('checked', 'checked');
						}else{
							if(i == config.medisinskbedomning.element.length - 1){
								ratioelement.setAttribute('checked', 'checked');
							};
						};
					radiowrapper.appendChild(ratioelement);
					var radiolabel = document.createElement('label');
						var radiotext = document.createTextNode(config.medisinskbedomning.element[i].namn);
						radiolabel.appendChild(radiotext);
					radiowrapper.appendChild(radiolabel);
				move.appendChild(radiowrapper);
			};
		}else if(type == config.elementstodisable[1]){
			document.getElementById('menuicons' + number).removeAttribute('style');
		}else{
			var getglobal = window['config'][type];
			for (var i = getglobal.length - 1; i >= 0; i--) {
				var button = document.createElement('input');
					button.setAttribute('type', 'button');
					button.setAttribute('value', getglobal[i].namn);
					button.setAttribute('onclick', 'getmoreinfo("' + getglobal[i].namn + '", "' + number + '", "' + getglobal[i].inputtype + '", "' + type + '", "' + getglobal[i].startnumber + '", "' + getglobal[i].meddelande + '")');
				uppgiftwrapper.appendChild(button);
			};
			var annat = document.createElement('input');
				annat.setAttribute('type', 'button');
				annat.setAttribute('value', config.specifikkontroll);
				annat.setAttribute('onclick', 'getmoreinfo("annat", "' + number + '", "text", "' + type + '", "", "' + config.texttillannatknappen + '")');
			uppgiftwrapper.appendChild(annat);
		};
		document.getElementById('iconmenu').removeAttribute('style');
		setTimeout(function(){
			if(!redigera){
				document.getElementById('contentwrapper').setAttribute('onclick', 'hidemenu("' + type + '", "' + number + '")');
			};
		}, 1);
	}, config.whaitondoubleclick);
};
function addmedicinskbedomn(element){
	if(element.getAttribute('data-class') == 'none'){
		document.getElementById('tableroom' + element.getAttribute('data-number')).getElementsByClassName('roomnumber')[0].setAttribute('class', 'roomnumber');
		removefromhdd(element.getAttribute('data-number') + '|||||medicinskbedomnstatus');
	}else{
		document.getElementById('tableroom' + element.getAttribute('data-number')).getElementsByClassName('roomnumber')[0].setAttribute('class', 'roomnumber ' + element.getAttribute('data-class'));
		savetohdd(element.getAttribute('data-number') + '|||||medicinskbedomnstatus', 'roomnumber ' + element.getAttribute('data-class'));
	};
};
function hidemenu(){
	var uppgiftwrapper = document.getElementById('kontroller');
		while (uppgiftwrapper.firstChild) {uppgiftwrapper.removeChild(uppgiftwrapper.firstChild);};
	var move = document.getElementById('move');
		while (move.firstChild) {move.removeChild(move.firstChild);};
	var iconelements = document.getElementById('iconmenu').getElementsByTagName('span');
		for(c=0;c<iconelements.length;c++){iconelements[c].setAttribute('style', 'display: none;');};
	var iconinfo = document.getElementById('iconinfo');
		while (iconinfo.firstChild) {iconinfo.removeChild(iconinfo.firstChild);};
	for(a=0;a<config.elementstodisable.length;a++){
		var allrum = document.getElementsByClassName(config.elementstodisable[a]);
		for(i=0;i<allrum.length;i++){
			var takeonclick = allrum[i].getAttribute('data');
			if(takeonclick){
				allrum[i].setAttribute('onclick', takeonclick);
				allrum[i].removeAttribute('data');
			};
		};
	};
	document.getElementById('contentwrapper').removeAttribute('onclick');
	document.getElementById('iconmenu').setAttribute('style', 'display: none;');
};
function chosegender(element){
	if(element.getAttribute('class') == 'genderimage'){
		removegender(element);
		element.removeAttribute('class');
	}else{
		removegender(element);
	};
	save(element);
};
function removegender(element){
	var allimg = element.parentElement.getElementsByTagName('img');
	for (var i = allimg.length - 1; i >= 0; i--) {
		allimg[i].setAttribute('class', 'genderimage');
	};
};
function changevplstatus(number, element){
	if(number === 4){var number = 0};
	element.setAttribute('src', config.vpllink[0] + (number + 1) + config.vpllink[1]);
	element.setAttribute('onclick', 'changevplstatus(' + (number + 1) + ', this);');
	element.setAttribute('style', 'background-color:' + config.vplcolor[number] + ';');
	save(element);
};
function addextra(activeordeactive, name, nummer){
	for(i=0;i<config.icotodo.length;i++){
		if(config.icotodo[i].namn == name){
			if(activeordeactive == 'active'){
				if(config.icotodo[i].active == 'none'){}else{
					var funcname = config.icotodo[i].active[0];
					var type = config.icotodo[i].active[1];
					var namn = config.icotodo[i].active[2];
					var inputtype = config.icotodo[i].active[3];
					var startnumber = config.icotodo[i].active[4];
					var fraga = config.icotodo[i].active[5];
					window[funcname](namn, nummer, inputtype, type, startnumber, fraga);
				};
			}else if(activeordeactive == 'deactive'){
				if(config.icotodo[i].deactive == 'none'){}else{
					var funcname = config.icotodo[i].deactive[0];
					var type = config.icotodo[i].deactive[1];
					var namn = config.icotodo[i].deactive[2];
					var inputtype = config.icotodo[i].deactive[3];
					var startnumber = config.icotodo[i].deactive[4];
					var fraga = config.icotodo[i].deactive[5];
					window[funcname](namn, nummer, inputtype, type, startnumber, fraga);
				};
			};
			return false;
		};
	};
};
function addicon(element){
	var roomnumber = element.parentElement.getAttribute('id').replace('menuicons', '');
	var imagesrc = element.getAttribute('data');
	addextra('active', imagesrc, roomnumber);
	var info = kontroll(imagesrc, roomnumber);
	if(info){
		element.setAttribute('class', '');
		element.setAttribute('onclick', 'removeicon(this)');
		var roomcontainer = document.getElementById('tableroom' + roomnumber)
			var roomcontainerimgae = roomcontainer.getElementsByClassName(imagesrc)[0];
				roomcontainerimgae.setAttribute('class', imagesrc);
			save(roomcontainerimgae);
	};
	addhistory('OBS ikon', 'läggs till', roomnumber, imagesrc);
};
function removeicon(element){
	var roomnumber = element.parentElement.getAttribute('id').replace('menuicons', '');
	var imagesrc = element.getAttribute('src').replace(config.icolink[1], '').replace(config.icolink[0], '');
	addextra('deactive', imagesrc, roomnumber);
	element.setAttribute('class', 'notactive');
	element.setAttribute('onclick', 'addicon(this)');
	for(i=0;i<config.icotodo.length;i++){
		if(config.icotodo[i].namn == imagesrc){
			var titeltext = config.icotodo[i].title;
		};
	};
	var roomcontainer = document.getElementById('tableroom' + roomnumber);
		var roomcontainerimgae = roomcontainer.getElementsByClassName(imagesrc)[0];
			roomcontainerimgae.setAttribute('class', imagesrc + ' notactive');
			roomcontainerimgae.setAttribute('title', titeltext);
			roomcontainerimgae.removeAttribute('style');
		roomcontainerimgae.parentElement.getElementsByClassName('tooltiptext')[0].innerText = titeltext;
		save(roomcontainerimgae);
	addhistory('OBS ikon', 'tas bort', roomnumber, imagesrc);
};
function removeicontrippel(element){
	var theimg = element.getElementsByTagName('img')[0];
	var imagesrc = theimg.getAttribute('src').replace(config.icolink[1], '').replace(config.icolink[0], '');
	var roomnumber = element.parentElement.parentElement.getAttribute('id').replace('tableroom', '');
	var menyimg = document.getElementById('menuicons' + roomnumber);
		var icons = menyimg.getElementsByTagName('img');
		for (var i = icons.length - 1; i >= 0; i--) {
			if(icons[i].getAttribute('data') == imagesrc){
				icons[i].click();
			};
		};
};
function kontroll(name, roomnumber){
	var icotodo = window['config']['icotodo'];
	for(i=0;i<icotodo.length;i++){
		if(icotodo[i].namn == name){
			var getglobalvariable = icotodo[i];
		};
	};
	if(getglobalvariable.typ == 'none'){return true;};
	if(getglobalvariable){
		var boardiconelement = document.getElementById(roomnumber)
		var icocontainer = document.getElementById('menuicons' + roomnumber)
			icocontainer.setAttribute('style', 'display: none;');
		var wrapperelement = document.getElementById('iconinfo');
		if(getglobalvariable.typ == 'button'){
			for (var i = getglobalvariable.info.length - 1; i >= 0; i--) {
				var input = document.createElement('input');
					input.setAttribute('type', getglobalvariable.typ);
					input.setAttribute('onclick', 'addinfo("' + roomnumber + '", "' + name + '", this, "", "")');
					input.setAttribute('value', getglobalvariable.info[i]);
				wrapperelement.appendChild(input);
			};
		}else{	
				if(!getglobalvariable.aftertext){
					var extratext = '';
				}else{
					var extratext = getglobalvariable.aftertext;
				};
				var info = document.createElement('p');
					var infotext = document.createTextNode(getglobalvariable.info);
					info.appendChild(infotext);
				wrapperelement.appendChild(info);
				var input = document.createElement('input');
					input.setAttribute('type', getglobalvariable.typ);
					input.setAttribute('onkeypress', 'checkkey(event, "' + roomnumber + '", "' + name + '")');
				wrapperelement.appendChild(input);
				input.focus();
				var nylinje = document.createElement('br');
				wrapperelement.appendChild(nylinje);
				var ok = document.createElement('input');
					ok.setAttribute('type', 'button');
					ok.setAttribute('value', 'Ok');
					ok.setAttribute('id', 'ok');
					ok.setAttribute('onclick', 'addinfo("' + roomnumber + '", "' + name + '", "", "", "' + extratext + '")');
				wrapperelement.appendChild(ok);
				var avbryt = document.createElement('input');
					avbryt.setAttribute('type', 'button');
					avbryt.setAttribute('value', 'Avbryt');
					avbryt.setAttribute('onclick', 'hidemenu("' + roomnumber + '")');
				wrapperelement.appendChild(avbryt);
		};
		return false;
	}else{
		return true;
	};
};
function addinfo(roomnumber, imagesrc, element, tosave, extratext){
	if(!extratext){var extratext = '';};
	var addwatch = false;
	if(imagesrc == 'annat'){
		var information = document.getElementById('iconinfo').getElementsByTagName('input')[0].value;
		var wrapper = document.getElementById('icotext' + roomnumber);
			var ny = document.createElement('p');
				ny.setAttribute('onclick', 'doubleclick("", "removeobstext", this)');
				var nytext = document.createTextNode(information);
				ny.appendChild(nytext);
			wrapper.appendChild(ny);
			addhistory('OBS text', 'läggs till', roomnumber, information);
			save(wrapper);
	}else{
		var imageelement = document.getElementById('menuicons' + roomnumber).getElementsByTagName('img');
		if(element){
			var information = element.value;
		}else{
			var information = document.getElementById('iconinfo').getElementsByTagName('input')[0].value;
			if(!information){return false};
			var informationtype = document.getElementById('iconinfo').getElementsByTagName('input')[0].getAttribute('type');
			if(informationtype == 'date'){var addwatch = true;};
		};
		for (var i = imageelement.length - 1; i >= 0; i--) {
			if(imageelement[i].getAttribute('data') == imagesrc){
				imageelement[i].setAttribute('class', '');
				imageelement[i].setAttribute('onclick', 'removeicon(this)');
			};
		};
		var roomcontainer = document.getElementById('tableroom' + roomnumber)
			var roomcontainerimgae = roomcontainer.getElementsByClassName(imagesrc)[0];
				if(addwatch){
					roomcontainerimgae.setAttribute('class', imagesrc + ' watch');
				}else{
					roomcontainerimgae.setAttribute('class', imagesrc);
				};
				roomcontainerimgae.setAttribute('title', information + extratext);
			var imagetitle = roomcontainerimgae.parentElement.getElementsByClassName('tooltiptext')[0];
				imagetitle.innerText = information + extratext;
			addhistory('OBS ikon ' + imagesrc, 'får extra information', roomnumber, information + extratext);
			save(roomcontainerimgae);
	};
	hidemenu();
};
function removeobstext(element, varning){
	if(varning){
		yesremove(element);
	}else{
		window['alertinfoett'] = element;
		alertbox('confirm', 'Säker på att du vill ta bort OBS information?', 'yesremove(window["alertinfoett"]);window["alertinfoett"] = "";');
	};
};
function yesremove(element){
	var parent = element.parentElement;
		addhistory('OBS text', 'tas bort', parent.getAttribute('id').replace('icotext', ''), element.innerText);
		parent.removeChild(element);
	save(parent);
}
function checkkey(e, roomnumber, imagesrc){
	if (event.which == 13 || event.keyCode == 13) {
		document.getElementById('ok').click();
	};
};
function lookfordate(string){
	var lookfordate = string.split(' ');
	var todo = 'none';
	for(g=0;g<lookfordate.length;g++){
		var lookfordatewords = lookfordate[g].split('-');
		if(lookfordatewords.length == 3){
			var year = lookfordatewords[0].replace(/[^\/\d]/g,'');
			var month = lookfordatewords[1].replace(/[^\/\d]/g,'');
			var day = lookfordatewords[2].replace(/[^\/\d]/g,'');
			if(year.split('').length == 4 || year.split('').length == 2){
				if(month.split('').length == 2){
					if(month <= 12){
						if(day.split('').length == 2){
							if(day <= 32){
								var todo = g;
							};
						};
					};
				};
			};
		};
	};
	return todo;
};
function lookfortime(string){
	var lookfortime = string.split(' ');
	var todo = 'none';
	for(g=0;g<lookfortime.length;g++){
		var lookfortimewords = lookfortime[g].split(':');
		if(lookfortimewords.length == 2){
			var hour = lookfortimewords[0].replace(/[^\/\d]/g,'');
			var min = lookfortimewords[1].replace(/[^\/\d]/g,'');
			if(hour.split('').length == 2){
				if(hour <= 24){
					if(min.split('').length == 2){
						if(min <= 59){
							var todo = g;
						};
					};
				};
			};
		};
	};
	return todo;
};
function laggtill(roomnumber, namn, type, todo, listyle, pstyle){
	var inputeelement = document.getElementById('kontroller').getElementsByTagName('input')[0];
	var extrainfo = '';
	if(inputeelement){
		var extrainfo = inputeelement.value;
		var inputtyp = inputeelement.type;
	};
	if(todo == 'number'){
		var text = namn + ' x' + extrainfo;
	}else if(todo == 'text'){
		var date = document.getElementById('kontroller').getElementsByTagName('input')[1];
		if (date.getAttribute('type') == 'button') {
			var text = extrainfo;
		}else{
			if(date.value.length == 0){
				var text = extrainfo;
			}else {
				var text = extrainfo + ' ' + date.value;				
			};
		};
	}else if(todo == 'none' || todo == 'load'){
		var text = namn;
	}else{
		var text = namn + ' ' + extrainfo;
	};
	var wrapper = document.getElementById('tableroom' + roomnumber).getElementsByClassName(type)[0].getElementsByClassName('todolist')[0];
		var punkt = document.createElement('li');
			punkt.setAttribute('onclick', 'doubleclick("markuppgift", "removeuppgift", this)');
			punkt.setAttribute('ontouchstart', 'todotouchstart(this);');
			punkt.setAttribute('ontouchend', 'todotouchstop(this);');
			punkt.setAttribute('onmousedown', 'todotouchstart(this);');
			punkt.setAttribute('onmouseup', 'todotouchstop(this);');
			if(listyle){punkt.setAttribute('style', listyle);};
			var punktp = document.createElement('p');
				if(pstyle){punktp.setAttribute('style', pstyle);};
				var datenumber = lookfordate(text);
				var timenumber = lookfortime(text);
				var splitinfo = text.split(' ');
				for(m=0;m<splitinfo.length;m++){
					if(splitinfo.length == m + 1){
						var spacer = '';
					}else{
						var spacer = ' ';
					};
					if(datenumber == m){
						var watchspan = document.createElement('span');
							watchspan.setAttribute('class', 'watch');
							watchspan.setAttribute('data', splitinfo[m]);
							var watchspantext = document.createTextNode(splitinfo[m] + spacer);
							watchspan.appendChild(watchspantext);
						punktp.appendChild(watchspan);
					}else if(timenumber == m){
						var watchspan = document.createElement('span');
							watchspan.setAttribute('class', 'watch');
							watchspan.setAttribute('data', splitinfo[m]);
							var watchspantext = document.createTextNode(splitinfo[m] + spacer);
							watchspan.appendChild(watchspantext);
						punktp.appendChild(watchspan);
					}else{
						var nypunktspan = document.createElement('span');
							var nypunktspantext = document.createTextNode(splitinfo[m] + spacer);
							nypunktspan.appendChild(nypunktspantext);
						punktp.appendChild(nypunktspan);
					};
				};
			punkt.appendChild(punktp);
		wrapper.appendChild(punkt);
	if(todo != 'load'){
		addhistory('Lägger till ny punkt i', type, roomnumber, punktp.innerText)
		save(wrapper);
		hidemenu();
		checkallwatch();
	};
};
function getmoreinfo(text, roomnumber, inputtype, type, startnumber, fraga){
	if(inputtype == 'none'){
		laggtill(roomnumber, text, type, inputtype);
		return
	}else if(inputtype == 'load'){
		laggtill(roomnumber, text, type, inputtype);
		return
	};
	var buttonwrapper = document.getElementById('kontroller');
		while (buttonwrapper.firstChild) {buttonwrapper.removeChild(buttonwrapper.firstChild);};
		if(fraga){
			var p = document.createElement('p');
				var ptext = document.createTextNode(fraga);
				p.appendChild(ptext);
			buttonwrapper.appendChild(p);
		};
		var input = document.createElement('input');
			input.setAttribute('type', inputtype);
			if(startnumber){
				input.setAttribute('value', startnumber);	
			};
			if(inputtype == 'time'){
				input.value = tid();
			};
			input.setAttribute('onkeypress', 'checkkey(event)');
		buttonwrapper.appendChild(input);
			input.focus();
		if(text == 'annat' || inputtype == 'text') {
			var date = document.createElement('input');
				date.setAttribute('type', 'date');
				date.setAttribute('onkeypress', 'checkkey(event)');
			buttonwrapper.appendChild(date);
		};
		var nylinje = document.createElement('br');
		buttonwrapper.appendChild(nylinje);
		var ok = document.createElement('input');
			ok.setAttribute('type', 'button');
			ok.setAttribute('value', 'Ok');
			ok.setAttribute('id', 'ok');
			ok.setAttribute('onclick', 'laggtill("' + roomnumber + '", "' + text + '", "' + type + '", "' + inputtype + '")');
		buttonwrapper.appendChild(ok);
		var avbryt = document.createElement('input');
			avbryt.setAttribute('type', 'button');
			avbryt.setAttribute('value', 'Avbryt');
			avbryt.setAttribute('onclick', 'hidemenu();');
		buttonwrapper.appendChild(avbryt);
		return false;
};
function markuppgift(element){
	var infofromtodo = element.parentElement.getAttribute('name').split('|||||');
	if(element.getAttribute('style')){
		element.removeAttribute('style');
		element.firstChild.removeAttribute('style');
		var action = 'avmarkeras';
	}else{
		element.setAttribute('style', 'color:#bdbdbd;text-decoration:line-through;');
		element.firstChild.setAttribute('style', 'background-color:#FFF!important;color:#bdbdbd;font-weight:normal;');
		var action = 'markeras gjord';
	};
	addhistory('Informaiton från ' + infofromtodo[1], action, infofromtodo[0], element.innerText);
	save(element.parentElement);
};
function removeuppgift(element){
	var infofromtodo = element.parentElement.getAttribute('name').split('|||||');
	addhistory('Informaiton från ' + infofromtodo[1], 'tas bort', infofromtodo[0], element.innerText);
	var parentname = element.parentElement;
	element.parentElement.removeChild(element);
	save(parentname);
};
document.onkeydown = function(evt) {
	evt = evt || window.event;
	var isEscape = false;
	if ("key" in evt) {
		isEscape = evt.key == "Escape";
	}else {
		isEscape = evt.keyCode == 27;
	};
	if (isEscape) {
		dothescroll();
		var menyn = document.getElementById('iconmenu');
		if(!document.getElementById('meny').getAttribute('style')){}else{
			showhide('meny');
		};
		if(!menyn.getAttribute('style')){
			hidemenu();
		}else{
			document.getElementById('deselect').focus();
			checkallwatch();
		};
	};
};
function removedeselect(element){
	element.value = '';
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
function nextdate(days, sattdatum){
	if(sattdatum){
		var d = new Date(sattdatum);
	}else{
		var d = new Date();
	};
	d.setDate(d.getDate() + parseInt(days))
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if(day <= 9){var day = '0' + day;};
	if(month <= 9){var month = '0' + month;};
	var datetonumber = year + '-' + month + '-' + day;
	return datetonumber;
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
function comparetime(sattdatum, dagarframtid){
	var watchdatum = lookfordate(sattdatum);
	var watchtid = lookfortime(sattdatum);
	if(watchdatum != 'none'){
		var samestandard = sattdatum.split('-');
		if(samestandard[0].split('').length == 2){
			var sattdatum = '20' + sattdatum;
		};
		if(dagarframtid != 'none'){
			var nuvarandedatum = nextdate(dagarframtid);
				var nuvarandedatumpritty = parseInt(nuvarandedatum.replace(/[-]/g, ''));
		}else{
			var nuvarandedatum = datum();
				var nuvarandedatumpritty = parseInt(nuvarandedatum.replace(/[-]/g, ''));
		};
		var sattdatumpritty = parseInt(sattdatum.replace(/[-]/g, ''));
		if(nuvarandedatumpritty == sattdatumpritty){
			return 'todayinfo';
		}else if(nuvarandedatumpritty > sattdatumpritty){
			return 'lateinfo';
		}else{
			return 'none';
		};
	}else if(watchtid != 'none'){
		var nuvarandetid = tid();
			var nuvarandetidpritty = nuvarandetid.replace(':', '');
		var satttidpritty = sattdatum.replace(':', '');
		if(nuvarandetidpritty >= satttidpritty){
			return 'todayinfo';
		}else{
			return 'none';
		};
	}else{
		console.log('comparetime() har märkt att något element har troligen watch på sig utan värde att använda = har troligen taggen av misstag');
		return 'none';
	};
};
function checkallwatch(){
	var allwatch = document.getElementsByClassName('watch');
	for(i=0;i<allwatch.length;i++){
		if(allwatch[i].getAttribute('title')){
			var sattdatum = allwatch[i].getAttribute('title');
			var isitaimage = true;
		}else{
			var sattdatum = allwatch[i].getAttribute('data');
			var isitaimage = false;
		};
		if(isitaimage){
			if(comparetime(sattdatum, 'none') != 'none'){
				allwatch[i].setAttribute('style', 'opacity:0.2;');
			}else if(comparetime(sattdatum, '1') != 'none'){
				addvarning(allwatch[i]);
			};
		}else{
			var morewatch = allwatch[i].parentElement.getElementsByClassName('watch');
			if(morewatch.length == 1){
				var checkiflate = comparetime(sattdatum, 'none');
				if(checkiflate != 'none'){
					allwatch[i].parentElement.setAttribute('class', checkiflate);
				};
			}else{
				for(m=0;m<morewatch.length;m++){
					var checkiflate = comparetime(morewatch[m].getAttribute('data'), 'none');
					var watchdatum = lookfordate(morewatch[m].getAttribute('data'));
					var watchtid = lookfortime(morewatch[m].getAttribute('data'));
					if(watchdatum != 'none'){
						var omdatumsen = checkiflate;
					}else if(watchtid != 'none'){
						var omtidsen = checkiflate;
					}else{
						console.log('Något gick fel i bestämmande av typ tid eller datum, detta när både datum och tid existerar i text.');
					};
				};
				if(omdatumsen == 'lateinfo'){
					var stiltillparent = 'lateinfo';
				}else if(omdatumsen == 'todayinfo'){
					if(omtidsen == 'todayinfo'){
						var stiltillparent = 'todayinfo';
					}else{
						var stiltillparent = 'none';
					};
				}else if(omdatumsen == 'none'){
					var stiltillparent = 'none';
				}else{
					console.log('Något gick fel i utläsningen och gemförandet mellan tid och datum.');
				};
				if(stiltillparent != 'none'){
					allwatch[i].parentElement.setAttribute('class', stiltillparent);
				}else{
					allwatch[i].parentElement.removeAttribute('class');
				};
			};
		};
	};
};
function addvarning(element){
	var code = element.getAttribute('src').replace(config.icolink[0], '').replace(config.icolink[1], '');
	var roomnumber = element.parentElement.parentElement.parentElement.getAttribute('id').replace('tableroom', '');
	var wrapper = document.getElementById('tableroom' + roomnumber).getElementsByClassName('uppgifter')[0].getElementsByClassName('todolist')[0];
	if(wrapper.getElementsByClassName('uppdateonrond|||||' + code).length == 0){
		var title = '';
		for(a=0;a<config.icotodo.length;a++){
			if(config.icotodo[a].namn == code){
				var title = config.icotodo[a].title;
			};
		};
		var text = title + config.uppgiftuppdaticodate;
		var nyli = document.createElement('li');
			nyli.setAttribute('onclick', 'doubleclick("markuppgift", "removeuppgift", this)');
			nyli.setAttribute('class', 'uppdateonrond|||||' + code);
			nyli.setAttribute('data', 'sparainte');
			var nylip = document.createElement('p');
				var nylipspan = document.createElement('span');
					var nylipspantext = document.createTextNode(text);
					nylipspan.appendChild(nylipspantext);
				nylip.appendChild(nylipspan);
			nyli.appendChild(nylip);
		wrapper.appendChild(nyli);
	};
};
function updatefunctions(){
	if(config.timeinhourswhenwatchupdate == 'none' || config.timeinhourswhenwatchupdate == 0){addhistory('Uppdateringsfrekvens för Watch funktionen är satt till "none" i config. Kommer därav inte uppdateras automatiskt.', '', '', '');console.log('checkallwatch(); uppdateringsfrekvens är satt till "none" i config. Kommer därav inte uppdateras automatiskt.');}else{
		var tidtilluppdat = ((parseInt(config.timeinhourswhenwatchupdate) * 60 ) * 1000 );
		setInterval(checkallwatch, tidtilluppdat);
	};
	if(config.timeinhourstosavelogg == 'none' || config.timeinhourstosavelogg == 0){addhistory('Uppdateringsfrekvens för "Spara logg" funktionen är satt till "none" i config. Kommer därav inte uppdateras automatiskt.', '', '', '');console.log('savelogg(); uppdateringsfrekvens är satt till "none" i config. Kommer därav inte spara loggfiler.');}else{
		var tidtilluppdat = ((parseInt(config.timeinhourstosavelogg) * 60 ) * 1000 );
		setInterval(savelogg, tidtilluppdat);
	};
};
function removesave(){
	alertbox('confirm', 'Säker på att du vill ta bort all information?', 'config.onclose.savelogg = config.onclose.onremove.savelogg;config.onclose.nomessage = config.onclose.onremove.nomessage;localStorage.clear();location.reload();');
};
function save(element){
	if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA'){
		if(element.getAttribute('class') == 'installning'){
			var type = element.getAttribute('name').replace('installning|||||', '');
			var installninguppgifter = document.getElementById('installning' + type).getElementsByClassName('installning');
			var tosave = '';
			for(a=0;a<installninguppgifter.length;a++){
				var tosave = tosave + installninguppgifter[a].value + '|||||';
			};
			savetohdd(element.getAttribute('name'), tosave);
		}else{
			savetohdd(element.getAttribute('name'), element.value);
		};
		addgray(element);
	}else if(element.tagName == 'SELECT'){
		savetohdd(element.getAttribute('name'), element.value);
		addgray(element);
	}else if(element.tagName == 'IMG'){
		if(element.parentElement.getAttribute('class') == 'gender'){
			var man = element.parentElement.getElementsByTagName('img')[0];
			if(man.getAttribute('class') == 'genderimage'){var m = 0;}else{var m = 1;}
			var kvinna = element.parentElement.getElementsByTagName('img')[1];
			if(kvinna.getAttribute('class') == 'genderimage'){var k = 0;}else{var k = 1;}
			savetohdd(element.getAttribute('name'), m + '-' + k);
		}else if(element.parentElement.getAttribute('class') == 'vplimg'){
			var number = element.getAttribute('src').split(config.vpllink[0])[1].split(config.vpllink[1])[0];
			savetohdd(element.getAttribute('name'), number);
		}else{
			var title = element.getAttribute('title');
			var info = element.getAttribute('class');
			var namn = element.getAttribute('src').split(config.icolink[0])[1].split(config.icolink[1])[0];
			var number = element.parentElement.parentElement.parentElement.getAttribute('id').replace('tableroom', '');
			var historyid = 'ico|||||' + number + '|||||' + namn;
			var historytosave = info + '|||||' + title;
			if(info.indexOf('notactive') !== -1){
				removefromhdd(historyid);
			}else{
				savetohdd(historyid, historytosave);
			};
		};
	}else if(element.getAttribute('class') == 'todolist'){
		var allli = element.parentElement.getElementsByTagName('li');
		var texttosave = '';
		for(a=0;a<allli.length;a++){
			if(allli[a].getAttribute('data') == 'sparainte'){}else{
				var listyle = allli[a].getAttribute('style');
				if(!listyle){var listyle = '0';};
				var pstyle = allli[a].firstChild.getAttribute('style');
				if(!pstyle){var pstyle = '0';};
				var texttosave = texttosave + '||||||||||' + allli[a].innerText + '|||||' + listyle + '|||||' + pstyle;
			};
		};
		savetohdd(element.getAttribute('name'), texttosave);
	}else if(element.getAttribute('class') == 'icotext'){
		var number = element.getAttribute('id').replace('icotext', '');
		var historyid = 'icotext|||||' + number;
		var allobstext = element.getElementsByTagName('p');
		if(allobstext.length == 0){
			removefromhdd(historyid);
		}else{
			var texttosave = '';
			for(a=0;a<allobstext.length;a++){
				var texttosave = texttosave + allobstext[a].innerText + '|||||';
			};
			savetohdd(historyid, texttosave);
		};
	}else if(element.getAttribute('class').indexOf('color') !== -1){
		var allcolor = element.parentElement.getElementsByClassName('color');
		var tosave = '';
		var number = element.parentElement.getAttribute('id').replace('tableroom', '');
		var historyid = number + '|||||color';
		for(a=0;a<allcolor.length;a++){
			if(allcolor[a].getAttribute('style')){
				var tosave = tosave + '1|||||';
			}else{
				var tosave = tosave + '0|||||';
			};
		};
		savetohdd(historyid, tosave);
	}else if(element.getAttribute('class').indexOf('editable') !== -1){
		var historyid = element.getAttribute('name');
			savetohdd(historyid, element.innerHTML.replace(/<br>/g, "/n").replace(/&nbsp;/g, " "));
	}else{
		console.log('Något gick fel i spara..');
	};
};
function addsave(){
	var todo = ['input', 'textarea', 'select'];
	for(i=0;i<todo.length;i++){
		var allelements = document.getElementsByTagName(todo[i]);
		for(a=0;a<allelements.length;a++){
			if(allelements[a].getAttribute('type') == 'button'){}else if(allelements[a].getAttribute('class') == 'dontsave'){}else if(allelements[a].getAttribute('id') == 'deselect'){}else{
				
					if(allelements[a].getAttribute('onchange')){
						if(allelements[a].getAttribute('onchange').indexOf('save()') !== -1){}else{
							allelements[a].setAttribute('onchange', allelements[a].getAttribute('onchange') + 'save(this);');
						};
					}else{
						allelements[a].setAttribute('onchange', 'save(this);');
					};
			};
		};
	};
	var alleditable = document.getElementsByClassName('editable');
	for(i=0;i<alleditable.length;i++){
		if(alleditable[i].getAttribute('onkeyup')){
			alleditable[i].setAttribute('onkeyup', alleditable[i].getAttribute('onkeyup') + 'save(this);');
		}else{
			alleditable[i].setAttribute('onkeyup', 'save(this);');
		};
	};
};
/*function load(){
	var todo = ['input', 'textarea', 'select'];
	for(i=0;i<todo.length;i++){
		var allelements = document.getElementsByTagName(todo[i]);
		for(a=0;a<allelements.length;a++){
			if(allelements[a].getAttribute('type') == 'button'){}else if(allelements[a].getAttribute('id') == 'deselect'){}else{
				var nameofelement = allelements[a].getAttribute('name');
				var history = getfromhdd(nameofelement);
				if(!history){}else{
					if(todo[i] == 'input' || todo[i] == 'textarea'){
						if(allelements[a].getAttribute('class') == 'installning'){}else{
							allelements[a].value = history;
							if(todo[i] == 'input'){
								if(allelements[a].getAttribute('name').split('|||||')[1] == 'optext'){
									extendinput(allelements[a]);
								};
							};
						};
					}else if(todo[i] == 'select'){
						allelements[a].selectedIndex = Number(history);
					};
				};
			};
		};
	};
	var alleditable = document.getElementsByClassName('editable');
	for(i=0;i<alleditable.length;i++){
		var history = getfromhdd(alleditable[i].getAttribute('name'));
		if(!history){}else{
			var slitlines = history.split('/n');
			for(a=0;a<slitlines.length;a++){
				if(slitlines[a]){
					var textinside = document.createTextNode(slitlines[a]);
					var brake = document.createElement('br');
					alleditable[i].appendChild(textinside);
					alleditable[i].appendChild(brake);
				};
			};
		};
	};
	for(i=0;i<config.roomnumbers.length;i++){
		var historyid = config.roomnumbers[i].replace(':', '-') + '|||||gender';
		var history = getfromhdd(historyid);
		if(!history){}else{
			var seperate = history.split('-');
			var imgparent = document.getElementById('tableroom' + config.roomnumbers[i].replace(':', '-')).getElementsByClassName('gender')[0];
			var images = imgparent.getElementsByTagName('img');
			if(seperate[0] == 1){
				chosegender(images[0]);
			}else if(seperate[1] == 1){
				chosegender(images[1]);
			};
		};
	};
	var allvplimg = document.getElementsByClassName('vplimg');
	for(i=0;i<allvplimg.length;i++){
		var imageelement = allvplimg[i].getElementsByTagName('img')[0];
		var history = parseInt(getfromhdd(imageelement.getAttribute('name'))) - 1;
		if(!history){}else{
			changevplstatus(history, imageelement);
		};
	};
	var alltodo = document.getElementsByClassName('todolist');
	for(i=0;i<alltodo.length;i++){
		var historyid = alltodo[i].getAttribute('name');
		var history = getfromhdd(historyid);
		if(!history){}else{
			var historysplitted = history.split('||||||||||');
			for(a=1;a<historysplitted.length;a++){
				var info = historysplitted[a].split('|||||')
				var roomnumber = historyid.split('|||||')
				if(info[1] == 0){var listyle = '';}else{var listyle = info[1];}
				if(info[2] == 0){var pstyle = '';}else{var pstyle = info[2];}
				laggtill(roomnumber[0], info[0], roomnumber[1], 'load', listyle, pstyle);
			};
		};
	};
	var allmeny = document.getElementById('iconmenu').getElementsByTagName('span');
	for(i=0;i<allmeny.length;i++){
		var allimages = allmeny[i].getElementsByTagName('img');
		for(a=0;a<allimages.length;a++){
			var name = allimages[a].getAttribute('data');
			var number = allmeny[i].getAttribute('id').replace('menuicons', '');
			var history = getfromhdd('ico|||||' + number + '|||||' + name);
			if(!history){}else{
				allimages[a].setAttribute('class', '');
				allimages[a].setAttribute('onclick', 'removeicon(this);');
				var historydivide = history.split('|||||');
				var wrapper = document.getElementById('tableroom' + number).getElementsByClassName('obsicon')[0];;
				var tableimg = wrapper.getElementsByClassName(name)[0];
					tableimg.setAttribute('class', historydivide[0]);
					tableimg.setAttribute('title', historydivide[1]);
				var imagetitle = tableimg.parentElement.getElementsByClassName('tooltiptext')[0];
					imagetitle.innerText = historydivide[1];
			};
		};
	};
	var wrapper = document.getElementsByClassName('icotext');
	for(i=0;i<wrapper.length;i++){
		var number = wrapper[i].getAttribute('id').replace('icotext', '');
		var history = getfromhdd('icotext|||||' + number);
		if(!history){}else{
			var historysplitt = history.split('|||||');
			for(a=0;a<historysplitt.length-1;a++){
				var ny = document.createElement('p');
					ny.setAttribute('onclick', 'doubleclick("", "removeobstext", this)');
					var nytext = document.createTextNode(historysplitt[a]);
					ny.appendChild(nytext);
				wrapper[i].appendChild(ny);
			};
		};
	};
	for(i=0;i<config.roomnumbers.length;i++){
		var historyid = config.roomnumbers[i].replace(':', '-') + '|||||color';
		var history = getfromhdd(historyid);
		if(!history){}else{
			var allcolors = document.getElementById('tableroom' + config.roomnumbers[i].replace(':', '-')).getElementsByClassName('color');
			var todo = history.split('|||||');
			for(a=0;a<allcolors.length;a++){
				if(todo[a] == 1){
					addcolor(allcolors[a], true);
				};
			};
		};
		var svalterpat = getfromhdd(config.roomnumbers[i].replace(':', '-') + '|||||svalter');
		if(svalterpat){
		 	doljnutrition('', config.roomnumbers[i].replace(':', '-'), '', '', '', '', '')
		};
	};
	checkallwatch();
	addsave();
};*/
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
    }else {
		pom.click();
	};
};
function isEven(n) {return n % 2 == 0;};
function isOdd(n) {return Math.abs(n % 2) == 1;};
function encodepassword(password){
	if(password == ''){return false;}else{
		var passwordencoded = 0;
		var allcharacters = password.split('');
		for(i=0;i<allcharacters.length;i++){
			var encoded = allcharacters[i].charCodeAt();
			if(isEven(encoded)){
				var passwordencoded = passwordencoded + encoded;
			}else if(isOdd(encoded)){
				var passwordencoded = passwordencoded - encoded;
			}else{
				console.log('Något gick fel i savepassword!');
			};
		};
		return Math.abs(passwordencoded);
	};
};
function savepassword(element){
	var password = element.parentElement.getElementsByTagName('input')[0];
	var passwordtwo = element.parentElement.getElementsByTagName('input')[1];
	if(password.value == passwordtwo.value){
		savetohdd('installning|||||pw', encodepassword(password.value));
		password.value = '';
		passwordtwo.value = '';
		showhide('password');
	}else{
		alertbox('alert', 'Lösenord är inte lika!');
	};
};
function savelogg(){
	if(localStorage.length == 0){console.log('Do nothing...')}else{
		var textinsavefile = '';
		for(i=0;i<localStorage.length;i++){
			var textinsavefile = textinsavefile + localStorage.key(i) + "§§§§§" + getfromhdd(localStorage.key(i)) + "§§§§§§§§§§§§§§§";
		};
		var textencoded = [];
		var indicator = '';
		var allcharacters = textinsavefile.split('');
		for(i=0;i<allcharacters.length;i++){
			var encoded = allcharacters[i].charCodeAt();
			if(getfromhdd('installning|||||pw')){
				var encoded = encoded * parseInt(getfromhdd('installning|||||pw'));
				var indicator = '#';
			};
			textencoded.push(encoded);
		};
          	var datum = new Date();
          	download(datum + '.txt', indicator + textencoded.toString());
          	addhistory('Loggfil', 'sparas', '', '');
         	};
};
function readSingleFile(evt) {
    var f = evt.target.files[0]; 
	if (f) {
		var r = new FileReader();
			r.onload = function(e) { 
				var contents = e.target.result;
				var type = f.type;
				if(type == 'text/plain'){}else{
					alertbox('alert', 'Säker på att rätt loggfil har valts? Kan inte ladda loggfil.');
					return;
				};
				if(contents.charAt(0) == '#'){
					savetohdd('textfileinfo', contents);
					showhide('passwordload');
				}else{
					removesave();
					var divided = contents.split(',');
					var text = '';
				    for(i=0;i<divided.length;i++){
				    	var text = text + String.fromCharCode(divided[i]);
				    };
				    var object = text.split('§§§§§§§§§§§§§§§');
				    for(i=0;i<object.length-1;i++){
				    	var objectdivided = object[i].split('§§§§§');
				    	savetohdd(objectdivided[0], objectdivided[1]);
				    };
				    config.onclose.savelogg = config.onclose.onload.savelogg;
					config.onclose.nomessage = config.onclose.onload.nomessage;
					addhistory('Loggfil', 'laddas', '', '');
				    location.reload();
				};
			}
			r.readAsText(f);
	} else { 
		alertbox('alert', 'Kunde inte ladda loggfilen.');
	};
	var theinput = document.getElementById('loadlogg');
		theinput.parentNode.removeChild(theinput);
};
function uncodethelogg(){
	var information = getfromhdd('textfileinfo').slice(1);
	var password = document.getElementById('passwordload').getElementsByTagName('input')[0].value;
	if(password == ''){}else{
		removesave();
		var passwordnumber = encodepassword(password);
		var divided = information.split(',');
		var text = '';
	    for(i=0;i<divided.length;i++){
	    	var text = text + String.fromCharCode(divided[i] / parseInt(passwordnumber));
	    };
	    var object = text.split('§§§§§§§§§§§§§§§');
	    for(i=0;i<object.length-1;i++){
	    	var objectdivided = object[i].split('§§§§§');
	    	savetohdd(objectdivided[0], objectdivided[1]);
	    };
	    config.onclose.savelogg = config.onclose.onload.savelogg;
		config.onclose.nomessage = config.onclose.onload.nomessage;
		addhistory('Loggfil', 'laddas', '', '');
	    location.reload();
	};
};
function startloadlogg(){
	var wrapper = document.getElementById('contentwrapper');
		var inputelement = document.createElement('input');
			inputelement.setAttribute('type', 'file');
			inputelement.setAttribute('id', 'loadlogg');
			inputelement.setAttribute('style', 'visibility: hidden;');
		wrapper.appendChild(inputelement);
		var theinput = document.getElementById('loadlogg');
			theinput.addEventListener('change', readSingleFile, false);
			theinput.click();
};
function showhide(id){
	var element = document.getElementById(id);
	if(element.getAttribute('style')){
		document.getElementById('meny').removeAttribute('style');
		element.removeAttribute('style');
	}else{
		document.getElementById('meny').removeAttribute('style');
		element.setAttribute('style', 'display:block;');
	};
};
function nyline(type, value){
	var parent = document.getElementById('installning' + type);//uppgift
	var name = parent.getElementsByTagName('input')[0].getAttribute('name');
		var span = document.createElement('span');
			var inputtext = document.createElement('input');
				inputtext.setAttribute('type', 'text');
				inputtext.setAttribute('name', name);
				if(value){
					inputtext.setAttribute('value', value);
				};
				inputtext.setAttribute('class', 'installning');
				inputtext.setAttribute('onchange', 'save(this)');
			span.appendChild(inputtext);
			var inputbuttonplus = document.createElement('input');
				inputbuttonplus.setAttribute('type', 'button');
				inputbuttonplus.setAttribute('onclick', 'nyline("' + type + '")');
				inputbuttonplus.setAttribute('value', '+');
			span.appendChild(inputbuttonplus);
			var inputbuttonminus = document.createElement('input');
				inputbuttonminus.setAttribute('type', 'button');
				inputbuttonminus.setAttribute('onclick', 'removeline(this)');
				inputbuttonminus.setAttribute('value', '-');
			span.appendChild(inputbuttonminus);
		parent.appendChild(span);
};
function removeline(element){
	var parent = element.parentElement.parentElement;
	var childs = parent.getElementsByTagName('span');
	if(childs.length == 1){
		parent.getElementsByTagName('input')[0].value = '';
	}else{
		parent.removeChild(element.parentElement);
	};
	save(childs[0].getElementsByTagName('input')[0]);
};
function sparainstallningar(){
	document.getElementById('deselect').focus();
	config.onclose.savelogg = config.onclose.installning.savelogg;
	config.onclose.nomessage = config.onclose.installning.nomessage;
	location.reload();
};
function loadinstallningar(){
	var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
			style.setAttribute('type', 'text/css');
		var textstorlek = getfromhdd('installning|||||storlek');
		if(!textstorlek){}else{	
				var textstorlekstatment = document.createTextNode('body, #contentwrapper p, #contentwrapper td, #contentwrapper input, #contentwrapper textarea, #contentwrapper select {font-size: ' + textstorlek + 'px;} #contentwrapper .roomnumber {font-size: ' + (parseInt(textstorlek) + config.numbertallerinpx) + 'px;}');
			style.appendChild(textstorlekstatment);
		};
		var textfonthistory = getfromhdd('installning|||||font');
		if(!textfonthistory){}else{
			var textfont = document.getElementById('installningfont').getElementsByTagName('option')[textfonthistory].value;
			if(!textfont){}else{	
				var textfontstatment = document.createTextNode('body, p, td, input, textarea{font-family: ' + textfont + ';}');
				style.appendChild(textfontstatment);
			};
		};
		var moreinfo = document.createTextNode('#moreinfotop, #moreinfobottom {height: ' + config.moreinfoheight + 'px; background-color: ' + config.moreinfocolor + ';}');
			style.appendChild(moreinfo);
		var moreinfo = document.createTextNode('.spacer {height: ' + config.spacersize + 'px;} .menyfast, .menytopright {top:' + config.spacersize + 'px;}');
			style.appendChild(moreinfo);
		head.appendChild(style);
	var todo = ['uppgifter', 'kontroller'];
	for(i=0;i<todo.length;i++){
		var uppgifterhistory = getfromhdd('installning|||||' + todo[i]);
		if(!uppgifterhistory){}else{
			var uppgifterhistorysplitt = uppgifterhistory.split('|||||');
			var installninguppgifterwrapper = document.getElementById('installning' + todo[i]);
			if(uppgifterhistorysplitt.length == 1){
				var minusnumber = 0;
			}else{
				var minusnumber = 1;
			};
			for(b=0;b<uppgifterhistorysplitt.length-minusnumber;b++){
				window['config'][todo[i]].push({namn:uppgifterhistorysplitt[b], inputtype:'none'});
				if(b == 0){
					installninguppgifterwrapper.getElementsByClassName('installning')[0].value = uppgifterhistorysplitt[b];
				}else{
					nyline(todo[i], uppgifterhistorysplitt[b]);
				};
			};
		};
	};
	var installningarnumbers = ['timeinhourswhenwatchupdate', 'timeinhourstosavelogg', 'maxelementinhistory'];
	for(i=0;i<installningarnumbers.length;i++){
			var installnumberhistory = getfromhdd('installning|||||' + installningarnumbers[i]);
			if(installnumberhistory){
				window['config'][installningarnumbers[i]] = (parseInt((installnumberhistory * 10)) / 10);
				var input = document.getElementById(installningarnumbers[i]);
				if(installnumberhistory == 'none'){var installnumberhistory = 0;}
				if(!input){}else{
					input.value = installnumberhistory;
				};
			}else{
				var input = document.getElementById(installningarnumbers[i]);
				var val = window['config'][installningarnumbers[i]];
				if(val == 'none'){var val = 0;}
				if(!input){}else{
					input.value = val;
				};
			};
	};
	if(getfromhdd('installning|||||vplcolor[0]')){config.vplcolor[0] = getfromhdd('installning|||||vplcolor[0]');};
	if(getfromhdd('installning|||||vplcolor[1]')){config.vplcolor[1] = getfromhdd('installning|||||vplcolor[1]');};
	if(getfromhdd('installning|||||vplcolor[2]')){config.vplcolor[2] = getfromhdd('installning|||||vplcolor[2]');};
	if(getfromhdd('installning|||||vplcolor[3]')){config.vplcolor[3] = getfromhdd('installning|||||vplcolor[3]');};
	if(getfromhdd('installning|||||duetodaystyle')){config.duetodaystyle = getfromhdd('installning|||||duetodaystyle') + ';';};
	if(getfromhdd('installning|||||overduestyle')){config.overduestyle = getfromhdd('installning|||||overduestyle') + ';';};
	if(getfromhdd('installning|||||dueandoverduestyle')){config.dueandoverduestyle = getfromhdd('installning|||||dueandoverduestyle') + ';';};
	if(getfromhdd('installning|||||operationer')){
		var seperateoperationer = getfromhdd('installning|||||operationer').split(/\n/);
		config.ingrepp = [];
		for(i=0;i<seperateoperationer.length;i++){
			config.ingrepp.push(seperateoperationer[i]);
		};
	};
	if(getfromhdd('installning|||||sangar')){
		var seperatesangar = getfromhdd('installning|||||sangar').split(/\n/);
		config.roomnumbers = [];
		for(i=0;i<seperatesangar.length;i++){
			config.roomnumbers.push(seperatesangar[i]);
		};
	};
	var sylefromconfig = document.createElement('style');
		sylefromconfig.setAttribute('type', 'text/css');
		var sylefromconfigtext = document.createTextNode('p.lateinfo{background-color:' + config.overduestyle + ';color:' + config.dueandoverduestyle + ';}p.todayinfo{background-color:' + config.duetodaystyle + ';color:' + config.dueandoverduestyle + ';}')
		sylefromconfig.appendChild(sylefromconfigtext);
	document.head.appendChild(sylefromconfig);
	if(!document.getElementById('installningsangar')){}else{
		document.getElementById('installningsangar').value = config.roomnumbers.toString().replace(/,/g, '\n');
	};
	if(!document.getElementById('installningoperationer')){}else{
		document.getElementById('installningoperationer').value = config.ingrepp.toString().replace(/,/g, '\n');
	};
};
function openundermeny(id){
	var element = document.getElementById(id);
	if(element.getAttribute('style')){
		element.removeAttribute('style')
	}else{
		element.setAttribute('style', 'display:inline-block')
	};
};
function addhistory(area, action, roomnumber, information){
	var historikwrapper = document.getElementById('historikwrapper');
	if(config.maxelementinhistory <= historikwrapper.getElementsByTagName('p').length){
		var antalelementtotakeaway = historikwrapper.getElementsByTagName('p').length - config.maxelementinhistory + 1;
		for(i=0;i<antalelementtotakeaway;i++){
			historikwrapper.removeChild(historikwrapper.lastChild);
		};
	};
	var tidinfo = datum() + ' ' + tid() + ': '
	if(!area){var areatext = '';}else{var areatext = area;};
	if(!action){var actiontext = '';}else{var actiontext = ' ' + action;};
	if(!roomnumber){var roomtext = '';}else{var roomtext = ' för rum ' + roomnumber.replace('-', ':');};
	if(!information){var informationtext = '';}else{var informationtext = ' (' + information + ')';};
		var paragraf = document.createElement('p');
			var paragraftext = document.createTextNode(tidinfo + areatext + actiontext + roomtext + informationtext + '.');
			paragraf.appendChild(paragraftext);
		historikwrapper.insertBefore(paragraf, historikwrapper.childNodes[0]);
	var allhistoryelements = historikwrapper.getElementsByTagName('p');
	var tosave = '';
	for(i=0;i<allhistoryelements.length;i++){
		if(!tosave){var spacer = '';}else{var spacer = '|||||';};
		var tosave = tosave + spacer + allhistoryelements[i].innerText;
	};
	savetohdd('historia', tosave);
};
var showtitlehidemenu;
function showtitle(element){
	element.getElementsByTagName('span')[0].setAttribute('style', 'visibility: visible;');
	//Starta räkning
	var d = new Date();
	window['showtitlehidemenu'] = parseInt(d.getTime() / 1000);
};
function hidetitle(element){
	element.getElementsByTagName('span')[0].removeAttribute('style');
	//Stoppa räkning
	//Om mer än vissa sekunder, visa inte meny
	var showtitlehidemenu = window['showtitlehidemenu'];
	var d = new Date();
	var n = parseInt(d.getTime()  / 1000);
	if(n == showtitlehidemenu){}else{
		setTimeout(function(){clearTimeout(showmenydelay);hidemenu();}, 300);
	};
	var showtitlehidemenu = '';
};
function standardvardplan(element){
	var datumochop = element.parentElement.getElementsByTagName('input');
	var datum = datumochop[0].value;
	var op = datumochop[1].value;
	if(!op || !datum){}else{
		for (var i = config.vardplan.length - 1; i >= 0; i--) {
			var sokord = config.vardplan[i].sokord;
			var roomnumber = element.getAttribute('name').split('|||||')[0];
			if(op.indexOf(sokord) !== -1){
				var kaddras = config.vardplan[i].dagarefterop;
				if(kaddras == 'none'){
					var dattodo = '';
				}else{
					var dattodo = ' ' + nextdate(kaddras, datum);
				}
				var uppgifterellerkontroller = config.vardplan[i].kontrollerelleruppfigter;
				var meddelande = config.vardplan[i].meddelande + dattodo;
				getmoreinfo(meddelande, roomnumber, "none", uppgifterellerkontroller, '', '');
			};
		};
	};
};
function laddavardplaner(){
	vardplanhistoria();
	for(i=0;i<config.vardplan.length;i++){
		makevardplanelement(i);
	};
};
function removevardplan(element){
	var child = element.parentElement;
	var i = 0;
	while( (child = child.previousSibling) != null ){i++;}
	element.parentElement.parentElement.removeChild(element.parentElement);
	config.vardplan.splice(i, 1);
	sparavardplaner();
};
function vardplandate(element){
	if(element.checked){
		element.parentElement.getElementsByClassName('vardplandate')[0].setAttribute('style', 'display: block;');
	}else{
		element.parentElement.getElementsByClassName('vardplandate')[0].removeAttribute('style');
	};
};
function laggtillnyvardplan(){
	var sokord = document.getElementById('vardplansokord');
	var typ = document.getElementById('vardplantyp');
	var meddelande = document.getElementById('vardplanmeddelande');
	var omdatum = document.getElementById('vardplanomdatum');
	var antaldagar = document.getElementById('vardplanantaldagar');
	if(!sokord.value){return false;};
	if(!typ.value){return false;};
	if(!meddelande.value){return false;};
	if(omdatum.checked){
		if(!antaldagar.value){
			return false;
		}else{
			var antaldagarnummer = antaldagar.value;
		};
	}else{
		var antaldagarnummer = 'none';
	};
	var number = config.vardplan.length;
	var nyvardplan = new Object();
		nyvardplan.sokord = sokord.value;
		nyvardplan.dagarefterop = antaldagarnummer;
		nyvardplan.kontrollerelleruppfigter = typ.value;
		nyvardplan.meddelande = meddelande.value;
	config.vardplan.push(nyvardplan);
	makevardplanelement(number);
	sokord.value = '';typ.selectedIndex = 0;meddelande.value = '';omdatum.checked = false;antaldagar.value = '';
	sparavardplaner();
};
function sparavardplaner(){
	var information = '';
	for (var i = config.vardplan.length - 1; i >= 0; i--) {
		var sokord = config.vardplan[i].sokord;
		var dagarefterop = config.vardplan[i].dagarefterop;
		var kontrollerelleruppfigter = config.vardplan[i].kontrollerelleruppfigter;
		var meddelande = config.vardplan[i].meddelande;
		if(!information){
			var spacer = '';
		}else{
			var spacer = '||||||||||';
		};
		var information = information + spacer + sokord + '|||||' + dagarefterop + '|||||' + kontrollerelleruppfigter + '|||||' + meddelande;
	};
	savetohdd('vardplaner', information);
};
function vardplanhistoria(){
	var vardplanhistory = getfromhdd('vardplaner');
	if(!vardplanhistory){}else{
		config.vardplan = [];
		var objektseparata = vardplanhistory.split('||||||||||');
		for (var i = objektseparata.length - 1; i >= 0; i--) {
			var objektuppdelad = objektseparata[i].split('|||||');
			console.log(objektuppdelad);
			var nyvardplan = new Object();
				nyvardplan.sokord = objektuppdelad[0];
				nyvardplan.dagarefterop = objektuppdelad[1];
				nyvardplan.kontrollerelleruppfigter = objektuppdelad[2];
				nyvardplan.meddelande = objektuppdelad[3];
			config.vardplan.push(nyvardplan);
		};
	};
};
function makevardplanelement(i){
	var vardplanwrapper = document.getElementById('vardplanlist');
	if(config.vardplan[i].dagarefterop == 'none'){
		var dagartext = '';
	}else{
		var dagartext = ' - ' + config.vardplan[i].dagarefterop + ' dagar efter op';
	}
	var text = '"' + config.vardplan[i].sokord + '" - ' + config.vardplan[i].kontrollerelleruppfigter + dagartext + ' - "' + config.vardplan[i].meddelande + '"';
	var paragraf = document.createElement('p');
		paragraf.setAttribute('data', 'sokord: "' + config.vardplan[i].sokord + '", dagarefterop: "' + config.vardplan[i].dagarefterop + '", kontrollerelleruppfigter: "' + config.vardplan[i].kontrollerelleruppfigter + '", meddelande: "' + config.vardplan[i].meddelande + '"');
		var paragraftext = document.createTextNode(text);
		paragraf.appendChild(paragraftext);
		var removebutton = document.createElement('input');
			removebutton.setAttribute('type', 'button');
			removebutton.setAttribute('value', '-');
			removebutton.setAttribute('onclick', 'removevardplan(this);');
		paragraf.appendChild(removebutton);
	vardplanwrapper.appendChild(paragraf);
};
function savetohdd(id, string){
	/*if(window['starttoken']){*/
		//localStorage.setItem(id, string);
	/*};*/
	/*
	SKAPA NY
	type: "POST",
	UPPDATERA
	type: "PUT"
	*/
	
	if(id.indexOf('installning') !== -1){
		localStorage.setItem(id, string);
	}else{
		socket.emit('textarea', {"id": id, "info": string, "type": "text"});
	};
	
};
function removefromhdd(id){
	console.log('Tar bort följande id från sparfilen: ' + id);
	//socket.emit('textarea', {"id": id, "info": "", "type": "text"});
	socket.emit('removeinfo', id);
	//localStorage.removeItem(id);
	/*type: "DELETE",
		$.ajax({
			url: '/script.cgi',
			type: 'DELETE',
			success: function(result) {
				// Do something with the result
			}
		});
	*/
	/*var xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "ajax_info.txt", false);
	xhttp.send();*/
};
function getfromhdd(id){
	console.log(id + ' hämtas från localStorage');
	return localStorage.getItem(id);

	/*var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML = this.responseText; //alt. ".responseXML"
		}
	};
	xhttp.open("GET", "ajax_info.txt", false);
	xhttp.send();*/
};
