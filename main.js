import './style.css'

// Import the database from the database.json file in the browser
const response = await fetch('database.json')
const database = await response.json()


// retrieve the data from the database.json
const files = database.files

const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
let currentFile = 0;


const timer = document.querySelector('.timer')

let fileName = files[currentFile].file

// Add an hidden audio element
const audio = document.createElement('audio')

// Set the audio source
audio.src = fileName

// Set the audio volume
audio.volume = 0.4
updateData();

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
  if (currentFile < files.length - 1) {
    currentFile++
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  } else {
    currentFile = 0
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  }
});

previous.addEventListener('click', () => {
  if (currentFile > 0) {
    currentFile--
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  } else {
    currentFile = files.length - 1
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  }
});

function updateData() {
  const h1 = document.querySelector('h1')
  const h2 = document.querySelector('h2')
  const img = document.querySelector('img')

  h1.innerHTML = files[currentFile].name
  h2.innerHTML = files[currentFile].artist
  img.src = files[currentFile].cover

  if (audio.paused) {
    document.querySelector('.play').innerHTML = `<i class="fa-solid fa-play"></i>`
  } else {
    document.querySelector('.play').innerHTML = `<i class="fa-solid fa-pause"></i>`
  }
}

audio.addEventListener('ended', () => {
  if (currentFile < files.length) {
    currentFile++
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  } else {
    currentFile = 1
    audio.src = files[currentFile].file
    audio.play()
    updateData();
  }
})