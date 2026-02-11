let selectedQualities = 0;
const totalGoodQualities = 9;
let noClickCount = 0;

const noButtonMessages = [
    "Não",
    "O quê?",
    "Por quê?",
    "Tem certeza?",
    "Pensa de novo...",
    "Eu te amo 🥺",
    "Por favor? 💕"
];

function nextScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreenElement = document.getElementById(screenId);
    
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    
    if (nextScreenElement) {
        nextScreenElement.classList.add('active');
        window.scrollTo(0, 0);
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
            button.style.display = 'none';
            errorMessage.textContent = '';
        }, 500);
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

function selectPerson(element, isCorrect) {
    const errorMessage = document.getElementById('person-error');
    
    if (isCorrect) {
        element.style.border = '3px solid var(--success-green)';
        element.style.transform = 'scale(1.1)';
        errorMessage.textContent = 'Exatamente! Você é a melhor pessoa do mundo! 🌟';
        errorMessage.style.color = 'var(--success-green)';
        
        setTimeout(() => {
            nextScreen('question-screen');
        }, 2000);
    } else {
        element.classList.add('shake');
        errorMessage.textContent = 'Hmm... tenta de novo! 😊';
        
        setTimeout(() => {
            element.classList.remove('shake');
            errorMessage.textContent = '';
        }, 500);
    }
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
        yesButton.style.fontSize = '2rem';
        yesButton.style.padding = '30px 80px';
        yesButton.textContent = 'SIM! ❤️❤️❤️';
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
    const song = songs[songId];

    if (!song) {
        console.error('Song not found:', songId);
        return;
    }

    const allSongItems = document.querySelectorAll('.song-item');
    allSongItems.forEach(item => item.classList.remove('playing'));

    const currentSongItem = document.querySelector(`[data-song="${songId}"]`);

    if (currentSongId === songId && !audioPlayer.paused) {
        audioPlayer.pause();
        currentSongItem.classList.remove('playing');
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '▶️';
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
        nowPlayingText.textContent = `Tocando: ${song.title} - ${song.artist}`;
    }).catch(error => {
        console.error('Error playing audio:', error);
        nowPlayingText.textContent = 'Erro ao carregar música. Adicione os arquivos na pasta "music/"';
    });

    audioPlayer.onended = () => {
        currentSongItem.classList.remove('playing');
        const playBtn = currentSongItem.querySelector('.play-btn');
        playBtn.textContent = '▶️';
        nowPlayingText.textContent = 'Selecione uma música para começar';
        currentSongId = null;
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('active');
    }
});
