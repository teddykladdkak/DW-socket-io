function doljnutrition(namn, nummer, type, todo, listyle, pstyle){
	var nutritionwrapper = document.getElementById('tableroom' + nummer).getElementsByClassName('kostselect')[0].parentElement;
		nutritionwrapper.setAttribute('style', config.disabeldnutrition);
		nutritionwrapper.getElementsByTagName('input')[0].setAttribute('style', config.disabeldnutrition);
		nutritionwrapper.getElementsByTagName('textarea')[0].setAttribute('style', config.disabeldnutrition);
	if(namn == 'load'){}else{
		savetohdd(nummer + '|||||svalter', true);
	};
};