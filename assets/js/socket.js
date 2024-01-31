// Não mexa se não souber o que está a fazer.

const user_id = USER_ID;

function setStatus(status) {
  const statusElement = document.getElementById("status");
  const statusColors = {
    dnd: "#ed4245",
    idle: "#faa81a",
    online: "#3ba55d",
    offline: "#6e7985",
  };

  if (status in statusColors) {
    while (statusElement.firstChild) {
      statusElement.removeChild(statusElement.firstChild);
    }

    const statusDot = document.createElement("div");
    statusDot.className = "status-dot";
    statusDot.style.backgroundColor = statusColors[status];

    statusElement.appendChild(statusDot);
  } else {
    console.error("Status desconhecido:", status);
  }
}

document.getElementById(
  "avatar"
).innerHTML = `<img src="https://api.krokss.com/get_avatar/${user_id}">`;

fetch("https://api.krokss.com/get_banner/" + user_id)
  .then((response) => {
    if (response.ok) {
      document.getElementById(
        "banner"
      ).style.backgroundImage = `url(https://api.krokss.com/get_banner/${user_id})`;
      document.getElementById("banner").style.height = "150px";
    } else {
      document.getElementById("banner").style.height = "100px";
    }
  })
  .catch((error) => {
    document.getElementById("banner").style.height = "100px";
  });

fetch("https://api.krokss.com/get_userinfo/" + user_id)
  .then((response) => response.json())
  .then((data) => {
    const { global_name, username, custom_status, status, spotify } = data;
    document.getElementById("at_sign").innerText = global_name;
    document.getElementById("nickname").innerText = username;
    document.getElementById("custom_status").innerText = custom_status;
    setStatus(status);

    if (spotify && spotify.song && spotify.artist) {
      const spotifyInfo = `${spotify.song} - ${spotify.artist}`;
      document.getElementById("song-name").innerText = spotify.song;
      document.getElementById("artist-name").innerText = `by ` + spotify.artist;

      if (spotify.album_art) {
        const albumImage = document.createElement("img");
        albumImage.src = spotify.album_art;
        albumImage.alt = "Album Art";
        document.getElementById("album-image").appendChild(albumImage);
      }
      document.getElementById("spotify-status-container").style.display =
        "block";
      document.getElementById("spotify-divider").style.display = "block";
    } else {
      document.getElementById("spotify-status-container").style.display =
        "none";
      document.getElementById("spotify-divider").style.display = "none";
    }
  })
  .catch((error) =>
    console.error("Erro ao buscar informações do usuário:", error)
  );

const badgesContainer = document.getElementById("badges");

BADGES.forEach((badge) => {
  const badgeElement = document.createElement("div");
  badgeElement.className = "badge";
  badgeElement.innerHTML = `<img src="${badge.image}" /><div class="badge-title" style="display: none;">${badge.name}</div>`;
  badgesContainer.appendChild(badgeElement);
});

const badges = document.querySelectorAll(".badge");

badges.forEach((badge) => {
  tippy(badge, {
    content: badge.querySelector(".badge-title").textContent,
    theme: "dark",
    placement: "top",
    allowHTML: true,
    animation: "shift-away",
    arrow: true,
    arrowType: "round",
    duration: 0,
    offset: [0, 10],
    interactive: true,
  });
});
