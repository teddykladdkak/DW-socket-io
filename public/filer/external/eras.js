function eras(namn, nummer){
	laggtill(nummer, 'ERAS-loggbok', 'Uppgifter', 'none');
	laggtill(nummer, 'Obs att ERAS lkm är insatt enligt ordinationsmallar (se PM) ' + datum(), 'Uppgifter', 'none');
	laggtill(nummer, 'Vikt x1', 'Kontroller', 'none');
	laggtill(nummer, 'Vätskebalans', 'Kontroller', 'none');
	laggtill(nummer, 'Flödesmätning', 'Kontroller', 'none');
	laggtill(nummer, 'Kontroller x2', 'Kontroller', 'none');
};