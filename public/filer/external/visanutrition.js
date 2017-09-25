function visanutrition(namn, nummer, type, todo, listyle, pstyle){
	var nutritionwrapper = document.getElementById('tableroom' + nummer).getElementsByClassName('kostselect')[0].parentElement;
		nutritionwrapper.removeAttribute('style');
		nutritionwrapper.getElementsByTagName('input')[0].removeAttribute('style');
		nutritionwrapper.getElementsByTagName('textarea')[0].removeAttribute('style');
	if(namn == 'load'){}else{
		removefromhdd(nummer + '|||||svalter');
	};
};