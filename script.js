let selectedQualities = 0;
const totalGoodQualities = 10;
let noClickCount = 0;
let bgMusic = null;
let bgMusicPlaying = false;

const noButtonMessages = [
    "Não",
    "Ué",
    "Por quê?",
    "Tem certeza?",
    "Pensa mais",
    "Achei que você me amava 🥺",
    "Por favor? 💕"
];

function initBackgroundMusic() {
    bgMusic = new Audio('music/Copeland - Have I Always Loved You.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
}

function playBackgroundMusic() {
    if (bgMusic && !bgMusicPlaying) {
        bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
        bgMusicPlaying = true;
    }
}

function pauseBackgroundMusic() {
    if (bgMusic && bgMusicPlaying) {
        bgMusic.pause();
        bgMusicPlaying = false;
    }
}

function toggleMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuNav = document.querySelector('.menu-nav');

    hamburgerBtn.classList.toggle('active');
    menuNav.classList.toggle('active');
}

function nextScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreenElement = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.remove('active');
    }

    if (nextScreenElement) {
        nextScreenElement.classList.add('active');
        window.scrollTo(0, 0);

        if (screenId === 'love-letter-screen') {
            startCounter();
        }

        if (screenId === 'music-screen') {
            pauseBackgroundMusic();
        } else if (screenId === 'love-letter-screen') {
            playBackgroundMusic();
        }
    }
}

function selectQuality(button) {
    const quality = button.getAttribute('data-quality');
    const errorMessage = document.getElementById('qualities-error');

    if (quality === 'bad') {
        button.classList.add('fade-away');
        const messages = ['Opa!', 'Nope!', 'Tenta de novo!', 'Essa não!'];
        errorMessage.textContent = messages[Math.floor(Math.random() * messages.length)];

        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
    } else {
        if (!button.classList.contains('selected')) {
            button.classList.add('selected');
            selectedQualities++;

            if (selectedQualities === totalGoodQualities) {
                errorMessage.textContent = 'Perfeito! Você é incrível! 💖';
                errorMessage.style.color = 'var(--success-green)';
                document.getElementById('qualities-next').classList.remove('hidden');
            }
        } else {
            button.classList.remove('selected');
            selectedQualities--;
            document.getElementById('qualities-next').classList.add('hidden');
            errorMessage.textContent = '';
        }
    }
}

let currentOpponentIndex = 0;
const opponents = [
    { image: 'images/doja-cat.jpg', name: 'Doja Cat' },
    { image: 'images/jesus.png', name: 'Jesus Cristo' },
    { image: 'images/cat.jpg', name: 'Gatinho Fofo' },
    { image: 'images/billie-joe.jpg', name: 'Billie Joe' },
    { image: 'images/ebony.jpg', name: 'Ebony' }
];

function selectCompetitor(side) {
    const errorMessage = document.getElementById('competition-error');
    const leftOption = document.getElementById('option-left');
    const rightOption = document.getElementById('option-right');

    if (side === 'left') {
        leftOption.style.border = '3px solid var(--success-green)';
        leftOption.style.transform = 'scale(1.1)';

        currentOpponentIndex++;

        if (currentOpponentIndex < opponents.length) {
            setTimeout(() => {
                leftOption.style.border = '3px solid var(--lavender-light)';
                leftOption.style.transform = 'scale(1)';
                loadNextOpponent();
            }, 1000);
        } else {
            errorMessage.textContent = 'Exatamente! Você é a melhor pessoa do mundo! 🫵';
            errorMessage.style.color = 'var(--success-green)';

            setTimeout(() => {
                nextScreen('wheel-screen');
                initWheel();
            }, 2000);
        }
    } else {
        rightOption.classList.add('shake');
        errorMessage.textContent = 'Hmm... tenta de novo! 😊';

        setTimeout(() => {
            rightOption.classList.remove('shake');
            errorMessage.textContent = '';
        }, 500);
    }
}

function loadNextOpponent() {
    const rightOption = document.getElementById('option-right');
    const opponent = opponents[currentOpponentIndex];

    const imgElement = rightOption.querySelector('.image-placeholder img');
    imgElement.src = opponent.image;
    imgElement.alt = opponent.name;
    rightOption.querySelector('p').textContent = opponent.name;
}

function handleNo() {
    const noButton = document.getElementById('no-btn');
    const yesButton = document.querySelector('.yes-btn');

    noClickCount++;

    if (noClickCount < noButtonMessages.length) {
        noButton.textContent = noButtonMessages[noClickCount];

        if (noClickCount === 3) {
            noButton.classList.add('shrink');
        } else if (noClickCount === 5) {
            noButton.classList.add('tiny');
        }

        const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = (currentSize + 2) + 'px';
        yesButton.style.padding = (parseInt(window.getComputedStyle(yesButton).paddingTop) + 2) + 'px ' +
                                   (parseInt(window.getComputedStyle(yesButton).paddingLeft) + 5) + 'px';
    } else {
        noButton.classList.add('hidden');

        setTimeout(() => {
            yesButton.classList.add('fullscreen');
        }, 300);
    }
}

function celebrateYes() {
    const questionScreen = document.getElementById('question-screen');
    const buttonsContainer = document.querySelector('.buttons-container');
    const celebrationMessage = document.getElementById('celebration-message');
    const fireworksContainer = document.getElementById('fireworks-container');
    const musicBtn = document.getElementById('music-btn');
    const musicText1 = document.getElementById('music-text-1');
    const musicText2 = document.getElementById('music-text-2');
    const questionTitle = document.querySelector('#question-screen .big-question');
    const questionSubtitle = document.querySelector('#question-screen .subtitle');

    questionScreen.classList.add('shake-celebration');

    buttonsContainer.style.transition = 'opacity 0.5s ease';
    buttonsContainer.style.opacity = '0';

    setTimeout(() => {
        buttonsContainer.style.display = 'none';
    }, 500);

    setTimeout(() => {
        questionScreen.classList.remove('shake-celebration');

        questionTitle.style.transition = 'opacity 0.5s ease';
        questionTitle.style.opacity = '0';

        questionSubtitle.style.transition = 'opacity 0.5s ease';
        questionSubtitle.style.opacity = '0';

        setTimeout(() => {
            questionTitle.style.display = 'none';
            questionSubtitle.style.display = 'none';
        }, 500);
    }, 2000);

    setTimeout(() => {
        celebrationMessage.style.opacity = '0';
        celebrationMessage.classList.remove('hidden');
        celebrationMessage.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            celebrationMessage.style.opacity = '1';
        }, 50);
    }, 2300);

    createFireworks(fireworksContainer);
    createHearts(fireworksContainer);

    setTimeout(() => {
        musicText1.style.opacity = '1';
        musicText1.style.transform = 'translateY(0)';
    }, 5000);

    setTimeout(() => {
        musicText2.style.opacity = '1';
        musicText2.style.transform = 'translateY(0)';
    }, 8000);

    setTimeout(() => {
        musicBtn.style.opacity = '1';
        musicBtn.style.transform = 'translateY(0)';
    }, 11000);
}

function createFireworks(container) {
    const colors = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#FFD700', '#FF69B4'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 100);
    }
}

function createHearts(container) {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150);
    }
}

function showLoveLetter() {
    nextScreen('love-letter-screen');
    startCounter();
}

function startCounter() {
    const startDate = new Date('2025-02-14T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

let currentAudio = null;
let currentSongId = null;

const songs = {
    'green-day-last-night-on-earth': {
        title: 'Last Night on Earth',
        artist: 'Green Day',
        file: 'music/green-day-last-night-on-earth.mp4'
    },
    'maroon-5-she-will-be-loved': {
        title: 'She Will Be Loved',
        artist: 'Maroon 5',
        file: 'music/maroon-5-she-will-be-loved.mp4'
    },
    'plain-white-ts-hey-there-delilah': {
        title: 'Hey There Delilah',
        artist: 'Plain White T\'s',
        file: 'music/plain-white-ts-hey-there-delilah.mp4'
    },
    'foo-fighters-times-like-these': {
        title: 'Times Like These',
        artist: 'Foo Fighters',
        file: 'music/foo-fighters-times-like-these.mp4'
    },
    'los-hermanos-ultimo-romance': {
        title: 'Último Romance',
        artist: 'Los Hermanos',
        file: 'music/los-hermanos-ultimo-romance.mp4'
    },
    'pearl-jam-just-breathe': {
        title: 'Just Breathe',
        artist: 'Pearl Jam',
        file: 'music/pearl-jam-just-breathe.mp4'
    },
    'oasis-wonderwall': {
        title: 'Wonderwall',
        artist: 'Oasis',
        file: 'music/oasis-wonderwall.mp4'
    },
    'copeland-have-i-always-loved-you': {
        title: 'Have I Always Loved You',
        artist: 'Copeland',
        file: 'music/copeland-have-i-always-loved-you.mp4'
    }
};

function playSong(songId) {
    const audioPlayer = document.getElementById('audio-player');
    const nowPlayingText = document.querySelector('.now-playing-text');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const song = songs[songId];

    if (!song) {
        console.error('Song not found:', songId);
        return;
    }

    const allSongItems = document.querySelectorAll('.song-item');
    allSongItems.forEach(item => {
        item.classList.remove('playing');
        const playBtn = item.querySelector('.play-btn');
        playBtn.textContent = '▶️';
    });

    const currentSongItem = document.querySelector(`[data-song="${songId}"]`);

    if (currentSongId === songId && !audioPlayer.paused) {
        audioPlayer.pause();
        currentSongItem.classList.remove('playing');
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '▶️';
        playPauseBtn.textContent = '▶️';
        nowPlayingText.textContent = 'Música pausada';
        return;
    }

    audioPlayer.src = song.file;
    audioPlayer.load();

    audioPlayer.play().then(() => {
        currentSongId = songId;
        currentSongItem.classList.add('playing');
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '⏸️';
        playPauseBtn.textContent = '⏸️';
        playPauseBtn.disabled = false;
        rewindBtn.disabled = false;
        forwardBtn.disabled = false;
        nowPlayingText.textContent = `Tocando: ${song.title} - ${song.artist}`;
    }).catch(error => {
        console.error('Error playing audio:', error);
        nowPlayingText.textContent = 'Erro ao carregar música. Adicione os arquivos na pasta "music/"';
    });

    audioPlayer.onended = () => {
        currentSongItem.classList.remove('playing');
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '▶️';
        playPauseBtn.textContent = '▶️';
        nowPlayingText.textContent = 'Selecione uma música para começar';
        currentSongId = null;
    };
}

function togglePlayPause() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nowPlayingText = document.querySelector('.now-playing-text');

    if (!currentSongId) return;

    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
        const currentSongItem = document.querySelector(`[data-song="${currentSongId}"]`);
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '⏸️';
        currentSongItem.classList.add('playing');
        const song = songs[currentSongId];
        nowPlayingText.textContent = `Tocando: ${song.title} - ${song.artist}`;
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
        const currentSongItem = document.querySelector(`[data-song="${currentSongId}"]`);
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '▶️';
        currentSongItem.classList.remove('playing');
        nowPlayingText.textContent = 'Música pausada';
    }
}

function rewindAudio() {
    const audioPlayer = document.getElementById('audio-player');
    if (currentSongId) {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    }
}

function forwardAudio() {
    const audioPlayer = document.getElementById('audio-player');
    if (currentSongId) {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    }
}

function updateProgressBar() {
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);

        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekAudio(event) {
    const audioPlayer = document.getElementById('audio-player');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = progressContainer.querySelector('.progress-bar');

    if (!currentSongId) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;

    audioPlayer.currentTime = percentage * audioPlayer.duration;
}

let wheelCanvas, wheelCtx;
let wheelRotation = 0;
let isSpinning = false;
const prizes = [
    'Uma mamada quando quiser',
    'Uma massagem gostosa',
    'Mil beijos',
    'Vale-escape do rolé',
    'Uma tarde na redinha'
];

function initWheel() {
    wheelCanvas = document.getElementById('wheel-canvas');
    if (!wheelCanvas) return;

    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
}

function drawWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = 140;
    const sliceAngle = (2 * Math.PI) / prizes.length;

    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    const colors = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'];

    prizes.forEach((prize, index) => {
        const startAngle = wheelRotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        wheelCtx.closePath();
        wheelCtx.fillStyle = colors[index];
        wheelCtx.fill();
        wheelCtx.strokeStyle = 'white';
        wheelCtx.lineWidth = 3;
        wheelCtx.stroke();

        wheelCtx.save();
        wheelCtx.translate(centerX, centerY);
        wheelCtx.rotate(startAngle + sliceAngle / 2);
        wheelCtx.textAlign = 'right';
        wheelCtx.font = 'bold 13px Arial';

        const words = prize.split(' ');
        const lineHeight = 15;
        const totalHeight = words.length * lineHeight;
        const startY = -totalHeight / 2 + lineHeight / 2;

        words.forEach((word, i) => {
            const textX = radius * 0.85;
            const textY = startY + i * lineHeight;

            wheelCtx.strokeStyle = '#333';
            wheelCtx.lineWidth = 3;
            wheelCtx.strokeText(word, textX, textY);

            wheelCtx.fillStyle = 'white';
            wheelCtx.fillText(word, textX, textY);
        });

        wheelCtx.restore();
    });

    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    wheelCtx.fillStyle = 'white';
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#CDB4DB';
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();
}

function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    const spinBtn = document.getElementById('spin-btn');
    const resultDiv = document.getElementById('wheel-result');
    spinBtn.disabled = true;
    spinBtn.style.opacity = '0.5';

    const textSequence = ['Você ganhou', 'Você ganhou.', 'Você ganhou..', 'Você ganhou...'];
    let textIndex = 0;

    resultDiv.innerHTML = '<h3 style="color: var(--lavender); font-size: 1.3rem;">Você ganhou</h3>';

    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % textSequence.length;
        resultDiv.innerHTML = `<h3 style="color: var(--lavender); font-size: 1.3rem;">${textSequence[textIndex]}</h3>`;
    }, 800);

    const totalRotation = (Math.PI * 2 * 15) + (Math.random() * Math.PI * 2);
    const duration = 7000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 4);
        wheelRotation = easeOut * totalRotation;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            clearInterval(textInterval);
            setTimeout(() => {
                showAllPrizes();
            }, 500);
        }
    }

    animate();
}

function showAllPrizes() {
    const resultDiv = document.getElementById('wheel-result');
    const nextBtn = document.getElementById('wheel-next');

    resultDiv.innerHTML = '<h3 style="color: var(--lavender); font-size: 1.5rem; animation: pulse 0.5s ease;">Você ganhou: TUDO!</h3>';

    setTimeout(() => {
        resultDiv.innerHTML = `
            <h3 style="color: var(--lavender); margin-bottom: 15px; opacity: 0; animation: fadeIn 0.8s ease forwards;">🎉 Você ganhou TUDO! 🎉</h3>
            <ul style="text-align: left; display: inline-block; margin: 0 auto; opacity: 0; animation: fadeIn 0.8s ease 0.3s forwards;">
                ${prizes.map(prize => `<li style="margin: 8px 0; font-size: 1rem;">✨ ${prize}</li>`).join('')}
            </ul>
            <p style="font-size: 1.2rem; font-weight: bold; color: var(--lavender); margin-top: 20px; opacity: 0; animation: fadeIn 0.8s ease 0.6s forwards;">
                Você merece tudo isso, e muito mais!!!
            </p>
        `;

        setTimeout(() => {
            nextBtn.classList.remove('hidden');
        }, 1500);
    }, 1500);

    isSpinning = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('active');
    }

    const audioPlayer = document.getElementById('audio-player');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = progressContainer?.querySelector('.progress-bar');

    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgressBar);
        audioPlayer.addEventListener('loadedmetadata', updateProgressBar);
    }

    if (progressBar) {
        progressBar.addEventListener('click', seekAudio);
    }

    initWheel();
    initBackgroundMusic();
});