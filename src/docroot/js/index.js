import throttle from 'lodash/throttle'
import io from 'socket.io-client'
const host = location.hostname
const socket = io.connect(`http://${host}:8080`)

const $body = document.body
let R = 0
let G = 0
let B = 0

const throttleFunc = throttle((event) => {
  console.log(`
    acceleration x: ${event.acceleration.x}
    acceleration y: ${event.acceleration.y}
    acceleration z: ${event.acceleration.z}
  `)
  const bgColor = accelToRGB(event.acceleration)
  $body.style.backgroundColor = bgColor
  socket.emit('onAccel', event.acceleration)
}, 50)

window.addEventListener('devicemotion', throttleFunc, false)

decleaseRGB()

function accelToRGB (accel = {x: 0, y: 0, z: 0}) {
  R += Math.abs((accel.x) / 5)
  G += Math.abs((accel.y) / 5)
  B += Math.abs((accel.z) / 5)

  if ( R > 255 ) {
    R = 255
  }
  if ( G > 255 ) {
    G = 255
  }
  if ( B > 255 ) {
    B = 255
  }

  const r = `00${Math.floor(R).toString(16)}`.slice(-2)
  const g = `00${Math.floor(G).toString(16)}`.slice(-2)
  const b = `00${Math.floor(B).toString(16)}`.slice(-2)

  return `#${r}${g}${b}`
}

function decleaseRGB () {
  R -= 1
  G -= 1
  B -= 1

  if (R < 0) {
    R = 0
  }
  if (G < 0) {
    G = 0
  }
  if (B < 0) {
    B = 0
  }

  console.log(R, G, B)

  requestAnimationFrame(decleaseRGB)
}
