window.onscroll = function() {
	if(window.pageYOffset == 0){
		document.getElementById('meny').removeAttribute('class');
	}else{
		document.getElementById('meny').setAttribute('class', 'floating');
	};
};
function visameny(){
	document.getElementById('meny').setAttribute('style', 'display: inline;');
	document.getElementById('mobilemenyicon').setAttribute('onclick', 'doljmeny();');
};
function doljmeny(){
	document.getElementById('meny').removeAttribute('style');
	document.getElementById('mobilemenyicon').setAttribute('onclick', 'visameny();');
};
/*#logg*/

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('logg').setAttribute('onclick', 'logg();');
}, false);
function logg(){
	var promptCount = 0;
	window.pw_prompt = function(options) {
	    var lm = options.lm || "Password:",
	        bm = options.bm || "Submit";
	    if(!options.callback) { 
	        alert("No callback function provided! Please provide one.") 
	    };
	                   
	    var prompt = document.createElement("div");
	    prompt.className = "pw_prompt";
	    
	    var submit = function() {
	        options.callback(input.value);
	        document.body.removeChild(prompt);
	    };

	    var label = document.createElement("label");
	    label.textContent = lm;
	    label.for = "pw_prompt_input" + (++promptCount);
	    prompt.appendChild(label);

	    var input = document.createElement("input");
	    input.id = "pw_prompt_input" + (promptCount);
	    input.type = "password";
	    input.addEventListener("keyup", function(e) {
	        if (e.keyCode == 13) submit();
	    }, false);
	    prompt.appendChild(input);

	    var button = document.createElement("button");
	    button.textContent = bm;
	    button.addEventListener("click", submit, false);
	    prompt.appendChild(button);

	    document.body.appendChild(prompt);
	    input.focus();
	};
	pw_prompt({
	    lm:"Please enter your password:", 
	    callback: function(password) {
	        if(password == "matte"){
	            window.location.href = '../privat/index.html';
	        }else{
	            window.location.href = '../index.html';
	        };
	    }
	});
};