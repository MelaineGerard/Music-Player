import './style.css'

const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
let currentFile = 1;


const timer = document.querySelector('.timer')

let fileName = `/musics/${currentFile}.mp3`;

// Add an hidden audio element
const audio = document.createElement('audio')

// Set the audio source
audio.src = fileName

// Set the audio volume
audio.volume = 0.4

const total = timer.querySelector('.total')

// Set the total time
audio.addEventListener('loadedmetadata', () => {
  // format the time
  const timeFormat = new Date(audio.duration * 1000).toISOString().substr(11, 8)
  // Set the total time
  total.innerHTML = timeFormat
})


// Set the timer
setInterval(() => {
  // format the time
  const timeFormat = new Date(audio.currentTime * 1000).toISOString().substr(11, 8)
  // Set the timer
  const current = timer.querySelector('.current')
  current.innerHTML = timeFormat
  const percentage = (audio.currentTime / audio.duration) * 100
  document.querySelector('.progress-overlay').style = `width: ${percentage}%`
}
, 1000)

document.querySelector('.play').addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    document.querySelector('.play').innerHTML = `<i class="fa-solid fa-pause"></i>`
  } else {
    audio.pause()
    document.querySelector('.play').innerHTML = `<i class="fa-solid fa-play"></i>`
  }
});

next.addEventListener('click', () => {
  if (currentFile < 3) {
    currentFile++
    audio.src = `/musics/${currentFile}.mp3`
    audio.play()
    updateData();
  } else {
    currentFile = 1
    audio.src = `/musics/${currentFile}.mp3`
    audio.play()
    updateData();
  }
});

previous.addEventListener('click', () => {
  if (currentFile > 1) {
    currentFile--
    audio.src = `/musics/${currentFile}.mp3`
    audio.play()
    updateData();
  } else {
    currentFile = 3
    audio.src = `/musics/${currentFile}.mp3`
    audio.play()
    updateData();
  }
});

function updateData() {
  const h1 = document.querySelector('h1')
  const h2 = document.querySelector('h2')
  const img = document.querySelector('img')

  switch (currentFile) {
    case 1:
      h1.innerHTML = 'Vacs In The Morning'
      h2.innerHTML = 'Martijn Schmit'
      img.src = '/images/1.jpg'
      break;
    case 2:
      h1.innerHTML = 'Running'
      h2.innerHTML = 'Jens East (ft Elske)'
      img.src = '/images/2.jpg'
      break;
    case 3:
      h1.innerHTML = 'Journey'
      h2.innerHTML = 'Esteban Orlando'
      img.src = '/images/3.jpg'
      break;
    default:
      h1.innerHTML = 'Aucune musique'
      h2.innerHTML = ''
      break;
  }
  document.querySelector('.play').innerHTML = `<i class="fa-solid fa-pause"></i>`
}