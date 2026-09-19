const form = document.querySelector("#ticketForm");
const avatarInput = document.querySelector("#avatar");
const avatarPreview = document.querySelector("#avatarPreview");
const uploadText = document.querySelector("#uploadText");
const uploadBox = document.querySelector("#uploadBox");
const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const githubInput = document.querySelector("#github");

// Guarda cada mensagem de erro no elemento correspondente do formulário.
const errors = {
	"full-name": document.querySelector("#nameError"),
	email: document.querySelector("#emailError"),
	github: document.querySelector("#githubError"),
	avatar: document.querySelector("#avatarHint"),
};

// Armazena a imagem como texto para que ela possa ser recuperada depois.
let avatarData = "";

// Adiciona ou remove o estilo de erro de um campo e mostra a mensagem adequada.
function setFieldError(input, message) {
	input.closest(".field").classList.toggle("has-error", Boolean(message));
	errors[input.name].textContent = message;
}

// Atualiza a mensagem da área de upload sem remover o ícone de informação.
function setAvatarError(message) {
	avatarInput.closest(".field").classList.toggle("has-error", Boolean(message));
	errors.avatar.innerHTML = `<img src="./assets/images/icon-info.svg" alt="" aria-hidden="true"> ${message || "Upload your photo (JPG or PNG, max size: 500KB)."}`;
}

// Lê a imagem selecionada e transforma seu conteúdo em uma URL de dados.
function readAvatar(file) {
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		avatarData = reader.result;
		sessionStorage.setItem("ticketAvatar", avatarData);
		avatarPreview.classList.add("has-image");
		avatarPreview.innerHTML = `<img src="${avatarData}" alt="Avatar escolhido">`;
		uploadText.textContent = file.name;
		setAvatarError("");
	});

	reader.readAsDataURL(file);
}

// Confere se o arquivo existe, se possui o formato correto e se não ultrapassa 500 KB.
function validateAvatar(file) {
	if (!file) {
		avatarData = "";
		setAvatarError("Please upload an avatar.");
		return false;
	}

	if (!["image/jpeg", "image/png"].includes(file.type)) {
		avatarData = "";
		setAvatarError("Please upload a JPG or PNG image.");
		return false;
	}

	if (file.size > 500 * 1024) {
		avatarData = "";
		setAvatarError("Image must be 500KB or less.");
		return false;
	}

	return true;
}

// Executado quando o usuário escolhe um arquivo pelo seletor do sistema.
avatarInput.addEventListener("change", () => {
	const file = avatarInput.files[0];

	if (validateAvatar(file)) {
		readAvatar(file);
	}
});

// Destaca a área de upload enquanto um arquivo está sendo arrastado sobre ela.
["dragenter", "dragover"].forEach((eventName) => {
	uploadBox.addEventListener(eventName, (event) => {
		event.preventDefault();
		uploadBox.classList.add("is-dragging");
	});
});

// Remove o destaque quando o arquivo deixa a área ou é solto.
["dragleave", "drop"].forEach((eventName) => {
	uploadBox.addEventListener(eventName, (event) => {
		event.preventDefault();
		uploadBox.classList.remove("is-dragging");
	});
});

// Permite receber o arquivo quando ele é arrastado para a área de upload.
uploadBox.addEventListener("drop", (event) => {
	const file = event.dataTransfer.files[0];

	if (validateAvatar(file)) {
		readAvatar(file);
	}
});

// Valida os campos antes de permitir o envio do formulário.
form.addEventListener("submit", (event) => {
	let valid = true;
	const formData = new FormData(form);
	const name = String(formData.get("full-name") || "").trim();
	const email = String(formData.get("email") || "").trim();
	const github = String(formData.get("github") || "").trim();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// O formulário só pode prosseguir se houver um avatar válido.
	if (!avatarData && !validateAvatar(avatarInput.files[0])) {
		valid = false;
	}

	if (!name) {
		setFieldError(fullNameInput, "Please enter your full name.");
		valid = false;
	} else {
		setFieldError(fullNameInput, "");
	}

	if (!email) {
		setFieldError(emailInput, "Please enter your email address.");
		valid = false;
	} else if (!emailPattern.test(email)) {
		setFieldError(emailInput, "Please enter a valid email address.");
		valid = false;
	} else {
		setFieldError(emailInput, "");
	}

	if (!github) {
		setFieldError(githubInput, "Please enter your GitHub username.");
		valid = false;
	} else {
		setFieldError(githubInput, "");
	}

	// Impede o envio se algum campo tiver sido preenchido incorretamente.
	if (!valid) {
		event.preventDefault();
		return;
	}

	// Salva os dados para que a página de confirmação possa utilizá-los.
	sessionStorage.setItem("ticketName", name);
	sessionStorage.setItem("ticketEmail", email);
	sessionStorage.setItem("ticketGithub", github.startsWith("@") ? github : `@${github}`);
});