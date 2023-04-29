const form1 = document.querySelector('.userData')
if (form1 !== null)
form1.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(new FormData(form1))
  })

  console.log(new FormData(form1 :HTMLFormElement))
})

function getData (form) {
  const inputBox = form.querySelectorAll('input')
  inputBox
}
