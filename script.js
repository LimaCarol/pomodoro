let tempoRestante = 25 * 60 // 25 minutos em segundos
let intervalo = null
let emFoco = true

const timer = document.querySelector('#timer')
const modo = document.querySelector('#modo')
const gif = document.querySelector('#gif')

function atualizarDisplay() {
  let minutos = Math.floor(tempoRestante / 60)
  let segundos = tempoRestante % 60

  minutos = String(minutos).padStart(2, '0')
  segundos = String(segundos).padStart(2, '0')

  timer.textContent = `${minutos}:${segundos}`
}

function iniciar() {
  if (intervalo) return // evita duplicar o timer

  intervalo = setInterval(() => {
    tempoRestante--

    if (tempoRestante < 0) {
      trocarModo()
    }

    atualizarDisplay()
  }, 1000)
}

function pausar() {
  clearInterval(intervalo)
  intervalo = null
}

function resetar() {
  pausar()
  emFoco = true
  tempoRestante = 25 * 60
  modo.textContent = 'FOCUS TIME'
  gif.src = 'gifs/foco.gif'
  atualizarDisplay()
}

function trocarModo() {
  emFoco = !emFoco

  if (emFoco) {
    tempoRestante = 25 * 60
    modo.textContent = 'FOCUS TIME'
    gif.src = 'gifs/foco.gif'
  } else {
    tempoRestante = 5 * 60
    modo.textContent = 'BREAK TIME'
    gif.src = 'gifs/descanso.gif'
  }
}

function forcarBreak() {
  pausar()
  emFoco = false
  tempoRestante = 5 * 60
  modo.textContent = 'BREAK TIME'
  gif.src = 'gifs/descanso.gif'
  atualizarDisplay()
  iniciar()
}

document.querySelectorAll('button')[0].addEventListener('click', iniciar)
document.querySelectorAll('button')[1].addEventListener('click', pausar)
document.querySelectorAll('button')[2].addEventListener('click', resetar)