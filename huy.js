// Замените YOUR_CLIENT_ID и YOUR_CLIENT_SECRET на ваши реальные данные
const CLIENT_ID = '34272aabedab4c0196e9a995059a8145';
const CLIENT_SECRET = '7cea4ed01ba54f86acff5906cbc340c0';

// Получите токен доступа
const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// Получите информацию о текущем треке
const getCurrentTrack = async () => {
  const accessToken = await getAccessToken();
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data.item;
  } else {
    return null;
  }
};

// Отобразите информацию о треке на странице
const displayCurrentTrack = async () => {
  const track = await getCurrentTrack();
  if (track) {
    const trackInfo = `${track.artists[0].name} - ${track.name}`;
    document.getElementById('current-track').textContent = trackInfo;
  } else {
    document.getElementById('current-track').textContent = 'Не удалось получить информацию о треке';
  }
};

// Вызовите функцию для отображения текущего трека
displayCurrentTrack();
