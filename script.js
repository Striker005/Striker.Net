const movies = [
  {
    title: "Inception",
    thumbnail: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    video: "currently not available"
  },
  {
    title: "Interstellar",
    thumbnail: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    video: "https://zdisk.xyz/m?=b5313103167/u/9eD53"
  },
  {
    title: "Dune",
    thumbnail: "https://image.tmdb.org/t/p/w500/8uUU2pxm6IYZw8UgnKJyx7Dqwu9.jpg",
    video: "https://www.youtube.com/embed/8g18jFHCLXk"
  },
  {
    title: "Harry Potter",
    thumbnail: "https://image.tmdb.org/t/p/w500/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
    video: "https://www.youtube.com/embed/VyHV0BRtdxo"
  },
  {
    title: "John Wick",
    thumbnail: "https://tse1.mm.bing.net/th/id/OIP.Qk231a7xIJZsER-Zovci4QHaNK?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "https://www.youtube.com/embed/2AUmvWm5ZDQ"
  },
  {
    title: "Jumanji",
    thumbnail: "https://tse2.mm.bing.net/th/id/OIP.sqcO5wFCcufHs1MQuS3wnAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "https://www.youtube.com/embed/2QKg5SZ_35I"
  }
];

const webSeries = [
  {
    title: "Stranger Things",
    thumbnail: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    episodes: [
      { title: "Episode 1", video: "https://zdisk.xyz/m?=b5313103167/u/MMK_W7", type: "iframe" },
      { title: "Episode 2", video: "videos/stranger_ep2.mp4", type: "video" },
      { title: "Episode 3", video: "videos/stranger_ep3.mp4", type: "video" }
    ]
  },
  {
    title: "Squid Game",
    thumbnail: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    video: "https://www.youtube.com/embed/oqxAJKy0ii4"
  },
  {
    title: "Alice in Borderland",
    thumbnail: "https://picfiles.alphacoders.com/407/thumb-1920-407701.jpg",
    video: "https://www.youtube.com/embed/49_44FFKZ1M"
  },
  {
    title: "Money Heist",
    thumbnail: "https://image.tmdb.org/t/p/w500/MoEKaPFHABtA1xKoOteirGaHl1.jpg",
    video: "https://www.youtube.com/embed/hMANIarjT50"
  },
  {
    title: "Breaking Bad",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    video: "https://www.youtube.com/embed/HhesaQXLuRY"
  },
  {
    title: "Wednesday",
    thumbnail: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    video: "https://www.youtube.com/embed/Q73UhUTs6y0"
  },
  {
    title: "All of Us Are Dead",
    thumbnail: "https://image.tmdb.org/t/p/original/u7qKbq4atqxPWycpWqdDeXlaK1n.jpg",
    video: "https://www.youtube.com/embed/IN5TD4VRcSM"
  },
  {
    title: "The Walking Dead",
    thumbnail: "https://image.tmdb.org/t/p/w500/reKs8y4mPwPkZG99ZpbKRhBPKsX.jpg",
    video: "https://www.youtube.com/embed/sfAc2U20uyg"
  }
];

// Modal elements
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const customPlayer = document.getElementById('customPlayer');
const videoSource = document.getElementById('videoSource');
const closeBtn = document.getElementById('closeBtn');
const modalContent = document.getElementById('modalContent');

// Show movie (no episodes)
function displayMovies(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <h3>${item.title}</h3>
    `;
    card.addEventListener('click', () => {
      openIframeVideo(item.video);
    });
    container.appendChild(card);
  });
}

// Show series (with optional episodes)
function displaySeries(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <h3>${item.title}</h3>
    `;
    card.addEventListener('click', () => {
      if (item.episodes) {
        showEpisodeList(item.title, item.episodes);
      } else {
        openIframeVideo(item.video);
      }
    });
    container.appendChild(card);
  });
}

function showEpisodeList(title, episodes) {
  let buttonsHTML = `<h2 style="text-align:center">${title}</h2><div class="episode-list">`;

  episodes.forEach(ep => {
    const epType = ep.type || 'iframe';
    buttonsHTML += `<button onclick="playEpisode('${ep.video}', '${epType}')">${ep.title}</button>`;
  });

  buttonsHTML += '</div>';

  modalContent.innerHTML = `
    <span class="close" id="closeBtn">&times;</span>
    ${buttonsHTML}
    <iframe id="videoFrame" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
    <video id="customPlayer" width="100%" height="400" controls style="display:none;">
      <source id="videoSource" src="" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;

  document.getElementById('closeBtn').onclick = () => {
    videoModal.style.display = 'none';
    document.getElementById('videoFrame').src = '';
    const cp = document.getElementById('customPlayer');
    cp.pause();
    cp.style.display = 'none';
  };

  videoModal.style.display = 'flex';
}

function playEpisode(url, type) {
  const iframe = document.getElementById('videoFrame');
  const player = document.getElementById('customPlayer');
  const source = document.getElementById('videoSource');

  if (type === 'video') {
    iframe.style.display = 'none';
    player.style.display = 'block';
    source.src = url;
    player.load();
    player.play();
  } else {
    player.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = url;
  }
}

function openIframeVideo(url) {
  customPlayer.style.display = 'none';
  videoFrame.style.display = 'block';
  videoFrame.src = url;
  videoModal.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
  videoModal.style.display = 'none';
  videoFrame.src = '';
  customPlayer.pause();
  customPlayer.style.display = 'none';
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter(item => item.title.toLowerCase().includes(query));
  const filteredSeries = webSeries.filter(item => item.title.toLowerCase().includes(query));
  displayMovies(filteredMovies, 'movieGrid');
  displaySeries(filteredSeries, 'seriesGrid');
});

// Load default
displayMovies(movies, 'movieGrid');
displaySeries(webSeries, 'seriesGrid');
