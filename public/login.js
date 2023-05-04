const form1 = document.querySelector('.userData')
if (form1 !== null) {
  form1.addEventListener('submit', async (e) => {
    e.preventDefault()
    const body = JSON.stringify(getData(e))
    console.log(body)
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }).then(response => {
      if (response.redirected) {
        console.log(response)
        window.location.href = response.url
      }
      response.json().then(data => {
        if (!data.ok) window.location.href = data.url
      })
    }).catch(error => console.log(error))
  })
}

function getData (event) {
  let data = {}
  const inputBox = event.target.querySelectorAll('input')
  console.log(inputBox)
  inputBox.forEach(field => {
    data = { ...data, [field.name]: field.value }
  })
  return data
}
