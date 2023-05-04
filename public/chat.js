// eslint-disable-next-line no-undef
const socket = io()
const textInput = document.getElementById('messageBox')
const formData = document.getElementById('messageForm')
const chatBubble = document.getElementById('chatBubble')
let userInfo

formData.addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('clientMessage', textInput.value)
  textInput.value = ''
})
socket.on('userInfo', (e) => { userInfo = e })
socket.on('serverMessage', messageJson => {
  const message = JSON.parse(messageJson)
  chatBubble.content.querySelector('.userInfo').innerHTML = `${new Date().toLocaleDateString()}: ${message.response.author.username}`
  chatBubble.content.querySelector('.message').innerHTML = `${message.response.message}`
  if (message.response.author.username === userInfo) {
    const bubbleData = chatBubble.content.querySelector('.outside')
    bubbleData.classList.add('rigth')
  } else {
    chatBubble.content.querySelector('.outside').classList.add('left')
  }

  const clon = chatBubble.content.cloneNode(true)
  document.getElementById('chatBox').appendChild(clon)
})
