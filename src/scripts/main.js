const dialogs = document.querySelectorAll('.dialog');

for (let i = 0; i < dialogs.length; i++) {
	dialog(dialogs[i]);
}

function dialog(elem) {
	const openingButtons = document.querySelectorAll('[data-dialog="' + elem.id + '"]');
	const closeButton = elem.querySelector('.dialog__close');

	for (let i = 0; i < openingButtons.length; i++) {
		openingButtons[i].addEventListener('click', function() {
			console.log(this.dataset.modal);
			if (this.dataset.modal === "false")
				opensWindow();
			else
				opensModal();
		});
	}

	closeButton.addEventListener('click', closesModal);

	elem.addEventListener('click', e => {
		if (elem == e.target) closesModal();
	});

	document.addEventListener('keydown', e => {
		if (e.key == "Escape") closesModal();
	});

	function opensModal() {
		elem.showModal();
		scrollLock();
	}

	function opensWindow() {
		elem.show();
	}

	function closesModal() {
		elem.close();
		scrollUnlock();
	}

	function scrollLock() {
		document.body.classList.add('scroll-lock');
		document.body.style.overflow = 'hidden';
	}

	function scrollUnlock() {
		document.body.classList.remove('scroll-lock');
		document.body.style.overflow = '';
	}
}

// полифил

const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

if (isBrowserNotSupportDialog) {
	const script = document.createElement('script');
	script.src = 'scripts/dialog-polyfill.js';
	document.body.appendChild(script);

	let link = document.createElement('link');
	link.href = 'styles/dialog-polyfill.css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);

	script.addEventListener('load', () => {
		var MyDialogs = document.querySelectorAll('dialog');

		for (let i = 0; i < MyDialogs.length; i++) {
			dialogPolyfill.registerDialog(MyDialogs[i]);
		}
	});
}
