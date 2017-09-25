var config = {
	saveloop: 1,
	location: {
		index: 'index.html',
		save: './save.json',
		register: './register.json',
		externalfolder: 'filer/external/'
	},
	port: 7777,
	externalscript: ['doljnutrition', 'visanutrition', 'eras'],
	externalscriptafterload: ['checkforsvalt'],
	kost: ['AK', 'EK', 'NNR', 'Timbal', 'Klar Flyt', 'Flyt', 'ND', 'PN', 'Svält'],
	roomnumbers: ['1:2', '1:3', '2:1', '2:2', '3:1', '3:2', 'R:4', 'R:5', '6:2', '6:3', '7:1', '7:2', '8:2', '8:3', 'E(1:1)', 'E(6:1)', 'E(8:1)', 'IN:1', 'IN:2'],
	elementstosbarbox: ['pca', 'cvk', 'pac', 'eda'],
	extrafarger: ['#FFFF00', '#0000FF', '#00FF00'],
	icotodo:[{
		namn: 'eras',
		title: 'ERAS-patient',
		typ: 'none',
		info: 'none',
		active: ['eras', '1', '2'],
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'tolk',
		title: 'Tolkbehov',
		typ: 'text',
		info: 'Vilket språk förstår patienten?',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'o2',
		title: 'O2',
		typ: 'number',
		info: 'Hur många liter syrgas har patienten?',
		active: 'none' /*['getmoreinfo', 'kontroller', 'POX', 'number', '1', 'Hur ofta om dagen ska POX följas?']*/,
		deactive: 'none',
		toprint: 'aktuellt',
		aftertext: ' liter'},
		{
		namn: 'horsel',
		title: 'Nedsatt hörsel',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'fallrisk',
		title: 'Fallrisk!',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'trycksar',
		title: 'Trycksår/Trycksårsrisk',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'uppgifter', 'Vändschema', 'none', 'none'],
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'vsond',
		title: 'V-sond',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'epilepsi',
		title: 'Epilepsi',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'ejhlr',
		title: 'Ej HLR',
		typ: 'date',
		info: 'Välj hur länge beslut gäller?',
		active: 'none',
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'diabetes',
		title: 'Diabetes',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'kontroller', 'B-glucos', 'number', '3', 'Hur ofta om dagen ska B-glucos följas?'],
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'dran',
		title: 'Dränage',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'emla',
		title: 'Stickrädd',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'apodos',
		title: 'Apodos',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'none'},
		{
		namn: 'antibiotbeh',
		title: 'Iv. Antibiotika beh.',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'tattillsyn',
		title: 'Tät tillsyn!',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'aktuellt'},
		{
		namn: 'cave',
		title: 'CAVE',
		typ: 'text',
		info: 'Vad är patient allergisk mot?',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'smitta',
		title: 'Smitta',
		typ: 'text',
		info: 'Villken typ av smitta?',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		/*{
		namn: 'pcaeda',
		title: 'PCA eller EDA',
		typ: 'button',
		info: ['PCA','EDA'],
		active: ['getmoreinfo', 'kontroller', 'PCA/EDA kontroller', 'load', 'none'],
		deactive: 'none',
		toprint: 'checkbox'},*/
		{
		namn: 'eda',
		title: 'EDA-pump',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'kontroller', 'EDA-kontroller ', 'number', 'none', 'Hur ofta ska EDA kontroller tas?'],
		deactive: 'none',
		toprint: 'checkbox'},
		{
		namn: 'pca',
		title: 'PCA-pump',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'kontroller', 'PCA-kontroller ', 'number', 'none', 'Hur ofta ska PCA kontroller tas?'],
		deactive: 'none',
		toprint: 'checkbox'},
		{
		namn: 'kad',
		title: 'Urinkateter (KAD)',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: ['getmoreinfo', 'kontroller', 'Bladderscan kontroll, KAD avvecklades', 'time', 'none', 'När avvecklades KAD?'],
		toprint: 'aktuellt'},
		{
		namn: 'svalt',
		title: 'Svält',
		typ: 'none',
		info: 'none',
		active: ['doljnutrition', 'none', 'none'],
		deactive: ['visanutrition', 'none', 'none'],
		toprint: 'bakgrund'},
		{
		namn: 'pac',
		title: 'Port a Cath',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'uppgifter', 'PaC omläggning', 'date', 'none', 'När är datumet för nästa omläggning av Port a Cath?'],
		deactive: 'none',
		toprint: 'checkbox'},
		{
		namn: 'cvk',
		title: 'Central venkateter (CVK)',
		typ: 'none',
		info: 'none',
		active: ['getmoreinfo', 'uppgifter', 'CVK omläggning', 'date', 'none', 'När är datumet för nästa omläggning av CVK?'],
		deactive: 'none',
		toprint: 'checkbox'},
		{
		namn: 'sekr',
		title: 'Sekretess',
		typ: 'none',
		info: 'none',
		active: 'none',
		deactive: 'none',
		toprint: 'bakgrund'},
		{
		namn: 'annat',
		typ: 'text',
		info: 'Vad vill du lägga till för text i "OBS" fönstret?',
		active: 'none',
		deactive: 'none',
		toprint: 'none'}],
	ingrepp: ['Högersidig hemikolektomi', 'Vänstersidig hemikolektomi', 'Hög främre resektion', 'Låg främre resektion', 'Sigmoideumresektion', 'Rektumexstirpation', 'Rektumamputation', 'Nedläggning av stomi', 'Reservoirkirurgi', 'Bäckenreservoir', 'Rektopexi', 'Revision av Kock-reservoir', 'Total kolektomi'],
	ingreppextra: ['Ileostomi', 'Loopileostomi', 'Transversostomi', 'Kolostomi', 'Urostomi'],
	uppgifter: [
		{namn:'Dra drän',inputtype:'date',meddelande:'När ska dränage avvecklas?'},
		{namn:'Omvårdnad',inputtype:'none'},
		{namn:'Urin-OBS',inputtype:'none'},
		{namn:'Avveckla smärtpump',inputtype:'date',meddelande:'När ska smärtpump avvecklas?'},
		{namn:'Såromläggning',inputtype:'date',meddelande:'När ska såromläggning göras?'},
		{namn:'Suturtagning',inputtype:'date',meddelande:'När ska suturer tas?'},
		{namn:'Agrafftagning',inputtype:'date',meddelande:'När ska agraffer tas?'},
		{namn:'Stomiträning',inputtype:'number',meddelande:'Hur ofta om dagen ska patient få stomiträning?',startnumber:1},
		{namn:'Mobilisering',inputtype:'number',meddelande:'Hur ofta om dagen ska patient mobiliseras?',startnumber:3},
		{namn:'Dra KAD',inputtype:'date',meddelande:'Vilket datum skall KAD avvecklas?'},
		{namn:'Urinmätning',inputtype:'none'},
		{namn:'Spola V-sond',inputtype:'none'},
		{namn:'Dra V-sond',inputtype:'date',meddelande:'När ska V-sonden avvecklas?'},
		{namn:'CVK omläggning',inputtype:'date',meddelande:'När är nästa datum CVK skall läggas om?'},
		{namn:'Spola dränage',inputtype:'number',meddelande:'Hur ofta om dagen ska dränage spolas?',startnumber:1},
		{namn:'Obs provsvar',inputtype:'time',meddelande:'När togs proverna?'}
	],
	kontroller: [
		{namn:'Kostregistrering',inputtype:'none'},
		{namn:'Vätskebalans',inputtype:'none'},
		{namn:'Vätskelista',inputtype:'none'},
		{namn:'Vikt',inputtype:'number',meddelande:'Hur ofta om dagen ska vikt tas på patienten?',startnumber:1},
		{namn:'Temp',inputtype:'number',meddelande:'Hur ofta om dagen ska temp tas?',startnumber:2},
		{namn:'Förbandskontroll',inputtype:'number',meddelande:'Hur ofta om dagen skall förband observeras?',startnumber:1},
		{namn:'Kontroller',inputtype:'number',meddelande:'Hur ofta om dagen ska kontroller tas?',startnumber:2},
		{namn:'Hb',inputtype:'number',meddelande:'Hur ofta om dagen ska Hb tas?',startnumber:1},
		{namn:'Flödesmätning',inputtype:'none'},
		{namn:'P-glucos',inputtype:'number',meddelande:'Hur ofta om dagen ska P-glucos tas?',startnumber:4},
		{namn:'Bladder-scan',inputtype:'time',meddelande:'När gjordes senaste kontrollen (Avvecklades KAD?)'},
		{namn:'MEWS',inputtype:'number',meddelande:'Hur ofta om dagen ska MEWS tas?',startnumber:3}
	],
	specifikkontroll: 'Annat...',
	icolink: ['filer/ico/', '.png'],
	vpllink: ['filer/vpl/', '.png'],
	genderlink: ['filer/gender/', '.png'],
	timeinhourswhenwatchupdate: 60,//nu i minuter
	timeinhourstosavelogg: 'none',//nu i minuter
	elementstodisable: ['roomnumber', 'obsicon', 'uppgifter', 'kontroller', 'patblad'],
	hemtransport: ['Taxi', 'Liggande transport', 'Anhörig hämtar', 'Går hem själv'],
	vplcolor: ['#FFFFFF', '#FF0000', '#FFFF00', '#90EE90'],
	vplimgtext: ['', ' Inskriven i SAMSA.', ' Vårdplanering är planerad.', ' Utskrivningsklar i SAMSA.'],
	disabeldnutrition: 'background-color:#000;color:gray;border-color:#000;',
	meddelandevidflytt: 'Välj vilken säng du vill flytta patienten till.',
	meddelandeomsammaplats: 'Du har valt att flytta patient till samma plats den redan är på. Om du fortfarande vill flytta patient, välj då en annan säng.',
	meddelandeompatientredanexisterar: 'Det finns info på den plats du önskar flytta din patient, kontrollera att sängplatsen är tömd på informaiton.',
	texttillannatknappen: 'Skriv text nedan, för att lägga till en ny punkt',
	timeinminutedisplaymode: 1,
	duetodaystyle:'#CCCC00',
	overduestyle:'#FF0000',
	dueandoverduestyle:'#FFFFFF',
	uppgiftuppdaticodate:' gäller bara till imorgon. Datum behöver uppdateras under rond.',
	texttoresize: 144,
	messageonclose: 'Säker på att du vill stänga/uppdatera sidan? Information kan tas bort. Du behöver då ladda om loggfil.',
	messagetabortpatient: ['Säker på att du vill ta bort all information för rum ', '? Detta kan inte ångras!'],
	onclose: {
		savelogg: true,
		nomessage: false,
		onremove: {
			savelogg: false,
			nomessage: true
		},
		onload: {
			savelogg: false,
			nomessage: true
		},
		installning: {
			savelogg: true,
			nomessage: true
		}
	},
	whaitondoubleclick: 300,
	numbertallerinpx: 2,
	maxelementinhistory: 100,
	sekresetscroll: 30,
	sektocheckinfoutanfor: 5,
	moreinfoheight: 10,
	spacersize: 500,
	tidtodoredigerahalla: 2000,
	moreinfocolor: '#FF0000',
	sbarzoom: 1.5,
	medicinskbedomningknapp: {
		huvudtext: 'Behov av Medicinsk Bedöming: ',
		on: 'På',
		off: 'Av',
		style: 'background-color: red;color:#FFF;'
	},
	medisinskbedomning: {
		title: 'Medicinsk bedömnings status',
		element: [{
			namn: 'Medicinsk prio',
			stil: 'medprio'
		},{
			namn: 'Hemgångsklar',
			stil: 'medklar'
		},{
			namn: 'Färdig plan',
			stil: 'medplan'
		},{
			namn: 'Oklar (Ej akut)',
			stil: 'none'
		}]
	},
	vardplan:[{
		sokord: 'test1',
		dagarefterop: 'none',
		kontrollerelleruppfigter: 'uppgifter',
		meddelande: 'Automatisk uppfigt.'
		},{
		sokord: 'test2',
		dagarefterop: '6',
		kontrollerelleruppfigter: 'uppgifter',
		meddelande: 'Automatisk uppgift som lagts till 6 dagar efter operation'
		}],
	cmd: {
		infowidth: 60,
		infostart: 'Server är startad!',
		infolink: 'Kan nås via följande länkar:',
		infolocal: 'Lokalt',
		infonetw:'Nätverket',
		infoturnoff: 'Stäng av server med "CTRL+C"',
		versioner: [{
			namn: 'DW',
			beskrivning: 'Whiteboard vyn.',
			lank: '/dw.html',
			img: 'dw.png'
		},{
			namn: 'DW-TODO',
			beskrivning: 'Applikation som hanterar "Att göra" delen från DW. Visar Uppgifter och Kontroller. Möjlighet att läsa och redigera från DW.',
			lank: '/todo.html',
			img: 'todo.png'
		},{
			namn: 'DW-Vårdplats',
			beskrivning: 'Sida som visar nuvarande platsläge. Visualiserar med färger beroende på om patient planeras hem, om den planeras hem idag, om den inte har ett planerat hemgångsdatum eller om sängen är tom.',
			lank: '/vardplats.html',
			img: 'vardplats.png'
		},{
			namn: 'DW-APP',
			beskrivning: 'Mobil vyn av DW. OBS ännu inte färdig, kan enabrt ta mot informaiton från server, inte lägga till eller uppdatera befintlig information.',
			lank: '/app.html',
			img: 'app.png'
		},{
			namn: 'DW-ADD',
			beskrivning: 'Applikation som skickar patientdata till DW. Formulär som täcker allt förutom Uppgifter, Kontroller och Ikoner i DW. Kan enbart skicka, läser inget.',
			lank: '/add.html',
			img: 'add.png'
		},{
			namn: 'DW-Admin',
			beskrivning: 'Sida där det finns möjlighet att lägga till och ta bort användare, även ställa in behörigheter och lösenord.',
			lank: '/admin.html',
			img: 'admin.png'
		}]
	},
	vardplats:{
		tdelements: [
			{rubrik: 'Rum', id: 'rum'},
			{rubrik: 'Namn', id: '|||||namn'},
			{rubrik: 'Ålder', id: '|||||alder'},
			{rubrik: 'Anteckningar', id: '|||||utinfo'},
			{rubrik: 'Transporttyp', id: '|||||planut'},
			{rubrik: 'Datum för hemgång', id: '|||||utdate'}
		],
		colors:[{
			rubrik: 'Patient med planerat utdatum',
			id: 'belagdmedhemdat',
			farg: 'white'
		},{
			rubrik: 'Patient utan planerad hemgångsdatum',
			id: 'belagdutanhemdat',
			farg: 'yellow'
		},{
			rubrik: 'Tom sängplats',
			id: 'tom',
			farg: 'green'
		},{
			rubrik: 'Patient som ska hem idag',
			id: 'todayinfo',
			farg: 'blue'
		},{
			rubrik: 'Patient som skulle hem för någon/några dagar sedan',
			id: 'lateinfo',
			farg: 'red'
		}]
	}
};
