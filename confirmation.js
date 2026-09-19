const params = new URLSearchParams(window.location.search);

const data = {
  name: params.get("name") || sessionStorage.getItem("ticketName") || "Guest",
  email: params.get("email") || sessionStorage.getItem("ticketEmail") || "your email",
  github: params.get("github") || sessionStorage.getItem("ticketGithub") || "@yourusername",
  avatar: sessionStorage.getItem("ticketAvatar") || "./assets/images/image-avatar.jpg",
};

if (!data.github.startsWith("@")) {
  data.github = `@${data.github}`;
}

document.querySelector("#guestName").textContent = data.name;
document.querySelector("#guestEmail").textContent = data.email;
document.querySelector("#ticketName").textContent = data.name;
document.querySelector("#ticketGithub").textContent = data.github;
document.querySelector("#ticketAvatar").src = data.avatar;
document.querySelector("#ticketAvatar").alt = `${data.name}'s avatar`;
