let welcome = document.getElementById("welcome");

String.prototype.has = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] != '' && this.indexOf(arguments[i]) != -1) return true;
	}
	return false;
};

const buttons = document.getElementsByClassName('button');

for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function() {
		welcome.innerText = ((this.id).replace(/\B([a-z](?=[A-Z])|[A-Z](?=[a-z]))/g, '$1 ')).replace(/_/g, " ");
		if (this.id == 'stop') {
			cube.className = '';
		} else if (this.id.has('move')) {
			port.classList.remove('move_far', 'move_normal', 'move_close');
			port.classList.add(this.id);
		} else if (this.id.has('stroke')) {
			cube.classList.remove('stroke', 'strokeIN', 'strokeOUT');
			cube.classList.add(this.id);
		} else {
			cube.classList.remove('spinXYZ', 'spinX', 'spinXinv', 'spinY', 'spinYinv', 'spinZ', 'spinZinv');
			cube.classList.add(this.id);
		}
	}, false);
}
