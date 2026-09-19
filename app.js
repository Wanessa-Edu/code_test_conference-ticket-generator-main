const form = document.querySelector("#ticketForm");
const avatarInput = document.querySelector("#avatar");
const avatarPreview = document.querySelector("#avatarPreview");
const uploadText = document.querySelector("#uploadText");
const uploadBox = document.querySelector("#uploadBox");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const githubInput = document.querySelector("#github");

const errors = {
  name: document.querySelector("#nameError"),
  email: document.querySelector("#emailError"),
  github: document.querySelector("#githubError"),
  avatar: document.querySelector("#avatarHint"),
};

let avatarData = "";

function setFieldError(input, message) {
  input.closest(".field").classList.toggle("has-error", Boolean(message));
  errors[input.name].textContent = message;
}

function setAvatarError(message) {
  avatarInput.closest(".field").classList.toggle("has-error", Boolean(message));
  errors.avatar.innerHTML = `<img src="./assets/images/icon-info.svg" alt="" aria-hidden="true"> ${message || "Upload your photo (JPG or PNG, max size: 500KB)."}`;
}

function readAvatar(file) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    avatarData = reader.result;
    sessionStorage.setItem("ticketAvatar", avatarData);
    avatarPreview.classList.add("has-image");
    avatarPreview.innerHTML = `<img src="${avatarData}" alt="">`;
    uploadText.textContent = file.name;
    setAvatarError("");
  });

  reader.readAsDataURL(file);
}

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

avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];

  if (validateAvatar(file)) {
    readAvatar(file);
  }
});

["dragenter", "dragover"].forEach((eventName) => {
  uploadBox.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadBox.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  uploadBox.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadBox.classList.remove("is-dragging");
  });
});

uploadBox.addEventListener("drop", (event) => {
  const file = event.dataTransfer.files[0];

  if (validateAvatar(file)) {
    readAvatar(file);
  }
});

form.addEventListener("submit", (event) => {
  let valid = true;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const github = String(formData.get("github") || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!valid) {
    event.preventDefault();
    return;
  }

  sessionStorage.setItem("ticketName", name);
  sessionStorage.setItem("ticketEmail", email);
  sessionStorage.setItem("ticketGithub", github.startsWith("@") ? github : `@${github}`);
});
