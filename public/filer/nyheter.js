var nyheterflode = [
	{
	titel: 'Har har egentesterna startat',
	datum: '2016-10-05',
	text: 'Då det mesta på att göra-listan är klart, har jag nu börjat testa sidan, såklart hittar jag en mindre bugg direkt, man kan inte välja att sidan ska spara loggfil eller att sidan ska titta efter datum i mindre än var timme, alltså minuter funkar inte, detta är fixat på demosidan tills vidare, kommer läggas upp med källkoden när allt testande är klart. Testsidan är nu även upplaggd på teddyprojekt.se, innan var den delad på dropbox, men eftersom dropbox inte längre stödjer "webbview" (man kan läsa filer som webbsidor) fick jag lösa det på detta sättet.'
	},{
	titel: 'Steget längre med standard vårdplan',
	datum: '2016-09-30',
	text: 'Från förra inlägget informerar jag om vårplansfunktionen, nu har jag tagit steget längre, användare kan nu själva ställa in på sidan vilka standardvårdplaner som ska existera. Om du vill se det fungera kan du nu använda exemplet, i fönstret för "Typ av operation" skriv in "test1" och välj ett datum. Ändra sedan "test1" till "test2"'
	},{
	titel: 'Standard vårdplan',
	datum: '2016-09-29',
	text: 'Nu finns möjlighet att lägga till standrad vårdplaner för patienter i "config" filen. Detta innebär att man utifrån sökord kan bestämma när saker skall göras efter viss typ av operation, ex dra KAD 6 dagar efter operation. Detta läggs automatiskt in i uppgifter när datum och operation fyllts i. Tanken är att denna info ska spegla redan satta PM för avdelningen.'
	},{
	titel: 'Varningsfunktionen säkrad!',
	datum: '2016-09-29',
	text: 'Varningsfuktionen som benäms "Watch" är nu uppdaterad för bli ännu smartare. Kan nu utläsa vad som är datum och vad som är tid i fritext. Utifrån detta även bestämma ifall tiden är för sen utifrån dagens datum. Kan även lägga in varningar om info till exempel skall visas 1 dag innan. Den kan även känna av vilket som ska prioriteras i olika situationer. Nu finns möjlighet att skriva tid för framtiden, utan att onödiga varningar visas. OBS ikon text måste nu dubbelklickas för att tas bort.'
	},{
	titel: 'Todo funktionen uppdaterad!',
	datum: '2016-09-28',
	text: 'Inget kanske en användare tänker på direkt, men ändrat funktionen som lägger till punkter i Uppgifter/Kontroller. Innan lades alltid tid först och datum sist i texten. Nu behålls ordningen om användaren fyllt i. Även skrivit om större delen av funktionerna, då nu med tiden flertalet saker lagts till vilket i sig genererar buggar (som vi definitivt inte tycker om!). De ska i alla fall nu vara åtgärdade! Skapat en ny demofil för att loggningen nu ser lite annorlunda ut, för att inte skapa några buggar pga en gammal loggfil används.'
	},{
	titel: 'Nyheter i programmet!',
	datum: '2016-09-28',
	text: 'Eftersom jag konstant uppdaterar funktioner m.m. tänkte jag att det skulle vara bra att snabbt få tillgång till en plats där man läsa om vad som är nytt. Har idag fixat så att menyer animeras in när de ska visas, för att ge användaren en "mjukare" upplevelse. Har även fixat så att extrainformaiton för ikoner visas när de klickas på.'
	}
]