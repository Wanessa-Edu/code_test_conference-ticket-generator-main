// Lê os dados enviados pelo formulário através da URL.
const params = new URLSearchParams(window.location.search);

// Usa os parâmetros da URL e, caso não existam, consulta o sessionStorage.
// O formulário atual usa "full-name" como nome do campo.
const data = {
  name: params.get("full-name") || params.get("name") || sessionStorage.getItem("ticketName") || "Guest",
  email: params.get("email") || sessionStorage.getItem("ticketEmail") || "your email",
  github: params.get("github") || sessionStorage.getItem("ticketGithub") || "@yourusername",
  avatar: sessionStorage.getItem("ticketAvatar") || "./assets/images/image-avatar.jpg",
};

// Garante que o nome de usuário do GitHub sempre seja exibido com "@".
if (!data.github.startsWith("@")) {
  data.github = `@${data.github}`;
}

// Insere os dados recebidos nos elementos da página de confirmação.
document.querySelector("#guestName").textContent = data.name;
document.querySelector("#guestEmail").textContent = data.email;
document.querySelector("#ticketName").textContent = data.name;
document.querySelector("#ticketGithub").textContent = data.github;
document.querySelector("#ticketAvatar").src = data.avatar;
document.querySelector("#ticketAvatar").alt = `${data.name}'s avatar`;
