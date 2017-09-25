var allkostfield = document.getElementsByClassName('kostselect');
for (var i = allkostfield.length - 1; i >= 0; i--) {
	allkostfield[i].setAttribute('onchange', 'checkforsvalt(this); ' + allkostfield[i].getAttribute('onchange'));
};
function checkforsvalt(element){
	console.log('Funkar!');
	var nummer = element.getAttribute('name').split('|||||')[0];
	if(element.value == 'Svält'){
		doljnutrition('none', nummer);
	}else if(element.value == 'svält'){
		doljnutrition('none', nummer);
	}else{
		var svaltikon = document.getElementById('tableroom' + nummer).getElementsByClassName('obsicon')[0].getElementsByClassName('svalt')[0].getAttribute('class');
		if(svaltikon.indexOf('notactive') !== -1){
			visanutrition('none', nummer);
		};
	};
};